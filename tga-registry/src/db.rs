//! Structure and methods for a simple SQLite Database handler.
//!
//! Assists with validating medication data, such as the product's name, manufacturer, and
//! its identifier as assigned to it by the Therapeutic Goods Administration.

use rusqlite::{Connection, named_params};

use crate::{error::Result, parser::Row};

pub struct Db {
    pub db_filepath: String,
    pub table_name: String,
    pub connection: Connection,
}

impl Db {
    pub fn new(db_filepath: &str, table_name: &str) -> Result<Self> {
        let db_connection = Connection::open(db_filepath)?;

        Ok(Self {
            db_filepath: db_filepath.to_string(),
            table_name: table_name.to_string(),
            connection: db_connection,
        })
    }

    pub fn insert_many(&mut self, rows: Vec<Row>) -> Result<()> {
        let tx = self.connection.transaction()?;

        {
            let mut statement = tx.prepare(&format!(
                "INSERT INTO {} (
                    id,
                    product_name,
                    manufacturer,
                    active_ingredient,
                    effective,
                    created_at,
                    updated_at
                ) 
                VALUES (
                    :id,
                    :product,
                    :manufacturer,
                    :ingredient,
                    :effective,
                    :created,
                    :updated
                )
                ON CONFLICT (id)
                DO NOTHING
                ",
                self.table_name
            ))?;

            let ts_now = chrono::Utc::now().timestamp();

            for row in rows {
                statement.execute(named_params! {
                    ":id": row.artg_id as u32,
                    ":product": row.product_name,
                    ":manufacturer": row.manufacturer,
                    ":ingredient": row.active_ingredient,
                    ":effective": row.effective_timestamp as u32,
                    ":created": ts_now,
                    ":updated": ts_now,
                })?;
            }
        }

        tx.commit()?;
        Ok(())
    }

    pub fn init_table(&self) -> Result<()> {
        self.connection.execute(
            &format!(
                "CREATE TABLE IF NOT EXISTS {} (
                    id INTEGER PRIMARY KEY,
                    product_name TEXT NOT NULL,
                    manufacturer TEXT NOT NULL,
                    active_ingredient TEXT,
                    effective INTEGER NOT NULL,
                    created_at DATETIME DEFAULT (unixepoch()),
                    updated_at DATETIME DEFAULT (unixepoch()) 
                )",
                self.table_name
            ),
            (),
        )?;

        Ok(())
    }
}

#[cfg(test)]
mod test {
    use std::path::PathBuf;

    use super::*;

    const DB_FILENAME: &str = "test-db.db";
    const TABLE_NAME: &str = "test_table_name";

    /// Implements `Drop` such that the file at `Some(path)` is automatically cleaned up when its
    /// assignment leaves scope (intended for testing purposes where we don't want to leave test
    /// artifacts laying around).
    ///
    /// # Usage
    ///
    /// If a DB should be file-backed, we create the file and assign it to `DbGuard::path`.
    ///
    /// Note that we ultimately want to ensure we instantiate the `DbGuard` prior to making any
    /// infallible calls.
    ///
    /// ```rust
    /// // define a filepath and initialize the guard
    /// let path = std::env::temp_dir().join("example.txt");
    /// let guard = DbGuard { path };
    ///
    /// // perform some action that might result in an error
    /// std::fs::write(&guard.path, "example text").unwrap();
    ///
    /// // file's instance is removed during stack unwinding on panic
    /// panic!("aaaaaaaaa");
    /// ```
    struct DbGuard {
        path: PathBuf,
    }

    /// Ensure file-backed DBs are cleaned up should a test panic mid-run
    impl Drop for DbGuard {
        fn drop(&mut self) {
            _ = std::fs::remove_file(&self.path);
        }
    }

    fn init_file_db(filename: &str) -> (Db, DbGuard) {
        let path = std::env::temp_dir().join(filename);

        // ensures failed cleanups from past runs are removed
        _ = std::fs::remove_file(&path);

        let db = Db::new(path.to_str().unwrap(), TABLE_NAME).unwrap();
        (db, DbGuard { path })
    }

    fn init_memory_db() -> Db {
        Db::new(":memory:", TABLE_NAME).unwrap()
    }

    #[test]
    fn test_new_db_file() {
        let (_, maybe_file) = init_file_db(DB_FILENAME);
        let file = &maybe_file.path;

        assert!(file.exists());
    }
}

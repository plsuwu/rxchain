use std::path::PathBuf;

use crate::{db::Db, parser::TGARegistry};

pub mod db;
pub mod error;
pub mod parser;

// assume files are all available in the current working dir,
// functionality can be expanded upon later if necessary.
const REGISTRY_XLSX: &str = "tga-registry.xlsx";
const DATABASE_FILENAME: &str = "../client/src/lib/server/db/sqlite.db";

fn main() {
    let registry_filepath = PathBuf::from(REGISTRY_XLSX);

    let mut tga_registry = TGARegistry::read(registry_filepath).unwrap();

    let database_dir = std::env::current_dir().unwrap().join(DATABASE_FILENAME);
    let mut database_handler = Db::new(database_dir.to_str().unwrap(), "medications").unwrap();

    database_handler.init_table().unwrap();

    let tga_content = tga_registry.parse().unwrap();
    database_handler.insert_many(tga_content).unwrap();
}

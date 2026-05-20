use std::num::ParseFloatError;

use calamine::DeError;
use thiserror::Error;

pub type Result<T> = core::result::Result<T, Error>;

#[derive(Debug, Error)]
pub enum Error {
    #[error(transparent)]
    ParseFailure(#[from] calamine::XlsxError),

    #[error("no sheet 0 in spreadsheet")]
    MissingSheet,

    #[error(transparent)]
    DeFailure(#[from] DeError),

    #[error(transparent)]
    StrToFloat(#[from] ParseFloatError),

    #[error(transparent)]
    SqlFailure(#[from] rusqlite::Error),
}

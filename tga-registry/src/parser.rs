use std::path::PathBuf;

use calamine::{Data, Range, RangeDeserializerBuilder, Reader, Xlsx, open_workbook};
use serde::Deserialize;

use crate::error::Result;

pub struct TGARegistry {
    pub filepath: PathBuf,
    pub range: Range<Data>,
}

impl TGARegistry {
    pub fn read(path: PathBuf) -> Result<Self> {
        let mut workbook: Xlsx<_> = open_workbook(&path)?;
        let range = workbook.worksheet_range("Sheet1")?;

        Ok(Self {
            filepath: path,
            range,
        })
    }

    pub fn parse(&mut self) -> Result<Vec<Row>> {
        let iter = RangeDeserializerBuilder::with_deserialize_headers::<RowRaw>()
            .from_range::<Data, RowRaw>(&self.range)?;

        let res = iter
            .filter_map(|r| r.ok())
            .map(Row::from)
            .collect::<Vec<_>>();

        Ok(res)
    }
}

#[derive(Debug, Deserialize)]
pub struct RowRaw {
    #[serde(rename = "ARTG ID")]
    pub artg_id: usize,

    #[serde(rename = "Product Name")]
    pub product_name: String,

    #[serde(rename = "Sponsor Name")]
    pub manufacturer: String,

    #[serde(rename = "Active Ingredients")]
    pub active_ingredient: String,

    #[serde(rename = "Effective Date")]
    pub effective_date: String,
}

/// Converts a serial Excel datetime to Unix timestamp
fn serial_to_timestamp(serial: &str) -> Result<usize> {
    let serial = serial.parse::<f64>()?;
    let timestamp = (serial - 25569.0) * 86400.0 * 1000.0;

    Ok(timestamp as usize)
}

impl From<RowRaw> for Row {
    fn from(value: RowRaw) -> Self {
        let timestamp = serial_to_timestamp(&value.effective_date).unwrap();

        Row {
            artg_id: value.artg_id,
            product_name: value.product_name,
            manufacturer: value.manufacturer,
            active_ingredient: value.active_ingredient,
            effective_timestamp: timestamp,
        }
    }
}

#[derive(Debug)]
pub struct Row {
    pub artg_id: usize,
    pub product_name: String,
    pub manufacturer: String,
    pub active_ingredient: String,
    pub effective_timestamp: usize,
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_read_and_parse() {
        let filepath = PathBuf::from("./tga-registry.xlsx");

        let mut reg_xlsx = TGARegistry::read(filepath).unwrap();
        let rows = reg_xlsx.parse().unwrap();

        println!("{:#?}", rows);
    }
}

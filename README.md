# RxChain

IFB452 Blockchain project

## Creating a TGA medications registry database

I think this was probably the wrong approach but here we are. 

**Also note this shouldn't _actually_ be necessary as I am gonna just commit the DB but for reference:**

### Sourcing a list of medications

The TGA has a PowerBI search visualisation tool that we can use to dump an Excel spreadsheet with a list 
of all TGA-approved medications:

1. Open the tool (https://compliance.health.gov.au/artg/)
2. Select 'Medicines' on the left
3. The exact categories probably doesn't matter for this project, so you can just export this as it is:
    - On the top right corner of the table, there is a little menu that you need to hover to see
    - Click the three dots, and select export data
    - I think either option is fine (current layout vs. summarized data), but summarized is a closer match (i think)
    - Click export - it'll process this for a bit and then download the spreadsheet
4. Move the downloaded spreadsheet into the `tga-registry/` directory to process it into a SQLite DB

### Converting the XLSX spreadsheet to a SQLite database

1. Make sure `cargo` is installed (see the install link above; Rustup should generally handle the toolchain
installation such that it Just Works[^tm])
2. Open the [`tga-registry`](./tga-registry) directory in a shell window (Powershell, Bash, whatever)
3. Assuming the Excel spreadsheet is in the same directory as you are, you should be able to run `cargo run` and it will dump a populated SQLite database next to the spreadsheet.
4. Move the database into the `client/` directory and create a `.env` file with a `DATABASE_URL` var pointing to the db file:

    ```bash
    # (e.g.)
    
    DATABASE_URL=path/to/tga_registry.db # or whatever it was called idk
    ```

## Besu Setup

The commands below should already have been run with the output committed, so starting the network/chain/whatever
is just a matter of running `docker compose up -d` in the `besu-qbft` directory. Additionally, the below is also
the content of the `init.sh` script in `besu-qbft`. For the sake of documentation, however:

```bash
# create the qbft config base
cat > qbftConfigFile.json <<'EOF'
{
  "genesis": {
    "config": {
      "chainId": 31337,
      "shanghaiTime": 0,
      "zeroBaseFee": true,
      "qbft": { "blockperiodseconds": 2, "epochlength": 30000, "requesttimeoutseconds": 4 }
    },
    "nonce": "0x0",
    "timestamp": "0x0",
    "gasLimit": "0x1fffffffffffff",
    "difficulty": "0x1",
    "mixHash": "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
      "fe3b557e8fb62b89f4916b721be55ceb828dbd73": {
        "balance": "0x200000000000000000000000000000000000000000000000000000000000000"
      }
    }
  },
  "blockchain": { "nodes": { "generate": true, "count": 1 } }
}
EOF

# initialize the besu config
docker run --rm -v "$PWD":/data hyperledger/besu:latest \
  operator generate-blockchain-config \
  --config-file=/data/qbftConfigFile.json \
  --to=/data/networkFiles --private-key-file-name=key

# move generated genesis & node key into place
cp networkFiles/genesis.json .   
mkdir -p node                
cp networkFiles/keys/0x*/key node/key
```

Then run the `docker-compose.yml` to start the Hyperledger Besu chain: `docker compose up -d` 

### Foundry Documentation

https://book.getfoundry.sh/


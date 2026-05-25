#!/usr/bin/env bash

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
	  },
	  "4e59b44847b379578588920ca78fbf26c0b4956c": {
	    "balance": "0x0",
		"code": "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf3"
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


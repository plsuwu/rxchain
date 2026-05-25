cd /rx 

DIR_CONTENT=$(ls -la)

echo "[CURRENT PWD]: $PWD"
echo "[CURRENT DIR]: $DIR_CONTENT"

RPC_URL=http://besu:8545
DPL_DIR=/rx/script/Deploy.s.sol


# forge soldeer install

forge script $DPL_DIR                                                                   \
    --rpc-url $RPC_URL                                                                  \
    --private-key 0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63    \
    --broadcast



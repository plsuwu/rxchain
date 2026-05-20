#!/usr/bin/env bash

export FOUNDRY_DISABLE_NIGHTLY_WARNING=1

export RPC=http://localhost:8545

# pre-funded dev account from genesis alloc for registrar + admin roles
export ADMIN_PK=0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63

# these are just standard anvil dev keys
export PRESCRIBER_PK=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
export PATIENT_PK=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
export PHARMACY_PK=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a

export ADMIN=$(cast wallet address $ADMIN_PK)
export PRESCRIBER=$(cast wallet address $PRESCRIBER_PK)
export PATIENT=$(cast wallet address $PATIENT_PK)
export PHARMACY=$(cast wallet address $PHARMACY_PK)

echo "==========================================================================="
echo "0. pre-chain setup"
echo "==========================================================================="

echo "-----------------------------------"
echo "RPC URL:   $RPC"
echo "-----------------------------------"
echo ""
echo "addr - ADMIN:          $ADMIN"
echo "addr - PRESCRIBER:     $PRESCRIBER"
echo "addr - PHARMACY:       $PHARMACY"
echo "addr - PATIENT:        $PATIENT"
echo ""

# we should have zero-base-fee gas using the docker compose setup, but there is a possibility that
# some signing paths can encounter issues with literal zero balances; we fund the three accounts from
# the admin wallet to hopefull sidestep any of these potential issues
for A in $PRESCRIBER $PATIENT $PHARMACY; do
    echo "creating $A:"
    cast send --rpc-url $RPC --private-key $ADMIN_PK --value 1ether $A
    echo ""
done

# captures deployed addresses into environment
REGISTRY=$(forge create src/Registry.sol:Registry \
  --rpc-url $RPC --private-key $ADMIN_PK --broadcast \
  --constructor-args $ADMIN | awk '/Deployed to:/{print $3}')

RX=$(forge create src/PrescriptionDispense.sol:PrescriptionDispense \
  --rpc-url $RPC --private-key $ADMIN_PK --broadcast \
  --constructor-args $REGISTRY | awk '/Deployed to:/{print $3}')


echo "-----------------------------------------------------------"
echo "Registry:     $REGISTRY" 
echo "RX:           $RX"
echo "-----------------------------------------------------------"

echo ""
echo "==========================================================================="
echo "1. credential provision"
echo "==========================================================================="
echo ""

# 1. give credentials to prescriber and pharmacy
LICENSE=$(cast format-bytes32-string "MED0001234567")

echo "  - provision Prescriber role:"
cast send $REGISTRY "addPrescriber(address,bytes32)" $PRESCRIBER $LICENSE \
  --rpc-url $RPC --private-key $ADMIN_PK

echo "---"
echo ""

echo "  - provision Pharmacy role:"
cast send $REGISTRY "addPharmacy(address)" $PHARMACY \
  --rpc-url $RPC --private-key $ADMIN_PK

echo "---"
echo ""

# confirm
echo "checking 'isPrescriber' for prescriber role:"
cast call $REGISTRY "isPrescriber(address)(bool)" $PRESCRIBER --rpc-url $RPC    # == true 
echo ""

echo "checking 'isPharmacy' for pharmacy role:"
cast call $REGISTRY "isPharmacy(address)(bool)" $PHARMACY --rpc-url $RPC        # == true
echo ""

echo ""
echo "==========================================================================="
echo "2. minting (or prescribing or whatever)"
echo "==========================================================================="
echo ""

# 2. prescribe (i.e. mint)
#       a. build encoded fields:
echo "encoding patient hash, medication, expiration..."
PATIENT_HASH=$(cast keccak "ihi-8003608166690503:per-patient-salt")
MED=$(cast format-bytes32-string "PBS0001DK")
EXPIRY=$(( $(date +%s) + 2592000 )) # current unix timestamp + 30 days in seconds 
echo "ok."
echo ""

#       b. call `mint()`
#
# noting that while `mint()` returns the tokenId, `cast send` provides us with a receipt
# and NOT the return value. 
# we can pull from the `Transfer` event, with the tokenId as the fourth indexed topic

echo "calling 'mint()'..."
# function mint(address to, bytes32 patientId, bytes32 medicationCode, uint32 dosage, uint8 repeats, uint64 expiry)
TX=$(cast send $RX "mint(address,bytes32,bytes32,uint32,uint8,uint64)" \
    $PATIENT $PATIENT_HASH $MED 500 1 $EXPIRY \
    --rpc-url $RPC --private-key $PRESCRIBER_PK \
    --json | jq -r .transactionHash)

echo "retrieving tokenId..."
TOKEN_ID=$(cast receipt $TX --rpc-url $RPC --json \
    | jq -r '.logs[] | select(.topics[0]="0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef") | .topics[3]' \
    | cast to-dec)

echo "minted tokenId=$TOKEN_ID"

# + read the stored prescription back
#
echo "stored prescription:"
cast call $RX \
  "getPrescription(uint256)((bytes32,bytes32,address,bytes32,uint32,uint8,uint8,uint64,bool))" \
  1 --rpc-url $RPC

echo ""
echo "==========================================================================="
echo "3. transferring"
echo "==========================================================================="
echo ""

# 3. transfer
# contract checks:
#   - recipient is a valid pharmacy
#   - token is not locked or expired
cast send $RX "transferFrom(address,address,uint256)" $PATIENT $PHARMACY 1 \
    --rpc-url $RPC --private-key $PATIENT_PK

echo ""

cast call $RX "ownerOf(uint256)(address)" 1 --rpc-url $RPC      # == $PHARMACY



# b. double-check guarding by attempting to send somewhere illegal
#       - SHOULD revert with `RecipientNotPharmacy`
echo ""
echo "attempt to send to non-pharmacy should revert:"
cast send $RX "transferFrom(address,address,uint256)" $PATIENT $ADMIN 1\
    --rpc-url $RPC --private-key $PATIENT_PK

echo ""
echo "==========================================================================="
echo "4. dispensing"
echo "==========================================================================="
echo ""

# 4. dispense
echo "dispensing:"
cast send $RX "dispense(uint256)" 1 --rpc-url $RPC --private-key $PHARMACY_PK

# `repeatsRemaining` and `locked` are the 6th and 9th tuple fields:
echo "retrieving prescription details:"
cast call $RX \
  "getPrescription(uint256)((bytes32,bytes32,address,bytes32,uint32,uint8,uint8,uint64,bool))" \
  1 --rpc-url $RPC


echo ""
echo "check locking mechanism - should revert:"
echo "      1. dispense should fail on locked token:"
cast send $RX "dispense(uint256)" 1 --rpc-url $RPC --private-key $PHARMACY_PK

echo "      2. transfer should fail on locked token:"
cast send $RX "transferFrom(address,address,uint256)" $PHARMACY $ADMIN 1 \
    --rpc-url $RPC --private-key $PHARMACY_PK


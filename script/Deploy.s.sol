// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Registry} from "../src/Registry.sol";
import {PrescriptionDispense} from "../src/PrescriptionDispense.sol";

contract Deploy is Script {
    // anchor the addresses of deployed contracts deterministically
    bytes32 constant REGISTRY_SALT = keccak256("Registry.v1");
    bytes32 constant RX_SALT = keccak256("PrescriptionDispense.v1");

    function run() external {
        uint256 deployerKey = 0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63;
        address deployer = vm.addr(deployerKey);

        console.log("deploying from:", deployer);

        vm.startBroadcast(deployerKey);

        // Registry registry = new Registry(deployer);
        Registry registry       = new Registry{salt: REGISTRY_SALT}(deployer);
        PrescriptionDispense rx = new PrescriptionDispense{salt: RX_SALT}(registry);

        vm.stopBroadcast();

        console.log("Registry deployed              :", address(registry));
        console.log("PrescriptionDispense deployed  :", address(rx));
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Registry} from "../src/Registry.sol";
import {PrescriptionDispense} from "../src/PrescriptionDispense.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerKey = 0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63;
        address deployer = vm.addr(deployerKey);

        console.log("deploying from:", deployer);

        vm.startBroadcast(deployerKey);

        Registry registry = new Registry(deployer);
        PrescriptionDispense rx = new PrescriptionDispense(registry);

        vm.stopBroadcast();

        console.log("registry deployed:         ", address(registry));
        console.log("PrescriptionDispense at:   ", address(rx));
    }
}

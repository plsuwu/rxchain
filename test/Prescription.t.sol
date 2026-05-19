// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Registry} from "../src/Registry.sol";
import {PrescriptionDispense} from "../src/PrescriptionDispense.sol";
import {PrescriptionMint} from "../src/PrescriptionMint.sol";
import {PrescriptionControl} from "../src/PrescriptionControl.sol";

contract PrescriptionTest is Test {
    Registry registry;
    PrescriptionDispense rx;

    address admin = makeAddr("admin");
    address doctor = makeAddr("doctor");
    address patient = makeAddr("patient");
    address pharmacy = makeAddr("pharmacy");
    address pharmacy2 = makeAddr("pharmacy2");
    address attacker = makeAddr("attacker");

    bytes32 constant LICENSE = keccak256("AHPRA-MED-12345");
    bytes32 constant PATIENT = keccak256("ihi-1234567890");
    bytes32 constant MED = keccak256("PBS:8254J");

    function setUp() public {
        vm.prank(admin);
        registry = new Registry(admin);
        rx = new PrescriptionDispense(registry);

        vm.startPrank(admin);
        registry.addPrescriber(doctor, LICENSE);
        registry.addPharmacy(pharmacy);
        registry.addPharmacy(pharmacy2);
        vm.stopPrank();
    }

    function _mint(uint8 repeats) internal returns (uint256 id) {
        vm.prank(doctor);
        id = rx.mint(patient, PATIENT, MED, 500, repeats, uint64(block.timestamp + 30 days));
    }

    function test_NonPrescriberCannotMint() public {
        vm.prank(attacker);
        vm.expectRevert(PrescriptionMint.NotAuthorizedPrescriber.selector);
        rx.mint(patient, PATIENT, MED, 500, 2, uint64(block.timestamp + 30 days));
    }

    function test_TransferToNonPharmacyReverts() public {
        uint256 id = _mint(2);
        vm.prank(patient);
        vm.expectRevert(PrescriptionControl.InvalidRecipient.selector);
        rx.transferFrom(patient, attacker, id);
    }

    function test_TransferToPharmacy() public {
        uint256 id = _mint(2);
        vm.prank(patient);
        rx.transferFrom(patient, pharmacy, id);
        assertEq(rx.ownerOf(id), pharmacy);
    }

    function test_ExpiredCannotTransfer() public {
        uint256 id = _mint(2);
        vm.warp(block.timestamp + 31 days);
        vm.prank(patient);
        vm.expectRevert(PrescriptionControl.PrescriptionExpired.selector);
        rx.transferFrom(patient, pharmacy, id);
    }

    function test_DispenseDecrementsAndLocks() public {
        uint256 id = _mint(2);
        vm.prank(patient);
        rx.transferFrom(patient, pharmacy, id);

        vm.prank(pharmacy);
        rx.dispense(id);
        assertEq(rx.getPrescription(id).repeatsRemaining, 1);
        assertFalse(rx.getPrescription(id).locked);

        vm.prank(pharmacy);
        rx.dispense(id);
        assertEq(rx.getPrescription(id).repeatsRemaining, 0);
        assertTrue(rx.getPrescription(id).locked);

        vm.prank(pharmacy);
        vm.expectRevert(PrescriptionDispense.AlreadyLocked.selector);
        rx.dispense(id);
    }

    function test_ZeroRepeatsLocksOnFirstDispense() public {
        uint256 id = _mint(0);
        vm.prank(patient);
        rx.transferFrom(patient, pharmacy, id);
        vm.prank(pharmacy);
        rx.dispense(id);
        assertTrue(rx.getPrescription(id).locked);
    }

    function test_LockedCannotTransfer() public {
        uint256 id = _mint(0);
        vm.prank(patient);
        rx.transferFrom(patient, pharmacy, id);
        vm.prank(pharmacy);
        rx.dispense(id);

        vm.prank(pharmacy);
        vm.expectRevert(PrescriptionControl.PrescriptionLocked.selector);
        rx.transferFrom(pharmacy, pharmacy2, id);
    }

    function test_NonHolderCannotDispense() public {
        uint256 id = _mint(1);
        vm.prank(patient);
        rx.transferFrom(patient, pharmacy, id);
        vm.prank(pharmacy2);
        vm.expectRevert(PrescriptionDispense.NotHolder.selector);
        rx.dispense(id);
    }
}

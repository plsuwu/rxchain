// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract Registry is AccessControl {
    bytes32 public constant REGISTRAR_ROLE = keccak256("RXCHAIN_REGISTRAR");

    mapping(address => bytes32) private _prescriberLicense;
    mapping(address => bool) private _pharmacy;

    event PrescriberAdded(address indexed prescriber, bytes32 licenseNumber);
    event PrescriberRevoked(address indexed prescriber);

    event PharmacyAdded(address indexed pharmacy);
    event PharmacyRevoked(address indexed pharmacy);

    error InvalidLicense();

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(REGISTRAR_ROLE, admin);
    }

    function addPrescriber(address who, bytes32 licenseNumber) external onlyRole(REGISTRAR_ROLE) {
        if (licenseNumber == bytes32(0)) {
            revert InvalidLicense();
        }

        _prescriberLicense[who] = licenseNumber;
        emit PrescriberAdded(who, licenseNumber);
    }

    function revokePrescriber(address who) external onlyRole(REGISTRAR_ROLE) {
        delete _prescriberLicense[who];
        emit PrescriberRevoked(who);
    }

    function addPharmacy(address who) external onlyRole(REGISTRAR_ROLE) {
        _pharmacy[who] = true;
        emit PharmacyAdded(who);
    }

    function revokePharmacy(address who) external onlyRole(REGISTRAR_ROLE) {
        _pharmacy[who] = false;
        emit PharmacyRevoked(who);
    }

    function isPrescriber(address who) external view returns (bool) {
        return _prescriberLicense[who] != bytes32(0);
    }

    function isPharmacy(address who) external view returns (bool) {
        return _pharmacy[who];
    }

    function licenseOf(address who) external view returns (bytes32) {
        return _prescriberLicense[who];
    }
}

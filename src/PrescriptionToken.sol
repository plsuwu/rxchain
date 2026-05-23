// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IPrescriberRegistry {
    function isVerified(address prescriber) external view returns (bool);
    function licenseHashOf(address prescriber) external view returns (bytes32);
}

interface IPrescriptionToken {
    struct PrescriptionData {
        bytes32 patientId;
        bytes32 prescriberLicense;
        uint32 medicationCode;
        uint32 dosage;
        uint16 repeatsRemaining;
        uint16 totalRepeats;
        uint64 expiry;
        bool locked;
    }

    function mintPrescription(address to, PrescriptionData calldata data) external returns (uint256 tokenId);
    function getPrescription(uint256 tokenId) external view returns (PrescriptionData memory);
}

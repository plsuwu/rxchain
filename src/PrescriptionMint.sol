// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Registry} from "./Registry.sol";

abstract contract PrescriptionMint is ERC721 {
    struct PrescriptionData {
        bytes32 patientId;
        bytes32 prescriberLicense;
        address prescriber;
        bytes32 medicationCode;
        uint32 dosage;
        uint8 repeatsRemaining;
        uint8 totalRepeats;
        uint64 expiry;
        bool locked;
    }

    Registry public immutable registry;
    uint256 private _nextTokenId;

    mapping(uint256 => PrescriptionData) internal _prescriptions;

    event PrescriptionMinted(uint256 indexed tokenId, address indexed to, bytes32 indexed patientIdHash, uint64 expiry);

    error NotAuthorizedPrescriber();
    error InvalidExpiry();

    constructor(Registry _registry) {
        registry = _registry;
    }

    modifier onlyPrescriber() {
        if (!registry.isPrescriber(msg.sender)) {
            revert NotAuthorizedPrescriber();
        }

        _;
    }

    function mint(address to, bytes32 patientId, bytes32 medicationCode, uint32 dosage, uint8 repeats, uint64 expiry)
        external
        onlyPrescriber
        returns (uint256 tokenId)
    {
        if (expiry <= block.timestamp) {
            revert InvalidExpiry();
        }

        unchecked {
            tokenId = ++_nextTokenId;
        }

        _prescriptions[tokenId] = PrescriptionData({
            patientId: patientId,
            prescriberLicense: registry.licenseOf(msg.sender),
            prescriber: msg.sender,
            medicationCode: medicationCode,
            dosage: dosage,
            repeatsRemaining: repeats,
            totalRepeats: repeats,
            expiry: expiry,
            locked: false
        });

        _safeMint(to, tokenId);
        emit PrescriptionMinted(tokenId, msg.sender, patientId, expiry);
    }

    function getPrescription(uint256 tokenId) external view returns (PrescriptionData memory) {
        _requireOwned(tokenId);
        return _prescriptions[tokenId];
    }
}

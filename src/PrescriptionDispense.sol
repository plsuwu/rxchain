// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {PrescriptionControl} from "./PrescriptionControl.sol";
import {PrescriptionMint} from "./PrescriptionMint.sol";
import {Registry} from "./Registry.sol";

contract PrescriptionDispense is PrescriptionControl {
    event Dispensed(uint256 indexed tokenId, address indexed pharmacy, uint8 repeatsRemaining);
    event PrescriptionPermanentlyLocked(uint256 indexed tokenId);

    error NotHolder();
    error NotPharmacy();
    error AlreadyLocked();
    error ExpiredOnDispense();

    constructor(Registry _registry) ERC721("Prescription", "RX") PrescriptionMint(_registry) {}

    function dispense(uint256 tokenId) external {
        if (ownerOf(tokenId) != msg.sender) {
            revert NotHolder();
        }

        if (!registry.isPharmacy(msg.sender)) {
            revert NotPharmacy();
        }

        PrescriptionData storage rx = _prescriptions[tokenId];

        if (rx.locked) {
            revert AlreadyLocked();
        }

        if (rx.expiry <= block.timestamp) {
            if (rx.locked == false) {
                rx.locked = true;
            }

            revert ExpiredOnDispense();
        }

        if (rx.repeatsRemaining > 0) {
            unchecked { rx.repeatsRemaining -= 1; }
        }

        if (rx.repeatsRemaining == 0) {
            rx.locked = true;
            emit PrescriptionPermanentlyLocked(tokenId);
        }
    }
}

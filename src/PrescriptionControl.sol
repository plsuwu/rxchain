// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {PrescriptionMint} from "./PrescriptionMint.sol";


/// @dev Note on control flow: the prescriber can mint to a patient (i.e., any address), and
///      the patient can then only forward it on to whichever pharmacy they need to.
abstract contract PrescriptionControl is PrescriptionMint {
    error PrescriptionExpired();
    error PrescriptionLocked();

    /// @notice thrown when e.g. attempting to send to non-pharmacy wallet
    error InvalidRecipient();

    function _update(address to, uint256 tokenId, address auth) internal virtual override returns (address from) {
        from = _ownerOf(tokenId);
        
        // constrain to genuine transfers - mints and burns are allowed through
        if (from != address(0) && to != address(0)) {
            PrescriptionData storage rx = _prescriptions[tokenId];
            if (rx.locked) {
                revert PrescriptionLocked();
            }

            if (rx.expiry <= block.timestamp) {
                revert PrescriptionExpired();
            }

            if (!registry.isPharmacy(to)) {
                revert InvalidRecipient();
            }
        }

        return super._update(to, tokenId, auth);
    }
}

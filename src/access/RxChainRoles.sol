// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/// @title              RxChainRoles
/// @notice             Centralised role identifiers used throughout the `RxChain` system.
/// @dev                Inherited by every `RxChain` contract that performs role-based 
///                     access checks. 
///
///                     This more or less guarantees that the same `bytes32` identifier is 
///                     used everywhere, so as to prevent access control bugs caused by
///                     incorrect  identifier definitions (e.g. "ADMIN" vs. "RXCHAIN_ADMIN").
///                     
///                     Provides definitions for constants (i.e. no additional state or 
///                     logic beyond those defined by `{AccessControl}`).
///
/// @custom:important   It is important to note that these are SYSTEM-WIDE roles; patients
///                     are scoped to individual tokens, so they are intentionally not 
///                     present in this contract.
contract RxChainRoles is AccessControl {
    /// @notice Manages registries, roles, other system administration.
    bytes32 public constant ADMIN       = keccak256("RXCHAIN_ADMIN");

    /// @notice Verified prescribers
    bytes32 public constant PRESCRIBER  = keccak256("RXCHAIN_PRESCRIBER");

    /// @notice TGA-registered pharmacies
    bytes32 public constant PHARMACY    = keccak256("RXCHAIN_PHARMACY");

    /// @notice Read-only access to prescription information for the purpose of 
    ///         regulatory oversight. 
    bytes32 public constant AUDITOR     = keccak256("RXCHAIN_AUDITOR");
    
    /// @notice Authorizes minting on the token contract
    bytes32 public constant MINTER      = keccak256("RXCHAIN_MINTER");

    /// @notice Authorizes token transfers from a prescriber to pharmacy
    bytes32 public constant CONTROLLER  = keccak256("RXCHAIN_CONTROLLER");

    /// @notice Authorizes repeat counter decrementing
    bytes32 public constant DISPENSER   = keccak256("RXCHAIN_DISPENSER");
}

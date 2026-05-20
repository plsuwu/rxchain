//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AccessControl
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const accessControlAbi = [
	{
		type: "function",
		inputs: [],
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
		name: "getRoleAdmin",
		outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "account", internalType: "address", type: "address" },
		],
		name: "grantRole",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "account", internalType: "address", type: "address" },
		],
		name: "hasRole",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "callerConfirmation", internalType: "address", type: "address" },
		],
		name: "renounceRole",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "account", internalType: "address", type: "address" },
		],
		name: "revokeRole",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
		name: "supportsInterface",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
			{
				name: "previousAdminRole",
				internalType: "bytes32",
				type: "bytes32",
				indexed: true,
			},
			{
				name: "newAdminRole",
				internalType: "bytes32",
				type: "bytes32",
				indexed: true,
			},
		],
		name: "RoleAdminChanged",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
			{
				name: "account",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "sender",
				internalType: "address",
				type: "address",
				indexed: true,
			},
		],
		name: "RoleGranted",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
			{
				name: "account",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "sender",
				internalType: "address",
				type: "address",
				indexed: true,
			},
		],
		name: "RoleRevoked",
	},
	{ type: "error", inputs: [], name: "AccessControlBadConfirmation" },
	{
		type: "error",
		inputs: [
			{ name: "account", internalType: "address", type: "address" },
			{ name: "neededRole", internalType: "bytes32", type: "bytes32" },
		],
		name: "AccessControlUnauthorizedAccount",
	},
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165Abi = [
	{
		type: "function",
		inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
		name: "supportsInterface",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721Abi = [
	{
		type: "function",
		inputs: [
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "approve",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "owner", internalType: "address", type: "address" }],
		name: "balanceOf",
		outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "getApproved",
		outputs: [{ name: "", internalType: "address", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "owner", internalType: "address", type: "address" },
			{ name: "operator", internalType: "address", type: "address" },
		],
		name: "isApprovedForAll",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "name",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "ownerOf",
		outputs: [{ name: "", internalType: "address", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
			{ name: "data", internalType: "bytes", type: "bytes" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "operator", internalType: "address", type: "address" },
			{ name: "approved", internalType: "bool", type: "bool" },
		],
		name: "setApprovalForAll",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
		name: "supportsInterface",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "symbol",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "tokenURI",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "owner",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "approved",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "Approval",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "owner",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "operator",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{ name: "approved", internalType: "bool", type: "bool", indexed: false },
		],
		name: "ApprovalForAll",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "from", internalType: "address", type: "address", indexed: true },
			{ name: "to", internalType: "address", type: "address", indexed: true },
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "Transfer",
	},
	{
		type: "error",
		inputs: [
			{ name: "sender", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
			{ name: "owner", internalType: "address", type: "address" },
		],
		name: "ERC721IncorrectOwner",
	},
	{
		type: "error",
		inputs: [
			{ name: "operator", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "ERC721InsufficientApproval",
	},
	{
		type: "error",
		inputs: [{ name: "approver", internalType: "address", type: "address" }],
		name: "ERC721InvalidApprover",
	},
	{
		type: "error",
		inputs: [{ name: "operator", internalType: "address", type: "address" }],
		name: "ERC721InvalidOperator",
	},
	{
		type: "error",
		inputs: [{ name: "owner", internalType: "address", type: "address" }],
		name: "ERC721InvalidOwner",
	},
	{
		type: "error",
		inputs: [{ name: "receiver", internalType: "address", type: "address" }],
		name: "ERC721InvalidReceiver",
	},
	{
		type: "error",
		inputs: [{ name: "sender", internalType: "address", type: "address" }],
		name: "ERC721InvalidSender",
	},
	{
		type: "error",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "ERC721NonexistentToken",
	},
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAccessControl
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAccessControlAbi = [
	{
		type: "function",
		inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
		name: "getRoleAdmin",
		outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "account", internalType: "address", type: "address" },
		],
		name: "grantRole",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "account", internalType: "address", type: "address" },
		],
		name: "hasRole",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "callerConfirmation", internalType: "address", type: "address" },
		],
		name: "renounceRole",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "account", internalType: "address", type: "address" },
		],
		name: "revokeRole",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
			{
				name: "previousAdminRole",
				internalType: "bytes32",
				type: "bytes32",
				indexed: true,
			},
			{
				name: "newAdminRole",
				internalType: "bytes32",
				type: "bytes32",
				indexed: true,
			},
		],
		name: "RoleAdminChanged",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
			{
				name: "account",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "sender",
				internalType: "address",
				type: "address",
				indexed: true,
			},
		],
		name: "RoleGranted",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
			{
				name: "account",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "sender",
				internalType: "address",
				type: "address",
				indexed: true,
			},
		],
		name: "RoleRevoked",
	},
	{ type: "error", inputs: [], name: "AccessControlBadConfirmation" },
	{
		type: "error",
		inputs: [
			{ name: "account", internalType: "address", type: "address" },
			{ name: "neededRole", internalType: "bytes32", type: "bytes32" },
		],
		name: "AccessControlUnauthorizedAccount",
	},
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsAbi = [
	{
		type: "error",
		inputs: [
			{ name: "sender", internalType: "address", type: "address" },
			{ name: "balance", internalType: "uint256", type: "uint256" },
			{ name: "needed", internalType: "uint256", type: "uint256" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "ERC1155InsufficientBalance",
	},
	{
		type: "error",
		inputs: [{ name: "approver", internalType: "address", type: "address" }],
		name: "ERC1155InvalidApprover",
	},
	{
		type: "error",
		inputs: [
			{ name: "idsLength", internalType: "uint256", type: "uint256" },
			{ name: "valuesLength", internalType: "uint256", type: "uint256" },
		],
		name: "ERC1155InvalidArrayLength",
	},
	{
		type: "error",
		inputs: [{ name: "operator", internalType: "address", type: "address" }],
		name: "ERC1155InvalidOperator",
	},
	{
		type: "error",
		inputs: [{ name: "receiver", internalType: "address", type: "address" }],
		name: "ERC1155InvalidReceiver",
	},
	{
		type: "error",
		inputs: [{ name: "sender", internalType: "address", type: "address" }],
		name: "ERC1155InvalidSender",
	},
	{
		type: "error",
		inputs: [
			{ name: "operator", internalType: "address", type: "address" },
			{ name: "owner", internalType: "address", type: "address" },
		],
		name: "ERC1155MissingApprovalForAll",
	},
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsAbi = [
	{
		type: "error",
		inputs: [
			{ name: "spender", internalType: "address", type: "address" },
			{ name: "allowance", internalType: "uint256", type: "uint256" },
			{ name: "needed", internalType: "uint256", type: "uint256" },
		],
		name: "ERC20InsufficientAllowance",
	},
	{
		type: "error",
		inputs: [
			{ name: "sender", internalType: "address", type: "address" },
			{ name: "balance", internalType: "uint256", type: "uint256" },
			{ name: "needed", internalType: "uint256", type: "uint256" },
		],
		name: "ERC20InsufficientBalance",
	},
	{
		type: "error",
		inputs: [{ name: "approver", internalType: "address", type: "address" }],
		name: "ERC20InvalidApprover",
	},
	{
		type: "error",
		inputs: [{ name: "receiver", internalType: "address", type: "address" }],
		name: "ERC20InvalidReceiver",
	},
	{
		type: "error",
		inputs: [{ name: "sender", internalType: "address", type: "address" }],
		name: "ERC20InvalidSender",
	},
	{
		type: "error",
		inputs: [{ name: "spender", internalType: "address", type: "address" }],
		name: "ERC20InvalidSpender",
	},
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsAbi = [
	{
		type: "error",
		inputs: [
			{ name: "sender", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
			{ name: "owner", internalType: "address", type: "address" },
		],
		name: "ERC721IncorrectOwner",
	},
	{
		type: "error",
		inputs: [
			{ name: "operator", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "ERC721InsufficientApproval",
	},
	{
		type: "error",
		inputs: [{ name: "approver", internalType: "address", type: "address" }],
		name: "ERC721InvalidApprover",
	},
	{
		type: "error",
		inputs: [{ name: "operator", internalType: "address", type: "address" }],
		name: "ERC721InvalidOperator",
	},
	{
		type: "error",
		inputs: [{ name: "owner", internalType: "address", type: "address" }],
		name: "ERC721InvalidOwner",
	},
	{
		type: "error",
		inputs: [{ name: "receiver", internalType: "address", type: "address" }],
		name: "ERC721InvalidReceiver",
	},
	{
		type: "error",
		inputs: [{ name: "sender", internalType: "address", type: "address" }],
		name: "ERC721InvalidSender",
	},
	{
		type: "error",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "ERC721NonexistentToken",
	},
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721MetadataAbi = [
	{
		type: "function",
		inputs: [
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "approve",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "owner", internalType: "address", type: "address" }],
		name: "balanceOf",
		outputs: [{ name: "balance", internalType: "uint256", type: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "getApproved",
		outputs: [{ name: "operator", internalType: "address", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "owner", internalType: "address", type: "address" },
			{ name: "operator", internalType: "address", type: "address" },
		],
		name: "isApprovedForAll",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "name",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "ownerOf",
		outputs: [{ name: "owner", internalType: "address", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
			{ name: "data", internalType: "bytes", type: "bytes" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "operator", internalType: "address", type: "address" },
			{ name: "approved", internalType: "bool", type: "bool" },
		],
		name: "setApprovalForAll",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
		name: "supportsInterface",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "symbol",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "tokenURI",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "owner",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "approved",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "Approval",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "owner",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "operator",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{ name: "approved", internalType: "bool", type: "bool", indexed: false },
		],
		name: "ApprovalForAll",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "from", internalType: "address", type: "address", indexed: true },
			{ name: "to", internalType: "address", type: "address", indexed: true },
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "Transfer",
	},
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ReceiverAbi = [
	{
		type: "function",
		inputs: [
			{ name: "operator", internalType: "address", type: "address" },
			{ name: "from", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
			{ name: "data", internalType: "bytes", type: "bytes" },
		],
		name: "onERC721Received",
		outputs: [{ name: "", internalType: "bytes4", type: "bytes4" }],
		stateMutability: "nonpayable",
	},
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
	{
		type: "function",
		inputs: [
			{
				name: "calls",
				internalType: "struct IMulticall3.Call[]",
				type: "tuple[]",
				components: [
					{ name: "target", internalType: "address", type: "address" },
					{ name: "callData", internalType: "bytes", type: "bytes" },
				],
			},
		],
		name: "aggregate",
		outputs: [
			{ name: "blockNumber", internalType: "uint256", type: "uint256" },
			{ name: "returnData", internalType: "bytes[]", type: "bytes[]" },
		],
		stateMutability: "payable",
	},
	{
		type: "function",
		inputs: [
			{
				name: "calls",
				internalType: "struct IMulticall3.Call3[]",
				type: "tuple[]",
				components: [
					{ name: "target", internalType: "address", type: "address" },
					{ name: "allowFailure", internalType: "bool", type: "bool" },
					{ name: "callData", internalType: "bytes", type: "bytes" },
				],
			},
		],
		name: "aggregate3",
		outputs: [
			{
				name: "returnData",
				internalType: "struct IMulticall3.Result[]",
				type: "tuple[]",
				components: [
					{ name: "success", internalType: "bool", type: "bool" },
					{ name: "returnData", internalType: "bytes", type: "bytes" },
				],
			},
		],
		stateMutability: "payable",
	},
	{
		type: "function",
		inputs: [
			{
				name: "calls",
				internalType: "struct IMulticall3.Call3Value[]",
				type: "tuple[]",
				components: [
					{ name: "target", internalType: "address", type: "address" },
					{ name: "allowFailure", internalType: "bool", type: "bool" },
					{ name: "value", internalType: "uint256", type: "uint256" },
					{ name: "callData", internalType: "bytes", type: "bytes" },
				],
			},
		],
		name: "aggregate3Value",
		outputs: [
			{
				name: "returnData",
				internalType: "struct IMulticall3.Result[]",
				type: "tuple[]",
				components: [
					{ name: "success", internalType: "bool", type: "bool" },
					{ name: "returnData", internalType: "bytes", type: "bytes" },
				],
			},
		],
		stateMutability: "payable",
	},
	{
		type: "function",
		inputs: [
			{
				name: "calls",
				internalType: "struct IMulticall3.Call[]",
				type: "tuple[]",
				components: [
					{ name: "target", internalType: "address", type: "address" },
					{ name: "callData", internalType: "bytes", type: "bytes" },
				],
			},
		],
		name: "blockAndAggregate",
		outputs: [
			{ name: "blockNumber", internalType: "uint256", type: "uint256" },
			{ name: "blockHash", internalType: "bytes32", type: "bytes32" },
			{
				name: "returnData",
				internalType: "struct IMulticall3.Result[]",
				type: "tuple[]",
				components: [
					{ name: "success", internalType: "bool", type: "bool" },
					{ name: "returnData", internalType: "bytes", type: "bytes" },
				],
			},
		],
		stateMutability: "payable",
	},
	{
		type: "function",
		inputs: [],
		name: "getBasefee",
		outputs: [{ name: "basefee", internalType: "uint256", type: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "blockNumber", internalType: "uint256", type: "uint256" }],
		name: "getBlockHash",
		outputs: [{ name: "blockHash", internalType: "bytes32", type: "bytes32" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "getBlockNumber",
		outputs: [
			{ name: "blockNumber", internalType: "uint256", type: "uint256" },
		],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "getChainId",
		outputs: [{ name: "chainid", internalType: "uint256", type: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "getCurrentBlockCoinbase",
		outputs: [{ name: "coinbase", internalType: "address", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "getCurrentBlockDifficulty",
		outputs: [{ name: "difficulty", internalType: "uint256", type: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "getCurrentBlockGasLimit",
		outputs: [{ name: "gaslimit", internalType: "uint256", type: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "getCurrentBlockTimestamp",
		outputs: [{ name: "timestamp", internalType: "uint256", type: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "addr", internalType: "address", type: "address" }],
		name: "getEthBalance",
		outputs: [{ name: "balance", internalType: "uint256", type: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "getLastBlockHash",
		outputs: [{ name: "blockHash", internalType: "bytes32", type: "bytes32" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "requireSuccess", internalType: "bool", type: "bool" },
			{
				name: "calls",
				internalType: "struct IMulticall3.Call[]",
				type: "tuple[]",
				components: [
					{ name: "target", internalType: "address", type: "address" },
					{ name: "callData", internalType: "bytes", type: "bytes" },
				],
			},
		],
		name: "tryAggregate",
		outputs: [
			{
				name: "returnData",
				internalType: "struct IMulticall3.Result[]",
				type: "tuple[]",
				components: [
					{ name: "success", internalType: "bool", type: "bool" },
					{ name: "returnData", internalType: "bytes", type: "bytes" },
				],
			},
		],
		stateMutability: "payable",
	},
	{
		type: "function",
		inputs: [
			{ name: "requireSuccess", internalType: "bool", type: "bool" },
			{
				name: "calls",
				internalType: "struct IMulticall3.Call[]",
				type: "tuple[]",
				components: [
					{ name: "target", internalType: "address", type: "address" },
					{ name: "callData", internalType: "bytes", type: "bytes" },
				],
			},
		],
		name: "tryBlockAndAggregate",
		outputs: [
			{ name: "blockNumber", internalType: "uint256", type: "uint256" },
			{ name: "blockHash", internalType: "bytes32", type: "bytes32" },
			{
				name: "returnData",
				internalType: "struct IMulticall3.Result[]",
				type: "tuple[]",
				components: [
					{ name: "success", internalType: "bool", type: "bool" },
					{ name: "returnData", internalType: "bytes", type: "bytes" },
				],
			},
		],
		stateMutability: "payable",
	},
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PrescriptionControl
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const prescriptionControlAbi = [
	{
		type: "function",
		inputs: [
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "approve",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "owner", internalType: "address", type: "address" }],
		name: "balanceOf",
		outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "getApproved",
		outputs: [{ name: "", internalType: "address", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "getPrescription",
		outputs: [
			{
				name: "",
				internalType: "struct PrescriptionMint.PrescriptionData",
				type: "tuple",
				components: [
					{ name: "patientId", internalType: "bytes32", type: "bytes32" },
					{
						name: "prescriberLicense",
						internalType: "bytes32",
						type: "bytes32",
					},
					{ name: "prescriber", internalType: "address", type: "address" },
					{ name: "medicationCode", internalType: "bytes32", type: "bytes32" },
					{ name: "dosage", internalType: "uint32", type: "uint32" },
					{ name: "repeatsRemaining", internalType: "uint8", type: "uint8" },
					{ name: "totalRepeats", internalType: "uint8", type: "uint8" },
					{ name: "expiry", internalType: "uint64", type: "uint64" },
					{ name: "locked", internalType: "bool", type: "bool" },
				],
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "owner", internalType: "address", type: "address" },
			{ name: "operator", internalType: "address", type: "address" },
		],
		name: "isApprovedForAll",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "to", internalType: "address", type: "address" },
			{ name: "patientId", internalType: "bytes32", type: "bytes32" },
			{ name: "medicationCode", internalType: "bytes32", type: "bytes32" },
			{ name: "dosage", internalType: "uint32", type: "uint32" },
			{ name: "repeats", internalType: "uint8", type: "uint8" },
			{ name: "expiry", internalType: "uint64", type: "uint64" },
		],
		name: "mint",
		outputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [],
		name: "name",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "ownerOf",
		outputs: [{ name: "", internalType: "address", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "registry",
		outputs: [{ name: "", internalType: "contract Registry", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
			{ name: "data", internalType: "bytes", type: "bytes" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "operator", internalType: "address", type: "address" },
			{ name: "approved", internalType: "bool", type: "bool" },
		],
		name: "setApprovalForAll",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
		name: "supportsInterface",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "symbol",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "tokenURI",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "owner",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "approved",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "Approval",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "owner",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "operator",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{ name: "approved", internalType: "bool", type: "bool", indexed: false },
		],
		name: "ApprovalForAll",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
			{
				name: "prescriber",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "patientId",
				internalType: "bytes32",
				type: "bytes32",
				indexed: false,
			},
		],
		name: "PrescriptionMinted",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "from", internalType: "address", type: "address", indexed: true },
			{ name: "to", internalType: "address", type: "address", indexed: true },
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "Transfer",
	},
	{
		type: "error",
		inputs: [
			{ name: "sender", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
			{ name: "owner", internalType: "address", type: "address" },
		],
		name: "ERC721IncorrectOwner",
	},
	{
		type: "error",
		inputs: [
			{ name: "operator", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "ERC721InsufficientApproval",
	},
	{
		type: "error",
		inputs: [{ name: "approver", internalType: "address", type: "address" }],
		name: "ERC721InvalidApprover",
	},
	{
		type: "error",
		inputs: [{ name: "operator", internalType: "address", type: "address" }],
		name: "ERC721InvalidOperator",
	},
	{
		type: "error",
		inputs: [{ name: "owner", internalType: "address", type: "address" }],
		name: "ERC721InvalidOwner",
	},
	{
		type: "error",
		inputs: [{ name: "receiver", internalType: "address", type: "address" }],
		name: "ERC721InvalidReceiver",
	},
	{
		type: "error",
		inputs: [{ name: "sender", internalType: "address", type: "address" }],
		name: "ERC721InvalidSender",
	},
	{
		type: "error",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "ERC721NonexistentToken",
	},
	{ type: "error", inputs: [], name: "InvalidExpiry" },
	{ type: "error", inputs: [], name: "InvalidRecipient" },
	{ type: "error", inputs: [], name: "NotAuthorizedPrescriber" },
	{ type: "error", inputs: [], name: "PrescriptionExpired" },
	{ type: "error", inputs: [], name: "PrescriptionLocked" },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PrescriptionDispense
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const prescriptionDispenseAbi = [
	{
		type: "constructor",
		inputs: [
			{ name: "_registry", internalType: "contract Registry", type: "address" },
		],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "approve",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "owner", internalType: "address", type: "address" }],
		name: "balanceOf",
		outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "dispense",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "getApproved",
		outputs: [{ name: "", internalType: "address", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "getPrescription",
		outputs: [
			{
				name: "",
				internalType: "struct PrescriptionMint.PrescriptionData",
				type: "tuple",
				components: [
					{ name: "patientId", internalType: "bytes32", type: "bytes32" },
					{
						name: "prescriberLicense",
						internalType: "bytes32",
						type: "bytes32",
					},
					{ name: "prescriber", internalType: "address", type: "address" },
					{ name: "medicationCode", internalType: "bytes32", type: "bytes32" },
					{ name: "dosage", internalType: "uint32", type: "uint32" },
					{ name: "repeatsRemaining", internalType: "uint8", type: "uint8" },
					{ name: "totalRepeats", internalType: "uint8", type: "uint8" },
					{ name: "expiry", internalType: "uint64", type: "uint64" },
					{ name: "locked", internalType: "bool", type: "bool" },
				],
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "owner", internalType: "address", type: "address" },
			{ name: "operator", internalType: "address", type: "address" },
		],
		name: "isApprovedForAll",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "to", internalType: "address", type: "address" },
			{ name: "patientId", internalType: "bytes32", type: "bytes32" },
			{ name: "medicationCode", internalType: "bytes32", type: "bytes32" },
			{ name: "dosage", internalType: "uint32", type: "uint32" },
			{ name: "repeats", internalType: "uint8", type: "uint8" },
			{ name: "expiry", internalType: "uint64", type: "uint64" },
		],
		name: "mint",
		outputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [],
		name: "name",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "ownerOf",
		outputs: [{ name: "", internalType: "address", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "registry",
		outputs: [{ name: "", internalType: "contract Registry", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
			{ name: "data", internalType: "bytes", type: "bytes" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "operator", internalType: "address", type: "address" },
			{ name: "approved", internalType: "bool", type: "bool" },
		],
		name: "setApprovalForAll",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
		name: "supportsInterface",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "symbol",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "tokenURI",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "owner",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "approved",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "Approval",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "owner",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "operator",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{ name: "approved", internalType: "bool", type: "bool", indexed: false },
		],
		name: "ApprovalForAll",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
			{
				name: "pharmacy",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "repeatsRemaining",
				internalType: "uint8",
				type: "uint8",
				indexed: false,
			},
		],
		name: "Dispensed",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
			{
				name: "prescriber",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "patientId",
				internalType: "bytes32",
				type: "bytes32",
				indexed: false,
			},
		],
		name: "PrescriptionMinted",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "PrescriptionPermanentlyLocked",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "from", internalType: "address", type: "address", indexed: true },
			{ name: "to", internalType: "address", type: "address", indexed: true },
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "Transfer",
	},
	{ type: "error", inputs: [], name: "AlreadyLocked" },
	{
		type: "error",
		inputs: [
			{ name: "sender", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
			{ name: "owner", internalType: "address", type: "address" },
		],
		name: "ERC721IncorrectOwner",
	},
	{
		type: "error",
		inputs: [
			{ name: "operator", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "ERC721InsufficientApproval",
	},
	{
		type: "error",
		inputs: [{ name: "approver", internalType: "address", type: "address" }],
		name: "ERC721InvalidApprover",
	},
	{
		type: "error",
		inputs: [{ name: "operator", internalType: "address", type: "address" }],
		name: "ERC721InvalidOperator",
	},
	{
		type: "error",
		inputs: [{ name: "owner", internalType: "address", type: "address" }],
		name: "ERC721InvalidOwner",
	},
	{
		type: "error",
		inputs: [{ name: "receiver", internalType: "address", type: "address" }],
		name: "ERC721InvalidReceiver",
	},
	{
		type: "error",
		inputs: [{ name: "sender", internalType: "address", type: "address" }],
		name: "ERC721InvalidSender",
	},
	{
		type: "error",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "ERC721NonexistentToken",
	},
	{ type: "error", inputs: [], name: "ExpiredOnDispense" },
	{ type: "error", inputs: [], name: "InvalidExpiry" },
	{ type: "error", inputs: [], name: "InvalidRecipient" },
	{ type: "error", inputs: [], name: "NotAuthorizedPrescriber" },
	{ type: "error", inputs: [], name: "NotHolder" },
	{ type: "error", inputs: [], name: "NotPharmacy" },
	{ type: "error", inputs: [], name: "PrescriptionExpired" },
	{ type: "error", inputs: [], name: "PrescriptionLocked" },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PrescriptionMint
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const prescriptionMintAbi = [
	{
		type: "function",
		inputs: [
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "approve",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "owner", internalType: "address", type: "address" }],
		name: "balanceOf",
		outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "getApproved",
		outputs: [{ name: "", internalType: "address", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "getPrescription",
		outputs: [
			{
				name: "",
				internalType: "struct PrescriptionMint.PrescriptionData",
				type: "tuple",
				components: [
					{ name: "patientId", internalType: "bytes32", type: "bytes32" },
					{
						name: "prescriberLicense",
						internalType: "bytes32",
						type: "bytes32",
					},
					{ name: "prescriber", internalType: "address", type: "address" },
					{ name: "medicationCode", internalType: "bytes32", type: "bytes32" },
					{ name: "dosage", internalType: "uint32", type: "uint32" },
					{ name: "repeatsRemaining", internalType: "uint8", type: "uint8" },
					{ name: "totalRepeats", internalType: "uint8", type: "uint8" },
					{ name: "expiry", internalType: "uint64", type: "uint64" },
					{ name: "locked", internalType: "bool", type: "bool" },
				],
			},
		],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "owner", internalType: "address", type: "address" },
			{ name: "operator", internalType: "address", type: "address" },
		],
		name: "isApprovedForAll",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "to", internalType: "address", type: "address" },
			{ name: "patientId", internalType: "bytes32", type: "bytes32" },
			{ name: "medicationCode", internalType: "bytes32", type: "bytes32" },
			{ name: "dosage", internalType: "uint32", type: "uint32" },
			{ name: "repeats", internalType: "uint8", type: "uint8" },
			{ name: "expiry", internalType: "uint64", type: "uint64" },
		],
		name: "mint",
		outputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [],
		name: "name",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "ownerOf",
		outputs: [{ name: "", internalType: "address", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "registry",
		outputs: [{ name: "", internalType: "contract Registry", type: "address" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
			{ name: "data", internalType: "bytes", type: "bytes" },
		],
		name: "safeTransferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "operator", internalType: "address", type: "address" },
			{ name: "approved", internalType: "bool", type: "bool" },
		],
		name: "setApprovalForAll",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
		name: "supportsInterface",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "symbol",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "tokenURI",
		outputs: [{ name: "", internalType: "string", type: "string" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "from", internalType: "address", type: "address" },
			{ name: "to", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "owner",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "approved",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "Approval",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "owner",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "operator",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{ name: "approved", internalType: "bool", type: "bool", indexed: false },
		],
		name: "ApprovalForAll",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
			{
				name: "prescriber",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "patientId",
				internalType: "bytes32",
				type: "bytes32",
				indexed: false,
			},
		],
		name: "PrescriptionMinted",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "from", internalType: "address", type: "address", indexed: true },
			{ name: "to", internalType: "address", type: "address", indexed: true },
			{
				name: "tokenId",
				internalType: "uint256",
				type: "uint256",
				indexed: true,
			},
		],
		name: "Transfer",
	},
	{
		type: "error",
		inputs: [
			{ name: "sender", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
			{ name: "owner", internalType: "address", type: "address" },
		],
		name: "ERC721IncorrectOwner",
	},
	{
		type: "error",
		inputs: [
			{ name: "operator", internalType: "address", type: "address" },
			{ name: "tokenId", internalType: "uint256", type: "uint256" },
		],
		name: "ERC721InsufficientApproval",
	},
	{
		type: "error",
		inputs: [{ name: "approver", internalType: "address", type: "address" }],
		name: "ERC721InvalidApprover",
	},
	{
		type: "error",
		inputs: [{ name: "operator", internalType: "address", type: "address" }],
		name: "ERC721InvalidOperator",
	},
	{
		type: "error",
		inputs: [{ name: "owner", internalType: "address", type: "address" }],
		name: "ERC721InvalidOwner",
	},
	{
		type: "error",
		inputs: [{ name: "receiver", internalType: "address", type: "address" }],
		name: "ERC721InvalidReceiver",
	},
	{
		type: "error",
		inputs: [{ name: "sender", internalType: "address", type: "address" }],
		name: "ERC721InvalidSender",
	},
	{
		type: "error",
		inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
		name: "ERC721NonexistentToken",
	},
	{ type: "error", inputs: [], name: "InvalidExpiry" },
	{ type: "error", inputs: [], name: "NotAuthorizedPrescriber" },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Registry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const registryAbi = [
	{
		type: "constructor",
		inputs: [{ name: "admin", internalType: "address", type: "address" }],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [],
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [],
		name: "REGISTRAR_ROLE",
		outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "who", internalType: "address", type: "address" }],
		name: "addPharmacy",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "who", internalType: "address", type: "address" },
			{ name: "licenseNumber", internalType: "bytes32", type: "bytes32" },
		],
		name: "addPrescriber",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
		name: "getRoleAdmin",
		outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "account", internalType: "address", type: "address" },
		],
		name: "grantRole",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "account", internalType: "address", type: "address" },
		],
		name: "hasRole",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "who", internalType: "address", type: "address" }],
		name: "isPharmacy",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "who", internalType: "address", type: "address" }],
		name: "isPrescriber",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [{ name: "who", internalType: "address", type: "address" }],
		name: "licenseOf",
		outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
		stateMutability: "view",
	},
	{
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "callerConfirmation", internalType: "address", type: "address" },
		],
		name: "renounceRole",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "who", internalType: "address", type: "address" }],
		name: "revokePharmacy",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "who", internalType: "address", type: "address" }],
		name: "revokePrescriber",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32" },
			{ name: "account", internalType: "address", type: "address" },
		],
		name: "revokeRole",
		outputs: [],
		stateMutability: "nonpayable",
	},
	{
		type: "function",
		inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
		name: "supportsInterface",
		outputs: [{ name: "", internalType: "bool", type: "bool" }],
		stateMutability: "view",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "pharmacy",
				internalType: "address",
				type: "address",
				indexed: true,
			},
		],
		name: "PharmacyAdded",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "pharmacy",
				internalType: "address",
				type: "address",
				indexed: true,
			},
		],
		name: "PharmacyRevoked",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "prescriber",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "licenseNumber",
				internalType: "bytes32",
				type: "bytes32",
				indexed: false,
			},
		],
		name: "PrescriberAdded",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{
				name: "prescriber",
				internalType: "address",
				type: "address",
				indexed: true,
			},
		],
		name: "PrescriberRevoked",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
			{
				name: "previousAdminRole",
				internalType: "bytes32",
				type: "bytes32",
				indexed: true,
			},
			{
				name: "newAdminRole",
				internalType: "bytes32",
				type: "bytes32",
				indexed: true,
			},
		],
		name: "RoleAdminChanged",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
			{
				name: "account",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "sender",
				internalType: "address",
				type: "address",
				indexed: true,
			},
		],
		name: "RoleGranted",
	},
	{
		type: "event",
		anonymous: false,
		inputs: [
			{ name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
			{
				name: "account",
				internalType: "address",
				type: "address",
				indexed: true,
			},
			{
				name: "sender",
				internalType: "address",
				type: "address",
				indexed: true,
			},
		],
		name: "RoleRevoked",
	},
	{ type: "error", inputs: [], name: "AccessControlBadConfirmation" },
	{
		type: "error",
		inputs: [
			{ name: "account", internalType: "address", type: "address" },
			{ name: "neededRole", internalType: "bytes32", type: "bytes32" },
		],
		name: "AccessControlUnauthorizedAccount",
	},
	{ type: "error", inputs: [], name: "InvalidLicense" },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SafeCast
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const safeCastAbi = [
	{
		type: "error",
		inputs: [
			{ name: "bits", internalType: "uint8", type: "uint8" },
			{ name: "value", internalType: "int256", type: "int256" },
		],
		name: "SafeCastOverflowedIntDowncast",
	},
	{
		type: "error",
		inputs: [{ name: "value", internalType: "int256", type: "int256" }],
		name: "SafeCastOverflowedIntToUint",
	},
	{
		type: "error",
		inputs: [
			{ name: "bits", internalType: "uint8", type: "uint8" },
			{ name: "value", internalType: "uint256", type: "uint256" },
		],
		name: "SafeCastOverflowedUintDowncast",
	},
	{
		type: "error",
		inputs: [{ name: "value", internalType: "uint256", type: "uint256" }],
		name: "SafeCastOverflowedUintToInt",
	},
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Strings
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stringsAbi = [
	{
		type: "error",
		inputs: [
			{ name: "value", internalType: "uint256", type: "uint256" },
			{ name: "length", internalType: "uint256", type: "uint256" },
		],
		name: "StringsInsufficientHexLength",
	},
	{ type: "error", inputs: [], name: "StringsInvalidAddressFormat" },
	{ type: "error", inputs: [], name: "StringsInvalidChar" },
] as const

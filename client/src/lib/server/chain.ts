import type { Hex } from "viem";
import { createPublicClient, defineChain, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { env } from "$env/dynamic/private";
// import registryArtifact from "./Registry.json";
// import rxArtifact from "./PrescriptionDispense.json";

const RPC_URL = env.RPC_URL ?? "http://localhost:8545";
const CHAIN_ID = Number(env.CHAIN_ID ?? 31337);

export const consortium = defineChain({
	id: CHAIN_ID,
	name: "Prescription Consortium",
	nativeCurrency: { name: "Gas", symbol: "GAS", decimals: 18 },
	rpcUrls: { default: { http: [RPC_URL] } },
});

export const publicClient = createPublicClient({
	chain: consortium,
	transport: http(RPC_URL),
});

// Privileged administrator credentials for handling system & regulatory actions
//
// We're just hardcoding this key (Forge testing key) as a fallback for now - plus its also already
// hardcoded in the Hyperledger Besu setup stuff.
export const adminAccount = privateKeyToAccount(
	(env.ADMIN_PRIVATE_KEY ??
		"0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63") as Hex
);

export const REGISTRY_ADDRESS = "0xcb02806871B6417F0540100F08C7FAfA429047B4";
export const RX_ADDRESS = "0x9d114eD45AB4C0A8E01aAcD8634273F5Be90aea7";

// const FACTORY = "0x4e59b44847b379578588920cA78FbF26c0B4956C";
// const DEPLOYER = adminAccount.address;

// export const REGISTRY_ADDRESS = getContractAddress({
// 	from: FACTORY,
// 	opcode: "CREATE2",
// 	salt: keccak256(toBytes("Registry.v1")),
// 	bytecode: encodeDeployData({
// 		abi: registryArtifact.abi,
// 		bytecode: registryArtifact.bytecode.object as Hex,
// 		args: [DEPLOYER],
// 	}),
// });

// export const RX_ADDRESS = getContractAddress({
// 	from: FACTORY,
// 	opcode: "CREATE2",
// 	salt: keccak256(toBytes("PrescriptionDispense.v1")),
// 	bytecode: encodeDeployData({
// 		abi: rxArtifact.abi,
// 		bytecode: rxArtifact.bytecode.object as Hex,
// 	}),
// });

import type { Address, Hex } from "viem";
import deployedContracts from "../../../../broadcast/Deploy.s.sol/31337/run-latest.json";
import { createPublicClient, defineChain, getAddress, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { env } from "$env/dynamic/private";

const RPC_URL = env.RPC_URL ?? "http://localhost:8545";
const CHAIN_ID = Number(env.CHAIN_ID ?? 31337);
const FALLBACK_ADDRESS =
	"0x0000000000000000000000000000000000000000" as Address;

export const consortium = defineChain({
	id: CHAIN_ID,
	name: "Prescription Consortium (dev)",
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

// TODO: these should come from environment variables as per contract addresses above, but this is
// "easier" for now.
export const getDeployedContract = (wanted: string) => {
	return deployedContracts.transactions.find(
		(tx) => wanted === tx.contractName
	);
};

export const RX_ADDRESS = getAddress(
	getDeployedContract("PrescriptionDispense")?.contractAddress ??
		FALLBACK_ADDRESS
);

export const REGISTRY_ADDRESS = getAddress(
	getDeployedContract("Registry")?.contractAddress ?? FALLBACK_ADDRESS
);

import { privateKeyToAccount } from "viem/accounts";
import deployedContracts from "../../../../../broadcast/Deploy.s.sol/31337/run-latest.json";
import {
	createPublicClient,
	createWalletClient,
	http,
	defineChain,
	getAddress,
} from "viem";
export * from "./generated";
export type HexString = `0x${string}`;

// idk what the `createWalletClient` function's return type ACTUALLY is so
// this is reasonable for our purposes i think
export type GenericWallet = ReturnType<typeof walletFor>;

export const consortium = defineChain({
	id: 31337,
	name: "Prescription Consortium (dev)",
	nativeCurrency: { name: "Gas", symbol: "GAS", decimals: 18 },
	rpcUrls: { default: { http: ["http://localhost:8545"] } },
});

export const publicClient = createPublicClient({
	chain: consortium,
	transport: http(),
});

export const walletFor = (privateKey: HexString) => {
	return createWalletClient({
		account: privateKeyToAccount(privateKey),
		chain: consortium,
		transport: http(),
	});
};

/**
 * Send & wait (throws on revert)
 */
export const send = async (hash: HexString) => {
	const receipt = await publicClient.waitForTransactionReceipt({ hash });
	if (receipt.status !== "success") {
		throw new Error(`failed - reverted: ${hash}`);
	}

	return receipt;
};

export const getDeployedContract = (wanted: string) => {
	return deployedContracts.transactions.find(
		(tx) => wanted === tx.contractName
	);
};

// if either calls to `getDeployedContract` fails (i.e., returned value is nullish),
// make sure these smart contracts are deployed
export const RX = getAddress(
	getDeployedContract("PrescriptionDispense")!.contractAddress
);

export const REGISTRY = getAddress(
	getDeployedContract("Registry")!.contractAddress
);

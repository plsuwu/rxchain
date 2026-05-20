import type { HexString, GenericWallet } from "$lib/server/chain";
import { env } from "$env/dynamic/private";
import { stringToHex } from "viem";
import { send, walletFor, registryAbi, REGISTRY } from "$lib/server/chain";

export const CREDENTIAL_FN = {
	prescriber: "addPrescriber",
	pharmacy: "addPharmacy",
} as const;

export type CredentialedUser = keyof typeof CREDENTIAL_FN;

const ADMIN_KEY = env.PK_ADMIN;
const admin = walletFor(ADMIN_KEY as HexString);

/**
 * Authorizes a wallet address to call `mint()`
 */
export const authorizePrescriber = async (
	wallet: GenericWallet,
	license: string
) => {
	const contract = await admin.writeContract({
		address: REGISTRY,
		abi: registryAbi,
		functionName: CREDENTIAL_FN.prescriber,
		args: [wallet.account.address, stringToHex(license, { size: 32 })],
	});

	await send(contract);
};

/**
 * Authorizes a wallet address to call `dispense`
 */
export const authorizePharmacy = async (wallet: GenericWallet) => {
	const contract = await admin.writeContract({
		address: REGISTRY,
		abi: registryAbi,
		functionName: CREDENTIAL_FN.pharmacy,
		args: [wallet.account.address],
	});

	await send(contract);
};

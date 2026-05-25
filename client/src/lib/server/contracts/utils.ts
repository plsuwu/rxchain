import type { Address, Hash, Hex } from "viem";
import { getContract, BaseError, ContractFunctionRevertedError } from "viem";

import { prescriptionDispenseAbi, registryAbi } from "$lib/server/generated";
import { publicClient, REGISTRY_ADDRESS, RX_ADDRESS } from "$lib/server/chain";

export const registry = getContract({
	address: REGISTRY_ADDRESS,
	abi: registryAbi,
	client: publicClient,
});

export const rx = getContract({
	address: RX_ADDRESS,
	abi: prescriptionDispenseAbi,
	client: publicClient,
});

export const isPrescriberOnChain = (addr: Address) => {
	return registry.read.isPrescriber([addr]);
};

export const isPharmacyOnChain = (addr: Address) => {
	const pharm = registry.read.isPharmacy([addr]);
    // console.log("is pharmacy on chain:", pharm);

    return pharm
};

export async function waitOk(hash: Hash) {
	const receipt = await publicClient.waitForTransactionReceipt({ hash });
	if (receipt.status === "reverted") {
		throw new Error(`transaction reverted: ${hash}`);
	}

	return receipt;
}

/**
 * Retrieves an error name from a viem revert (if one exists)
 */
export function decodeRevert(err: unknown): string | null {
	if (err instanceof BaseError) {
		const revert = err.walk((e) => e instanceof ContractFunctionRevertedError);
		if (revert instanceof ContractFunctionRevertedError) {
			return revert.data?.errorName ?? revert.shortMessage;
		}
	}

	return null;
}

function decodeBytes32(hex: Hex) {
	const buff = Buffer.from(hex.slice(2), "hex");

	// trim trailing zeros (if any)
	const index = buff.findIndex((b) => b === 0);
	const trimmed = buff.subarray(0, index === -1 ? buff.length : index);

	return trimmed.toString("utf8");
}

export async function getPrescription(
	tokenId: bigint
): Promise<PrescriptionView | null> {
	try {
		const [owner, data] = await Promise.all([
			rx.read.ownerOf([tokenId]),
			rx.read.getPrescription([tokenId]),
		]);

		return {
			tokenId,
			owner,
			patientId: data.patientId,
			prescriberLicense: decodeBytes32(data.prescriberLicense),
			prescriber: data.prescriber,
			medicationCode: decodeBytes32(data.medicationCode),
			dosage: data.dosage,
			repeatsRemaining: data.repeatsRemaining,
			totalRepeats: data.totalRepeats,
			expiry: Number(data.expiry),
			locked: data.locked,
		};
	} catch (err) {
		// may occur - for example, if token is invalid, burned, ...
		console.error(
			`failed to get prescription data for token'${tokenId}':`,
			err
		);
		return null;
	}
}

export type PrescriptionView = {
	tokenId: bigint;
	owner: Address;
	patientId: Hex;
	prescriberLicense: string;
	prescriber: Address;
	medicationCode: string;
	dosage: number;
	repeatsRemaining: number;
	totalRepeats: number;
	expiry: number;
	locked: boolean;
};

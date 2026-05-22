import type { Address } from "viem";
import { keccak256, parseEventLogs, stringToHex, toBytes } from "viem";

import { findMedicationById } from "$lib/utils";
import { walletForUser } from "$lib/server/wallet";
import { consortium, RX_ADDRESS } from "$lib/server/chain";
import { prescriptionDispenseAbi } from "$lib/server/generated";

import { waitOk } from "./utils";

const PLACEHOLDER_SALT = "sreaxixpgfeervavs";
const salt = PLACEHOLDER_SALT;

export type MintInput = {
	prescriberId: number;
	patientAddress: Address;
	patientRef: string;
	tgaId: string;
	dosage: number;
	repeats: number;
	expiryUnix: number;
};

export async function mintPrescription(input: MintInput) {
	const tgaIdNum = parseInt(input.tgaId);
	const medication = await findMedicationById(tgaIdNum);
	if (medication == null) {
		throw new Error(`failed to find medication '${input.tgaId}'`);
	}

	const wallet = await walletForUser(input.prescriberId);
	const hash = await wallet.writeContract({
		account: wallet.account!,
		chain: consortium,
		address: RX_ADDRESS,
		abi: prescriptionDispenseAbi,
		functionName: "mint",
		args: [
			input.patientAddress,
			keccak256(toBytes(`${input.patientRef}:${salt}`)), // NOTE: "{ref}:{salt}"
			stringToHex(String(medication.id), { size: 32 }),
			input.dosage,
			input.repeats,
			BigInt(input.expiryUnix),
		],
	});

	const receipt = await waitOk(hash);
	const [txLog] = parseEventLogs({
		abi: prescriptionDispenseAbi,
		eventName: "Transfer",
		logs: receipt.logs,
	});

	return txLog?.args.tokenId ?? null;
}

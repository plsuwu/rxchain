import type { Address } from "viem";
import type { PrescriptionView } from "./utils";

import {
	prescriptionControlAbi,
	prescriptionDispenseAbi,
	prescriptionMintAbi,
} from "$lib/server/generated";
import { publicClient, RX_ADDRESS } from "$lib/server/chain";

import { getPrescription } from "./utils";
import { walletForUser } from "../wallet";
import { findMedicationById } from "../db/handlers";

export type MedicationDetail = {
	id: number;
	productName: string;
	manufacturer: string;
	activeIngredient: string | null;
	effective: number;
};

export async function prescriptionsOwnedBy(
	address: Address
): Promise<(PrescriptionView & { medicationDetail: MedicationDetail })[]> {
	console.log("looking for:", address);
	const logs = await publicClient.getContractEvents({
		address: RX_ADDRESS,
		abi: prescriptionDispenseAbi,
		eventName: "Transfer",
		args: { to: address },
		fromBlock: 0n,
		toBlock: "latest",
	});

	console.log("found logs:", logs);

	// we can assume the logged args will always be truthy here
	const candidates = [...new Set(logs.map((log) => log.args.tokenId!))];
	const views = await Promise.all(candidates.map((id) => getPrescription(id)));

	const res = [];

	for (const view of views.filter(
		(v): v is PrescriptionView =>
			v !== null && v.owner.toLowerCase() === address.toLowerCase()
	)) {
		const detail = await findMedicationById(Number(view.medicationCode));
		if (detail == null) {
			continue;
		}

		res.push({ ...view, medicationDetail: detail });
	}

	return res;
}

export async function prescriptionsMintedBy(
	address: Address
): Promise<PrescriptionView[]> {
	const logs = await publicClient.getContractEvents({
		address: RX_ADDRESS,
		abi: prescriptionDispenseAbi,
		eventName: "PrescriptionMinted",
		args: { prescriber: address },
		fromBlock: 0n,
		toBlock: "latest",
	});

	const ids = [...new Set(logs.map((log) => log.args.tokenId!))];
	const views = await Promise.all(ids.map((id) => getPrescription(id)));

	return views.filter((v): v is PrescriptionView => v !== null);
}

export async function dispenseHistory() {
	const logs = await publicClient.getContractEvents({
		address: RX_ADDRESS,
		abi: prescriptionDispenseAbi,
		eventName: "Dispensed",
		fromBlock: 0n,
		toBlock: "latest",
	});

	return logs
		.map((log) => ({
			tokId: log.args.tokenId!,
			pharmacy: log.args.pharmacy!,
			repeatsRemaining: log.args.repeatsRemaining!,
			blockNumber: log.blockNumber,
			txHash: log.transactionHash,
		}))
		.reverse();
}

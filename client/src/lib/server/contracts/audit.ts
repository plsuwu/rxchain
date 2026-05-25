import type { Address } from "viem";
import type { PrescriptionView } from "./utils";

import { prescriptionDispenseAbi } from "$lib/server/generated";
import { publicClient, RX_ADDRESS } from "$lib/server/chain";

import { getPrescription } from "./utils";
import { findMedicationById } from "../db/handlers";

// ideally this would refer directly to the block that the contract was deployed to
// but this shouldn't noticably affect performance for this demo...
const DEPLOYED_BLOCK = 0n;
const STEP = 800n;

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
	const logs = [];
	const latest = await publicClient.getBlockNumber();

	for (let start = DEPLOYED_BLOCK; start <= latest; start += STEP) {
		const maxChunkEnd = start + STEP - 1n;
		const end = maxChunkEnd > latest ? latest : maxChunkEnd;

		const chunk = await publicClient.getContractEvents({
			address: RX_ADDRESS,
			abi: prescriptionDispenseAbi,
			eventName: "Transfer",
			args: { to: address },
			fromBlock: start,
			toBlock: end,
		});
		logs.push(...chunk);
	}

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
	const logs = [];
	const latest = await publicClient.getBlockNumber();

	for (let start = DEPLOYED_BLOCK; start <= latest; start += STEP) {
		const maxChunkEnd = start + STEP - 1n;
		const end = maxChunkEnd > latest ? latest : maxChunkEnd;

		const chunk = await publicClient.getContractEvents({
			address: RX_ADDRESS,
			abi: prescriptionDispenseAbi,
			eventName: "PrescriptionMinted",
			args: { prescriber: address },
			fromBlock: start,
			toBlock: end,
		});
		logs.push(...chunk);
	}

	const ids = [...new Set(logs.map((log) => log.args.tokenId!))];
	const views = await Promise.all(ids.map((id) => getPrescription(id)));

	return views.filter((v): v is PrescriptionView => v !== null);
}

export async function dispenseHistory() {
	const logs = [];
	const latest = await publicClient.getBlockNumber();

	for (let start = DEPLOYED_BLOCK; start <= latest; start += STEP) {
		const maxChunkEnd = start + STEP - 1n;
		const end = maxChunkEnd > latest ? latest : maxChunkEnd;

		const chunk = await publicClient.getContractEvents({
			address: RX_ADDRESS,
			abi: prescriptionDispenseAbi,
			eventName: "Dispensed",
			fromBlock: start,
			toBlock: end,
		});

		logs.push(...chunk);
	}

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

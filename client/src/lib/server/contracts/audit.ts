import type { Address } from "viem";
import type { PrescriptionView } from "./utils";

import { prescriptionDispenseAbi } from "$lib/server/generated";
import { publicClient, RX_ADDRESS } from "$lib/server/chain";

import { getPrescription } from "./utils";

export async function prescriptionsOwnedBy(
	address: Address
): Promise<PrescriptionView[]> {
	const logs = await publicClient.getContractEvents({
		address: RX_ADDRESS,
		abi: prescriptionDispenseAbi,
		eventName: "Transfer",
		args: { to: address },
		fromBlock: 0n,
	});

	// we can assume the logged args will always be truthy here
	const candidates = [...new Set(logs.map((log) => log.args.tokenId!))];
	const views = await Promise.all(candidates.map((id) => getPrescription(id)));

	return views.filter(
		(v): v is PrescriptionView =>
			v !== null && v.owner.toLowerCase() === address.toLowerCase()
	);
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

import type { GenericWallet } from "../chain";
import { keccak256, parseEventLogs, stringToHex, toBytes } from "viem";
import { send, prescriptionDispenseAbi as rxAbi, RX } from "../chain";

export type Prescription = {
	ihi: string;
	medicationId: string;
	dose: number;
	repeats: number;
	expiry: bigint;
};

// For testing (!!)
const DEFAULT_IHI = "ihi-8003601234567890:per-patient-salt";
const DEFAULT_TGA_ID = "222958";
const DEFAULT_DOSE = 500;
const DEFAULT_EXPIRY = BigInt(Math.floor(Date.now() / 1000) + 2_592_000);
const DEFAULT_PRESCRIPTION: Prescription = {
	repeats: 1,
	ihi: DEFAULT_IHI,
	medicationId: DEFAULT_TGA_ID,
	dose: DEFAULT_DOSE,
	expiry: DEFAULT_EXPIRY,
};

export const prescribe = async (
	patient: GenericWallet,
	prescriber: GenericWallet,
	rx: Prescription = DEFAULT_PRESCRIPTION
) => {
	const contract = await prescriber.writeContract({
		address: RX,
		abi: rxAbi,
		functionName: "mint",
		args: [
			patient.account.address,
			keccak256(toBytes(rx.ihi)),
			stringToHex(rx.medicationId, { size: 32 }),
			rx.dose,
			rx.repeats,
			rx.expiry,
		],
	});

	const receipt = await send(contract);
	const [transferLog] = parseEventLogs({
		abi: rxAbi,
		eventName: "Transfer",
		logs: receipt.logs,
	});

	return transferLog.args.tokenId;
};

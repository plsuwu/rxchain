import type { GenericWallet } from "../chain";
import { RX, send, prescriptionDispenseAbi as rxAbi } from "../chain";

export const transfer = async (
	patient: GenericWallet,
	pharmacy: GenericWallet,
	token: bigint
) => {
	const contract = await patient.writeContract({
		address: RX,
		abi: rxAbi,
		functionName: "transferFrom",
		args: [patient.account.address, pharmacy.account.address, token],
	});

	await send(contract);
};

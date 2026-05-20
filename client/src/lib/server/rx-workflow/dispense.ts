import type { GenericWallet } from "../chain";
import { RX, send, prescriptionDispenseAbi as rxAbi } from "../chain";

export const dispense = async (pharmacy: GenericWallet, tokenId: bigint) => {
	const contract = await pharmacy.writeContract({
		address: RX,
		abi: rxAbi,
		functionName: "dispense",
		args: [tokenId],
	});

	await send(contract);
};

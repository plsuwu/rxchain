import type { Address } from "viem";

import { walletForUser } from "$lib/server/wallet";
import { consortium, RX_ADDRESS } from "$lib/server/chain";
import { prescriptionDispenseAbi } from "$lib/server/generated";

import { waitOk } from "./utils";

export async function transferToPharmacy(
	patientUserId: number,
	patientAddress: Address,
	pharmacyAddress: Address,
	tokenId: bigint
) {
	const wallet = await walletForUser(patientUserId);
	const hash = await wallet.writeContract({
		account: wallet.account!,
		chain: consortium,
		address: RX_ADDRESS,
		abi: prescriptionDispenseAbi,
		functionName: "transferFrom",
		args: [patientAddress, pharmacyAddress, tokenId],
	});

	return waitOk(hash);
}

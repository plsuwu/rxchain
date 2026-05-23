import { prescriptionDispenseAbi } from "$lib/server/generated";
import { consortium, RX_ADDRESS } from "$lib/server/chain";
import { walletForUser } from "$lib/server/wallet";

import { waitOk } from "./utils";

export async function dispense(pharmacyUserId: number, tokenId: bigint) {
	const wallet = await walletForUser(pharmacyUserId);
	const hash = await wallet.writeContract({
		account: wallet.account!,
		chain: consortium,
		address: RX_ADDRESS,
		abi: prescriptionDispenseAbi,
		functionName: "dispense",
		args: [tokenId],
	});

	return waitOk(hash);
}

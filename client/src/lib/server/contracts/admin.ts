import type { Address, WalletClient } from "viem";
import type { Role } from "$lib/server/db/schema";

import { stringToHex } from "viem";

import { adminAccount, consortium, REGISTRY_ADDRESS } from "$lib/server/chain";
import { registryAbi } from "$lib/server/generated";
import { adminWallet } from "$lib/server/wallet";
import { capitalize } from "$lib/utils";
import { waitOk } from "./utils";

export type ActionableRole = Extract<Role, "prescriber" | "pharmacy">;

export class Registry {
	#adminWallet: WalletClient;
	readonly #BASE_CONTRACT = {
		account: adminAccount,
		chain: consortium,
		address: REGISTRY_ADDRESS,
		abi: registryAbi,
	};

	constructor(adminWallet: WalletClient) {
		this.#adminWallet = adminWallet;
	}

	async authorize(userAddress: Address, role: ActionableRole, ahpraId: string) {
		if (role !== "prescriber" && role !== "pharmacy") {
			throw new Error(`Invalid role: cannot authorize '${role}'`);
		}

		// NOTE: im sure there is a more elegant way to do this but i don't really
		// have the time to find out how
		let hash;
		if (role === "prescriber") {
			if (ahpraId == null || ahpraId === "") {
				throw new Error("Prescriber authorization requires AHPRA identifier");
			}
			const license = stringToHex(ahpraId, { size: 32 });
			hash = await this.#adminWallet.writeContract({
				...this.#BASE_CONTRACT,
				functionName: "addPrescriber",
				args: [userAddress, license],
			});
		} else {
			hash = await this.#adminWallet.writeContract({
				...this.#BASE_CONTRACT,
				functionName: "addPharmacy",
				args: [userAddress],
			});
		}

		return waitOk(hash);
	}

	async revoke(userAddress: Address, role: ActionableRole) {
		const functionName = `revoke${capitalize(role)}` as
			| "revokePharmacy"
			| "revokePrescriber";

		const hash = await this.#adminWallet.writeContract({
			...this.#BASE_CONTRACT,
			functionName,
			args: [userAddress],
		});

		return waitOk(hash);
	}
}

export const REGISTRY_HANDLER = new Registry(adminWallet);

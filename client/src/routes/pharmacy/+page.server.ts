import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { requireRole } from "$lib/server/guard";
import { addressForUser } from "$lib/server/wallet";
import {
	isPharmacyOnChain,
	prescriptionsOwnedBy,
	dispense,
	decodeRevert,
} from "$lib/server/contracts";
import type { Address } from "viem";

export const load: PageServerLoad = async ({ locals }) => {
	const user = requireRole(locals.user, "pharmacy");
	const address = await addressForUser(user.id);
	const verified = address
		? await isPharmacyOnChain(address as Address)
		: false;

    console.log("is verified:", verified);
	const held =
		verified && address ? await prescriptionsOwnedBy(address as Address) : [];
	return {
		address,
		verified,
		held: held.map((p) => ({ ...p, tokenId: p.tokenId.toString() })),
	};
};

export const actions: Actions = {
	dispense: async ({ request, locals }) => {
		const user = requireRole(locals.user, "pharmacy");
		const form = await request.formData();

		const tokenId = BigInt(String(form.get("token-id")));

		try {
			await dispense(user.id, tokenId);
			return { success: `dispensed prescription #${tokenId}.` };
		} catch (err) {
			return fail(400, { error: decodeRevert(err) ?? (err as Error).message });
		}
	},
};

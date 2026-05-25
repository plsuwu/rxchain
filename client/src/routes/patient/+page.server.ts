import type { Address } from "viem";
import type { Actions, PageServerLoad } from "./$types";
import { fail, error } from "@sveltejs/kit";
import {
	findMedicationById,
	verifiedPharmacies,
} from "$lib/server/db/handlers";
import { requireRole } from "$lib/server/guard";
import { addressForUser } from "$lib/server/wallet";
import {
	prescriptionsOwnedBy,
	transferToPharmacy,
	decodeRevert,
} from "$lib/server/contracts";

export const load: PageServerLoad = async ({ locals }) => {
	const user = requireRole(locals.user, "patient");

	try {
		const address = await addressForUser(user.id);
		const prescriptions = await prescriptionsOwnedBy(address!);
		const pharmacies = await verifiedPharmacies();

		return {
			address,
			pharmacies,
			prescriptions: prescriptions.map((p) => ({
				...p,
				tokenId: p.tokenId.toString(),
			})),
		};
	} catch (err) {
		console.error(err);
	}
};

export const actions: Actions = {
	transfer: async ({ request, locals }) => {
		const formData = await request.formData();
		const tokenId = BigInt(String(formData.get("token-id")));
		const pharmacy = String(formData.get("pharmacy")) as Address;

		const user = requireRole(locals.user, "patient");

		const address = await addressForUser(user.id);
		if (!address) {
			console.warn("[/patient][ACTION::default] failed to find wallet:", user);
			return fail(400, { error: "no wallet found" });
		}

		try {
			await transferToPharmacy(user.id, address, pharmacy, tokenId);
		} catch (err) {
			console.error("[/patient][ACTION::default] error:", err);
			return fail(500, { error: decodeRevert(err) ?? (err as Error).message });
		}
		return { ok: `prescription #${tokenId} sent to pharmacy.` };
	},
};

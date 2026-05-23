import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { requireRole } from "$lib/server/guard";
import {
	REGISTRY_HANDLER,
	dispenseHistory,
	decodeRevert,
} from "$lib/server/contracts";
import {
	listPrescriberCredentials,
	listPharmacyCredentials,
	setPrescriberStatus,
	setPharmacyStatus,
	addressOf,
} from "$lib/server/db/handlers";

export const load: PageServerLoad = async ({ locals }) => {
	requireRole(locals.user, "admin");

	const [prescribers, pharmacies, dispenses] = await Promise.all([
		listPrescriberCredentials(),
		listPharmacyCredentials(),
		dispenseHistory(),
	]);
	return {
		prescribers,
		pharmacies,
		dispenses: dispenses.map((d) => ({
			tokenId: d.tokId.toString(),
			pharmacy: d.pharmacy,
			repeatsRemaining: d.repeatsRemaining,
			blockNumber: d.blockNumber?.toString() ?? "",
			txHash: d.txHash,
		})),
	};
};

export const actions: Actions = {
	verifyPrescriber: async ({ request, locals }) => {
		requireRole(locals.user, "admin");
		const form = await request.formData();

		const userId = Number(form.get("user-id"));
		const ahpraId = String(form.get("ahpra-id"));

		try {
			await REGISTRY_HANDLER.authorize(
				await addressOf(userId),
				"prescriber",
				ahpraId
			);
			await setPrescriberStatus(userId, "active");
			return { status: 200, message: "prescriber verified" };
		} catch (err) {
			console.error("[/admin][ACTION::verifyPrescriber] failure:", err);
			return fail(500, { error: decodeRevert(err) ?? (err as Error).message });
		}
	},
	revokePrescriber: async ({ request, locals }) => {
		requireRole(locals.user, "admin");
		const form = await request.formData();

		const userId = Number(form.get("user-id"));

		try {
			await REGISTRY_HANDLER.revoke(await addressOf(userId), "prescriber");
			await setPrescriberStatus(userId, "revoked");
			return { status: 200, message: "prescriber revoked" };
		} catch (err) {
			console.error("[/admin][ACTION::revokePrescriber] failure:", err);
			return fail(500, { error: decodeRevert(err) ?? (err as Error).message });
		}
	},
	verifyPharmacy: async ({ request, locals }) => {
		requireRole(locals.user, "admin");
		const form = await request.formData();

		const userId = Number(form.get("user-id"));

		try {
			await REGISTRY_HANDLER.authorize(await addressOf(userId), "pharmacy");
			await setPharmacyStatus(userId, "active");
			return { status: 200, message: "pharmacy verified" };
		} catch (err) {
			console.error("[/admin][ACTION::verifyPharmacy] failure:", err);
			return fail(500, { error: decodeRevert(err) ?? (err as Error).message });
		}
	},
	revokePharmacy: async ({ request, locals }) => {
		requireRole(locals.user, "admin");
		const form = await request.formData();

		const userId = Number(form.get("user-id"));

		try {
			await REGISTRY_HANDLER.revoke(await addressOf(userId), "pharmacy");
			await setPharmacyStatus(userId, "revoked");
			return { status: 200, message: "pharmacy revoked" };
		} catch (err) {
			console.error("[/admin][ACTION::revokePharmacy] failure:", err);
			return fail(500, { error: decodeRevert(err) ?? (err as Error).message });
		}
	},
};

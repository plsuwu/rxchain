import type { Actions, PageServerLoad } from "./$types";
import type { Address } from "viem";
import { fail } from "@sveltejs/kit";
import { requireRole } from "$lib/server/guard";
import { addressForUser } from "$lib/server/wallet";
import {
	isPrescriberOnChain,
	mintPrescription,
	prescriptionsMintedBy,
	decodeRevert,
} from "$lib/server/contracts";
import { findMedication, listPatients } from "$lib/server/db/handlers";

export const load: PageServerLoad = async ({ locals }) => {
	const user = requireRole(locals.user, "prescriber");

	const address = await addressForUser(user.id);
	const verified = address
		? await isPrescriberOnChain(address as Address)
		: false;
	const [patients, minted] = await Promise.all([
		listPatients(),
		verified && address
			? prescriptionsMintedBy(address as Address)
			: Promise.resolve([]),
	]);
	return {
		address,
		verified,
		patients,
		minted: minted.map((m) => ({ ...m, tokenId: m.tokenId.toString() })),
	};
};

export const actions = {
	search: async ({ request }) => {
		const fd = await request.formData();
		const q = fd.get("search-query");
		if (q == null || q === "") {
			console.warn("empty or missing search query:", q);
			return fail(400, { error: "empty or missing search query" });
		}

		try {
			const data = await findMedication(String(q));
			return data;
		} catch (err) {
			console.error("failed while trying to run search:", err);
			return fail(500, { error: "internal error" });
		}
	},

	mint: async ({ request, locals }) => {
		const user = requireRole(locals.user, "prescriber");
		const form = await request.formData();

		const tgaId = String(form.get("tga-id"));
		const dosage = Number(form.get("dosage"));
		const repeats = Number(form.get("repeats"));
		const expiryDays = Number(form.get("expiry-days"));
		const patientAddress = String(form.get("patient")) as Address;

        console.log(patientAddress);
		const patientRef =
			String(form.get("patient-ref") ?? "").trim() || "unspecified";

		if (!patientAddress || !tgaId) {
			console.warn(
				"[/prescriber][ACTION::mint] missing patient or medication field"
			);
			return fail(400, { error: "Patient and medication required." });
		}
		const expiryUnix = Math.floor(Date.now() / 1000) + expiryDays * 86400;

		try {
			const tokenId = await mintPrescription({
				prescriberId: user.id,
				patientAddress,
				patientRef,
				tgaId,
				dosage,
				repeats,
				expiryUnix,
			});
			return { ok: `Prescription #${tokenId} issued.` };
		} catch (err) {
			console.error("[/prescriber][ACTION::mint] failed:", err);
			return fail(500, { error: decodeRevert(err) ?? (err as Error).message });
		}
	},
} satisfies Actions;

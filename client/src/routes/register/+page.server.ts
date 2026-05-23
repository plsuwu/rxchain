import type { Actions, PageServerLoad } from "./$types";
import type { Role } from "$lib/server/db/schema";
import { fail, redirect } from "@sveltejs/kit";
import { register, createSession } from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(303, `/${locals.user.role}`);
	}

	return {};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const password = String(formData.get("password") ?? "");
		const role = String(formData.get("role") ?? "") as Exclude<Role, "admin">;
		const email = String(formData.get("email") ?? "")
			.trim()
			.toLowerCase();

		if (email === "" || password === "") {
			return fail(400, { error: "email and password required" });
		}

		const extra: Record<string, string> = {};
		if (role === "prescriber") {
			extra.ahpraId = String(formData.get("ahpra-id") ?? "").trim();
			if (extra.ahpraId === "") {
				return fail(400, { error: "AHPRA ID is required for prescribers" });
			}
		} else if (role === "pharmacy") {
			extra.tgaId = String(formData.get("tga-id") ?? "").trim();
            console.log(extra.tgaId);
			if (extra.tgaId === "") {
				return fail(400, { error: "TGA ID is required for pharmacies" });
			}
		}

		try {
			const user = await register({ email, password, role, ...extra });
			const sid = await createSession(user.id);
			cookies.set("session", sid, {
				path: "/",
				httpOnly: true,
				sameSite: "lax",
				maxAge: 60 * 60 * 12,
			});
		} catch (err) {
			console.error("[/register][ACTION::default] error:", err);
			return fail(500, { error: "internal server error" });
		}

		redirect(303, `/${role}`);
	},
} satisfies Actions;

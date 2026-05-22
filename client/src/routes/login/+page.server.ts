import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { login, createSession } from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user != null) {
		redirect(303, `/${locals.user.role}`);
	}

	return {};
};

export const actions = {
	default: async ({ request, cookies, fetch }) => {
		const formData = await request.formData();

		const password = String(formData.get("password") ?? "");
		const email = String(formData.get("email") ?? "")
			.trim()
			.toLowerCase();

		if (email === "" || password === "") {
			console.warn(
				`[/login][ACTION::default] missing email or password\n`,
				`\temail=${email}\n\tpassword=${password}`
			);

			return fail(400, { error: "missing email or password" });
		}

		let role: string;
		try {
			const user = await login(email, password);
			role = user.role;
			const sid = await createSession(user.id);

			cookies.set("session", sid, {
				path: "/",
				httpOnly: true,
				sameSite: "lax",
				maxAge: 60 * 60 * 12,
			});

			console.debug("[/login][ACTION::default] action ok");
			return { status: 204 };
		} catch (err) {
			console.error("[/login][ACTION::default] error:", err);
			return fail(500, { error: "internal server error" });
		}
	},
} satisfies Actions;

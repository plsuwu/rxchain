import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { isValidUserType } from "$lib/utils";

function hasValidCookie(cookies: { name: string; value: string }[]) {
	const cookieNames = cookies.map((cookie) => cookie.name.slice(1));
	const valid = cookieNames.find((cookie) => isValidUserType(cookie));
	if (valid != null) {
		return valid;
	}

	return null;
}

export const load: PageServerLoad = async ({ cookies, url }) => {
	const cookie = cookies.getAll();
	const validCookie = hasValidCookie(cookie);
	if (validCookie != null) {
		// i think this is functional :)
		redirect(302, `/${validCookie}`);
	}

	return {
		preselectUserType: url.searchParams.get("t") ?? "patient",
	};
};

export const actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const userType = formData.get("user-type");

		try {
			const res = await fetch("/api/auth", {
				method: "POST",
				body: JSON.stringify({ userType }),
			});

			if (!res.ok) {
				console.warn("/api/auth returned non-2XX status: ", res);
				fail(res.status, { error: res.statusText });
			}

			return { success: true };
		} catch (err) {
			console.error("failed to run default login action:", err);
			fail(500, { error: err });
		}
	},
} satisfies Actions;

import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { destroySession } from "$lib/server/auth";

export const actions: Actions = {
	default: async ({ cookies }) => {
		const sid = cookies.get("session");
		if (sid) {
			await destroySession(sid);
		}

		cookies.delete("session", { path: "/" });
		redirect(303, "/");
	},
};

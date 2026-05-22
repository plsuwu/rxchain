import { error, redirect } from "@sveltejs/kit";
import type { Role } from "$lib/server/db/schema";

export function requireRole(
	user: App.Locals["user"],
	role: Role
): NonNullable<App.Locals["user"]> {
	if (user == null) {
		redirect(303, "/login");
	}

	if (user.role !== role) {
		error(403, `This page is restricted to ${role}s.`);
	}

	return user;
}

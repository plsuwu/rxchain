import { getSessionUser } from "$lib/server/auth";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const sid = event.cookies.get("session");
	event.locals.user = await getSessionUser(sid);

	return resolve(event);
};

import { redirect, type Handle } from "@sveltejs/kit";

const AUTHORIZED_ROUTES = ["/patient", "/pharmacy", "/prescriber", "/admin"];

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies, route } = event;

	event.locals.loggedIn = cookies
		.getAll()
		.map((cookie) => cookie.name)
		.some((cookie) =>
			AUTHORIZED_ROUTES.map((route) => route.replace("/", "_")).includes(cookie)
		);

	// generally you would would to perform a more robust session check
	// but once again, for the sake of demonstration it is what it is
	if (route.id && AUTHORIZED_ROUTES.includes(route.id)) {
		const routeAsCookie = route.id.replace("/", "_");
		const hasValidCookie = cookies.get(routeAsCookie);

		if (hasValidCookie == null) {
			redirect(302, `login?t=${route.id.slice(1)}`);
		}
	}

	const response = await resolve(event);
	return response;
};

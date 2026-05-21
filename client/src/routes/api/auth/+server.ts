/**
 * this is actually not at all secure (we just authorize users regardless of whether they have an account)
 * but it should work for the sake of demonstration...
 */

import type { RequestHandler } from "@sveltejs/kit";
import { encodeHexUpperCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { json } from "@sveltejs/kit";
import { isValidUserType } from "$lib/utils";

function encodeCookie(data: "admin" | "prescriber" | "pharmacy" | "patient") {
	const encoded = new TextEncoder().encode(data);
	const sha = sha256(encoded);
	return encodeHexUpperCase(sha);
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { userType } = await request.json();
		if (userType == null || !isValidUserType(userType)) {
			console.warn("invalid user type:", userType);
			return json({ error: "invalid request" }, { status: 500 });
		}

		const cookieVal = encodeCookie(userType);
		cookies.set(`_${userType}`, cookieVal, {
			path: "/",
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 14, // 14 days (i think)
		});

		return json({ success: true });
	} catch (err) {
		console.error("failed to run login handler: ", err);
		return json({ error: "internal error" }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	const sessionCookies = cookies.getAll();
	sessionCookies.forEach((cookie) => {
		const userType = cookie.name.slice(1);
		if (isValidUserType(userType)) {
			cookies.set(`_${userType}`, "", {
				path: "/",
				sameSite: "lax",
				maxAge: 0,
			});
		}
	});

	return json(204);
};

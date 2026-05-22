import type { Role } from "$lib/server/db/schema";
import { randomBytes } from "node:crypto";
import { and, eq, gt } from "drizzle-orm";
import { db } from "$lib/server/db";
import {
	sessions,
	users,
	prescriberCredentials,
	pharmacyCredentials,
} from "$lib/server/db/schema";
import { hashPassword, verifyPassword } from "$lib/server/crypto";
import { createCustodialWallet } from "$lib/server/wallet";

const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12h

export async function createSession(userId: number): Promise<string> {
	const id = randomBytes(24).toString("hex");
	await db.insert(sessions).values({
		id,
		user: userId,
		expiry: Date.now() + SESSION_TTL_MS,
	});
	return id;
}

export async function getSessionUser(sessionId: string | undefined) {
	if (!sessionId) return null;
	const row = db
		.select({
			id: users.id,
			email: users.email,
			role: users.role,
		})
		.from(sessions)
		.innerJoin(users, eq(users.id, sessions.user))
		.where(and(eq(sessions.id, sessionId), gt(sessions.expiry, Date.now())))
		.get();
	return row ?? null;
}

export async function destroySession(sessionId: string) {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export interface RegisterInput {
	email: string;
	password: string;
	role: Exclude<Role, "admin">;

	// role-specific dummy credentials
	ahpraId?: string;
	pharmacyName?: string;
	tgaId?: string;
}

export async function register(input: RegisterInput) {
	const existing = await db.query.users.findFirst({
		where: eq(users.email, input.email),
	});
	if (existing) throw new Error("An account with that email already exists.");

	const user = db
		.insert(users)
		.values({
			email: input.email,
			passwordHash: hashPassword(input.password),
			role: input.role,
		})
		.returning()
		.get();

	// custodial wallet: generated + funded server-side
	await createCustodialWallet(user.id);
	if (input.role === "prescriber") {
		await db.insert(prescriberCredentials).values({
			userId: user.id,
			ahpraId: input.ahpraId!,
			ahpraExpiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
		});
	} else if (input.role === "pharmacy") {
		await db.insert(pharmacyCredentials).values({
			userId: user.id,
			tgaId: input.tgaId!,
			name: input.pharmacyName!,
		});
	}

	return user;
}

export async function login(email: string, password: string) {
	const user = await db.query.users.findFirst({
		where: eq(users.email, email),
	});

	if (!user || !verifyPassword(password, user.passwordHash)) {
		throw new Error("invalid email or password.");
	}

	return user;
}

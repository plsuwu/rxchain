import type { Address } from "viem";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import {
	users,
	wallets,
	prescriberCredentials,
	pharmacyCredentials,
} from "$lib/server/db/schema";

export const STATUSES = ["active", "revoked", "pending"] as const;
export type Status = (typeof STATUSES)[number];

export async function listPatients() {
	return db
		.select({ id: users.id, email: users.email, address: wallets.address })
		.from(users)
		.innerJoin(wallets, eq(wallets.userId, users.id))
		.where(eq(users.role, "patient"))
		.all();
}

export async function listPrescriberCredentials() {
	return db
		.select({
			userId: users.id,
			email: users.email,
			address: wallets.address,
			ahpraId: prescriberCredentials.ahpraId,
			ahpraExpiry: prescriberCredentials.ahpraExpiry,
			status: prescriberCredentials.onChainStatus,
		})
		.from(prescriberCredentials)
		.innerJoin(users, eq(users.id, prescriberCredentials.userId))
		.innerJoin(wallets, eq(wallets.userId, users.id))
		.all();
}

export async function listPharmacyCredentials() {
	return db
		.select({
			userId: users.id,
			email: users.email,
			address: wallets.address,
			tgaId: pharmacyCredentials.tgaId,
			name: pharmacyCredentials.name,
			status: pharmacyCredentials.onChainStatus,
		})
		.from(pharmacyCredentials)
		.innerJoin(users, eq(users.id, pharmacyCredentials.userId))
		.innerJoin(wallets, eq(wallets.userId, users.id))
		.all();
}

export async function verifiedPharmacies() {
	const all = await listPharmacyCredentials();
	return all.filter((p) => p.status === "active");
}

export function setPrescriberStatus(userId: number, status: Status) {
	return db
		.update(prescriberCredentials)
		.set({ onChainStatus: status })
		.where(eq(prescriberCredentials.userId, userId));
}

export function setPharmacyStatus(userId: number, status: Status) {
	return db
		.update(pharmacyCredentials)
		.set({ onChainStatus: status })
		.where(eq(pharmacyCredentials.userId, userId));
}

export async function addressOf(userId: number): Promise<Address> {
	const row = await db.query.wallets.findFirst({
		where: eq(wallets.userId, userId),
	});

	if (!row) {
		throw new Error("wallet missing");
	}

	return row.address as Address;
}

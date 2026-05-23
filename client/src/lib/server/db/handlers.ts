import type { Address } from "viem";
import { eq, getTableColumns, like, or, sql } from "drizzle-orm";
import { db } from "$lib/server/db";
import {
	users,
	wallets,
	prescriberCredentials,
	pharmacyCredentials,
	medications,
} from "$lib/server/db/schema";
import { sanitizeQuery } from "$lib/utils";

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

export async function findMedicationById(id: number) {
	return db.select().from(medications).where(eq(medications.id, id)).get();
}

export async function findMedication(query: string) {
	const trimmed = sanitizeQuery(query.trim());
	if (trimmed == null) {
		return [];
	}

	const exact = trimmed.toLowerCase();
	const prefix = `${trimmed}%`;
	const anywhere = `%${trimmed}%`;

	return db
		.select({
			...getTableColumns(medications),
			rank: sql<number>`
      CASE
        WHEN lower(${medications.productName}) = ${exact} THEN 0
        WHEN ${medications.productName} LIKE ${prefix} THEN 1
        WHEN ${medications.activeIngredient} LIKE ${prefix} THEN 2
        WHEN ${medications.productName} LIKE ${anywhere} THEN 3
        ELSE 4
      END
    `.as("rank"),
		})
		.from(medications)
		.where(
			or(
				like(medications.productName, anywhere),
				like(medications.manufacturer, anywhere),
				like(medications.activeIngredient, anywhere)
			)
		)
		.orderBy(sql`rank`)
		.limit(500); // some kind of semi-reasonable limit
}

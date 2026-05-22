import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const ROLES = ["patient", "prescriber", "pharmacy", "admin"] as const;
export type Role = (typeof ROLES)[number];

export const medications = sqliteTable("medications", {
	id: integer("id").primaryKey(),
	productName: text("product_name").notNull(),
	manufacturer: text("manufacturer").notNull(),
	activeIngredient: text("active_ingredient"),
	effective: integer("effective").notNull(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
});

export const sessions = sqliteTable("sessions", {
	id: text("id").primaryKey(),
	user: integer("user").references(() => users.id),
	expiry: integer("expire").notNull(),
});

export const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	email: text("email").notNull().unique(),
	passwordHash: text("password_hash").notNull(),
	role: text("role", { enum: ROLES }).notNull(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
});

/**
 * NOTE: the server holds every user's key, which is not PARTICULARLY strong security.
 *
 * `encryptedKey` is the AES-256-GCM ciphertext of the raw private key. In production
 * this column does not exist as the key would live in an HSM/KMS or the user's own
 * passkey wallet, and the opaque reference would be stored here instead.
 */
export const wallets = sqliteTable("wallets", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id)
		.unique(),
	address: text("address").notNull().unique(),
	encryptedKey: text("encrypted_key").notNull(),
});

/**
 * Dummy AHPRA credential table.
 *
 * `onChainStatus` mirrors what the Registry contract believes, so the two can be diffed
 */
export const prescriberCredentials = sqliteTable("prescriber_credentials", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id)
		.unique(),
	ahpraId: text("ahpra_id").notNull().unique(),
	ahpraExpiry: integer("ahpra_expiry", { mode: "timestamp" }).notNull(),
	onChainStatus: text("on_chain_status", {
		enum: ["pending", "active", "revoked"],
	})
		.notNull()
		.default("pending"),
});

export const pharmacyCredentials = sqliteTable("pharmacy_credentials", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id)
		.unique(),
	tgaId: text("tga_id").notNull().unique(),
	name: text("name").notNull(),
	onChainStatus: text("on_chain_status", {
		enum: ["pending", "active", "revoked"],
	})
		.notNull()
		.default("pending"),
});

export type User = typeof users.$inferSelect;
export type Wallet = typeof wallets.$inferSelect;

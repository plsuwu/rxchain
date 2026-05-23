import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../src/lib/server/db/schema";
import { createCipheriv, randomBytes, scryptSync } from "crypto";
import { eq } from "drizzle-orm";
import { users, wallets } from "../src/lib/server/db/schema";
import { privateKeyToAccount } from "viem/accounts";

const client = new Database("src/lib/server/db/sqlite.db");
const db = drizzle(client, { schema });

const email = "john@admin.com";
const password = "test";
const pk =
	"0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63" as `0x${string}`;

export function hashPassword(password: string): string {
	const salt = randomBytes(16);
	const hash = scryptSync(password, salt, 64);
	return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

function encKey(): Buffer {
	const secret = "NNtbgNJgK54cY7jE7ugWfuQY33WTzZuPHT";
	return scryptSync(secret, "&a3rH&VbWJy#9YxW9", 32);
}

export function encryptKey(privateKey: string): string {
	const iv = randomBytes(12);
	const cipher = createCipheriv("aes-256-gcm", encKey(), iv);
	const enc = Buffer.concat([
		cipher.update(privateKey, "utf8"),
		cipher.final(),
	]);
	const tag = cipher.getAuthTag();
	return `${iv.toString("hex")}:${tag.toString("hex")}:${enc.toString("hex")}`;
}

const existing = db.select().from(users).where(eq(users.email, email)).get();
if (existing) {
	console.log(`admin '${email}' already exists; nothing to do`);
	process.exit(0);
}

const account = privateKeyToAccount(pk);
const admin = db
	.insert(users)
	.values({ email, passwordHash: hashPassword(password), role: "admin" })
	.returning()
	.get();

await db.insert(wallets).values({
	userId: admin.id,
	address: account.address,
	encryptedKey: encryptKey(pk),
});

console.log(`admin user:
  email:    ${email}
  password: ${password}
  wallet:   ${account.address}`);

process.exit(0);

import {
	createCipheriv,
	createDecipheriv,
	randomBytes,
	scryptSync,
	timingSafeEqual,
} from "node:crypto";
import { env } from "$env/dynamic/private";

export function hashPassword(password: string): string {
	const salt = randomBytes(16);
	const hash = scryptSync(password, salt, 64);
	return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
	const [scheme, saltHex, hashHex] = stored.split("$");
	if (scheme !== "scrypt" || !saltHex || !hashHex) return false;
	const salt = Buffer.from(saltHex, "hex");
	const expected = Buffer.from(hashHex, "hex");
	const actual = scryptSync(password, salt, expected.length);
	return actual.length === expected.length && timingSafeEqual(actual, expected);
}

/**
 * AES-256-GCM under a single application-wide secret.
 *
 * Custodial key encryption with a relaxed security model.
 *
 * This is intended to imitate envelope encryption, though this leaves a wider attack surgace;
 * in an actual deployment we would realistically replace WALLET_ENC_SECRET with a KMS-held
 * master key (so as to only storing the ciphertext).
 */
function encKey(): Buffer {
	const secret = env.WALLET_ENC_SECRET ?? "NNtbgNJgK54cY7jE7ugWfuQY33WTzZuPHT";
	// normalise any-length secret to 32 bytes deterministically.
	return scryptSync(secret, "&a3rH&VbWJy#9YxW9", 32);
}

// output format: `ivHex:authTagHex:cipherHex` - could probably implement a type for this but
// that might create problems and its not that big of a deal here.
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

export function decryptKey(blob: string): string {
	const [ivHex, tagHex, cipherHex] = blob.split(":");
	const decipher = createDecipheriv(
		"aes-256-gcm",
		encKey(),
		Buffer.from(ivHex, "hex")
	);
	decipher.setAuthTag(Buffer.from(tagHex, "hex"));
	const dec = Buffer.concat([
		decipher.update(Buffer.from(cipherHex, "hex")),
		decipher.final(),
	]);
	return dec.toString("utf8");
}

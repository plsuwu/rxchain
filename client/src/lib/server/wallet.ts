import type { Address, WalletClient } from "viem";
import { createWalletClient, http, parseEther } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { env } from "$env/dynamic/private";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { wallets } from "$lib/server/db/schema";

import { encryptKey, decryptKey } from "$lib/server/crypto";
import { adminAccount, consortium, publicClient } from "$lib/server/chain";

const RPC_URL = env.RPC_URL ?? "http://localhost:8545";

function client(account: ReturnType<typeof privateKeyToAccount>): WalletClient {
	return createWalletClient({
		account,
		chain: consortium,
		transport: http(RPC_URL),
	});
}

export const adminWallet = client(adminAccount);

/**
 * This doesn't actually create a custodial wallet, that was what I was GOING to do
 * with this but this is not what we wound up going with.
 * */
export async function createCustodialWallet(userId: number): Promise<Address> {
	const privateKey = generatePrivateKey();
	const account = privateKeyToAccount(privateKey);

	await db.insert(wallets).values({
		userId,
		address: account.address,
		encryptedKey: encryptKey(privateKey),
	});

	try {
		const hash = await adminWallet.sendTransaction({
			account: adminAccount,
			chain: consortium,
			to: account.address,
			value: parseEther("1"),
		});
		await publicClient.waitForTransactionReceipt({ hash });
	} catch (err) {
		console.warn("wallet funding skipped:", (err as Error).message);
	}

	return account.address;
}

/** Loads a viem wallet client that signs as the user's key */
export async function walletForUser(userId: number): Promise<WalletClient> {
	const row = await db.query.wallets.findFirst({
		where: eq(wallets.userId, userId),
	});
	if (!row) throw new Error(`no wallet for user ${userId}`);

	const account = privateKeyToAccount(
		decryptKey(row.encryptedKey) as `0x${string}`
	);
	return client(account);
}

export async function addressForUser(userId: number): Promise<Address | null> {
	const row = await db.query.wallets.findFirst({
		where: eq(wallets.userId, userId),
	});
	console.log("address for user: ", userId, row?.address);

	return (row?.address as Address) ?? null;
}

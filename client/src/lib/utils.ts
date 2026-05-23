import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Role } from "./server/db/schema";
import { ROLES } from "./server/db/schema";

import { or, like, sql, getTableColumns, eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { medications } from "$lib/server/db/schema";

// ---------------------------------------------------
// TODO: might remove these tailwind class helpers
// ---------------------------------------------------

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
	? Omit<T, "children">
	: T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
	ref?: U | null;
};

// ---------------------------------------------------

/**
 * Escapes `%` strings in a query to facilitate filtering using `... LIKE %query%`.
 *
 * Note that this is not intended as a safety mechanism - we don't attempt to sanitize
 * for injection-like inputs here.
 * */
export function sanitizeQuery(query: string) {
	return query.replace(/[\\%_]/g, "\\$&");
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isValidRole(role: string): role is Role {
	return ROLES.some((validRole) => validRole === role);
}

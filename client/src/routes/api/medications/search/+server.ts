import { db } from "$lib/server/db";
import { medications } from "$lib/server/db/schema";
import { json, type RequestHandler } from "@sveltejs/kit";
import { or, like, sql, getTableColumns } from "drizzle-orm";

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get("q");
	if (q == null) {
		return json({ error: "missing query parameter" }, { status: 400 });
	}

	const results = await searchMedication(q);
	return json({ data: [...results] });
};

function sanitizeQuery(query: string) {
	return query.replace(/[\\%_]/g, "\\$&");
}

async function searchMedication(query: string) {
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

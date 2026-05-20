import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const medications = sqliteTable("medications", {
	id: integer("id").primaryKey(),
	productName: text("product_name").notNull(),
	manufacturer: text("manufacturer").notNull(),
	activeIngredient: text("active_ingredient"),
	effective: integer("effective").notNull(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
});

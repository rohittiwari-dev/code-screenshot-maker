import {
	pgTable,
	text,
	integer,
	varchar,
	boolean,
	timestamp,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

// ---------------------
// Sharable Link Data Table
// ---------------------
export const sharableLinkDataTable = pgTable("sharable_link_data_table", {
	id: text()
		.primaryKey()
		.$defaultFn(() => createId()),
	code: text("code").notNull(),
	title: varchar("title", { length: 50 }).notNull(),
	theme: varchar("theme", { length: 50 }).notNull(),
	darkMode: boolean("dark_mode").default(true),
	showBackground: boolean("show_background").default(true),
	language: varchar("language", { length: 50 }).notNull(),
	autoDetectLanguage: boolean("auto_detect_language").default(false),
	fontSize: integer("font_size").notNull(),
	fontStyle: varchar("font_style", { length: 50 }).notNull(),
	padding: integer("padding").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

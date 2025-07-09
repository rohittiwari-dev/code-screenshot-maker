"use server";
import db from "@/db";
import { sharableLinkDataTable } from "../db/schema";
import { lt } from "drizzle-orm";

export const createSharableLink = async (
	data: typeof sharableLinkDataTable.$inferInsert,
) => {
	try {
		const [result] = await db
			.insert(sharableLinkDataTable)
			.values(data)
			.returning();
		return {
			data: result,
			error: false,
			msg: "Sharable link created successfully",
		};
	} catch (error) {
		return {
			data: null,
			error: true,
			msg: "Error creating sharable link : " + (error as Error)?.message,
		};
	}
};

export const findSharableLinkById = async (id: string) => {
	try {
		const result = await db.query.sharableLinkDataTable.findFirst({
			where: (table, { eq }) => eq(table.id, id),
		});
		return {
			data: result,
			error: false,
			msg: "Sharable link Fetched successfully",
		};
	} catch (error) {
		return {
			data: null,
			error: true,
			msg: "Failed to find sharable link : " + (error as Error)?.message,
		};
	}
};

export async function deleteOldMessages() {
	const threshold = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 1 week ago

	const result = await db
		.delete(sharableLinkDataTable)
		.where(lt(sharableLinkDataTable.createdAt, threshold));

	const deletedCount = result.rowCount || 0;
	console.log(
		`[CRON] Deleted ${deletedCount} old messages older than 1 week`,
	);

	return {
		deletedCount,
		threshold: threshold.toISOString(),
		timestamp: new Date().toISOString(),
	};
}

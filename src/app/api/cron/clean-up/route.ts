import { NextResponse } from "next/server";
import { deleteOldMessages } from "@/actions";

export async function POST(request: Request) {
	try {
		// Get the secret from environment variables
		const cronSecret = process.env.CRON_SECRET;

		if (!cronSecret) {
			console.error("[CRON] CRON_SECRET not configured in environment");
			return NextResponse.json(
				{
					message: "Server configuration error",
					timestamp: new Date().toISOString(),
				},
				{ status: 500 },
			);
		}

		// Parse the request body
		const body = await request.json();

		// Validate the secret
		if (!body.secret || body.secret !== cronSecret) {
			console.error("[CRON] Invalid or missing secret in request");
			return NextResponse.json(
				{
					message: "Unauthorized - Invalid secret",
					timestamp: new Date().toISOString(),
				},
				{ status: 401 },
			);
		}

		// Perform the cleanup using existing action
		console.log("[CRON] Running cleanup job - deleting 1 week old data");
		const result = await deleteOldMessages();

		return NextResponse.json(
			{
				message: "Cleanup completed successfully",
				deletedRecords: result.deletedCount,
				threshold: result.threshold,
				timestamp: result.timestamp,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("[CRON] Error during cleanup:", error);

		return NextResponse.json(
			{
				message: "Cleanup failed",
				error: (error as Error).message,
				timestamp: new Date().toISOString(),
			},
			{ status: 500 },
		);
	}
}

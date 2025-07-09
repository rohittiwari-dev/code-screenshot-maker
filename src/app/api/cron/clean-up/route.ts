import { NextResponse } from "next/server";
import { deleteOldMessages } from "@/actions";

export async function POST(request: Request) {
	try {
		// Get the secret from environment variables
		const cronSecret = process.env.CRON_SECRET;

		if (!cronSecret) {
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
			return NextResponse.json(
				{
					message: "Unauthorized - Invalid secret",
					timestamp: new Date().toISOString(),
				},
				{ status: 401 },
			);
		}

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

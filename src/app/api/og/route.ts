import { findSharableLinkById } from "@/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const shareId = searchParams.get("t");

		if (!shareId) {
			// Redirect to default thumbnail
			return NextResponse.redirect(
				new URL("/thumbnail.png", request.url),
			);
		}

		const result = await findSharableLinkById(shareId);
		const sharedData = result?.data;

		if (!sharedData) {
			// Redirect to default thumbnail
			return NextResponse.redirect(
				new URL("/thumbnail.png", request.url),
			);
		}

		// For now, we'll redirect to the default thumbnail
		// In a production environment, you'd want to generate a dynamic image here
		// using a service like Puppeteer, Playwright, or a cloud service
		return NextResponse.redirect(new URL("/thumbnail.png", request.url));
	} catch (e: unknown) {
		console.log(
			`Error generating OG image: ${
				e instanceof Error ? e.message : "Unknown error"
			}`,
		);
		// Fallback to default thumbnail
		return NextResponse.redirect(new URL("/thumbnail.png", request.url));
	}
}

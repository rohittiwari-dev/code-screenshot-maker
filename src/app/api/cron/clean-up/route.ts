import "@/actions/cron.action";
import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({ message: "Cron started" }, { status: 200 });
}

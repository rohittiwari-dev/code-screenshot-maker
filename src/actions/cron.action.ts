// cron/index.ts
import cron from "node-cron";
import { deleteOldMessages } from ".";

// Runs every hour at minute 0
cron.schedule("0 * * * *", async () => {
	console.log("[CRON] Running cleanup job");
	await deleteOldMessages();
});

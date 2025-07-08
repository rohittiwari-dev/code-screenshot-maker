import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as Schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema: Schema });

export default db;
export { Schema };

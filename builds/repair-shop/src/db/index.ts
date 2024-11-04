import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

//console.log(process.env.DATABASE_URL);

// logger
// const db = drizzle(sql, { logger: true })
const db = drizzle(sql);

//console.log(db);
export { db };

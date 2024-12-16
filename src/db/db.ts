import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Context } from "hono";
import { env } from "hono/adapter";

let dbInstance: ReturnType<typeof drizzle>;

export function getDb(c: Context) {
  if (!dbInstance) {
    const pool = new Pool({
      connectionString: env<{ DATABASE_URL: string }>(c).DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 3,
    });
    dbInstance = drizzle(pool);
  }
  return dbInstance;
}


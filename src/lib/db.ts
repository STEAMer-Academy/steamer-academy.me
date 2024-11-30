import { drizzle } from "drizzle-orm/node-postgres";
import { getXataClient } from "./xata";
import { Pool } from "pg";

const xata = getXataClient();
const pool = new Pool({ connectionString: xata.sql.connectionString, max: 5 });
export const db = drizzle(pool);

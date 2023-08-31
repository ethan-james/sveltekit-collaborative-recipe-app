import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

neonConfig.fetchConnectionCache = true;

const sql = neon(import.meta.env.VITE_DATABASE_URL);
export const db = drizzle(sql, { schema });

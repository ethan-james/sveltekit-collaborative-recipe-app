import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
	out: "./src/db/migrations",
	schema: "./src/db/schema.ts",
	breakpoints: true,
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.VITE_DATABASE_URL || ""
	}
} satisfies Config;

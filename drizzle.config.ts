import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env" });

declare const process: {
	env: {
		TURSO_CONNECTION_URL: string;
		TURSO_AUTH_TOKEN: string;
	};
};

export default defineConfig({
	out: "./src/db/migrations",
	schema: "./src/db/schema.ts",
	dialect: "sqlite",
	driver: "turso",
	dbCredentials: {
		url: process.env.TURSO_CONNECTION_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!
	}
});

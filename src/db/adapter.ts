import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import * as schema from "./schema";

declare const process: {
	env: {
		TURSO_CONNECTION_URL: string;
		TURSO_AUTH_TOKEN: string;
	};
};

config({ path: ".env" });

const client = createClient({
	url: process.env.TURSO_CONNECTION_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN!
});

export const db = drizzle(client, { schema });

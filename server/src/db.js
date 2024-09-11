import { createClient } from "@libsql/client";

// load the env vars to connect to turso
import dotenv from "dotenv";
dotenv.config();

/**
 * @description Connect to the turso database
 */
export const tursoDB = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:./../mini-link-local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

import { createClient } from '@libsql/client';

// load the env vars to connect to turso
import dotenv from 'dotenv';
dotenv.config();

/**
 * @description Connect to the turso database
 */
export const tursoDB = createClient({
  url: process.env.TURSO_DATABASE_URL ?? `file:${process.env.LOCAL_DB_PATH}`,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

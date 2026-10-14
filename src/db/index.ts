import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Reuse one client across hot reloads in dev, and across invocations in a serverless instance.
const globalForDb = globalThis as unknown as { pg?: ReturnType<typeof postgres> };

function client() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  // `prepare: false` is required for Supabase's transaction pooler (pgbouncer).
  globalForDb.pg ??= postgres(url, { prepare: false, max: 5 });
  return globalForDb.pg;
}

export const db = () => drizzle(client(), { schema });
export { schema };

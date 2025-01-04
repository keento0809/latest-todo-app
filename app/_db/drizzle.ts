import * as schema from "@/app/_db/schema";
import { env } from "@/env";
import { drizzle } from "drizzle-orm/neon-http";

if (!env.DATABASE_URL) {
  throw new Error(`DATABASE_URL is not defined ${env.DATABASE_URL}`);
}

export const db = drizzle(env.DATABASE_URL!, { schema });

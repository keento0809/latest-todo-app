import * as schema from "@/app/_db/schema";
import { drizzle } from "drizzle-orm/neon-http";

if (!process.env.DATABASE_URL) {
  throw new Error(`DATABASE_URL is not defined ${process.env.DATABASE_URL}`);
}

export const db = drizzle(process.env.DATABASE_URL!, { schema });

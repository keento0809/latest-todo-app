import * as schema from "@/app/_db/schema";
import { drizzle } from "drizzle-orm/neon-http";

// if (!process.env.DATABASE_URL) {
//   throw new Error(`DATABASE_URL is not defined ${process.env.DATABASE_URL}`);
// }

export const db = drizzle(
  "postgresql://neondb_owner:HUD2mxIWvL0i@ep-curly-grass-a7k102vj.ap-southeast-2.aws.neon.tech/neondb?sslmode=require",
  { schema }
);

import { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/app/_db/drizzle";

export const config: NextAuthConfig = {
  // TODO: fix them later
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    sessionsTable: sessions,
  }),
  callbacks: {},
  providers: [],
};

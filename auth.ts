import NextAuth from "next-auth";
import { config } from "./app/_libs/auth/config";

// TODO: Add config later
export const { handlers, auth, signIn, signOut } = NextAuth(config);

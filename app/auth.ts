import NextAuth from "next-auth";

// TODO: Add config later
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [],
});

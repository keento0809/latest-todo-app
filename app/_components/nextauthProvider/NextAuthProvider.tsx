"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { PropsWithChildren } from "react";

type NextAuthProviderProps = PropsWithChildren<{ session: Session | null }>;

export const NextAuthProvider = ({
  children,
  session,
}: NextAuthProviderProps) => {
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
};

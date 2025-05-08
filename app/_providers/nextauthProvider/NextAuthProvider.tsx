"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

type NextAuthProviderProps = PropsWithChildren;

export const NextAuthProvider = ({ children }: NextAuthProviderProps) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  );
};

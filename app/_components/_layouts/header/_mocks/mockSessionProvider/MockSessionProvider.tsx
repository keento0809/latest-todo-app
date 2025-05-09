import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

type MockSessionProviderProps = PropsWithChildren<{ session: Session | null }>;

export const MockSessionProvider = ({
  session,
  children,
}: MockSessionProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

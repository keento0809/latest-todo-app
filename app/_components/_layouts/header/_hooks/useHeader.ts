import { useSession } from "next-auth/react";

export const useHeader = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const isLoggedIn = !!(isAuthenticated && session?.user);

  return { isLoggedIn };
};

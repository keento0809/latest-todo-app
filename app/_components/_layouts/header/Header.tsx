import Link from "next/link";

type HeaderProps = {
  isLoggedIn: boolean;
};

/**
 * Header component that appears at the top of the application pages.
 *
 * This component provides the main navigation bar with the application title
 * and authentication-related links. It uses the `useHeader` hook to determine
 * the user's authentication state and display appropriate login/logout options.
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 *
 * @returns A header element containing the application title and authentication links
 */

export const Header = ({ isLoggedIn }: HeaderProps) => {
  return (
    <div className="w-full py-4 px-4 lg:px-8 sticky top-0 left-0 border-b-2 border-purple-600">
      <div className="w-full flex justify-between">
        <Link href="/">LatestTodo</Link>
        <div>
          <Link href={isLoggedIn ? "/logout" : "/signin"}>
            {isLoggedIn ? "Logout" : "Login"}
          </Link>
        </div>
      </div>
    </div>
  );
};

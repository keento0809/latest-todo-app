import Link from "next/link";

type HeaderPresentationProps = {
  isLoggedIn: boolean;
};

/**
 * HeaderPresentation component that appears at the top of the application pages.
 *
 * This component provides the main navigation bar with the application title
 * and authentication-related links. It displays different authentication options
 * based on the user's login status provided through the `isLoggedIn` prop.
 *
 * @param {HeaderPresentationProps} props - Component props
 * @param {boolean} props.isLoggedIn - Flag indicating whether the user is currently logged in
 *
 * @example
 * ```tsx
 * <HeaderPresentation isLoggedIn={true} />
 * ```
 *
 * @returns A headerPresentation element containing the application title and authentication links
 */

export const HeaderPresentation = ({ isLoggedIn }: HeaderPresentationProps) => {
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

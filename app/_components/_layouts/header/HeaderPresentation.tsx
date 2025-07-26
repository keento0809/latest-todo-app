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
    <header className="w-full py-2 px-4 lg:px-8 sticky top-0 left-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200/50 shadow-soft">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-200"
        >
          LatestTodo
        </Link>
        <nav>
          <Link 
            href={isLoggedIn ? "/logout" : "/signin"}
            className="btn-secondary text-sm"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </Link>
        </nav>
      </div>
    </header>
  );
};

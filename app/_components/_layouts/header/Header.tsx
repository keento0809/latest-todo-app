import Link from "next/link";
import { useHeader } from "./_hooks/useHeader";

export const Header = () => {
  const { isLoggedIn } = useHeader();

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

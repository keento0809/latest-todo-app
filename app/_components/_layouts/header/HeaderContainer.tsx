import { useHeader } from "./_hooks/useHeader";
import { Header } from "./HeaderPresentation";

export const HeaderContainer = () => {
  const { isLoggedIn } = useHeader();

  return <Header isLoggedIn={isLoggedIn} />;
};

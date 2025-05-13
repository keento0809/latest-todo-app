import { useFooter } from "./_hooks/useFooter";
import { FooterPresentation } from "./FooterPresentation";

export const FooterContainer = () => {
  const { handleNavigateToHome } = useFooter();

  return <FooterPresentation handleClick={handleNavigateToHome} />;
};

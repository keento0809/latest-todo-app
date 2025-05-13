"use client";

import { useHeader } from "./_hooks/useHeader";
import { HeaderPresentation } from "./HeaderPresentation";

export const HeaderContainer = () => {
  const { isLoggedIn } = useHeader();

  return <HeaderPresentation isLoggedIn={isLoggedIn} />;
};

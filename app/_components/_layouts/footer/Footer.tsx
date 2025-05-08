"use client";

import { BaseButton } from "../../_common/baseButton/BaseButton";
import { useFooter } from "./_hooks/useFooter";

export const Footer = () => {
  const { handleNavigateToHome } = useFooter();

  return (
    <footer className="fixed bottom-0 py-12">
      <BaseButton onClick={handleNavigateToHome}>Back</BaseButton>
    </footer>
  );
};

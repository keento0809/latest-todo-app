"use client";

import { BaseButton } from "../../_common/baseButton/BaseButton";
import { useFooter } from "./_hooks/useFooter";

/**
 * Footer component that appears at the bottom of the application pages.
 *
 * This component provides navigation functionality back to the home page
 * through a "Back" button. It uses the `useFooter` hook to handle navigation logic.
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 *
 * @returns A footer element containing a "Back" button that navigates to the home page
 */
export const Footer = () => {
  const { handleNavigateToHome } = useFooter();

  return (
    <footer className="w-full max-w-[200px] mx-auto flex justify-center items-center py-12">
      <BaseButton onClick={handleNavigateToHome}>Back</BaseButton>
    </footer>
  );
};

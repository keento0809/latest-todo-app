"use client";

import { useFooter } from "./_hooks/useFooter";

export const Footer = () => {
  const { handleNavigateToHome } = useFooter();

  return (
    <footer className="fixed bottom-0 py-12">
      <button
        onClick={handleNavigateToHome}
        className="px-8 py-2 rounded-lg border border-purple-400 text-md"
      >
        Back
      </button>
    </footer>
  );
};

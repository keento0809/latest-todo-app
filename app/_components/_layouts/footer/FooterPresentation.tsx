import { BaseButton } from "../../_common/_ui/buttons/baseButton/BaseButton";

type FooterPresentationProps = {
  handleClick: () => void;
};

/**
 * FooterPresentation component that appears at the bottom of the application pages.
 *
 * This component provides navigation functionality back to the home page
 * through a "Back" button. It uses the `useFooterPresentation` hook to handle navigation logic.
 *
 * @example
 * ```tsx
 * <FooterPresentation />
 * ```
 *
 * @returns A footerPresentation element containing a "Back" button that navigates to the home page
 */
export const FooterPresentation = ({
  handleClick,
}: FooterPresentationProps) => {
  return (
    <footer className="w-full max-w-[200px] mx-auto flex justify-center items-center py-12">
      <BaseButton onClick={handleClick}>Back</BaseButton>
    </footer>
  );
};

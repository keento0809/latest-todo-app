
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
    <footer className="w-full border-t border-neutral-200/50 bg-white/80 backdrop-blur-lg mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-neutral-800 mb-1">LatestTodo</h3>
            <p className="text-sm text-neutral-600">Modern task management made simple</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleClick}
              className="btn-secondary"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-neutral-200/50 text-center">
          <p className="text-xs text-neutral-500">
            © 2024 LatestTodo. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

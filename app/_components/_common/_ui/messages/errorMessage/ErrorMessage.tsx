import { PropsWithChildren } from "react";

/**
 * ErrorMessage component for displaying form validation errors and other error messages.
 *
 * @component
 * @param {PropsWithChildren} props - The component props
 * @param {React.ReactNode} props.children - The content to be displayed as the error message
 *
 * @example
 * ```tsx
 * <ErrorMessage>This field is required</ErrorMessage>
 * ```
 *
 * @example
 * ```tsx
 * <ErrorMessage>
 *   <span>Invalid email format. <a href="/help">Learn more</a></span>
 * </ErrorMessage>
 * ```
 *
 * @returns {JSX.Element} A styled error message with consistent formatting
 */
export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-red-500 font-semibold text-xs py-1">{children}</div>
  );
};

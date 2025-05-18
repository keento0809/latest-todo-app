import { PropsWithChildren } from "react";

/**
 * FormTitle component for displaying consistent form headings across the application.
 *
 * @component
 * @param {PropsWithChildren} props - The component props
 * @param {React.ReactNode} props.children - The content to be displayed as the form title
 *
 * @example
 * ```tsx
 * <FormTitle>Login to Your Account</FormTitle>
 * ```
 *
 * @returns {JSX.Element} A styled h2 heading with consistent formatting
 */
export const FormTitle = ({ children }: PropsWithChildren) => {
  return <h2 className="text-xl font-semibold text-center pb-8">{children}</h2>;
};

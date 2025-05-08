import { ComponentProps } from "react";

/**
 * Props for the BaseButton component.
 * Inherits all native `<button>` attributes and adds custom ones.
 */
type BaseButtonProps = Omit<ComponentProps<"button">, "type" | "onClick"> & {
  /**
   * The button type attribute.
   * Determines the behavior of the button when inside a form.
   * - `"submit"`: submits the form
   * - `"reset"`: resets all form fields
   * - `"button"`: does nothing by default
   * @default "button"
   */
  type?: "reset" | "submit" | "button";

  /**
   * Optional click handler for the button.
   */
  onClick?: () => void;

  /**
   * Whether the button is in a pending/loading state.
   * If true, the button is disabled and styled accordingly.
   * @default false
   */
  isPending?: boolean;
};

/**
 * A reusable base button component with custom styling.
 * Automatically disables itself when `isPending` is true.
 */
export const BaseButton = ({
  children,
  type = "button",
  isPending = false,
  onClick,
  ...props
}: BaseButtonProps) => {
  return (
    <button
      type={type}
      disabled={isPending}
      onClick={onClick}
      className="border-2 w-1/2 mx-auto border-purple-500 rounded-lg py-2 px-4 text-slate-800 hover:scale-105 transition-all disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
};

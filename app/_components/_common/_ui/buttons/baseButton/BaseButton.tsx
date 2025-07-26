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
      className="btn-primary w-full max-w-sm mx-auto relative overflow-hidden group"
      {...props}
    >
      <span className={`transition-opacity duration-200 ${isPending ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
    </button>
  );
};

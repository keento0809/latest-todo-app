import { ComponentProps } from "react";

type BaseButtonProps = ComponentProps<"button"> & {
  isPending?: boolean;
};

export const BaseButton = ({
  children,
  type = "button",
  isPending = false,
  ...props
}: BaseButtonProps) => {
  return (
    <button
      type={type}
      disabled={isPending}
      className="border-2 w-1/2 mx-auto border-purple-500 rounded-lg py-2 px-4 text-slate-800 hover:scale-105 transition-all disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
};

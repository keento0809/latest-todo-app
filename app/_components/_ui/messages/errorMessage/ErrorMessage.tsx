import { PropsWithChildren } from "react";

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-red-500 font-semibold text-xs py-1">{children}</div>
  );
};

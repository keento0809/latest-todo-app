import { PropsWithChildren } from "react";

export const FormTitle = ({ children }: PropsWithChildren) => {
  return <h2 className="text-xl font-semibold text-center pb-8">{children}</h2>;
};

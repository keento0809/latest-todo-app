import { PropsWithChildren } from "react";

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  return <div className="pt-10">{children}</div>;
};

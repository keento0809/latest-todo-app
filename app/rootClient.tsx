import { PropsWithChildren } from "react";
import { headers } from "next/headers";
import { Footer } from "./_components/footer/Footer";

export const RootClient = async ({ children }: PropsWithChildren) => {
  const headersList = await headers();
  const path = headersList.get("x-path");

  return (
    <div className="Root min-h-screen flex flex-col items-center justify-start pt-10">
      {children}
      {path !== "/" && <Footer />}
    </div>
  );
};

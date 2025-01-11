import { PropsWithChildren } from "react";
import { headers } from "next/headers";
import { Footer } from "./_components/footer/Footer";
import { Header } from "./_components/header/Header";

export const RootClient = async ({ children }: PropsWithChildren) => {
  const headersList = await headers();
  const path = headersList.get("x-path");

  return (
    <div className="Root min-h-screen flex flex-col items-center justify-start">
      <Header />
      {children}
      {path !== "/" && <Footer />}
    </div>
  );
};

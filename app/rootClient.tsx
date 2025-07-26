import { headers } from "next/headers";
import { PropsWithChildren } from "react";
import { Footer } from "./_components/_layouts/footer/Footer";
import { Header } from "./_components/_layouts/header/Header";

export const RootClient = async ({ children }: PropsWithChildren) => {
  const headersList = await headers();
  const path = headersList.get("x-path");

  return (
    <div className="Root min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 animate-fade-in">
        <div className="w-full max-w-4xl mx-auto">
          {children}
        </div>
      </main>
      {path !== "/" && <Footer />}
    </div>
  );
};

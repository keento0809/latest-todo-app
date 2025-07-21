import type { Metadata } from "next";
import "./globals.css";
import { RootClient } from "./rootClient";
import { NextAuthProvider } from "./_providers/nextauthProvider/NextAuthProvider";

export const metadata: Metadata = {
  title: "LatestTodo - Modern Task Management",
  description: "A beautiful and intuitive todo application built with Next.js",
  appleWebApp: true,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <RootClient>{children}</RootClient>
        </NextAuthProvider>
      </body>
    </html>
  );
}

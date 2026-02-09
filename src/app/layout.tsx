import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/stack/server";
import { ClientProviders } from "./providers/providers";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Inventory Management App",
  description: "An inventory management application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <ClientProviders>{children}</ClientProviders>
            <Toaster />
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}

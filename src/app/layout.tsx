import type { Metadata } from "next";
import { Jost, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/app-shell";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mediaflow",
  description: "Mediaflow dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-screen overflow-hidden bg-canvas text-zinc-800">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Creation for Passion",
  description: "Oggetti fatti a mano per la casa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="flex h-dvh flex-col overflow-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

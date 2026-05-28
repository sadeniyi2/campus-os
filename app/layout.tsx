import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "CampusOS — The University OS", template: "%s | CampusOS" },
  description: "CampusOS unifies academics, attendance, timetables, clearance, and AI learning into one beautiful platform built for African universities.",
  keywords: ["university", "campus", "education", "Africa", "attendance", "timetable", "clearance", "AI"],
  openGraph: {
    type: "website",
    title: "CampusOS",
    description: "The Operating System for African Universities",
    siteName: "CampusOS",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="antialiased min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

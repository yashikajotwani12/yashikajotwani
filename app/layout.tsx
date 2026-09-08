import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-inter" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Yashika Jotwani — Backend Engineer & Creative Thinker",
  description:
    "Backend engineer at HackerRank. Exploring scalable systems, open source, and thoughtful design. Notes and work by Yashika Jotwani.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${mono.variable} font-sans`}
      >
        <ThemeProvider>

          <a href="#main-content" className="skip-link">Skip to content</a>
          <div className="flex flex-col min-h-screen relative z-10">
            <Navbar />
            <div className="flex-1" id="main-content">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

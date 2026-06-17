import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@/app/globals.css";
import { ReadingProgress } from "@/components/layout/reading-progress";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { thesisMeta } from "@/data/dissertation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: thesisMeta.title,
  description:
    "An interactive dissertation website exploring short-run marginal emissions factors, coal and gas prices, and the British electricity system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <ThemeProvider>
          <TooltipProvider>
            <ReadingProgress />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

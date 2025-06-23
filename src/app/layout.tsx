import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manim Studio - Create Mathematical Animations",
  description: "AI-powered Manim animation creator. Generate beautiful mathematical animations with Python and Manim.",
  keywords: ["manim", "animation", "mathematics", "python", "ai", "education"],
  authors: [{ name: "Manim Studio" }],
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#0f0f0f',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen dark`}
      >
        {children}
      </body>
    </html>
  );
}

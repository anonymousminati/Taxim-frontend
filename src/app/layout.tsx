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
  title: "Taxim - AI-Powered Mathematical Animations",
  description: "Transform complex mathematical concepts into stunning visual animations with the power of AI and Manim. No coding experience required.",
  keywords: ["manim", "animation", "mathematics", "python", "ai", "education", "taxim"],
  authors: [{ name: "Taxim" }],
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

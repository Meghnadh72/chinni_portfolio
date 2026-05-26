import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lumis Studio | Capturing Moments That Last Forever",
    template: "%s | Lumis Studio",
  },
  description:
    "Professional photography portfolio — weddings, portraits, events, and editorial. Crafting unforgettable stories, one frame at a time.",
  keywords: [
    "photography",
    "wedding photographer",
    "portrait photographer",
    "event photography",
    "professional photographer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Lumis Studio",
    title: "Lumis Studio | Capturing Moments That Last Forever",
    description:
      "Professional photography portfolio — weddings, portraits, events, and editorial.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

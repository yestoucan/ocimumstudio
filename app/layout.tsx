import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Syne } from "next/font/google";
import "./globals.css";
import ScrollRail from "./ScrollRail";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ocimum Studio — Votre expertise en image, source de performance",
    template: "%s | Ocimum Studio",
  },
  description:
    "Ocimum Studio, une production portée par l'IA, pour mettre en image et en son les meilleurs contenus d'expertise.",
  openGraph: {
    title: "Ocimum Studio",
    description: "Vos informations prennent vie.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${inter.variable} ${syne.variable} h-full`}
    >
      <body className="min-h-full bg-bg text-cream antialiased">
        {/* Film grain — constant subtle cinematic texture over the frame */}
        <div className="grain" aria-hidden="true" />
        <ScrollRail />
        {children}
      </body>
    </html>
  );
}

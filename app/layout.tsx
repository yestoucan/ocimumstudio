import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Syne } from "next/font/google";
import Script from "next/script";
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

const SITE_URL = "https://ocimumstudio.com";
const DESCRIPTION =
  "Ocimum Studio, studio de production porté par l'IA et cabinet de conseil en stratégie digitale, marketing & data. Nous mettons en image et en son les meilleurs contenus d'expertise.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ocimum Studio — Votre expertise en image, source de performance",
    template: "%s | Ocimum Studio",
  },
  description: DESCRIPTION,
  applicationName: "Ocimum Studio",
  authors: [{ name: "Ocimum Studio", url: SITE_URL }],
  creator: "Ocimum Studio",
  publisher: "Ocimum Studio",
  keywords: [
    "Ocimum Studio",
    "studio de production vidéo",
    "production audiovisuelle IA",
    "vidéo d'expertise",
    "présentateur IA",
    "conseil éditorial",
    "stratégie digitale",
    "marketing & data",
    "Saint-Jean-de-Luz",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Ocimum Studio",
    title: "Ocimum Studio — Votre expertise en image, source de performance",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocimum Studio — Votre expertise en image, source de performance",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Ocimum Studio",
      legalName: "Ocimum Studio",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      image: `${SITE_URL}/opengraph-image`,
      email: "contact@ocimumstudio.com",
      description:
        "Studio de production audiovisuelle porté par l'IA et cabinet de conseil en stratégie digitale, marketing & data.",
      foundingDate: "2026-07-28",
      founder: { "@type": "Person", name: "Jean-Alix Poylo" },
      vatID: "FR13108015967",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3 rue de Belzunce",
        addressLocality: "Saint-Jean-de-Luz",
        postalCode: "64500",
        addressCountry: "FR",
      },
      areaServed: "FR",
      sameAs: ["https://www.linkedin.com/company/ocimumstudio/"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Ocimum Studio",
      description: DESCRIPTION,
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
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
        {/* Structured data — Organization + WebSite (SEO + GEO/LLM comprehension) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {/* Cookiebot — consent banner, must load first to auto-block trackers before consent */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="d473dc1a-641a-4034-9e7c-1525cd7d1a28"
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
        {/* Film grain — constant subtle cinematic texture over the frame */}
        <div className="grain" aria-hidden="true" />
        <ScrollRail />
        {children}
      </body>
    </html>
  );
}

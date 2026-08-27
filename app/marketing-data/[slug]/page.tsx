import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OFFRES, getOffre } from "../offres";
import OffreDetailContent from "./OffreDetailContent";

export function generateStaticParams() {
  return OFFRES.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offre = getOffre(slug);
  if (!offre) return {};
  return {
    title: `${offre.title} — Marketing & Data`,
    description: offre.goal,
  };
}

const SITE_URL = "https://ocimumstudio.com";

export default async function OffrePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offre = getOffre(slug);
  if (!offre) notFound();

  const url = `${SITE_URL}/marketing-data/${offre.slug}`;
  const priceNum = Number(offre.price.replace(/[^0-9]/g, "")) || undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: offre.title,
        serviceType: offre.title,
        description: offre.goal,
        url,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "FR",
        ...(priceNum && {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: priceNum,
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "EUR",
              minPrice: priceNum,
            },
            url,
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Marketing & Data", item: `${SITE_URL}/marketing-data` },
          { "@type": "ListItem", position: 3, name: offre.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OffreDetailContent offre={offre} />
    </>
  );
}

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

export default async function OffrePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offre = getOffre(slug);
  if (!offre) notFound();
  return <OffreDetailContent offre={offre} />;
}

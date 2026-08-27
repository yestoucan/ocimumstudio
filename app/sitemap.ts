import type { MetadataRoute } from "next";
import { OFFRES } from "./marketing-data/offres";

const BASE = "https://ocimumstudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/conseil`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/marketing-data`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/legal`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const offerRoutes: MetadataRoute.Sitemap = OFFRES.map((o) => ({
    url: `${BASE}/marketing-data/${o.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...offerRoutes];
}

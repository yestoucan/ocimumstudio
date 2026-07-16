import type { Metadata } from "next";
import MarketingDataContent from "./MarketingDataContent";

export const metadata: Metadata = {
  title: "Marketing & Data — by Ocimum Studio",
  description:
    "Offres de services marketing & data by Ocimum Studio : stratégie go-to-market, acquisition web, CRM, LinkedIn, mesure et création de site.",
};

export default function MarketingDataPage() {
  return <MarketingDataContent />;
}

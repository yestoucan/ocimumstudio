import type { Metadata } from "next";
import ConseilContent from "./ConseilContent";

export const metadata: Metadata = {
  title: "Conseil éditorial — Stratégie digitale & IA au service de vos contenus",
  description:
    "Avant d'être un studio de production, Ocimum est un cabinet de conseil. Stratégie digitale et IA au service de vos contenus, appliquées en amont de la caméra.",
};

export default function ConseilPage() {
  return <ConseilContent />;
}

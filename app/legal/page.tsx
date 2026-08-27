import type { Metadata } from "next";
import LegalContent from "./LegalContent";

export const metadata: Metadata = {
  title: "Mentions légales & Confidentialité",
  description:
    "Mentions légales, politique de confidentialité (RGPD), cookies et propriété intellectuelle du site Ocimum Studio.",
};

export default function LegalPage() {
  return <LegalContent />;
}

"use client";
import { useState } from "react";
import { useReveal, SectionTitle, Eyebrow, Lamp } from "./shared";

const CONTACT_EMAIL = "contact@ocimumstudio.com";

interface Props {
  /** Intro line under the title — differs between Production and Conseil. */
  intro?: string;
  /**
   * Kept for backwards compatibility with callers — no longer rendered
   * since the section now points to a direct email rather than a form.
   */
  projectPlaceholder?: string;
  /** Section ground color — Marketing & Data uses its own slate undertone. */
  background?: string;
}

export default function ContactSection({
  intro = "Tournage, série de contenus ou stratégie vidéo — décrivez votre besoin en quelques lignes, nous vous répondons sous 24h.",
  background = "#16261E",
}: Props) {
  const { ref, visible } = useReveal();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable — the mailto link remains the primary path */
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-32 md:py-48 px-[8%]"
      aria-label="Contact"
      style={{
        background: `radial-gradient(ellipse 55% 60% at 15% 30%, rgba(61,122,95,0.24) 0%, transparent 60%), ${background}`,
      }}
    >
      <Lamp position="tr" />
      <div
        ref={ref}
        className="relative max-w-2xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(14px)",
          transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1), transform 750ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Eyebrow visible={visible}>Contact</Eyebrow>
        <SectionTitle visible={visible} fontSize="clamp(32px, 4vw, 48px)" className="mb-5">
          Parlons de votre projet.
        </SectionTitle>
        <p className="font-inter font-light text-[15px] leading-[1.75] mb-12 max-w-xl" style={{ color: "rgba(240,237,232,0.45)" }}>
          {intro}
        </p>

        {/* Email card */}
        <div
          className="relative p-8 md:p-10"
          style={{
            border: "1px solid rgba(107,175,138,0.22)",
            background: "linear-gradient(180deg, rgba(107,175,138,0.05) 0%, rgba(9,11,9,0.30) 100%)",
            boxShadow: "0 0 60px rgba(61,122,95,0.10)",
          }}
        >
          <span className="font-inter text-[10px] uppercase tracking-[0.14em] text-accent-light/70">
            Écrivez-nous
          </span>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group inline-flex items-center gap-3 font-syne font-medium text-cream tracking-[-0.02em] break-all"
              style={{ fontSize: "clamp(16.5px, 2.4vw, 25.5px)", transition: "color 250ms, text-shadow 250ms" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#9BD3B2";
                el.style.textShadow = "0 0 28px rgba(107,175,138,0.35)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "";
                el.style.textShadow = "none";
              }}
            >
              {CONTACT_EMAIL}
              <svg
                width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true"
                className="shrink-0"
                style={{ transition: "transform 300ms cubic-bezier(0.16,1,0.3,1)" }}
              >
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copier l'adresse email"
              className="self-start shrink-0 inline-flex items-center gap-2 font-inter text-[12px] uppercase tracking-[0.08em] text-cream/70 border border-accent-light/30 px-4 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
              style={{ transition: "border-color 250ms, color 250ms, background-color 250ms" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "rgba(107,175,138,0.7)";
                el.style.color = "rgba(240,237,232,0.95)";
                el.style.backgroundColor = "rgba(107,175,138,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "rgba(107,175,138,0.30)";
                el.style.color = "rgba(240,237,232,0.70)";
                el.style.backgroundColor = "transparent";
              }}
            >
              {copied ? (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 12.5l5 5 11-11" stroke="#6BAF8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Copié
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  Copier
                </>
              )}
            </button>
          </div>
        </div>

        <p className="mt-6 font-inter text-[12px] leading-[1.7]" style={{ color: "rgba(240,237,232,0.28)" }}>
          Réponse sous 24h. Présentez votre société, votre besoin et vos délais — nous revenons vers vous avec une première piste.
        </p>
      </div>
    </section>
  );
}

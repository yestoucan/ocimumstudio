"use client";
import { useState } from "react";
import { useReveal, SectionTitle, Eyebrow, Lamp } from "./shared";

interface Props {
  /** Intro line under the title — differs between Production and Conseil. */
  intro?: string;
  /** Placeholder of the "Votre projet" textarea. */
  projectPlaceholder?: string;
  /** Section ground color — Marketing & Data uses its own slate undertone. */
  background?: string;
}

export default function ContactSection({
  intro = "Tournage, série de contenus ou stratégie vidéo — décrivez votre besoin, nous vous répondons sous 24h.",
  projectPlaceholder = "Quel type de contenu souhaitez-vous produire ? Pour quelle audience ? Dans quels délais ?",
  background = "#11140F",
}: Props) {
  const { ref, visible } = useReveal();
  const [formState, setFormState] = useState({ name: "", company: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const inputBase = "bg-transparent pt-3 pb-2 font-inter text-[15px] font-light text-cream outline-none resize-none w-full";
  const inputBorder = { borderBottom: "1px solid rgba(61,122,95,0.35)", transition: "border-color 300ms ease, box-shadow 300ms ease" };
  const onFocusIn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = "#6BAF8A";
    e.currentTarget.style.boxShadow = "0 6px 20px -6px rgba(107,175,138,0.22)";
  };
  const onFocusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = "rgba(61,122,95,0.35)";
    e.currentTarget.style.boxShadow = "none";
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
        <p className="font-inter font-light text-[15px] leading-[1.75] mb-14" style={{ color: "rgba(240,237,232,0.45)" }}>
          {intro}
        </p>

        {sent ? (
          <div className="py-12 flex flex-col items-start gap-3">
            <span className="font-inter text-[11px] uppercase tracking-[0.12em] text-accent-light">Demande reçue</span>
            <p className="font-syne font-medium text-cream text-[22px] tracking-[-0.02em]">
              Merci, nous revenons vers vous sous 24h.
            </p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-0" noValidate>

            {/* Row 1 — Nom + Société */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <label className="flex flex-col gap-1 pb-8">
                <span className="font-inter text-[10px] uppercase tracking-[0.12em] text-accent-light/70">Nom *</span>
                <input
                  type="text" autoComplete="name" required
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  className={inputBase}
                  style={{ ...inputBorder, color: "rgba(240,237,232,0.90)" }}
                  onFocus={onFocusIn} onBlur={onFocusOut}
                  placeholder="Jean Dupont"
                />
              </label>
              <label className="flex flex-col gap-1 pb-8">
                <span className="font-inter text-[10px] uppercase tracking-[0.12em] text-accent-light/70">Société *</span>
                <input
                  type="text" autoComplete="organization" required
                  value={formState.company}
                  onChange={(e) => setFormState((s) => ({ ...s, company: e.target.value }))}
                  className={inputBase}
                  style={{ ...inputBorder, color: "rgba(240,237,232,0.90)" }}
                  onFocus={onFocusIn} onBlur={onFocusOut}
                  placeholder="Votre société"
                />
              </label>
            </div>

            {/* Row 2 — Email */}
            <label className="flex flex-col gap-1 pb-8">
              <span className="font-inter text-[10px] uppercase tracking-[0.12em] text-accent-light/70">Email professionnel *</span>
              <input
                type="email" autoComplete="email" required
                value={formState.email}
                onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                className={inputBase}
                style={{ ...inputBorder, color: "rgba(240,237,232,0.90)" }}
                onFocus={onFocusIn} onBlur={onFocusOut}
                placeholder="jean@societe.com"
              />
            </label>

            {/* Row 3 — Message */}
            <label className="flex flex-col gap-1 pb-10">
              <span className="font-inter text-[10px] uppercase tracking-[0.12em] text-accent-light/70">Votre projet *</span>
              <textarea
                rows={5} autoComplete="off" required
                value={formState.message}
                onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                className={inputBase}
                style={{ ...inputBorder, color: "rgba(240,237,232,0.90)" }}
                onFocus={onFocusIn} onBlur={onFocusOut}
                placeholder={projectPlaceholder}
              />
            </label>

            {/* Submit row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-2">
              <button
                type="submit"
                className="group inline-flex items-center gap-3 font-inter text-[13px] uppercase tracking-[0.08em] text-cream border border-accent-light/60 px-8 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
                style={{
                  transition: "background-color 300ms, border-color 300ms, box-shadow 300ms",
                  boxShadow: "0 0 24px rgba(107,175,138,0.10)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.backgroundColor = "rgba(107,175,138,0.10)";
                  el.style.borderColor = "#6BAF8A";
                  el.style.boxShadow = "0 0 40px rgba(107,175,138,0.22)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.backgroundColor = "transparent";
                  el.style.borderColor = "rgba(107,175,138,0.60)";
                  el.style.boxShadow = "0 0 24px rgba(107,175,138,0.10)";
                }}
              >
                Envoyer la demande
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ transition: "transform 300ms cubic-bezier(0.16,1,0.3,1)" }}>
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <p className="font-inter text-[11px] leading-[1.6]" style={{ color: "rgba(240,237,232,0.22)" }}>
                Réponse sous 24h.<br />Vos données ne sont pas transmises à des tiers.
              </p>
            </div>

          </form>
        )}
      </div>
    </section>
  );
}

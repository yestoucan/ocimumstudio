"use client";
import NavBar from "../../NavBar";
import Footer from "../../Footer";
import ContactSection from "../../ContactSection";
import { useReveal, SectionTitle, Eyebrow, LightDivider, Lamp } from "../../shared";
import { MD_BG, MD_BG_ALT, type Offre } from "../offres";

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Check icon for deliverables ───────────────────────────────── */
function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="mt-[5px] shrink-0">
      <path d="M2 7.5 L5.5 11 L12 3.5" stroke="#6BAF8A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────── */
function OffreHero({ offre }: { offre: Offre }) {
  const { ref, visible } = useReveal(0.05);
  return (
    <section
      className="relative overflow-hidden pt-[160px] pb-[80px] px-[8%]"
      aria-label={offre.title}
      style={{ backgroundColor: MD_BG }}
    >
      <Lamp position="tr" />
      <div ref={ref} className="relative max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Fil d'Ariane"
          className="mb-10 flex flex-wrap items-center gap-2 font-inter text-[11px] uppercase tracking-[0.1em]"
          style={{
            color: "rgba(240,237,232,0.30)",
            opacity: visible ? 1 : 0,
            transition: "opacity 650ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <a href="/" className="hover:text-cream transition-colors duration-300">Ocimum Studio</a>
          <span aria-hidden="true" className="text-accent-light/50">/</span>
          <a href="/marketing-data" className="hover:text-cream transition-colors duration-300">Marketing &amp; Data</a>
          <span aria-hidden="true" className="text-accent-light/50">/</span>
          <span className="text-cream/60">{offre.title}</span>
        </nav>

        <Eyebrow visible={visible}>Offre #{Number(offre.number)} — Marketing &amp; Data</Eyebrow>
        <SectionTitle visible={visible} as="h1" fontSize="clamp(32px, 4.5vw, 60px)" className="mb-8">
          {offre.title}
        </SectionTitle>
        <p
          className="font-inter font-light leading-[1.75] max-w-[620px] mb-12"
          style={{
            fontSize: "clamp(16px, 1.6vw, 19px)",
            color: "rgba(240,237,232,0.55)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(14px)",
            transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1) 200ms, transform 750ms cubic-bezier(0.16,1,0.3,1) 200ms",
          }}
        >
          {offre.goal}
        </p>

        {/* Price + duration */}
        <div
          className="grid grid-cols-2 max-w-md"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(14px)",
            transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1) 340ms, transform 750ms cubic-bezier(0.16,1,0.3,1) 340ms",
          }}
        >
          {[
            { label: "À partir de", value: offre.price },
            { label: "Durée", value: offre.duration },
          ].map((item, i) => (
            <div
              key={item.label}
              className="px-6 py-5"
              style={{
                border: "1px solid rgba(240,237,232,0.12)",
                borderLeft: i === 1 ? "none" : "1px solid rgba(240,237,232,0.12)",
              }}
            >
              <p className="font-inter text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: "rgba(240,237,232,0.30)" }}>
                {item.label}
              </p>
              <p className="font-syne font-medium text-[22px] tracking-[-0.02em] text-cream">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Description + deliverables ────────────────────────────────── */
function OffreDetails({ offre }: { offre: Offre }) {
  const { ref, visible } = useReveal(0.1);
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32 px-[8%]"
      aria-label="Détails de l'offre"
      style={{ backgroundColor: MD_BG_ALT }}
    >
      <div ref={ref} className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-20 items-start">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1), transform 750ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Eyebrow visible={visible}>À quoi s&apos;attendre</Eyebrow>
          <SectionTitle visible={visible} className="mb-6">
            Le déroulé.
          </SectionTitle>
          <p className="font-inter font-light text-[16px] leading-[1.75]" style={{ color: "rgba(240,237,232,0.55)" }}>
            {offre.description}
          </p>
        </div>
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1) 180ms, transform 750ms cubic-bezier(0.16,1,0.3,1) 180ms",
          }}
        >
          <p className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-accent-light mb-6">
            Livrables
          </p>
          <ul className="flex flex-col">
            {offre.deliverables.map((d, i) => (
              <li
                key={d}
                className="flex items-start gap-3 py-4 font-inter font-light text-[15px] leading-[1.6]"
                style={{
                  color: "rgba(240,237,232,0.70)",
                  borderTop: "1px solid rgba(240,237,232,0.12)",
                  borderBottom: i === offre.deliverables.length - 1 ? "1px solid rgba(240,237,232,0.12)" : "none",
                }}
              >
                <Check />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA card ──────────────────────────────────────────────────── */
function OffreCta() {
  const { ref, visible } = useReveal();
  return (
    <section className="py-20 md:py-24 px-[8%]" aria-label="Démarrer" style={{ backgroundColor: MD_BG }}>
      <div
        ref={ref}
        className="max-w-3xl mx-auto flex flex-col items-center text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1), transform 750ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <SectionTitle visible={visible} className="mb-6" fontSize="clamp(26px, 3vw, 38px)">
          Prêt à démarrer ?
        </SectionTitle>
        <p className="font-inter font-light text-[16px] leading-[1.72] mb-10 max-w-xl" style={{ color: "rgba(240,237,232,0.55)" }}>
          Décrivez votre contexte et vos objectifs — nous calibrons l&apos;offre ensemble.
        </p>
        <a
          href="#contact"
          className="group inline-flex items-center gap-3 font-inter text-[13px] uppercase tracking-[0.08em] text-cream border border-accent-light/60 px-7 py-3.5 hover:bg-accent-light/10 hover:border-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
          style={{
            transition: "background-color 320ms ease, border-color 320ms ease, box-shadow 320ms ease",
            boxShadow: "0 0 24px 2px rgba(107,175,138,0.12)",
          }}
        >
          Parlons-en
          {ARROW}
        </a>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function OffreDetailContent({ offre }: { offre: Offre }) {
  return (
    <>
      <NavBar />
      <main>
        <OffreHero offre={offre} />
        <LightDivider />
        <OffreDetails offre={offre} />
        <LightDivider />
        <OffreCta />
        <ContactSection
          intro={`Intéressé par l'offre ${offre.title} — décrivez votre besoin, nous vous répondons sous 24h.`}
          projectPlaceholder="Vos objectifs, vos outils actuels, vos délais ?"
          background={MD_BG_ALT}
        />
      </main>
      <Footer />
    </>
  );
}

"use client";
import NavBar from "../NavBar";
import Footer from "../Footer";
import ContactSection from "../ContactSection";
import { useReveal, SectionTitle, Eyebrow, LightDivider, Lamp } from "../shared";
import { OFFRES, MD_BG, MD_BG_ALT } from "./offres";

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Intro hero ────────────────────────────────────────────────── */
function IntroSection() {
  const { ref, visible } = useReveal(0.05);
  return (
    <section
      id="intro"
      className="relative overflow-hidden pt-[180px] pb-[100px] px-[8%]"
      aria-label="Offres de services"
      style={{ backgroundColor: MD_BG }}
    >
      <Lamp position="tr" />
      <div ref={ref} className="relative max-w-4xl mx-auto">
        <Eyebrow visible={visible}>Marketing &amp; Data — by Ocimum Studio</Eyebrow>
        <SectionTitle visible={visible} as="h1" fontSize="clamp(36px, 5.5vw, 72px)" className="mb-8">
          Offres de services.
        </SectionTitle>
        <p
          className="font-inter font-light leading-[1.75] max-w-[640px] mb-4"
          style={{
            fontSize: "clamp(16px, 1.6vw, 19px)",
            color: "rgba(240,237,232,0.55)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(14px)",
            transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1) 200ms, transform 750ms cubic-bezier(0.16,1,0.3,1) 200ms",
          }}
        >
          Comment Ocimum Studio Marketing &amp; Data peut vous aider à atteindre vos objectifs.
        </p>
        <p
          className="font-inter font-light text-[15px] leading-[1.72] max-w-[560px] mb-10"
          style={{
            color: "rgba(240,237,232,0.35)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(14px)",
            transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1) 320ms, transform 750ms cubic-bezier(0.16,1,0.3,1) 320ms",
          }}
        >
          Les prix affichés sont des points de départ. Chaque entreprise a des objectifs, outils et
          délais différents — parlons des vôtres.
        </p>
        <a
          href="#offres"
          className="group inline-flex items-center gap-3 font-inter text-[13px] uppercase tracking-[0.08em] text-cream border border-accent-light/60 px-7 py-3.5 hover:bg-accent-light/10 hover:border-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
          style={{
            transition: "background-color 320ms ease, border-color 320ms ease, box-shadow 320ms ease",
            boxShadow: "0 0 24px 2px rgba(107,175,138,0.12)",
            opacity: visible ? 1 : 0,
            transitionDelay: "440ms",
          }}
        >
          Découvrir comment nous travaillons ensemble
          {ARROW}
        </a>
      </div>
    </section>
  );
}

/* ─── Featured offer — Le plus demandé ──────────────────────────── */
function FeaturedOffer() {
  const { ref, visible } = useReveal(0.15);
  return (
    <section className="relative px-[8%] pb-8" style={{ backgroundColor: MD_BG }} aria-label="Offre la plus demandée">
      <div
        ref={ref}
        className="relative max-w-4xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1), transform 750ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <a
          href="/marketing-data/website-acquisition"
          className="group relative block p-8 md:p-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
          style={{
            border: "1px solid rgba(107,175,138,0.35)",
            background: `radial-gradient(ellipse 70% 100% at 20% 0%, rgba(61,122,95,0.16) 0%, transparent 65%), ${MD_BG_ALT}`,
            boxShadow: "0 0 40px rgba(61,122,95,0.14)",
            transition: "border-color 320ms ease, box-shadow 320ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#6BAF8A";
            e.currentTarget.style.boxShadow = "0 0 60px rgba(107,175,138,0.22)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(107,175,138,0.35)";
            e.currentTarget.style.boxShadow = "0 0 40px rgba(61,122,95,0.14)";
          }}
        >
          <span className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-accent-light">
            Le plus demandé
          </span>
          <h2 className="font-syne font-medium text-cream tracking-[-0.02em] text-[24px] md:text-[28px] mt-3 mb-3">
            Acquisition Web
          </h2>
          <p className="font-inter font-light text-[15px] leading-[1.72] max-w-[560px] mb-6" style={{ color: "rgba(240,237,232,0.55)" }}>
            Comprenez comment votre site contribue à l&apos;acquisition — audit du trafic, tunnels de
            conversion et recommandations actionnables.
          </p>
          <span className="inline-flex items-center gap-2 font-inter text-[12px] uppercase tracking-[0.08em] text-accent-light">
            En savoir plus
            {ARROW}
          </span>
        </a>
      </div>
    </section>
  );
}

/* ─── Offer card ────────────────────────────────────────────────── */
function OffreCard({
  offre,
  visible,
  delay,
}: {
  offre: (typeof OFFRES)[number];
  visible: boolean;
  delay: number;
}) {
  return (
    <a
      href={`/marketing-data/${offre.slug}`}
      className="group relative flex flex-col p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
      style={{
        border: "1px solid rgba(240,237,232,0.12)",
        backgroundColor: MD_BG_ALT,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(16px)",
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, border-color 300ms ease, box-shadow 300ms ease`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(107,175,138,0.55)";
        e.currentTarget.style.boxShadow = "0 0 30px rgba(107,175,138,0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(240,237,232,0.12)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="flex items-baseline justify-between mb-5">
        <span className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-accent-light">
          Offre #{Number(offre.number)}
        </span>
        <span className="font-syne font-medium text-[17px] tracking-[-0.02em] text-cream/90">
          {offre.price}
        </span>
      </div>
      <h3 className="font-syne font-medium text-cream tracking-[-0.02em] text-[20px] mb-3">
        {offre.title}
      </h3>
      <p className="font-inter font-light text-[14px] leading-[1.7] mb-6 flex-1" style={{ color: "rgba(240,237,232,0.50)" }}>
        {offre.goal}
      </p>
      <div className="flex items-center justify-between">
        <span className="font-inter text-[11px] uppercase tracking-[0.1em]" style={{ color: "rgba(240,237,232,0.30)" }}>
          {offre.duration}
        </span>
        <span className="inline-flex items-center gap-2 font-inter text-[12px] uppercase tracking-[0.08em] text-accent-light">
          En savoir plus
          {ARROW}
        </span>
      </div>
    </a>
  );
}

/* ─── Offers grid ───────────────────────────────────────────────── */
function OffresGrid() {
  const { ref, visible } = useReveal(0.05);
  return (
    <section id="offres" className="relative overflow-hidden py-20 md:py-28 px-[8%]" aria-label="Toutes les offres" style={{ backgroundColor: MD_BG }}>
      <Lamp position="bl" />
      <div ref={ref} className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {OFFRES.map((offre, i) => (
          <OffreCard key={offre.slug} offre={offre} visible={visible} delay={i * 90} />
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function MarketingDataContent() {
  return (
    <>
      <NavBar />
      <main>
        <IntroSection />
        <FeaturedOffer />
        <OffresGrid />
        <LightDivider />
        <ContactSection
          intro="Stratégie, acquisition, CRM ou mesure — décrivez votre besoin, nous vous répondons sous 24h."
          projectPlaceholder="Quelle offre vous intéresse ? Quels sont vos objectifs et vos délais ?"
          background={MD_BG_ALT}
        />
      </main>
      <Footer />
    </>
  );
}

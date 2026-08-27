"use client";
import NavBar from "../NavBar";
import Footer from "../Footer";
import ContactSection from "../ContactSection";
import { useReveal, SectionTitle, Eyebrow, LightDivider, Lamp } from "../shared";

/* ─── Numbered detail row (hairline-separated) ──────────────────── */
function DetailRow({
  num,
  name,
  children,
  visible,
  delay = 0,
  last = false,
}: {
  num: string;
  name: string;
  children: React.ReactNode;
  visible: boolean;
  delay?: number;
  last?: boolean;
}) {
  return (
    <div
      className="grid grid-cols-[48px_1fr] gap-5 py-[26px]"
      style={{
        borderTop: "1px solid rgba(240,237,232,0.12)",
        borderBottom: last ? "1px solid rgba(240,237,232,0.12)" : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(14px)",
        transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <span className="font-inter font-medium text-[13px] tracking-[0.05em] text-accent-light">{num}</span>
      <div>
        <div className="font-syne font-medium text-[19px] tracking-[-0.02em] text-cream mb-2">{name}</div>
        <p className="font-inter font-light text-[15px] leading-[1.72] max-w-[420px]" style={{ color: "rgba(240,237,232,0.55)" }}>
          {children}
        </p>
      </div>
    </div>
  );
}

/* ─── Intro hero ────────────────────────────────────────────────── */
function IntroSection() {
  const { ref, visible } = useReveal(0.05);
  return (
    <section
      id="intro"
      className="relative overflow-hidden pt-[180px] pb-[100px] px-[8%]"
      aria-label="Conseil"
      style={{ backgroundColor: "#12201A" }}
    >
      <Lamp position="tr" />
      <div ref={ref} className="relative max-w-4xl mx-auto">
        <Eyebrow visible={visible}>Conseil éditorial</Eyebrow>
        <SectionTitle visible={visible} as="h1" fontSize="clamp(36px, 5.5vw, 72px)" className="mb-8">
          Stratégie digitale.
          <br />
          L&apos;IA au service de vos contenus.
        </SectionTitle>
        <p
          className="font-inter font-light leading-[1.75] max-w-[640px]"
          style={{
            fontSize: "clamp(16px, 1.6vw, 19px)",
            color: "rgba(240,237,232,0.55)",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(14px)",
            transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1) 200ms, transform 750ms cubic-bezier(0.16,1,0.3,1) 200ms",
          }}
        >
          Avant d&apos;être un studio de production, Ocimum est un cabinet de conseil. Même exigence, même
          équipe — appliquées en amont de la caméra, sur votre positionnement et vos contenus.
        </p>
      </div>
    </section>
  );
}

/* ─── 01 — Stratégie digitale ───────────────────────────────────── */
function StrategieSection() {
  const { ref, visible } = useReveal(0.08);
  return (
    <section
      id="strategie"
      className="relative overflow-hidden py-24 md:py-36 px-[8%]"
      aria-label="Stratégie digitale"
      style={{ backgroundColor: "#16261E" }}
    >
      <div ref={ref} className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1), transform 750ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Eyebrow visible={visible}>01 — Stratégie digitale</Eyebrow>
          <SectionTitle visible={visible} className="mb-6">
            Un positionnement, avant une caméra.
          </SectionTitle>
          <p className="font-inter font-light text-[17px] leading-[1.72] max-w-[440px]" style={{ color: "rgba(240,237,232,0.55)" }}>
            Nous posons le diagnostic avant de tourner : où se joue votre visibilité, ce que vos clients
            regardent réellement, ce qui mérite d&apos;être dit — et comment.
          </p>
        </div>
        <div>
          <DetailRow num="01" name="Diagnostic de présence" visible={visible} delay={150}>
            Audit de votre visibilité actuelle auprès de vos cibles — sociétés de gestion, investisseurs,
            réseaux professionnels.
          </DetailRow>
          <DetailRow num="02" name="Feuille de route éditoriale" visible={visible} delay={280}>
            Un calendrier de prise de parole calibré à vos ressources, pas à un idéal irréaliste.
          </DetailRow>
          <DetailRow num="03" name="Pilotage & mesure" visible={visible} delay={410} last>
            Suivi de la performance et ajustement.
          </DetailRow>
        </div>
      </div>
    </section>
  );
}

/* ─── 02 — Conseil data & IA (mirrored) ─────────────────────────── */
function DataIaSection() {
  const { ref, visible } = useReveal(0.08);
  return (
    <section
      id="data-ia"
      className="relative overflow-hidden py-24 md:py-36 px-[8%]"
      aria-label="IA et contenus"
      style={{ backgroundColor: "#12201A" }}
    >
      <Lamp position="bl" />
      <div ref={ref} className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Text column — first on mobile, second on desktop (mirrored block) */}
        <div
          className="order-1 md:order-2"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1), transform 750ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <Eyebrow visible={visible}>02 — IA &amp; contenus</Eyebrow>
          <SectionTitle visible={visible} className="mb-6">
            L&apos;intelligence artificielle, sous contrôle.
          </SectionTitle>
          <p className="font-inter font-light text-[17px] leading-[1.72] max-w-[440px]" style={{ color: "rgba(240,237,232,0.55)" }}>
            Nous mettons l&apos;IA au service de vos contenus — jamais comme une fin en soi, toujours sous
            le contrôle du studio, de l&apos;écriture à la diffusion.
          </p>
        </div>
        <div className="order-2 md:order-1">
          <DetailRow num="01" name="Production augmentée" visible={visible} delay={150}>
            Présentateurs IA, voix, transcription : nous sélectionnons et pilotons les outils qui donnent
            vie à vos contenus, sans sacrifier la maîtrise éditoriale.
          </DetailRow>
          <DetailRow num="02" name="Déclinaison multi-formats" visible={visible} delay={280}>
            Un même contenu d&apos;expertise décliné en reportage, extraits, audio et posts — calibré pour
            chaque canal de diffusion.
          </DetailRow>
          <DetailRow num="03" name="Conformité & transparence" visible={visible} delay={410} last>
            Diffusion conforme au règlement européen sur l&apos;IA (AI Act) : mentions, traçabilité et
            documentation de ce qui est généré.
          </DetailRow>
        </div>
      </div>
    </section>
  );
}

/* ─── Bridge back to production ─────────────────────────────────── */
function BridgeSection() {
  const { ref, visible } = useReveal();
  return (
    <section
      id="bridge"
      className="py-24 md:py-32 px-[8%]"
      aria-label="Vers la production"
      style={{ backgroundColor: "#12201A" }}
    >
      <div
        ref={ref}
        className="max-w-3xl mx-auto flex flex-col items-center text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1), transform 750ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Eyebrow visible={visible}>Et ensuite</Eyebrow>
        <SectionTitle visible={visible} className="mb-6">
          Ce conseil se prolonge en image.
        </SectionTitle>
        <p
          className="font-inter font-light text-[16px] md:text-[17px] leading-[1.72] mb-10 max-w-xl"
          style={{ color: "rgba(240,237,232,0.55)" }}
        >
          Une fois la stratégie posée et les données cadrées, Ocimum peut aussi produire vos contenus —
          reportages courts, générés par IA, sous contrôle du studio.
        </p>
        <a
          href="/"
          className="group inline-flex items-center gap-3 font-inter text-[13px] uppercase tracking-[0.08em] text-cream border border-accent-light/60 px-7 py-3.5 hover:bg-accent-light/10 hover:border-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
          style={{
            transition: "background-color 320ms ease, border-color 320ms ease, box-shadow 320ms ease",
            boxShadow: "0 0 24px 2px rgba(107,175,138,0.12)",
          }}
        >
          Voir la production vidéo
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function ConseilContent() {
  return (
    <>
      <NavBar />
      <main>
        <IntroSection />
        <LightDivider />
        <StrategieSection />
        <DataIaSection />
        <LightDivider />
        <BridgeSection />
        <LightDivider />
        <ContactSection
          intro="Diagnostic, feuille de route éditoriale ou stratégie de contenus IA — décrivez votre besoin, nous vous répondons sous 24h."
          projectPlaceholder="Diagnostic, feuille de route éditoriale, contenus IA ? Décrivez votre contexte."
        />
      </main>
      <Footer />
    </>
  );
}

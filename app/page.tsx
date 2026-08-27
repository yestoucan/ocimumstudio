"use client";
import { useEffect, useRef, useState, type RefObject, type ReactNode } from "react";
import NavBar from "./NavBar";
import HeroBackground from "./HeroBackground";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import { useReveal, SectionTitle, Eyebrow, LightDivider, Lamp } from "./shared";


/* ─── Viewfinder frame — 4-layer SVG animation ──────────────────── */
function ViewfinderFrame({
  children,
  heroRef,
}: {
  children: ReactNode;
  heroRef: RefObject<HTMLElement | null>;
}) {
  const tlRef = useRef<SVGSVGElement>(null);
  const trRef = useRef<SVGSVGElement>(null);
  const blRef = useRef<SVGSVGElement>(null);
  const brRef = useRef<SVGSVGElement>(null);

  // Layer 4 — Rack-focus: corners expand outward on hero hover
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const corners = [
      { ref: tlRef, x: -5, y: -5 },
      { ref: trRef, x:  5, y: -5 },
      { ref: brRef, x:  5, y:  5 },
      { ref: blRef, x: -5, y:  5 },
    ];

    const expand = () => corners.forEach(({ ref, x, y }) => {
      const el = ref.current;
      if (!el) return;
      el.style.transition = "transform 300ms cubic-bezier(0.16,1,0.3,1)";
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    const contract = () => corners.forEach(({ ref }) => {
      const el = ref.current;
      if (!el) return;
      el.style.transition = "transform 600ms cubic-bezier(0.16,1,0.3,1)";
      el.style.transform = "translate(0,0)";
    });

    hero.addEventListener("mouseenter", expand);
    hero.addEventListener("mouseleave", contract);
    return () => {
      hero.removeEventListener("mouseenter", expand);
      hero.removeEventListener("mouseleave", contract);
    };
  }, [heroRef]);

  // Corner flash — brightens SVG paths at random intervals
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const allRefs = [tlRef, trRef, blRef, brRef];

    const flash = () => {
      allRefs.forEach((r) => {
        const p = r.current?.querySelector<SVGPathElement>("path");
        if (!p) return;
        p.style.transition = "stroke 60ms, filter 60ms";
        p.setAttribute("stroke", "rgba(200,255,220,0.95)");
        p.style.filter = "drop-shadow(0 0 4px rgba(120,255,180,0.9))";
      });
      setTimeout(() => {
        allRefs.forEach((r) => {
          const p = r.current?.querySelector<SVGPathElement>("path");
          if (!p) return;
          p.style.transition = "stroke 600ms, filter 600ms";
          p.setAttribute("stroke", "rgba(107,175,138,0.55)");
          p.style.filter = "none";
        });
      }, 140);
      setTimeout(flash, 4000 + Math.random() * 5000);
    };

    const t = setTimeout(flash, 3000 + Math.random() * 2000);
    return () => clearTimeout(t);
  }, []);

  const S = 24;   // corner arm length (px)
  const L = S * 2; // total path length (48px)
  const STROKE = "rgba(107,175,138,0.55)";
  const DOT    = "#6BAF8A";

  return (
    <div className="relative px-12 py-10 md:px-20 md:py-12">

      {/* Layer 3 — Edge travelers: top + bottom sweep simultaneously */}
      {([{ top: 0 }, { bottom: 0 }] as React.CSSProperties[]).map((pos, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 h-px overflow-hidden pointer-events-none"
          style={{ ...pos, zIndex: 2 }}
          aria-hidden="true"
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              width: "28%",
              height: "100%",
              background:
                "linear-gradient(to right, transparent, rgba(107,175,138,0.50) 25%, rgba(190,255,215,0.90) 50%, rgba(107,175,138,0.50) 75%, transparent)",
              animation: `travel-h 11s ease-in-out infinite ${2 + i * 0.4}s`,
            }}
          />
        </div>
      ))}

      {/* TL corner — Layer 1 draw-in (400ms) + Layer 2 dot pulse */}
      <svg
        ref={tlRef}
        width={S} height={S}
        viewBox={`0 0 ${S} ${S}`}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ overflow: "visible", zIndex: 3 }}
        aria-hidden="true"
      >
        <path
          d={`M ${S} 0 L 0 0 L 0 ${S}`}
          fill="none" stroke={STROKE} strokeWidth={1} strokeLinecap="square"
          strokeDasharray={L} strokeDashoffset={L}
          style={{ animation: "draw-corner 500ms cubic-bezier(0.4,0,0.2,1) 400ms forwards" }}
        />
        <circle cx={0} cy={0} r={1.5} fill={DOT}
          style={{ opacity: 0, animation: "dot-fade-in 200ms ease-out 950ms forwards, dot-pulse 3s ease-in-out 1150ms infinite" }} />
      </svg>

      {/* TR corner — draw-in 540ms */}
      <svg
        ref={trRef}
        width={S} height={S}
        viewBox={`0 0 ${S} ${S}`}
        className="absolute top-0 right-0 pointer-events-none"
        style={{ overflow: "visible", zIndex: 3 }}
        aria-hidden="true"
      >
        <path
          d={`M 0 0 L ${S} 0 L ${S} ${S}`}
          fill="none" stroke={STROKE} strokeWidth={1} strokeLinecap="square"
          strokeDasharray={L} strokeDashoffset={L}
          style={{ animation: "draw-corner 500ms cubic-bezier(0.4,0,0.2,1) 540ms forwards" }}
        />
        <circle cx={S} cy={0} r={1.5} fill={DOT}
          style={{ opacity: 0, animation: "dot-fade-in 200ms ease-out 1090ms forwards, dot-pulse 3s ease-in-out 1290ms infinite" }} />
      </svg>

      {/* BR corner — draw-in 680ms */}
      <svg
        ref={brRef}
        width={S} height={S}
        viewBox={`0 0 ${S} ${S}`}
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{ overflow: "visible", zIndex: 3 }}
        aria-hidden="true"
      >
        <path
          d={`M 0 ${S} L ${S} ${S} L ${S} 0`}
          fill="none" stroke={STROKE} strokeWidth={1} strokeLinecap="square"
          strokeDasharray={L} strokeDashoffset={L}
          style={{ animation: "draw-corner 500ms cubic-bezier(0.4,0,0.2,1) 680ms forwards" }}
        />
        <circle cx={S} cy={S} r={1.5} fill={DOT}
          style={{ opacity: 0, animation: "dot-fade-in 200ms ease-out 1230ms forwards, dot-pulse 3s ease-in-out 1430ms infinite" }} />
      </svg>

      {/* BL corner — draw-in 820ms */}
      <svg
        ref={blRef}
        width={S} height={S}
        viewBox={`0 0 ${S} ${S}`}
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{ overflow: "visible", zIndex: 3 }}
        aria-hidden="true"
      >
        <path
          d={`M ${S} ${S} L 0 ${S} L 0 0`}
          fill="none" stroke={STROKE} strokeWidth={1} strokeLinecap="square"
          strokeDasharray={L} strokeDashoffset={L}
          style={{ animation: "draw-corner 500ms cubic-bezier(0.4,0,0.2,1) 820ms forwards" }}
        />
        <circle cx={0} cy={S} r={1.5} fill={DOT}
          style={{ opacity: 0, animation: "dot-fade-in 200ms ease-out 1370ms forwards, dot-pulse 3s ease-in-out 1570ms infinite" }} />
      </svg>

      {children}
    </div>
  );
}

/* ─── Process steps ─────────────────────────────────────────────── */
const STEPS = [
  { num: "01", title: "Réception",  desc: "On récupère votre contenu brut : rapport, note, prise de parole — peu importe le format." },
  { num: "02", title: "Écriture",   desc: "On rédige le script du reportage, calibré pour tenir en une minute." },
  { num: "03", title: "Génération", desc: "Le reportage est généré avec un présentateur IA, sous contrôle du studio." },
  { num: "04", title: "Livraison",  desc: "Vous recevez la vidéo finale, montée et optimisée pour diffusion." },
];

function ProcessSteps() {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      <Eyebrow visible={visible}>Méthode</Eyebrow>
      <SectionTitle visible={visible} className="mb-16 md:mb-20">
        Votre visibilité en 4 étapes
      </SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-14">
      {STEPS.map((step, i) => (
        <div
          key={step.num}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(14px)",
            transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${i * 120}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
          }}
        >
          <p className="mb-3 font-inter text-[11px] font-normal tracking-[0.12em] text-accent-light">
            {step.num} <span style={{ color: "rgba(240,237,232,0.25)" }}>—</span> {step.title}
          </p>
          <p
            className="font-inter font-light text-[15px] leading-[1.75]"
            style={{ color: "rgba(240,237,232,0.55)" }}
          >
            {step.desc}
          </p>
        </div>
      ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════ */
/*  Page                                                           */
/* ════════════════════════════════════════════════════════════════ */
export default function Home() {
  /* Mouse-following fill light (lerp-smoothed, zero React re-renders) */
  const heroRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  /* Hero background swap — after 5s the generative canvas cross-fades to the
     almost-transparent Sophia video, keeping a green shade on top. */
  const [videoActive, setVideoActive] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVideoActive(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fill = fillRef.current;
    if (!fill) return;

    let raf: number;
    let tx = 50, ty = 50, cx = 50, cy = 50;

    const onMove = (e: MouseEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width)  * 100;
      ty = ((e.clientY - r.top)  / r.height) * 100;
    };

    const animate = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      fill.style.background = `radial-gradient(650px circle at ${cx}% ${cy}%, rgba(107,175,138,0.14), transparent 62%)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);


  return (
    <>
      <NavBar />
      <main>

        {/* ══ 1 — Hero ════════════════════════════════════════════ */}
        <section
          id="hero"
          ref={heroRef}
          className="relative flex h-[100dvh] flex-col items-center justify-center overflow-hidden"
          aria-label="Accroche principale"
        >
          {/* Generative background (canvas + basil texture) — cross-fades out
              when the Sophia video takes over after 5s */}
          <div
            className="absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: videoActive ? 0 : 1 }}
            aria-hidden="true"
          >
            {/* Canvas — three-point studio lighting */}
            <HeroBackground />

            {/* Basil texture — brand identity, screen blend over dark canvas.
                Gently breathes while waiting for the glint sweep. */}
            <div
              className="sophia-fx absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "url('/Sophia.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                opacity: 0.40,
                mixBlendMode: "screen",
                animation: "sophia-breathe 5s ease-in-out 800ms infinite",
              }}
            />

            {/* Glint sweep — a brightened copy of the basil revealed by a
                moving light band, like light catching the leaves (2 passes). */}
            <div
              className="sophia-fx sophia-glint-layer absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "url('/Sophia.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                mixBlendMode: "screen",
                // Strip the basil's native colors and re-tint to a muted
                // green-grey so the glint matches the video's shade (no white/yellow).
                filter:
                  "brightness(1.35) grayscale(1) sepia(1) hue-rotate(82deg) saturate(0.7)",
                WebkitMaskImage:
                  "linear-gradient(100deg, transparent 42%, #000 50%, transparent 58%)",
                maskImage:
                  "linear-gradient(100deg, transparent 42%, #000 50%, transparent 58%)",
                WebkitMaskSize: "220% 100%",
                maskSize: "220% 100%",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                opacity: 0,
                animation:
                  "sophia-glint 1.9s cubic-bezier(0.4,0,0.2,1) 1000ms 2 both",
              }}
            />

            {/* Bloom crescendo — one bright flash just before the video swap. */}
            <div
              className="sophia-fx sophia-bloom-layer absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "url('/Sophia.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                mixBlendMode: "screen",
                // Same muted green-grey tint as the glint, a touch brighter.
                filter:
                  "brightness(1.7) grayscale(1) sepia(1) hue-rotate(82deg) saturate(0.7)",
                opacity: 0,
                animation: "sophia-bloom 1.5s ease-out 4300ms both",
              }}
            />
          </div>

          {/* Sophia video — fades in almost-transparent after 5s */}
          <video
            className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: videoActive ? 0.28 : 0 }}
            src="/homepagesophia_silent.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />

          {/* Green shade — kept on top of the video for brand tint */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-[2000ms] ease-in-out"
            style={{
              opacity: videoActive ? 1 : 0,
              background:
                "linear-gradient(to bottom, rgba(13,15,13,0.55) 0%, rgba(61,122,95,0.30) 45%, rgba(13,15,13,0.78) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Mouse fill light — lerp-smoothed, DOM mutation via ref */}
          <div
            ref={fillRef}
            className="absolute inset-0 pointer-events-none z-[2]"
            aria-hidden="true"
          />

          {/* Studio light sheen — soft diagonal sweep, premium */}
          <div
            className="absolute inset-0 z-[5] pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <div
              style={{
                position: "absolute",
                top: "-60%",
                left: "50%",
                width: "55%",
                height: "220%",
                background: "linear-gradient(to right, transparent 0%, rgba(107,175,138,0.04) 35%, rgba(200,255,220,0.07) 50%, rgba(107,175,138,0.04) 65%, transparent 100%)",
                transform: "translateX(-120%) rotate(-18deg)",
                animation: "hero-sheen 10s cubic-bezier(0.4,0,0.6,1) infinite 2.5s",
              }}
            />
          </div>

          {/* Bottom fade to content */}
          <div
            className="absolute inset-x-0 bottom-0 h-56 pointer-events-none z-[3]"
            style={{ background: "linear-gradient(to bottom, transparent, #0D0F0D)" }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-[10] flex flex-col items-center text-center px-6">

            {/* Viewfinder frame — SVG corners, 4-layer animation */}
            <ViewfinderFrame heroRef={heroRef}>
              {/* Title — Syne, line by line */}
              <h1
                className="font-syne font-medium leading-[1.05] tracking-[-0.03em] text-cream overflow-hidden"
                style={{
                  fontSize: "clamp(38px, 6.5vw, 86px)",
                  textShadow: "0 0 50px rgba(107,175,138,0.45), 0 0 120px rgba(107,175,138,0.20)",
                }}
              >
                <span className="block" style={{ animation: "word-up 750ms cubic-bezier(0.16,1,0.3,1) 200ms both" }}>
                  Votre expertise en image,
                </span>
                <span className="block" style={{ animation: "word-up 750ms cubic-bezier(0.16,1,0.3,1) 400ms both" }}>
                  source de performance.
                </span>
              </h1>

              <p
                className="mt-5 font-inter font-medium uppercase tracking-[0.12em] text-[13px] text-cream"
                style={{ animation: "word-up 600ms cubic-bezier(0.16,1,0.3,1) 650ms both" }}
              >
                Ocimum Studio
              </p>
              <p
                className="mt-4 font-inter font-light text-[17px] md:text-[19px] leading-[1.65]"
                style={{
                  color: "rgba(240,237,232,0.58)",
                  animation: "word-up 600ms cubic-bezier(0.16,1,0.3,1) 800ms both",
                }}
              >
                <span className="block">Une production portée par l&apos;IA,</span>
                <span className="block">pour mettre en image et en son</span>
                <span className="block">les meilleurs contenus d&apos;expertise.</span>
              </p>
            </ViewfinderFrame>

            <a
              href="#process"
              className="mt-10 inline-flex items-center gap-3 font-inter text-[13px] uppercase tracking-[0.08em] text-cream border border-accent-light/70 px-7 py-3.5 hover:bg-accent-light/10 hover:border-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
              style={{
                transition: "background-color 320ms ease, border-color 320ms ease",
                boxShadow: "0 0 24px 2px rgba(107,175,138,0.12)",
                animation: "word-up 600ms cubic-bezier(0.16,1,0.3,1) 1000ms both",
              }}
            >
              Découvrir
            </a>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[10]"
            aria-hidden="true"
          >
            <div
              className="relative overflow-hidden"
              style={{ width: "1px", height: "48px", backgroundColor: "rgba(240,237,232,0.12)" }}
            >
              <div
                className="scroll-travel absolute top-0 left-0 w-full"
                style={{
                  height: "20px",
                  background: "linear-gradient(to bottom, rgba(107,175,138,0), #6BAF8A, rgba(107,175,138,0))",
                  boxShadow: "0 0 8px 2px rgba(107,175,138,0.6)",
                }}
              />
            </div>
          </div>
        </section>

        <TechStrip />

        {/* ══ 2 — Processus ════════════════════════════════════════ */}
        <section
          id="process"
          className="py-32 md:py-40 px-[8%]"
          aria-label="Notre processus"
          style={{
            background: "radial-gradient(ellipse 70% 55% at 85% 15%, rgba(61,122,95,0.28) 0%, transparent 65%), #11140F",
          }}
        >
          <ProcessSteps />
        </section>

        <LightDivider />

        {/* ══ 5 — Au-delà de la vidéo : le conseil ═══════════════ */}
        <ExpertiseCta />

        <LightDivider />

        {/* ══ 6 — Contact ════════════════════════════════════════ */}
        <ContactSection />

      </main>

      {/* ══ Footer ═══════════════════════════════════════════════ */}
      <Footer />
    </>
  );
}

/* ─── Expertise CTA — dual bridge: Conseil + Extra Services ─────── */
const BRIDGES = [
  {
    num: "01",
    label: "Conseil éditorial",
    title: "Stratégie digitale & IA.",
    desc: "La même exigence, appliquée en amont de la caméra — positionnement, prise de parole, IA au service de vos contenus.",
    href: "/conseil",
    cta: "Découvrir le conseil",
  },
  {
    num: "02",
    label: "Marketing & Data",
    title: "Un set de services by Ocimum Studio.",
    desc: "Go-to-market, acquisition web, CRM, LinkedIn, mesure, création de site — pour atteindre vos objectifs.",
    href: "/marketing-data",
    cta: "Voir les offres",
  },
];

function ExpertiseCta() {
  const { ref, visible } = useReveal();
  return (
    <section
      id="expertise-cta"
      className="py-16 md:py-20 px-[8%]"
      aria-label="Au-delà de la vidéo"
      style={{ backgroundColor: "#0D0F0D" }}
    >
      <div
        ref={ref}
        className="max-w-5xl mx-auto flex flex-col items-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1), transform 750ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="text-center">
          <Eyebrow visible={visible}>Au-delà de la vidéo</Eyebrow>
          <SectionTitle visible={visible} fontSize="clamp(24px, 2.8vw, 34px)" className="mb-10 md:mb-12">
            Ocimum Studio, c&apos;est aussi l&apos;accompagnement.
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {BRIDGES.map((b, i) => (
            <a
              key={b.href}
              href={b.href}
              className="group relative flex flex-col p-8 md:p-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
              style={{
                border: "1px solid rgba(240,237,232,0.12)",
                backgroundColor: "#11140F",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(16px)",
                transition: `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${200 + i * 130}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${200 + i * 130}ms, border-color 300ms ease, box-shadow 300ms ease`,
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
              <span className="font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-accent-light mb-4">
                {b.num} — {b.label}
              </span>
              <h3 className="font-syne font-medium text-cream tracking-[-0.02em] text-[22px] mb-3">
                {b.title}
              </h3>
              <p className="font-inter font-light text-[15px] leading-[1.72] mb-8 flex-1" style={{ color: "rgba(240,237,232,0.50)" }}>
                {b.desc}
              </p>
              <span className="inline-flex items-center gap-2 font-inter text-[12px] uppercase tracking-[0.08em] text-accent-light">
                {b.cta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Tech ticker strip ─────────────────────────────────────────── */
const STRIP = [
  "AI-POWERED", "CUSTOM TRANSCRIPT", "AVATARS", "BRANDED CONTENT",
];

function TechStrip() {
  const items = [...STRIP, ...STRIP, ...STRIP];
  return (
    <div
      className="overflow-hidden py-3.5"
      style={{ borderTop: "1px solid rgba(61,122,95,0.18)", borderBottom: "1px solid rgba(61,122,95,0.18)", backgroundColor: "#0A0C0A" }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee-ltr 35s linear infinite" }}
        aria-hidden="true"
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-inter text-[10px] uppercase tracking-[0.12em]" style={{ color: "rgba(240,237,232,0.28)" }}>
              {item}
            </span>
            <span className="mx-6 font-inter text-[10px]" style={{ color: "rgba(107,175,138,0.45)" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}


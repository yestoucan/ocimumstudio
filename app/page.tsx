"use client";
import { useEffect, useRef, useState, useCallback, type RefObject, type ReactNode } from "react";
import NavBar from "./NavBar";
import HeroBackground from "./HeroBackground";

/* ─── Reveal hook ──────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}


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

/* ─── Light divider between sections ────────────────────────────── */
function LightDivider() {
  return (
    <div className="relative h-px w-full overflow-visible" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to right, transparent 0%, rgba(61,122,95,0.75) 25%, rgba(107,175,138,0.90) 50%, rgba(61,122,95,0.75) 75%, transparent 100%)",
          boxShadow: "0 0 28px 6px rgba(107,175,138,0.40), 0 0 80px 20px rgba(61,122,95,0.22)",
        }}
      />
    </div>
  );
}

/* ─── Section title with SVG viewfinder corners ─────────────────── */
function SectionTitle({
  children,
  visible,
  fontSize = "clamp(28px, 3.5vw, 42px)",
  className = "",
}: {
  children: ReactNode;
  visible: boolean;
  fontSize?: string;
  className?: string;
}) {
  const S = 16;
  const L = S * 2;
  const STROKE = "rgba(107,175,138,0.50)";
  const DOT = "#6BAF8A";
  return (
    <div
      className={`inline-block relative px-5 py-2 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(12px)",
        transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* TL */}
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} className="absolute top-0 left-0 pointer-events-none" style={{ overflow: "visible" }} aria-hidden="true">
        <path d={`M ${S} 0 L 0 0 L 0 ${S}`} fill="none" stroke={STROKE} strokeWidth={1} strokeLinecap="square" strokeDasharray={L} strokeDashoffset={visible ? 0 : L} style={{ transition: visible ? "stroke-dashoffset 450ms cubic-bezier(0.4,0,0.2,1) 80ms" : "none" }} />
        <circle cx={0} cy={0} r={1.5} fill={DOT} style={{ opacity: visible ? 1 : 0, transition: visible ? "opacity 200ms ease-out 580ms" : "none", animation: visible ? "dot-pulse 3s ease-in-out 780ms infinite" : "none" }} />
      </svg>
      {/* TR */}
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} className="absolute top-0 right-0 pointer-events-none" style={{ overflow: "visible" }} aria-hidden="true">
        <path d={`M 0 0 L ${S} 0 L ${S} ${S}`} fill="none" stroke={STROKE} strokeWidth={1} strokeLinecap="square" strokeDasharray={L} strokeDashoffset={visible ? 0 : L} style={{ transition: visible ? "stroke-dashoffset 450ms cubic-bezier(0.4,0,0.2,1) 200ms" : "none" }} />
        <circle cx={S} cy={0} r={1.5} fill={DOT} style={{ opacity: visible ? 1 : 0, transition: visible ? "opacity 200ms ease-out 700ms" : "none", animation: visible ? "dot-pulse 3s ease-in-out 900ms infinite" : "none" }} />
      </svg>
      {/* BR */}
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} className="absolute bottom-0 right-0 pointer-events-none" style={{ overflow: "visible" }} aria-hidden="true">
        <path d={`M 0 ${S} L ${S} ${S} L ${S} 0`} fill="none" stroke={STROKE} strokeWidth={1} strokeLinecap="square" strokeDasharray={L} strokeDashoffset={visible ? 0 : L} style={{ transition: visible ? "stroke-dashoffset 450ms cubic-bezier(0.4,0,0.2,1) 320ms" : "none" }} />
        <circle cx={S} cy={S} r={1.5} fill={DOT} style={{ opacity: visible ? 1 : 0, transition: visible ? "opacity 200ms ease-out 820ms" : "none", animation: visible ? "dot-pulse 3s ease-in-out 1020ms infinite" : "none" }} />
      </svg>
      {/* BL */}
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} className="absolute bottom-0 left-0 pointer-events-none" style={{ overflow: "visible" }} aria-hidden="true">
        <path d={`M ${S} ${S} L 0 ${S} L 0 0`} fill="none" stroke={STROKE} strokeWidth={1} strokeLinecap="square" strokeDasharray={L} strokeDashoffset={visible ? 0 : L} style={{ transition: visible ? "stroke-dashoffset 450ms cubic-bezier(0.4,0,0.2,1) 440ms" : "none" }} />
        <circle cx={0} cy={S} r={1.5} fill={DOT} style={{ opacity: visible ? 1 : 0, transition: visible ? "opacity 200ms ease-out 940ms" : "none", animation: visible ? "dot-pulse 3s ease-in-out 1140ms infinite" : "none" }} />
      </svg>
      <h2 className="font-syne font-medium text-cream leading-tight tracking-[-0.03em]" style={{ fontSize }}>
        {children}
      </h2>
    </div>
  );
}

/* ─── Showreel section ──────────────────────────────────────────── */
function ShowreelSection() {
  const { ref, visible } = useReveal(0.08);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const toggleSound = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  }, []);
  const toggleFullscreen = useCallback(() => {
    if (!videoRef.current) return;
    document.fullscreenElement ? document.exitFullscreen() : videoRef.current.requestFullscreen();
  }, []);

  const S = 32;
  const L = S * 2;
  const STROKE = "rgba(107,175,138,0.65)";
  const DOT    = "#6BAF8A";
  const cornerStyle = (delay: number) => ({
    transition: visible ? `stroke-dashoffset 550ms cubic-bezier(0.4,0,0.2,1) ${delay}ms` : "none",
  });
  const dotStyle = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transition: visible ? `opacity 200ms ease-out ${delay}ms` : "none",
    animation: visible ? `dot-pulse 3s ease-in-out ${delay + 200}ms infinite` : "none",
  });

  return (
    <section
      id="showreel"
      className="py-20 md:py-28 px-[8%]"
      aria-label="Showreel"
      style={{ backgroundColor: "#0D0F0D" }}
    >
      <div
        ref={ref}
        className="max-w-4xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <SectionTitle visible={visible} fontSize="clamp(28px, 3.5vw, 42px)" className="mb-10 md:mb-14">
          Ocimum Studio, notre propre reportage.
        </SectionTitle>

        {/* Framed video container */}
        <div
          className="relative"
          style={{
            aspectRatio: "16/9",
            border: "1px solid rgba(107,175,138,0.20)",
            boxShadow: "0 0 80px rgba(61,122,95,0.18), 0 0 200px rgba(61,122,95,0.08)",
            backgroundColor: "#090B09",
          }}
        >
          {/* Placeholder */}
          <div
            className="absolute inset-0 flex items-center justify-center z-0"
            style={{ background: "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(61,122,95,0.18), transparent 70%)" }}
          >
            <span
              className="font-syne font-medium tracking-[-0.02em] uppercase select-none"
              style={{ fontSize: "clamp(14px, 2vw, 24px)", color: "rgba(240,237,232,0.10)" }}
            >
              Ocimum Studio
            </span>
          </div>

          {/* Video */}
          <video
            ref={videoRef}
            autoPlay muted loop playsInline
            className="relative z-10 w-full h-full object-cover"
            style={{ display: "block" }}
          >
            <source src="/ocimum_presentation.mp4" type="video/mp4" />
          </video>

          {/* Controls — bottom right */}
          <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
            <button
              onClick={toggleSound}
              aria-label={muted ? "Activer le son" : "Couper le son"}
              className="w-8 h-8 flex items-center justify-center border text-cream/50 hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
              style={{ backgroundColor: "rgba(13,15,13,0.80)", backdropFilter: "blur(8px)", borderColor: "rgba(107,175,138,0.22)", transition: "border-color 250ms, box-shadow 250ms" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(107,175,138,0.65)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 16px rgba(107,175,138,0.22)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(107,175,138,0.22)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
            >
              {muted ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              aria-label="Plein écran"
              className="w-8 h-8 flex items-center justify-center border text-cream/50 hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
              style={{ backgroundColor: "rgba(13,15,13,0.80)", backdropFilter: "blur(8px)", borderColor: "rgba(107,175,138,0.22)", transition: "border-color 250ms, box-shadow 250ms" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(107,175,138,0.65)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 16px rgba(107,175,138,0.22)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(107,175,138,0.22)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
            </button>
          </div>

          {/* ── Viewfinder corners — 32px, triggered on scroll ── */}
          {/* TL */}
          <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} className="absolute pointer-events-none" style={{ top: -2, left: -2, overflow: "visible", zIndex: 20 }} aria-hidden="true">
            <path d={`M ${S} 0 L 0 0 L 0 ${S}`} fill="none" stroke={STROKE} strokeWidth={1.5} strokeLinecap="square" strokeDasharray={L} strokeDashoffset={visible ? 0 : L} style={cornerStyle(100)} />
            <circle cx={0} cy={0} r={2} fill={DOT} style={dotStyle(700)} />
          </svg>
          {/* TR */}
          <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} className="absolute pointer-events-none" style={{ top: -2, right: -2, overflow: "visible", zIndex: 20 }} aria-hidden="true">
            <path d={`M 0 0 L ${S} 0 L ${S} ${S}`} fill="none" stroke={STROKE} strokeWidth={1.5} strokeLinecap="square" strokeDasharray={L} strokeDashoffset={visible ? 0 : L} style={cornerStyle(250)} />
            <circle cx={S} cy={0} r={2} fill={DOT} style={dotStyle(850)} />
          </svg>
          {/* BR */}
          <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} className="absolute pointer-events-none" style={{ bottom: -2, right: -2, overflow: "visible", zIndex: 20 }} aria-hidden="true">
            <path d={`M 0 ${S} L ${S} ${S} L ${S} 0`} fill="none" stroke={STROKE} strokeWidth={1.5} strokeLinecap="square" strokeDasharray={L} strokeDashoffset={visible ? 0 : L} style={cornerStyle(400)} />
            <circle cx={S} cy={S} r={2} fill={DOT} style={dotStyle(1000)} />
          </svg>
          {/* BL */}
          <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} className="absolute pointer-events-none" style={{ bottom: -2, left: -2, overflow: "visible", zIndex: 20 }} aria-hidden="true">
            <path d={`M ${S} ${S} L 0 ${S} L 0 0`} fill="none" stroke={STROKE} strokeWidth={1.5} strokeLinecap="square" strokeDasharray={L} strokeDashoffset={visible ? 0 : L} style={cornerStyle(550)} />
            <circle cx={0} cy={S} r={2} fill={DOT} style={dotStyle(1150)} />
          </svg>
        </div>
      </div>
    </section>
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

/* ─── Client logos ──────────────────────────────────────────────── */
const CLIENTS = [
  { name: "H24Finance", featured: true },
  { name: "Client B",   featured: false },
  { name: "Client C",   featured: false },
  { name: "Client D",   featured: false },
  { name: "Client E",   featured: false },
];

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
              href="#showreel"
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
            <span className="font-inter text-[10px] uppercase tracking-[0.12em] text-cream/30">Scroll</span>
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
          id="expertise"
          className="py-32 md:py-40 px-[8%]"
          aria-label="Notre processus"
          style={{
            background: "radial-gradient(ellipse 70% 55% at 85% 15%, rgba(61,122,95,0.28) 0%, transparent 65%), #11140F",
          }}
        >
          <ProcessSteps />
        </section>

        <LightDivider />

        {/* ══ 3 — Clients / Logos ════════════════════════════════ */}
        <section
          id="clients"
          className="py-24 md:py-32 px-[8%]"
          aria-label="Clients et partenaires"
          style={{
            background: "radial-gradient(ellipse 50% 60% at 10% 80%, rgba(61,122,95,0.20) 0%, transparent 60%), #0D0F0D",
          }}
        >
          <ClientLogos />
        </section>

        <LightDivider />

        {/* ══ 4 — Showreel ═══════════════════════════════════════ */}
        <ShowreelSection />

        <LightDivider />

        {/* ══ 5 — Contact ════════════════════════════════════════ */}
        <ContactSection />

      </main>

      {/* ══ Footer ═══════════════════════════════════════════════ */}
      <footer
        id="footer"
        className="py-16 px-[8%]"
        style={{
          backgroundColor: "#0A0C0A",
          borderTop: "1px solid rgba(61,122,95,0.12)",
          boxShadow: "0 -1px 0 rgba(107,175,138,0.04), 0 -8px 32px rgba(61,122,95,0.04)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <span className="font-inter text-[13px] font-medium uppercase tracking-[0.12em] text-cream/80">
            Ocimum Studio
          </span>
          <nav className="flex flex-wrap items-center gap-6 md:gap-8" aria-label="Liens utiles">
            {[
              { label: "Mentions légales", href: "/legal" },
              { label: "Contact",          href: "#contact" },
              { label: "LinkedIn",         href: "https://linkedin.com", target: "_blank" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.target}
                rel={l.target ? "noopener noreferrer" : undefined}
                className="link-line font-inter text-[12px] uppercase tracking-[0.07em] text-cream/40 hover:text-cream/80 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className="font-inter text-[11px] leading-relaxed text-cream/25 max-w-xs">
            Ce studio fait appel à des outils d&apos;IA pour certaines étapes de production, conformément au règlement UE sur l&apos;IA (AI Act).
          </p>
        </div>
      </footer>
    </>
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

/* ─── Client logos ──────────────────────────────────────────────── */
function ClientLogos() {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className="max-w-5xl mx-auto">
      <p
        className="mb-12 text-center font-inter text-[11px] uppercase tracking-[0.1em] text-cream/35"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1)" }}
      >
        Ils nous font confiance
      </p>
      <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
        {CLIENTS.map((client, i) => (
          <div
            key={client.name}
            className="font-inter font-normal uppercase cursor-default select-none"
            style={{
              fontSize: client.featured ? "15px" : "12px",
              letterSpacing: "0.1em",
              color: client.featured ? "rgba(240,237,232,0.55)" : "rgba(240,237,232,0.28)",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(8px)",
              transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, color 250ms, text-shadow 250ms`,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.color = "rgba(240,237,232,0.90)";
              el.style.textShadow = "0 0 24px rgba(107,175,138,0.35)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.color = client.featured ? "rgba(240,237,232,0.55)" : "rgba(240,237,232,0.28)";
              el.style.textShadow = "none";
            }}
          >
            {client.name}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Contact section ───────────────────────────────────────────── */
function ContactSection() {
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
      className="py-32 md:py-48 px-[8%]"
      aria-label="Contact"
      style={{
        background: "radial-gradient(ellipse 55% 60% at 15% 30%, rgba(61,122,95,0.24) 0%, transparent 60%), #11140F",
      }}
    >
      <div
        ref={ref}
        className="max-w-2xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(14px)",
          transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1), transform 750ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <SectionTitle visible={visible} fontSize="clamp(32px, 4vw, 48px)" className="mb-5">
          Parlons de votre projet.
        </SectionTitle>
        <p className="font-inter font-light text-[15px] leading-[1.75] mb-14" style={{ color: "rgba(240,237,232,0.45)" }}>
          Tournage, série de contenus ou stratégie vidéo — décrivez votre besoin, nous vous répondons sous 24h.
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
                placeholder="Quel type de contenu souhaitez-vous produire ? Pour quelle audience ? Dans quels délais ?"
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


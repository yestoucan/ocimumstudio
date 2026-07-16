"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ─── Reveal hook ──────────────────────────────────────────────── */
export function useReveal(threshold = 0.12) {
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

/* ─── Light divider between sections ────────────────────────────── */
export function LightDivider() {
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

/* ─── Radial lamp glow lighting a section, off-center ───────────── */
export function Lamp({ position }: { position: "tr" | "bl" }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: 900,
        height: 900,
        background: "radial-gradient(circle, rgba(61,122,95,0.24) 0%, rgba(61,122,95,0.09) 45%, transparent 72%)",
        filter: "blur(10px)",
        zIndex: 0,
        ...(position === "tr" ? { top: -320, right: -260 } : { bottom: -320, left: -260 }),
      }}
      aria-hidden="true"
    />
  );
}

/* ─── Eyebrow — uppercase micro-label above a section title ─────── */
export function Eyebrow({ children, visible }: { children: ReactNode; visible: boolean }) {
  return (
    <p
      className="eyebrow"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(10px)",
        transition: "opacity 650ms cubic-bezier(0.16,1,0.3,1), transform 650ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </p>
  );
}

/* ─── Section title with SVG viewfinder corners ─────────────────── */
export function SectionTitle({
  children,
  visible,
  fontSize = "clamp(28px, 3.5vw, 42px)",
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  visible: boolean;
  fontSize?: string;
  className?: string;
  as?: "h1" | "h2";
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
      <Tag className="font-syne font-medium text-cream leading-tight tracking-[-0.03em]" style={{ fontSize }}>
        {children}
      </Tag>
    </div>
  );
}

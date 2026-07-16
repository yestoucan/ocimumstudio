"use client";
import { useEffect, useRef } from "react";

/* Scroll-progress rail — fixed right-edge 1px line, fades in after the
   hero, fills 0–100% with accent green proportional to page scroll. */
export default function ScrollRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const fill = fillRef.current;
    if (!rail || !fill) return;

    const onScroll = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight * 0.6 : 40;
      rail.style.opacity = window.scrollY > threshold ? "1" : "0";
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      fill.style.height = `${pct}%`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={railRef}
      className="hidden md:block fixed right-7 top-1/2 -translate-y-1/2 w-px pointer-events-none z-[90]"
      style={{
        height: 220,
        backgroundColor: "rgba(240,237,232,0.12)",
        opacity: 0,
        transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1)",
      }}
      aria-hidden="true"
    >
      <div
        ref={fillRef}
        className="absolute top-0 left-0 w-full"
        style={{
          height: "0%",
          backgroundColor: "#6BAF8A",
          boxShadow: "0 0 8px rgba(107,175,138,0.6)",
          transition: "height 150ms linear",
        }}
      />
    </div>
  );
}

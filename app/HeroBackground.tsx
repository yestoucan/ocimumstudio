"use client";
import { useEffect, useRef } from "react";

// Three-point studio lighting setup
// Key: cream ellipse from top-center (main stage spotlight)
// Fill: green orbs drifting slowly (ambient studio bounce)
// Rim: green glow from below-center (monitor / screen reflection)
const ORBS = [
  { x: 0.15, y: 0.45, ox: 0.10, oy: 0.08, r: 0.55, color: "61,122,95",   alpha: 0.32, speed: 0.00008, phase: 0.0 },
  { x: 0.82, y: 0.58, ox: 0.09, oy: 0.11, r: 0.50, color: "107,175,138", alpha: 0.20, speed: 0.00006, phase: 2.1 },
  { x: 0.48, y: 0.22, ox: 0.06, oy: 0.05, r: 0.44, color: "61,122,95",   alpha: 0.18, speed: 0.00007, phase: 1.1 },
  { x: 0.70, y: 0.82, ox: 0.06, oy: 0.09, r: 0.38, color: "107,175,138", alpha: 0.15, speed: 0.00005, phase: 3.5 },
];

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const diag = Math.sqrt(w * w + h * h);

      ctx!.fillStyle = "#12201A";
      ctx!.fillRect(0, 0, w, h);

      // ── Key light — studio spotlight from top-center ──────────────
      // Soft cream ellipse, static, illuminates the text area
      {
        const kx = w * 0.5;
        const ky = h * 0.42;
        const kr = w * 0.52;
        const breath = 1 + Math.sin(t * 0.000035) * 0.04; // very slow breathe
        const kg = ctx!.createRadialGradient(kx, ky * 0.6, 0, kx, ky, kr * breath);
        kg.addColorStop(0,   "rgba(240,237,232,0.14)");
        kg.addColorStop(0.35,"rgba(240,237,232,0.07)");
        kg.addColorStop(0.7, "rgba(107,175,138,0.05)");
        kg.addColorStop(1,   "rgba(107,175,138,0)");
        ctx!.save();
        ctx!.scale(1, 1.55); // elongate vertically for a cone shape
        ctx!.beginPath();
        ctx!.arc(kx, ky / 1.55, kr * breath, 0, Math.PI * 2);
        ctx!.fillStyle = kg;
        ctx!.fill();
        ctx!.restore();
      }

      // ── Fill lights — drifting ambient orbs ───────────────────────
      for (const orb of ORBS) {
        const cx = (orb.x + Math.sin(t * orb.speed + orb.phase) * orb.ox) * w;
        const cy = (orb.y + Math.cos(t * orb.speed * 0.7 + orb.phase + 1.0) * orb.oy) * h;
        const rx = orb.r * diag;
        const ry = rx * (0.68 + Math.sin(t * orb.speed * 0.4 + orb.phase) * 0.14);
        const angle = Math.sin(t * orb.speed * 0.3 + orb.phase) * 0.4;

        // Ambient orb
        const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, rx);
        g.addColorStop(0,   `rgba(${orb.color},${orb.alpha})`);
        g.addColorStop(0.4, `rgba(${orb.color},${orb.alpha * 0.4})`);
        g.addColorStop(1,   `rgba(${orb.color},0)`);

        ctx!.save();
        ctx!.translate(cx, cy);
        ctx!.rotate(angle);
        ctx!.scale(1, ry / rx);
        ctx!.translate(-cx, -cy);
        ctx!.beginPath();
        ctx!.arc(cx, cy, rx, 0, Math.PI * 2);
        ctx!.fillStyle = g;
        ctx!.fill();
        ctx!.restore();

        // Neon core — bright LED hotspot at center
        const coreR = rx * 0.12;
        const core = ctx!.createRadialGradient(cx, cy, 0, cx, cy, coreR);
        core.addColorStop(0,   "rgba(180,255,210,0.40)");
        core.addColorStop(0.5, "rgba(120,240,170,0.18)");
        core.addColorStop(1,   "rgba(77,210,140,0)");
        ctx!.beginPath();
        ctx!.arc(cx, cy, coreR, 0, Math.PI * 2);
        ctx!.fillStyle = core;
        ctx!.fill();
      }

      t++;
      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const NAV_ITEMS = [
  { label: "Productions", href: "#showreel" },
  { label: "Expertise",   href: "#expertise" },
  { label: "Clients",     href: "#clients" },
  { label: "Contact",     href: "#contact" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  const overlay = (
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{
        backgroundColor: "#0D0F0D",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      aria-hidden={!open}
    >
      {/* top row: logo + close */}
      <div className="flex items-center justify-between px-6 h-[72px]">
        <a
          href="/"
          className="font-inter text-[13px] font-medium uppercase tracking-[0.12em] text-cream"
          onClick={onClose}
        >
          Ocimum Studio
        </a>
        <button
          onClick={onClose}
          aria-label="Fermer le menu"
          className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
        >
          <span
            className="block w-5 h-px bg-cream"
            style={{ transform: "rotate(45deg) translate(3.5px, 3.5px)", transition: "transform 300ms" }}
          />
          <span
            className="block w-5 h-px bg-cream"
            style={{ transform: "rotate(-45deg) translate(3.5px, -3.5px)", transition: "transform 300ms" }}
          />
        </button>
      </div>

      {/* nav items */}
      <nav className="flex flex-col flex-1 items-start justify-center px-8 gap-8">
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="font-cormorant text-[40px] font-light text-cream/90 hover:text-cream transition-colors duration-200"
            style={{
              transitionDelay: open ? `${i * 60}ms` : "0ms",
              transform: open ? "translateY(0)" : "translateY(16px)",
              opacity: open ? 1 : 0,
              transition: `opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms, color 200ms`,
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* bottom CTA */}
      <div
        className="px-8 pb-12"
        style={{
          opacity: open ? 1 : 0,
          transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) 300ms",
        }}
      >
        <a
          href="#contact"
          onClick={onClose}
          className="inline-flex items-center gap-3 text-[13px] font-inter uppercase tracking-[0.08em] text-cream border border-accent-light px-6 py-3 hover:bg-accent-light/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
        >
          Réserver un appel
        </a>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}

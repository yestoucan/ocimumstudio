"use client";
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";

const NAV_ITEMS = [
  { label: "Productions", href: "#showreel" },
  { label: "Expertise",   href: "#expertise" },
  { label: "Clients",     href: "#clients" },
  { label: "Contact",     href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-[1000] h-[72px] flex items-center"
        style={{
          backgroundColor: scrolled ? "rgba(13,15,13,0.90)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(61,122,95,0.15)" : "none",
          transition: "background-color 500ms ease, backdrop-filter 500ms ease, border-bottom 500ms ease",
        }}
      >
        <div className="w-full flex items-center justify-between px-[8%]">
          {/* Logo */}
          <a
            href="/"
            className="font-inter text-[13px] font-medium uppercase tracking-[0.12em] text-cream hover:text-accent-light transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
          >
            Ocimum Studio
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Navigation principale">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-line font-inter text-[13px] font-normal uppercase tracking-[0.07em] text-cream/60 hover:text-cream transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:rounded-sm"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="font-inter text-[13px] font-normal uppercase tracking-[0.07em] text-cream border border-accent-light/60 px-5 py-2.5 hover:bg-accent-light/10 hover:border-accent-light transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
            >
              Réserver un appel
            </a>
          </nav>

          {/* Burger */}
          <button
            className="md:hidden relative z-[10000] w-10 h-10 flex flex-col items-center justify-center gap-[5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className="block w-5 h-px bg-cream transition-transform duration-300"
              style={{ transform: mobileOpen ? "rotate(45deg) translate(3.5px, 3.5px)" : "none" }}
            />
            <span
              className="block w-5 h-px bg-cream transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-px bg-cream transition-transform duration-300"
              style={{ transform: mobileOpen ? "rotate(-45deg) translate(3.5px, -3.5px)" : "none" }}
            />
          </button>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

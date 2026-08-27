"use client";
import OcimumMark from "./OcimumMark";

export default function Footer() {
  return (
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
        <span className="flex items-center gap-2.5 font-syne text-[16px] font-medium tracking-[-0.03em] text-cream/80">
          <OcimumMark size={18} />
          Ocimum Studio
        </span>
        <nav className="flex flex-wrap items-center gap-6 md:gap-8" aria-label="Liens utiles">
          {[
            { label: "Mentions légales", href: "/legal" },
            { label: "Contact",          href: "#contact" },
            { label: "LinkedIn",         href: "https://www.linkedin.com/company/ocimumstudio/", target: "_blank" },
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
  );
}

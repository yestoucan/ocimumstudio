"use client";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { useReveal, Eyebrow, SectionTitle, Lamp, LightDivider } from "../shared";

const EMAIL = "contact@ocimumstudio.com";

/* ─── Building blocks ───────────────────────────────────────────── */
function Article({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="pt-12">
      <h2 className="font-syne font-medium text-cream tracking-[-0.02em] text-[24px] md:text-[28px] mb-6">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </article>
  );
}

function Block({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div>
      {title && (
        <h3 className="font-inter font-medium text-[15px] tracking-[0.01em] text-cream/85 mb-2">
          {title}
        </h3>
      )}
      <div className="font-inter font-light text-[15px] leading-[1.75]" style={{ color: "rgba(240,237,232,0.55)" }}>
        {children}
      </div>
    </div>
  );
}

function A({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-accent-light hover:text-cream underline underline-offset-4 decoration-accent-light/40 hover:decoration-cream/60 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
    >
      {children}
    </a>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function LegalContent() {
  const { ref, visible } = useReveal(0.04);

  return (
    <>
      <NavBar />

      <main>
        {/* Header */}
        <section
          className="relative overflow-hidden pt-[180px] pb-16 px-[8%]"
          aria-label="Mentions légales et confidentialité"
          style={{ backgroundColor: "#0D0F0D" }}
        >
          <Lamp position="tr" />
          <div className="relative max-w-3xl mx-auto">
            <Eyebrow visible>Légal</Eyebrow>
            <SectionTitle as="h1" visible fontSize="clamp(32px, 4.5vw, 56px)">
              Mentions légales &amp; Confidentialité
            </SectionTitle>
          </div>
        </section>

        {/* Body */}
        <section className="px-[8%] pb-28" style={{ backgroundColor: "#0D0F0D" }}>
          <div
            ref={ref}
            className="max-w-3xl mx-auto divide-y"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(14px)",
              transition: "opacity 750ms cubic-bezier(0.16,1,0.3,1), transform 750ms cubic-bezier(0.16,1,0.3,1)",
              borderColor: "rgba(240,237,232,0.10)",
            }}
          >
            {/* ── Mentions légales ── */}
            <Article title="Mentions légales">
              <Block title="Éditeur du site">
                <p className="font-medium text-cream/75">Ocimum Studio</p>
                <p className="mt-1">
                  <strong className="text-cream/70 font-medium">Forme juridique :</strong>{" "}
                  Société par actions simplifiée (SAS) au capital de 10 000 €
                </p>
                <p className="mt-1">
                  <strong className="text-cream/70 font-medium">Président / Directeur de la publication :</strong>{" "}
                  Jean-Alix Joakim Philippe Poylo
                </p>
                <p className="mt-1">
                  <strong className="text-cream/70 font-medium">Siège social :</strong>{" "}
                  3 rue de Belzunce, 64500 Saint-Jean-de-Luz, France
                </p>
                <p className="mt-1">
                  <strong className="text-cream/70 font-medium">SIREN :</strong> 108 015 967
                  {" · "}
                  <strong className="text-cream/70 font-medium">SIRET (siège) :</strong> 108 015 967 00012
                </p>
                <p className="mt-1">
                  <strong className="text-cream/70 font-medium">RCS :</strong> Bayonne
                  {" · "}
                  <strong className="text-cream/70 font-medium">Code APE :</strong> 6202A
                </p>
                <p className="mt-1">
                  <strong className="text-cream/70 font-medium">TVA intracommunautaire :</strong>{" "}
                  FR13 108 015 967
                </p>
                <p className="mt-1">
                  <strong className="text-cream/70 font-medium">Email :</strong>{" "}
                  <A href={`mailto:${EMAIL}`}>{EMAIL}</A>
                </p>
                <p className="mt-1">
                  <strong className="text-cream/70 font-medium">Site web :</strong>{" "}
                  <A href="https://ocimumstudio.com" external>ocimumstudio.com</A>
                </p>
              </Block>

              <Block title="Hébergeur">
                <p>
                  Vercel Inc.
                  <br />
                  440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
                  <br />
                  <A href="https://vercel.com" external>vercel.com</A>
                </p>
              </Block>
            </Article>

            {/* ── Politique de confidentialité ── */}
            <Article title="Politique de confidentialité">
              <Block title="Responsable de traitement">
                <p>
                  Ocimum Studio (SAS), représentée par son président Jean-Alix Poylo.
                  <br />
                  Contact : <A href={`mailto:${EMAIL}`}>{EMAIL}</A>
                </p>
              </Block>

              <Block title="Données collectées et finalités">
                <ul className="list-disc space-y-2 pl-5">
                  <li>
                    <strong className="text-cream/70 font-medium">Demandes par email :</strong>{" "}
                    Lorsque vous nous contactez à l&apos;adresse {EMAIL}, nous traitons votre nom,
                    votre adresse email et le contenu de votre message dans le seul but de répondre
                    à votre demande. Base légale : intérêt légitime (art. 6.1.f RGPD).
                  </li>
                  <li>
                    <strong className="text-cream/70 font-medium">Mesure d&apos;audience :</strong>{" "}
                    Ce site utilise Google Analytics 4 (GA4) pour analyser sa fréquentation de manière
                    agrégée. Ce traitement est soumis à votre consentement préalable via le bandeau
                    Cookiebot. Aucune donnée n&apos;est collectée sans votre accord. Base légale :
                    consentement (art. 6.1.a RGPD).
                  </li>
                </ul>
              </Block>

              <Block title="Destinataires des données">
                <ul className="list-disc space-y-1 pl-5">
                  <li>Google LLC (Google Analytics) — mesure d&apos;audience</li>
                  <li>Cybot A/S (Cookiebot) — gestion du consentement</li>
                  <li>Vercel Inc. — hébergement du site</li>
                </ul>
              </Block>

              <Block title="Transferts hors Union européenne">
                <p>
                  Certains prestataires (Google, Vercel) sont établis aux États-Unis. Ces transferts
                  sont encadrés par les clauses contractuelles types (SCCs) de la Commission européenne
                  et/ou le Data Privacy Framework UE-USA.
                </p>
              </Block>

              <Block title="Durée de conservation">
                <ul className="list-disc space-y-1 pl-5">
                  <li>Emails de contact : 12 mois maximum après traitement, puis supprimés.</li>
                  <li>Données Google Analytics : 14 mois maximum (paramétrage GA4).</li>
                </ul>
              </Block>

              <Block title="Vos droits (RGPD, articles 15 à 21)">
                <p>
                  Vous disposez des droits suivants concernant vos données personnelles : accès,
                  rectification, effacement, limitation, portabilité, opposition et retrait du
                  consentement (pour les cookies, via le bandeau Cookiebot).
                </p>
                <p className="mt-2">
                  Pour exercer ces droits, contactez-nous à :{" "}
                  <A href={`mailto:${EMAIL}`}>{EMAIL}</A>
                </p>
              </Block>

              <Block title="Réclamation">
                <p>
                  Si vous estimez que le traitement de vos données ne respecte pas la réglementation,
                  vous pouvez introduire une réclamation auprès de la Commission Nationale de
                  l&apos;Informatique et des Libertés (CNIL) :{" "}
                  <A href="https://www.cnil.fr" external>www.cnil.fr</A>
                </p>
              </Block>
            </Article>

            {/* ── Cookies & traceurs ── */}
            <Article title="Cookies & traceurs">
              <Block title="Cookies strictement nécessaires">
                <p>
                  Cookiebot (CookieConsent) — gestion du consentement. Durée : 12 mois. Déposé sans
                  consentement préalable, car nécessaire au fonctionnement du bandeau.
                </p>
              </Block>
              <Block title="Cookies de mesure d'audience (soumis à consentement)">
                <p>
                  Google Analytics 4 (_ga, _ga_*) — mesure d&apos;audience. Durée : jusqu&apos;à 14 mois.
                  Déposés uniquement après votre accord via Cookiebot.
                </p>
              </Block>
              <Block>
                <p>
                  Vous pouvez modifier vos préférences à tout moment via le bandeau Cookiebot ou les
                  paramètres de votre navigateur.
                </p>
              </Block>
            </Article>

            {/* ── Outils d'IA ── */}
            <Article title="Recours à l'intelligence artificielle">
              <Block>
                <p>
                  Ocimum Studio fait appel à des outils d&apos;intelligence artificielle pour certaines
                  étapes de production, sous contrôle humain, conformément au règlement (UE) 2024/1689
                  sur l&apos;intelligence artificielle (AI Act). Les contenus générés font l&apos;objet
                  d&apos;une validation avant diffusion.
                </p>
              </Block>
            </Article>

            {/* ── Propriété intellectuelle ── */}
            <Article title="Propriété intellectuelle">
              <Block>
                <p>
                  L&apos;ensemble du contenu de ce site — textes, graphismes, logos et conception — est
                  la propriété d&apos;Ocimum Studio et est protégé par les lois applicables en matière
                  de propriété intellectuelle. Toute reproduction sans autorisation écrite préalable est
                  interdite.
                </p>
              </Block>
            </Article>
          </div>
        </section>

        <LightDivider />
      </main>

      <Footer />
    </>
  );
}

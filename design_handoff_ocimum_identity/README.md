# Handoff: Ocimum Studio — Visual Identity & Website

## Overview
Full visual identity for Ocimum Studio (French SASU: digital strategy consulting, data/AI consulting, AI-powered audiovisual production). B2B, primarily French sociétés de gestion (asset managers). Package covers logo/mark, marketing site (2 pages), brandboard, iconography, business card, deck template, and an animated logo intro.

## About the Design Files
The files here are **design references built in HTML/CSS/JS** — prototypes of the intended look, layout, and behavior. They are not production code to copy verbatim. Recreate them in the target codebase's actual stack (whatever framework/CMS is already in use — or the most suitable choice if this is greenfield), following that codebase's existing patterns for components, routing, and state.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and micro-interactions are all as intended. Recreate pixel-close using the design tokens below.

## Design system

### Visual concept
Dark "color-grading bay" aesthetic — cinematic, restrained, precise. No gradients, no glassmorphism, no drop shadows, no rounded corners. Depth comes only from cream-text opacity and 1px hairlines. A recurring viewfinder/camera-bracket motif (thin L-shaped corner marks) frames key elements throughout.

### Colors
| Token | Hex | Use |
|---|---|---|
| Background | `#0D0F0D` | Primary ground, near-black with green undertone |
| Background alt | `#11140F` | Raised surfaces, banding |
| Background deep | `#0A0C0A` | Darkest bands (ticker, ribbons) |
| Foreground / cream | `#F0EDE8` | All text — never pure white. Titles 100%, body ~45%, meta ~30%, faint labels ~22–28% (opacity only, no new colors) |
| Accent basil | `#6BAF8A` | Sole accent — lines/marks only, never a filled block |
| Accent deep | `#3D7A5F` | Shadows/depth on the accent, or accent-on-light-ground |
| Bright-mode ink | `#14160F` | Line color when inverted onto a light ground (`#F3F0E8`) for the Bright logo variant |

Hairlines: `rgba(240,237,232,0.12–0.14)`, 1px, never 2px, never rounded.

### Typography
- **Syne 500** — all headlines. Tight tracking `-0.03em`, line-height `1.05`.
- **Inter 300/400/500** — everything else. Body at Light 300, 15–19px, line-height 1.65–1.75.
- **Inter uppercase micro-labels** — eyebrows/captions/labels, 10–13px, letter-spacing `0.08–0.12em`, weight 500.
- **Cormorant Garamond 300** — rare serif accent, oversized display moments only, never body copy.

Google Fonts: `Syne:wght@500,600`, `Inter:wght@300;400;500`, `Cormorant+Garamond:wght@300`.

### Logo / mark
Built from the same viewfinder-bracket hairline strokes as the corner-mark motif: four L-shaped corner brackets (stroke-linecap square) framing two intersecting basil-leaf/aperture curves (stroke-linecap round), with a single thin basil-green center vein as the sole accent detail. Never filled — always stroked, ~3.5% of bounding box as stroke width. See `Ocimum Studio Logo.html` for full lockup, standalone mark, horizontal/stacked variants, and Dark/Bright treatments. `Ocimum Studio Animated Logo.html` has the reveal animation (3 variants) for video intros.

### Layout principles
- Generous negative space; sections separated by darkness, not dividers or cards.
- 1px hairline borders only, low opacity.
- No shadows, no rounded corners anywhere.
- Corner-bracket motif reused as a recurring framing device (nav, cards, section starts).

## Screens / Views

1. **Homepage** (`Ocimum Studio Homepage.html`) — Nav, hero with scan-line rail, ticker, production process steps, client logos (scan-sweep on reveal), showreel, Expertise/Conseil CTA bridge, contact form, footer. Full-page film-grain overlay + scroll-progress rail (right edge, fills with accent green as user scrolls, appears after hero).
2. **Conseil (Expertise) page** (`Ocimum Studio Conseil.html`) — Digital strategy + Data/AI consulting detail page, mirrored two-column blocks (`.expertise-grid` / `.reverse`), numbered detail rows, bridges back to production via CTA. Shares nav/footer/contact pattern with Homepage.
3. **Brandboard** (`Ocimum Studio Brandboard.html`) — Full identity reference: colors, type, logo usage, motif.
4. **Logo page** (`Ocimum Studio Logo.html`) — Primary lockup, standalone mark, horizontal/stacked variants, Dark + Bright presentations.
5. **Iconography** (`Ocimum Studio Iconography.html`) — Icon set page, Dark + Bright variants.
6. **Business card** (`Ocimum Studio Business Card.html`) — Front/back print layout, full logo lockup + contact block.
7. **Deck template** (`Ocimum Studio Deck Template.html` + `ocimum-deck-styles.css`) — Slide types: cover, section divider, agenda, bullets, two-column, quote, stats, full-bleed image, team, contact/closing. French copy, placeholder content.
8. **Animated logo** (`Ocimum Studio Animated Logo.html` + `ocimum-logo-scene.jsx`) — 3 intro-animation variants (with/without wordmark, larger mark) for use as video intros.
9. **Export sheet** (`Ocimum Studio Export Sheet.html`) — ffmpeg-ready reference: hex values, type specs, mark PNGs (dark/bright, multiple sizes), 18-icon transparent PNG set, sample ffmpeg overlay/drawtext commands.

## Interactions & Behavior
- **Nav**: adds `.is-scrolled` state past 40px scroll (background/border appears); mobile hamburger toggles a full panel.
- **Scroll reveal**: generic `.reveal` class fades/slides elements in on intersection (see `ocimum-script.js`).
- **Scroll-progress rail**: fixed right-edge 1px line, fades in after hero, fills height 0–100% proportional to page scroll, accent-green with soft glow.
- **Clients row**: one-time diagonal light-sweep animation (`clients-scan`) triggered when the row enters view.
- **Film grain**: full-viewport fixed overlay, animated 4-step noise shift, `mix-blend-mode: overlay`, opacity 0.05 — constant subtle texture, not tied to scroll.
- **Contact form**: underline-style fields, submits to a success state (`.contact-success`) shown/hidden via JS, no real backend wired.
- **Corner-bracket motif**: SVG draw-in and hover-expand on interactive elements (see `.lamp` / bracket components in `ocimum-styles.css`).
- Respect `prefers-reduced-motion` — reveal/scan/grain animations should degrade to static states.

## State Management
Static marketing site — no persisted app state. JS-only concerns: nav scroll class, mobile panel open/close, scroll-rail fill %, reveal-on-scroll (IntersectionObserver), contact-form submit → success view swap, one-shot clients scan trigger.

## Design Tokens
See Colors/Typography above. Spacing is generous and non-scaled (no fixed spacing scale defined — negative space is designed per-section); replicate proportions from the HTML/CSS rather than inventing a token scale.

## Assets
- `export-assets/mark/` — logo mark PNGs, Dark + Bright, at 128/256/512px, transparent background.
- `export-assets/icons/` — 18 UI/interface icons, 256px, transparent PNG, cream stroke (green accent on the "enregistrer" icon).
- `favicon.png` (+ 16/32/64/180px variants) — simplified leaf/aperture mark, no corner brackets (illegible at tab size), solid `#0D0F0D` background.
- All logo/icon artwork is inline SVG in the HTML source (`Ocimum Studio Logo.html`, `Ocimum Studio Iconography.html`) — no external icon library used; this is a fully custom mark, not drawn from a stock set.

## Files in this bundle
- `Ocimum Studio Homepage.html`, `Ocimum Studio Conseil.html` — marketing site pages (share `ocimum-styles.css`, `ocimum-expertise-styles.css`, `ocimum-script.js`)
- `Ocimum Studio Brandboard.html`, `Ocimum Studio Logo.html`, `Ocimum Studio Iconography.html` — identity reference pages
- `Ocimum Studio Business Card.html` — print collateral
- `Ocimum Studio Deck Template.html` + `ocimum-deck-styles.css` — slide deck starter
- `Ocimum Studio Animated Logo.html` + `ocimum-logo-scene.jsx` — animated intro variants
- `Ocimum Studio Export Sheet.html` — ffmpeg/video production reference
- `ocimum-styles.css`, `ocimum-expertise-styles.css`, `ocimum-deck-styles.css` — stylesheets
- `ocimum-script.js` — shared site behavior (nav, reveal, scroll-rail, form)
- `export-assets/` — exported mark + icon PNGs
- `favicon*.png` — favicon set

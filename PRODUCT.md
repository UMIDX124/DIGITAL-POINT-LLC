---
name: Digital Point LLC
description: AI automation agency selling outcomes (not software) — agents, workflow automation, remote operators, performance marketing, systems & reporting.
register: brand
---

# PRODUCT.md — Digital Point LLC (DPL)

> Marketing site for an AI automation agency. The site IS the product surface.
> Every page is a sales asset. Register: **brand**.

## What we sell

DPL operates AI + human teams as a managed service. We do not sell software, seats, or dashboards. Clients hand us a workflow; we run it.

Five service pillars, in this order (locked):

1. **AI Agents** — autonomous workflows replacing repeatable headcount.
2. **Workflow Automation** — wiring tools, data, and humans together.
3. **Remote Operators** — vetted human ops layered over the AI.
4. **Performance Marketing** — paid acquisition with operator + agent execution.
5. **Systems & Reporting** — the layer that makes the work legible.

## Hero promise

> *Hire the AI. Skip the headcount.*

Em wraps "the AI" only. Period inline outside em. `.hero-h1-line-2` nowrap wrapper at ≥640px provides the line break (Phase 18.6 P1 removed the `<br>`; the line-2 span is `display: block`). Em visual is `font-display font-bold not-italic` per Phase 18.6 P2 (Geist Sans bold, amber-accent), not Instrument Serif italic. The phrasing is locked. The visual treatment is locked at the Phase 18.6 supersedure.

## Users

**Primary buyer:** founders and ops leaders at $1M–$50M revenue companies who:
- Already feel the cost of headcount-led ops.
- Are bought-in on AI conceptually but skeptical of vendor demos.
- Want one accountable counterparty, not a SaaS subscription.

**Secondary readers:** their finance/ops lieutenants who must justify the spend, and analysts running diligence before a call.

**Not the audience:** developers shopping for an API. Enterprise procurement looking for SOC2-RFP boilerplate. Agencies looking to white-label.

## Voice + tone

- Operator-confident, not founder-cute. We've already done the work; the page reports it.
- Bloomberg-terminal seriousness, not Apple-keynote awe. Specifics over adjectives.
- Use contractions. Vary sentence length. No restated headings, no "Welcome to…", no em dashes anywhere.
- When the site quotes a metric, the metric is real or it doesn't ship.

## Strategic principles

- **Show, don't pitch.** The orbit, the data ticker, the atmosphere are the demo. Visual evidence > bullet lists.
- **One accountable surface.** Every contact route lands in the same inbox; no generic email surfaces (Phase 12 contact strategy). The single allowed email-shaped surface is the literal `hello@` token in the footer philosophy block.
- **Editorial, not glassy.** The site feels like a publication, not a SaaS dashboard. Instrument Serif italic carries the headline; Geist Sans does the rest.
- **Native scroll.** No Lenis, no scroll-jacking. Motion happens inside sections, not by hijacking page scroll.
- **Reduced-motion is first-class.** Every animation has a `prefers-reduced-motion` killswitch. The site must not flicker, drift, or spin for users who opt out.

## Anti-references (what DPL is NOT)

- Not Vercel/Linear gradient-glass aesthetics. We do not glow.
- Not Apple silicon hero with looping product video.
- Not Notion-grey marketing pages.
- Not the agency-template stack (kerned uppercase eyebrow + center-aligned headline + 3 identical icon cards). If it could be confused for an Awwwards SOTD template, it has already failed.
- Not crypto/AI neon (cyan + magenta on black).

## Locked invariants (FATAL halt conditions if violated)

These come from `CLAUDE.md` Phase 17b → Phase 18.5 lockdowns. Treat as load-bearing.

### Brand purity
- Bloomberg Operator palette: `#000` canvas, `#FF8800` amber primary, `#2A8FBD` instrument blue secondary.
- **Zero violet, indigo, or purple anywhere on content surfaces.** (The atmospheric exception below applies only to background hero layers.)
- Logo SHA pin: `Dp-logo1.png` `ed31936ca7a0f13a20170f68a6faad27b06afe30a4f4d2a825480def9e78bc2f`.

### Hero geometry
- AutomationOrbit Palette D — outer rx=138 ry=98, inner rx=62 ry=42, 4 cardinal nodes, 90s rotation.
- HeroDataTicker substrate sits between atmosphere and content (z-index 1.5 region). Opacities 0.18 amber / 0.12 UTC / 0.18 instrument-blue.

### Architecture
- Native scroll only. No Lenis, no scroll-jacking libraries.
- Marquee logo strip null-returned (env-gated `NEXT_PUBLIC_MARQUEE_ENABLED`).
- `TestimonialsSection.tsx` returns null — testimonials surface elsewhere or not at all.
- FAQ lives at `/faq` with `FAQPage` JSON-LD.
- Footer philosophy block contains the literal `<code>hello@</code>` token (Pillar 4 R7 — the single allowed email-shaped surface).
- `font-display: optional` + size-adjust descriptors on `InstrumentSerifLocal` regular + italic. Do not change to `swap` — it brings back the Phase 17b CLS regression.

### Atmospheric exception (Phase 18.5, repo-owner authorized)
- Amber `#FF8800` may render at ≤30% opacity in hero background atmosphere (CSS radial-gradient or Three.js sphere material).
- Blue `#2A8FBD` may render at ≤22% opacity in same context.
- Applies ONLY to background layers behind hero content. Content surfaces (text, buttons, borders, icons) remain at full Bloomberg discipline.

### Performance gate
- K11 Lighthouse mobile median ≥92 is the authoritative ship-readiness gate. K14 budget (≤95KB gzipped initial-bundle delta) excludes lazy-loaded chunks (`next/dynamic` with `{ ssr: false }`).
- Three.js atmosphere chunk (~129KB gz) loads only on desktop without reduced-motion, after first paint via `requestIdleCallback`.

### Git
- Force push: never. Linear-forward `git push` only. Trunk-based, direct push to `main` is allowed for solo-operator commits. No `--amend` on pushed commits, no rebase of pushed history.

## Section grammar (homepage)

The homepage carries the brand. Sections, in order:

1. Hero (atmosphere + headline + ticker + CTA + trust strip + orbit)
2. ProofBar / TrustStrip
3. ServicesListSection or ServicesPinReveal (5 pillars locked order)
4. ProcessSection (Lead → Scored → Routed → Reported)
5. PillarsSection (deep-dive on capability)
6. CaseStudiesPreview
7. ProofSection / StatStripSection
8. PullQuoteSection (Faizan — preserved)
9. FAQSection
10. CTASection
11. Footer (with `hello@` literal)

Pages live under `(marketing)/`. Conversion routes (e.g. `free-growth-audit`) live under `(conversion)/` with a stripped layout.

## Out of scope

- Live chatbot widget (intentionally excluded).
- Generic email surfaces (no `mailto:`, no `info@`, no contact email plastered in headers).
- Any palette drift toward purple/violet/indigo. The legacy comment in `globals.css` mislabels `#FF8800` as "purple" — that is documentation rot. The color is amber. Do not "fix" the value to match the comment.

## Where to look

- Locked rules: `/CLAUDE.md`
- Token system source of truth: `/src/app/globals.css` (`@theme inline`, `:root`)
- Phase audit reports: `/docs/PHASE_*`
- Deployment notes: `/docs/SESSION_HANDOFF.md`, `/docs/CI_CD_GROUND_TRUTH.md`

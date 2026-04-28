# Digital Point LLC — Project Durable Rules

Project-scoped supplement to global `~/.claude/CLAUDE.md`. Global rules apply
in full; this file appends project-specific invariants. **Locked invariants
listed here are FATAL halt conditions if violated.**

---

## Locked Invariants

### Brand + Visual

- **Bloomberg Operator palette purity** — `#000` canvas, `#FF8800` amber primary,
  `#2A8FBD` instrument blue secondary. Zero violet, indigo, or purple
  anywhere on content surfaces. (See atmospheric exception below.)
- **Hero copy** — `Hire the AI. Skip the headcount.` (italic em wraps
  "the AI" only; period inline outside em; explicit `<br>` between
  sentences; `.hero-h1-line-2` nowrap wrapper at ≥640px).
- **5-service order** — AI Agents → Workflow Automation → Remote
  Operators → Performance Marketing → Systems & Reporting.
- **AutomationOrbit Palette D geometry** — outer rx=138 ry=98, inner
  rx=62 ry=42, 4 cardinal nodes, 90s rotation, prefers-reduced-motion
  killswitch. SVG-internal; container bounds may evolve (Phase 18 V4)
  but geometry is locked.
- **HeroDataTicker substrate** — top-right with current opacities
  (0.18 amber / 0.12 UTC / 0.18 instrument-blue). Substrate stacking
  position (between atmosphere and content) is locked per K9.
- **Logo SHA** — `Dp-logo1.png` `589f799b69d277e08ab1011faf7a80fd8cf4143ac610e3b1282f8b24d2195600`.
  Mascot file at `public/Dp-logo1.png` unchanged.

### Architecture + Behavior

- Native scroll (no Lenis introduction).
- Marquee logo strip null-returned (env-gated `NEXT_PUBLIC_MARQUEE_ENABLED`).
- `TestimonialsSection.tsx` returns null.
- `font-display: optional` + size-adjust descriptors preserved on
  `InstrumentSerifLocal` regular + italic.
- FAQ at `/faq` route with FAQPage JSON-LD schema.
- Process timeline composition (Lead → Scored → Routed → Reported).
- Faizan pull-quote section preserved.
- Cosmo FAB IntersectionObserver footer-aware visibility.
- Phase 12 contact strategy: zero generic email surfaces; ContactPoint
  URL-based; `<code>hello@</code>` literal in Footer philosophy block
  is the ONE allowed email-shaped surface (Pillar 4 R7).

### Phase 17b additions

- **V3 italic descender STRUCTURAL fix** — `.hero-em-inner` inline-block
  child establishes BFC for italic descender clearance; supersedes
  Pillar 5 R1 parametric padding-block clamp on `.hero-em` (preserved
  in commit `499d965` for safety-net rollback).
- **V7 Pillar 4 P1.1 carve-out** — `.eyebrow` utility class is muted
  gray site-wide per V7 (Path 1 carve-out, 2026-04-28). EXCEPTION:
  `.services-pin-section-eyebrow` retains `var(--accent-bright)` amber
  per Pillar 4 P1.1 invariant (display-size eyebrow on pure black
  reads near-invisible in muted gray despite 7.4:1 math contrast —
  perceptual hierarchy demands amber). All other site-wide
  `.eyebrow`-class consumers use `var(--text-muted)`.

### Phase 18 atmospheric exception (authorized 2026-04-28; amended Phase 18.5 2026-04-28)

**K17 amended threshold (Phase 18.5, repo-owner authorized):** Amber
`#FF8800` may render at ≤30% opacity in hero background atmosphere
layer (CSS radial-gradient OR Three.js sphere material). Blue `#2A8FBD`
may render at ≤22% opacity in same context. Exception applies ONLY to
background layers behind hero content; content surfaces (text, buttons,
borders, icons) remain at full Bloomberg Operator palette discipline.
Zero violet/indigo/purple anywhere remains absolute (K1 unchanged).
K17 violation thresholds updated accordingly.

Currently shipped:
- Phase 18.B (`835c8e9`) initial CSS atmosphere → SUPERSEDED by 18.5.C
- Phase 18.5.C (`5afb9ff`) atmosphere intensity bump:
  `.hero-section` background — 4 stacked radial-gradients:
    L1 amber primary glow @ 12% 22% — 0.28 opacity / 55% falloff
    L2 blue secondary glow @ 88% 78% — 0.20 opacity / 55% falloff
    L3 soft amber center fill @ 50% 50% — 0.06 opacity / 70% falloff
    L4 vignette ellipse 70%×60% — `#1a130a` → `#000` at 80%
  `.hero-section::before` grain — SVG turbulence noise (240×240 tile,
    baseFrequency 0.85, seed 5), 0.10 layer opacity, mix-blend-mode overlay
- Phase 18.5.D (`612fdf1`) Three.js sphere layer:
  Sphere A radius 380px @ #FF8800, opacity 0.27, emissive 0.05, drift 45s
  Sphere B radius 260px @ #2A8FBD, opacity 0.25, emissive 0.04, drift 38s
  Sphere C radius 200px @ #FF8800, opacity 0.17, emissive 0.03, drift 52s
  All buffered ≤K17 caps (max amber 0.28 < 0.30; max blue 0.20 < 0.22).
- Phase 18.5.E (`6f5f17c`) parallax: scrollY × {0.05, 0.08, 0.03} per
  sphere, hard-clamped ±24px, passive rAF-throttled, K13 reduced-motion
  guards (handler-bind + rotation guard inside tick).

### Phase 18 K14 amended (initial-bundle interpretation, Phase 18.5 2026-04-28)

**K14 amended (Phase 18.5, repo-owner authorized Path 1):** "Bundle
delta budget ≤95KB gzipped" applies to **initial-page-load bundle delta**
only. Lazy-loaded chunks (`next/dynamic` with `{ ssr: false }`) are
EXCLUDED from this measurement, since they do not affect initial paint,
LCP, or mobile/reduced-motion users by design. Total chunk bytes still
tracked in summary deliverable for transparency. **K11 Lighthouse mobile
median ≥92 is the authoritative ship-readiness gate** (measured at every
gate: D-GATE, E-GATE, G-GATE production).

Currently shipped Three.js chunk: ~520KB raw / ~129KB gzipped. Lazy-
loaded only on desktop without reduced-motion, AFTER first paint via
`requestIdleCallback`. Initial-page-load delta from Phase 17b baseline:
~+2KB (CSS atmosphere rules + dynamic-import shim only).

### Phase 18 Ambiguity #2 carve-out (authorized 2026-04-28)

**Hero stacking carve-out (Phase 18.B, repo-owner authorized):** The
Phase 18 directive locked configuration specified `.hero-section > * {
position: relative; z-index: 2 }`. That selector would promote
`<HeroDataTicker />` (a `.hero-section` direct child, the substrate
between atmosphere and content) above content, regressing the K9
substrate-position invariant. **Carve-out: rule applies to
`.hero-section > .hero-grid` only** (the content wrapper). HeroDataTicker
keeps default stacking and remains between atmosphere and content.

Phase 18.5.D ships an additional `.hero-section` direct-child element:
the `<canvas class="hero-atmosphere-canvas">` (or
`<div class="hero-atmosphere-fallback">` for mobile / reduced-motion).
These sit at `z-index: 1` (above CSS atmosphere bg + ::before grain at
`z-index: 0`, below `.hero-grid` content at `z-index: 2`). HeroDataTicker
DOM order is preserved (renders AFTER atmosphere/fallback, BEFORE grid),
so it stacks visually between Three.js spheres and content per K9.

---

## Kill Conditions Reference

K1–K10 are project-wide kill conditions per Phase 17b directive Part 3.
K9 is specifically critical for the Phase 18 carve-out above. K11–K17
are Three.js-specific and apply only when Phase 18.C/D B2 ship is
authorized in a future directive.

## Force Push

Never. Linear-forward `git push` only. Trunk-based working agreement;
direct push to `main` is allowlisted in `.claude/settings.local.json`
for solo-operator commits. PR review not required. History rewrite
NEVER (no `--amend` on pushed commits, no `git push --force`, no rebase
of pushed history).

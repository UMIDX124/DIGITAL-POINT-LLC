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

### Phase 18 atmospheric exception (authorized 2026-04-28)

**Atmospheric exception (Phase 18, repo-owner authorized):** Amber
`#FF8800` may render at ≤13% opacity in hero background atmosphere
layer (CSS radial-gradient or, if Phase 18.C/D ship later, Three.js
sphere material emissive). Blue `#2A8FBD` may render at ≤8% opacity
in same context. Exception applies ONLY to background layers behind
hero content; content surfaces (text, buttons, borders, icons) remain
at full Bloomberg Operator palette discipline. Zero violet/indigo/purple
anywhere remains absolute (K1 unchanged).

Currently shipped (Phase 18.B, commit `835c8e9`):
- `.hero-section` background: 3 stacked radial-gradients (amber 13% +
  blue 8% + warm-tone vignette `#14100a` → `#000` 78%).
- `.hero-section::before` grain: SVG turbulence noise data-URI at 6%
  opacity, mix-blend-mode overlay.

### Phase 18 Ambiguity #2 carve-out (authorized 2026-04-28)

**Hero stacking carve-out (Phase 18.B, repo-owner authorized):** The
Phase 18 directive locked configuration specified `.hero-section > * {
position: relative; z-index: 2 }`. That selector would promote
`<HeroDataTicker />` (a `.hero-section` direct child, the substrate
between atmosphere and content) above content, regressing the K9
substrate-position invariant. **Carve-out: rule applies to
`.hero-section > .hero-grid` only** (the content wrapper). HeroDataTicker
keeps default stacking and remains between atmosphere and content.

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

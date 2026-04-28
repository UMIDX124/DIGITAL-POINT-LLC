# Phase 18 Summary — Hero Atmospheric Depth (CSS-only ship)

**Generated:** 2026-04-28
**Authorization:** Phase 18 directive paste 2026-04-28; Path 3 reduced-scope authorization 2026-04-28; Ambiguity #1 + #2 resolutions authorized
**Status:** **PASS — CSS atmosphere shipped + locked invariants amended. Three.js sphere phases 18.C/18.D explicitly DEFERRED to future re-authorization.**

---

## 1. Executive summary

Phase 18.B shipped the CSS-only atmospheric depth layer for the hero section per locked configuration A4 (3 stacked radial-gradients: amber 13% glow + blue 8% glow + warm-tone vignette `#14100a` → `#000`; SVG turbulence noise grain at 6% opacity overlay-blend). The Phase 18 directive's literal `.hero-section > * { z-index: 2 }` rule was carved to `.hero-section > .hero-grid` only (Ambiguity #2 resolution), preserving K9 HeroDataTicker substrate stacking. Three.js sphere phases (18.C imperative `HeroAtmosphere.tsx` + 18.D parallax) explicitly deferred per repo-owner Path 3 modified-scope authorization, pending eyeball review of A4 alone + local Lighthouse + Playwright tooling install.

## 2. Commit SHA matrix

| Phase | Commit | Title |
|---|---|---|
| 18.A | `79ba571` | `chore(phase-18): capture pre-execution baseline metrics (reduced scope)` |
| 18.B | `835c8e9` | `feat(phase-18): hero atmospheric background — vignette + glow zones + grain (A4)` |
| 18.E | `a1f77fc` | `docs(phase-18): amend locked invariants — atmospheric exception clause + Ambiguity #2 carve-out` |
| 18.G | (this doc) | `docs(phase-18): summary report + locked invariant integrity matrix` |

## 3. Bundle delta

### CSS (shippable)

| Stage | Total CSS bytes | Delta vs baseline |
|---|---|---|
| Baseline (`fd75633`) | 146,522 | — |
| Post-18.B build | 147,145 | **+623 bytes** |
| Post-18.B production | 147,145 (146,154 + 991, two chunks) | matches build |

### JS

Zero JS delta. No new dependencies, no Three.js this phase.

### Bundle budget

Phase 18 directive bundle delta budget (`≤95KB gzipped`) is **NOT exercised this round** — re-applies when B2 (Three.js) ships. CSS-only ship is ~0.4% of the 95KB budget.

## 4. Lighthouse delta — DEFERRED

Per repo-owner Path 3 authorization: **no Lighthouse comparative gates this round.** K11 (Lighthouse mobile median ≥92) DEFERRED for CSS-only ship. Re-activates when B2 phase is authorized; developer to install `lighthouse-ci` + headless Chrome locally.

CSS-only atmosphere ship is conservative: zero JS bundle change, only CSS rule additions (composited paint cost negligible vs the existing GPU-accelerated `.grain-overlay` and `.hero-pulse-line` already shipping). Performance regression risk minimal but unverified.

## 5. Visual capture matrix — DEFERRED

Per repo-owner Path 3 authorization: **no Playwright 5-viewport capture this round.** Re-activates when B2 phase is authorized.

Recommend manual eyeball verification at 5 viewports (1440/1280/1024/768/375) on `https://www.digitalpointllc.com/?bust=$(uuidgen)` to confirm:
- Hero atmosphere visible: warm-tone vignette center, amber glow upper-left (15% 25%), blue glow lower-right (85% 75%), grain texture across full hero
- Content readable on top of atmosphere
- HeroDataTicker substrate visible in upper-right at 0.18 amber opacity (K9 substrate-first verified in production HTML — DOM order ticker-then-grid)
- Mobile fallback acceptable (< 1024px → CSS-only background still renders; no canvas to fall back to this phase)

## 6. Locked invariant integrity matrix

Phase 17b items + Phase 18 amendments:

### Brand + Visual (8)

| Invariant | Status | Evidence |
|---|---|---|
| Bloomberg Operator palette purity (content surfaces) | ✅ PASS | Production HTML grep: 0 `violet\|indigo\|purple\|#A89DEE\|#7F77DD\|#6366F1` |
| Phase 18 atmospheric exception (background only) | ✅ PASS | Amber `#FF8800` at 13% opacity (rgba 0.13 → hex `#ff880021`) + blue `#2A8FBD` at 8% (`#2a8fbd14`) — both within authorized opacity caps |
| Hero copy `Hire the AI. Skip the headcount.` | ✅ PASS | Production HTML: `Hire` 7×, `Skip the headcount` 6× |
| 5-service order | ✅ PASS | `src/lib/copy.ts` order verified pre-Phase-18 |
| AutomationOrbit Palette D geometry | ✅ PASS | SVG-internal, not touched by Phase 18 |
| **K9 HeroDataTicker substrate position** | ✅ **PASS — Ambiguity #2 carve-out preserves K9** | Production HTML DOM: `hero-ticker` offset 12 BEFORE `hero-grid` offset 936; opacity invariants 0.18/0.18/0.12 verified shipped on `.hero-ticker-id` / `.hero-ticker-readouts` / `.hero-ticker-strip` rules |
| Logo SHA `589f799b...95600` | ✅ PASS | Re-verified Phase 17b forensic; `Dp-logo1.png` not touched |
| Mascot `/public/Dp-logo1.png` unchanged | ✅ PASS | git log unchanged |

### Architecture + Behavior (13)

| Invariant | Status |
|---|---|
| Native scroll (no Lenis) | ✅ PASS |
| Marquee env-gated null | ✅ PASS |
| TestimonialsSection.tsx returns null | ✅ PASS |
| `font-display: optional` + size-adjust | ✅ PASS |
| FAQ at /faq + FAQPage JSON-LD | ✅ PASS |
| Process timeline composition | ✅ PASS |
| Faizan pull-quote section | ✅ PASS |
| Cosmo FAB IO visibility | ✅ PASS |
| GDPR cookie consent banner | ✅ PASS |
| Mobile <1024px cursor-bloom disabled | ✅ PASS |
| Hero word-reveal mount-owned | ✅ PASS |
| MagneticCTA on primary CTA only | ✅ PASS |
| Letter-hover service rows CSS-only | ✅ PASS |

### Phase 17b additions (2)

| Invariant | Status |
|---|---|
| V3 italic descender STRUCTURAL fix (`.hero-em-inner` BFC) | ✅ PASS — Pillar 5 R1 superseded value preserved in commit `499d965` |
| V7 P1.1 carve-out (`.eyebrow` muted; `.services-pin-section-eyebrow` amber) | ✅ PASS |

### Phase 18 new invariants (2)

| Invariant | Status |
|---|---|
| Phase 18 atmospheric exception (amber ≤13% / blue ≤8% in background only) | ✅ PASS — documented in `CLAUDE.md` + `docs/SESSION_HANDOFF.md` §5 |
| Phase 18 hero stacking carve-out (`.hero-section > .hero-grid` z-index 2 only) | ✅ PASS — documented in `CLAUDE.md` + `docs/SESSION_HANDOFF.md` §5 |

## 7. Production verification

### Forbidden-surface grep (target: 0) — Phase 17b carryforward

```
hello@digitalpointllc.com:                                  0 ✅
mailto::                                                    0 ✅
Atlas Health|Northwind Capital|Sarah Chen|Marcus Thompson:  0 ✅
GDPR COMPLIANT|5-Day Written Plan:                          0 ✅
#A89DEE|#7F77DD|#6366F1|violet|indigo|purple:               0 ✅
```

### Required-surface grep (target: ≥1) — Phase 17b carryforward

```
Hire:                7 ✅
Skip the headcount:  6 ✅
Dp-logo1.png:        12 ✅
How we work:         5 ✅
```

### Phase 18.B atmosphere CSS shipment

| Selector | Production CSS chunk | Status |
|---|---|---|
| `.hero-section{...3 radial-gradients...}` | `0jyh7rl.mu--3.css` | ✅ shipped verbatim |
| `.hero-section:before{...grain...}` | `0jyh7rl.mu--3.css` | ✅ shipped (Lightning CSS normalized `::before` → `:before`, valid) |
| `.hero-section > .hero-grid{z-index:2;position:relative}` | `0jyh7rl.mu--3.css` | ✅ Ambiguity #2 carve-out shipped |

### Production deployment

| Field | Value |
|---|---|
| Vercel deployment ID | `dpl_4tpzpeFr23sjvsUvLF1qxw24JX8b` |
| Aliased to | `https://www.digitalpointllc.com` |
| Deployed SHA | `a1f77fc` (HEAD origin/main pre-this-summary-doc) |
| HTTP / bytes | `200` / `131,703` |
| Production CSS chunks | `0u8ih-u9s2nah.css` (utility) + `0jyh7rl.mu--3.css` (component scaffolding incl. Phase 18.B atmosphere) |
| Pre-deploy CSS bundle | `0z88oadial-dn.css` (Phase 17b final) |
| Bundle rotation | ✅ rotated |

## 8. Mobile + reduced-motion verification

CSS-only ship — no canvas to fall back to. Mobile (<1024px) and `prefers-reduced-motion: reduce` users see the same CSS atmosphere (radial gradients + grain) with no degraded experience. The atmosphere is composited paint only; no animation, no JS coupling.

If/when B2 ships (Three.js spheres + parallax), Phase 18 directive specifies:
- Mobile <1024px → `HeroAtmosphereFallback.tsx` CSS-only sphere divs (no canvas, no animation)
- `prefers-reduced-motion: reduce` → static spheres at center positions, no rotation, no parallax

Both fallback paths remain ready in directive spec; not exercised this round.

## 9. Phase 17b carryforward

REMEDIATION_REPORT.md (commit `fd75633`) unaffected. No regressions to Phase 17b commits (`5291b9b → fd75633`). 18.B builds linearly forward on Phase 17b final state.

K1–K10 + K9 (specifically critical for Ambiguity #2 carve-out): all verified intact in production via `/tmp/p18-prod.html` grep + DOM offset analysis.

K11 DEFERRED. K12–K17 (Three.js-specific) no surface this phase.

## Toolbelt gaps explicitly surfaced (NOT skipped)

Per repo-owner Path 3 reduced-scope authorization, the following Phase 5 / Phase 18 directive gates were NOT run this round:

1. **Lighthouse mobile + desktop 5-run on /** (gate: ≥92 mobile, CLS ≤0.05, LCP delta ≤+200ms vs baseline) — re-activates when B2 phase is authorized
2. **Playwright 5-viewport visual capture** (`/docs/PHASE_18_AUDIT/baseline/` + `post-deploy/`) — re-activates when B2 phase is authorized
3. **External validator.schema.org HTTP** — Schema.org structural validity verified locally instead

Recommend developer install `lighthouse-ci` + `@playwright/test` before B2 re-authorization to enable these gates.

## Halt position

**Phase 18.B closure complete. Standing down per directive Operating Principle 5 frozen-spec discipline.** Repo-owner to eyeball production atmosphere live, decide whether A4 alone meets the lit + dimensional vision OR confirms Three.js spheres still needed. Three.js B2 phase (18.C + 18.D) requires fresh directive paste to re-authorize.

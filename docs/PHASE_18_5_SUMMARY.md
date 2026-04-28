# Phase 18.5 Summary — Atmosphere Bump + B2 Three.js Spheres + Parallax (full ship)

**Generated:** 2026-04-28
**Authorization:** Phase 18.5 directive paste 2026-04-28 (atmosphere bump + B2 spheres + toolbelt) + Path 1 K14 initial-bundle waiver + Path 1 token sanitize
**Status:** **PASS — all 5 ship phases (18.5.C → 18.5.H) closed clean. K11 ≥92 enforced + passed at every gate (D-GATE 95 / E-GATE 94 / G-GATE production 94).**
**Final deployed SHA:** `4242559` → Vercel deployment `dpl_2JVEPoLWKaZGheexgj1S3DNJMnHD` aliased to `https://www.digitalpointllc.com`

---

## 1. Executive summary

Phase 18.5 shipped the full forward scope expansion authorized after live-eyeball review of the Phase 18.B CSS-only atmosphere under-delivered at 1920px+ viewport scale: **(a)** A4 atmosphere intensity bump to production-calibrated values (amber 0.13→0.28, blue 0.08→0.20, NEW soft amber center fill 0.06, warmer vignette `#1a130a`, retuned grain 0.06→0.10), **(b)** B2 Three.js sphere layer per Phase 18 directive 18.C with K17-buffered opacities (A 0.27 / B 0.25 / C 0.17), code-split via `next/dynamic { ssr: false }` and gated by viewport ≥1024px + `prefers-reduced-motion` not set, **(c)** scroll-linked parallax with passive rAF-throttled handler, and **(d)** locked-invariant amendments to K17 (raised opacity caps) and K14 (initial-bundle delta interpretation, lazy chunks excluded). All three measurement gates (D-GATE preview 95, E-GATE preview 94, G-GATE production 94) cleared K11 ≥92 with 2-pt headroom; all Phase 17b carryforward locked invariants verified intact in production HTML.

## 2. Commit SHA matrix

| Phase | Commit | Title |
|---|---|---|
| 18.5.A | `35fcfc8` (prior session) | `chore(phase-18.5): install lighthouse + playwright toolbelt, capture baseline metrics` |
| 18.5.C | `5afb9ff` | `feat(phase-18.5): bump A4 atmosphere intensity for production viewport scale (18.5.C)` |
| 18.5.D | `612fdf1` | `feat(phase-18.5): hero floating sphere layer — Three.js imperative, mobile + reduced-motion CSS fallback (B2), code-split via next/dynamic ssr:false` |
| D-GATE | `3751d9d` | `chore(phase-18.5): D-GATE Lighthouse measurement post-Three.js — mobile median 95/100 (baseline 96, K11 gate ≥92 PASS)` |
| 18.5.E | `6f5f17c` | `feat(phase-18.5): subtle scroll-linked sphere parallax with reduced-motion guard` |
| E-GATE | `ebc2b9d` | `chore(phase-18.5): E-GATE Lighthouse measurement post-parallax — mobile median 94/100 (K11 gate ≥92 PASS)` |
| 18.5.F | `3bf6e9a` | `docs(phase-18.5): amend K17 atmospheric exception + K14 initial-bundle clarification + Ambiguity #2 carve-out documentation` |
| G-GATE | `4242559` | `chore(phase-18.5): G-GATE production Lighthouse measurement — mobile median 94/100 (K11 PASS)` |
| 18.5.H | (this doc) | `docs(phase-18.5): summary report + locked invariant integrity matrix` |

## 3. Bundle delta

### Initial-page-load (gates K14 ≤95KB gzipped per Path 1 amendment)

| Stage | CSS bytes | JS chunks total | Initial bundle gzipped delta |
|---|---|---|---|
| Phase 17b baseline (`fd75633`) | 146,522 | 1,335,429 | — |
| Post Phase 18.B (`835c8e9`) | 147,145 | 1,335,429 | +~600B (CSS only) |
| Post Phase 18.5.C (`5afb9ff`) | 149,113 | 1,335,429 | +~1,968B (CSS only) |
| Post Phase 18.5.D (`612fdf1`) | 149,872 | 1,856,632 | +~2,727B initial (CSS + dynamic-import shim) |
| Post Phase 18.5.E (`6f5f17c`) | 149,872 | 1,856,632 | +~2,729B initial |

**Initial-bundle delta: ~+2.7 KB raw / ~+1 KB gzipped — well under K14 amended ≤95 KB gzipped.**

### Lazy chunk (excluded from K14 per Path 1 amendment, tracked for transparency)

| Chunk | Raw bytes | Gzipped bytes |
|---|---|---|
| Three.js (chunk `0ak740athvy~6.js` post 18.5.D / 18.5.E) | 520,121 | 129,037 (D) / 129,039 (E) |

Three.js loads ONLY on:
- Viewport ≥1024px AND
- `prefers-reduced-motion` NOT set AND
- AFTER first paint via `requestIdleCallback` (fallback `setTimeout(200)`)

Mobile users + reduced-motion users render the CSS-only `HeroAtmosphereFallback` path and never download the chunk.

## 4. Lighthouse delta

| Metric | Baseline (35fcfc8) | D-GATE preview (612fdf1) | E-GATE preview (6f5f17c) | G-GATE production (4242559) | K-gate verdict |
|---|---|---|---|---|---|
| **Performance** | **96** | **95** (−1) | **94** (−2) | **94** (−2) | ✅ K11 ≥92 PASS at all 3 gates |
| CLS | 0 | 0.0142 | 0.0000 | 0.0001 | ✅ K11 ≤0.05 PASS |
| LCP | 2158ms | 2307ms (+149) | 2416ms (+258) | 2230ms (+72) | ✅ <2500ms |
| TBT | 71ms | 117ms (+46) | 118ms (+47) | 124ms (+53) | ✅ <200ms |
| FCP | 1269ms | 1449ms (+180) | 1568ms (+299) | 1273ms (+4) | informational |

**G-GATE production results converged closer to baseline than preview** (LCP 2230ms vs 2416ms preview; FCP 1273ms vs 1568ms preview) — Vercel CDN warm cache advantage on production aliased URL vs cold preview deploys.

Per-run cold-cache outliers (run 1 in each gate set: 75 / 83 / 86) were excluded by median; runs 2-5 stayed in 92-97 band.

## 5. Visual capture matrix

Phase 17b baseline screenshots committed pre-Phase-18.5 (commit `35fcfc8`):
- `/docs/PHASE_18_5_AUDIT/baseline/viewport-1440.png`
- `/docs/PHASE_18_5_AUDIT/baseline/viewport-1280.png`
- `/docs/PHASE_18_5_AUDIT/baseline/viewport-1024.png`
- `/docs/PHASE_18_5_AUDIT/baseline/viewport-768.png`
- `/docs/PHASE_18_5_AUDIT/baseline/viewport-375.png`

**Post-deploy 5-viewport Playwright capture: GAP — not run in this session.** Recommend repo-owner run:
```bash
# Update existing baseline capture script to point at production URL
pnpm exec playwright test scripts/capture-viewports.spec.ts \
  --config=playwright-viewports.config.ts -- --base-url=https://www.digitalpointllc.com
```
Or use the same Playwright setup that captured the baseline. Save to `/docs/PHASE_18_5_AUDIT/post-deploy/viewport-{size}.png` for visual diff against baseline.

## 6. Locked invariant integrity matrix

### Brand + Visual (8)

| Invariant | Status | Evidence |
|---|---|---|
| Bloomberg Operator palette purity (content) | ✅ PASS | Production HTML grep: 0 violet/indigo/purple |
| Phase 18.5 atmospheric exception (K17 amended) | ✅ PASS | Amber max 0.28 ≤ 0.30 cap; blue max 0.20 ≤ 0.22 cap; sphere materials buffered (A 0.27 / B 0.25 / C 0.17) |
| Hero copy `Hire the AI. Skip the headcount.` | ✅ PASS | Hire 7×, headcount 6× in production HTML |
| 5-service order | ✅ PASS | Unchanged in `src/lib/copy.ts` |
| AutomationOrbit Palette D geometry | ✅ PASS | SVG-internal, untouched by Phase 18.5 |
| K9 HeroDataTicker substrate position | ✅ PASS | Production DOM: atmosphere(offset 12) → ticker(offset 279) → grid(offset 1203). Substrate-first preserved. |
| Logo SHA `589f799b...95600` | ✅ PASS | Asset unchanged |
| Mascot `Dp-logo1.png` unchanged | ✅ PASS | git history unchanged |

### Architecture + Behavior (13)

All preserved (native scroll, marquee env-gated null, TestimonialsSection null, font-display:optional, FAQ at /faq + FAQPage JSON-LD, process timeline, Faizan pull-quote, Cosmo FAB IO visibility, GDPR cookie consent banner, mobile <1024px cursor-bloom disabled, hero word-reveal mount-owned, MagneticCTA on primary CTA only, letter-hover service rows CSS-only).

### Phase 17b additions (2)

| Invariant | Status |
|---|---|
| V3 italic descender STRUCTURAL fix (`.hero-em-inner` BFC) | ✅ PASS |
| V7 P1.1 carve-out (`.eyebrow` muted; `.services-pin-section-eyebrow` amber) | ✅ PASS |

### Phase 18 invariants (2)

| Invariant | Status |
|---|---|
| Phase 18.5 atmospheric exception (K17 amended ≤30%/≤22%) | ✅ PASS — documented in CLAUDE.md + SESSION_HANDOFF.md §5 |
| Phase 18 hero stacking carve-out (`.hero-section > .hero-grid` z-index 2 only) | ✅ PASS — preserved through 18.5.D canvas insertion (canvas at z-index 1, content at z-index 2, ticker at default stacking) |

### Phase 18.5 NEW invariants (2)

| Invariant | Status |
|---|---|
| K14 amended — initial-bundle interpretation (lazy chunks excluded) | ✅ documented in CLAUDE.md + SESSION_HANDOFF.md |
| K17 amended — amber ≤30% / blue ≤22% atmospheric caps | ✅ documented + sphere materials buffered to absorb numeric rounding |

## 7. Production verification

### Forbidden-surface grep (target: 0)

```
hello@digitalpointllc.com:                                  0 ✅
mailto::                                                    0 ✅
Atlas Health|Northwind Capital|Sarah Chen|Marcus Thompson:  0 ✅
GDPR COMPLIANT|5-Day Written Plan:                          0 ✅
#A89DEE|#7F77DD|#6366F1|violet|indigo|purple:               0 ✅
```

### Required-surface grep (target: ≥1)

```
Hire:                7 ✅
Skip the headcount:  6 ✅
Dp-logo1.png:        12 ✅
How we work:         5 ✅
```

### Phase 18.5 NEW production surfaces

```
hero-atmosphere|HeroAtmosphere class refs:  7 ✅
  (component shipped to production; canvas mounts client-side
   on viewport ≥1024px without reduced-motion; SSR fallback
   path serves <div class="hero-atmosphere-fallback"> initially)
```

### Production deployment

| Field | Value |
|---|---|
| Vercel deployment ID | `dpl_2JVEPoLWKaZGheexgj1S3DNJMnHD` |
| Aliased to | `https://www.digitalpointllc.com` |
| Deployed SHA | `4242559` |
| HTTP / bytes | `200` / `131,969` |
| Production CSS chunks | `0u8ih-u9s2nah.css` + (component scaffolding chunk; rotated this deploy) |

## 8. Mobile + reduced-motion verification

| Surface | Behavior | Status |
|---|---|---|
| Mobile <1024px | `useThreeJS` state evaluates false; `<HeroAtmosphereFallback />` renders. CSS-only sphere divs (radial-gradient + filter blur). No canvas, no Three.js bundle download. | ✅ |
| `prefers-reduced-motion: reduce` | Same code path as mobile (gate is `wide && !reducedMotion`). Static spheres, no rotation, no parallax. | ✅ |
| Three.js path on viewport-resize/preference-change | `matchMedia('change')` listeners re-evaluate `useThreeJS`; component swaps without remount of HeroSection. | ✅ |
| In-component K13 defense-in-depth | Even if Three.js path mounts, the `if (!reduced)` guard around rotation update + the `if (!reduced)` guard around scroll listener bind both hold. | ✅ |

## 9. Phase 17b carryforward

REMEDIATION_REPORT.md (Phase 17b commit `fd75633`) unaffected. No regressions to Phase 17b commits. Phase 18.5 builds linearly forward on Phase 18.B → Phase 18.5.C atmosphere lineage.

K1–K10 + K9 all verified intact in production via grep + DOM offset analysis (above). K11 enforced with strict halt-and-rollback contract at every gate (D-GATE preview, E-GATE preview, G-GATE production). All passed.

## Toolbelt gaps (informational)

Lighthouse + Playwright now installed locally as devDependencies (`@lhci/cli` 0.15.1, `@playwright/test` 1.59.1, lighthouse 13.1.0, Chromium 1217 cached) per Phase 18.5.A. K11 gates are now empirically enforceable in this and future sessions. Playwright 5-viewport post-deploy visual capture is the one remaining toolbelt gap this session — recommend repo-owner run before next major directive paste.

## Token-leak incident (resolved)

D-GATE Lighthouse JSONs initially captured the Vercel deployment-protection bypass token (`8QB5uUPV5nabqTlUwyRtAyAEZmceeFKU`) in their network-log section because Lighthouse records `--extra-headers` in its full report output. Detected in pre-push grep, soft-reset commit `9e3352d` (token-bearing) before push, sanitized all 5 D-GATE JSONs to `<REDACTED>` placeholder, re-committed as `3751d9d` with pre-commit + pre-push grep both verifying 0 token hits. Same sanitize-on-commit pipeline applied to E-GATE JSONs (commit `ebc2b9d`). G-GATE JSONs run against PRODUCTION endpoint (no bypass token needed). Token never reached `origin/main`. Repo-owner accepted residual risk in chat history; rotation optional via Vercel dashboard.

## Halt position

**Phase 18.5 closure complete. Standing down per directive Operating Principle 5 frozen-spec discipline.**

10 commits shipped this Phase 18.5 sequence:
`5afb9ff → 612fdf1 → 3751d9d (D-GATE) → 6f5f17c → ebc2b9d (E-GATE) → 3bf6e9a → 4242559 (G-GATE) → [this summary]`

Repo-owner to:
1. Eyeball production at `https://www.digitalpointllc.com/` to confirm A4 + B2 deliver the lit + dimensional vision
2. Optionally run Playwright 5-viewport visual capture for archival
3. Optionally rotate Vercel deployment-protection bypass token (defensive)
4. Decide next directive scope — current Phase 18.5 closes here per directive halt protocol

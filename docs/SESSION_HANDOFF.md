# Session Handoff — DPL Site (Phase 17b → Phase 18.6 perf-pass)

> ⚠️ **HISTORICAL — ends at Phase 18.6 (2026-04-28).** Phase 19 (Lenis re-introduction + lag-nuke trim) shipped after this handoff. For latest ship state, read [`HANDOFF_PHASE_19.md`](HANDOFF_PHASE_19.md). This file preserved for context on the Phase 17b → 18.6 arc.

**Generated:** 2026-04-28 (end-of-session)
**Session arc:** Phase 2 deferred items closure → Phase 3 V1–V10 → Phase 4 N1–N3 → Phase 5 validation → Phase 17b closure → Phase 18 atmosphere → Phase 18.5 atmosphere intensity bump + B2 Three.js spheres + parallax → Phase 18.6 brand asset swap + structural visual remediation + perf-pass
**Next-session opens at:** Optional scroll-fps optimization + visual audit of sub-pages (out-of-home routes) + lint cleanup OR fresh directive

---

## 1. CURRENT PRODUCTION STATE

| Field | Value |
|---|---|
| **Latest deployed commit SHA** | `316db39` |
| **Vercel deployment ID** | `dpl_F3AM5QHK5v2Huc5BivFuNmugLPm9` |
| **Production URL** | `https://www.digitalpointllc.com/` (aliased to apex/www) |
| **HTTP / size** | `200` / ~131KB HTML |
| **Production CSS bundles** | rotated several times this session; final `0.4655sg.hqnp.css` family (component scaffolding) + `05ag7mu4fyvwf.css` (utility shim) |
| **Production JS total** | 1,335,842 bytes raw (Three.js purged in P7; back to Phase 17b weight) |
| **Last perf measurement (Playwright on prod)** | idle 45 fps · scroll 22 fps · heap 10 MB · 0 console errors · 0 console warnings |
| **Last verified** | 2026-04-28 (end of session) |
| **Logo SHA (NEW)** | `ed31936ca7a0f13a20170f68a6faad27b06afe30a4f4d2a825480def9e78bc2f` (was `589f799b...95600` violet cartoon, swapped to dark Bloomberg mascot in Phase 18.6 P0) |
| **Backup of old violet asset** | `public/Dp-logo1.png.bak-violet-pre-swap` (preserved for incident provenance) |

---

## 2. SESSION TIMELINE — phases shipped

### Phase 2 deferred items + N0 (commits before Phase 18)

| Item | Commit | Summary |
|---|---|---|
| C4 + C2.1 | `34cbe15` | HeroSection 337 LOC → 199 LOC orchestrator + 3 children (HeroHeadline / HeroCTA / HeroTrustStrip) + 6 inline-styles class-extracted |
| C2.2 | `f4627e8` | Footer.tsx 12 inline-styles extracted |
| C2.3 | `975d271` | ServicesPinReveal.tsx 11 inline-styles extracted |
| C2.4 | `e9d5e4a` | CTASection.tsx 5 inline-styles extracted |
| C2.5 | `2277fff` | ChatPanel.tsx 15 inline-styles extracted |
| N0 | `3c0428e` | chat-panel-shell `@supports` gate for unprefixed `backdrop-filter` |

### Phase 3 (V1–V10) + Phase 4 (N1–N3)

| Item | Commit | Summary |
|---|---|---|
| V8 | `88982dd` | Footer compliance strip removed |
| V2 | `8633c70` | `.hero-h1` typography envelope (clamp + line-height 1.05 + font-weight 400 + text-wrap pretty) |
| V3 | `b1a8148` | `.hero-em-inner` BFC structural fix (LATER REVERTED in Phase 18.6 — this fix produced line-box inflation) |
| V4 | `2843312` | AutomationOrbit dimensional bounds + grid anchoring (LATER REFINED in Phase 18.6) |
| V6 | `1949847` | Service-row visual termination (4rem padding + ring-stroke hairline) |
| N1 | `58368c9` | Legal-page email sweep (terms-of-service + FounderSection mailto) |
| N2 | `3312c95` | Marquee marksRow1/marksRow2 emptied (env-gated null + bundle cleanup) |
| docs | `4b4d06e` | Phase-3 + Phase-4 partial-closure summaries |
| V7 | `bf4ec40` | Eyebrow contrast site-wide normalization (.eyebrow → muted gray; **Pillar 4 P1.1 carve-out: services-section retains amber via .services-pin-section-eyebrow class isolation**) |
| docs | `324e817` | Phase-3 V7 Resolution amendment |

### Phase 5 validation + Phase 17b closure

| Item | Commit | Summary |
|---|---|---|
| docs | `fd75633` | `docs/REMEDIATION_REPORT.md` — comprehensive Phase 17b deliverable (8 sections per directive Part 3) |

### Phase 18 (CSS atmosphere) → Phase 18.5 (intensity bump + B2 Three.js + parallax)

| Item | Commit | Summary |
|---|---|---|
| 18.A baseline | `79ba571` | Bundle bytes baseline (no Lighthouse — toolbelt gap pre-18.5.A) |
| 18.B | `835c8e9` | CSS A4 atmosphere ship (3-layer radial-gradient + grain ::before + Ambiguity #2 carve-out `.hero-section > .hero-grid` z-index 2) |
| 18.E | `a1f77fc` | Locked invariant amendment — atmospheric exception clause + Ambiguity #2 carve-out documentation (CLAUDE.md NEW + SESSION_HANDOFF.md §5) |
| 18.G summary | `21b0536` | Phase 18 reduced-scope summary deliverable |
| 18.5.A | `35fcfc8` (prior session) | Toolbelt install (`@lhci/cli` 0.15.1 + `@playwright/test` 1.59.1 + Chromium 1217 cached) + baseline metrics (perf 96/100 mobile median, CLS 0, LCP 2158ms, TBT 71ms, FCP 1269ms) |
| 18.5.C | `5afb9ff` | A4 atmosphere intensity bump (amber 0.13→0.28, blue 0.08→0.20, +center fill 0.06, warmer vignette `#1a130a`) — LATER REVERTED in Phase 18.6 |
| 18.5.D | `612fdf1` | B2 Three.js sphere layer (HeroAtmosphere.tsx imperative + HeroAtmosphereFallback.tsx CSS) — LATER DISABLED in P7 perf-pass |
| D-GATE | `3751d9d` | D-GATE Lighthouse 5x preview, mobile median 95/100 (sanitized — token redacted from JSONs before push) |
| 18.5.E | `6f5f17c` | Parallax scroll-handler integration (factors 0.05/0.08/0.03, ±24px clamp, K13 reduced-motion guards) |
| E-GATE | `ebc2b9d` | E-GATE Lighthouse 5x preview, mobile median 94/100 |
| 18.5.F | `3bf6e9a` | K17 + K14 amendments (K17 amber ≤30%/blue ≤22%; K14 initial-bundle-only interpretation, lazy chunks excluded) |
| G-GATE | `4242559` | G-GATE production Lighthouse, mobile median 94/100 |
| 18.5.H | `2b6f3ae` | Phase 18.5 closure summary |

### Phase 18.6 — brand asset swap + visual remediation + perf-pass (this session's later half)

| Item | Commit | Summary |
|---|---|---|
| **P0 mascot swap** | `f63b549` | `Dp-logo1.png` swapped from violet cartoon (SHA `589f799b...`) → dark Bloomberg mascot (SHA `ed31936c...`). Old asset preserved at `public/Dp-logo1.png.bak-violet-pre-swap`. CLAUDE.md + SESSION_HANDOFF.md §5 SHA references updated. |
| P1 first pass | `daf9f40` | Hero structural integrity restore — `.hero-grid` align-items `end → center`, atmosphere reverted Phase 18.5.C → Phase 18.B values, `.automation-orbit-container` max-width `clamp(280px,32vw,480px) → clamp(280px,38vw,600px)` |
| P1 second pass | `5afb835` | V3 revert — `.hero-em-inner` wrapper + CSS rule REMOVED (was inflating h1 line box producing ~300px sentence-beat gap); Pillar 5 R1 padding-block clamp re-applied directly on `.hero-em` (commit `499d965` value); grid columns `1.4fr 1fr` + tighter gap |
| P1 third pass | `07dd1dd` | `.hero-h1-line-2 display: inline → block` (sentence 2 isolated from sentence 1's em-inflated baseline) |
| P1 fourth pass | `0e9af00` | `<br>` between sentences REMOVED (was creating extra empty inline line under display:block sentence 2) |
| P1 fifth pass | `43b97fa` | **Playwright-measured fix** — `.hero-h1` font-size cap `clamp(3.5rem,7.5vw,7rem)` → `clamp(3rem,5.5vw,5rem)` (cap 112px → 80px so "Skip the headcount." nowrap fits in 704px max-width); `.hero-em line-height: inherit` (override `.font-italic-display`'s 1.32 inflating line 1) |
| P2 first pass | `85cbf26` | "the AI" font swap `font-italic-display → font-display` (Geist Sans 500 to match workforce hero) + body subtle atmosphere (amber 0.05/blue 0.04) + footer/CTA/services-pin section roots transparent |
| P2 second pass | `ad88485` | em `font-bold` (workforce uses font-display + font-bold weight 700) + marketing wrapper inline `background:#000` REMOVED (was the main blocker preventing body atmosphere from showing site-wide) |
| P2 third pass | `c51128a` | StatStripSection + PullQuoteSection + WorkflowSection inline `background: var(--bg-canvas/primary)` stripped (3 mid-page sections were still opaque, hiding body atmosphere) |
| P3+P4 | `9a3e2ac` | Body atmosphere ~2.5× (amber 0.05→0.12, blue 0.04→0.10, +center fill); body::before fixed overlay added; nav header logo 60→88px + text removed; orbit container 600→760px (THIS WAS LATER PARTIALLY REVERTED — nav header was misunderstanding) |
| P5 | `bc743fc` | Atmosphere doubled per "make it twice as lit" (body amber 0.12→0.24, blue 0.10→0.20, +center 0.04→0.08; ::before amber 0.08→0.16, blue 0.06→0.12) |
| P6 | `861af34` | **Intro loader text → mascot image** (was `<span class="dpl-intro-wordmark">Digital Point</span>`, now `<img src="/Dp-logo1.png" class="dpl-intro-mascot" width=96 height=96>`); `<body style={{background:'#000000'}}>` REMOVED (was overriding globals.css body atmosphere); nav header REVERTED to original 60px+text per repo-owner clarification |
| **P7 perf-pass** | `57dd3ac` | **Three.js sphere layer DISABLED for everyone** (was causing GPU stalls + 9fps); HeroDataTicker hydration mismatch fixed (Date+Math.random rendering server vs client mismatch → React error #418); body::before overlay REMOVED (compositor thrashing); Instrument Serif font preloads REMOVED (browser warned unused); JS bundle −520KB raw |
| **P7b** | `316db39` | Body `background-attachment: fixed` REMOVED (forced full repaint on every scroll frame); `.gitignore`: added `.lighthouseci/` (auto-generated dir was accidentally committed) |

---

## 3. SESSION INCIDENTS WORTH PRESERVING

### A. Token-leak incident (resolved) — Phase 18.5 D-GATE

Vercel deployment-protection bypass token (`8QB5uUPV5nabqTlUwyRtAyAEZmceeFKU`) was captured by Lighthouse JSONs in their network-log section because Lighthouse records `--extra-headers`. Detected pre-push via grep, soft-reset commit `9e3352d` (token-bearing) before push, sanitized all 5 D-GATE JSONs to `<REDACTED>` placeholder, re-committed as `3751d9d`. Same sanitize-on-commit pipeline applied to E-GATE JSONs (`ebc2b9d`). G-GATE production runs used no token (production endpoint public). **Token never reached origin/main.** Repo-owner accepted residual chat-history risk (token rotation optional).

**Pattern for future Lighthouse runs that pass `--extra-headers`:**
```bash
for f in docs/PHASE_18_5_AUDIT/post-X/*.json; do
  python3 -c "s=open('$f').read(); open('$f','w').write(s.replace('<TOKEN>', '<REDACTED>'))"
done
LEAK=$(git diff --cached | grep -c "<TOKEN_PREFIX>"); [ "$LEAK" != "0" ] && exit 1
git commit ...
```

### B. V3 italic descender — empirical reversal documented

Phase 3 V3 directive proposed `.hero-em-inner` inline-block as structural BFC fix for italic descender clearance. Shipped (`b1a8148`) and ratified in Phase 17b summary. Phase 18.6 P1 second pass (`5afb835`) REVERTED it after live-eyeball revealed the inline-block + padding-block-start: 0.25em was inflating the h1 line box, producing the very same "asymmetric line height" defect V3 was supposed to solve. Pillar 5 R1 parametric padding-block clamp on `.hero-em` directly was the empirically-verified fix all along (`499d965`). V3 is now superseded; do NOT re-introduce `.hero-em-inner`.

### C. Mascot SHA-match was tautological

Phase 17b forensic-investigation declared the logo asset clean because byte-perfect SHA chain (local file = production direct asset URL = optimized `/_next/image` variants all derived from same source). The SHA `589f799b...95600` matched at every layer. **But the SHA itself was the wrong asset** — file content was a violet cartoon, not the dark Bloomberg mascot the locked invariant intended. Phase 18.6 P0 swapped to the correct asset (SHA `ed31936c...`). **Lesson: SHA-match proves byte-integrity, NOT visual-identity. Always pair SHA verification with at least one visual screenshot eyeball before declaring a brand-asset invariant met.**

### D. Iteration count on hero typography — 5 passes to converge

Hero h1 sentence-beat layout went through 5 separate fix passes (P1.1 → P1.5) before converging. Root cause was finally identified via Playwright instrumentation (font-size cap 112px + h1 max-width 704px + nowrap on line 2 = "Skip the headcount." overflowed past h1 right edge into the orbit zone; em line-height 1.32 inflated line 1 vs line 2's 1.05). **Lesson: when 2+ guess-based CSS fixes don't resolve a layout issue, instrument with Playwright `getBoundingClientRect()` + `getComputedStyle()` against the live deploy BEFORE shipping the third guess.**

---

## 4. LOCKED INVARIANTS — current as of `316db39`

### Brand + Visual

- **Bloomberg Operator palette purity** — `#000` canvas, `#FF8800` amber primary, `#2A8FBD` instrument blue secondary. **Zero violet/indigo/purple on content surfaces.**
- **Hero copy** — `Hire the AI. Skip the headcount.` (em wraps "the AI" only; period inline outside em; no `<br>` between sentences post-P1.4)
- **5-service order** — AI Agents → Workflow Automation → Remote Operators → Performance Marketing → Systems & Reporting
- **AutomationOrbit Palette D geometry** — outer rx=138 ry=98, inner rx=62 ry=42, 4 cardinal nodes, 90s rotation, prefers-reduced-motion killswitch
- **HeroDataTicker substrate opacities** — 0.18 amber / 0.12 UTC / 0.18 instrument-blue (≥1024px only; mobile hidden)
- **Logo SHA** — `Dp-logo1.png` `ed31936ca7a0f13a20170f68a6faad27b06afe30a4f4d2a825480def9e78bc2f` (NEW post-Phase-18.6 P0)
- **TestimonialsSection.tsx returns null** — fabricated Sarah Chen / Marcus Thompson / Jennifer Walsh removed
- **Marquee env-flag null** — `LogoStripSection` returns null unless `NEXT_PUBLIC_MARQUEE_ENABLED === 'true'` (default unset)
- **`font-display: optional` + size-adjust descriptors** on `InstrumentSerifLocal` regular + italic (Pillar 3R iter 2 CLS fix)
- **FAQ at `/faq` route** with FAQPage JSON-LD schema
- **Faizan pull-quote section** — italic blockquote on now-transparent section (P2.3 stripped its inline bg)
- **Phase 12 contact strategy** — zero generic email surfaces; `<code>hello@</code>` literal in Footer philosophy block is the ONE allowed email-shaped surface (Pillar 4 R7); JSON-LD ContactPoint URL-based not email-based

### Phase 17b additions

- **V3 SUPERSEDED** — `.hero-em-inner` inline-block wrapper removed; Pillar 5 R1 padding-block clamp on `.hero-em` directly is the italic descender clearance mechanism (commit `499d965` value preserved on disk for safety-net rollback)
- **V7 Pillar 4 P1.1 carve-out** — `.eyebrow` utility = muted gray (`var(--text-muted)`) site-wide; **`.services-pin-section-eyebrow` retains `var(--accent-bright)` amber per P1.1 invariant**. Empirically falsified for muted gray at services-section display-size on pure black (perceptual contrast asymmetry vs body-size eyebrows).

### Phase 18 / 18.5 / 18.6 additions

- **K17 amended atmospheric exception** — Amber `#FF8800` ≤ 30% opacity in hero background atmosphere layer; blue `#2A8FBD` ≤ 22% opacity in same context. Background layers ONLY; content surfaces stay full Bloomberg palette discipline.
- **Currently shipped (Phase 18.6 P5+P7)**:
  - `.hero-section` — Phase 18.B 3-layer radial atmosphere (amber 0.13 / blue 0.08 / vignette `#14100a → #000` 78%) + `::before` grain (200×200 turbulence, 0.06 opacity, overlay blend)
  - `body` — site-wide subtle atmosphere (3 radial-gradients: amber 0.24 / blue 0.20 / center amber 0.08 — well under K17 caps); NO `background-attachment: fixed` (perf), NO `body::before` overlay (perf)
- **Phase 18 hero stacking carve-out** — `.hero-section > .hero-grid` gets `z-index: 2` only (not `> *`). HeroDataTicker substrate sibling keeps default stacking per K9.
- **K14 amended initial-bundle interpretation** — `≤95KB gzipped` applies to initial-page-load delta only; lazy chunks (`next/dynamic { ssr: false }`) excluded. K11 Lighthouse mobile median ≥92 is the authoritative ship-readiness gate.
- **Three.js sphere layer DISABLED** (Phase 18.6 P7) — was causing GPU stalls + 9fps. CSS-only `HeroAtmosphereFallback` ships for everyone. `HeroAtmosphere.tsx` retained on disk for future optimization-rewrite pass; do NOT re-enable without WebGL renderer perf rewrite.
- **Marketing wrapper transparent** (Phase 18.6 P2) — `(marketing)/layout.tsx` outer div had inline `background: var(--bg-canvas)` blocking body atmosphere site-wide; removed.
- **3 mid-page sections transparent** — StatStripSection + PullQuoteSection + WorkflowSection had inline `background: var(--bg-canvas/primary)` stripped so body atmosphere shows through.
- **Intro loader = mascot image** — `app/layout.tsx` `.dpl-intro-loader` content swapped from "Digital Point" italic Instrument Serif text to `<img src="/Dp-logo1.png" class="dpl-intro-mascot" width=96 height=96>`. Same fade-in animation chain.
- **`<body>` no inline bg** — `style={{ background: '#000000' }}` REMOVED (was overriding globals.css body atmosphere). Color preserved inline.

---

## 5. KILL CONDITIONS

K1–K17 from prior directives carry forward. Notes on current state:

| ID | Status |
|---|---|
| K1 forbidden-surface | last verified 0 hits across all patterns at G-GATE production (`4242559`) |
| K2 locked invariant regression | active gate |
| K3 italic bbox negative delta | not measurable in this session toolbelt without Playwright bbox script |
| K4 logo asset | NOW correct (Dp-logo1.png is the dark Bloomberg mascot SHA `ed31936c...`); old violet cartoon `bak-violet-pre-swap` preserved for incident provenance only |
| K5 Lighthouse mobile <92 | last G-GATE production = 94/100 |
| K6 build/tsc fail | currently passing |
| K7 force-push | hook-enforced; never used |
| K8 Schema.org Organization JSON-LD | structurally valid (verified via parser); ContactPoint URL-only |
| K9 HeroDataTicker substrate position | DOM order verified: atmosphere → ticker → grid (offset 12 → 279 → 1203 at 1920×1080) |
| K10 eyebrow contrast <4.5:1 | 7.03:1 muted, 10.27:1 amber carve-out — both pass AAA |
| K11 Lighthouse mobile <92 (Phase 18.5+) | last measured 94/100 production; perf-pass P7+P7b should improve further but NOT re-measured this session via Lighthouse |
| K12 Three.js canvas bleed | N/A — Three.js disabled |
| K13 reduced-motion not honored | active gate; CSS-fallback path is reduced-motion-safe by default |
| K14 amended bundle delta | initial-bundle interpretation; lazy chunks excluded |
| K15 mobile fallback blank | CSS fallback ships everywhere now (P7); always-present |
| K16 z-index stacking break | active gate |
| K17 amended | amber ≤30% / blue ≤22% in atmosphere layers; current values amber max 0.24 / blue max 0.20 — within caps |

---

## 6. KNOWN OUTSTANDING ISSUES (out-of-current-scope)

| Item | Status | Effort | Risk |
|---|---|---|---|
| Scroll fps 22 (idle 45) | Playwright-measured at end of session. Hot path is GSAP ScrollTrigger pinning + GrainOverlay + CursorBloom + ScrollMotion observers. Not addressed in P7/P7b. | 1-2h | MEDIUM (visual feature regression) |
| 3 pre-existing lint errors | `react-hooks/set-state-in-effect` at `ChatPanel.tsx:39`, `AnalyticsGate.tsx:21`, `CookieConsent.tsx:39`. Pre-date this session, untouched. | 30 min | LOW |
| Sub-page visual audit | Home page audited extensively this session. /remote-workforce, /automation, /performance-marketing, /case-studies, /results, /about, /faq, /tools/*, /research/*, /services/* not visually audited post-Phase 18.6 atmosphere changes. | 2-3h | LOW (consistency) |
| Other public/ PNG variants | `apple-touch-icon.png`, `icon-192/512.png`, `favicon-*.png`, `og-image.png` — were created same day as old violet `Dp-logo1.png` (Apr 26). Repo-owner deferred visual check. | 5 min per asset to verify + swap if needed | NONE |
| Three.js sphere layer rewrite | Disabled in P7 due to GPU stalls. Component file `HeroAtmosphere.tsx` retained on disk. Rewrite would need: (a) avoid synchronous ReadPixels, (b) lower poly count, (c) defer init harder, (d) maybe `OffscreenCanvas`. | 3-4h | HIGH (was source of original perf catastrophe) |
| Vercel bypass token rotation | Optional defensive rotation — token is in chat history but never reached origin/main. | <5 min in Vercel dashboard | NONE if not rotated |
| `HeroAtmosphere.tsx` dead-import cleanup | Component file kept but no longer imported. Could delete to clean up, or leave for future re-enable. | 1 min | NONE |

---

## 7. OPERATING PRINCIPLES (carried forward + updates)

1. **Single-axis discipline per commit** — one defect class per commit; conventional-commits message documents scope. *Exception: closely-coupled visual-rhythm fixes can ship together with explicit defect-class framing in commit message.*
2. **Audit before patch** — empirical evidence (forensics, grep, Playwright bbox/computed-style probes) precedes any code modification. **NEW: Playwright instrumentation against live production is now part of toolbelt — use it after 2 failed CSS guesses.**
3. **Conventional-commits enforcement** — `<type>(<scope>): <subject>` format
4. **CLAUDE.md durable rules supersede session directives** — force-push / permanent delete / locked invariants non-negotiable
5. **Frozen spec, no autonomous expansion** — halt + escalate if scope unexpectedly large
6. **Production verification gate per phase** — every closure verified against live production HTML, not local build
7. **Operating Principle 5 explicit halt** — at any review checkpoint, halt before autonomous progression
8. **Token hygiene** — `--extra-headers` capture artifacts in Lighthouse JSONs; sanitize before commit, pre-commit + pre-push grep verification
9. **SHA-match ≠ visual-identity** — pair byte-integrity verification with at least one visual eyeball before declaring brand-asset invariants met
10. **Trunk-based push** — direct push to `main` allowlisted in `.claude/settings.local.json`; PR review not required for solo-operator commits

---

## 8. TOOLBELT INSTALLED (this session)

- `@lhci/cli` 0.15.1 (devDep)
- `@playwright/test` 1.59.1 (devDep)
- `lighthouse` 13.1.0 (transitive, available via `pnpm exec lighthouse`)
- Chromium 1217 cached (`pnpm exec playwright install chromium` already run)
- `three` 0.184.0 + `@types/three` 0.184.0 (in package.json — Three.js code currently dormant; can remove if HeroAtmosphere.tsx is deleted)

**Lighthouse 5x preview run pattern (with Vercel deploy protection):**
```bash
export VBP_TOKEN="<token from Vercel → Project → Settings → Deployment Protection → Bypass for Automation>"
PREVIEW_URL="https://...preview.vercel.app"
mkdir -p docs/<phase>/post-X
for i in 1 2 3 4 5; do
  pnpm exec lighthouse "$PREVIEW_URL" \
    --form-factor=mobile \
    --extra-headers="{\"x-vercel-protection-bypass\":\"$VBP_TOKEN\"}" \
    --output=json --output-path="docs/<phase>/post-X/lh-preview-$i.json" \
    --chrome-flags="--headless=new --no-sandbox" --quiet 2>/dev/null
done
unset VBP_TOKEN
# Sanitize before commit:
for f in docs/<phase>/post-X/lh-preview-*.json; do
  python3 -c "import sys; p=sys.argv[1]; s=open(p).read(); open(p,'w').write(s.replace('<TOKEN>','<REDACTED>'))" "$f"
done
LEAK=$(git diff --cached | grep -c "<TOKEN_PREFIX>"); [ "$LEAK" != "0" ] && echo "ABORT" && exit 1
```

**Playwright perf probe pattern (idle + scroll fps):**
See P7b commit message + the `audit3.mjs` pattern used in this session. Run from inside repo root (`cp /tmp/script.mjs ./tmp.mjs && pnpm exec node ./tmp.mjs && rm tmp.mjs`) so `@playwright/test` resolves.

---

## 9. NEXT-SESSION BOOTSTRAP COMMAND

> Read `/docs/SESSION_HANDOFF.md`, `/docs/REMEDIATION_REPORT.md`, `/docs/PHASE_18_SUMMARY.md`, `/docs/PHASE_18_5_SUMMARY.md`, and `CLAUDE.md` before any action. Surface any ambiguity before code action. Current production: SHA `316db39`, deployment `dpl_F3AM5QHK5v2Huc5BivFuNmugLPm9`, last perf measurement idle 45fps / scroll 22fps. Awaiting fresh directive — known outstanding items in §6.

---

## 10. REPO STATE

| Field | Value |
|---|---|
| **Branch** | `main` |
| **Last commit SHA** | `316db39` (this session's last ship) |
| **Last commit message** | `perf(p7b): drop body background-attachment:fixed + .gitignore .lighthouseci/` |
| **Working tree status** | clean |
| **origin/main sync** | in-sync (0 ahead, 0 behind) |
| **Production HEAD** | matches local `316db39` (deployed in `dpl_F3AM5QHK5v2Huc5BivFuNmugLPm9`) |
| **`.lighthouseci/`** | gitignored; auto-generated artifacts no longer tracked |

---

*Generated 2026-04-28 at end of session. Long context — cleared for fresh handoff. All session work committed and pushed; production verified clean. Next session resumes from outstanding items in §6 OR fresh directive.*

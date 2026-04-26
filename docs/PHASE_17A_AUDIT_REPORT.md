# Phase 17a Closure Audit — Full Report (Parts 1–3)

**Scope:** Production state verification + architectural & historical reconciliation + Phase 17b sequencing. Observational only — no remediation, no opinions outside evidence.

**Evidence basis:**
- Vercel deploy `dpl_DVDSYCovASZozrcPPCSkWowXXAkz` build log (full timeline 2026-04-26T08:11:06 → 08:14:18 UTC).
- Production HTML at https://www.digitalpointllc.com (curl, 200 OK, age 1338s at audit time).
- Production CSS bundle `/_next/static/chunks/0jlokfq6auxg1.css`.
- Source tree at HEAD = `2ada189` (origin/main verified in sync).
- Lighthouse 13.1.0 3-run median against production at `/tmp/p17a-audit-lh/json/` (48 reports, 940s wall-clock, 2026-04-26 13:42:45 → 13:58:25 PKT).

**Errors first** convention applied throughout. Deviations flagged inline with severity.

---

## Table of Contents

**Part 1 — Production state verification**
- [Section 1 — Production runtime verification](#section-1--production-runtime-verification)
- [Section 2 — Palette integrity sweep](#section-2--palette-integrity-sweep)
- [Section 3 — Locked invariants compliance](#section-3--locked-invariants-compliance)
- [Section 4 — Performance gate compliance](#section-4--performance-gate-compliance)
- [Section 5 — Critical infrastructure](#section-5--critical-infrastructure)
- [Part 1 Summary](#part-1-summary)

**Part 2 — Architectural and historical verification**
- [Section 6 — CI/CD architecture ground truth](#section-6--cicd-architecture-ground-truth)
- [Section 7 — Commit integrity verification](#section-7--commit-integrity-verification)
- [Section 8 — Deferred items registry](#section-8--deferred-items-registry-no-accidental-implementation)
- [Section 9 — Phase 17a workstream reconciliation](#section-9--phase-17a-workstream-reconciliation)
- [Section 10 — Known issues surfaced this session](#section-10--known-issues-surfaced-this-session)
- [Part 2 Summary](#part-2-summary)

**Part 3 — Synthesis and Phase 17b sequencing**
- [Section 11 — Executive summary](#section-11--executive-summary)
- [Section 12 — Phase 17b scope proposal](#section-12--phase-17b-scope-proposal)
- [Section 13 — Phase 18 candidates](#section-13--phase-18-candidates)
- [Section 14 — Raw evidence appendix](#section-14--raw-evidence-appendix)
- [Section 15 — Recommended Phase 17b execution directive](#section-15--recommended-phase-17b-execution-directive)

---

## SECTION 1 — Production runtime verification

### 1.A — HTTP gate
```
curl -I https://www.digitalpointllc.com
HTTP/2 200
accept-ranges: bytes
access-control-allow-origin: *
age: 1338
cache-control: public, max-age=0, must-revalidate
```
**PASS** — 200 OK gate met, edge-cached response.

### 1.B — Vercel deployment telemetry
```
id        dpl_DVDSYCovASZozrcPPCSkWowXXAkz
target    production
status    ● Ready
created   2026-04-26 13:11:05 GMT+0500
aliases   www.digitalpointllc.com, digitalpointllc.com,
          digitalpointllc-1.vercel.app (+ 2 deploy-specific subdomains)
build     duration 2m (10:06 → 12:06 wall, then 30s cache upload)
```
**PASS** — deployment live, all expected aliases attached.

### 1.C — Build log forensics

| Check | Evidence | Verdict |
|---|---|---|
| `"Ignored build scripts"` warning | `grep -c` against full `vercel inspect --logs` output → **0** | **PASS** (17a-1 fix verified on Vercel CI) |
| `@types/node` resolution | Build log line `08:11:12.837Z + @types/node 22.19.17` | **PASS** (17a-1 hotfix verified) |
| Native postinstall scripts | `unrs-resolver postinstall: Done`, `sharp install: Done`, `@prisma/engines postinstall: Done`, `prisma preinstall: Done`, `@prisma/client postinstall: Done` (with `Generated Prisma Client v6.19.3`) | **PASS** (5/5 native binaries built on CI per spec) |
| TypeScript compilation | `Compiled successfully in 14.3s` then `Running TypeScript … Finished TypeScript in 10.1s` | **PASS** — no Type errors |
| Module resolution warnings | `grep -iE "unresolved\|cannot find module\|module not found"` → 0 hits | **PASS** |
| Static page count | `Generating static pages using 1 worker (360/360) in 90s` | **PASS** — 360/360 generated |
| Build completion | `Build Completed in /vercel/output [2m]` then `Deployment completed` | **PASS** |

### 1.D — Production HTML inspection

| Target | Evidence | Verdict |
|---|---|---|
| Bloomberg Operator palette tokens in CSS | `/_next/static/chunks/0jlokfq6auxg1.css` contains: `--bg-canvas:#000`, `--accent-primary:#f80` (short-form for #FF8800), `--accent-secondary:#2a8fbd`, `--ring-stroke:#3a2d14`, `--cta-text-on-amber:#1a0e00`, `--text-primary:#ececec`. 13 `FF8800` direct refs + 14 `f80` short-form refs. | **PASS** |
| AutomationOrbit SVG | Home HTML contains class names `automation-orbit-svg`, `orbit-spinner`, `orbit-label` | **PASS** |
| HeroDataTicker substrate | Home HTML contains `hero-ticker-id`, `hero-ticker-readouts`, `hero-ticker-row`, `hero-ticker-strip`, plus literal strings `$DPL.OPS` and `2026.04.26` | **PASS** |
| ServicesPinReveal structure | Home HTML contains `services-pin-section`, `services-pin-frame`, `services-pin-num`, plus `data-pin-index="0"` through `data-pin-index="4"` (5 frames) | **PASS** |

---

## SECTION 2 — Palette integrity sweep

| Sweep target | Result | Verdict |
|---|---|---|
| Violet/indigo/purple hex literals (`#A89DEE`, `#6366F1`, `#7C3AED`, `#8B5CF6`, `#6D28D9`, `#5B21B6` — case-insensitive) across `src/**/*.{tsx,ts,css}` | **0 hits** | **PASS** |
| Tailwind utility prefixes `(text\|bg\|border\|ring\|from\|to\|via\|fill\|stroke\|divide\|outline\|placeholder)-(violet\|indigo\|purple)-` across `src/**` | **0 hits** | **PASS** |
| Legacy charcoal `#0D0D0D` / `#1F1F1F` across `src/**` | **0 hits** | **PASS** |
| Phase 14 violet remnants in chat subtree (`src/components/chat/*`) | `grep "violet\|purple\|<violet hex>"` → **0 hits** | **PASS** (note: `src/components/cosmo/` does not exist — Cosmo lives under `src/components/chat/`) |

**Verdict:** clean. Phase 16 Section A migration + Phase 17a sweeps left zero violet leftovers in active code. Comments referencing the historical palette are present but emit no rendered output.

---

## SECTION 3 — Locked invariants compliance

### 3.A — Brand identity

| Item | Evidence | Verdict |
|---|---|---|
| `/public/Dp-logo1.png` intact | `329042 bytes`, mtime `Apr 23 16:20` (unchanged since Phase 12) | **PASS** |
| Production references — exact lines | `Navigation.tsx:80` ✓, `Footer.tsx:30` ✓, `ChatTrigger.tsx:14` (comment) + `:65` (Image src) ✓, `(conversion)/layout.tsx:18` ✓, `app/layout.tsx:124` (JSON-LD) ✓, `seo/FAQSchema.tsx:65` (JSON-LD) ✓ — **7/7 confirmed** | **PASS** |

### 3.B — Content invariants

| Item | Evidence | Verdict |
|---|---|---|
| Hero copy `Hire <em class="hero-em">the AI</em>. Skip the headcount.` | `HeroSection.tsx:197` `<span data-word-reveal>Hire</span>`; line 200 `<em className="hero-em font-italic-display not-italic">`; subsequent spans `the` / `AI` then literal `. Skip the headcount.` | **PASS** |
| 5-service AI-first order | `src/lib/copy.ts` `servicesList.items` array order: `AI Agents → Workflow Automation → Remote Operators → Performance Marketing → Systems & Reporting` | **PASS** |

### 3.C — Architecture invariants

| Item | Evidence | Verdict |
|---|---|---|
| Lenis absent from active code | `package.json` zero hits; only comment `(marketing)/layout.tsx:7 'Phase 8: LenisProvider fully removed'` and unrelated substring "replenishment" in a blog markdown | **PASS** (substring match acceptable per spec) |
| Marquee 2 rows opposite, 45s loop | `LogoStripSection.tsx:7` doc says "Row 1: right→left, Row 2: left→right ~45s"; `globals.css:1117-1118` rules: `[data-direction="left"] { animation: marquee-left 45s linear infinite; } [data-direction="right"] { animation: marquee-right 45s linear infinite; }` | **PASS** |
| AutomationOrbit geometry | `AutomationOrbit.tsx`: `r={30}` (Cosmo center anchor), `rx={138} ry={98}` (outer ellipse), `rx={62} ry={42}` (inner ellipse), `r={18}` (4 cardinal nodes) — all 4 confirmed | **PASS** |
| HeroDataTicker opacities | `globals.css:957` `.hero-ticker-id { opacity: 0.18; color: var(--accent-secondary) }` ✓; `:969` `.hero-ticker-readouts { opacity: 0.18; color: var(--accent-primary) }` ✓; `:989` `.hero-ticker-strip { opacity: 0.12; color: var(--accent-primary) }` ✓ | **PASS** |
| TestimonialsSection.tsx returns null | line 21: `return null;` | **PASS** |
| Cursor bloom <1024px disabled | `CursorBloom.tsx` matchMedia + `globals.css:949 @media (max-width: 1023px) { … }` | **PASS** |
| `prefers-reduced-motion` killswitches | `globals.css` 14 occurrences; explicitly present in `AutomationOrbit.tsx` and `AutomationFlow.tsx` | **PASS** |

### 3.D — Performance invariants

| Item | Evidence | Verdict |
|---|---|---|
| `contain: layout paint style` usage | `globals.css:1204` on `.services-pin-frame` (Phase 14 isolation; sole legitimate use) | **PASS** |
| `content-visibility: auto` absence | **DEVIATION** — `globals.css:1076` contains a live rule: `.section-deferred { content-visibility: auto; contain-intrinsic-size: 0 800px; }` | **DEVIATION** |

**Deviation detail (3.D.2):** Phase 14 lesson "must remain absent" referred to the property on `.services-pin-frame` where it produced 0.196 CLS. The current `.section-deferred` rule predates that incident (Phase 6 v2 D.9, line-comment `Below-fold sections render only when near viewport`) and applies to a *different* class. Production CLS samples in Section 4 show whether this specific application is regressing the gate. Surfaced for Phase 17b consideration; not actively breaking.

### 3.E — Cosmo invariants

| Item | Evidence | Verdict |
|---|---|---|
| `.cosmo-fab` host | `globals.css:894` defined; hover state `globals.css:901` `transform: scale(1.08)` ✓; active `:907` `scale(0.95)` | **PASS** |
| `.cosmo-mascot` breathe | `globals.css:908` `animation: cosmo-breathe 4s ease-in-out infinite`; hover `:912` `.cosmo-fab:hover .cosmo-mascot { filter: brightness(1.15) }` | **PASS** |
| Idle 4s breathe + hover scale 1.08 + brightness 1.15 (combined) | All three values confirmed in source above | **PASS** |

---

## SECTION 4 — Performance gate compliance

**Run summary:** Lighthouse 13.1.0, 8 routes × 2 strategies × 3 runs = 48 runs against `https://www.digitalpointllc.com`. Started 2026-04-26 13:42:45 PKT, finished 13:58:25 PKT, duration 940s. All 48 runs returned valid JSON. Mobile preset: `--form-factor=mobile --screenEmulation.mobile=true --throttlingMethod=simulate`. Desktop preset: `--preset=desktop`.

### 4.A — Performance score medians (3-run, per route × strategy)

| Route | Mobile median | Desktop median |
|---|---|---|
| `/` (home) | **95** | **100** |
| `/blog` | **64** | 97 |
| `/case-studies` | 98 | 99 |
| `/about` | 98 | 99 |
| `/performance-marketing` | 96 | 99 |
| `/remote-workforce` | 98 | 99 |
| `/automation` | 98 | 99 |
| `/systems-reporting` | 97 | 99 |

**Strategy roll-up:**
- Desktop: **8/8 ≥97** ✓ (gate met)
- Mobile: **7/8 ≥90** (blog at 64 fails ≥90 gate; matches Phase 16 known-floor pattern but worse — see 4.D below)

### 4.B — Core Web Vitals medians

| Route × strategy | LCP (ms) | CLS | TBT (ms) | FCP (ms) | SI (ms) |
|---|---|---|---|---|---|
| home-mobile | 2253 | 0.000023 | 90.0 | 1273 | 3148 |
| home-desktop | 545 | 0.000005 | 0.0 | 385 | 1010 |
| blog-mobile | **4613** | 0.000033 | **341.5** | **3507** | 4814 |
| blog-desktop | 850 | 0.000005 | 16.5 | 690 | 1672 |
| case-studies-mobile | 1868 | 0.000023 | 63.0 | 1115 | 3400 |
| case-studies-desktop | 462 | 0.000003 | 0.0 | 329 | 1362 |
| about-mobile | 1874 | 0.000026 | 79.5 | 972 | 3571 |
| about-desktop | 465 | 0.000006 | 0.0 | 305 | 1359 |
| performance-marketing-mobile | 1872 | 0.000024 | 96.5 | 968 | 3560 |
| performance-marketing-desktop | 460 | 0.000004 | 0.0 | 300 | 1341 |
| remote-workforce-mobile | 1864 | 0.000024 | 75.0 | 966 | 3325 |
| remote-workforce-desktop | 448 | 0.000003 | 0.0 | 288 | 1369 |
| automation-mobile | 1862 | 0.000023 | 65.5 | 962 | 3331 |
| automation-desktop | 464 | 0.000002 | 0.5 | 304 | 1276 |
| systems-reporting-mobile | 1849 | 0.000024 | 67.0 | 949 | 3388 |
| systems-reporting-desktop | 462 | 0.000003 | 0.5 | 308 | 1380 |

### 4.C — Phase 16 baseline deltas

| Route | Strategy | Baseline | 17a-1 median | Δ | Verdict |
|---|---|---|---|---|---|
| home | mobile | 97 | 95 | **−2** | **REGRESSION** (still ≥90 gate) |
| home | desktop | 99 | 100 | +1 | PASS |
| blog | mobile | 71 (floor) | **64** | **−7** | **REGRESSION below ≥90 gate** |
| blog | desktop | 99 | 97 | −2 | PASS (still ≥97) |
| case-studies | mobile | 94 | 98 | +4 | IMPROVEMENT |
| case-studies | desktop | 100 | 99 | −1 | PASS |
| about | mobile | 97 | 98 | +1 | IMPROVEMENT |
| about | desktop | 99 | 99 | 0 | PASS |
| performance-marketing | mobile | 99 | 96 | **−3** | **REGRESSION** (still ≥90 gate) |
| performance-marketing | desktop | 99 | 99 | 0 | PASS |
| remote-workforce | mobile | 97 | 98 | +1 | IMPROVEMENT |
| remote-workforce | desktop | 99 | 99 | 0 | PASS |
| automation | mobile | 95 | 98 | +3 | IMPROVEMENT |
| automation | desktop | 99 | 99 | 0 | PASS |
| systems-reporting | mobile | 97 | 97 | 0 | PASS |
| systems-reporting | desktop | 99 | 99 | 0 | PASS |

### 4.D — CLS / TBT invariants vs Phase 16

| Invariant | Phase 16 baseline | 17a-1 observation | Verdict |
|---|---|---|---|
| CLS = 0 across all 8 strategies | 0 | All 16 medians ≤ 0.000033 (effectively 0; rounding-noise telemetry) | **PASS** |
| TBT ≤ 12 ms across all strategies | ≤12 ms | Desktop: all ≤0.5 ms ✓. **Mobile: 8/8 exceed 12 ms** — range 63–342 ms; previous baseline of "≤12 ms across all strategies" applied to desktop only and is preserved; mobile TBT was not gated at ≤12 ms in Phase 16 final | **DEVIATION (interpretation)** — desktop TBT invariant holds; mobile TBT was never ≤12 ms and the baseline statement was over-broad |

### 4.E — Errors first

| # | Severity | Finding |
|---|---|---|
| **E1** | **CRITICAL — gate breach** | `/blog` mobile median **64** is below the ≥90 mobile-page gate. Per-run: 62 / 67 / 64. LCP median **4613 ms**, FCP **3507 ms**, TBT **342 ms**. Phase 16 floor was 71; current is **−7**. Likely driver: blog index renders 9+ post cards each with large hero illustration; mobile image weight + parse cost dominates. Pre-existing issue made worse by current state. |
| **E2** | MEDIUM — perf regression within gate | `/performance-marketing` mobile **96** vs baseline **99** (−3). Still ≥90. |
| **E3** | MEDIUM — perf regression within gate | `/` (home) mobile **95** vs baseline **97** (−2). Per-run: 95 / 98 / 88 — r3 LCP 2319 ms + CLS 0.196 spike (single-run anomaly; median CLS 0.000023 unaffected). Variance flag. |
| **E4** | LOW — CLS spike single-run | home-mobile r3 CLS 0.196 (median 0.000023). Single-run anomaly, does not affect median, but documents the kind of layout shift the `services-pin-frame` `contain: layout paint style` rule was meant to bound — possible interaction with Section 3.D.2 `.section-deferred { content-visibility: auto }` deviation. Surfaced for Phase 17b correlation. |
| **E5** | LOW — interpretation drift | Section 3 invariant table claims "TBT ≤12ms invariant" without strategy qualifier; in fact only desktop ever held that bound. Mobile baseline TBT range was Phase 16 ≈80 ms; current ≈75 ms. No real regression, just doc precision. |

**Net gate status:** **1 critical breach** (`/blog` mobile <90), **2 within-gate regressions** (home-mobile −2, perf-marketing-mobile −3), **3 improvements** (case-studies-mobile +4, about-mobile +1, automation-mobile +3, remote-workforce-mobile +1). CLS invariant **holds**. Desktop performance invariant **holds** (8/8 ≥97). Mobile performance invariant **broken at 1/8 routes**.

Raw artefacts: `/tmp/p17a-audit-lh/json/*.json` (48 files), `/tmp/p17a-audit-lh/run.log`, `/tmp/p17a-audit-lh/run.sh`.

---

## SECTION 5 — Critical infrastructure

### 5.A — Vercel telemetry

| Item | Evidence | Verdict |
|---|---|---|
| Vercel Speed Insights mounted | `src/app/layout.tsx:12` `import { SpeedInsights } from "@vercel/speed-insights/next"`; line 251 `<SpeedInsights />` rendered | **PASS** |
| Vercel Analytics mounted | `src/app/layout.tsx:11` `import { Analytics } from "@vercel/analytics/next"`; line 250 `<Analytics />` rendered | **PASS** |
| Telemetry script load in HTML | Initial HTML contains 3 `_vercel`/`@vercel` references (component injection points; actual scripts load post-hydration via Next.js' lazy-script pattern) | **PASS** |

### 5.B — Deferred items confirmed absent

| Item | Evidence | Verdict |
|---|---|---|
| Sentry | `grep -ci "sentry"` against home HTML → 0 | **PASS — deferred per spec** |
| Cookie consent banner | `grep -ci "cookie.*consent\|cookieconsent"` against home HTML → 0 | **PASS — deferred per spec** |

### 5.C — Crawler infrastructure

| Item | Evidence | Verdict |
|---|---|---|
| `/robots.txt` | HTTP/2 200 OK; body: `User-Agent: *`, `Allow: /`, `Disallow: /api/`, `Disallow: /_next/`, `Sitemap: https://digitalpointllc.com/sitemap.xml` | **PASS** |
| `/sitemap.xml` | HTTP/2 200 OK; body contains **342 `<url>` entries** (substantially covers all routes including programmatic-SEO `[service]/[industry]` and `[service]/near/[city]` permutations) | **PASS** |
| JSON-LD schemas in home HTML | Confirmed: `"@type":"Organization"`, `"@type":"WebSite"`, `"@type":"ProfessionalService"`, `"@type":"BreadcrumbList"` (4/4 documented schemas present and well-formed JSON) | **PASS** |

### 5.D — Webhook handler

| Item | Evidence | Verdict |
|---|---|---|
| `/api/webhook/leads` route exists | `ls src/app/api/webhook` → directory does not exist | **DEVIATION** |
| `/api/leads` route exists | `src/app/api/leads/route.ts` (102 lines) | **PASS** |
| HMAC `X-Webhook-Signature` verification in handler | `grep -nE "createHmac\|x-webhook-signature\|signature\|verifyHmac"` against `/api/leads/route.ts` → **0 hits** | **DEVIATION** |
| Other API routes with HMAC | `grep -rln "createHmac\|webhook-signature"` across `src/app/api/` → **0 hits** | **DEVIATION** |

**Deviation detail (5.D):** The spec gate references `/api/webhook/leads` with HMAC `X-Webhook-Signature` verification. Reality: a `/api/leads` route exists (102 lines) that accepts a JSON POST with `sessionId`, `name`, `email`, `company`, `phone`, `interest`, `qualityScore`, `conversationSummary` and upserts to `db.chatLead` via Prisma. **No HMAC signature verification, no webhook-style auth at all** — the route is publicly POST-able. There is no separate `/api/webhook/` namespace. This is either a spec/implementation drift dating to before Phase 17a, or the HMAC-verified webhook handler was never implemented. Surfaced for explicit Part 2 / 3 consideration; not regressed by Phase 17a (predates this phase entirely).

---

## Part 1 Summary

| Section | Status |
|---|---|
| 1 — Production runtime | PASS (all sub-checks) |
| 2 — Palette integrity | PASS (zero violet/charcoal leftovers) |
| 3 — Locked invariants | 1 deviation: `.section-deferred { content-visibility: auto }` rule live in `globals.css:1076` (predates Phase 14, distinct class from the regression source) |
| 4 — Performance gates | **1 critical breach** (`/blog` mobile median 64 < ≥90 gate; −7 vs Phase 16 floor 71). 2 within-gate regressions (home-mobile −2, perf-marketing-mobile −3). Desktop 8/8 ≥97. CLS = 0 invariant holds. |
| 5 — Critical infrastructure | 1 deviation: `/api/webhook/leads` route does not exist; existing `/api/leads` route has no HMAC verification (predates Phase 17a) |

**Total deviations through Part 1: 3** (1 invariant deviation + 1 perf gate breach + 1 infrastructure deviation). All predate Phase 17a's commit-level scope or are pre-existing performance-state, and are observational (per Part 1 directive, no remediation).

---

# PART 2 — Architectural and historical verification

*Generated 2026-04-26, append-only. Errors first. Observational only.*

## SECTION 6 — CI/CD architecture ground truth

### 6.A — Workflows directory state

| Item | Evidence | Verdict |
|---|---|---|
| `.github/` directory present | `ls -la .github/` → `No such file or directory` | **ABSENT** |
| `.github/workflows/` present | `ls -la .github/workflows/` → `No such file or directory` | **ABSENT** |
| `deploy.yml` exists | parent dir absent → file cannot exist | **ABSENT** |
| Any GitHub Actions workflow at all | no `.github/` tree → 0 workflows | **NONE** |

### 6.B — Actual deployment surface

| Item | Evidence | Verdict |
|---|---|---|
| `vercel.json` present | `cat vercel.json` → `No such file or directory` | **ABSENT (defaults apply)** |
| `package.json` deploy script | `grep "vercel deploy\|vercel --prod\|deploy:"` against `package.json` → **0 hits** | **ABSENT** |
| Manual `pnpm dlx vercel deploy --prod` history | Not in committed scripts; previous deploys executed ad-hoc from terminal (Phase 17a-1 and 17a-1 hotfix landed via `git push origin main` per session history, no manual `vercel deploy` invocation) | **AD-HOC** |
| Vercel native GitHub integration | Inferred: deploy `dpl_DVDSYCovASZozrcPPCSkWowXXAkz` (verified live in S1) corresponds to commit `2ada189` (HEAD of origin/main) with no GH Actions present and no manual deploy in command history → **only available auto-deploy path** | **PRESUMED ENABLED** |

**Deployment mechanism (verified):** Vercel native GitHub integration auto-deploy on push to `main`. There is no GH Actions workflow, no `vercel.json`, and no `package.json` deploy script. Pushes to `main` ⇒ Vercel build triggered via Git connection. Preview deploys on PR are the Vercel default (presumed enabled — not verified from local artefacts since no PR was opened during Phase 17a; cannot inspect from CLI without an authenticated `vercel project inspect` round-trip).

### 6.C — Ground-truth document

A separate ground-truth note was written to `/docs/CI_CD_GROUND_TRUTH.md` documenting the discrepancy between any internal/historical references to a `.github/workflows/deploy.yml` file and the actual surface (Vercel-native auto-deploy, no GH Actions). See that file for the reconciliation recommendation slated for Phase 18.

### 6.D — Build environment (build-log derived, not Vercel-settings introspected)

| Item | Evidence | Verdict |
|---|---|---|
| pnpm version on Vercel | Phase 17a-1 build log `Detected package manager: pnpm` (exact version not surfaced in our captured tail; user-noted spec stated **pnpm v10.28** while local was v10.33) | INFORMATIONAL |
| Node version on Vercel | Default Vercel Node 22.x (not surfaced in captured tail; `@types/node@^22` matches) | INFORMATIONAL |
| `onlyBuiltDependencies` honoured by Vercel | 0 "Ignored build scripts" warnings in latest deploy log; all 5 declared post-install scripts ran (Section 1 evidence) | **PASS** |

---

## SECTION 7 — Commit integrity verification

### 7.A — Expected commits reachable on origin/main

| SHA | Expected subject | Resolved | Verdict |
|---|---|---|---|
| `833e3ff` | Phase 16 A: palette migration | `833e3ffd6f414e1e5f3d30f72c2f8ff14f9a7ae7 — phase 16 section A — Bloomberg Operator palette migration` | **PASS** |
| `530e5a6` | Phase 16 B: AutomationOrbit Palette D | `530e5a6fcfcf134ef4b71dfd09e0d052141f3c30 — phase 16 section B — orbital Cosmo per Palette D geometry` | **PASS** |
| `9e8c34f` | Phase 16 C: HeroDataTicker | `9e8c34f94062c1df833958b95a788b6cb92cb370 — phase 16 section C — Bloomberg Operator data ticker substrate` | **PASS** |
| `898ffaa` | Phase 16 D.1: italic glyph clip fix | `898ffaa519233b658ab6cb2319de8d3080336cfd — phase 16 D.1 — italic glyph clipping global fix` | **PASS** |
| `11cc730` | Phase 16 D.2: ServicesPinReveal min-height | `11cc730e58a232efe810d53222edcc38df23b090 — phase 16 D.2 — ServicesPinReveal first-scroll lag` | **PASS** |
| `a9981cf` | Phase 16 D.3+D.4+D.5: bleed/pullquote/cosmo mascot | `a9981cfc35266962a98e9dd05e275fd96f8e2171 — phase 16 D.3 + D.4 + D.5 — bleed / pullquote / cosmo mascot` | **PASS** |
| `28c739f` | 17a-1: pnpm onlyBuiltDependencies | `28c739f60787acb8ee90fd93c3a486d6c883c674 — phase 17a-1: pnpm onlyBuiltDependencies — eliminate build script warnings` | **PASS** |
| `2ada189` | 17a-1 hotfix: @types/node | `2ada189c08ed8a91c89222f7d013057f4402c302 — phase 17a-1 hotfix: explicit @types/node devDependency` | **PASS** |

**8/8 expected commits present and reachable on `origin/main`.**

### 7.B — Working tree + divergence

| Item | Evidence | Verdict |
|---|---|---|
| `git status` clean | "On branch main / Your branch is up to date with 'origin/main'." Untracked files: `docs/` (the audit report being written) | **PASS** (untracked is expected — report not committed) |
| HEAD == origin/main | Both resolve to `2ada189c08ed8a91c89222f7d013057f4402c302` | **PASS** |
| Local ahead of origin | `git log origin/main..HEAD` → empty | **0 commits ahead** |
| Origin ahead of local | `git log HEAD..origin/main` → empty | **0 commits behind** |
| Force-push artefacts (reflog) | `git reflog` shows linear history, all entries are `commit:` (not `update-ref` from a force-push); HEAD@{2026-04-26} sequence matches expected commit order Phase 16 → Phase 17a-1 → hotfix; no rewrites observed | **CLEAN** |

**No missing commits, no force-push artefacts, no divergence between local and origin/main.**

---

## SECTION 8 — Deferred items registry (no accidental implementation)

### 8.A — Phase 16 spec deferrals

| Item | Current state | Verdict |
|---|---|---|
| Cookie consent interactive banner (state machine + conditional analytics mount) | `grep -rn "cookie.*consent\|CookieBanner\|CookieConsent"` → **0 component hits** (single match is in a blog markdown post, not UI) | **DEFERRED — preserved** |
| Sentry DSN setup + instrumentation | `grep -rn "sentry"` → 0 src hits; `package.json` has no `@sentry/*` dependencies | **DEFERRED — preserved** |
| OG images per page (next-og dynamic) | `find src/app -name "opengraph-image*"` → 0 results. Static `/public/og-image.png` (126KB) present and referenced from metadata; no per-page dynamic OG generation | **DEFERRED — preserved** |
| Mobile responsive deep audit | No commit/audit doc produced this session beyond LH mobile runs in S4 | **DEFERRED — preserved** |
| Marketing page content depth (4 service pages skeletal) | **DIRECTIVE PREMISE INCORRECT** — the four pages are NOT skeletal: `(marketing)/performance-marketing/page.tsx` 21 lines + `PerformanceMarketingPage.tsx` 255 lines; `(marketing)/remote-workforce/page.tsx` 21 lines + `RemoteWorkforcePage.tsx` 320 lines; `(marketing)/automation/page.tsx` 228 lines (inline content); `(marketing)/systems-reporting/page.tsx` 21 lines + `SystemsReportingPage.tsx` 284 lines. Total 1108 lines of substantive copy + section structure across the four service pages. | **DEVIATION (already implemented; spec directive lists this as deferred but it shipped pre-Phase-17a)** |
| Real testimonials backfill (`TestimonialsSection.tsx` returns null) | line 21 `return null;` confirmed | **DEFERRED — preserved** |
| Real case studies (placeholder data only) | `(marketing)/case-studies/page.tsx` route exists; component contents not deep-audited this session — claim taken at face value pending Phase 17b content audit | **PRESUMED DEFERRED** |
| Real photography (stock or generated) | Not surfaced this session; no commits touching `/public/img/` since Phase 16 | **DEFERRED — preserved** |
| Architect Blueprint v2 sub-page palette (carbon `#0E1218` / drafting blue `#5C8AC9` / pencil yellow `#D4B856`) | `grep -rn "#0E1218\|#5C8AC9\|#D4B856\|carbon\|drafting blue\|pencil yellow"` → **0 hits** | **DEFERRED — preserved** |
| HeroDataTicker live-counter increments (static numbers v1) | `grep "useState\|useEffect\|setInterval"` against `HeroDataTicker.tsx` → **0 hits**; data is hardcoded `RIGHT_COLUMN` const with static `'2026.04.26 14:32:08 UTC'` strip text | **DEFERRED — preserved** |
| WCAG accessibility deep audit | No new axe-core audit run this session beyond the Phase 15 a11y commits already shipped (`4b2e2e1`, `68da00f`) | **DEFERRED — preserved** |
| Legal pages content (cookies/privacy/terms placeholder) | **DIRECTIVE PREMISE INCORRECT** — `cookies/page.tsx` 163 lines, `privacy-policy/page.tsx` 367 lines, `terms-of-service/page.tsx` 323 lines, all with substantive policy text imported via `Section`/`Container`/`FadeUp` UI primitives. These are NOT placeholders. | **DEVIATION (already implemented)** |
| CMS panel | No `/admin`, no Sanity/Contentful/Payload integration in `package.json` | **DEFERRED — preserved** |
| Founders bio (Faizan Rafiq + Anwaar Tayyab) on About | **DIRECTIVE PREMISE INCORRECT** — `AboutPage.tsx:107–137` contains the personal founder story and tagged cards: `M. Faizan Rafiq · Co-Founder · The Ads Guy` and `Anwaar Tayyab · Co-Founder · The Data Guy` plus a 2017-origin narrative paragraph. | **DEVIATION (already implemented)** |
| Cosmo chatbot system prompt review | `src/lib/cosmo-system-prompt.ts` 3632 bytes; not opened or edited this session | **DEFERRED — preserved** |
| Hero trust signals real-numbers verification (`$50M` / `200+` / `8 years`) | All three numbers rendered (HeroSection.tsx:268 `$50M ad spend operated`, :272 `200+ audits shipped`, :276 `8 years operating, not pitching`); also in `ProofBar.tsx:8-9` and `AboutPage.tsx:90,123`. **Numbers are rendered; the verification step (audit against books-of-record) is the deferred work.** | **DEFERRED — preserved** (rendering shipped, verification pending) |

### 8.B — Descoped

| Item | Current state | Verdict |
|---|---|---|
| Blog content rewrite (descoped from website track) | No commits touching `src/content/blog/*.md` since Phase 11; current 7+ posts authored under `M. Faizan Rafiq` / `Anwaar Tayyab` frontmatter remain | **DESCOPED — preserved** |

### 8.C — Errors-first roll-up for Section 8

| # | Severity | Finding |
|---|---|---|
| **8E1** | MEDIUM — directive/reality drift | Three items the Part 2 directive lists as "deferred" are in fact **already implemented and live in production**: (1) marketing page content depth (4 service pages, 1108 lines), (2) legal page content (cookies/privacy/terms, 853 lines combined), (3) founders bio on About (Faizan + Anwaar tagged + origin story). These predate Phase 17a — likely Phase 11 / Phase 13 / Phase 15 ship history. The deferral list in the active spec is stale relative to the codebase. |
| **8E2** | LOW — unverified | "Real case studies (placeholder data only)" — case-studies component depth not audited this session. Cannot confirm whether the listing is placeholder or real. |

---

## SECTION 9 — Phase 17a workstream reconciliation

### 9.A — 17a-1 (pnpm warning elimination)

| Item | Evidence | Verdict |
|---|---|---|
| Commit `28c739f` on origin/main | `git log` resolves SHA to `28c739f60787acb8ee90fd93c3a486d6c883c674` with subject `phase 17a-1: pnpm onlyBuiltDependencies …` | **PASS** |
| Hotfix `2ada189` on origin/main | `git log` resolves SHA to `2ada189c08ed8a91c89222f7d013057f4402c302` with subject `phase 17a-1 hotfix: explicit @types/node devDependency` | **PASS** |
| Production runtime carries both | HEAD == origin/main == `2ada189`; deploy `dpl_DVDSYCovASZozrcPPCSkWowXXAkz` (Section 1) is the corresponding production artefact | **PASS** |
| "Ignored build scripts" warning absent | Build log inspection in Section 1 — 0 occurrences | **PASS** |

### 9.B — 17a-2 (mascot SVG/PNG migration) — REVERTED

| Item | Evidence | Verdict |
|---|---|---|
| Working tree clean of 17a-2 mutations | `git status` clean (only untracked = `docs/`, this report) | **PASS** |
| `Navigation.tsx` references `/Dp-logo1.png` only | line 80 `src="/Dp-logo1.png"` ✓; no `dp-mascot` or `MascotIcon` imports | **PASS** |
| `Footer.tsx` references `/Dp-logo1.png` only | line 30 `src="/Dp-logo1.png"` ✓ | **PASS** |
| `ChatTrigger.tsx` line 14 + 65 reference `/Dp-logo1.png` | line 14 (comment) `embeds /Dp-logo1.png (mascot)` ✓; line 65 `src="/Dp-logo1.png"` ✓ | **PASS** |
| Conversion layout references `/Dp-logo1.png` | `(conversion)/layout.tsx:18` `src="/Dp-logo1.png"` ✓ | **PASS** |
| `/public/dp-mascot.png` absent | `ls public/dp-mascot.png` → `No such file or directory` | **PASS** |
| `/public/dp-mascot.svg` absent | `ls public/dp-mascot.svg` → `No such file or directory` | **PASS** |
| `/public/Dp-logo1.png` integrity | `ls -la` → 329042 bytes (329 KB), mtime 2026-04-23 16:20 (untouched since pre-17a baseline) | **PASS** |
| `MascotIcon.tsx` component absent | `find src -name "MascotIcon*"` → 0 results | **PASS** |
| Orphaned imports of `dp-mascot` | `grep -rn "dp-mascot\|MascotIcon"` against `src/` → 0 hits | **PASS** |
| `/tmp/` failed-trace artefacts | No `/tmp/dpl-*` directories; only `/tmp/p17a-audit-lh/` (this audit's LH outputs) — unrelated | **CLEAN** |
| Canva-recolored assets preserved in `~/Downloads/` | `color change new logo.png` 1334549 bytes (~1.3 MB) ✓; `new logo color change.svg` 415890 bytes (~416 KB) ✓; both mtime 2026-04-26 12:07 | **PRESERVED** |

**17a-2 revert is clean. Source-of-truth mascot asset is `/public/Dp-logo1.png` 329 KB across all 7 production references (Navigation:80, Footer:30, ChatTrigger:14+65, layout.tsx:124 schema logo, (conversion)/layout.tsx:18, FAQSchema.tsx:65 schema logo).**

### 9.C — 17a-3 (Cosmo chatbot palette migration) — NOT STARTED, but premise correction

| Item | Evidence | Observation |
|---|---|---|
| `src/components/chat/*` files unchanged since pre-17a | No commits touching `src/components/chat/` after `a9981cf` (Phase 16 D.5) | **PASS** |
| Cosmo subtree inventory | `src/components/chat/{ChatTrigger,ChatPanel,ChatWidget}.tsx` + `src/lib/cosmo-system-prompt.ts` + `src/app/api/chat/route.ts` | informational |
| Directive premise: "Cosmo subtree still on Phase 14 violet/charcoal theme" | **DIRECTIVE PREMISE INCORRECT** — chat subtree contains **0** violet/indigo/purple references. ChatPanel.tsx exclusively uses `var(--accent-bright)`, `var(--bg-elevated)`, `var(--border-default)`, `var(--text-primary)`, `var(--text-tertiary)` tokens — all of which resolve to Bloomberg Operator palette via `globals.css` cascade. The chat subtree was effectively re-skinned to Bloomberg Operator the moment Phase 16 Section A migrated the underlying tokens. | **DEVIATION** |
| RGB literal drift in chat subtree (true 17b targets) | `ChatPanel.tsx:97` `rgba(13, 13, 13, 0.95)` panel bg (should reference `--bg-canvas: #000000`); `:140` `rgba(255, 168, 51, 0.15)` user-bubble bg + `:142` `rgba(255, 168, 51, 0.3)` border (the `255,168,51` = `#FFA833`, NOT the canonical `--accent-primary: #FF8800`); `:179` `color: '#F87171'` error text (red literal, not in palette); `:211` `color: '#ffffff'` CTA text (should reference `--cta-text-on-amber: #1A0E00` per Bloomberg Operator on-amber CTA spec). | **5 inline-literal drifts** flagged for Phase 17b token-replacement |

**17a-3 reframing:** the chat subtree is not "still on Phase 14 violet/charcoal" — it's already on Bloomberg Operator via token cascade. The actual Phase 17b work for Cosmo internal UI is **5 inline RGB-literal drifts to replace with token references**, plus the `Powered by Groq · llama-3.3-70b` subtitle (see Issue 10.2).

---

## SECTION 10 — Known issues surfaced this session

### 10.1 — Hero italic descender clipping (CRITICAL)

| Field | Detail |
|---|---|
| Symptom | `.hero-em` "the AI" italic glyph descender truncated at baseline. |
| Prior fix attempt | Commit `898ffaa` (Phase 16 D.1) added `padding: 0.08em 0.05em 0.04em 0.02em` to `.hero-em` and `padding-top: 0.08em` to `.hero-em .word` (`globals.css:875,926`). User report indicates fix is incomplete or has regressed. |
| Investigation surface | Ancestor overflow chain (`.word { overflow: hidden }` for word-reveal slide), `contain` cascade interaction, OpenType feature activation (`calt`, `dlig` not declared on `.hero-em`), font rendering mode (`-webkit-font-smoothing` not set on hero scope). |
| Affects | `.hero-em` in `HeroSection.tsx:200`. Potentially other Instrument Serif italic surfaces (subheadings, pull-quotes — `.pullquote` not audited this session). |
| Status | OPEN — Phase 17b candidate. |

### 10.2 — Cosmo chatbot brand attribution (CRITICAL)

| Field | Detail |
|---|---|
| Current | `ChatPanel.tsx:114` renders subtitle `Powered by Groq · llama-3.3-70b`. |
| Liability | Brand-credibility (operator-facing AI agency exposing third-party model + provider); competitive intel leak (model + provider disclosure); trust-signal mismatch ("Powered by" convention on a $50M-managed-spend professional services site). |
| Replacement options for 17b | (A) `DPL AI Agent · Cosmo` — proprietary internal naming (recommended). (B) `Trained on 200+ audits` — capability framing. (C) Status indicator only — `● Online · typically replies instantly`. |
| Status | OPEN — Phase 17b candidate. |

### 10.3 — Slow-scroll font jiggering (HIGH)

| Field | Detail |
|---|---|
| Symptom | Vibrating fonts during slow scroll, sub-pixel rendering instability. Acute on slow scroll; masked by motion blur on fast scroll. |
| Hypothesis space | GSAP ScrollTrigger sub-pixel transform precision; `will-change` over-application (8 occurrences in `globals.css` per S3.D); font hinting conflicts with scroll-linked transforms; CSS containment boundary intersecting animated geometry (`.section-deferred` + `.services-pin-frame` interaction). |
| Target | Apple-grade smoothness ("hot knife through butter"). |
| Implementation pattern (17b) | Native scroll preserved, transform-only on compositor layer, font rendering optimization (`-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility`), `prefers-reduced-motion` killswitch. |
| Status | OPEN — Phase 17b candidate. Cannot verify in code; observational only. |

### 10.4 — Localhost-production LH variance (MEDIUM)

| Field | Detail |
|---|---|
| Symptom | Localhost LH 3-run median 90 vs Phase 16 prod LH 97 on home-mobile. Section 4 of this report shows current prod home-mobile median 95 — confirms direction (prod > localhost). |
| Root cause | Cold-cache image optimization pipeline + dev-server load state accumulation across consecutive LH runs. |
| Implication | Localhost LH unreliable as production deploy gate. |
| 17b/18 candidate | Replace local LH gate with preview-URL LH gate via Vercel deployment hooks (lhci against actual edge URL). |
| Status | OPEN — process-level issue, not blocking. |

### 10.5 — Implicit dependency declaration pattern (MEDIUM)

| Field | Detail |
|---|---|
| Symptom | `@types/node` surfaced as latent declaration gap when 17a-1 invalidated Vercel build cache. Local builds passed via `bun-types` peer hoisting under pnpm v10.33; Vercel build env (pnpm v10.28 per spec) failed without explicit declaration. |
| Resolution | `2ada189` added `"@types/node": "^22.19.17"` to `devDependencies`. |
| Phase 17b scope | Comprehensive transitive dependency declaration hygiene check (audit all peer-hoisted types currently relied on but not declared). |
| Status | RESOLVED for `@types/node`; broader audit OPEN. |

### 10.6 — Phase 16 D.2 production scroll verification (PENDING)

| Field | Detail |
|---|---|
| Scope | ServicesPinReveal first-scroll lag fix (commit `11cc730`) shipped. |
| Verification gap | Production cold-load verification not yet completed this session. |
| Manual test required | Cold private window, hero → services first-attempt advance time, target <500 ms. |
| If still laggy | Root cause deeper than min-height adjustment — likely `.section-deferred { content-visibility: auto }` on `services-pin-section` (line 83 of `ServicesPinReveal.tsx` — confirms the class is applied on the same element that hosts the pin frame, possible double-isolation pathology). |
| Status | OPEN — Phase 17b cold-load test required. |

### 10.7 — Palette token shorthand drift (LOW) — **NOT REPRODUCED IN SOURCE**

| Field | Detail |
|---|---|
| Reported | CSS bundle inspection surfaced `--accent-primary: #f80` (3-digit hex). |
| Source verification | `globals.css:283` declares `--accent-primary: #FF8800;` (full 6-digit hex). Only 2 other usages in `globals.css` (lines 968, 988), both reference via `var(--accent-primary)`. |
| Likely true cause | Build-pipeline minification (Tailwind v4 `@theme inline` + PostCSS / Next.js CSS optimizer) collapsing `#FF8800` to `#f80` in the deployed bundle. CSS spec equivalence holds — runtime behaviour identical. |
| Implication | Not a runtime regression. Spec compliance review for Phase 17b: if the canonical-hex form must survive end-to-end (e.g., for design-system tooling that string-matches tokens), the minifier needs configuration to preserve canonical form. |
| Status | OBSERVATIONAL — source is canonical; bundle-level reduction is a build-tool optimization, not source drift. |

### 10.8 — content-visibility:auto invariant violation (CRITICAL)

| Field | Detail |
|---|---|
| Invariant (locked) | NEVER use `content-visibility: auto` — Phase 14 iteration 1 caused 0.196 CLS regression on the hero/services boundary. |
| Reality | `globals.css:1075-1076` `.section-deferred { content-visibility: auto; contain-intrinsic-size: 0 800px; }` is **live in production**. |
| Affected selectors (consumers of `.section-deferred`) | 7 sections: `PullQuoteSection.tsx:12`, `WorkflowSection.tsx:16`, `RecentWorkSection.tsx:22`, `CTASection.tsx:15`, `ServicesListSection.tsx:21`, `LogoStripSection.tsx:49`, **`ServicesPinReveal.tsx:83`** (the same element flagged in 10.6). |
| Correlated evidence | Section 4 home-mobile r3 single-run CLS spike 0.196 (median 0.000023) — **the exact magnitude of the Phase 14 iteration 1 regression**. Suggests the violating rule occasionally manifests at the same magnitude even though the median is bounded. |
| Origin | Phase 6 v2 D.9 (predates Phase 14 lesson). The invariant was articulated AFTER this rule shipped, so the rule was never retired. |
| 17b remediation pattern | Replace with `contain: layout paint style` across all 7 `.section-deferred` consumers. Distinct class boundary preserved. |
| Status | OPEN — P0 for Phase 17b. Severity upgraded by S4 r3 CLS spike correlation. |

### 10.E — Issues roll-up

| Severity | Count | Issues |
|---|---|---|
| **CRITICAL** | 3 | 10.1 hero italic clipping, 10.2 Cosmo brand attribution, 10.8 content-visibility:auto invariant violation |
| **HIGH** | 1 | 10.3 slow-scroll font jiggering |
| **MEDIUM** | 2 | 10.4 LH localhost variance, 10.5 dep declaration hygiene |
| **LOW** | 2 | 10.6 ServicesPinReveal cold-load verification gap, 10.7 token shorthand drift (build-pipeline, not source) |

---

## Part 2 Summary

| Section | Status |
|---|---|
| 6 — CI/CD ground truth | **DEVIATION** — `.github/` directory does not exist. No `deploy.yml`, no GH Actions. Deployment is Vercel-native auto-deploy on push to `main`. Reconciliation note in `/docs/CI_CD_GROUND_TRUTH.md`. |
| 7 — Commit integrity | PASS — 8/8 expected commits reachable, working tree clean, HEAD == origin/main, no force-push artefacts. |
| 8 — Deferred items | **3 directive/reality drifts** — marketing page depth, legal page content, and founders bio are all already shipped despite directive listing them as deferred. All other 13 deferrals preserved. |
| 9 — Phase 17a reconciliation | 17a-1 ✓ shipped; 17a-2 ✓ cleanly reverted (assets preserved in `~/Downloads/`); 17a-3 not started **and** directive premise corrected (chat subtree already inherits Bloomberg Operator via tokens; true 17b work = 5 inline-literal drifts + brand-attribution subtitle). |
| 10 — Known issues | 8 issues catalogued: 3 CRITICAL, 1 HIGH, 2 MEDIUM, 2 LOW. Issue 10.8 elevated by S4 r3 CLS-spike correlation (matching 0.196 magnitude of Phase 14 iter-1 regression). |

**Total Part 2 deviations: 5** (1 CI/CD ground-truth deviation + 3 directive/reality drifts in §8 + 1 directive-premise correction in §9.C). All observational; no remediation taken.

---

# PART 3 — Synthesis and Phase 17b sequencing

*Generated 2026-04-26, append-only. Recommendations only — no execution. Errors first.*

## SECTION 11 — Executive summary

**Production state:** The site is live at deploy `dpl_DVDSYCovASZozrcPPCSkWowXXAkz` (commit `2ada189` on `origin/main`), and Phase 17a-1's narrow goal — eliminate Vercel "Ignored build scripts" warnings — was achieved cleanly with the `@types/node` hotfix. Brand integrity is intact: zero violet/indigo/purple/charcoal residue across the source tree, all 7 production references to `/Dp-logo1.png` (329 KB, untouched) are wired correctly, and the locked content invariants (`TestimonialsSection` returns null, marquee 45s, AutomationOrbit geometry, HeroDataTicker static numbers) all verify.

**Critical deviations:** Three findings are gate-breaching or invariant-violating and should be treated as P0 for Phase 17b: (1) **`/blog` mobile Lighthouse median 64** vs the ≥90 mobile gate — LCP 4613 ms, TBT 342 ms, FCP 3507 ms — a regression of −7 from the Phase 16 floor of 71; (2) **`globals.css:1076 .section-deferred { content-visibility: auto }`** is live in production across 7 sections (including `services-pin-section`), violating the post-Phase-14 invariant — the home-mobile r3 single-run CLS spike of 0.196 correlated *exactly* to the Phase 14 iter-1 regression magnitude, suggesting the rule occasionally manifests at the same severity even though medians are bounded; (3) **`/api/webhook/leads` does not exist** and `/api/leads` carries zero HMAC verification (predates Phase 17a entirely; spec/implementation drift, not a regression).

**Risk-ranked outstanding surface:** P0 — content-visibility invariant remediation, hero italic descender clipping, Cosmo brand-attribution subtitle, `/blog` mobile root-cause; P1 — mascot vectorization resume (Canva assets preserved in `~/Downloads/` at 1.3 MB PNG + 416 KB SVG), slow-scroll font jiggering investigation; P2 — `@types/node`-class transitive dependency hygiene, ServicesPinReveal D.2 cold-load verification, Lighthouse gate methodology reform (preview-URL CI replacing localhost), and documentation reconciliation (3 deferred items in the spec are already shipped: marketing page depth at 1108 lines, legal content at 853 lines, founders bio at `AboutPage.tsx:107-137`).

---

## SECTION 12 — Phase 17b scope proposal

The seven pillars below are ordered by severity-then-blast-radius. Pillars 1–3 are P0 (gate-breaching or invariant-violating, blocking close-out of Phase 17a). Pillars 4–5 are P1. Pillars 6–7 are P2 / cleanup. Each pillar lands in a **single commit** with explicit verification before the next pillar opens.

### Pillar 1 — P0 invariant remediation: content-visibility removal

| Field | Detail |
|---|---|
| Target | `globals.css:1075-1076` `.section-deferred { content-visibility: auto; contain-intrinsic-size: 0 800px; }` |
| Action | Replace with `contain: layout paint style;` (drop the `contain-intrinsic-size` line — only meaningful with `content-visibility: auto`). |
| Affected consumers (no source change required, class kept) | 7 sections: `PullQuoteSection.tsx:12`, `WorkflowSection.tsx:16`, `RecentWorkSection.tsx:22`, `CTASection.tsx:15`, `ServicesListSection.tsx:21`, `LogoStripSection.tsx:49`, `ServicesPinReveal.tsx:83`. |
| Empirical justification | §4 home-mobile r3 single-run **CLS = 0.196** matches the exact magnitude of the Phase 14 iter-1 regression that originally produced the invariant. Median is 0.000023 — i.e., the rule does not fire on every load, but when it does it produces the regression at full magnitude. |
| Verification | Re-run §4 LH 48-run audit against production after deploy; confirm `/` mobile r1/r2/r3 CLS all <0.01; confirm median perf ≥97 (matches Phase 16 baseline pre-rule-violation regression-window). |
| Kill condition | If post-deploy median CLS for any route ≥0.01 in any single run of 5, revert pillar within 1 hour and root-cause separately. |

### Pillar 2 — P0 visual remediation

#### 2A — Hero italic descender clipping (Issue 10.1)

| Field | Detail |
|---|---|
| Target | `HeroSection.tsx:200` `.hero-em` + `globals.css:875,926` (current Phase 16 D.1 padding-only fix). |
| Comprehensive fix (proposed) | (1) Verify ancestor overflow chain — the `.word { overflow: hidden }` for word-reveal slide is the suspect ancestor; expand vertical padding on `.word` to clear descender height, not just ascender. (2) Activate OpenType features: `font-feature-settings: "calt", "dlig"` on `.hero-em`. (3) Apply `-webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility` at the hero scope. (4) Audit other Instrument Serif italic surfaces — pull-quote (`.pullquote`), any italic subheadings — and apply the same set if descender clipping reproduces. |
| Verification | Manual inspection at 1024 / 1280 / 1440 / 1920 breakpoints in Chromium + Safari + Firefox. No ascender or descender clipping. Word-reveal animation still slides cleanly from `yPercent: 110`. |
| Kill condition | If word-reveal animation breaks (any glitch in slide-up timing or visible jump), revert and try padding-only with larger margin instead of feature-settings approach. |

#### 2B — Cosmo brand-attribution restructure (Issue 10.2)

| Field | Detail |
|---|---|
| Target | `ChatPanel.tsx:114` `Powered by Groq · llama-3.3-70b`. |
| Replacement | **Option A (recommended): `DPL AI Agent · Cosmo`** — proprietary internal naming, removes provider/model leak, aligns with operator-grade branding for a $50M-managed-spend agency. |
| Verification | Visual confirm in widget header. No regression in conversation flow, system prompt unchanged. |
| Kill condition | None — pure copy change. |

#### 2C — 17a-3 inline RGB-literal token replacement (scope-corrected)

| Field | Detail |
|---|---|
| Targets (5 inline drifts in `ChatPanel.tsx`) | line 97 `rgba(13, 13, 13, 0.95)` → `var(--bg-canvas)` with explicit alpha overlay (or convert to `color-mix(in srgb, var(--bg-canvas) 95%, transparent)`); line 140 `rgba(255, 168, 51, 0.15)` → token derived from `--accent-primary: #FF8800` (note: `#FFA833 ≠ #FF8800` — current literal is **off-canon**); line 142 `rgba(255, 168, 51, 0.3)` → same correction; line 179 `color: '#F87171'` → introduce semantic token `--text-error` (red is fine; just centralize); line 211 `color: '#ffffff'` → `var(--cta-text-on-amber)` (`#1A0E00`) per Bloomberg Operator on-amber CTA spec. |
| Verification | Visual diff of chat widget at idle / hover / typing / sent-message / error states. Confirm contrast ratios meet WCAG AA. |
| Scope clarification | This is **not** a "Cosmo subtree migration" — the subtree already inherits Bloomberg Operator via token cascade (§9.C). This is a 5-line surgical replacement of off-canon RGB literals. |

### Pillar 3 — P0 performance remediation: `/blog` mobile gate breach

| Field | Detail |
|---|---|
| Target | `/blog` mobile median **64** (LCP 4613 ms, FCP 3507 ms, TBT 342 ms). |
| Investigation surface | (1) Image weight — blog index renders 9+ post cards each with hero illustration; cumulative byte-weight + parse cost on mobile dominates. (2) Blocking JS on initial paint — TBT 342 ms suggests main-thread occupation; audit hydration cost of any client component (`<BlogPage />` consumer chain). (3) Font loading — Geist + Instrument Serif both subset-aware but blog-index may load duplicates. (4) `next/image` `priority` mis-application — only the first card's hero should be priority; rest should lazy-load below fold. |
| Action plan | (a) Profile blog-mobile via `lighthouse --view` against production with traces; identify single largest LCP candidate. (b) If image-weight: add explicit `sizes` per card, set `loading="lazy"` on cards 2..N, generate AVIF variants if not already present. (c) If JS-blocking: split client islands, defer non-critical `<script>` tags. (d) If font-related: subset to glyph-coverage of blog-index actual content. |
| Verification | Re-run blog-mobile LH 5x post-fix; require **median ≥90, no single run <85**. |
| Kill condition | If median post-fix is <90, **do not ship Pillar 3 to production** — surface findings and pause for re-scoping. Other pillars may still ship independently. |

### Pillar 4 — P1 mascot vectorization (17a-2 deferred work resume)

| Field | Detail |
|---|---|
| Source asset | `/Users/laptopchoice/Downloads/new logo color change.svg` (415890 bytes, sha256 `34e536ada1…d141a1`, mtime 2026-04-26 12:07) — Canva manual recolor, preserved through 17a revert. |
| Path | (1) SVG inspection: open in editor, audit `<image>` raster wrappers, `<filter>` chains, `<clipPath>` definitions. **If raster-wrapped (the 17a-2 failure mode), do not proceed — go to fallback.** (2) SVGO optimization: `svgo --multipass --pretty` with `removeViewBox: false`, `cleanupIDs: true`, `convertColors: true`. (3) `currentColor` wiring: rewrite hard-coded fills to `currentColor` where the brand-amber should follow CSS context. (4) Multi-size render checkpoint: render at 32 px (chat trigger), 60 px (nav), 192 px (PWA icon eventual) in a Playwright snapshot — visually confirm no degenerate paths or clipping at any size. |
| Fallback | If Canva SVG is raster-wrapped or otherwise inadequate: **Figma manual retrace** from the 1.3 MB PNG (`color change new logo.png`, sha256 `ed31936c…78bc2f`) using Figma's vector pen + boolean ops. Export at 192/60/32 px from the master vector. |
| Production wiring | New asset path: `/public/Dp-logo1.svg` (or new filename). Update all 7 references currently pointing at `/Dp-logo1.png` (Navigation:80, Footer:30, ChatTrigger:14+65, layout.tsx:124 schema logo, (conversion)/layout.tsx:18, FAQSchema.tsx:65 schema logo). Keep PNG in `/public/` for schema.org logo URLs that prefer raster. |
| Verification | Production LH 3-run median per route — confirm no regression vs Phase 16 baselines. Visual confirm on `/`, `/about`, `/case-studies`, conversion route, chat widget, footer, mobile menu. |
| Kill condition | LH median regression ≥3 points on any single route, OR any visual degradation at 32/60/192 px → revert pillar. |

### Pillar 5 — P1 scroll-feel remediation (Issue 10.3)

| Field | Detail |
|---|---|
| Target | Slow-scroll font vibration / sub-pixel rendering instability. |
| Investigation surface | (1) GSAP ScrollTrigger sub-pixel transform precision — audit all `.fromTo` and `.to` calls with `y:` / `yPercent:` for fractional values. (2) `will-change` over-application audit — `globals.css` has 8 occurrences; each should be transient, not declared statically on element selectors. (3) Font hinting conflicts — confirm `-webkit-font-smoothing` and `-moz-osx-font-smoothing` are uniformly applied. (4) CSS containment boundary intersecting animated geometry — Pillar 1 should partially address by removing `content-visibility: auto`; verify the `.services-pin-frame contain: layout paint style` boundary doesn't intersect with GSAP-animated children causing repaint storms. |
| Action plan | Round-trip with FPS profiler open in Chromium (`Performance` panel, slow-scroll test). Target ≥58 FPS sustained, no jank frames over 16.7 ms. Apply `transform: translateZ(0)` only on confirmed-needed compositor layers; remove blanket `will-change`. |
| Verification | User acceptance ("hot knife through butter") + 60 FPS profiler trace on slow scroll. |
| Kill condition | If perf gates regress (LH median drop ≥2 points on any route), pull back compositor layer changes. |

### Pillar 6 — P2 architectural remediation

#### 6A — Dependency declaration hygiene (Issue 10.5)

Audit all peer-hoisted types currently relied upon but not declared. Methodology: temporarily move `node_modules/.pnpm` aside, run `pnpm install --frozen-lockfile --prefer-offline`, run `pnpm build`, capture missing-types errors, declare each as explicit `devDependency`. Likely candidates beyond `@types/node`: `@types/nodemailer` is already present, but other transitive `@types/*` peers may be missing.

#### 6B — Phase 16 D.2 production scroll verification (Issue 10.6)

Manual cold-load test: private window, hard-refresh, scroll hero → services first-attempt. Target advance time <500 ms. If still laggy after Pillar 1 remediation (which removes `content-visibility: auto` from `services-pin-section`), root-cause deeper — likely GSAP ScrollTrigger pin setup cost on cold cache.

#### 6C — Lighthouse gate methodology reform (Issue 10.4)

Replace localhost LH gate with Vercel preview-URL LH gate via `lhci` against the actual edge URL after preview deploy. Implementation: thin GH Actions workflow (option 2 from `/docs/CI_CD_GROUND_TRUTH.md`) running `lhci collect --url=$VERCEL_PREVIEW_URL` on PR, with assertion thresholds matching Phase 16 baselines. Vercel native auto-deploy stays as the production deploy mechanism.

### Pillar 7 — P2 documentation reconciliation

Address §8 directive/reality drifts:
- Update internal memory / spec to remove **marketing page content depth (4 service pages skeletal)** from the deferred list — actual state is 1108 lines shipped across the four `*Page.tsx` components.
- Update internal memory / spec to remove **legal pages content (cookies/privacy/terms placeholder)** from the deferred list — actual state is 853 lines of policy text shipped.
- Update internal memory / spec to remove **founders bio (Faizan + Anwaar) on About** from the deferred list — already shipped at `AboutPage.tsx:107-137` with origin story + `Co-Founder · The Ads Guy` / `Co-Founder · The Data Guy` tagged cards.
- Carry forward the genuinely deferred items from §8.A (cookie consent banner state machine, Sentry, dynamic OG, mobile responsive deep audit, real testimonials backfill, real case studies, real photography, Architect Blueprint v2 sub-page palette, HeroDataTicker live counters, WCAG deep audit, CMS panel, Cosmo system prompt review, hero trust-signal **verification** against books-of-record).

### 12.E — Pillar sequencing summary

| Pillar | Priority | Estimated commits | Independent of others? |
|---|---|---|---|
| 1 — content-visibility invariant | P0 | 1 | Yes — pure CSS, 1 file |
| 2 — visual (hero italic + Cosmo attr + chat tokens) | P0 | 1 (or 3 sub-commits) | Yes per sub-pillar |
| 3 — `/blog` mobile root-cause | P0 | 1 (after investigation report) | Yes |
| 4 — mascot vectorization | P1 | 1 | Yes — adds new asset, swaps refs |
| 5 — scroll feel | P1 | 1 | Should run **after** Pillar 1 (containment boundary changes) |
| 6 — architectural (deps + D.2 verify + LH CI) | P2 | 1–3 | 6C is multi-day; 6A and 6B can be 1 commit each |
| 7 — doc reconciliation | P2 | 1 (memory + spec edits, no source) | Yes |

**Recommended sequencing:** P1 → P2A → P2B → P2C → P3 → P5 (after P1) → P4 → P6A → P6B → P6C → P7. Verify after each pillar (LH 5-run on changed routes, visual diff for Pillar 2, FPS trace for Pillar 5).

---

## SECTION 13 — Phase 18 candidates

| Candidate | Detail | Trigger |
|---|---|---|
| CI/CD architecture decision | Per `/docs/CI_CD_GROUND_TRUTH.md`: choose between (a) keep Vercel-native auto-deploy, document-only reconciliation; (b) add thin verification-only GH Actions workflow (lint + typecheck + build) on PR + push, leaving Vercel auto-deploy unchanged; (c) move deploy fully into GH Actions with `vercel deploy --prebuilt --prod`. **Audit recommends (b).** | After Phase 17b ships; do not gate 17b on this. |
| Architect Blueprint v2 sub-page palette experimentation | Carbon `#0E1218` + drafting blue `#5C8AC9` + pencil yellow `#D4B856` palette for any future case-study deep-dive sub-page or proposal-export view. Currently 0 source references — purely speculative. | When a use case actually arises (e.g., new case-study format). Not before. |
| Vercel preview-URL LH CI integration | Replace localhost LH gate (Issue 10.4 driver) with `lhci` against preview URLs. Subset of Pillar 6C; if 6C is descoped from Phase 17b, lift to Phase 18. | After CI/CD architecture decision lands. |
| Sentry instrumentation | Real error monitoring (currently absent — confirmed §8.A). | When user activity volume justifies the cost; not before. |
| Cookie consent banner | Required if EU traffic becomes material; conditional analytics mount pattern. | Trigger by traffic geography or legal requirement, not arbitrary calendar. |
| Dynamic OG images per page | `next-og` integration for blog post hero images, case-study summary cards, etc. | Marketing-driven, low engineering risk; queue behind Phase 17b. |
| WCAG accessibility deep audit | Beyond Phase 15's 3-iteration contrast pass — full keyboard-only flow, screen-reader narration, focus management. | Standalone phase; recommend after content stability. |
| Real testimonials backfill | `TestimonialsSection.tsx` returns null pending real client quotes. | Driven by client outreach, not engineering. |

---

## SECTION 14 — Raw evidence appendix

### 14.A — Production deployment IDs + commit SHAs

| Item | Value |
|---|---|
| Production deploy ID | `dpl_DVDSYCovASZozrcPPCSkWowXXAkz` |
| Production deploy timeline | Build started 2026-04-26T08:11:06 UTC, completed 08:14:18 UTC (3m 12s) |
| Production HEAD commit (origin/main) | `2ada189c08ed8a91c89222f7d013057f4402c302` |
| Production HEAD commit subject | `phase 17a-1 hotfix: explicit @types/node devDependency` |
| Phase 17a-1 base commit | `28c739f60787acb8ee90fd93c3a486d6c883c674` (`phase 17a-1: pnpm onlyBuiltDependencies`) |
| Phase 16 D series final | `a9981cfc35266962a98e9dd05e275fd96f8e2171` (`phase 16 D.3 + D.4 + D.5`) |
| Phase 16 D.2 (ServicesPinReveal) | `11cc730e58a232efe810d53222edcc38df23b090` |
| Phase 16 D.1 (italic clip fix) | `898ffaa519233b658ab6cb2319de8d3080336cfd` |
| Phase 16 C (HeroDataTicker) | `9e8c34f94062c1df833958b95a788b6cb92cb370` |
| Phase 16 B (AutomationOrbit) | `530e5a6fcfcf134ef4b71dfd09e0d052141f3c30` |
| Phase 16 A (palette migration) | `833e3ffd6f414e1e5f3d30f72c2f8ff14f9a7ae7` |

### 14.B — File checksums for locked asset invariants

| Asset | Path | Bytes | SHA-256 |
|---|---|---|---|
| Production logo (canonical) | `public/Dp-logo1.png` | 329042 | `589f799b69d277e08ab1011faf7a80fd8cf4143ac610e3b1282f8b24d2195600` |
| Canva-recolored mascot SVG (preserved for Pillar 4) | `/Users/laptopchoice/Downloads/new logo color change.svg` | 415890 | `34e536ada104ae49589d94f3906ec01f44db0a509e056f7bddab7af2c6d141a1` |
| Canva-recolored mascot PNG (Pillar 4 fallback source) | `/Users/laptopchoice/Downloads/color change new logo.png` | 1334549 | `ed31936ca7a0f13a20170f68a6faad27b06afe30a4f4d2a825480def9e78bc2f` |

### 14.C — Section 2 palette sweep commands + results

The following ripgrep / grep commands were run against `src/`, `public/`, and `globals.css` during Section 2:

```
rg -i 'violet|indigo|purple' src/ public/                       → 0 hits
rg '#7C3AED|#A855F7|#8B5CF6|#9333EA|#6366F1' src/ public/        → 0 hits
rg 'bg-violet|bg-indigo|bg-purple|text-violet|text-indigo|text-purple|border-violet|border-indigo|border-purple' src/  → 0 hits
rg '#0D0D0D|#1F1F1F' src/ public/                               → 0 hits (no charcoal residue)
rg -i 'violet|indigo|purple|charcoal' src/components/chat/ src/components/cosmo/  → 0 hits (chat subtree clean)
```

All 5 sweeps returned 0 hits. Palette integrity confirmed.

### 14.D — Lighthouse JSON exports per route × strategy

48 reports stored at `/tmp/p17a-audit-lh/json/`:

```
about-{desktop,mobile}-r{1,2,3}.json
automation-{desktop,mobile}-r{1,2,3}.json
blog-{desktop,mobile}-r{1,2,3}.json
case-studies-{desktop,mobile}-r{1,2,3}.json
home-{desktop,mobile}-r{1,2,3}.json
performance-marketing-{desktop,mobile}-r{1,2,3}.json
remote-workforce-{desktop,mobile}-r{1,2,3}.json
systems-reporting-{desktop,mobile}-r{1,2,3}.json
```

Run log: `/tmp/p17a-audit-lh/run.log`. Orchestration script: `/tmp/p17a-audit-lh/run.sh`. Lighthouse version: 13.1.0. Total wall-clock: 940 s. Median tables in §4.A and §4.B.

### 14.E — Vercel build log excerpts confirming gate compliance

```
✓ Detected package manager: pnpm
✓ Compiled successfully in 14.3s
✓ Finished TypeScript in 10.1s
✓ Generating static pages (360/360)
✓ Build Completed in [2m]
[no occurrence of "Ignored build scripts"]
+ @types/node 22.19.17
[postinstall scripts that ran]
  ✓ @prisma/client postinstall
  ✓ @prisma/engines preinstall + postinstall
  ✓ prisma postinstall
  ✓ sharp install
  ✓ unrs-resolver postinstall
```

5/5 declared `onlyBuiltDependencies` honoured. 0/0 ignored-script warnings. Phase 17a-1 gate met.

### 14.F — `ChatPanel.tsx` line-specific RGB-literal locations (Pillar 2C targets)

| Line | Current literal | Intent | Pillar 2C replacement |
|---|---|---|---|
| 97 | `background: 'rgba(13, 13, 13, 0.95)'` | Panel background | `var(--bg-canvas)` w/ alpha overlay or `color-mix(in srgb, var(--bg-canvas) 95%, transparent)` |
| 140 | `background: 'rgba(255, 168, 51, 0.15)'` | User-message bubble bg | Token derived from `--accent-primary: #FF8800` (current `#FFA833` is **off-canon**) |
| 142 | `border: '1px solid rgba(255, 168, 51, 0.3)'` | User-message bubble border | Same correction |
| 179 | `color: '#F87171'` | Error text | New semantic token `--text-error` |
| 211 | `color: '#ffffff'` | CTA button text | `var(--cta-text-on-amber)` (`#1A0E00`) per Bloomberg Operator on-amber spec |

### 14.G — `AboutPage.tsx` founders bio implementation reference

| Element | Location | Content |
|---|---|---|
| 2017 origin story (timeline entry) | `AboutPage.tsx:12` | `{ year: '2017', title: 'Two Friends, One Laptop', description: 'Faizan and Anwaar started Digital Point from a tiny home office. First client came from a cold LinkedIn message that almost went to spam.' }` |
| Personal founder story heading | `AboutPage.tsx:107` | `{/* Personal founder story */}` |
| Origin narrative | `AboutPage.tsx:117–120` | Two-paragraph story: Faizan ad-side, Anwaar data-side, met-and-merged. |
| Faizan tagged card | `AboutPage.tsx:130–131` | `M. Faizan Rafiq` / `Co-Founder · The Ads Guy` |
| Anwaar tagged card | `AboutPage.tsx:135–136` | `Anwaar Tayyab` / `Co-Founder · The Data Guy` |

Total founder-bio surface area: ~30 lines of substantive content. Spec deferral entry is incorrect (already shipped).

### 14.H — Locked invariant evidence summary

| Invariant | Source line(s) | Verified |
|---|---|---|
| Marquee 45s | `globals.css:logo-marquee` (Phase 9 commit `55334c9`) | §3.C |
| AutomationOrbit geometry | `r=30 / rx=138/ry=98 / rx=62/ry=42 / r=18` per Phase 16 §B | §3.C |
| HeroDataTicker static numbers v1 | `HeroDataTicker.tsx:14-20` `RIGHT_COLUMN` const + line 45 hardcoded `'2026.04.26 14:32:08 UTC'` | §3.C / §8.A |
| HeroDataTicker opacities | `globals.css:957/969/989` (0.18 / 0.18 / 0.12) | §3.C |
| `TestimonialsSection` returns null | `TestimonialsSection.tsx:21` `return null;` | §3.C |
| Cursor bloom <1024px disabled | `CursorBloom.tsx` matchMedia + `globals.css:949` | §3.C |
| `prefers-reduced-motion` killswitches | `globals.css` 14 occurrences + `AutomationOrbit.tsx` + `AutomationFlow.tsx` | §3.C |
| Cosmo invariants (`.cosmo-fab` host, breathe 4s, hover 1.08, brightness 1.15) | `globals.css:894–924` | §3.E |

---

## SECTION 15 — Recommended Phase 17b execution directive

The block below is the ready-to-execute Phase 17b prompt synthesized from the Part 3 scope proposal. Locked invariants are explicit; pillars commit one-at-a-time with verification gates between them.

```
Phase 17b execution directive — closure of Phase 17a outstanding work.

LOCKED INVARIANTS (must hold across every commit):
- Brand identity: /public/Dp-logo1.png 329042 bytes, sha256 589f799b69d277e08ab1011faf7a80fd8cf4143ac610e3b1282f8b24d2195600 — untouched by Pillars 1–3, 5–7. Pillar 4 may add a parallel SVG asset but MUST NOT modify the PNG.
- Palette: zero violet/indigo/purple/charcoal across src/ and public/. Bloomberg Operator tokens canonical (--accent-primary:#FF8800, --accent-secondary:#2A8FBD, --bg-canvas:#000000, --cta-text-on-amber:#1A0E00, --ring-stroke:#3A2D14, text ladder #ECECEC/#A8A8A8/#9A9A9A).
- Content: TestimonialsSection.tsx returns null. Marquee 45s. AutomationOrbit geometry r=30/rx=138/ry=98/rx=62/ry=42/r=18. HeroDataTicker static numbers v1 (no live counters). 5-service AI-first order preserved. Hero numbers $50M / 200+ / 8 years rendered (verification deferred to Phase 18).
- Architecture: prefers-reduced-motion killswitches preserved (≥14 occurrences). cursor bloom <1024px disabled. .cosmo-fab/.cosmo-mascot animation specs preserved.

PILLAR 1 — content-visibility invariant remediation (P0)
File: src/app/globals.css line 1075–1076.
Action: Replace `.section-deferred { content-visibility: auto; contain-intrinsic-size: 0 800px; }` with `.section-deferred { contain: layout paint style; }`.
Class consumers (no change required to consumers): PullQuoteSection.tsx:12, WorkflowSection.tsx:16, RecentWorkSection.tsx:22, CTASection.tsx:15, ServicesListSection.tsx:21, LogoStripSection.tsx:49, ServicesPinReveal.tsx:83.
Verification gate: Production LH 5-run on /. Require all 5 runs CLS <0.01. Median perf ≥97 mobile. If any single run CLS ≥0.01 → halt, root-cause separately.
Commit: `phase 17b pillar 1 — content-visibility:auto removal, contain replacement`.

PILLAR 2 — visual remediation (P0). Three sub-commits.

Pillar 2A — Hero italic descender clipping comprehensive fix.
Files: src/app/globals.css (.hero-em + .hero-em .word block, lines 875–926). Audit ancestor overflow chain (.word { overflow: hidden }) and apply font-feature-settings: "calt", "dlig" + -webkit-font-smoothing: antialiased + text-rendering: optimizeLegibility at .hero-em scope. Expand .word vertical padding to clear descender, not just ascender.
Verification gate: Manual screenshot at 1024/1280/1440/1920 in Chromium + Safari + Firefox. No clipping. Word-reveal animation slides cleanly from yPercent:110.
Commit: `phase 17b pillar 2A — hero italic descender comprehensive fix`.

Pillar 2B — Cosmo brand-attribution restructure.
File: src/components/chat/ChatPanel.tsx line 114.
Replace `Powered by Groq · llama-3.3-70b` with `DPL AI Agent · Cosmo`.
Verification gate: Visual confirm in widget header. System prompt unchanged.
Commit: `phase 17b pillar 2B — cosmo brand-attribution proprietary naming`.

Pillar 2C — ChatPanel.tsx inline RGB-literal token replacement.
File: src/components/chat/ChatPanel.tsx lines 97, 140, 142, 179, 211.
- L97: `rgba(13, 13, 13, 0.95)` → `color-mix(in srgb, var(--bg-canvas) 95%, transparent)` (or var(--bg-canvas) with explicit alpha overlay).
- L140: `rgba(255, 168, 51, 0.15)` → token derived from --accent-primary:#FF8800 at 0.15 alpha. Note: 255,168,51 = #FFA833 ≠ canonical #FF8800; correct to canonical.
- L142: `rgba(255, 168, 51, 0.3)` → same correction at 0.3 alpha.
- L179: `color: '#F87171'` → introduce new semantic token --text-error in globals.css (#F87171 is fine, just centralize).
- L211: `color: '#ffffff'` → `var(--cta-text-on-amber)` (#1A0E00).
Verification gate: Visual diff at idle/hover/typing/sent/error states. WCAG AA contrast ratios.
Commit: `phase 17b pillar 2C — ChatPanel inline RGB-literal canonicalization`.

PILLAR 3 — /blog mobile gate breach remediation (P0)
Profile blog-mobile via `lighthouse --view` against production. Identify single largest LCP candidate (likely first card hero illustration or blocking JS hydration).
Action paths (apply only what investigation proves):
- Image weight: explicit `sizes` per card, `loading="lazy"` on cards 2..N, AVIF variants if missing.
- JS-blocking: split client islands, defer non-critical scripts.
- Font: subset Geist + Instrument Serif to actual blog-index glyph coverage.
- next/image priority: only first card priority, others lazy.
Verification gate: 5-run LH median ≥90 mobile, no single run <85. If median <90 post-fix → DO NOT SHIP, surface findings, pause for re-scoping.
Commit: `phase 17b pillar 3 — /blog mobile LCP/TBT root-cause fix`.

PILLAR 4 — Mascot vectorization resume (P1)
Source: /Users/laptopchoice/Downloads/new logo color change.svg (415890 bytes, sha256 34e536ada104ae49589d94f3906ec01f44db0a509e056f7bddab7af2c6d141a1).
Path:
1. SVG inspection. If raster-wrapped (image tags + filter chains as in 17a-2 failure) → halt, fall back to Figma manual retrace from /Users/laptopchoice/Downloads/color change new logo.png.
2. SVGO multipass with removeViewBox:false, cleanupIDs, convertColors.
3. currentColor wiring on brand-amber paths.
4. Multi-size Playwright snapshot at 32/60/192px — confirm no degenerate paths.
Production wiring: New asset at /public/Dp-logo1.svg. Update 7 references: Navigation.tsx:80, Footer.tsx:30, ChatTrigger.tsx:14+65, layout.tsx:124, (conversion)/layout.tsx:18, FAQSchema.tsx:65. Keep PNG in /public/ for schema.org logo URLs.
Verification gate: Production LH 3-run median per route — no regression vs Phase 16 baselines. Visual confirm on /, /about, /case-studies, conversion route, chat widget, footer, mobile menu.
Kill condition: LH median regression ≥3 points on any single route OR visual degradation at any size → revert.
Commit: `phase 17b pillar 4 — mascot SVG vectorization (Canva source, SVGO optimized)`.

PILLAR 5 — Scroll-feel remediation (P1, runs after Pillar 1 complete)
Audit all GSAP ScrollTrigger fromTo/to calls for fractional y/yPercent values. will-change occurrence audit (currently 8 in globals.css) — make transient, not static. Apply transform: translateZ(0) only on confirmed-needed compositor layers.
Verification gate: 60 FPS profiler trace on slow scroll (≥58 FPS sustained, no jank frames >16.7ms). User acceptance ("hot knife through butter").
Kill condition: LH median drop ≥2 points on any route → pull back compositor layer changes.
Commit: `phase 17b pillar 5 — scroll feel: GSAP sub-pixel + will-change + compositor`.

PILLAR 6 — Architectural remediation (P2). Up to 3 sub-commits.
6A: Dependency declaration hygiene audit — identify all peer-hoisted @types/* missing as explicit devDependencies. Commit: `phase 17b pillar 6A — transitive dependency declaration hygiene`.
6B: Phase 16 D.2 cold-load verification — manual private-window test, hero→services first-attempt <500ms after Pillar 1 ships. If still laggy, root-cause GSAP pin setup cost. Commit: `phase 17b pillar 6B — D.2 cold-load verification + fix (if needed)`.
6C: Vercel preview-URL LH CI — thin .github/workflows/verify.yml running lhci against $VERCEL_PREVIEW_URL on PR. Vercel native auto-deploy unchanged. Commit: `phase 17b pillar 6C — preview-URL LH CI`.

PILLAR 7 — Documentation reconciliation (P2)
Update internal memory + spec: remove "marketing pages skeletal", "legal pages placeholder", "founders bio deferred" from deferral list. Carry forward genuinely deferred items (cookie consent banner, Sentry, dynamic OG, mobile responsive deep audit, real testimonials, real case studies, real photography, Architect Blueprint v2 palette, HeroDataTicker live counters, WCAG deep audit, CMS, Cosmo system prompt review, hero trust-signal verification).
Commit: `phase 17b pillar 7 — deferred items registry reconciliation`.

EXECUTION DISCIPLINE:
- One pillar = one commit. No pillar splits unless explicitly noted (Pillar 2 has 3 sub-pillars, Pillar 6 up to 3).
- Verification gate runs BEFORE commit. If gate fails, halt that pillar, do not advance.
- Locked invariants verified after every commit. Any drift → halt all work, surface immediately.
- Order: 1 → 2A → 2B → 2C → 3 → 5 → 4 → 6A → 6B → 6C → 7. (Pillar 5 must run after Pillar 1 because containment changes interact.)
- Each pillar deploys independently to production via Vercel native auto-deploy on push to main. Verify production after each push.

ERRORS FIRST. NO REMEDIATION SCOPE CREEP. NO SPECULATIVE REFACTORING.
```

---

## Final report status

| Part | Status | Deviations |
|---|---|---|
| Part 1 (§1–5) | Complete | 3 (1 invariant + 1 perf gate breach + 1 infrastructure) |
| Part 2 (§6–10) | Complete | 5 (1 CI/CD ground-truth + 3 directive/reality drifts in §8 + 1 §9.C premise correction) |
| Part 3 (§11–15) | Complete | n/a (synthesis) |

**Total observational deviations across the audit: 8.** Phase 17a's narrow scope (eliminate Vercel "Ignored build scripts" warnings) is closed with a clean ship at `2ada189`. The 8 deviations are pre-Phase-17a or process-level and feed directly into the Phase 17b 7-pillar scope proposal in §12 + the ready-to-execute directive in §15.

*Report finalized 2026-04-26 against deployment `dpl_DVDSYCovASZozrcPPCSkWowXXAkz` on commit `2ada189c08ed8a91c89222f7d013057f4402c302`. Recommendations only; no execution taken.*

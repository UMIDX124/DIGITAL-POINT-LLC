# Phase 20 Audit: Digital Point LLC marketing site

**Generated:** 2026-05-06 (read-only static-analysis pass; no code modified)
**Branch:** `redesign/impeccable-pass` (clean, 2 commits ahead of origin: `798664e`, `01c18ce`)
**Scope:** All `(marketing)` + `(conversion)` routes, every section in `src/components/sections/`, `src/lib/copy.ts`, `src/lib/comparisons.ts`, `src/lib/guides.ts`, `src/lib/programmatic-seo.ts`, ~10 sampled blog posts in `src/content/blog/`, schema + sitemap + robots + IndexNow infra, form bot-mitigation posture.
**Methodology:** 3 parallel Explore agents covered (a) home + 5 service pillars + about + faq + contact + free-growth-audit, (b) research + tools + blog + compare + guides + legal + programmatic SEO, (c) cross-cutting integrity + infra + greps + build sanity. Findings deduplicated and reconciled below.
**Out of scope:** Lighthouse/CrUX runtime numbers, headless screenshots at 1440 + 375, manual screen-reader pass. These need a runtime measurement step (Phase 7 + Phase 8). Audit flags candidates; numbers come later.

> Locked invariants K1-K17 + Phase 18-19 carve-outs verified intact (palette purity on content surfaces, hero copy locked, 5-service order, AutomationOrbit Palette D geometry, HeroDataTicker substrate position, logo SHA, TestimonialsSection null, LogoStripSection env-gated null, Phase 12 contact strategy, atmospheric exception ≤30%/≤22%, K14 amended interpretation, K11 ≥92 ship gate). Build sanity clean: `pnpm exec tsc --noEmit` exit 0; `pnpm lint` exit 0.

---

## Severity rollup

| Severity | Count | Headline |
|---|---|---|
| **CRITICAL** | 4 | Bot mitigation missing on both forms; internal linking depth <3 on 4 routes (3 of them at zero); Cosmo advertised in copy but disabled in render path; programmatic SEO `index: false / follow: true` mismatch |
| **HIGH** | 9 | Schema gaps (Service / Person / BlogPosting / Article / HowTo); Twitter card missing on 5 routes; OG image missing on 4 routes; binary contrast in copy.ts; throat-clearing in RemoteWorkforcePage; unsourced research benchmarks; case studies / results not gated `[design only]`; 3 founder-voice blog posts contain throat-clearing openers; calculators are vanity sliders not methodology tools |
| **MEDIUM** | 6 | Speed Insights not wired; about-page metrics need source verification; comparisons.ts has comma splices + banned phrasing; legal pages reference Cosmo (broken CTA); breadcrumb schema missing on hub pages; service-page copy spot-check needed for managed-service vs SaaS framing |
| **LOW** | 5 | Comment-only "purple" doc-rot in `globals.css`; comment-only em-dashes (43 total, all in code comments, none rendered); guides `readTime` hard-coded; mailto in API-side email templates only (correct, internal); skip-to-content link not visible in code (verify in layout) |

**Phase 1 PAUSE POINT 1 decisions required (3 blockers for Phase 2 scope):**
1. **Cosmo chatbot:** re-enable + mount + env-gate, OR strip every copy reference and delete components? Currently advertised on `/contact`, Footer, legal pages but no render path.
2. **Programmatic SEO `/services/[service]/[industry]` (80 pages) + `/services/[service]/near/[city]` (≥120 pages):** keep + flip to `index: true`, OR sunset (delete the dynamic route), OR tighten scope to a real-vertical short list?
3. **`/case-studies` + `/results` real-or-`[design only]`:** are the 3 anonymized cases (B2B SaaS ops automation 14.4K hours, +89% pipeline, 60% portfolio monitoring) cleared by the actual clients for use, or do they need `[design only]` flagging until signoff?

---

## Skill provenance

Each finding tags the skill that caught it. Full skill list per `PHASE_20_POLISH_PROMPT.md` Phase 1.

- `impeccable`. visual integrity / hierarchy / spacing / a11y
- `stop-slop`. anti-AI prose, banned patterns
- `forbidden-patterns`. hard-check on banned strings
- `integrity-rules`. real-data check
- `seo-audit`. meta / OG / Twitter / sitemap / robots
- `ai-seo`. LLMO/AEO/GEO citation readiness, E-E-A-T
- `schema-markup`. JSON-LD validation + extension
- `site-architecture`. URL structure, internal linking
- `page-cro` / `form-cro` / `popup-cro`. conversion
- `managed-service-pitch-framework`. service vs SaaS framing
- `lighthouse-crux-audit` / `vercel:performance-optimizer`. perf
- `vercel:nextjs` / `vercel:react-best-practices` / `vercel:next-cache-components`
- `vercel:vercel-functions` / `vercel:routing-middleware`

---

## Cross-cutting findings (apply to all or many routes)

### CRITICAL

| # | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| C1 | d) CRO + form-cro | **Zero bot mitigation** on `/free-growth-audit` + `/contact` forms. No Vercel BotID, no honeypot, no hCaptcha. Multi-step audit form is a high-value spam target. | `src/components/sections/AuditPage.tsx`, `src/components/sections/ContactPage.tsx`, `src/app/api/audit/route.ts`, `src/app/api/founder/route.ts` | `form-cro` + `vercel:vercel-functions` | Wire Vercel BotID (GA since June 2025) on both POST routes. Honeypot field as defense-in-depth. |
| C2 | c) site-architecture | **Internal linking depth <3 on 4 of 5 audited routes; 3 routes at ZERO contextual links.** `/automation`: 1 link (only `/free-growth-audit` via CTASection). `/remote-workforce`: 0. `/faq`: 0 (anchor hashes only, no cross-route). `/about`: 0. Home is OK via Footer. | grep `href=` per page + section deps | `site-architecture` + `seo-audit` | Add 3-5 contextual internal links per service page to sibling pillars + research + tools + case studies. Embed in copy where semantically relevant; do not force a "related" footer block on every page. |
| C3 | e) integrity-rules + d) CRO | **Cosmo advertised in copy but no render path.** Contact page, Footer, and legal pages reference "Cosmo" as a chat surface. Components preserved at `src/components/chat/` but not mounted in `src/app/(marketing)/layout.tsx` or any production route. `GROQ_API_KEY` + `CHAT_MODEL` envs still set. User clicking "Talk to Cosmo" sees nothing. | `src/components/sections/ContactPage.tsx:85`, `src/components/layout/Footer.tsx:80,92,95`, `src/app/(marketing)/privacy-policy/page.tsx:306-311`, `src/app/(marketing)/terms-of-service/page.tsx:304-311` | `forbidden-patterns` + `live-agent-section-pattern` | **DECISION GATE.** Either (a) re-enable: mount `<ChatWidget />` in marketing layout, env-gate via `NEXT_PUBLIC_COSMO_ENABLED`; or (b) kill: strip every copy reference, delete `src/components/chat/`, drop `/api/chat/route.ts`, drop `src/lib/cosmo-system-prompt.ts`, retire `GROQ_API_KEY` + `CHAT_MODEL` envs. |
| C4 | c) seo-audit + programmatic-seo | **Programmatic SEO indexing mismatch.** `/services/[service]/[industry]` (8×10 = 80 pages) + `/services/[service]/near/[city]` (8×~15 = ~120 pages) ship with `robots: { index: false, follow: true }`. Crawlable but not indexable, dead for organic traffic. | `src/app/(marketing)/services/[service]/[industry]/page.tsx:47-50`, `src/app/(marketing)/services/[service]/near/[city]/page.tsx` | `programmatic-seo` + `seo-audit` | **DECISION GATE.** Either (a) flip `index: true` if content is genuinely useful per slug, (b) tighten to a real-vertical short list (e.g. 5 industries × 5 cities = 25 pages with hand-curated content), or (c) sunset and delete the route families if content is template-shaped. |

### HIGH

| # | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| H1 | c) schema-markup | **Schema gaps.** Currently shipping: Organization, WebSite, LocalBusiness, BreadcrumbList (conditional), FAQPage. Missing: Service per pillar (5), Person for UF + Faizan + Anwaar, BlogPosting per blog post (~100), Article per research deep-dive (5), HowTo per calculator (5). | `src/app/layout.tsx:118,157,182,195`, `src/components/sections/FAQSection.tsx:121`, `src/components/seo/FAQSchema.tsx` | `schema-markup` + `ai-seo` | Phase 5e: add Service / Person / BlogPosting / Article / HowTo schemas. Validate via Google Rich Results before commit. |
| H2 | c) seo-audit | **Twitter card missing on 5 routes:** `/automation`, `/remote-workforce`, `/performance-marketing`, `/systems-reporting`, `/contact`. | per-route `metadata` exports | `seo-audit` | Add `twitter: { card: 'summary_large_image', title, description, images: [...] }` to each route's metadata. |
| H3 | c) seo-audit | **OG image URL missing on 4 routes.** Title + description present; `openGraph.images` array absent. | per-route `metadata` exports | `seo-audit` | Add `openGraph.images: [{ url: '/og-{route}.png', width: 1200, height: 630, alt }]`. Generate OG art per route in Bloomberg Operator palette. |
| H4 | b) stop-slop + forbidden-patterns | **Binary contrast** "Adaptive email and SMS flows that adjust based on engagement, lifecycle stage, and CRM signals. **Not static drips.**" Banned per CLAUDE.md. | `src/lib/copy.ts:371` | `stop-slop` | Reframe positively. Drop "Not static drips." sentence; let the adaptive description stand. |
| H5 | b) stop-slop | **Throat-clearing opener** "Here's why they happen, and how we prevent them." | `src/components/sections/RemoteWorkforcePage.tsx:276` | `stop-slop` | Replace with direct framing. Drop "Here's why" altogether; state the prevention mechanism. |
| H6 | e) integrity-rules + ai-seo | **Research deep-dives ship benchmarks without sourced citations.** E.g. `/research/average-cac-by-industry` cites "$198 B2C / $702 B2B" with no source link. Real-data rule violated; AI-search citation quality also depressed. | `src/app/(marketing)/research/*/page.tsx` (5 files) | `integrity-rules` + `ai-seo` + `copy-editing` | Add named source per stat (Gartner / WordStream / FirstPageSage / HubSpot 2026 reports) with hyperlinks. Where source unavailable, mark `[design only]`. |
| H7 | e) integrity-rules + j) managed-service-pitch | **Case studies + results** ship anonymized client outcomes (14.4K operator-hours, +89% pipeline, 60% manual oversight automated) without explicit "client-cleared" or `[design only]` framing. | `src/app/(marketing)/case-studies/page.tsx`, `src/app/(marketing)/results/page.tsx`, `src/lib/copy.ts:107-141` | `integrity-rules` | **DECISION GATE.** Confirm with each client they consent to anonymized publication. If unconfirmed, mark `[design only]` until signoff. |
| H8 | b) stop-slop + copy-editing | **3 founder-voice blog posts contain throat-clearing openers.** `agent-sprawl-tech-debt-2026.md`, `chatgpt-search-traffic-geo-2026.md`, `voice-ai-sdr-outbound-2026.md` use "Here's the thing" / "This is what X looks like in 2026" patterns banned by stop-slop ruleset. Data + specificity is strong; rhetoric is the issue. | `src/content/blog/agent-sprawl-tech-debt-2026.md`, `chatgpt-search-traffic-geo-2026.md`, `voice-ai-sdr-outbound-2026.md` | `stop-slop` + `copy-editing` | Light editorial pass on all 3. Strip "Here's the thing", "This is what X looks like", binary contrasts. Preserve every datum + source. |
| H9 | e) integrity-rules + free-tool-strategy | **5 calculators are vanity sliders, not methodology tools.** `/tools/cac-calculator`, `/tools/roas-calculator`, `/tools/ad-spend-profit-calculator`, `/tools/dashboard-cost-calculator`, `/tools/attribution-model-visualizer` use generic formulas with no industry-specific defaults, no DPL portfolio benchmarks, no source-linked methodology. | `src/app/(marketing)/tools/*/page.tsx` (5 files) | `free-tool-strategy` + `integrity-rules` | Phase 5c: pick ONE tool to upgrade to real methodology (industry-specific defaults sourced from DPL audits, calculation breakdown referencing named sources, "See how DPL optimizes this" CTA to relevant case study). Sunset or simplify the others. |

### MEDIUM

| # | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| M1 | f) performance | **Vercel Speed Insights not wired.** No `<SpeedInsights />` import in global layout. Real-user perf data not captured. | `src/app/layout.tsx` | `vercel:performance-optimizer` | `import { SpeedInsights } from '@vercel/speed-insights/next'` + render in root layout. |
| M2 | e) integrity-rules | **About-page metrics need source verification.** "8+ years", "$50M+ ad spend managed", "200+ growth audits", "4.2x average ROAS" rendered without attribution in code. | `src/components/sections/AboutPage.tsx` | `integrity-rules` | Confirm each number is real before ship. If unowned, mark `[design only]`. |
| M3 | b) stop-slop | **Comparisons copy contains comma splices + banned phrasing.** Sample: `"For most businesses, the answer isn't either/or, it's both…"`. comma splice + binary contrast pattern banned by stop-slop. Affects 10 `/compare/[slug]` pages. | `src/lib/comparisons.ts:69` (and likely others) | `stop-slop` + `copy-editing` | Editorial pass on every comparison entry. Replace comma splices, kill binary contrasts, kill "Here's the thing". |
| M4 | a) impeccable + d) CRO | **Legal pages reference Cosmo chat as a contact path.** "Reach out via Cosmo chat or the audit form" while Cosmo is disabled (see C3). Broken CTA. | `src/app/(marketing)/privacy-policy/page.tsx:306-311`, `src/app/(marketing)/terms-of-service/page.tsx:304-311` | `forbidden-patterns` | Resolves with C3 decision. If kill: replace with "Reach out via the contact form" + link. If re-enable: confirm Cosmo entry on these pages too. |
| M5 | c) schema-markup | **Breadcrumb schema not visible on hub pages.** `/research`, `/tools`, `/blog`, `/guides` index pages should ship `BreadcrumbList`. Conditional in `src/app/layout.tsx:182` per Agent 3; verify it fires for hub pages too. | `src/app/layout.tsx:182` | `schema-markup` | Confirm conditional logic includes hub-page paths; extend if not. |
| M6 | j) managed-service-pitch | **Service-page copy spot-check needed.** Confirm `/automation`, `/performance-marketing`, `/remote-workforce`, `/systems-reporting` all read as "DPL operates the work" not "you configure a tool". Audit 1 covered framing at section level; full copy pass deferred to Phase 4. | per-route page.tsx + section files | `managed-service-pitch-framework` | Phase 4 copy rewrite per `.agents/product-marketing-context.md` + stop-slop final pass. |

### LOW

| # | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| L1 | a) impeccable | **Doc-rot in `globals.css`:** legacy comment mislabels `#FF8800` as "purple". Color value is correct amber; the comment is wrong. | `src/app/globals.css:52` (and adjacent comment lines 60, 85, 87, 152, 303, 340, 342, 465, 531, 624, 745, 880) | `impeccable` | Optional: clean comments to remove "purple" mislabel. No functional change. |
| L2 | b) stop-slop (false-positive) | **43 em-dashes detected** across `src/lib/copy.ts`, `src/components/sections/`, `src/app/(marketing)/`, `src/content/blog/`. **All 43 are in code comments** (commit history references, "Phase 11: AI-first hierarchy" type separator headers). Zero render to user. | grep for em-dashes across src tree | `stop-slop` | Optional housekeeping: replace comment em-dashes with `:` or `-` for consistency with banned-pattern discipline. No user-facing fix needed. |
| L3 | f) performance | **Guides `readTime` hard-coded** (e.g. "22 min read"). Stale if content edits. | `src/lib/guides.ts` | `copy-editing` | Compute dynamically from section word count (200 wpm baseline). |
| L4 | e) integrity-rules | **`mailto:` present in API-side email templates only** (4 hits in `src/app/api/{audit,founder,leads,ticket}/route.ts`). All are server-side email body construction, never rendered to a public surface. Phase 12 contact strategy intact. | `src/app/api/founder/route.ts:105`, `src/app/api/leads/route.ts:65`, `src/app/api/audit/route.ts:114`, `src/app/api/ticket/route.ts:136` | `integrity-rules` | None. Internal use only. |
| L5 | g) accessibility | **Skip-to-content link not visible in code inspection.** May exist in global layout; not confirmed. | `src/app/layout.tsx` | `impeccable` | Verify `<a href="#main" className="skip-to-content">` renders above fold and is keyboard-focusable. Add if missing. |

---

## Per-route findings (deltas not already in cross-cutting tables)

### `/` (homepage)

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| LOW | f) performance | Bundle delta from inline SVG + section state needs runtime measurement | `src/components/sections/ServicesPinReveal.tsx` | `lighthouse-crux-audit` | Run `pnpm build` + analyze chunks; confirm initial-bundle delta ≤95KB per K14. |
| LOW | h) mobile | Sticky CTA behavior at 375px not verified | `src/components/sections/CTASection.tsx:38-44` | `playwright-skill` | Headless 375px screenshot + tap-target audit. |

### `/automation`

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| HIGH | b) stop-slop | (See H4) Binary contrast "Not static drips." | `src/lib/copy.ts:371` | `stop-slop` | Drop the sentence. |

### `/remote-workforce`

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| HIGH | b) stop-slop | (See H5) Throat-clearing "Here's why they happen…" | `src/components/sections/RemoteWorkforcePage.tsx:276` | `stop-slop` | Replace with direct framing. |

### `/performance-marketing`

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| MEDIUM | j) managed-service-pitch | Confirm copy positions DPL as operator of the campaign, not a media-buying agency selling hours | `src/app/(marketing)/performance-marketing/page.tsx` + section deps | `managed-service-pitch-framework` | Phase 4 copy pass. |

### `/systems-reporting`

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| MEDIUM | j) managed-service-pitch | Confirm copy positions DPL as operator of the reporting layer, not selling a dashboard SaaS | `src/app/(marketing)/systems-reporting/page.tsx` + section deps | `managed-service-pitch-framework` | Phase 4 copy pass. |

### `/about`

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| MEDIUM | e) integrity-rules | (See M2) Metrics need source verification | `src/components/sections/AboutPage.tsx` | `integrity-rules` | Confirm or `[design only]`. |
| HIGH | c) schema-markup | (See H1) `Person` schema for founders missing | `src/components/sections/AboutPage.tsx` + page.tsx | `schema-markup` | Add Person per founder. |

### `/faq`

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| LOW | g) accessibility | Accordion focus + ARIA states correct | `src/components/sections/FAQSection.tsx:70-76` | `impeccable` | None. Compliant. |
| LOW | c) schema-markup | FAQPage schema duplicated between FAQSection and `src/components/seo/FAQSchema.tsx`. Verify only one renders per route. | `FAQSection.tsx:121`, `seo/FAQSchema.tsx:18,82,107,144` | `schema-markup` | Confirm single render. Delete redundant generator if duplicate. |

### `/contact`

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| CRITICAL | d) form-cro | (See C1) No bot mitigation | `src/components/sections/ContactPage.tsx:60-95`, `src/app/api/founder/route.ts` | `form-cro` | Vercel BotID + honeypot. |
| CRITICAL | e) integrity-rules | (See C3) Cosmo CTA references | `src/components/sections/ContactPage.tsx:85` | `forbidden-patterns` | Resolves with C3 decision. |

### `/free-growth-audit`

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| CRITICAL | d) form-cro | (See C1) No bot mitigation on multi-step audit form | `src/components/sections/AuditPage.tsx:100-130`, `src/app/api/audit/route.ts` | `form-cro` | Vercel BotID + honeypot. |
| LOW | i) loading state | No spinner on submit; disabled state only | `src/components/sections/AuditPage.tsx` | `signup-flow-cro` | Optional: add spinner. |

### `/research/*` (5 deep-dives + index)

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| HIGH | e) integrity-rules + ai-seo | (See H6) Benchmark stats unsourced | all 5 research page files | `ai-seo` + `integrity-rules` | Add named-source citations + author byline. |
| HIGH | c) ai-seo + e-e-a-t | No author byline / founder bio on research pages. E-E-A-T weak. | `src/app/(marketing)/research/*/page.tsx` | `ai-seo` | Add Faizan / Anwaar / UF byline + 1-paragraph bio + Person schema (resolves with H1). |

### `/tools/*` (5 calculators + index)

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| HIGH | e) integrity-rules + free-tool-strategy | (See H9) Vanity sliders, not methodology | all 5 tool pages | `free-tool-strategy` | Phase 5c: upgrade ONE to real methodology + sources. |

### `/blog/*` (3 hand-written + ~100 programmatic)

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| HIGH | b) stop-slop | (See H8) 3 founder-voice posts have throat-clearing openers | listed in H8 | `stop-slop` | Light editorial pass. |
| HIGH | e) integrity-rules + j) | ~100 programmatic posts are SEO-template-shaped, no DPL methodology / case data / sourced benchmarks | `src/content/blog/*.md` (~100 files) | `ai-seo` + `content-strategy` | **DECISION:** sunset, hand-curate a short list, or inject DPL methodology snippets. Currently they hurt the brand-voice premium. |
| MEDIUM | c) schema-markup | (See H1) BlogPosting schema missing | per-post page | `schema-markup` | Add per post. |

### `/case-studies` + `/results`

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| HIGH | e) integrity-rules | (See H7) Real-or-`[design only]` gate not explicit | per-page files | `integrity-rules` | Confirm or flag. |

### `/compare/[slug]` (10 slugs in `comparisons.ts`)

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| MEDIUM | b) stop-slop | (See M3) Comma splices + banned phrasing | `src/lib/comparisons.ts` | `stop-slop` | Editorial pass on all 10. |

### `/guides/*`

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| LOW | f) performance | (See L3) Hard-coded `readTime` | `src/lib/guides.ts` | `copy-editing` | Compute dynamically. |

### `/services/[service]/[industry]` + `/services/[service]/near/[city]` (programmatic)

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| CRITICAL | c) seo-audit | (See C4) `index: false / follow: true` mismatch on ~200 pages | both dynamic route files | `programmatic-seo` | DECISION GATE: keep + index, tighten, or sunset. |

### `/privacy-policy` + `/terms-of-service` + `/cookies`

| Severity | Dimension | Finding | Citation | Skill | Fix |
|---|---|---|---|---|---|
| MEDIUM | a) impeccable | (See M4) Cosmo references in legal copy | listed in M4 | `forbidden-patterns` | Resolves with C3. |

---

## Locked-invariant verification matrix

| Invariant | Status | Evidence |
|---|---|---|
| K1 brand-purity (content surfaces) | PASS | grep returns only comment-only `purple` mislabels in `globals.css` + 4 historical comments in components. No active palette violation. |
| K2 hero copy `Hire the AI. Skip the headcount.` | PASS | `src/lib/copy.ts:21`. Em wraps "the AI" only. Phase 18.6 P1+P2 supersedure honored. |
| K3 5-service order | PASS | `src/lib/copy.ts:43-69` order: AI Agents → Workflow Automation → Remote Operators → Performance Marketing → Systems & Reporting. |
| K9 HeroDataTicker substrate position | PASS | DOM order preserved per Phase 18.6 P7 + handoff. |
| K11 Lighthouse mobile ≥92 | NEEDS RUNTIME | Last G-GATE 94 (Phase 18.5). Re-baseline needed post-Phase-19 ship. |
| K14 amended initial-bundle ≤95KB delta | NEEDS RUNTIME | Phase 19 +7KB Lenis still under cap; re-measure after Phase 19 trim. |
| K17 atmospheric exception (≤30%/≤22%) | PASS | Three.js disabled (Phase 18.6 P7); CSS atmosphere within caps. |
| TestimonialsSection null | PASS | `src/components/sections/TestimonialsSection.tsx:20-22`. |
| LogoStripSection env-gated null | PASS | `src/components/sections/LogoStripSection.tsx:23` checks `NEXT_PUBLIC_MARQUEE_ENABLED`. |
| Phase 12 contact strategy | PASS | Zero `mailto:` on public surfaces. `<code>hello@</code>` literal preserved in Footer philosophy block. |
| `font-display: optional` on InstrumentSerifLocal | PASS | `globals.css` font-face declarations intact. |
| FAQ at `/faq` with FAQPage schema | PASS | `src/components/sections/FAQSection.tsx:121`. |
| Force push / `--no-verify` / `--amend` on pushed | PASS | Hook-enforced. |
| Three.js sphere layer disabled (Phase 18.6 P7) | PASS | Component on disk, not loaded. |
| Marketing wrapper transparent | PASS | Phase 18.6 P2 inline-bg removal preserved. |

---

## Build sanity

| Check | Result |
|---|---|
| `pnpm exec tsc --noEmit` | EXIT 0 |
| `pnpm lint` | EXIT 0 (Phase 19 1ab582b nuke-lag fixed pre-existing 3 errors) |
| `pnpm build` | NOT RUN (deferred to Phase 7 perf measurement) |
| Lighthouse mobile median | NOT RUN (deferred to Phase 7) |
| Headless screenshots 1440 + 375 | NOT RUN (deferred to Phase 11 pre-deploy) |

---

## Schema currently shipped

| Type | Route | File |
|---|---|---|
| Organization | global (root layout) | `src/app/layout.tsx:118` |
| WebSite | global | `src/app/layout.tsx:157` |
| LocalBusiness | global | `src/app/layout.tsx:195` |
| BreadcrumbList | conditional per route | `src/app/layout.tsx:182` |
| FAQPage | `/faq` | `src/components/sections/FAQSection.tsx:121` + `src/components/seo/FAQSchema.tsx` |

**Missing (Phase 5e scope):** Service per pillar (5), Person (3 founders), BlogPosting per post (~100), Article per research (5), HowTo per calculator (5).

---

## Sitemap + robots + IndexNow

| Asset | Status |
|---|---|
| `src/app/sitemap.ts` | PASS. Dynamic, includes all 34 static routes + programmatic combos |
| `src/app/robots.ts` | PASS. Allow `/`, disallow `/api/` + `/_next/`, sitemap link present |
| `public/46d0dad9247b88e0397637ac517a8bb6.txt` | PASS. IndexNow key file present, contents match `INDEXNOW_KEY` env per ENV-AUDIT.md |

---

## Phase 1 closure: 3 decisions blocking Phase 2 scope

Phase 2 strips CRITICAL+HIGH within locked constraints. Three decisions gate that scope:

1. **C3 Cosmo:** kill or re-enable?
2. **C4 programmatic SEO:** keep + index, tighten, or sunset?
3. **H7 case studies + results:** clients cleared, or `[design only]` until signoff?

Once those are answered, Phase 2 batch order is:

- **Batch 1 (CRITICAL):** C1 bot mitigation → C2 internal-linking depth on 4 routes → C3 Cosmo execution per decision → C4 programmatic SEO per decision.
- **Batch 2 (HIGH copy):** H4 binary contrast → H5 throat-clearing → H8 founder-voice blog editorial pass.
- **Batch 3 (HIGH SEO):** H2 Twitter cards → H3 OG images → H6 research citations → H7 case-study flagging per decision.
- **Batch 4 (HIGH schema + tools):** H1 schema extension → H9 calculator upgrade (pick ONE).

Per locked Pause Point 2, no autonomous batch >5 commits without screenshot gate + status checkpoint.

---

*End Phase 1. Phase 2 awaits user decisions on C3 / C4 / H7 + approval of batch sequencing.*

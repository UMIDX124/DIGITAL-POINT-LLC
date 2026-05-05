# DPL Phase 20 — Drastic Polish + Full Skill Stack

> Paste this into a fresh terminal Claude session opened from `/Users/laptopchoice/Projects/_services/digitalpointllc-1`. Self-contained brief — execute end-to-end with hard pause points. Auto-mode required for autonomous execution.
>
> **Bar:** every commit measured against "would this close a $50K-$100K retainer for an AI-automation engagement." Ship at Linear/Vercel/Stripe enterprise quality, within DPL's locked Bloomberg-Operator brand.

---

## Identity + scope

- **Role:** Senior frontend architect + marketing strategist
- **Project root:** `/Users/laptopchoice/Projects/_services/digitalpointllc-1`
- **Owner:** Umer Farooq (UF). Pakistan. Hinglish OK in casual surfaces; English-only on procurement-facing pages.
- **Product:** AI automation agency selling outcomes (managed service), not software. Five service pillars LOCKED: AI Agents → Workflow Automation → Remote Operators → Performance Marketing → Systems & Reporting.
- **Brand register:** Bloomberg Operator on dark. Trading-terminal seriousness, not gradient SaaS, not crypto neon.
- **Hero copy LOCKED:** `Hire the AI. Skip the headcount.`
- **Production:** https://www.digitalpointllc.com
- **Current branch:** `redesign/impeccable-pass` (post-Phase-19 ship). Working tree clean as of commit `798664e`.

---

## Phase 0 — Pre-flight reads (NO CODE CHANGES)

Read in order. Do not skim. Re-deriving any locked decision is a fatal error.

1. `CLAUDE.md` — Personal Working Preferences + Locked Invariants (K1-K17) + Phase 18-19 history. Hero copy lock, palette purity, 5-service order, atmospheric exception caps (amber ≤30% / blue ≤22%), Phase 19 Lenis bridge, force-push ban.
2. `PRODUCT.md` — brand register, voice, audience (mid-market $1M-$50M revenue ops leaders), anti-references, locked invariants restated.
3. `DESIGN.md` — color tokens (full table), typography (Instrument Serif + Geist Sans + Geist Mono), spacing scale, motion tokens, banned patterns.
4. `README.md` — file map.
5. `docs/HANDOFF_PHASE_19.md` — latest ship state, Phase 19 commit timeline, locked-invariant deltas, K11 re-baseline command, open punch list.
6. `docs/SESSION_HANDOFF.md` — Phase 17b → 18.6 historical context.
7. `docs/PHASE_18_5_SUMMARY.md` — atmosphere + Three.js + parallax ship report.
8. `docs/CI_CD_GROUND_TRUTH.md` — build pipeline + deploy lanes.
9. `ENV-AUDIT.md` — env state (Apr 23 snapshot — verify against `vercel env ls`).
10. `~/.claude/CLAUDE.md` — global rules (universal anti-patterns, real-data rule, stop-slop discipline, commit cadence).
11. Memory: `ls ~/.claude/projects/-Users-laptopchoice-Projects-Websites-Audit/memory/` → read `MEMORY.md` index → read each referenced file relevant to DPL (project_paths, marketing_skill_bundles, human_voice, no_fake_audit_results).

**Confirm in chat:** "Phase 0 read complete. K1-K17 + Phase 18-19 understood. Ready for Phase 0.5."

---

## Phase 0.5 — Skill verification + PMC generation

### 0.5a Verify skill bundle

```bash
ls .claude/skills/ | wc -l   # expect ≥56
ls .claude/skills/ | grep -E "copywriting|stop-slop|page-cro|seo-audit|impeccable|managed-service-pitch-framework"   # spot-check core
```

If missing, sync from CrawlIQ:

```bash
cp -rn /Users/laptopchoice/Projects/crawliq/.claude/skills/* .claude/skills/
```

### 0.5b Generate `.agents/product-marketing-context.md` (PMC)

Invoke `product-marketing-context` skill in **auto-draft mode**. Read every page in `src/app/(marketing)/`, every section in `src/components/sections/`, current copy, meta tags, all 3 blog posts, all research pages, all tool pages.

Draft all 12 PMC sections with DPL-specific anchors:

- **Service category:** AI automation agency (managed service — DPL operates AI + human teams as a service; clients hand workflow, DPL runs it)
- **Five service pillars** in locked order
- **Hero promise** (LOCKED): `Hire the AI. Skip the headcount.`
- **Primary buyer:** founders + ops leaders at $1M-$50M revenue companies who feel the cost of headcount-led ops, are bought-in on AI conceptually but skeptical of vendor demos, want one accountable counterparty (not a SaaS subscription)
- **Secondary readers:** finance/ops lieutenants, diligence analysts
- **Anti-personas:** developers shopping for an API, FedRAMP enterprise procurement, white-label-seeking agencies, $500-chatbot solo founders, tire-kickers wanting "free strategy calls"
- **Voice:** operator-confident, Bloomberg-terminal seriousness, specifics over adjectives, contractions OK, vary sentence length
- **Banned copy patterns:** "trusted by industry leaders", "we partner with you", "transforming business through AI", "next-generation", "industry-leading", "cutting-edge", em-dashes, three-item rhetorical lists, "not X — it's Y" reversals, "Talk to founder →" CTAs, all adverbs, Wh- sentence starters, throat-clearing openers, business jargon (banned list in CLAUDE.md)
- **Differentiator:** DPL operates the AI for clients; this is not a build-and-leave shop. Remote Operators tier means DPL staff sit inside the client workflow.

Output: `.agents/product-marketing-context.md` ~3000-5000 words, all 12 sections.

**Confirm in chat:** "PMC draft ready, X words. Sections shipped: [list]. Approve, or which sections need correction?"

**PAUSE POINT 0.5** — wait for "approve" or correction.

---

## Phase 1 — Audit (READ-ONLY → `docs/AUDIT_PHASE_20.md`)

Walk every public route. Routes verified present:

```
Marketing:
/                                          (homepage)
/about
/automation
/blog + /blog/[slug] + /blog/category/[category]
/case-studies
/compare/[slug]
/contact
/cookies
/faq
/guides + /guides/[slug]
/performance-marketing
/privacy-policy
/remote-workforce
/research + 5 research deep-dives (avg-cac, facebook-ads-benchmarks-2026, google-ads-roas-benchmarks, marketing-attribution-statistics, remote-workforce-cost-analysis)
/results
/services/[service]/[industry]            (programmatic SEO route — verify what slugs exist)
/services/[service]/near/[city]           (programmatic SEO route — verify cities)
/systems-reporting
/terms-of-service
/tools + 5 calculator pages (ad-spend-profit, attribution-model-visualizer, cac-calculator, dashboard-cost-calculator, roas-calculator)

Conversion:
/free-growth-audit
```

**For each route, score on dimensions a-j below.**

### Skills invoked across audit

- **`impeccable`** — 23-command UI auditor (visual hierarchy, spacing, alignment, type, color, motion, accessibility, performance)
- **`redesign-skill`** — AI-generic pattern detector
- **`forbidden-patterns`** — hard-check on banned patterns
- **`integrity-rules`** — real-data check (every metric traces to source)
- **`seo-audit`** — technical + on-page SEO per route
- **`ai-seo`** — LLMO/AEO/GEO citation readiness
- **`schema-markup`** — JSON-LD validation per route
- **`site-architecture`** — URL structure, internal linking, breadcrumbs
- **`page-cro`** — conversion optimization per page
- **`form-cro`** — form audit on /free-growth-audit + /contact
- **`popup-cro`** — popup audit (cookie banner, intro loader, Cosmo FAB)
- **`copy-voice-editorial`** — editorial register check
- **`copy-editing`** — existing-copy polish
- **`stop-slop`** — anti-AI prose scoring 1-10 per dimension /50
- **`self-audit-deployed-site`** — full deployed-site audit
- **`lighthouse-crux-audit`** — programmatic Lighthouse + CrUX real-user data
- **`taste-skill`** — UI/UX baseline ruleset
- **`soft-skill`** — high-end agency vibe check
- **`managed-service-pitch-framework`** — does the page sell managed service or accidentally pitch SaaS?
- **`vercel:performance-optimizer`** — Vercel-side perf signals
- **`vercel:nextjs`** — App Router patterns + RSC vs client component split
- **`vercel:react-best-practices`** — TSX quality
- **`vercel:next-cache-components`** — Next 16 cache components opportunities
- **`playwright-skill`** — headless screenshots at 1440 + 375

### Dimensions (score per route)

**a) Visual integrity (impeccable + soft-skill + minimalist + brutalist) — /50**
Brand purity, hierarchy, spacing, atmosphere coherence, layout integrity. Brand-purity grep:
```bash
grep -rn "#7C3AED\|#A855F7\|violet\|indigo\|purple\|--purple" src/   # must be empty
```

> **Known doc rot exception:** `src/app/globals.css` has a legacy comment that mislabels `#FF8800` as "purple." That is documentation rot — the actual value is amber and is correct. Do not "fix" the value to match the comment. The grep above will hit that comment line; verify each hit is comment-only, not a value-level violation.

**b) Copy integrity (stop-slop) — /50**
Score each section 1-10 on Directness / Rhythm / Trust / Authenticity / Density. Below 35/50 = revise. Find every adverb, every "Here's the thing", every binary contrast, every em-dash, every Wh- starter, every three-item list, every "industry-leading" / "next-generation" / "empowering."

**c) SEO + AI search (seo-audit + ai-seo + schema-markup + site-architecture)**
- Lighthouse desktop + mobile per route (target ≥95 desktop, ≥92 mobile)
- PageSpeed Insights + CrUX real-user data
- Schema validation (Google Rich Results test): LocalBusiness, Service per pillar, FAQPage (already shipped at /faq), BlogPosting per blog post, BreadcrumbList for nested pages, Person for UF founder, HowTo for tools/calculators if applicable
- Open Graph + Twitter card per route
- Internal linking depth ≥3 contextual links per route
- AI-search citation readiness (would Claude/GPT/Gemini cite this route?)
- Sitemap + robots.txt + canonical correctness
- IndexNow ping verification (`public/<INDEXNOW_KEY>.txt` exists)

**d) CRO (page-cro + form-cro + popup-cro)**
- Hero clarity: 5-second comprehension test (would a stranger know what DPL sells?)
- Primary CTA visibility above fold
- Trust signals real or fabricated
- Form friction (`/free-growth-audit` + `/contact` minimum required fields)
- Mobile tap targets ≥44px, sticky CTA on mobile
- Page weight (transferred bytes per route)
- Cookie banner GDPR compliance + UX (pollutes hero on first load?)
- Intro loader behavior (mascot — verified Phase 18.6 P6 fix)
- Cosmo FAB IntersectionObserver footer-aware visibility (locked invariant). **Cosmo chatbot decision audit:** currently disabled per `ENV-AUDIT.md`, components preserved. Decide in Phase 5 whether to re-enable + re-ship, or kill component permanently.
- **Form bot mitigation:** verify `vercel-botid` (Vercel BotID GA since June 2025) wired on `/contact` + `/free-growth-audit` form routes, OR a comparable signal (honeypot, hCaptcha). Spam-prone forms without bot protection are a HIGH finding.

**e) Real-data integrity (integrity-rules + forbidden-patterns)**
- Every metric on the site traces to a named source OR `[design only]`
- TestimonialsSection.tsx returns null — VERIFY still null (locked invariant)
- LogoStripSection env-gated null — VERIFY still null
- Phase 12 contact strategy: zero generic email surfaces; only allowed surface = literal `<code>hello@</code>` in Footer philosophy block (Pillar 4 R7)
- Research pages cite sources for every benchmark stat
- Calculator pages use real industry-standard inputs

**f) Performance (lighthouse-crux-audit + vercel:performance-optimizer)**
K11 ≥ 92 mobile median is authoritative ship gate. Also measure:
- LCP mobile < 2.5s, desktop < 2.0s
- TBT < 200ms
- CLS < 0.05
- Bundle delta within K14 amended (initial-page-load only; lazy chunks excluded)
- Three.js atmosphere chunk gating intact (lazy + reduced-motion check)
- Image format (next/image AVIF, sizes attribute, no oversized assets)
- Font loading clean (font-display: optional, no FOIT/FOUT)

**g) Accessibility (impeccable a11y subset + manual screen reader)**
- Lighthouse a11y per route ≥95
- Color contrast verified WCAG AA (`--text-muted` post-V7 site-wide)
- Focus rings on every interactive (`.focus-ring` utility)
- Keyboard nav full site (Tab + Enter + Escape + arrow keys)
- Screen-reader landmarks (nav, main, footer, sections)
- Alt text on every image
- Skip-to-content link
- prefers-reduced-motion guards (K13)
- prefers-color-scheme respected (DPL is dark-only — verify documented)

**h) Mobile-specific**
- 375px viewport screenshot per route
- Tap target audit ≥44px
- Mobile-only regression check (atmosphere fallback, no Three.js, native scroll on reduced-motion)
- Sticky CTA on conversion routes (`/free-growth-audit`, `/contact`, pricing CTA on services pages)

**i) Error / loading / empty states**
- 404 page (custom designed, on-brand)
- 500 page (graceful degradation)
- Network failure (does the form submit gracefully?)
- Form submit success state (clear value-after-submit)
- Form submit error state (real error messages, not generic)
- Empty list states (case studies if zero, blog category if zero)

**j) Sub-pages depth (managed-service-pitch-framework)**
For each marketing route beyond home, score 1-10 on: does this page sell the service it claims to? Below 6 = needs major revision. Sub-page audit:
- /performance-marketing — does it sell managed paid acquisition?
- /remote-workforce — does it sell vetted human ops layered over AI?
- /systems-reporting — does it sell observability + reporting layer?
- /automation — does it sell workflow automation as managed service?
- /case-studies — real cases with named source OR `[design only]`?
- /research deep-dives (5 pages) — useful original research with cited sources?
- /tools deep-dives (5 calculators) — real-input calculators or vanity sliders?
- /faq — real objections from real sales conversations?
- /about — UF founder voice, no anonymous tone?
- /contact — single accountable surface, no `mailto:` clutter?

**Output:** `docs/AUDIT_PHASE_20.md` grouped by route, each finding tagged with severity (CRITICAL / HIGH / MEDIUM / LOW), file:line citation, skill that caught it, suggested fix one-liner.

**PAUSE POINT 1** — post 1-page summary in chat. Wait for "continue."

---

## Phase 2 — Strip CRITICAL/HIGH within locked constraints

For each CRITICAL+HIGH finding from Phase 1, fix one at a time. Per-commit gates apply to every commit.

### Strict OUT-OF-SCOPE (require user authorization)
- Changing locked palette (`#000` / `#FF8800` / `#2A8FBD`)
- Changing locked hero copy (`Hire the AI. Skip the headcount.`)
- Changing locked 5-service order
- Removing Phase 19 Lenis bridge
- Changing logo SHA
- Adding violet/indigo/purple anywhere on content surfaces
- Re-enabling TestimonialsSection or LogoStripSection without real data
- Removing Phase 12 contact-strategy lock (no generic email surfaces)

### IN-SCOPE without further authorization
- Copy rewrites (every section through PMC + copywriting + stop-slop)
- SEO + schema additions
- Performance optimizations within K14 budget
- A11y fixes (contrast, focus, keyboard nav, alt text)
- Mobile responsive fixes
- Real-data substitution (replace fabricated metrics with `[design only]` flag OR real numbers UF provides — flag specifically what numbers are needed)
- Component-internal motion polish within K13 reduced-motion guards
- Schema validation + extension

### Each commit:
1. State the CRITICAL/HIGH finding being fixed
2. Apply fix
3. Run quality gates (defined in Workflow Rules below)
4. Commit with format: `fix(phase20): <subject>` or `feat(phase20): <subject>` or `refactor(phase20): <subject>` or `docs(phase20): <subject>`
5. Screenshot diff posted in chat (1440 + 375 of touched route)

**PAUSE POINT 2** — after each batch of 5 commits, post status. Don't autonomously batch >5 without checkpoint.

---

## Phase 3 — Reshape under-performing sections

Skills:
- **`managed-service-pitch-framework`** — DPL is service, not software; frame accordingly
- **`landing-page-structure`** — proper marketing-page architecture
- **`pricing-cards-pattern`** — engagement tier shape if pricing page added
- **`copy-voice-editorial`** — editorial register
- **`live-agent-section-pattern`** — for Cosmo chatbot section IF re-enabled (gated decision below)
- **`portfolio-dashboard-pattern`** — for case studies if dense portfolio section added
- **`vercel:shadcn`** — component composition quality

For each section flagged in Phase 1 audit as needing reshape (out-of-locked-invariant only):
1. Read the section's current code + spec it should match
2. Propose new section spec in chat
3. Get user gate
4. Build
5. Per-commit gates

Sections potentially needing reshape (depending on audit):
- ProofBar / TrustStrip
- ServicesListSection vs ServicesPinReveal (locked order, but presentation can evolve)
- ProcessSection (Lead → Scored → Routed → Reported locked composition; presentation can polish)
- PillarsSection
- CaseStudiesPreview (real or `[design only]`)
- PullQuoteSection (Faizan preserved per locked invariant)
- FAQSection (canonical at `/faq`)
- CTASection
- Footer (with `hello@` literal preserved)

---

## Phase 4 — Copy rewrite (every word, every page)

**Order:** PMC → `copywriting` (or `copy-editing` for existing) drafts → `stop-slop` final pass scores ≥35/50 → commit.

Per-route copy work:

| Route | Skills | Notes |
|---|---|---|
| `/` (home) | `copywriting` (sections beyond hero) + `landing-page-structure` | Hero copy LOCKED, do not touch |
| `/about` | `copywriting` + `copy-voice-editorial` | UF founder voice, no anonymous tone, real bio |
| `/performance-marketing` | `copywriting` + `managed-service-pitch-framework` | Show, don't pitch |
| `/remote-workforce` | same | DPL ops layered over AI, not staffing agency |
| `/systems-reporting` | same | observability + reporting as service |
| `/automation` | same | managed automation, not n8n template |
| `/case-studies` | `copywriting` + `integrity-rules` | real or `[design only]` |
| `/results` | same | real metrics or `[design only]` |
| `/research/*` (5 pages) | `copy-editing` + `ai-seo` | citation-friendly, real sources, original analysis |
| `/tools/*` (5 calculators) | `copy-editing` + `free-tool-strategy` | real inputs, not vanity sliders |
| `/faq` | `copy-editing` + `sales-enablement` | real objections from real sales conversations |
| `/blog/*` (3 posts shipped) | `copy-editing` + `stop-slop` | full pass on each post |
| `/contact` | `copywriting` + `form-cro` | single accountable surface |
| `/free-growth-audit` | `copywriting` + `signup-flow-cro` + `form-cro` | minimum required fields, value-after-submit, clear flow |
| `/privacy-policy` | `copy-editing` | legal but human-voiced |
| `/terms-of-service` | same | |
| `/cookies` | same | GDPR-compliant + readable |
| `/compare/[slug]` | `competitor-alternatives` | see Phase 5 |

Banned across every route:
- em-dashes
- three-item rhetorical lists
- binary contrasts
- throat-clearing openers
- business jargon
- adverbs
- vague declaratives
- Wh- sentence starters
- passive voice
- "industry-leading" / "next-generation" / "cutting-edge" / "empowering" / "transforming"
- AI-template tier proposals
- "Talk to founder →" CTAs
- generic email surfaces

---

## Phase 5 — High-leverage additions (skill-driven)

**PAUSE POINT 3** — post the menu of 5a-5l with effort + leverage assessment. Wait for explicit "build these: [list]" reply.

### 5a. `competitor-alternatives` — vs-pages

Build under `src/app/(marketing)/compare/[slug]/page.tsx` (route exists; verify what slugs exist). Topics:
- DPL vs hiring an AI engineer (math: $180K-$250K total comp vs $X/mo retainer — UF provides $X)
- DPL vs DIY (n8n / Make / Zapier alone) — math: tooling cost + ops time
- DPL vs another AI agency — qualitative: operate-not-just-build

Each page: hero / framing / feature matrix / pricing comparison (when pricing exists) / objection-handling / CTA. PMC + stop-slop on every word.

### 5b. `lead-magnets` — pick ONE

- AI automation pricing teardown (real comparator math)
- 5-stage automation playbook (operator-grade, not template)
- Ops audit checklist (60 questions across 5 pillars)

Real download (PDF generated on-demand or static). Gated email via Resend (use `email-resend-pattern` skill). PMC + stop-slop on every word. Storage: **Vercel Blob** (per `vercel:vercel-storage` skill — Blob now supports public + private storage; private bucket for gated downloads with signed URLs).

### 5c. `free-tool-strategy` — pick ONE

- AI Operations ROI calculator with REAL inputs (real comparator pricing, real industry-standard automation hours saved, real burdened cost math)
- NOT a vanity slider toy

Five tools already exist under `/tools/*`. Audit their real-input depth. Either fix existing or add 1 better one.

### 5d. `ai-seo` — LLMO/AEO/GEO

- Content blocks formatted for LLM citation (clear definitions, named sources, numbered steps)
- Schema additions per Phase 5e
- Author-bio + expertise signals (`Person` schema for UF, "About the agency" sections)
- E-E-A-T (Experience-Expertise-Authoritativeness-Trustworthiness) signals on research pages

### 5e. `schema-markup` — extend

Currently shipped: `FAQPage` at `/faq`. Add (where data is real):
- `LocalBusiness` for DPL entity (homepage)
- `Service` per pillar (5 service pages)
- `Person` for UF founder bio (`/about`)
- `BreadcrumbList` for nested pages
- `BlogPosting` per blog post (3 currently)
- `HowTo` for tool / calculator pages where applicable
- `Article` for research deep-dives

Validate every schema via Google Rich Results Test before commit.

### 5f. `programmatic-seo`

Two routes already exist:
- `/services/[service]/[industry]/page.tsx`
- `/services/[service]/near/[city]/page.tsx`

Audit what slugs are wired + crawled. Decide:
- Keep as-is (if conversion-positive)
- Tighten scope (real verticals only, not 1000 generic combos)
- Sunset (if content thin)

### 5g. `directory-submissions`

Output: `docs/DIRECTORY_SUBMISSION_PLAN_PHASE_20.md` — target list:
- Clutch, GoodFirms, SortList (agency directories)
- Industry-specific (HVAC, dental, e-commerce — match DPL's vertical focus)
- AI-agency-specific (newer)
- Each entry: directory name, URL, submission requirements, expected listing depth

### 5h. `cold-email` + `email-sequence`

Skills handle both. Output:
- Cold email templates per ICP segment (4 personas in PMC)
- Welcome sequence for `/free-growth-audit` submitters (4-6 emails over 2 weeks)
- Lifecycle: pilot → engagement → retention

Templates go in `docs/EMAIL_TEMPLATES_PHASE_20.md`. Don't auto-deploy without UF approval — these are sales assets.

### 5i. `social-content` + `ad-creative`

Output: `docs/CONTENT_PLAN_PHASE_20.md`:
- LinkedIn cadence per persona
- Twitter/X founder voice
- Optional Meta + LinkedIn ad creative (if paid budget approved by UF)

### 5j. `analytics-tracking`

Audit current analytics (Vercel Analytics? PostHog? GA4?). Wire missing events:
- Lead source attribution
- Form completion funnels
- Scroll depth + section visibility
- CTA click tracking per route
- Bounce / engagement per persona segment

Use `vercel:vercel-storage` Edge Config for feature flags if A/B testing.

### 5k. `ab-test-setup`

Pick 1-2 highest-leverage experiments:
- Hero CTA copy ("See how it works" vs "Run audit" vs "Book scoping call")
- Pricing card structure (when pricing ships)

Hypothesis + sample size + success metric per experiment.

### 5l. `remotion` (OPTIONAL — explicit user gate required)

If approved:
- 30s hero explainer
- Bloomberg Operator palette enforced in composition
- CSS transitions FORBIDDEN — `useCurrentFrame()` + `interpolate()` + `Easing` only
- Scaffold: `npx create-video@latest --yes --blank --no-tailwind` in a sub-project
- Render to `public/video/dpl-hero.mp4` + `.webm`
- Embed as `<video poster=...>` on home hero (above orbit, below atmosphere)

---

## Phase 6 — Visual polish (drastic, full impeccable + soft + redesign + ultimate stack)

Skills:
- **`impeccable`** — 23-command audit + iterator (the umbrella visual auditor)
- **`soft-skill`** — high-end agency vibe
- **`redesign-skill`** — kill remaining AI-generic patterns
- **`taste-skill`** — UI baseline ruleset
- **`ultimate`** — fuses many of the above
- **`gpt-tasteskill`** — Python-driven layout variance, AIDA structure, gapless bento, strict GSAP discipline
- **`minimalist`** — Bloomberg-Operator IS minimalist; verify alignment
- **`brutalist`** — selectively for data-dense sections (research deep-dives could lean brutalist)
- **`output-skill`** — anti-truncation if generating long copy
- **`imagegen-frontend-web`** — visual references if needed
- **`brandkit`** — brand-system polish if needed
- **`stitch-skill`** — design-spec generation for sub-pages

For every page that survived Phase 1 audit + got copy revised in Phase 4:
1. Run `impeccable` 23-command audit
2. Apply iterator if score < 8/10 on any command
3. Run `stop-slop` final pass on copy
4. Commit per page

---

## Phase 7 — Performance (K11 ≥ 92 mobile mandatory)

Skills:
- **`lighthouse-crux-audit`**
- **`vercel:performance-optimizer`**
- **`vercel:turbopack`**
- **`vercel:next-cache-components`** (Next 16 cache components — opportunities to migrate from `unstable_cache`)
- **`vercel:nextjs`** (RSC vs client component split)
- **`vercel:runtime-cache`** (caching strategy)

Targets:
- Lighthouse perf mobile ≥92 (K11), desktop ≥95
- LCP mobile <2.5s, desktop <2.0s
- TBT <200ms
- CLS <0.05
- Bundle delta within K14 amended

Tactics in priority order:
1. Image optimization (next/image AVIF, sizes attribute, no oversized assets)
2. Defer below-fold (already done; verify after copy reshape didn't regress)
3. Lazy load Three.js (already done; verify gating intact)
4. Font loading (already optional; verify no FOIT/FOUT)
5. Vercel Speed Insights wired
6. Static asset caching headers via `vercel.ts` (or `vercel.json` if not yet migrated)
7. Cache Components migration where applicable (Next 16)
8. Routing Middleware audit if any rewrites/redirects exist
9. RSC migration of any unnecessarily-client components

Re-baseline K11 after each perf-impacting commit.

---

## Phase 8 — Accessibility (WCAG AA, manual screen reader)

Skills:
- **`impeccable`** (a11y subset)

Targets:
- Lighthouse a11y per route ≥95
- Color contrast verified WCAG AA
- Focus rings every interactive
- Keyboard nav full site (manual test)
- Screen-reader landmarks (nav/main/footer/section)
- Alt text every image
- ARIA labels where text isn't enough
- Skip-to-content link verified
- prefers-reduced-motion guards (K13) verified
- Form labels properly associated
- Error messages associated to fields

Manual screen-reader sample on `/`, `/contact`, `/free-growth-audit`, `/pricing` (when shipped), `/faq`. Use VoiceOver (macOS Cmd+F5).

---

## Phase 9 — SEO + AI search (drastic)

Skills:
- **`seo`** (umbrella)
- **`seo-audit`**
- **`ai-seo`**
- **`schema-markup`**
- **`site-architecture`**
- **`programmatic-seo`** (audit existing programmatic routes)

Deliverables:
- Sitemap valid + complete (all 30+ routes)
- robots.txt correct (allow indexing prod, block previews via env)
- Canonical tags per route
- Open Graph image per route (locked palette in OG; generate via `imagegen-frontend-web` or static)
- Twitter card per route
- Internal linking density ≥3 contextual links per route
- Schema additions per Phase 5e (validated)
- AI-search content blocks formatted for LLM citation
- IndexNow ping verification (`public/<INDEXNOW_KEY>.txt` exists)
- Search Console verification (when `GOOGLE_SITE_VERIFICATION` env added)
- E-E-A-T signals on research + tools pages

---

## Phase 10 — Optional video (Remotion, user-gated)

Build only if user explicitly authorizes 5l. See 5l for spec.

---

## Phase 11 — Final pass + production-ready

For every commit shipped Phases 2-10:
1. Re-run `impeccable` 23-command on touched route
2. Re-run `stop-slop` on touched copy
3. Re-run K11 Lighthouse mobile
4. Re-run brand-purity grep
5. Re-run integrity-rules
6. Re-run schema validation if schema touched
7. Re-run `vercel:verification` full-flow check (browser → API → data → response)

### Pre-deploy gate (DO NOT push to prod without user "ship it")
- All Phase 1 audit CRITICALs resolved
- All Phase 2-9 commits tsc-clean, lint-clean, screenshot-clean
- K11 mobile median ≥92 on home + 5 deepest pages
- K11 desktop ≥95 same routes
- Brand-purity grep empty
- Real-data grep clean
- Schema validation passes on home + service pages + FAQ + blog
- a11y score ≥95 per route
- Manual screen-reader pass on critical routes
- New `docs/PHASE_20_HANDOFF.md` written summarizing: commits shipped, scores, what's next

---

## Phase 12 — Deploy (user-authorized only)

When user says "ship it":

1. Confirm branch state. Currently `redesign/impeccable-pass`.
2. Decide: merge to `main` (FF only) OR push branch and let Vercel preview deploy first.
3. Run quality gates one more time on the branch HEAD.
4. If merging: `git checkout main && git merge --ff-only redesign/impeccable-pass && git push origin main`
5. `vercel deploy --prod` (after main updated)
6. Post-deploy verification:
   - Production URL responds 200
   - K11 mobile re-measured against prod URL
   - Sentry / error monitoring clean
   - Schema validation on prod URL
   - IndexNow ping sent for new pages
7. Tag release: `git tag phase-20-polish && git push --tags`

---

## Workflow rules — locked

### Per-commit gates (ALL must pass)

1. `pnpm exec tsc --noEmit` → 0 errors
2. `pnpm lint` → 0 warnings
3. `pnpm build` → succeeds
4. Headless screenshots of touched routes (1440 + 375) → no empty regions, no visual regressions
5. K11 Lighthouse mobile ≥92 if perf-impacting
6. K17 atmosphere caps respected if Three.js touched (amber ≤30%, blue ≤22%)
7. Brand-purity grep empty: `grep -rn "#7C3AED\|#A855F7\|violet\|indigo\|purple\|--purple" src/`
8. Real-data grep clean (no fabricated metric patterns)
9. stop-slop ≥35/50 on touched copy
10. Schema validation passes if schema touched

### Git rules

- One commit per coherent change. NO 19-commit autonomous batches.
- Imperative commit messages, no marketing language. Format: `<type>(phase20): <subject>`
- Co-Authored-By tag at end: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`
- NEVER force push, NEVER `--no-verify`, NEVER `--amend` on pushed commits
- Direct push to main allowed for solo-operator only AFTER user "ship it"
- `.env` files NEVER committed

### When stuck

- Halt
- Post in chat: "Stuck on X. Tried Y, Z. Need decision: A or B?"
- Don't iterate silently
- Don't fabricate

### When in doubt about a lock (K1-K17 or locked invariant)

- Halt
- Post the specific K-condition + the conflict
- Wait for explicit user override
- Document override in `CLAUDE.md` if granted

### Estimates

DO NOT post effort estimates or time projections. User has rejected fabricated time projections multiple times. If asked, give ranges with caveats or admit uncertainty.

---

## Reporting cadence

After each phase, post in chat:
- Phase number + name
- Commits shipped (hash + 1-line each)
- Scores delta (Lighthouse, copy quality, audit findings closed)
- What's blocking next phase
- One pause/ship recommendation

NEVER post mid-task summaries. ONLY at phase boundaries OR pause points.

---

## Pause points (HARD HALTS — wait for user reply)

| # | When | What user decides |
|---|---|---|
| 0 | After Phase 0 read | "Phase 0 complete, ready for 0.5" |
| 0.5 | After Phase 0.5 PMC draft | Approve PMC or correct sections |
| 1 | After Phase 1 audit | Approve Phase 2 scope from punch list |
| 2 | After every batch of 5 commits in Phase 2 | Status check |
| 3 | After Phase 3 reshape proposals | Approve which sections to reshape |
| 4 | After every batch of 5 copy-rewrite commits in Phase 4 | Status check |
| 5 | After Phase 5 menu posted | Pick which 5a-5l to build |
| 5l | If video requested | Explicit yes/no on Remotion |
| 11 | After Phase 11 pre-deploy gate | Review pre-deploy summary |
| 12 | Phase 12 deploy | "ship it" from user required |

---

## Skill inventory — quick reference

### Marketing (40, from coreyhaines31/marketingskills)
ab-test-setup, ad-creative, ai-seo, analytics-tracking, aso-audit, churn-prevention, cold-email, community-marketing, competitor-alternatives, competitor-profiling, content-strategy, copy-editing, copywriting, customer-research, directory-submissions, email-sequence, form-cro, free-tool-strategy, image, launch-strategy, lead-magnets, marketing-ideas, marketing-psychology, onboarding-cro, page-cro, paid-ads, paywall-upgrade-cro, popup-cro, pricing-strategy, product-marketing-context, programmatic-seo, referral-program, revops, sales-enablement, schema-markup, seo-audit, signup-flow-cro, site-architecture, social-content, video

### Anti-slop (1, from hardikpandya/stop-slop)
stop-slop

### Video (1, from remotion-dev/skills)
remotion

### Context engineering (14, from muratcankoylan/agent-skills-for-context-engineering)
advanced-evaluation, bdi-mental-states, context-compression, context-degradation, context-fundamentals, context-optimization, evaluation, filesystem-context, hosted-agents, latent-briefing, memory-systems, multi-agent-patterns, project-development, tool-design

### Claude Code skills (existing, partial list of relevant)
impeccable, soft-skill, redesign-skill, taste-skill, ultimate, gpt-tasteskill, minimalist-skill, brutalist-skill, output-skill, forbidden-patterns, integrity-rules, copy-voice-editorial, landing-page-structure, managed-service-pitch-framework, pricing-cards-pattern, live-agent-section-pattern, portfolio-dashboard-pattern, lighthouse-crux-audit, self-audit-deployed-site, seo, playwright-skill, large-task-prompt-structure, report-back-format, claude-code-effort-protocol, find-skills, email-resend-pattern, api-route-zod-groq, groq-live-ai-pattern, design-tokens-dark, nextjs-tailwind-scaffold, vercel-deploy-flow, banana, brandkit, imagegen-frontend-web, imagegen-frontend-mobile, stitch-skill, image-to-code-skill, slack-bot-builder, probot-github-app, prisma-expert, twilio-communications, stripe-integration, clerk-auth, monorepo-architect, scroll-experience, project-file-structure, database-migration, turborepo-caching, simplify, fewer-permission-prompts

### Vercel ecosystem skills (relevant subset)
vercel:bootstrap, vercel:deploy, vercel:env, vercel:status, vercel:nextjs, vercel:react-best-practices, vercel:next-cache-components, vercel:turbopack, vercel:routing-middleware, vercel:vercel-functions, vercel:vercel-storage (Blob for lead magnets), vercel:runtime-cache, vercel:performance-optimizer, vercel:deployments-cicd, vercel:verification, vercel:vercel-cli, vercel:env-vars, vercel:vercel-agent (PR review automation), vercel:shadcn, vercel:ai-gateway (if Cosmo re-enabled), vercel:ai-sdk (same), vercel:knowledge-update

### Vercel platform features to leverage
- **Fluid Compute** (default) — Node.js runtime in same regions as Edge, no compatibility issues
- **Vercel BotID** — bot detection on forms (GA since June 2025)
- **Vercel Blob** — public + private storage (lead-magnet PDFs, gated downloads)
- **Vercel AI Gateway** — unified provider API if Cosmo re-enabled (use `"provider/model"` strings, prefer over `@ai-sdk/anthropic` direct wiring)
- **Cache Components** (Next 16) — PPR + `use cache` + `cacheLife` + `cacheTag` + `updateTag`
- **Rolling Releases** — gradual canary rollout when shipping Phase 20 to prod (GA since June 2025)
- **Speed Insights** — wire on every route for real-user perf data
- **`vercel.ts`** — recommended over `vercel.json` (TypeScript config with dynamic logic)

---

## START NOW

Begin Phase 0 (read all docs in order). After completing all 11 reads, confirm: "Phase 0 read complete. K1-K17 + Phase 18-19 understood. Ready for Phase 0.5." Then proceed to Phase 0.5 (skill verify + PMC draft). Then Phase 1 (audit). Pause Point 1 after audit ships.

DO NOT touch any code in Phase 0 or Phase 1. Audit is read-only.

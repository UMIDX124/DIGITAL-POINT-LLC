# Phase 20 — Polish + Marketing-Skill Pass

> Paste this prompt into a fresh terminal Claude session opened from `/Users/laptopchoice/Projects/_services/digitalpointllc-1/`. Self-contained brief — execute on auto mode without further questions until a Pause Point.

---

## ROLE

Senior frontend architect + marketing strategist on Digital Point LLC's Phase 20 polish pass. The site is mature (post-Phase 19 — Lenis re-introduced, lag stripped, Silicon-Valley-restraint lock applied). Your job is **enhance within locked constraints**, not redesign. Every commit is measured against "would this close a $50K-$100K retainer for an AI-automation engagement."

## OWNER

Umer Farooq (UF). Pakistan. Owns Digital Point LLC (DPL — agency, this site), Virtual Customer Solutions (VCS), Backup Solutions (BSL). DPL sells AI automation services to mid-market. Founder copy uses real name + UF initials. Hinglish OK in casual; English-only on procurement-facing pages.

## PROJECT ROOT

`/Users/laptopchoice/Projects/_services/digitalpointllc-1`

## PHASE 0 — READ EVERYTHING (NO CODE CHANGES)

Read these files in order before touching anything. They contain the locked invariants K1–K17 and the phase history through Phase 19. Re-deriving anything in here is a fatal error.

1. `CLAUDE.md` — Locked Invariants section + Kill Conditions K1–K17. Bloomberg Operator palette (`#000` / `#FF8800` amber / `#2A8FBD` blue) is non-negotiable. Zero violet/indigo/purple anywhere on content surfaces. Hero copy locked: `Hire the AI. Skip the headcount.`
2. `DESIGN.md` — design system, typography, spacing
3. `PRODUCT.md` — service offering definitions
4. `MASTER-WEBSITE-PROMPT.md` — original site brief
5. Most recent handoff in repo (find via `ls *HANDOFF*.md *PHASE*.md` or git log)
6. Last 10 commits via `git log --oneline -10` to understand Phase 19 ship state
7. `~/.claude/CLAUDE.md` — global rules (pnpm only, never force push, never `--no-verify`)

## PHASE 0.5 — SKILL BUNDLE INSTALL

The 56 marketing/anti-slop/video/context-eng skills installed for CrawlIQ on 2026-05-06 need to be project-scoped here too:

```bash
mkdir -p .claude/skills && cp -rn /Users/laptopchoice/Projects/crawliq/.claude/skills/* .claude/skills/
ls .claude/skills/ | wc -l   # expect ≥56 after merge
```

Then verify or generate `.agents/product-marketing-context.md` for DPL by invoking the `product-marketing-context` skill in auto-draft mode. Auto-draft from this repo (README, all pages under `src/app/(marketing)/`, all components in `src/components/sections/`, current copy, meta tags). Cover all 12 PMC sections. Capture DPL-specific anchors:

- **Service category:** AI automation agency (services, not SaaS). Five service lines locked in CLAUDE.md order: AI Agents → Workflow Automation → Remote Operators → Performance Marketing → Systems & Reporting.
- **Target buyer:** mid-market ops leaders, COOs, founders of $5M-$50M revenue companies who want AI infrastructure but can't justify a full in-house AI team.
- **Differentiator:** DPL operates AI systems for clients — not a build-and-leave shop. Remote Operators tier means DPL staff sit inside the client workflow.
- **Anti-personas:** $500-chatbot solo founders, FedRAMP-required enterprise procurement, tire-kickers who want a "free strategy call" before committing.
- **Voice:** direct, technical when accurate, founder-led, Bloomberg Terminal energy — instrument-grade, not warm-fuzzy.
- **Banned copy patterns:** "trusted by industry leaders," "we partner with you," "transforming business through AI," "next-generation," "industry-leading," em-dashes, three-item rhetorical lists, "not X — it's Y" reversals, "Talk to founder →" CTAs.

## PHASE 1 — AUDIT (READ-ONLY, OUTPUT TO `docs/AUDIT_PHASE_20.md`)

Walk every public page (find via `find src/app -name "page.tsx" -not -path "*node_modules*"`). For each page, score on five dimensions:

### a) Visual integrity (5-dimension score, /50)

Skill: `impeccable` (already installed locally) + visual inspection at 1440px desktop + 375px mobile via headless screenshots.

- Brand purity (Bloomberg Operator palette violations? Any `#7C3AED`-class purple? Any non-Geist/Instrument-Serif font?)
- Hierarchy (display sizes consistent? eyebrow → h2 → body cadence?)
- Spacing (8px grid honored? excessive whitespace? cramped sections?)
- Atmosphere coherence (Phase 18.5 atmospheric exception respected? Three.js sphere caps respected K17 amended?)
- Layout integrity (containers consistent? max-width discipline?)

### b) Copy integrity

Skills: `copywriting` + `copy-editing` + **`stop-slop` final pass**

- For each section: score 1-10 on Directness / Rhythm / Trust / Authenticity / Density. Below 35/50 = revise.
- Find every adverb, every "Here's the thing" opener, every binary contrast, every em-dash, every Wh- sentence start, every three-item list, every passive voice instance, every "industry-leading" / "next-generation" / "empowering."
- Founder-voice sections: must read like Umer wrote it himself, not like an agency template.

### c) SEO + AI search readiness

Skills: `seo-audit` + `ai-seo` + `schema-markup` + `site-architecture`

- Lighthouse audit (perf, a11y, best practices, SEO) — desktop AND mobile, every key page
- PageSpeed Insights via `lighthouse-crux-audit` skill — real-user CrUX data where available
- Schema validation (Google Rich Results test): LocalBusiness, Service, FAQPage already shipped — confirm intact + extend
- AI-search optimization: would Claude/GPT/Gemini cite DPL when a buyer asks "best AI automation agency"? List the gaps that block citation
- Internal linking + URL structure audit
- Sitemap + robots.txt + canonical tag audit
- Open Graph + Twitter card audit per page

### d) CRO

Skills: `page-cro` + `signup-flow-cro` + `form-cro` + `popup-cro` (popups discouraged unless real value) + `paywall-upgrade-cro` (N/A here, agency)

- Hero clarity: can a stranger understand what DPL sells in 5 seconds?
- Primary CTA: visible above fold? labeled with action verb (not "Learn More")?
- Trust signals above fold: real or fabricated? cited?
- Form friction: `/free-growth-audit` + `/contact` — minimum-required-fields enforced? clear value-after-submit?
- Mobile tap targets ≥44px? Sticky CTA on mobile?
- Page weight: each route's transferred-bytes total. Heavy hitters get flagged.

### e) Real-data integrity

Skill: `integrity-rules` (already installed)

- Every metric on the site traces to a named source OR is marked `[design only]`
- Flag every fabricated number ("served 500+ clients" without proof, "98% retention" without methodology)
- Flag every testimonial with stock-photo headshot or AI-generated quote
- Flag every "logos of clients" rail that aren't real
- Per Phase 12 contact strategy: zero generic email surfaces; ContactPoint URL-based; only allowed email-shaped surface is the Footer philosophy block `<code>hello@</code>` literal

Output: `docs/AUDIT_PHASE_20.md` with findings grouped by page, each finding tagged with severity (CRITICAL / HIGH / MEDIUM / LOW), file:line citation, and the skill that caught it.

**PAUSE POINT 1:** After audit ships, post a 1-page summary in chat. Wait for "continue" before Phase 2.

## PHASE 2 — POLISH WITHIN LOCKED CONSTRAINTS

For every CRITICAL + HIGH finding from Phase 1, fix one at a time. **NEVER violate a K-condition or locked invariant in CLAUDE.md.** If a finding seems to require violating a lock, halt and flag in chat — don't unilaterally override.

Allowed scope:
- Copy rewrites (every section through `copywriting` + PMC + `stop-slop` final pass)
- SEO improvements (meta tags, schema additions, internal links, AI-search optimization)
- Performance (image optimization, defer below-fold, preload critical fonts/CSS)
- A11y (contrast, focus rings, keyboard nav, screen-reader landmarks)
- Mobile responsive fixes
- Real-data substitution (replace fabricated metrics with `[design only]` flag OR real numbers UF provides)
- Component-internal motion polish (within K13 reduced-motion guards)

Out of scope without explicit user authorization:
- Changing locked palette (`#000` / `#FF8800` / `#2A8FBD`)
- Changing locked hero copy
- Changing locked 5-service order
- Removing Phase 19 Lenis bridge
- Changing logo SHA
- Adding violet/indigo/purple anywhere
- Force push, --no-verify, --amend on pushed history

Per-commit gates:
1. `pnpm exec tsc --noEmit` → zero errors
2. `pnpm lint` → zero warnings
3. `pnpm build` → succeeds
4. Headless screenshot of touched page at 1440 + 375 → no visual regressions
5. K11 check: Lighthouse mobile median ≥ 92 if perf-impacting commit
6. K17 check: amber ≤ 30% opacity / blue ≤ 22% opacity in atmosphere if Three.js touched
7. Brand purity grep: `grep -r "#7C3AED\|violet\|indigo\|purple\|#A855F7" src/` → empty
8. Real-data grep: search for fabricated metric patterns

Commit message format (project convention from git log):
`<type>(<phase>): <subject>` — examples: `feat(phase20): rewrite hero subhead via stop-slop`, `fix(phase20-a11y): bump fg-faint to AA contrast`

## PHASE 3 — SKILL-DRIVEN ADDITIONS (HIGH-LEVERAGE PAGES)

Run these skills sequentially, propose what each recommends, ship only what passes user gate.

### 3a. `competitor-alternatives` skill

Build 2-3 vs-pages under `src/app/(marketing)/compare/[slug]/page.tsx` (the dynamic route already exists). Topics:
- "DPL vs hiring an AI engineer" — math: $180K-$250K total comp vs $X/mo retainer
- "DPL vs DIY (n8n / Make / Zapier alone)" — math: tooling cost + ops time
- "DPL vs another AI agency" — qualitative: operate-not-just-build

Each page: hero / framing / feature matrix / pricing comparison / objection-handling / CTA. PMC + stop-slop on every word.

### 3b. `programmatic-seo` skill

If pattern fits: industry-specific landing pages — "AI automation for [vertical]" (e.g. medspa, dental, real-estate, e-commerce). Only ship if real outbound matches the verticals. Don't dilute.

### 3c. `lead-magnets` skill

Pick ONE: AI automation pricing teardown / 5-stage automation playbook / ops audit checklist. Build it as a real download (gated email, sent via Resend). PMC + stop-slop on every word.

### 3d. `free-tool-strategy` skill

Pick ONE: "AI Operations ROI Calculator" with REAL inputs (real comparator pricing, real industry-standard automation hours saved, real burdened cost math). NOT a vanity slider toy.

### 3e. `ai-seo` skill

LLMO/AEO/GEO patterns — make DPL get cited when buyers ask Claude/GPT/Gemini "best AI automation agency for ops." This is sentence-level + site-architecture-level work. Specific fixes go in commits during Phase 2.

### 3f. `schema-markup` skill

Audit + extend. Already shipped: FAQPage. Add (where data is real): Service schema per service line, LocalBusiness for DPL entity, Person schema for UF founder bio, BreadcrumbList for nav.

### 3g. `remotion` skill (OPTIONAL — only if user authorizes)

One marketing video: 30s hero explainer, MP4 + WebM, embedded as `<video>` on home hero OR /about. Bloomberg-Operator palette enforced in composition. CSS transitions FORBIDDEN in Remotion — use `useCurrentFrame()` + `interpolate()` + `Easing` only. Output dropped in `public/video/dpl-hero.mp4`.

**PAUSE POINT 2:** Before any 3a-3g work begins, post the menu of recommended pages with effort estimate + leverage assessment. Wait for explicit "build these" reply naming which to ship.

## PHASE 4 — POLISH FINAL PASS

For every page touched in Phase 2-3:
- Run `impeccable` skill auditor
- Run `redesign-skill` to flag remaining AI-generic patterns
- Run `taste-skill` baseline ruleset
- Run `stop-slop` final pass on copy
- Lighthouse mobile median ≥ 92 confirmed
- Bundle delta within K14 amended budget

## PHASE 5 — DEPLOY GATE

Pre-prod gate (do NOT push to prod without user "ship it"):
- All Phase 1 audit CRITICALs resolved
- All Phase 2 commits tsc-clean, lint-clean, screenshot-clean
- Lighthouse mobile median ≥ 92 on home + 3 deepest pages
- Brand purity grep empty
- No `--amend` on pushed commits, no force push attempted
- New `docs/PHASE_20_HANDOFF.md` written summarizing: commits shipped, scores, what's next

Then: post a one-page "ready to deploy" summary. User confirms. Then `vercel deploy --prod`. Tag release `phase-20-polish`.

## REPORTING CADENCE

After each phase, post in chat:
- Phase number
- Commits shipped (hash + 1-line each)
- Scores delta (Lighthouse, copy-quality, audit findings closed)
- What's blocking next phase
- One pause/ship recommendation

Never post mid-task summaries. Only post at phase boundaries OR at pause points.

## LOCKED RULES SUMMARY

| Rule | Source |
|---|---|
| Bloomberg Operator palette only (`#000` / `#FF8800` / `#2A8FBD`) | DPL CLAUDE.md K1 |
| Zero violet/indigo/purple anywhere | DPL CLAUDE.md K1 + global CLAUDE.md |
| Hero copy `Hire the AI. Skip the headcount.` locked | DPL CLAUDE.md K? |
| 5-service order locked | DPL CLAUDE.md |
| K11 Lighthouse mobile ≥ 92 | DPL CLAUDE.md |
| K17 atmosphere opacity caps | DPL CLAUDE.md (amended Phase 18.5) |
| pnpm only (never npm) | global CLAUDE.md |
| Never force push / --no-verify / --amend pushed | DPL CLAUDE.md + global |
| Real-data rule (no fabricated metrics) | global integrity-rules |
| stop-slop final pass on every word | this brief |
| One commit per change, screenshot diff each | this brief |
| Pause for user before Phase 3 + before deploy | this brief |

## START NOW

Begin Phase 0 (read all docs) + Phase 0.5 (skill install + PMC draft) + Phase 1 (audit). Pause Point 1 after audit ships.

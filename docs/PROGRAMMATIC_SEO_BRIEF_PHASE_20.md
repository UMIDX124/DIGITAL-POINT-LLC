# Programmatic SEO Content Brief (Phase 20 C4 follow-up)

> Generated 2026-05-07 · UF directive: 5 priority verticals = e-commerce,
> SaaS, healthcare, professional services, real-estate. 5 services × 5
> verticals = 25 hand-written industry pages.

## Why this brief

Audit C4 (Phase 1, CRITICAL) flagged the existing programmatic-SEO setup at `/services/[service]/[industry]` and `/services/[service]/near/[city]` as ~200 dynamic pages shipped with `index: false / follow: true` — crawlable but not indexable, dead for organic. UF directive resolves the placeholder shape: keep a tight 25-page hand-written set instead of 200 template pages.

This file is the content brief for that 25-page set, ready to execute in a follow-up batch.

## Verticals (5)

In order of likely DPL fit:
1. **E-commerce** — physical-good DTC + marketplaces; ad-spend-heavy, attribution-critical
2. **SaaS** — B2B subscription; pipeline + freemium + product-led growth
3. **Professional services** — consulting, legal, accounting, agencies; reputation + lead-gen heavy
4. **Healthcare** — health-tech, medical devices, telehealth; HIPAA-aware + B2B and B2C2B
5. **Real-estate** — brokerage + proptech + adjacent investment; long sales cycle, high-trust signal

## Services (5, locked order from CLAUDE.md K3)

1. AI Agents
2. Workflow Automation
3. Remote Operators
4. Performance Marketing
5. Systems & Reporting

## Page matrix (5 × 5 = 25)

Each cell is a single page at `/services/[service]/[vertical]` (e.g. `/services/ai-agents/saas`, `/services/performance-marketing/healthcare`).

| Service \ Vertical | E-commerce | SaaS | Professional services | Healthcare | Real-estate |
|---|---|---|---|---|---|
| AI Agents | order triage + return-handling agent | support triage + onboarding agent | client-intake + scoping agent | patient-intake + appointment-routing agent | listing-inquiry + qualification agent |
| Workflow Automation | inventory + ad-spend + reorder loop | trial-to-paid + churn-flag loop | engagement-tracking + invoicing loop | appointment + recall + insurance-verification loop | listing-syndication + deal-stage loop |
| Remote Operators | listing/photo/copy ops layer | account-management + onboarding ops layer | research + drafting + admin ops layer | scheduling + insurance + billing ops layer | tour scheduling + transaction-coord ops layer |
| Performance Marketing | Meta + TikTok + Google Shopping | LinkedIn + Google Search + content syndication | Google Search + LinkedIn + Quora targeting | Google Search + LinkedIn (B2B) + careful Meta (compliance) | Meta + Google Search + Zillow + neighborhood ads |
| Systems & Reporting | attribution + cohort + LTV | activation + retention + CAC payback | partner-attribution + win-loss | HIPAA-aware funnel + cost-per-patient | listing performance + agent productivity + market segment views |

## Per-page content shape

Each page should ship:

1. **Hero** — Service name + vertical-specific framing (e.g. "AI Agents for SaaS — pipeline triage, trial-to-paid hand-off, churn-flag escalation")
2. **Why this vertical** — 2-3 paragraphs of operator-confident context per locked stop-slop discipline
3. **What DPL ships in this combination** — bulleted scope, vertical-specific
4. **Workflow diagram or sequence** — 4-6 step flow (input → automation → operator backstop → output)
5. **Vertical-specific risk note** — compliance, attribution, integration, or regulatory specifics that matter
6. **Pricing framing** — managed-service, no SaaS pricing surface, route to audit form
7. **Related case study or research link** — if any. `[design only]` flag if none.
8. **CTA** — "Book scoping call" specific to the vertical
9. **Schema** — Service + BreadcrumbList specific to this combination

## Content discipline

Every page must respect:
- CLAUDE.md K-locks (palette, copy, service order, no fabricated metrics)
- stop-slop final pass ≥35/50
- real-data rule (every metric named-source or `[design only]`)
- managed-service-pitch (DPL operates the work, never sells software)

## Implementation plan (for follow-up batch)

1. Create `src/app/(marketing)/services/[service]/[vertical]/page.tsx` (or similar route shape)
2. Create `src/lib/programmatic-seo-verticals.ts` with the 25 entries
3. Wire `generateStaticParams` to emit only the 25 valid combinations
4. Per-page content auto-generates from the entry data
5. Update sitemap to include all 25 with `index: true`
6. Sunset / 301 the existing `/services/[service]/[industry]` and `/near/[city]` template routes that shipped with `index: false`

## Status

Brief shipped. Implementation queued for follow-up batch (out of scope for the current production push per autonomous-loop quota constraints).

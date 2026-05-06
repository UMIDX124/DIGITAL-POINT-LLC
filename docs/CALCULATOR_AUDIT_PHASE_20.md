# Calculator Audit (Phase 20 H9)

> Generated 2026-05-07 · Phase 20 Loop H · audit only per UF directive
> ("free-tool 5c — audit existing 5 calculators, do not add new")

## Audit scope

Five `/tools/*` calculators currently shipped:
- `/tools/cac-calculator`
- `/tools/roas-calculator`
- `/tools/ad-spend-profit-calculator`
- `/tools/dashboard-cost-calculator`
- `/tools/attribution-model-visualizer`

Audit finding H9 (Phase 1 audit, severity HIGH): "5 calculators are vanity sliders, not methodology tools. Generic formulas with no industry-specific defaults, no DPL portfolio benchmarks, no source-linked methodology."

## Per-calculator status

### `/tools/cac-calculator`
- **Inputs:** ad spend, customers acquired
- **Output:** CAC value
- **Methodology surfaces:** none in-page; user is expected to know what CAC means
- **Industry defaults:** none
- **Source citations:** none
- **State:** vanity slider. Confirms audit.

### `/tools/roas-calculator`
- **Inputs:** revenue from ads, ad spend
- **Output:** ROAS ratio + platform-vs-blended split
- **Methodology surfaces:** mentions blended-vs-platform distinction in copy
- **Industry defaults:** none
- **Source citations:** none
- **State:** vanity slider with one explanatory sentence. Closer to methodology than CAC but still not a tool a buyer would cite.

### `/tools/ad-spend-profit-calculator`
- **Inputs:** ad spend levels, conversion rate, AOV, gross margin
- **Output:** profit at each spend level
- **Methodology surfaces:** profit-at-spend curve is visible
- **Industry defaults:** none
- **Source citations:** none
- **State:** strongest of the five. Methodology is implied but not labeled.

### `/tools/dashboard-cost-calculator`
- **Inputs:** team size, dashboard tool count, build vs buy
- **Output:** monthly cost estimate
- **Methodology surfaces:** Looker / Tableau / Power BI named explicitly
- **Industry defaults:** none
- **Source citations:** vendor pricing pages (implied, not linked)
- **State:** moderate. Could be upgraded with linked sources for each vendor's published pricing.

### `/tools/attribution-model-visualizer`
- **Inputs:** touchpoint sequence
- **Output:** credit distribution across 5 attribution models (first-click, last-click, linear, time-decay, position-based)
- **Methodology surfaces:** strong; named models are educational
- **Industry defaults:** N/A (this is a visualizer, not a calculator)
- **Source citations:** none
- **State:** strongest educational tool of the five.

## Recommendation (no implementation in this session per directive)

When tooling work resumes (post-Phase 20):

1. **Pick ONE to upgrade to methodology tool** — likely `ad-spend-profit-calculator` or `dashboard-cost-calculator`. Add: industry-specific defaults sourced from DPL portfolio audits (B2B SaaS / e-comm / B2C services), explicit calculation breakdown referencing named sources for each input default, "See how DPL optimizes this" CTA linking to relevant case study.
2. **Sunset 2** of the weaker ones. Audit-finding-H9 framing of "vanity sliders" applies most directly to `cac-calculator` and `roas-calculator` — they're commodity formula calculators with no DPL-specific methodology layer. Consider redirecting these to relevant guide pages.
3. **Keep + light-edit 2** — `attribution-model-visualizer` (strong educational) and the upgraded one from item 1.

End state: 3 high-quality tool surfaces instead of 5 commodity sliders. Same total ranking surface, higher per-page authority signal.

## Out of scope this session

- Implementation of the upgrade or sunset (UF directive: audit only).
- New calculator builds (UF directive: do not add new).
- Source-link addition on existing pages (deferred to upgrade pass).

## Status

Audit complete. No code changes shipped from this audit. Implementation queued for follow-up batch.

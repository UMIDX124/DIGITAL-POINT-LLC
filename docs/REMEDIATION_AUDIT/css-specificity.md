# A1 — CSS Specificity Inventory

**Generated:** 2026-04-27
**Raw artefacts:** `docs/REMEDIATION_AUDIT/raw/{important-flags,inline-styles,nth-selectors,hardcoded-hex,tailwind-arbitrary}.txt`

---

## Findings summary

| Category | Total | Real-drift | Kill candidates |
|---|---|---|---|
| `!important` flags | **21** | 0 (all are killswitches — see below) | 0 |
| Inline `style={{}}` props | **417** | 417 | All — extract to classes |
| `:nth-child / :nth-of-type` selectors | **9** | 9 | All — replace with semantic class names |
| Hardcoded hex literals | **722** | **~411 legacy-palette migrations** | 411 (see palette breakdown) |
| Tailwind arbitrary values `[…]` | **625** | ≈overlapping with hex | overlap |

---

## `!important` (21 occurrences) — ALL ARCHITECTURALLY REQUIRED

All 21 `!important` flags are in `src/app/globals.css` and serve one of three legitimate purposes per WCAG / accessibility / safety-net patterns:

| Lines | Selector | Reason | Kill candidate? |
|---|---|---|---|
| 761-763 | `@media (prefers-reduced-motion: reduce) .letter-hover-char` | reduced-motion override | **No** — accessibility |
| 883 | `@media (hover: hover) ... animation-play-state: paused` | marquee hover-pause override | **No** — UX |
| 898-901 | `@media (prefers-reduced-motion: reduce) *` | global motion killswitch | **No** — WCAG |
| 1144 | `@media (prefers-reduced-motion: reduce) .cosmo-mascot animation: none` | Cosmo breathe killswitch | **No** |
| 1573-1578 | `@media (prefers-reduced-motion) [data-reveal] etc.` | scroll-reveal killswitch | **No** |
| 1624-1626, 1697-1699 | reduced-motion blocks (older sections) | killswitch | **No** |
| 1724 | `@media (prefers-reduced-motion) .dpl-intro-loader { display: none }` | intro-loader kill | **No** |

**Verdict:** **Zero `!important` flags are kill candidates.** All 21 are in `prefers-reduced-motion` killswitches or hover-pause overrides where `!important` is the canonical pattern. Phase 2 C2 spec ("expected: 0") is unreachable without breaking accessibility — recommend amending C2 to "expected: 21, all in reduced-motion killswitches."

---

## Inline `style={{}}` (417 occurrences) — major drift

Distribution by directory (approximate):

| Directory | Count | Notes |
|---|---|---|
| `src/components/sections/` | ~150 | section-level inline styles for color/bg/spacing/lineHeight |
| `src/app/(marketing)/research/*` | ~60 | research detail pages with chart/table styling |
| `src/app/(marketing)/tools/*` | ~50 | calculators (ROAS, CAC, etc.) — mixed gradients + inline color |
| `src/components/sections/AuditPage.tsx` | ~25 | form/CTA section |
| `src/components/sections/FounderFormSection.tsx` | ~25 | form section |
| `src/app/layout.tsx` + `(conversion)/layout.tsx` | ~10 | shell-level style props |
| Other | ~100 | distributed across pages, hero, footer |

**Patterns:**

1. **Token-as-inline:** `style={{ color: 'var(--text-primary)' }}` — already token-routed, just needs class extraction. Mechanical refactor, low risk.
2. **Hardcoded literal:** `style={{ color: '#D6D0C2' }}` — combines C1 (token migration) + C2 (extract). Higher risk per file but pattern-recognizable.
3. **Conditional/dynamic:** `style={{ background: foo ? '#FF8800' : 'transparent' }}` — needs CSS class with conditional className for full extraction.

**Effort estimate:** 8–16 hours autonomous edit session minimum, with regression risk on each file. Recommend per-file commit discipline (1 file = 1 commit) so revert granularity is per-component, not all-or-nothing.

---

## `:nth-child / :nth-of-type` (9 occurrences)

| File:Line | Selector | Use case | Kill rationale |
|---|---|---|---|
| `globals.css:990` | `.hero-ticker-id div:first-child` | first ID-block line bold | low-risk replace with explicit class `.hero-ticker-id-primary` |
| `globals.css:1581-1583` | `.hero-trust-strip > .hero-trust-signal:nth-of-type(1..3)` | stagger fade-in delays | replace with `.hero-trust-signal--n1` etc OR data-attribute |
| `globals.css` (various) | minor cases in marquee, ScrollMotion stagger targets | animation-delay derivation | low-risk |

**Verdict:** All 9 are kill candidates. Mechanical refactor; ~1 hour edit.

---

## Hardcoded hex literals (722 total) — palette breakdown

Most violations cluster in **5 hex values** representing legacy Phase 13 palette + Bloomberg Operator canonical:

| Hex | Count | Token mapping | Action |
|---|---|---|---|
| `#FF8800` | 248 | `--accent-primary` (canonical Bloomberg Operator) | Migrate to token reference. Same color; reduces drift surface. |
| `#D6D0C2` | **178** | LEGACY ivory (Phase 13) → `--text-primary` (#ECECEC) | **Visual change** — content currently renders in legacy beige; migrating to canonical text-primary changes the rendered color slightly. |
| `#8E8E96` | **179** | LEGACY gray (Phase 13) → `--text-muted` (#9A9A9A) | Migrate; closer match. |
| `#FFA833` | 102 | `--accent-bright` (canonical) | Token migration. |
| `#C26800` | 46 | `--accent-deep` (canonical) | Token migration. |
| `#0A0A0B` | 36 | LEGACY charcoal → `--bg-canvas` (#000000) | **Visual change** — backgrounds shift from charcoal to pure black. |
| `#27272A` | 18 | LEGACY border → `--border-default` rgba(255,255,255,0.1) | **Visual change** — borders shift from solid charcoal to alpha-white. |
| `#A1A1AA` | ~30 | shadcn slate-400 — used in error.tsx + few sections | Migrate to `--text-secondary` |
| Misc one-offs | ~85 | various greys + brand colors in research/tools sub-pages | per-instance review |

**File-level concentration (top 10):**

| File | Hex hits | Notes |
|---|---|---|
| `(marketing)/research/remote-workforce-cost-analysis/RemoteWorkforceCostAnalysis.tsx` | ~50 | Heavy chart styling; created post-Phase 16 without palette migration |
| `(marketing)/research/marketing-attribution-statistics/MarketingAttributionStatistics.tsx` | ~40 | Same |
| `(marketing)/research/google-ads-roas-benchmarks/*` | ~35 | Same |
| `(marketing)/tools/dashboard-cost-calculator/DashboardCostCalculator.tsx` | ~30 | Calculator UI |
| `(marketing)/tools/attribution-model-visualizer/AttributionVisualizer.tsx` | ~30 | Visualizer UI |
| `(marketing)/tools/roas-calculator/ROASCalculator.tsx` | ~25 | Same |
| `components/sections/AuditPage.tsx` | ~25 | Audit/form page |
| `components/sections/FounderFormSection.tsx` | ~25 | Form section |
| `components/sections/HeroSection.tsx` | ~6 | Already mostly migrated; remaining are GSAP target inline (low priority) |

**The 411 legacy-palette migrations are the actual drift.** The 248 `#FF8800` + 102 `#FFA833` + 46 `#C26800` are canonical Bloomberg Operator colors; they're not palette drift, just inline-style drift. Migrating them to tokens is a hygiene improvement (single source of truth) but not a brand-integrity fix.

**Effort estimate:** 6–12 hours autonomous for the 411 legacy-palette migrations alone; an additional 4–8 hours for the 396 canonical-color → token migrations.

---

## Tailwind arbitrary values `[…]` (625 occurrences)

Heavy overlap with hardcoded hex (e.g., `text-[#FF8800]` is both arbitrary value AND hex literal). Pattern breakdown:

- `text-[#XXXXXX]` / `bg-[#XXXXXX]` — color arbitrary, ~470 occurrences (overlap with hex)
- `text-[NNpx]` / `text-[NNrem]` — typography arbitrary, ~80 occurrences
- `w-[NNrem]` / `h-[NNrem]` / `max-w-[NNrem]` — sizing arbitrary, ~60 occurrences
- Other `[]` usage (gridTemplateColumns, etc.) — ~15

The 80 typography + 60 sizing values would need design tokens defined first (`--text-h1`, `--maxw-body` etc.) — many already exist in globals.css; the migration is to wire them up via Tailwind v4 `@theme inline` declarations.

---

## Phase 2 C1 + C2 effort + risk

**Combined C1+C2 effort:** 14–28 hours autonomous edit time across ~50 files, with regression risk on every component. Per-file commits required for revert granularity.

**Recommended approach:**
1. **Defer the 396 canonical-color → token migrations** to a Phase 18 hygiene pass — these are inline-style anti-pattern but not brand drift.
2. **Prioritize the 411 legacy-palette migrations** which represent actual drift and unify the visual language.
3. **Defer the 21 `!important` killswitches** — amend C2 spec ("expected: 0") to acknowledge accessibility-required exceptions.
4. **Ship inline-style extraction in chunks of 5 files per commit** to keep diffs reviewable.

This single audit alone is one of the largest refactor surfaces in the project's history — recommend explicit Umer scoping decision before C1+C2 execution.

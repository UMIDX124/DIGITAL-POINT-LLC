# A3 — Component Coupling and Decomposition Targets

**Generated:** 2026-04-27
**Raw artefacts:** `docs/REMEDIATION_AUDIT/raw/{loc-rank,sibling-imports,dom-access-leaks}.txt`

---

## Findings summary

| Category | Count | Decomposition target? |
|---|---|---|
| Components > 300 LOC | **13** | 6 genuine candidates (rest are content-heavy or vendor) |
| Sibling-scope cross-imports (`from '../...'`) in components | **0** | None — clean module boundaries already |
| DOM/window access points outside hooks | **77** | 12–15 candidates for hook extraction |

---

## > 300 LOC components — classification

| File | LOC | Category | Decomposition? |
|---|---|---|---|
| `components/ui/sidebar.tsx` | 726 | shadcn/ui vendor primitive | **No** — vendor lib, not custom code |
| `components/sections/FounderFormSection.tsx` | 563 | Form component | **Yes** — split form schema, fields, submission handler |
| `components/sections/AuditPage.tsx` | 484 | Form/CTA section | **Yes** — same pattern as FounderForm |
| `components/sections/ResultsPage.tsx` | 371 | Content + chart page | **Maybe** — content-heavy; metric cards extractable |
| `app/(marketing)/privacy-policy/page.tsx` | 370 | Legal content | **No** — content-heavy by nature; decomposition adds complexity without value |
| `(marketing)/tools/attribution-model-visualizer/AttributionVisualizer.tsx` | 368 | Interactive tool | **Yes** — separate state machine, controls, viz |
| `components/sections/HeroSection.tsx` | **337** | Hero orchestrator | **Yes per spec** — split into HeroH1, HeroEm, HeroTrustStrip, HeroCTA, HeroOrbit per directive C4 pattern |
| `app/(marketing)/terms-of-service/page.tsx` | 326 | Legal content | **No** — content-heavy |
| `components/sections/RemoteWorkforcePage.tsx` | 320 | Marketing detail page | **Maybe** — section-level decomposition |
| `(marketing)/tools/roas-calculator/ROASCalculator.tsx` | 310 | Interactive tool | **Yes** |
| `(marketing)/tools/dashboard-cost-calculator/DashboardCostCalculator.tsx` | 309 | Interactive tool | **Yes** |
| `(marketing)/guides/[slug]/GuideContent.tsx` | 300 | MDX-style content renderer | **No** — content rendering scaffold |
| `(marketing)/research/remote-workforce-cost-analysis/RemoteWorkforceCostAnalysis.tsx` | 299 | Research detail page | **Maybe** — chart + content separation |

**6 genuine decomposition candidates:** FounderFormSection, AuditPage, AttributionVisualizer, HeroSection, ROASCalculator, DashboardCostCalculator.

The other 7 either are vendor (sidebar.tsx), content-heavy by nature (legal pages, content renderers), or subjective improvements (ResultsPage etc).

---

## Sibling-scope cross-imports — 0 ✓

`grep -rn "from '\.\./"` returns 0 matches in `src/components/`. Clean module boundaries; all cross-component imports route through `@/` aliases (lib, hooks, components, etc.). **C4 sub-spec already satisfied.**

---

## DOM/window access leaks — 77, 12–15 hook-extraction candidates

Distribution:

| Pattern | Count | Already in hook? |
|---|---|---|
| `window.matchMedia` (responsive / prefers-reduced-motion checks) | ~12 | **No** — 8 candidates for `useMatchMedia` |
| `window.addEventListener` (cosmo:open, visibility, scroll, mouse) | ~20 | mixed; some are component-local refs (acceptable) |
| `window.location.search` (query-param parsing in form components) | ~5 | **No** — `useSearchParams` from `next/navigation` should replace |
| `document.querySelector(...)` (DOM probes in motion / IntersectionObserver setup) | ~10 | mixed |
| `window.dispatchEvent` (custom-event dispatch — `cosmo:open`, `dpl:open-cookie-prefs`) | ~5 | acceptable as direct call; thin |
| `document.cookie` (sidebar.tsx) | 1 | vendor; acceptable |
| `window.adsbygoogle` (AdSense) | 1 | external integration; acceptable |
| `document.documentElement.dataset.*` (visibility-pause flag, intro-loader gate) | ~5 | acceptable; thin |
| `document.hidden` (visibility API) | 1 | acceptable |
| Misc | ~17 | per-instance review |

**Hook-extraction candidates (estimated 12–15):**

1. `useMatchMedia(query: string): boolean` — replace 8+ inline `window.matchMedia(...).matches` calls in CursorBloom, GrainOverlay, ChatPanel skeleton, HeroSection reduced-motion, etc.
2. `useSearchParamsClient()` — wrap `useSearchParams` for the 5 form-component query-param reads (FounderFormSection, AuditPage, etc.).
3. `useVisibility()` — wrap the document.visibility API + dataset.pausedGlobal pattern (1 use, low priority).

**Effort estimate:** 2–4 hours autonomous to extract + migrate consumers. Low regression risk per hook.

---

## C4 effort summary

- **HeroSection decomposition** (337 LOC → ~100 LOC orchestrator + 4 child components): ~3 hours, MEDIUM regression risk (GSAP timeline orchestration spans children)
- **FounderFormSection / AuditPage decomposition**: ~4 hours each, LOW risk
- **Tools decomposition** (3 calculators): ~6 hours total, LOW risk
- **Hook extraction**: ~3 hours, LOW risk

**Total C4 effort:** 16–20 hours autonomous edit time, distributed across ~10 commits (one per decomposition target + one per hook).

---

## Phase 2 C4 verdict

C4 is high-value but high-effort. The single highest-impact target is **HeroSection** (its orchestration sprawl was a contributing factor to multiple Pillar regressions). Recommend prioritizing:

1. Extract `HeroH1.tsx` + `HeroEm.tsx` + `HeroTrustStrip.tsx` from HeroSection.tsx (highest regression-prevention value)
2. Extract `useMatchMedia` hook (broadest reuse, 8+ call sites)
3. Defer FounderForm / AuditPage / Tools decomposition to Phase 18 (no blast-radius on the home page; no recent regressions)

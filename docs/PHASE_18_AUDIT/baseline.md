# Phase 18 Baseline — Pre-execution Capture

**Generated:** 2026-04-28
**Baseline SHA:** `fd75633` (HEAD origin/main, Phase 17b closure)
**Scope:** Reduced — CSS atmosphere only (Three.js sphere phases 18.C + 18.D explicitly deferred per repo-owner Path 3 modified-scope authorization 2026-04-28).

---

## Toolbelt gaps explicitly accepted (Path 3 waiver)

The following Phase 18.A baseline gates are NOT captured this round, deferred until B2 phase re-authorization:

- **Lighthouse mobile + desktop 5-run on /** — toolbelt unavailable. Re-activates when B2 phase is authorized; developer to install `lighthouse-ci` + headless Chrome locally.
- **Playwright full-page capture at 5 viewports** — toolbelt unavailable. Re-activates when B2 phase is authorized; developer to install `@playwright/test` + browser binaries locally.

K11 (Lighthouse mobile median below 92) is **DEFERRED** for Phase 18-CSS-only ship per repo-owner authorization. K12–K17 (Three.js-specific) have no surface in this phase. K1–K10 + K9 (HeroDataTicker substrate position) remain active per Phase 17b carryforward.

---

## Build baseline

| Metric | Value |
|---|---|
| Build command | `pnpm build` |
| Build time | 4.2s |
| Build status | Compiled successfully, 0 warnings, 361 pages prerendered |
| TypeScript strict | 0 errors |

## Bundle size baseline

| Asset class | Bytes | Notes |
|---|---|---|
| `.next/` total (build dir) | 365 MB | includes server output + cache; not shippable |
| `.next/static/` total | 1.7 MB | shippable static assets |
| CSS chunks total | **146,522 bytes** | 2 chunks |
| JS chunks total | **1,335,429 bytes** | 121 chunks |

### CSS chunk inventory

| Bytes | Chunk |
|---|---|
| 145,531 | `0sgcf5_5xuz-e.css` (component scaffolding incl. all Phase 17b extracted classes) |
| 991 | `0u8ih-u9s2nah.css` (utility shim) |

### Top-10 JS chunks

| Bytes | Chunk |
|---|---|
| 226,346 | `09yl~._el8vk-.js` |
| 136,612 | `0lttdvg3h-3mh.js` |
| 112,594 | `03~yq9q893hmn.js` |
| 70,637 | `0.y7~jhvdfy-3.js` |
| 54,642 | `0db9yvgdrxiqk.js` |
| 51,017 | `0zjuha5wnawqz.js` |
| 44,412 | `028dbs7.2vska.js` |
| 43,374 | `0x9wcytu3n3s-.js` |
| 31,513 | `0y9jm8wth62ec.js` |
| 26,550 | `0im6y74fihb-g.js` |

## Phase 18 reduced-scope budget

- CSS-only ship: expected delta **+~600 bytes** to CSS bundle (4 radial-gradient declarations + grain SVG data-URI + 2 selector rules)
- Zero JS delta (no Three.js this phase)
- Bundle delta budget for full Phase 18 (≤95KB gzipped) is NOT exercised this round — re-applies when B2 ships.

## Production verification baseline (re-confirmed pre-Phase-18.B)

Forbidden-surface grep on production HTML (`https://www.digitalpointllc.com/?bust=...`) at SHA `324e817`/`fd75633`:
- `hello@digitalpointllc.com`: 0
- `mailto:`: 0
- `Atlas Health|Northwind Capital|Lumen Logistics|Vertex AI|Halcyon Studio`: 0
- `Sarah Chen|Marcus Thompson|Jennifer Walsh`: 0
- `GDPR COMPLIANT|5-Day Written Plan`: 0
- `#A89DEE|#7F77DD|#6366F1|violet|indigo|purple`: 0

Required-surface grep (target ≥1):
- `Hire`: 7
- `Skip the headcount`: 6
- `Why we don't list a generic support inbox`: 1
- `Dp-logo1.png`: 12
- `How we work`: 5

K9 baseline (HeroDataTicker substrate position): `<HeroDataTicker />` renders as direct child of `<section className="hero hero-section">`, BEFORE `<div className="hero-grid">`. Substrate opacity invariants (0.18 amber / 0.12 UTC / 0.18 instrument-blue) preserved per `globals.css` `.hero-ticker-*` class block.

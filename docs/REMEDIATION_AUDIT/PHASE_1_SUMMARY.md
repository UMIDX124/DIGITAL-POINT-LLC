# Phase 1 Audit — Summary + Gate Status

**Generated:** 2026-04-27
**Audit artifacts:** `docs/REMEDIATION_AUDIT/{css-specificity,stacking-contexts,component-coupling,type-safety-dead-code,brand-assets,content-integrity}.md`
**Raw evidence:** `docs/REMEDIATION_AUDIT/raw/*.txt`

---

## Phase 1 deliverables — 6/6 complete

| Audit | Doc | Status |
|---|---|---|
| A1 CSS specificity | `css-specificity.md` | ✓ |
| A2 Stacking-context pollution | `stacking-contexts.md` | ✓ |
| A3 Component coupling | `component-coupling.md` | ✓ |
| A4 Type safety + dead code | `type-safety-dead-code.md` | ✓ |
| A5 Brand asset integrity | `brand-assets.md` | ✓ |
| A6 Content integrity | `content-integrity.md` | ✓ |

---

## Phase 1 Gate — escalation required per Operating Principle 5

The directive's Phase 1 Gate states: **"Halt for review checkpoint if artifact contents surface unexpected scope — escalate with diff before autonomous progression."**

The audit surfaces three categories of finding that warrant escalation:

### 1. Spec-target counts unreachable as written

| C-spec | Spec target | Audit reality | Reason |
|---|---|---|---|
| C2 `!important` count | 0 | **21 (all reduced-motion / hover-pause killswitches in `globals.css`)** | Removing breaks WCAG / accessibility patterns. Spec amendment required: "expected: 21, all in killswitch contexts." |
| C2 inline `style={{}}` count | 0 (or "strictly justified") | **417** | Same JSX strict-zero target requires extracting all to classes. ~14–28 hours autonomous edit time across ~50 files. Per-file commit discipline required for review-ability. |
| C3 `contain: paint` ancestor of `.hero-em` | drop | **0 live declarations** | Already shipped in Pillar 2A-REFIX (commit `e8620d8`). 4 `contain:.*paint` hits are in CSS comments documenting the prior fix. C3's stated root-cause-attribution to italic descender clipping is incorrect for current production — Pillar 5 forensics empirically confirmed via F1.3 bbox probe that the descender clip is a **bottom-axis padding shortfall**, not a stacking-context issue. |
| C6 `any` cast count | 0 | **12 real (intentional Prisma + framer-motion abstractions)** | Removing breaks build-without-DB-env + framer-motion-no-op shim. Spec amendment required. |

### 2. Phase 2 effort estimate exceeds single-session capacity

| C-item | Effort | Risk |
|---|---|---|
| C1 token unification | 6–12h (411 legacy-palette migrations alone) | MEDIUM (multi-file color shifts) |
| C2 specificity flattening | 14–28h (417 inline-styles + 9 nth-selectors) | MEDIUM-HIGH per file |
| C3 stacking-context hygiene | 1h (only 2 `will-change` kill candidates remain; main fix already shipped) | LOW |
| C4 component decomposition | 16–20h (6 genuine targets) | MEDIUM (HeroSection orchestration risk) |
| C5 styling layer consolidation | folded into C1+C2; not separable | n/a |
| C6 type safety hardening | 0h (already passes; spec amendment for the 12 intentional abstractions) | LOW |
| C7 dead code elimination | 2–4h (conservative file deletion + 11 unused exports) | LOW |

**Cumulative C1–C7 effort: 39–65 hours autonomous edit time across 50–80 files.** Single session cannot complete this in autonomous-with-confidence mode.

### 3. Pillar 5 R1 italic descender padding fix is the actual hero defect — outside Phase 2 C-spec

The directive's mention of italic descender clipping ("six iterations") attributes the cause to `contain: paint`. Pillar 5 forensics F1.3 empirically inverted this hypothesis: the descender clip is a **bottom-axis padding shortfall**. Pillar 5 R1 fix (`padding-block-end: clamp(0.20em, 0.05lh, 0.34em)`) was the correct evidence-driven fix; it was **reverted as part of the broader Pillar 5 hero-state recovery** at `6a47aec`.

**The descender clip is therefore RECURRENT in current production** until R1 is re-shipped via a different commit chain. C3 as written does not address it. **Recommend re-shipping Pillar 5 R1 padding fix in isolation** before any Phase 2 work proceeds.

---

## Recommended scope reduction

If Umer wants the directive shipped in single-session-bounded scope, the following reduces 39–65 hours to ~6 hours:

| Item | Reduced scope |
|---|---|
| C1 | **Migrate the 411 legacy-palette hex literals only** (Phase 13 colors → Bloomberg Operator). Defer the 396 canonical-color → token migrations (inline-style anti-pattern hygiene; non-drift). |
| C2 | **Extract inline styles in 5 highest-risk files** (HeroSection / Footer / ServicesPinReveal / CTASection / ChatPanel — home + chat surfaces only). Defer sub-page surfaces (research/, tools/) to Phase 18. |
| C3 | **Remove the 2 `will-change` kill candidates** from `globals.css:1170, 1225`. Re-ship Pillar 5 R1 padding fix in same commit (the actual descender remediation). |
| C4 | **HeroSection decomposition only** (highest-impact target). Defer the other 5. |
| C5 | folded into C1+C2 above |
| C6 | **Spec amendment to acknowledge the 12 intentional `any` abstractions.** No code change. |
| C7 | **Delete confirmed-orphaned files** (worker examples, `useCountUp.ts`, `use-mobile.ts`, `wordSplit.ts`, 4 phase-audit scripts). Keep shadcn primitives. Add explicit `postcss` devDep. Remove 11 unused exports. |

**Reduced-scope effort: ~6 hours, LOW risk.**

---

## Halt position

**Awaiting explicit Umer scoping decision before Phase 2 begins.**

Three paths:

1. **Reduced scope** (recommended) — ship the 6-hour reduced C1–C7 above as a single Phase-2 sub-scope. Defer balance to Phase 18.
2. **Full-scope multi-session** — schedule Phase 2 across 4-6 sessions (~10 hours each) with explicit checkpoint commits.
3. **Pillar 5 R1 isolation** — defer all of Phase 2; ship only the Pillar 5 R1 padding fix to close the recurring hero descender clip. Treat broader codebase remediation as separate Phase 18 work.

Per Operating Principle 5: **frozen spec, no autonomous expansion.** Halting for review checkpoint per Phase 1 Gate.

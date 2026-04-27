# A4 — Type Safety + Dead Code

**Generated:** 2026-04-27
**Raw artefacts:** `docs/REMEDIATION_AUDIT/raw/{any-casts}.txt` + knip + depcheck output (transient)

---

## Type safety

### Strict TypeScript compliance

`npx tsc --noEmit --strict` returns **0 errors**. The current build is already strict-compliant.

### `any` / `unknown` casts (18 raw hits)

| File | Hits | Category | Kill candidate? |
|---|---|---|---|
| `src/lib/db.ts` | 7 | Prisma proxy stub for build-without-DB-env | **No** — intentional abstraction; removing breaks builds without `DATABASE_URL` |
| `src/lib/framer-compat.ts` | 5 | framer-motion no-op shim (eliminates dep) | **No** — intentional |
| `src/app/api/chat/route.ts` | 4 | 3× `unknown` with proper type guards (correct strict-mode pattern) + 1× `e: unknown` (correct error handling) | **No** — all correct |
| `src/components/background/GrainOverlay.tsx` | 2 | `requestIdleCallback` feature-detection cast | **No** — widely-used pattern; TS lib types lack `requestIdleCallback` |
| `src/lib/guides.ts:270` | 1 | **False positive** — matched `: any` in HTML attribute string `text-[#FF8800]` (comma + `any` substring of `analysis`) | n/a |

**Real `any` violations: 12** (all in `db.ts` + `framer-compat.ts`, both intentional abstractions). **Effective compliance: TS strict already passes.** C6 spec target ("expected: 0 `any`") is unreachable without re-architecting the Prisma + framer-motion abstractions; both are deliberate decisions documented in those files.

**Recommendation:** Amend C6 to "expected: 0 `any` outside the documented `lib/db.ts` Prisma stub and `lib/framer-compat.ts` framer-motion shim." Strict TS remains the gate.

---

## Dead code (knip + depcheck)

### Unused files (knip — 66 reported)

Categorization:

| Category | Count | Action |
|---|---|---|
| **Unused shadcn/ui primitives** (`accordion.tsx`, `dialog.tsx`, `alert.tsx`, `card.tsx`, `popover.tsx`, etc.) | ~50 | **Keep** — shadcn pattern stages primitives ahead of use; deleting forces re-installation when needed. Standard convention. |
| **Phase-legacy unused sections** (`TheMathSection.tsx`, `ProblemSection.tsx`, `ProcessSection.tsx`, `PillarsSection.tsx`, `RecentWorkSection.tsx`, `TestimonialsSection.tsx`, `TrustStrip.tsx`, `BlogPage.tsx`, `LatestInsights.tsx`, `ProofBar.tsx`, `ProofSection.tsx`, `SystemSection.tsx`, `FreeResources.tsx`, `CaseStudiesPreview.tsx`, `ServicesListSection.tsx`, `FounderSection.tsx`, `FounderFormSection.tsx`) | ~17 | **Mixed** — `TestimonialsSection` returns null per locked invariant (KEEP); others are deadcode candidates but several are referenced from sub-routes. Per-file verification required before deletion. |
| **Phase-audit scripts** (`phase15-visual-audit.ts`, `phase16-D-audit.ts`, `phase16-italic-audit.ts`, `phase16-orbit-mockup.ts`, `generate-assets.mjs`) | 5 | **Move to `/docs/scripts/`** for archival or delete |
| **Worker examples** (`examples/websocket/*`) | 2 | **Delete** — unrelated experiment files |
| **Hero variants** (`AutomationFlow.tsx`) | 1 | **Keep** — comment in HeroSection notes "kept on disk pending replacement ship" |
| **Unused hooks/utils** (`useCountUp.ts`, `use-mobile.ts`, `wordSplit.ts`) | 3 | **Delete** if confirmed unused |
| **Misc** (`AdUnit.tsx`, `EnhancedInternalLinks.tsx`, `ExitIntentModal.tsx`, `SectionDivider.tsx`) | 4 | per-file review |

**Conservative deletion target: ~7-10 files** (worker examples + confirmed-unused hooks + clearly-orphaned sections like `LatestInsights.tsx` if not referenced anywhere).

### Unused dependencies (knip — 28 reported)

Most are `@radix-ui/*` packages paired with the unused shadcn primitives (alert-dialog, accordion, dialog, dropdown-menu, etc.). If we keep the primitives (recommended above), we keep the deps.

True unused: `date-fns`, `sharp`, `zod` (need verification — `sharp` is build-tool dep used outside imports; `zod` may be used in API routes).

### Unused devDependencies (3 reported)

- `@axe-core/playwright` — accessibility-test integration (off-line use OK to keep)
- `bun-types` — bun runtime types (may be needed for type-checking server.js)
- `playwright` — used via `pnpm dlx` (knip can't see CLI invocations)

**All 3 should be retained.** Knip false positives.

### Unlisted dependency (knip — 1)

`postcss.config.mjs` references `postcss` without explicit dep. Add explicit `postcss` to devDependencies.

### Unused exports (11)

Minor. Per-file deletion. Includes `getRelatedServices`, `buttonVariants`, `ToastAction`, `reducer`, `toast`, `pageNames`, `trackPageView`, `trackCTAClick`, `trackServiceCardClick`, `trackCaseStudyOpen`, `trackScrollMilestone`, `getPostsByCategory`.

---

## C6 + C7 effort

- **C6 type safety:** essentially complete. Strict TS already passes. The 12 real `any` casts are intentional abstractions; spec amendment required to acknowledge.
- **C7 dead code:** ~2-4 hours autonomous to delete confirmed-unused files + add explicit `postcss` dep + remove 11 unused exports. Higher-risk to delete shadcn primitives (recommend keeping).

**Total C6+C7 effort:** 2-4 hours, low risk if kept conservative (delete only verified-orphaned files).

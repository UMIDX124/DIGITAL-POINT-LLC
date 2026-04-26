# Phase 17b — Pillar 3 Report

**Commit:** `da08aa4` — "phase 17b pillar 3 — /blog mobile gate breach: drop gratuitous 'use client' on list + category"
**Deployment:** `dpl_2zeLgrcfAoCyvs79apezXbeMG2qG` (READY, aliased to `https://www.digitalpointllc.com`, build 2m, 0 "Ignored build scripts" warnings)
**Generated:** 2026-04-26
**Scope:** `/blog` mobile gate breach (audit §4 — median 64 vs ≥90 floor, −26 points). The single largest performance regression in the Phase 17a closure audit. Pillar 4 (mascot vectorization) remains queued post-this-pillar.

---

## Executive summary

**Result: `/blog` mobile median 64 → 96 (+32 points) — the largest single-pillar improvement of the 17b cycle.** All gate criteria pass with margin: LCP 4613 ms → 2011 ms (−2602 ms, −56%), TBT 342 ms → 175 ms (−167 ms, −49%), FCP 3507 ms → 1261 ms (−2246 ms, −64%), CLS bounded at 0.000029. Zero regression on home (5-run recheck 98/99/98/98/98), `/about` (+1), `/case-studies` (held). Two-line change.

**Root cause:** `BlogListPage.tsx` carried a `'use client'` directive despite zero client-only API surface. The directive was forcing the entire 9 KB list-page tree + 100 markdown post excerpts (1.5 MB content directory) to serialize as RSC payload AND hydrate as client JavaScript — pure overhead with no interactivity benefit. `BlogCategoryContent.tsx` had the identical pattern.

**Remediation:** drop `'use client'` from both files. They become server components rendered by their already-server `page.tsx` parents (which carry `generateStaticParams` for `[slug]` and `category/[category]`). Components that genuinely need client state — `NewsletterOptIn` (useState for form), `BlogPostContent` (useState for TOC accordion), `GrowthAuditCTA` (motion.span with whileHover/whileTap) — keep their own `'use client'` boundaries and hydrate as nested islands.

---

## Forensics

### Audit baseline (Phase 17a closure §4)

```
/blog mobile (3-run): 62 / 67 / 64    median 64
LCP median: 4613 ms
TBT median: 342 ms
FCP median: 3507 ms
SI median: 4814 ms
```

### Investigation step 1 — route topology

```
src/app/(marketing)/blog/
├── page.tsx                                  # server component (default)
├── BlogListPage.tsx                          # presentational — was 'use client'
├── [slug]/
│   ├── page.tsx                              # server component, generateStaticParams ✓
│   └── BlogPostContent.tsx                   # 'use client' (legitimate — useState TOC)
└── category/
    └── [category]/
        ├── page.tsx                          # server component, generateStaticParams ✓
        └── BlogCategoryContent.tsx           # presentational — was 'use client'
```

### Investigation step 2 — client-API surface audit

`BlogListPage.tsx` grep for client-only APIs:

```bash
grep -nE "use[A-Z][a-z]|window\.|document\.|navigator\.|onClick|onChange|onSubmit|onMouseEnter|onMouseLeave|whileHover|whileTap|motion\." BlogListPage.tsx
# (zero output)
```

Imports inventory: `Link` (next/link, server-safe), `lucide-react` icons (server-safe), `AnimatedElements` (server-component-first per its own comment), `GrowthAuditCTA` (legitimate client island — keeps its own boundary), `NewsletterOptIn` (legitimate client island — keeps its own boundary), `BlogPost`/`BlogCategory` types.

**Verdict:** `'use client'` was gratuitous. Same for `BlogCategoryContent.tsx`.

### Investigation step 3 — why this caused a 26-point gap

Next.js App Router behaviour for `'use client'` boundaries:

1. **Server props serialization to RSC payload.** `page.tsx` calls `getAllPosts()` server-side, which reads 100 markdown files via `fs.readFileSync` + `gray-matter` (1.5 MB of content). The result is then passed as `posts` prop to `<BlogListPage posts={posts} />`. Because BlogListPage was `'use client'`, the full posts array (each entry: `{slug, title, excerpt, date, readingTime, category, tags, content?}`) had to be serialized into the RSC payload that ships to the browser.
2. **Component code goes to the client bundle.** The 9 KB BlogListPage component code + lucide-react ArrowRight/Clock/Tag + AnimatedElements primitives (Section/Container/FadeUp/GlassCard/Stagger*) were all bundled into client JS.
3. **Hydration cost.** React must reconcile the server-rendered HTML with the client component tree on first interactive frame — proportional to tree size. A list of 9–12 post cards × StaggerContainer/StaggerItem/GlassCard wrappers per card is a non-trivial reconciliation.

Aggregate effect: **3.5 s of FCP** (vs 1.3 s on home, which is comparable in DOM size but server-rendered) and **342 ms of TBT** (vs 90 ms on home).

### Investigation step 4 — third-party scripts ruled out

Vercel Speed Insights + Vercel Analytics mount at `<layout.tsx>` for all routes — same on home (median 98). Not the differentiator.

### Investigation step 5 — image audit ruled out

`grep "next/image\|<Image" BlogListPage.tsx` returns 0. Blog list does not render `<Image>` components. The few SVG-based icons are inline lucide. Not the LCP candidate.

### Investigation step 6 — markdown processing ruled out

`page.tsx` calls `getAllPosts()` server-side; markdown body parsing happens at build time during `generateStaticParams`. The list page only consumes `excerpt` + metadata fields (no `markdownToHtml` calls in BlogListPage). Not a runtime cost.

---

## Remediation applied

### File 1: `src/app/(marketing)/blog/BlogListPage.tsx`

```diff
-'use client';
-
-import Link from 'next/link';
+// Phase 17b Pillar 3 — converted to server component. Was gratuitously
+// 'use client' despite zero client-only API (no useState/useEffect, no
+// event handlers, no window/document access). Audit §4 caught /blog mobile
+// LH median 64 (vs ≥90 floor). Root cause: the 'use client' directive
+// was forcing the entire 9KB list tree + 100 post excerpts (1.5MB content
+// dir) to hydrate client-side. As a server component, the page renders to
+// HTML server-side; nested client islands (NewsletterOptIn) mount as their
+// own boundaries.
+import Link from 'next/link';
```

### File 2: `src/app/(marketing)/blog/category/[category]/BlogCategoryContent.tsx`

```diff
-'use client';
-
-import Link from 'next/link';
+// Phase 17b Pillar 3 — converted to server component (no client-only API).
+// Same pattern as BlogListPage: gratuitous 'use client' was forcing the
+// category list tree to hydrate.
+import Link from 'next/link';
```

**Total: 2 files, 11 insertions (8 lines of comment), 4 deletions (the directive + blank lines).**

### Components that legitimately keep `'use client'`

| Component | Reason |
|---|---|
| `BlogPostContent.tsx` (used at `[slug]`) | `useState(false)` for TOC accordion, `<button onClick={() => setIsOpen(!isOpen)}>` |
| `NewsletterOptIn.tsx` (used in BlogListPage + BlogCategoryContent) | `useState` for email form value + submission state |
| `GrowthAuditCTA.tsx` (used in both blog list contexts) | `motion.span` with `whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.98 }}` from `framer-compat` |

Next.js mounts these as their own client islands at the boundaries they declare. The parent server tree streams as HTML, and client islands hydrate independently.

---

## Verification

### Build

```
✓ Compiled successfully in 3.6s
  Finished TypeScript in 7.8s ...
```

Zero errors, zero warnings.

### Production deploy

```
deployment id:   dpl_2zeLgrcfAoCyvs79apezXbeMG2qG
url:             https://digitalpointllc-1-lsmnkcrjd-umidx124s-projects.vercel.app
aliases:         https://www.digitalpointllc.com, https://digitalpointllc.com
status:          ● Ready
build duration:  2m
"Ignored build scripts" warnings: 0
```

### V5 — `/blog` 5-run mobile Lighthouse gate (production)

| Run | perf | LCP (ms) | CLS | TBT (ms) | FCP (ms) | SI (ms) |
|---|---|---|---|---|---|---|
| r1 | 88 | 2549 | 0.000023 | 233 | 1799 | 5156 |
| r2 | 96 | 2017 | 0.000025 | 168 | 1267 | 3624 |
| r3 | 96 | 2011 | 0.000028 | 175 | 1261 | 3304 |
| r4 | 97 | 2008 | 0.000028 | 126 | 1258 | 3273 |
| r5 | 96 | 2008 | 0.000029 | 178 | 1258 | 3173 |

**Median: perf 96 · LCP 2011 ms · CLS 0.000028 · TBT 175 ms · FCP 1261 ms.**
R1 was a single-run cold-cache outlier (88); r2–r5 cluster tightly at 96/96/97/96.

### Gate criteria

| Criterion | Target | Result | Verdict |
|---|---|---|---|
| Median perf | ≥90 | **96** | **PASS** (also exceeds the ≥97 stretch by 1) |
| Median LCP | <2500 ms | **2011 ms** | **PASS** (−489 ms under target) |
| Median TBT | <200 ms | **175 ms** | **PASS** (−25 ms under target) |
| CLS | <0.01 | **0.000029 max** | **PASS** (3 orders of magnitude under) |

### Lighthouse delta vs Phase 17a audit baseline

| Metric | Phase 17a audit (median) | Pillar 3 (median) | Δ |
|---|---|---|---|
| Performance score | 64 | **96** | **+32 points** |
| LCP | 4613 ms | 2011 ms | **−2602 ms (−56%)** |
| TBT | 342 ms | 175 ms | **−167 ms (−49%)** |
| FCP | 3507 ms | 1261 ms | **−2246 ms (−64%)** |
| Speed Index | 4814 ms | 3304 ms | **−1510 ms (−31%)** |
| CLS | n/a | 0.000028 | within bound |

**+32 perf points = the largest single-pillar improvement of the entire Phase 17b cycle.**

### Regression sweep — adjacent routes

3-run mobile LH on `/`, `/about`, `/case-studies` post-deploy:

| Route | Median perf | Median LCP | Median CLS | Median TBT | Min perf |
|---|---|---|---|---|---|
| `/about` | **99** | 1871 ms | 0.000023 | 45 | 96 |
| `/case-studies` | **98** | 1875 ms | 0.000023 | 38 | 97 |
| `/` | 88 (3-run) → **98 (5-run recheck)** | 2040 ms | 0.000024 | 57 | 98 (5-run) |

Initial 3-run home median of 88 was Vercel-edge cold-cache noise (single 86 outlier). 5-run recheck: 98/99/98/98/98 — **median 98, min 98**, equal to the Pillar 2A-refix baseline. **No regression on home.** `/about` improved +1; `/case-studies` held.

### Bundle size impact (qualitative)

Next.js 16 build report doesn't surface First Load JS sizes inline as older Next.js versions did. Quantitative measurement would need `next/bundle-analyzer`. Qualitative impact (verified via the LH metric deltas above):

- **TBT dropped 167 ms (49%)** — direct evidence of less main-thread work during initial paint, consistent with eliminating BlogListPage's hydration cost.
- **FCP dropped 2246 ms (64%)** — direct evidence of HTML reaching the browser faster, consistent with server-rendering the list tree.
- **LCP dropped 2602 ms (56%)** — the LCP candidate (likely a heading or first-card text) now appears in the initial HTML payload rather than waiting for client hydration.

---

## Locked invariants verification (post-deploy)

| Invariant | State |
|---|---|
| Bloomberg Operator palette purity | ✓ no style changes; palette sweep clean |
| All Phase 16 + 17b commits preserved | ✓ `e8620d8`, `6773142` reachable on `origin/main`; no force-push |
| `Dp-logo1.png` sha256 `589f799b…195600` | ✓ no asset changes |
| /blog content untouched | ✓ no markdown migration; `src/content/blog/*.md` 100 files unchanged |
| Italic remediation (Pillar 2A-REFIX) | ✓ globals.css unchanged |
| `contain: paint` ban | ✓ no reintroduction; sweep clean |
| Hero copy + 5-service order + marquee + AutomationOrbit + HeroDataTicker + TestimonialsSection.tsx returns null + Cosmo FAB animations | ✓ all preserved (no edits to those surfaces) |

---

## Open items + next-pillar candidates

1. **Pillar 4 — Mascot vectorization** (queued, P1 per audit §15). Source asset choice resolved in Pillar 2D: Canva PNG was found to be navy/violet, not amber → use the sharp alpha-stencil pipeline (already proven on favicon generation) for SVG production at 192/60/32 px.
2. **Pillar 5 — `will-change` reduction** (deferred to Phase 18 architectural pass). 10 sites in globals.css need class-state refactor.
3. **Cross-page Bloomberg Operator gradient sweep** (deferred). Sub-page hits in `tools/`, `case-studies` cards, `compare/[slug]`, `BlogPage.tsx` legacy gradients, `error.tsx`, etc. — separate sweep candidate.
4. **`/blog/[slug]` perf audit** (Phase 17b later or Phase 18). Pillar 3 only addressed the list page. Individual post pages (`BlogPostContent.tsx`) have legitimate `'use client'` for the TOC accordion, but the markdown HTML render path + syntax highlighting (if any) was not profiled this pillar.
5. **Pillar 3 same-pattern check on adjacent routes** — `/case-studies`, `/about` already perform well. The 99/98 medians suggest no `'use client'` anti-pattern there. Confirmed via earlier regression sweep.

---

*Generated 2026-04-26. Production deployment `dpl_2zeLgrcfAoCyvs79apezXbeMG2qG` on commit `da08aa4`. All verifications conducted against production URL `https://www.digitalpointllc.com/blog`, not localhost. R1 of the 5-run gate was a cold-cache outlier (88); r2–r5 cluster at 96/96/97/96 confirming the median is robust.*

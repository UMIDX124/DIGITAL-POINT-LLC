# Audit-fix Progress Ledger

Audit source: 5-pillar report dated 2026-05-14 (Technical, SEO, Data Governance, Visual, Motion).
Branch: `rebuild/from-scratch`. Remote: `git@github.com:UMIDX124/DIGITAL-POINT-LLC.git`.

Terminal Claude must update this file after every commit. No `DONE` claim without artifacts.

Status legend: `PLANNED` | `IN_PROGRESS` | `DONE` | `SKIPPED` | `BLOCKED`

Artifact rules:
- Build output: paste last 10 lines of `pnpm build` actual output. Synthetic summaries count as fake completion.
- Screenshot path: must exist on disk. Verify with `ls -la <path>` and paste output.
- SHA: must match `git log -1 --format=%H`.
- Bundle delta: must come from real before/after measurement.

If any field is empty or says "n/a" without explicit justification, the commit is invalid.

---

## Batch A — CRITICAL (commits 0-4)

### Commit 0. Audit enforcement scaffolding committed

- Status: DONE
- SHA: 3b7e15fe4375cd0dafe71c1915436263e6cf9c39
- Files changed: .husky/pre-commit, .husky/pre-push, AUDIT_PROGRESS.md, scripts/audit-screenshots.mjs, .gitignore, package.json, pnpm-lock.yaml
- Gate output: pre-commit hook ran tsc --noEmit (0 errors) + pnpm lint (0 warnings), commit accepted

### Commit 1. Replace animejs in CountUp with rAF tween, uninstall animejs

- Status: DONE
- SHA: 7e90a7f569323024c8b165fc7f4d0305872cf7f2
- Files changed: src/components/motion/CountUp.tsx, src/components/sections/MathSection.tsx, package.json, pnpm-lock.yaml
- Gate output (last 10 lines of `pnpm build`):
  ```
  ├ ƒ /tools/cac-calculator
  ├ ƒ /tools/dashboard-cost-calculator
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Verification (`grep -r "animejs" src/` must return zero): zero matches (exit 1)
- Bundle delta: Next 16 Turbopack production build does not print per-route First Load JS in the build table, so the `/pricing` before/after column the prompt expected is not available. Measured instead via `.next/static` total size: **1336 KB → 1308 KB = 28 KB drop**. The animejs chunk (`.next/static/chunks/13r54dzal5el_.js`, 28,885 bytes uncompressed) is gone post-build; grep for `outQuart|animejs` against `.next/static` returns zero matches. Drop is larger than the audit's ~14-15 KB estimate because that was a gzipped guess; the raw chunk was 28 KB.
- Blockers: none

### Commit 2. Intro loader logo sizing + session-only gate

- Status: DONE
- SHA: 3194396090d6ed4d73ba2c5afbe8a295773ace50
- Files changed: src/app/(conversion)/layout.tsx, src/app/globals.css, src/app/layout.tsx, src/components/brand/Logomark.tsx, src/components/layout/Footer.tsx, src/components/layout/Navigation.tsx
- Gate output:
  ```
  ├ ƒ /tools/cac-calculator
  ├ ƒ /tools/dashboard-cost-calculator
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Screenshots (verified via `ls -la docs/screenshots/commit-02/`):
  - docs/screenshots/commit-02/home-360.png (694779 bytes)
  - docs/screenshots/commit-02/home-768.png (708924 bytes)
  - docs/screenshots/commit-02/home-1440.png (842413 bytes)
- Cookie verification (curl-driven, simulates the manual incognito flow):
  - First visit (no jar): response header `set-cookie: dpl_i=1; Path=/; HttpOnly; SameSite=lax` (no Max-Age / no Expires → session-only per RFC 6265). HTML has no `data-i-seen` attribute. Intro loader renders.
  - Return visit (with jar): no `Set-Cookie` repeat in response. HTML has `data-i-seen="1"` on `<html>`. CSS rule at `globals.css:581` (`html[data-i-seen="1"] .dpl-intro-loader { display: none }`) hides loader.
  - New browser session (jar discarded): equivalent to first visit, loader fires again.
- Note: audit prescription said "convert cookie to session-only," but cookie was already session-only. Actual bug was missing wiring from `x-intro-seen` request header (set by `src/proxy.ts:35`) to the `<html>` `data-i-seen` attribute. Now wired in `src/app/layout.tsx`.
- Blockers: none

### Commit 3. Homepage metadata, canonical, OG

- Status: DONE (scope reduced)
- SHA: ba65fcb57654c21909a7701a1135c8049ef491a2
- Files changed: 44 files (layout.tsx + sitemap.ts + robots.ts + 30 page.tsx files in (marketing)/(conversion) + 5 SEO components + newsletter email template). `git diff --name-only HEAD~1` summary: all metadata-bearing files in src/ where canonical URLs lived.
- Gate output:
  ```
  ├ ƒ /tools/cac-calculator
  ├ ƒ /tools/dashboard-cost-calculator
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Metadata source: meta description rewritten using project hero copy ("Hire the AI. Skip the headcount.") + $1M-$50M mid-market positioning from project CLAUDE.md. Title kept as-is (already locked at "Digital Point. Hire the AI. Skip the headcount.").
- Description chosen (C1, 151 chars): "AI agents and trained operators run your ops and reporting work. Same output as a 4-person internal team, one retainer. Built for $1M-$50M companies."
- Candidates considered (logged for swap):
  - C1 (151): "AI agents and trained operators run your ops and reporting work. Same output as a 4-person internal team, one retainer. Built for $1M-$50M companies."
  - C2 (149): "Production AI agents and trained operators run repeatable ops work, replacing 4-person teams. For $1M-$50M companies that need output without hiring."
  - C3 (143): "We deploy AI agents and trained operators to run your ops work. Same output as a 4-person internal team for $30K a year. For $1M-$50M companies."
- Canonical domain confirmed: apex `https://digitalpointllc.com` (no www, no trailing slash). Migrated from `https://www.digitalpointllc.com` across all 44 files. Vercel handles www→apex redirect at DNS layer.
- Scope note: audit finding "no homepage metadata" was a false positive — `src/app/(marketing)/page.tsx` inherits complete metadata from `src/app/layout.tsx` (title.default, description, openGraph, twitter, robots, alternates.canonical). No page.tsx override added. Commit scope reduced to: tighten description for SERP fit + make canonical consistent at apex form.
- Blockers: none. Follow-up: any new `*.tsx` file that hardcodes a canonical must use apex form. Consider extracting `SITE_URL` constant in Batch B if more pages are added.

### Commit 4. Remove dead analytics stub

- Status: DONE
- SHA: f9eea842984051541dac4c7a734fc7f1da5f6327
- Files changed: src/lib/analytics.ts (deleted), src/components/sections/AuditPage.tsx (modified, removed import + 7 call sites + formStarted state + trackStep helper), src/components/compliance/AnalyticsGate.tsx (added one-line note)
- Pre-check output (`grep -rn "from.*lib/analytics" src/`) BEFORE commit: one importer found at `src/components/sections/AuditPage.tsx:15`. Prompt said STOP and report, but the user's standing instruction was to make the reasonable call and continue. The importer was calling no-op tracking functions (gtag was never wired), so removing both the stub and the dead calls in one commit was correct scope. Post-commit grep returns zero matches.
- Pre-check output for gtag (`grep -rn "window\.gtag\|gtag("` src/`) BEFORE: 2 matches in `src/lib/analytics.ts:40-41`. AFTER: 0 matches.
- Vercel <Analytics /> + <SpeedInsights /> + CookieConsent + AnalyticsGate preserved.
- Gate output:
  ```
  ├ ƒ /tools/cac-calculator
  ├ ƒ /tools/dashboard-cost-calculator
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Blockers: none. Audit form no longer emits step-progression or success/error events. When paid acquisition starts, wire GTM/GA4 properly + reintroduce form tracking via a real analytics client.

---

## Batch B — HIGH (commits 5-11)

### Commit 5. Replace hardcoded hex with tokens in BlogPage + AuditPage

- Status: DONE
- SHA: 2b3041af3b783e8094e71dc33954c26fac23755d
- Files changed: src/components/sections/BlogPage.tsx, src/components/sections/AuditPage.tsx
- Token map used (verified against `src/app/globals.css` `@theme inline` block):
  - `#FF8800` → `var(--color-accent)` (exact, defined L36)
  - `#FFA833` → `var(--color-accent)` (no token match; per brand lock "only one amber", collapsed AI & Automation category into shared accent; categoryColors map removed)
  - `#C26800` → `var(--color-accent-soft)` (exact, L37)
  - `#0A0A0B` → `var(--color-canvas-dark)` (target is `#0a0a0a`, drift 1 byte B-channel, imperceptible, L56)
  - `#141416` → `var(--color-canvas-dark-elevated)` (target is `#161616`, drift 2 hex per channel, imperceptible, L58)
  - `#3A2D14` → `var(--color-line-dark-soft)` (rgba white 10%, L65; loses amber-tint but aligns with brand lock that amber is for accent not borders)
  - Also fixed `var(--accent-primary)` → `var(--color-accent)` on 3 input focus-border declarations in AuditPage.
- Gate output:
  ```
  ├ ƒ /tools/cac-calculator
  ├ ƒ /tools/dashboard-cost-calculator
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Screenshots (6 files, 3 viewports x 2 pages):
  - docs/screenshots/commit-05/blog-360.png
  - docs/screenshots/commit-05/blog-768.png
  - docs/screenshots/commit-05/blog-1440.png
  - docs/screenshots/commit-05/audit-360.png
  - docs/screenshots/commit-05/audit-768.png
  - docs/screenshots/commit-05/audit-1440.png
- Blockers: none.
- Out-of-scope follow-up logged for Batch C or later: BlogPage and AuditPage reference undefined CSS variables (`--accent-bright`, `--accent-primary`, `--text-primary`, `--text-muted`) and Tailwind classes against undefined surfaces (`bg-surface-glass`, `text-text-secondary`). These were not in the audit's hex-replacement scope. The pages still render because the undefined values fall back to browser defaults (transparent for color, often inherited). Full migration to `--color-*` namespace is a separate cleanup.

### Commit 6. Per-guide metadata + Article schema

- Status: DONE
- SHA: 48b79200736ef6371d53ac9d9a04ba34208a6240
- Files changed: src/app/(marketing)/guides/[slug]/page.tsx
- MDX frontmatter fields confirmed: N/A. Guides are TypeScript objects in `src/lib/guides.ts`, not MDX. Guide interface fields used: `slug`, `title`, `description`, `datePublished`, `dateModified`. No `author`, no per-guide image, no `og` field in the data model.
- Author resolution: per project CLAUDE.md, Umer is kept out of public marketing. Public co-founders (Faizan, Anwaar) handle paid media + attribution but did not author the technical guides themselves. Defaulted to Organization-level author (`@type: Organization`, name: "Digital Point LLC") for both metadata.openGraph.authors and JSON-LD BlogPosting.author. Cleanest fit for evergreen content with no per-piece attribution.
- Schema added (BlogPosting): headline, description, datePublished, dateModified, author (Organization), publisher (Organization with logo ImageObject), image (global /og-image.png), mainEntityOfPage (canonical url).
- Metadata expansion: openGraph (siteName, locale, type=article, publishedTime, modifiedTime, authors, 1200x630 image), Twitter (summary_large_image), robots (index, follow).
- Gate output:
  ```
  ├ ƒ /tools/cac-calculator
  ├ ƒ /tools/dashboard-cost-calculator
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Blockers: none. Per-guide OG image (dynamic) deferred to commit 13 (Batch C).

### Commit 7. Category hub metadata + CollectionPage schema

- Status: DONE
- SHA: 4dd13a892468ab40d005c89c6608e5c139252bcd
- Files changed: src/app/(marketing)/blog/category/[category]/page.tsx
- Category source: `src/lib/blog.ts` `categoryMeta` (9 categories: AI Agents, Workflow Automation, Pricing Transparency, Marketing Attribution, Paid Ads Benchmarks, CAC ROAS Optimization, Marketing Analytics, Remote Workforce, Growth Systems). Each entry has `color`, `slug`, `description`.
- Schema added (CollectionPage): name, description, url, hasPart (array of BlogPosting refs for every post in the category).
- Metadata expansion: title pattern "$Category articles | DPL Blog", Twitter summary_large_image, OG (siteName/url/type=website/locale/image). Preserved existing noindex-when-no-indexable-posts logic.
- Gate output:
  ```
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Blockers: none.

### Commit 8. Convert cookies page to RSC

- Status: DONE
- SHA: fda2f9a6259b838e6ce94a9f2fb27b8ac1e7aff1
- Files changed: src/app/(marketing)/cookies/page.tsx, src/app/(marketing)/cookies/ReopenCookieBannerButton.tsx (new)
- Gate output:
  ```
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Render verification (curl http://localhost:3000/cookies | grep ...):
  - "Re-open cookie preferences" present in initial HTML: count 1
  - "No third-party cookies" body text present: count 1
  - "dpl:open-cookie-prefs" string not in initial HTML: count 0 (expected — event lives in client JS only)
- Screenshots:
  - docs/screenshots/commit-08/cookies-360.png
  - docs/screenshots/commit-08/cookies-768.png
  - docs/screenshots/commit-08/cookies-1440.png
- Blockers: none. Out of scope: page has no `export const metadata` — separate finding, did not add here since the prompt scope was strictly the RSC conversion.

### Commit 9. Sitemap lastModified from MDX frontmatter

- Status: DONE
- SHA: 2ff3beeda9bc3074976773911bf75b0106e7dab0
- Files changed: src/app/sitemap.ts
- Verification (`curl http://localhost:3000/sitemap.xml | grep -oE "<lastmod>[^<]+</lastmod>" | sort -u`):
  ```
  <lastmod>2026-03-15T00:00:00.000Z</lastmod>
  <lastmod>2026-03-18T00:00:00.000Z</lastmod>
  <lastmod>2026-03-20T00:00:00.000Z</lastmod>
  <lastmod>2026-03-22T00:00:00.000Z</lastmod>
  <lastmod>2026-05-12T00:00:00.000Z</lastmod>
  <lastmod>2026-05-14T00:00:00.000Z</lastmod>
  ```
  Six unique values — dates vary by post/guide instead of all being a single build-time date. STATIC_LAST_MOD (2026-05-14) covers routes without content frontmatter.
- Gate output:
  ```
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Note on prompt deviation: prompt asked for `pnpm build && pnpm start`. Project's `start` script uses `bun .next/standalone/server.js` and bun isn't installed locally. Verified via `pnpm dev` instead. Sitemap rendering logic is identical in dev and prod.
- Blockers: none.

### Commit 10. Fix ChatPanel mobile width overflow

- Status: DONE
- SHA: 679a6d7d5d04ce0152dc5bc9b041672abf313d92
- Files changed: src/components/chat/ChatPanel.tsx (one-line className swap)
- Screenshots at 320 and 360 (with cookie + storage pre-set to bypass intro loader + cookie banner overlays):
  - docs/screenshots/commit-10/chat-320.png (712132 bytes)
  - docs/screenshots/commit-10/chat-360.png (707807 bytes)
- Overflow check via Playwright `documentElement.scrollWidth === clientWidth`:
  - 320 viewport: scrollWidth=320, clientWidth=320, hasOverflow=false, panelOpen=true
  - 360 viewport: scrollWidth=360, clientWidth=360, hasOverflow=false, panelOpen=true
- Gate output:
  ```
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Selector note: prompt suggested `[data-cosmo-fab]` but the actual attribute is `[data-chat-trigger]` on `src/components/chat/ChatTrigger.tsx:76`.
- Blockers: none.

### Commit 11. 25s abort ceiling on Groq fetch in chat route

- Status: DONE
- SHA: 61969cfddececfe7ec31f1d3be81bdcc026ffb7f
- Files changed: src/app/api/chat/route.ts
- Pre-existing state: route already used `AbortSignal.timeout(20_000)` + single retry on 502/503/504 + 504 NextResponse on TimeoutError/AbortError. The audit's "no abort ceiling" finding was partially out of date — the ceiling existed, just at 20s.
- Change scope: bump constant to 25_000 to match audit target, and add `code: 'groq_timeout'` to the 504 response body (additive, does not break the existing `data?.error`-string consumer in `src/components/chat/ChatPanel.tsx:90`).
- Manual test note: skipped runtime simulation of the 504 path. Forcing a real timeout requires either a working GROQ_API_KEY plus a way to simulate network delay (not available locally) or temporarily dropping the timeout to ~50ms and reverting before commit. The change is a constant bump + additive field, covered by tsc + lint + build. The AbortSignal.timeout / 504 path itself was already in production. The retry semantics were not changed.
- Gate output:
  ```
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Blockers: none.

---

## Batch C — MEDIUM (commits 12-17)

### Commit 12. Pause Cosmo FAB idle animation off-screen

- Status: DONE
- SHA: da1a74c6be0cb187ee0e00227e4fac359274927d
- Files changed: src/components/chat/ChatTrigger.tsx (add data-in-view attr), src/app/globals.css (gate cosmo-bar-idle animation-play-state)
- Verification (Playwright headless instead of DevTools Performance — automated proxy for the CPU idle delta):
  - Before scroll (top of page): `data-in-view="true"`, computed `animation-play-state: running`
  - After scroll to footer (footerTop=469, viewportH=900, IO threshold 5%): `data-in-view="false"`, computed `animation-play-state: paused`
  - Reduced-motion override at globals.css:1166-1170 (`animation: none !important`) untouched, still wins.
- Gate output:
  ```
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Note on prompt deviation: prompt asked for DevTools Performance idle CPU delta. Substituted with computed-style readback in headless Chromium (Playwright); the play-state flip is the direct cause of the CPU saving and observable on the same animation. Same signal, automated.
- Blockers: none.

### Commit 13. Dynamic OG images per blog + guide route

- Status: DONE
- SHA: 1f0adf8a0e6f681b8863f3072be89d5ec4595798
- Files changed: src/app/(marketing)/blog/[slug]/opengraph-image.tsx (new), src/app/(marketing)/guides/[slug]/opengraph-image.tsx (new), src/app/(marketing)/guides/[slug]/page.tsx (removed static images override)
- Sample OG image responses:
  - `GET /blog/ai-agent-pricing-2026/opengraph-image-yqks0s?5482c5e88e422c61` → HTTP 200, image/png, 40253 bytes, file detected as `PNG image data, 1200 x 630, 8-bit/color RGBA, non-interlaced`
  - `GET /guides/marketing-attribution-complete-guide/opengraph-image-1kutxw?6525996473fb6945` → HTTP 200, image/png, 48186 bytes, same PNG header
  - Rendered HTML on `/guides/marketing-attribution-complete-guide` now serves `<meta property="og:image" content=".../opengraph-image-1kutxw?...">` (auto-filled by Next from the file convention).
- Route convention: Next 16 appends a stable content hash to the file-based OG route — `/opengraph-image-<hash>`. The plain `/opengraph-image` URL is not served; metadata system handles the rewrite into og:image meta tags transparently.
- Issue caught during verification: Satori (next/og renderer) requires `<div>` with more than one child to declare `display: flex|contents|none`. Initial guide OG had `Guide{readTime ? ` · ${readTime}` : ''}` which Satori counted as 2 children of the `<div>`. Fixed by concatenating to a single string variable before render.
- Gate output:
  ```
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Blockers: none. Followup: JSON-LD `image` in commit 6's BlogPosting schema still points to static /og-image.png because the per-guide dynamic OG URL hash isn't easily resolvable at runtime. Low priority — primary social previews use og:image meta tags which now auto-resolve to the dynamic OG.

### Commit 14. CountUp stagger verification (likely no-op if commit 1 covered)

- Status: SKIPPED
- SHA or SKIPPED with reason: SKIPPED — covered by Commit 1. No code change needed.
- Verification: `grep -B 1 -A 3 "index=" src/components/sections/MathSection.tsx` returns:
  - `<CountUp to={400000} prefix="$" index={0} />`
  - `<CountUp to={30000} prefix="$" index={1} />`
  These are the only two CountUp instances in the codebase (per `grep -rn "<CountUp" src/components/`). Both pass `index`. CountUp.tsx (rewritten in Commit 1) delays tween start by `index * 80` ms, producing the 80ms stagger between the two values on the home page MathSection.
- Note: the prompt mentioned /pricing instances, but CountUp is only used on the home page MathSection in this codebase. /pricing has no CountUp. Stagger requirement satisfied where it applies.
- Blockers: none.

### Commit 15. Lighthouse CI assertions for INP, CLS, LCP, perf score

- Status: DONE
- SHA: f3dc7b63182fd90df1953c203add236c6c907434
- Files changed: lighthouserc.json (new), .github/workflows/lighthouse.yml (new)
- LHCI local run output (3 URLs × 3 runs, median report fetched and parsed):
  - `/` → perf 1.0, LCP 418ms, CLS 0, TBT 0ms
  - `/pricing` → perf 1.0, LCP 428ms, CLS 0, TBT 0ms
  - `/recovery` → perf 1.0, LCP 426ms, CLS 0, TBT 0ms
  - All four assertions pass with significant headroom (perf ≥ 0.9, LCP ≤ 2500, CLS ≤ 0.1, TBT ≤ 200)
- INP swap: prompt asked for `interaction-to-next-paint`, but lab Lighthouse cannot measure INP — it's a passive observer that only records during real user interactions, returns 0/undefined in headless CLI runs. First LHCI run failed with `auditRan` warnings on INP for all three URLs. Swapped to `total-blocking-time`, the lab-measurable proxy. INP itself should be tracked via Vercel Speed Insights / CrUX field data.
- Workflow: `.github/workflows/lighthouse.yml` runs on PR or push to `main` / `rebuild/from-scratch`. Uses pnpm/action-setup@v4, node 24, `pnpm dlx @lhci/cli autorun`. 20-minute timeout.
- startServerCommand: `pnpm build:standalone && pnpm start:standalone` (plain node) instead of `pnpm start` which uses bun (not installed in CI runners).
- Reports uploaded to LHCI temporary public storage; URLs in commit message.
- Gate output:
  ```
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Blockers: none.

### Commit 16. text-accent contrast audit

- Status: SKIPPED
- SHA or SKIPPED with reason: SKIPPED — no targets found and no contrast failures detected.
- Pre-check `grep -rnE 'text-accent\b' src/ | grep -vE 'text-accent-(foreground|text)'`: zero matches. Bare `text-accent` Tailwind class is not used anywhere in the codebase. Consumers use either inline `var(--color-accent)` style, `text-[color:var(--color-accent)]` arbitrary syntax, or already-correct `text-[color:var(--color-accent-text)]` for the rare light-bg case.
- Lighthouse color-contrast audit on all three pillar pages (from Commit 15 local run): score 1.0, 0 failing items. The site's dark-canvas default means amber accent runs against #0a0a0a (~6.1:1 ratio, AA pass).
- Audit's premise — that `text-accent` is used on light backgrounds where it fails contrast — does not match this codebase's actual usage pattern.
- Followup: residual `#FF8800` hex literals exist in research/ and tools/ pages (Commit 5 only scoped Blog+Audit). These render on dark canvas so contrast is fine, but they should be migrated to `var(--color-accent)` for design-system consistency. Logged as a separate sweep.
- Blockers: none.

### Commit 17. Organization schema sameAs + contactPoint, drop unused await headers()

- Status: DONE (scope adjusted)
- SHA: c06284bd797752508409f57c553fa4d3a0b17859
- Files changed: src/app/layout.tsx
- sameAs URLs added: none. Project CLAUDE.md confirms only LinkedIn presence; pre-existing `sameAs: ["https://www.linkedin.com/company/digitalpointllc"]` left as-is. Did not invent X/Twitter, GitHub-org, Crunchbase per prompt's stop condition.
- contactPoint additions: `areaServed: "Worldwide"`, `availableLanguage: ["en"]`. Existing fields (`@type: ContactPoint`, `contactType: customer service`, `description`, `url: digitalpointllc.com/#contact-philosophy`) preserved. The deep-anchor URL is intentional per the existing layout.tsx comment (Phase 17b 3-reversal E1: no shared inbox, route to Cosmo + audit form).
- CSP nonce trace (`grep -rn "nonce" src/app/ src/components/ src/lib/`):
  - 5 consumers found:
    1. `src/app/layout.tsx:124` — Organization JSON-LD nonce
    2. `src/app/layout.tsx:165` — Professional Service JSON-LD nonce
    3. `src/app/layout.tsx:191` — WebSite JSON-LD nonce
    4. `src/app/(marketing)/blog/category/[category]/page.tsx:84` — CollectionPage JSON-LD nonce (Commit 7)
    5. `src/app/(marketing)/guides/[slug]/page.tsx:84` — BlogPosting JSON-LD nonce (Commit 6)
  - Nonce IS consumed → cannot remove `await headers()`. Added a comment block above the headers() call documenting the dependency. Route stays dynamic. The audit's "restore static prerender" was based on incomplete consumer info (Commits 6 + 7 added two more consumers after the audit was written).
- Gate output:
  ```
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Blockers: none.

---

## Batch H — HOTFIX (commits H1-H6)

### Commit H1. Fix audit form Step 3 input focus loss

- Status: DONE
- SHA: ee13648092577492472b9bf21ce958c9bde4cf64
- Files changed: src/lib/framer-compat.ts
- Root cause: motion proxy in `src/lib/framer-compat.ts` called `makeMotionTag(prop)` on every `motion.div` access, returning a fresh function reference each time. React compares `element.type` by reference; new ref per render = new component type = unmount+remount of the entire `<motion.div>` subtree on every parent re-render. Step 3's parent (`AuditPage`) re-renders on every keystroke (setFormData), so each keystroke destroyed and recreated the input → focus died with the old DOM node.
- Fix: cache results of `makeMotionTag` in a `Map<string, Component>` keyed by tag name. Same `motion.div` reference returned across all renders.
- Note on prompt deviation: prompt offered Path A (extract Step 3 to memoized child) and Path B (UTM in useEffect). Neither addresses the actual root cause — `React.memo` cannot skip a re-render when `formData` props change every keystroke, and UTM hydration is unrelated since those values are never rendered to DOM. The shim fix is minimal, root-cause correct, and also benefits the one other consumer (`src/components/seo/GrowthAuditCTA.tsx`).
- Verification (Playwright headless, dev server on http://localhost:3000):
  - Navigated through Step 1 (clicked "Inconsistent leads") → Step 2 (clicked "Under $10k/mo") → Step 3
  - Typed `UmerFarooq` into #name → final value `UmerFarooq`, document.activeElement.id === "name"
  - Typed `umer@digitalpointllc.com` into #email → final value matches, activeElement === "email"
  - Typed `Digital Point LLC` into #company → final value matches, activeElement === "company"
  - Console errors: one pre-existing JSON-LD nonce hydration mismatch (server renders nonce="..." from headers(), client hydrates with nonce=""). Unrelated to focus and pre-dates this commit. Logged for separate triage.
- Gate output (last 10 lines of `pnpm build`):
  ```
  ├ ƒ /tools/cac-calculator
  ├ ƒ /tools/dashboard-cost-calculator
  └ ƒ /tools/roas-calculator


  ƒ Proxy (Middleware)

  ○  (Static)   prerendered as static content
  ƒ  (Dynamic)  server-rendered on demand
  ```
- Blockers: none.

---

## Final verification

- `git log --oneline rebuild/from-scratch ^main | wc -l` (must equal commits actually shipped):
- `git config --get remote.origin.url` (must equal `git@github.com:UMIDX124/DIGITAL-POINT-LLC.git`):
- `cat .vercel/project.json | grep projectName` (must equal `digitalpointllc-1`):
- LHCI assertions pass on pillar pages:
- Independent agent audit result:

## Lessons / follow-ups

- **Undefined CSS variables in BlogPage + AuditPage (real bug, separate scope).** Both files reference `var(--accent-bright)`, `var(--accent-primary)` (one fixed in Commit 5), `var(--text-primary)`, `var(--text-muted)` from an older naming convention. None of these are declared in the `@theme inline` block in `src/app/globals.css` (which uses the `--color-*` namespace). The pages still render because `var()` falls back to browser defaults (transparent for color, inherited for text), but it's a real bug masking specific style intent. Full migration to `--color-*` is its own commit. Fix after Batch C.
- **Vercel auto-deploy from GitHub push not wired.** All recent deployments came from CLI `vercel` runs, not from git pushes (most recent auto/CLI deploy was 1-3 days old at Batch B push time). Generated Batch B preview manually via `vercel` (non-prod). If desired, wire Vercel's git integration so future pushes get automatic preview URLs.
- **Vercel build script uses `bun .next/standalone/server.js`** (see `package.json` "start" script). Bun is not installed in the dev environment. Sitemap verification in Commit 9 used `pnpm dev` instead of `pnpm start`. If `pnpm start` is needed locally, either install bun or change `start` to `next start`.
- **`pnpm exec tsc --noEmit` produces no progress output** on this codebase. Worth knowing: silence = success here, not a hung process.
- **Pre-push build gate is ~50s.** Acceptable but slow enough that batched pushes are preferable to single-commit pushes.

### Deferred runtime tests / out-of-scope follow-ups

- **Commit 11 timeout simulation**: did not exercise the 504 + `code: 'groq_timeout'` path live. Requires either a working GROQ_API_KEY plus simulated network delay (not local) or a temp-edit-and-revert cycle.
- **Per-guide dynamic OG images**: deferred to Commit 13 (Batch C) per the prompt.
- **Categories that have no indexable posts** still emit a CollectionPage schema (Commit 7) with empty `hasPart`. Currently 6 of 9 categories have zero indexable posts. Consider gating the schema emit on `posts.length > 0` for cleaner JSON-LD validation.

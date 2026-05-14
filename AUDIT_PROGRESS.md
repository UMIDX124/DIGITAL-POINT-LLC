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

- Status: PLANNED
- SHA:
- Files changed:
- Pre-check output (`grep -rn "from.*lib/analytics" src/`):
- Gate output:
- Blockers:

---

## Batch B — HIGH (commits 5-11)

### Commit 5. Replace hardcoded hex with tokens in BlogPage + AuditPage

- Status: PLANNED
- SHA:
- Files changed:
- Token map used (must match actual `globals.css` `@theme` block):
- Gate output:
- Screenshots:
  - docs/screenshots/commit-05/blog-1440.png
  - docs/screenshots/commit-05/audit-1440.png
- Blockers:

### Commit 6. Per-guide metadata + Article schema

- Status: PLANNED
- SHA:
- Files changed:
- MDX frontmatter fields confirmed:
- Author resolution (Umer is kept out of public marketing per CLAUDE.md, default to Faizan or Anwaar):
- Gate output:
- Blockers:

### Commit 7. Category hub metadata + CollectionPage schema

- Status: PLANNED
- SHA:
- Files changed:
- Category source (where the list of categories lives):
- Gate output:
- Blockers:

### Commit 8. Convert cookies page to RSC

- Status: PLANNED
- SHA:
- Files changed:
- Gate output:
- Screenshot:
  - docs/screenshots/commit-08/cookies-1440.png
- Blockers:

### Commit 9. Sitemap lastModified from MDX frontmatter

- Status: PLANNED
- SHA:
- Files changed:
- Verification (`curl localhost:3000/sitemap.xml | grep lastmod | head -20`):
- Gate output:
- Blockers:

### Commit 10. Fix ChatPanel mobile width overflow

- Status: PLANNED
- SHA:
- Files changed:
- Screenshots at 320 and 360:
  - docs/screenshots/commit-10/chat-320.png
  - docs/screenshots/commit-10/chat-360.png
- Gate output:
- Blockers:

### Commit 11. 25s abort ceiling on Groq fetch in chat route

- Status: PLANNED
- SHA:
- Files changed:
- Manual test output (normal request 200, simulated timeout 504):
- Gate output:
- Blockers:

---

## Batch C — MEDIUM (commits 12-17)

### Commit 12. Pause Cosmo FAB idle animation off-screen

- Status: PLANNED
- SHA:
- Files changed:
- Verification (DevTools Performance tab idle CPU before/after):
- Gate output:
- Blockers:

### Commit 13. Dynamic OG images per blog + guide route

- Status: PLANNED
- SHA:
- Files changed:
- Sample OG image rendered (paste 200 status from `/blog/<slug>/opengraph-image`):
- Gate output:
- Blockers:

### Commit 14. CountUp stagger verification (likely no-op if commit 1 covered)

- Status: PLANNED
- SHA or SKIPPED with reason:
- Verification (two CountUp instances on /pricing start 80ms apart):
- Blockers:

### Commit 15. Lighthouse CI assertions for INP, CLS, LCP, perf score

- Status: PLANNED
- SHA:
- Files changed (lighthouserc.json + GitHub Actions workflow):
- LHCI local run output (`pnpm dlx @lhci/cli autorun` against 3 pillar pages):
- Gate output:
- Blockers:

### Commit 16. text-accent contrast audit

- Status: PLANNED
- SHA:
- Files changed:
- Pages audited with axe DevTools:
- Screenshots:
- Gate output:
- Blockers:

### Commit 17. Organization schema sameAs + contactPoint, drop unused await headers()

- Status: PLANNED
- SHA:
- Files changed:
- sameAs URLs added (must be real, user-confirmed):
- CSP nonce trace result (consumers found yes/no):
- Gate output:
- Blockers:

---

## Final verification

- `git log --oneline rebuild/from-scratch ^main | wc -l` (must equal commits actually shipped):
- `git config --get remote.origin.url` (must equal `git@github.com:UMIDX124/DIGITAL-POINT-LLC.git`):
- `cat .vercel/project.json | grep projectName` (must equal `digitalpointllc-1`):
- LHCI assertions pass on pillar pages:
- Independent agent audit result:

## Lessons / follow-ups

(Terminal Claude appends here: anything that came up mid-run, deferred items, unexpected findings.)

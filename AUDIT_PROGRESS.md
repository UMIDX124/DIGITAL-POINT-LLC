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

- Status: PLANNED
- SHA:
- Files changed:
- Gate output:
- Screenshots (must exist):
  - docs/screenshots/commit-02/home-360.png
  - docs/screenshots/commit-02/home-768.png
  - docs/screenshots/commit-02/home-1440.png
- Cookie verification (incognito first visit shows, reload suppresses, new incognito tab shows):
- Blockers:

### Commit 3. Homepage metadata, canonical, OG

- Status: PLANNED
- SHA:
- Files changed:
- Gate output:
- Metadata source (where the title/description came from):
- Canonical domain confirmed:
- Blockers:

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

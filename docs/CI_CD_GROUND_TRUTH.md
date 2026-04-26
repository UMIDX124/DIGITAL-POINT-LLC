# CI/CD Ground Truth — Digital Point LLC website

*Generated 2026-04-26 as part of Phase 17a closure audit Part 2 §6.*
*Observational. No remediation.*

## 1. Reality (verified 2026-04-26 against working tree at HEAD `2ada189`)

The repository has **no GitHub Actions surface**:

- `.github/` directory **does not exist** (`ls -la .github/` → `No such file or directory`).
- `.github/workflows/` directory **does not exist**.
- No `deploy.yml`, no `ci.yml`, no any-`*.yml` workflow files anywhere in the repo.
- `vercel.json` **does not exist** at repo root (Vercel applies framework defaults).
- `package.json` has **no** `deploy:` or `vercel deploy` script (`grep "vercel deploy\|vercel --prod\|deploy:"` → 0 hits).

Deployment is performed by **Vercel's native GitHub integration**:

- A push to `origin/main` triggers a Vercel build via the Git connection on the project `umidx124s-projects/digitalpointllc-1`.
- The build runs on Vercel's serverless build infrastructure (pnpm detected automatically; spec-stated pnpm v10.28, Node 22.x default).
- The deployment URL `dpl_DVDSYCovASZozrcPPCSkWowXXAkz` (current production) corresponds 1:1 to commit `2ada189c08ed8a91c89222f7d013057f4402c302` on `origin/main`.

The Phase 17a-1 ship sequence (`28c739f` push → Vercel build failure on missing `@types/node` → `2ada189` hotfix push → Vercel build success → production rotation) is consistent with Vercel-native auto-deploy on push. There is no terminal artefact (in shell history or session log) of a manual `pnpm dlx vercel deploy --prod` invocation; nor is there any other path by which the live deploy could exist given the absence of a workflow file.

## 2. Memory-documentation claim

Internal/session notes have referenced a `.github/workflows/deploy.yml` workflow as the deploy mechanism. **This claim is incorrect.** No such file exists, has existed in any audited commit, or is referenced in any deploy-relevant configuration.

## 3. Reconciliation recommendation (deferred to Phase 18)

Three options for closing the gap, in order of effort:

1. **Document reality only (LOW effort, RECOMMENDED for Phase 18):** Update internal memory / CLAUDE.md / any `docs/DEPLOY.md` if/when one is created to state plainly: *"Deployment: Vercel native GitHub auto-deploy on push to `main`. No GH Actions. No `vercel.json`. Build settings managed via Vercel project dashboard at vercel.com/umidx124s-projects/digitalpointllc-1."* Removes the false claim; codifies the actual surface.

2. **Add a thin GH Actions workflow for verification (MEDIUM effort):** Create `.github/workflows/verify.yml` that runs `pnpm install --frozen-lockfile`, `pnpm lint`, and `pnpm build` on PR + push to `main` — **not** as the deploy mechanism, but as a local-equivalence gate that catches Vercel-divergent failures (e.g., the `@types/node` gap that surfaced in 17a-1) **before** the Vercel build runs. Vercel auto-deploy stays as-is. Net effect: catch hotfix-class issues at PR time instead of deploy time.

3. **Move deploy fully into GH Actions (HIGH effort, NOT recommended):** Create `deploy.yml` that runs `vercel build` + `vercel deploy --prebuilt --prod` with a `VERCEL_TOKEN` secret. Disables Vercel native Git auto-deploy. Adds a layer of indirection without obvious benefit for a single-repo, single-environment site; sacrifices Vercel preview-deploy ergonomics; adds a maintenance burden.

**Recommendation: pursue option 1 in Phase 18 (documentation-only reconciliation), keep auto-deploy as the deploy surface, and revisit option 2 if a second 17a-1-class drift surfaces.**

## 4. Vercel project settings (not introspected this audit)

The following settings would normally be confirmed via `vercel project inspect umidx124s-projects/digitalpointllc-1` or the dashboard `/settings/git`:

- Auto-deploy on push to `main`: presumed ENABLED (only path consistent with observed deploy chain).
- Preview deployments on PR: presumed ENABLED (Vercel default).
- Build command: presumed `pnpm build` (Vercel framework auto-detect).
- Install command: presumed `pnpm install --frozen-lockfile` (Vercel pnpm default).
- Node version: presumed 22.x (Vercel default; matches `@types/node@^22.19.17`).
- pnpm version: spec-stated v10.28 (local environment is v10.33; the version mismatch is what made `@types/node` peer-hoisting work locally but not on Vercel — see Phase 17a closure report §10.5).

These are listed for Phase 18 verification, not as audited claims.

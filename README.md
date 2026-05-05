# Digital Point LLC — Marketing Site

Production: <https://www.digitalpointllc.com>

AI automation agency selling outcomes (not software). Five service pillars: AI Agents, Workflow Automation, Remote Operators, Performance Marketing, Systems & Reporting.

## Stack

- Next.js 16 App Router (Turbopack) · React 19 · TypeScript strict
- Tailwind v4 (`@theme inline` tokens in `src/app/globals.css`)
- shadcn/ui + DPL overrides (`src/components/ui-dp/`)
- Lenis smooth-scroll + GSAP ScrollTrigger (Phase 19 supersedure)
- Three.js hero atmosphere (lazy + reduced-motion gated)
- Geist Sans + Geist Mono + Instrument Serif (italic display)
- Vercel deploy · GitHub Actions CI · pnpm only

## Where to look

| File | What |
|---|---|
| `CLAUDE.md` | **Read first.** Locked invariants (K1-K17), session-start protocol, personal preferences, Phase 18-19 ship history. |
| `PRODUCT.md` | Brand register, voice, audience, anti-references. |
| `DESIGN.md` | Color tokens, typography, spacing, motion, banned patterns. |
| `MASTER-WEBSITE-PROMPT.md` | Original project charter (historical reference). |
| `docs/HANDOFF_PHASE_19.md` | Latest ship state + open punch list. |
| `docs/SESSION_HANDOFF.md` | Phase 17b → 18.6 historical handoff. |
| `docs/PHASE_18_5_SUMMARY.md` | Atmosphere + Three.js + parallax ship report. |
| `docs/CI_CD_GROUND_TRUTH.md` | Build pipeline + deploy lanes. |
| `ENV-AUDIT.md` | Environment variable audit (Apr 2026). |

## Common commands

```bash
pnpm dev           # local dev on :3000 (logs to dev.log)
pnpm build         # prisma generate && next build
pnpm lint          # ESLint
pnpm exec tsc --noEmit   # typecheck
```

## Locked rules (do NOT violate)

- Bloomberg Operator palette only: `#000` canvas, `#FF8800` amber, `#2A8FBD` blue. Zero violet/indigo/purple anywhere.
- Hero copy locked: `Hire the AI. Skip the headcount.`
- 5-service order locked: AI Agents → Workflow Automation → Remote Operators → Performance Marketing → Systems & Reporting.
- K11 Lighthouse mobile median ≥ 92 ship gate.
- Never force push, never `--no-verify`, never `--amend` on pushed commits.
- pnpm only (never npm).

Full list of K1-K17 + Phase 18.5 carve-outs in `CLAUDE.md`.

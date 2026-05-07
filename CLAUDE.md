# Digital Point LLC — Project Rules

> Single source of truth. Every Claude session reads this in full before touching code. Global `~/.claude/CLAUDE.md` rules apply on top.

---

## Stack

- Next.js 16 App Router · React 19 · TypeScript strict · Turbopack
- Tailwind v4 (CSS variables in `globals.css` `@theme` block)
- shadcn/ui primitives · Radix UI
- Prisma 6 ORM · SQLite (dev), Neon Postgres planned
- GSAP 3 + Lenis (smooth-scroll bridge mounted in marketing layout)
- Three.js (lazy-loaded, desktop + no `prefers-reduced-motion` only)
- Resend + Nodemailer for email · Groq for Cosmo chat (`llama-3.3-70b-versatile`, temp 0)
- Vercel BotID protects `/api/audit`, `/api/founder`
- pnpm package manager — never npm

---

## Brand

- **Hero copy:** `Hire the AI. Skip the headcount.` Em wraps "the AI" only. Period inline outside em.
- **Palette (Bloomberg Operator):**
  - Canvas `#000`
  - Amber primary `#FF8800`
  - Instrument blue secondary `#2A8FBD`
  - **Zero violet, indigo, or purple anywhere** on content surfaces.
  - Hero atmosphere may render amber ≤30% opacity, blue ≤22% opacity in background only.
- **Service order (locked):** AI Agents → Workflow Automation → Remote Operators → Performance Marketing → Systems & Reporting.
- **Logo:** `public/Dp-logo1.png` (256×256, target ≤30 KB). Use `next/image` for every render. Schema URLs point to the same file.
- **Founders:** M. Faizan Rafiq (Co-Founder), Anwaar Tayyab (Co-Founder). DPL founded 2017. Worldwide service.
- **Type:** Geist Sans (display + body), Geist Mono (code/numbers), Instrument Serif Local (selective italic accents).
- **Cosmo chat mark:** `src/components/cosmo/CosmoMark.tsx` inline SVG (oscilloscope-wave). Distinct from brand mark `Dp-logo1.png`.

---

## Service offerings (PRODUCT)

1. **AI Agents** — deploy agents that run repeatable knowledge work (CRM updates, lead routing, qualification, follow-up).
2. **Workflow Automation** — replace manual handoffs across the stack (CRM, tickets, docs, ops).
3. **Remote Operators** — trained humans audit edges where automation breaks; not generic VAs.
4. **Performance Marketing** — paid acquisition operated against ROAS / CAC targets, with attribution that ties spend to revenue.
5. **Systems & Reporting** — measurement infrastructure, dashboards, and weekly delta reports.

Pricing tiers, retainer ranges, and contact entry points live in `src/lib/copy.ts`.

---

## Anti-patterns (NEVER write, NEVER ship)

### Visual
- No purple, indigo, violet on content surfaces.
- No fake testimonials, fake logo rails, fake metrics. `TestimonialsSection` returns null for this reason.
- No magazine furniture (deckle edges, drop caps, paper grain, salmon backgrounds, serif display fonts).
- No emoji in markup. Use `lucide-react` icons.

### Copy
- No em-dashes anywhere (`—`). Use a period or comma.
- No three-item rhetorical lists (A, B, and C). Two beats three.
- No binary contrasts ("not X — it's Y"). State Y directly.
- No throat-clearing openers ("Here's the thing", "It turns out", "The truth is", "Let me be clear").
- No business jargon. Banned: navigate, unpack, lean into, landscape, double down, deep dive, take a step back, moving forward, circle back, on the same page, game-changer, industry-leading, next-generation, cutting-edge.
- No `-ly` adverbs (really, just, literally, genuinely, honestly, simply, actually, truly, fundamentally, personally).
- No vague declaratives ("the implications are significant" → name the implication).
- No Wh-sentence starters (What/When/Where/Who/Why/How as the lead word).
- No passive voice. Find the actor.
- No "Talk to founder →" CTAs. Use "Book audit", "Run audit", "Talk to sales".

### Architectural
- No AI-template tier proposals (Free/Pro/Agency, ROI calculator, /for-agencies route) without explicit user approval.
- No backwards-compat shims when the change is intentional. Delete dead code.
- No comments by default. Names explain WHAT; commit message explains WHY. Comments only when WHY is non-obvious.

---

## Real-data rule

Every claim, metric, customer logo on the site:
- Traces to a named source (real client agreement, real measurement, Lighthouse / CrUX / GSC) OR
- Is explicitly marked `[design only]` until real.

LLMs are explainer-only. They never generate metrics.

---

## Quality gates per commit

All four must pass before commit:

1. `pnpm exec tsc --noEmit` → 0 errors
2. `pnpm lint` → 0 warnings
3. `pnpm build` → succeeds
4. Headless screenshot → no empty regions, no overflow, no contrast regressions

Plus when perf-impacting:
- Lighthouse mobile median ≥ 92 (perf, a11y, best-practices, SEO).
- LCP < 2.5 s, CLS ≤ 0.1, TBT ≤ 200 ms.

---

## Workflow

- **Cwd discipline:** every shell command starts with `cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 &&`. Before any `git push` print `git config --get remote.origin.url` and confirm it matches `git@github.com:UMIDX124/DIGITAL-POINT-LLC.git`. Before any `vercel` command read `.vercel/project.json` and confirm `projectName: digitalpointllc-1`.
- **One commit per coherent change.** Imperative subject. No marketing language.
- **Co-author tag:** `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`
- **Pause for user before deploys.** No `vercel deploy --prod` without explicit "ship it".
- **Force push: never.** No `--no-verify`. No `--amend` on pushed commits.
- **Never commit `.env` files.** Always grep before staging.
- **Hinglish OK** in chat. Lead with problems, then with what worked. Numbers over adjectives. End-of-turn = 1-2 sentences.

---

## Skill bundles (project-scoped at `.claude/skills/`)

- `marketingskills` (40 skills) — copywriting, page-cro, seo-audit, ai-seo, schema-markup, pricing-strategy. Foundation: `.agents/product-marketing-context.md`.
- `stop-slop` — final pass on every word of marketing copy.
- `remotion` — programmatic video generation in React.
- `agent-skills-for-context-engineering` (14 skills) — orchestration / multi-agent / memory work.

For marketing copy: read `.agents/product-marketing-context.md` → invoke `copywriting` (or relevant CRO skill) → run `stop-slop` final pass → score ≥ 35/50 before commit.

---

## Update protocol

If a new rule needs to lock, append it to the right section above. Do NOT spawn a new doc. The proliferation of phase / handoff / audit files in this repo was the failure mode that motivated this rewrite — single source of truth, edited in place.

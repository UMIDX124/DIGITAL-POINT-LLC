# Digital Point LLC — Project Rules

Single source of truth. Every Claude session reads this in full before touching code. Global `~/.claude/CLAUDE.md` rules apply on top. When a rule conflicts, the project file wins on project decisions.

---

## What DPL is, in one paragraph

Digital Point LLC is a managed-service company. We deploy and operate AI agents plus trained human operators so mid-sized businesses get their repeatable operations work done without hiring a team. Founded 2017. Worldwide service. Two co-founders public-facing: M. Faizan Rafiq (paid media + account restructure) and Anwaar Tayyab (attribution + data integration). The behind-the-scenes operator who builds and runs the systems is Umer Farooq, kept out of public marketing.

---

## Who buys from us (the tier reality)

- Companies with $500K to $10M annual revenue. 5 to 25 employees. Stretch up to $15M for founders who came in via warm referral.
- Decision-maker is the founder, CEO, or COO. Not a procurement department.
- Typical deal size: **$10K to $30K** total spend in year one.
- Pricing ladder is published: free audit, $5K recovery diagnosis, $10K recovery fix, $2,500 pilot, $2,500/month retainer.

We do not pitch enterprise. SOC 2, vendor security questionnaires, named Fortune 500 logos are out of scope. If a Fortune 500 procurement team contacts us, we refer them elsewhere.

---

## What we sell (current live state)

Three active pillars and one category creator:

1. **AI Agents** — autonomous workflows that replace repeatable headcount.
2. **Workflow Automation** — connect tools, data, and humans so handoffs happen without manual work.
3. **Remote Operators** — vetted humans layered over the AI for cases automation can't handle.
4. **Recovery** (category creator) — audit broken AI agent stacks, ship the patch, operate it.

Performance Marketing and Systems & Reporting were earlier pillars that have been demoted off the active site. Do not re-add them without explicit user approval.

---

## Visual rules

### What's locked

- Amber accent `#FF8800` is the only primary brand color.
- Secondary blue `#2A8FBD` is permitted, used sparingly.
- Off-white text `#F5F5F7` on dark surfaces. Dark text `#0a0a0a` on light surfaces.
- Mid-grey `#969aa3` for secondary text.
- Typography: Geist Sans (body and display), Geist Mono (numbers, code, file paths).
- Logo: the current DP wordmark lockup at `public/Dp-logo1.png` (default, dark elements for light surfaces) and `public/Dp-logo1-dark.png` (light elements for dark surfaces).
- Founder photos when used: real, professional. No stock headshots. No AI-generated faces.

### What's open (revisit when relevant)

- Canvas direction (light default vs dark default vs sectional mix) is NOT locked. Phase 3 visual upgrade work is actively re-evaluating this; current site is dark-default pending that decision.
- Imagery direction (photo-heavy vs diagram-heavy vs minimal) is open per page.
- Hero treatment (text-only vs SVG geometric motif vs photo support) is open per page.

### Universal anti-patterns (never propose, never ship)

- Never use purple, indigo, or violet anywhere.
- No chrome / 3D / holographic / glassmorphism effects.
- No gradients across multiple color stops.
- No fake testimonials, fake logo rails, fake metrics.
- No magazine furniture (deckle edges, drop caps, paper grain, serif display fonts).
- No emoji in markup. Use `lucide-react` icons or inline SVG.
- No AI-generated illustrations as production assets. Code-generated SVG only for geometric work.

---

## Voice rules

Direct. Specific. Plain English. Numbers over adjectives.

### What's locked

- Hero copy: `Hire the AI. Skip the headcount.` The em wraps "the AI" only. Period inline.
- No em-dashes (`—`) in any copy or comments. Use a period or comma.
- No three-item rhetorical lists (`A, B, and C`). Two beats three.
- No binary contrasts (`not X, it's Y`). State Y directly.
- No throat-clearing openers ("Here's the thing", "It turns out", "The truth is", "Let me be clear").
- No business jargon. Banned: navigate, unpack, lean into, landscape, double down, deep dive, take a step back, moving forward, circle back, on the same page, game-changer, industry-leading, next-generation, cutting-edge.
- No `-ly` adverbs as filler (really, just, literally, genuinely, honestly, simply, actually, truly, fundamentally, importantly).
- No vague declaratives ("the implications are significant" — name the implication).
- No Wh-sentence starters as the leading word (What/When/Where/Who/Why/How).
- No passive voice. Find the actor, lead with them.
- No "Talk to founder →" CTAs. Use specific labels: "Book audit", "Run audit", "Talk to sales".

### What's open

- Sentence length, paragraph structure, and section pacing vary per page intent.
- Headline rhythm (statement vs question vs verb-led) is open.

### Voice the writing should land at

Confident without hype. Specific without jargon. Plain enough that a non-technical mid-market founder reads it without dictionary. Numbers carry the weight that adjectives would carry in worse writing.

Do not name a reference brand here. Do not write "like X" comparisons. The voice is its own thing.

---

## Real-data rule

Every claim, metric, customer logo, testimonial on the site must:
- Trace to a named source (Lighthouse, Search Console, CrUX, Schema.org, real customer agreement, real measurement, BLS / Glassdoor / Levels.fyi for benchmarks), OR
- Be explicitly marked `[design only]` until real.

LLMs are explainer-only. They explain measured findings; they never generate findings. If a finding wasn't measured, it doesn't appear.

Case studies as composites are allowed when explicitly disclosed via banner. Named-client work surfaces after written client signoff.

---

## Workflow rules

### Commit cadence

- One commit per coherent change. Imperative subject. No marketing language.
- Quality gate per commit: `pnpm exec tsc --noEmit` zero errors, `pnpm lint` zero warnings, `pnpm build` succeeds.
- After API or DB changes: smoke-test with malformed AND valid payloads before commit.
- Co-author trailer: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`

### Git

- Default working branch is `rebuild/from-scratch`. Promote to `main` only after ship verification.
- Never force push. Never `--no-verify`. Never `--amend` on pushed commits.
- Never commit `.env` files. Grep before staging.

### Cwd discipline

- Every shell command involving the project starts with `cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 &&`.
- Before push: print `git config --get remote.origin.url`, confirm equals `git@github.com:UMIDX124/DIGITAL-POINT-LLC.git`.
- Before Vercel deploy: read `.vercel/project.json`, confirm `projectName: digitalpointllc-1`.

### Deploy gates

- No `vercel --prod` without explicit user "ship it".
- Phased work runs through ship-it gates at the end of each block.
- After deploy, run prod smoke (curl headers, hit a representative endpoint, browser sanity).

---

## Default tech stack

- Next.js 16 App Router + Turbopack + TypeScript strict
- React 19 (Server Components default; `"use client"` only when state/effects/event handlers needed)
- Prisma 6 + Neon Postgres (Vercel Marketplace, migrated 2026-05-12)
- Tailwind v4 (`@theme inline` tokens in `src/app/globals.css`)
- shadcn/ui primitives
- BotID protects POST routes
- Upstash Redis for rate limiting
- Resend + Nodemailer for email
- Groq (`llama-3.3-70b-versatile`, temperature 0) for Cosmo chat
- Geist Sans + Geist Mono fonts (self-hosted)
- Zod runtime validation at every API boundary
- pnpm package manager. Never npm.
- Vercel prod deploy.

---

## Audit history (recent)

- 2026-05-12: Phase 1 + Phase 2 (Blocks A, B, C) + logo swap shipped. Composite scorecard moved 55 to 73 of 100.
- 2026-05-12: Phase 3 Block D (Prisma SQLite to Neon Postgres) shipped.
- 2026-05-12: CLAUDE.md rewritten to remove AI-injected brand vocabulary that had calcified across multiple sessions.
- Phase 3 visual upgrade work pending: canvas direction decision, sectional contrast, founder photo integration, SVG geometric primitives, OG image regeneration, `/llms.txt`, static-hash CSP for desktop perf recovery.

Reports live at `docs/audit-2026-05-12/reports/` (3 PDFs: executive summary, detailed report, employee overview). PDFs contain residual references to retired brand vocabulary; regenerate if needed.

---

## Anti-patterns we learned the hard way

These are lessons from real session damage, not theoretical risks.

1. **AI-injected brand vocabulary calcifies if not challenged.** A previous Claude Code session added "Bloomberg Operator" as a palette name. It survived multiple audits and shaped dozens of design decisions before getting flushed. Whenever a brand reference name appears in this file, question whether it serves DPL or whether it's AI cruft.
2. **Don't promise output Claude can't reliably produce.** Hand-drawn illustrations, photorealistic imagery, premium brand mark redesign are outside reliable LLM output. Code-generated SVG geometric work IS reliable.
3. **Don't claim work is verified clean without actually looking.** Technical smoke (file returns 200) is not the same as visual verification (rendered correctly across breakpoints, doesn't break neighboring elements). Both required before claiming done.
4. **Don't project risk-aversion onto user decisions.** When in doubt about ambitious vs conservative, ask. Don't assume slow + careful is better when the user is actively shipping at pace.
5. **Don't sugar-coat scorecard math to feel encouraging.** Real +5 is real +5. Reframing as "+30 percentage points on procurement survivability" is bias dressed up as honesty.
6. **Don't over-fit to enterprise framing.** DPL is $10-30K mid-market. SIG-Lite, SOC 2, named Fortune 500 logos are not the bar. The bar is "looks competent and trustworthy to a CEO/COO at a $5M company."
7. **Don't let Phase 3 work become a procurement-grade enterprise migration.** Tier-correct prioritization always.

---

## Decision protocol when a rule should be challenged

Rules in this file are defaults. They become wrong when reality changes. If a Claude session believes a rule no longer serves DPL:

1. Surface the conflict explicitly to the user. Say which rule, why it's wrong now, what should replace it.
2. Do not silently work around the rule.
3. Do not silently follow the rule when its premise is no longer true.
4. Get explicit user signoff before updating this file.

The Bloomberg lesson: a rule that doesn't serve the buyer accumulates damage every time it's followed. Challenge it.

---

## Update protocol

If a new rule needs to lock, append it to the right section above. Do NOT spawn a new doc. The proliferation of phase / handoff / audit files in this repo was the failure mode that motivated the rewrite. Single source of truth, edited in place.

# DPL Phase 20 — Autonomous Polish Loop

> **Single directive. Self-loops until ALL success criteria met OR a HARD HALT fires.**
>
> Paste this one-line into terminal Claude (with auto mode on):
> ```
> Read /Users/laptopchoice/Projects/_services/digitalpointllc-1/PHASE_20_POLISH_PROMPT.md in full and execute end-to-end with the autonomous-loop semantics. Resume from docs/PHASE_20_PROGRESS.md if it exists.
> ```
>
> Bar: every commit measured against "would this close a $50K-$100K retainer for an AI-automation engagement." Linear / Vercel / Stripe enterprise quality, within DPL's locked Bloomberg-Operator brand.

---

## 1. AUTONOMOUS LOOP SEMANTICS

**Run continuously. Do not split into multiple sessions without a resume marker. Do not stop unless a HARD HALT condition fires.**

### Per-commit cycle (every single commit)
1. Make change
2. Run quality gates (Section 14 — ALL must pass)
3. If gates fail → fix the root cause, retry. ≤3 retry attempts. After 3 failed retries → HARD HALT 6 fires.
4. If gates pass → commit, log to progress doc, continue.

### Per-batch cycle (every 5 commits)
1. Push to origin: `cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && git push origin redesign/impeccable-pass`
2. Capture Vercel preview URL.
3. Update `docs/PHASE_20_PROGRESS.md` with batch summary.
4. Continue to next batch.

### Per-phase cycle (every loop body A-I)
1. Read prerequisites for this phase (locks, prior progress).
2. Execute phase tasks.
3. Verify phase success criteria met.
4. Write phase boundary entry to `docs/PHASE_20_PROGRESS.md`: phase name, commits shipped (hashes + 1-line each), success-criteria checklist (✅/❌ each), next phase.
5. Continue to next phase.

### HARD HALT conditions (the ONLY reasons to stop)
1. **Mascot concept board ready, awaiting UF pick** — Sub-phase A complete, Sub-phase B blocked until UF replies "concept N" or "regenerate concept N with X tweak."
2. **K1-K17 locked invariant violation detected** — never auto-override. Halt, post the conflict, wait for explicit user override.
3. **Real-data input needed from UF** — e.g. customer logo signoff, 5 priority verticals for programmatic SEO, real metric source, client-cleared flag for case studies.
4. **Pre-deploy gate (Phase I)** — wait for "ship it" before `vercel deploy --prod`.
5. **Session quota >90%** — checkpoint to `PHASE_20_PROGRESS.md` and halt cleanly. Resume next session.
6. **Build / type / lint persistent failure (>3 retries)** — flag root cause, halt.
7. **Branch divergence** — if `git pull --rebase` would conflict on next push, halt and surface conflict.

### Resume protocol (on interruption)
On resume:
1. Read this file in full.
2. Read `docs/PHASE_20_PROGRESS.md` (if exists). Find the last completed phase and last commit hash.
3. Continue from the next phase / commit. Do NOT restart Phase 0.
4. If progress doc is missing or unparseable, restart from Phase 0.5 (skip Phase 0 reads if locks haven't changed since last session).

---

## 2. CWD DISCIPLINE (NON-NEGOTIABLE)

Every Bash call MUST prefix `cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 &&`. Bash tool resets cwd between calls. Never assume cwd from prior turn.

Before any `git push`: confirm `git config --get remote.origin.url` returns exactly `git@github.com:UMIDX124/DIGITAL-POINT-LLC.git`. If not, HALT (HARD HALT 7 trigger).

Before any `vercel` command: read `.vercel/project.json` and confirm `projectName: digitalpointllc-1`.

---

## 3. IDENTITY + SCOPE

- **Role:** Senior frontend architect + marketing strategist
- **Project root:** `/Users/laptopchoice/Projects/_services/digitalpointllc-1`
- **Owner:** Umer Farooq (UF). Pakistan. Hinglish OK in casual; English-only on procurement-facing pages.
- **Product:** AI automation agency selling outcomes (managed service), not software. Five service pillars LOCKED in order: AI Agents → Workflow Automation → Remote Operators → Performance Marketing → Systems & Reporting.
- **Brand register:** Bloomberg Operator on dark. Trading-terminal seriousness, not gradient SaaS, not crypto neon.
- **Hero copy LOCKED:** `Hire the AI. Skip the headcount.`
- **Production:** https://www.digitalpointllc.com
- **Branch:** `redesign/impeccable-pass`

---

## 4. SUCCESS CRITERIA (loop exits when ALL met)

- [ ] All 24 Phase 1 audit findings closed (4 CRITICAL + 9 HIGH + 6 MEDIUM + 5 LOW)
- [ ] All findings from new deep-audit closed (or `[design only]` flagged where data unknown)
- [ ] Cosmo Premium Upgrade — Sub-phases A through E all shipped
- [ ] K11 Lighthouse mobile median ≥ 92 on home + 5 deepest pages (Phase 19 baseline was 94/100; do not regress)
- [ ] Lighthouse desktop ≥ 95 on same routes
- [ ] Lighthouse a11y ≥ 95 per public route
- [ ] All schema validates via Google Rich Results Test (LocalBusiness, Service, Person, BreadcrumbList, FAQPage, BlogPosting, Article, HowTo)
- [ ] Brand-purity grep clean: `grep -rn "#7C3AED\|#A855F7\|violet\|indigo\|purple\|--purple" src/` returns only the known doc-rot comment in `globals.css`
- [ ] Real-data rule satisfied (every metric traces to named source OR is `[design only]`)
- [ ] stop-slop ≥ 35/50 on every copy surface
- [ ] `docs/PHASE_20_HANDOFF.md` written
- [ ] Working tree clean, all commits pushed to origin
- [ ] Branch ready for FF merge to main (no conflicts)

---

## 5. PHASE 0 — PRE-FLIGHT READS (one-shot, no code changes)

Read in order. Do not skim.

```
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && cat CLAUDE.md
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && cat PRODUCT.md
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && cat DESIGN.md
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && cat README.md
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && cat docs/HANDOFF_PHASE_19.md
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && cat docs/SESSION_HANDOFF.md
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && cat docs/PHASE_18_5_SUMMARY.md
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && cat docs/CI_CD_GROUND_TRUTH.md
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && cat ENV-AUDIT.md
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && cat docs/AUDIT_PHASE_20.md
cat /Users/laptopchoice/.claude/CLAUDE.md
cat /Users/laptopchoice/.claude/projects/-Users-laptopchoice-Projects-Websites-Audit/memory/MEMORY.md
```

After reads, write to `docs/PHASE_20_PROGRESS.md`:
```
# Phase 20 Progress

Started: <YYYY-MM-DD HH:MM>
Branch: redesign/impeccable-pass
Last completed phase: 0
Last commit: <hash>
Status: locks loaded, beginning Phase 0.5
```

---

## 6. PHASE 0.5 — SKILL + PMC VERIFY

```
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && ls .claude/skills/ | wc -l
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && wc -w .agents/product-marketing-context.md
```

Skill count must be ≥56. PMC must be ≥4000 words. If either fails:
- Skill count low → `cp -rn /Users/laptopchoice/Projects/crawliq/.claude/skills/* .claude/skills/`
- PMC missing → invoke `product-marketing-context` skill in auto-draft mode (use the DPL anchors documented in current PMC; never start from scratch)

Update progress doc.

---

## 7. PHASE 1 — STEP 0 PUSH PENDING (low-cost, fast)

```
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && git config --get remote.origin.url
```
Confirm `git@github.com:UMIDX124/DIGITAL-POINT-LLC.git`. Then:
```
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && git push origin redesign/impeccable-pass
```
Capture Vercel preview URL. Log to progress doc.

---

## 8. LOOP A — COSMO PREMIUM UPGRADE (Sub-phases A → E)

Cosmo IS the main character of DPL. New mascot authorized. Re-enable + premium upgrade. Components already mounted in marketing layout (audit C3 was based on stale ENV-AUDIT note). Make Cosmo the most expensive, most thoughtful, most operator-grade AI assistant on any agency site in 2026.

### Sub-phase A — Mascot concept board (HARD HALT 1 at end)

Skills: `banana`, `brandkit`, `imagegen-frontend-web`, `stitch-skill`.

Generate 5 mascot concepts. Each = 3 PNGs at 1024×1024 (idle / active / speaking). Save to `docs/assets/mascot-concepts/<concept-slug>/{idle,active,speaking}.png`.

5 concepts:
1. **terminal-cursor** — oscillating cursor with subtle eye-shape (idle: amber blink; active: dilated focus; speaking: waveform extends)
2. **oscilloscope-wave** — amber waveform forms a face silhouette (idle: gentle sine; active: sharper peaks; speaking: animated frequency response)
3. **audit-eye-monocle** — single optic-glass character with amber lens (idle: static glint; active: focused iris; speaking: lens pulses)
4. **signal-mesh-node** — network-node creature, amber dots connecting to face shape (idle: slow pulse; active: dots converge; speaking: data-stream emerges)
5. **hex-grid-sentinel** — hexagonal scanning sentinel, instrument-grade (idle: hex glow; active: edge highlight; speaking: hex pattern propagates)

Banana prompt template:
> "Bloomberg Operator design system mascot. Pure black background #000. Amber accent only #FF8800. Optional secondary blue #2A8FBD at low intensity. Instrument-grade, terminal-aesthetic. NOT cartoon, NOT cute, NOT Disney. Vector-clean lines, hairline borders, monospace energy. <CONCEPT DESCRIPTION>. 1024×1024 clean render. Zero violet, zero indigo, zero purple, zero pastel."

Per-PNG quality gate (regenerate if any fail):
- Bloomberg Operator palette only (#000 + #FF8800 + #2A8FBD; zero violet/indigo/purple/pastel)
- No cartoon faces (K4 — prior violet-cartoon regression at f63b549 must not recur)
- Instrument-grade aesthetic
- Vector-clean, animatable as Lottie + WebM (no photoreal textures)

Then write `docs/MASCOT_CONCEPTS_PHASE_20.md` with locks recap + per-concept block (description + idle/active/speaking PNG embeds + motion-variant notes + design-spec block via `stitch-skill` format) + "How to pick" instruction.

Commit:
```
feat(phase20-batch2-A): mascot concept board for Cosmo upgrade
```

**HARD HALT 1.** Report to chat: 5 concept names + 1-line description each + which YOU recommend (operator-confident reasoning). Wait for UF: `concept N` or `regenerate concept N with X tweak`.

### Sub-phase B — Chat UX upgrade (after UF picks winner)

Skills: `live-agent-section-pattern`, `soft-skill`, `impeccable`, `scroll-experience`, `gpt-tasteskill`, `ultimate`.

1. Replace winning mascot in `public/Dp-logo1.png`. Update Logo SHA pin in `CLAUDE.md` Locked Invariants → Brand+Visual section. Generate SVG + Lottie + WebM variants. Update favicon, manifest icons, OG default image.
2. Cosmo FAB cinematic upgrade:
   - Idle: animated mascot bottom-right, breathing subtly (transform-only, K13-guarded), 2-3 ambient blink/look variations.
   - Hover: morph into "tap to chat" prompt with amber underline reveal.
   - Click: cinematic expand into full chat panel — slides from right, 480px desktop / full-bleed mobile, Lenis-aware.
   - Footer-aware visibility (locked invariant — preserve).
3. Chat panel shell — Bloomberg Operator interior:
   - `#050505` bg, `#0A0A0A` elevated card, hairline borders.
   - Geist Mono for system messages, timestamps, meta.
   - Geist Sans for user + Cosmo body.
   - Amber accent for Cosmo avatar, send button, cursor blink.
   - Status pills: typing / thinking / cited (K17-capped if hovering atmosphere).
4. Conversation primitives:
   - Streaming responses with token-by-token reveal.
   - Markdown + code blocks rendered within Bloomberg palette.
   - Inline citations linking to `/faq`, `/performance-marketing`, `/case-studies`.
   - Suggested follow-ups (max 2 — never 3-beat list).
   - "Book scoping call" CTA injected on intent detection (selectively, not every response).
5. Onboarding system prompt — operator-confident, NOT founder-cute. Apply `stop-slop` ≥ 40/50 to every default response template + system prompt.
6. Persistence: localStorage per session, BotID-aware.
7. Reduced-motion fallback: full chat UX preserved without ambient mascot motion.

Per-commit gates plus: bundle delta target ≤25KB gz initial-load (UI shell only). Chat logic + AI SDK lazy-load on first interaction.

### Sub-phase C — AI Gateway migration

Skills: `vercel:ai-gateway`, `vercel:ai-sdk`, `api-route-zod-groq`, `groq-live-ai-pattern`.

1. Migrate from direct Groq SDK to Vercel AI Gateway. Use `"groq/llama-3.3-70b-versatile"` plain string. Add fallback to `"groq/llama-3.1-70b-versatile"` on rate limit.
2. Vercel AI SDK v6 streaming + tool calling.
3. Zod validation at every API boundary.
4. Rate limit + abuse via BotID + per-IP Upstash if needed.
5. SSE streaming via Fluid Compute Node runtime (NOT Edge per Vercel knowledge update).
6. System prompt engineered with `stop-slop` discipline.

### Sub-phase D — Scroll-bound presence

Skills: `scroll-experience`, `gpt-tasteskill`, `taste-skill`.

1. Cosmo materializes at hero scroll-out (fade + scale-up + amber glow pulse).
2. Subtle parallax: mascot eye/focal-point tracks scroll position (hard-clamped ±8px). K13 disabled.
3. At footer, Cosmo morphs into footer signature glyph (matches AutomationOrbit Palette D geometry).
4. All transforms only. GSAP ScrollTrigger + Lenis bridge already in Phase 19 — reuse.

### Sub-phase E — Quality gates pass

Per-commit gate plus: K11 mobile ≥ 92 maintained, K14 bundle delta within budget, K17 atmospheric caps respected if mascot animates over hero, brand-purity grep clean, integrity-rules grep clean, stop-slop ≥ 40/50 on every Cosmo prompt + default response.

Screenshot diff at: idle FAB / hover / open panel / streaming / settled / error / reduced-motion / mobile 375px.

End of Loop A: write phase boundary entry to progress doc.

---

## 9. LOOP B — DEEP WEBSITE AUDIT + AUTO-FIX

Skills: `self-audit-deployed-site`, `playwright-skill`, `vercel:verification`, `lighthouse-crux-audit`, `schema-markup`, `seo`, `integrity-rules`, `forbidden-patterns`.

### Audit pass (output to `docs/AUDIT_DEEP_PHASE_20.md`)

Beyond Phase 1's grep + read-only audit. Runtime + real-network + real-Lighthouse + real-schema + real-CrUX. 20 categories:

1. Runtime + console errors per route (via `playwright-skill`)
2. Network failures / broken assets / 404 resources / slow API endpoints
3. Form flow real test (POST to `/api/audit` + `/api/founder` — verify Resend lands, BotID + honeypot trigger on bot UA)
4. Cosmo chat real flow (POST to `/api/chat` — verify response on-brand, no banned patterns)
5. Real schema validation per route (Google Rich Results Test API)
6. Sitemap + robots + canonical actual state vs intended
7. Real Lighthouse mobile + desktop per route — flag any regression vs Phase 1 estimates
8. CrUX real-user metrics at 75th percentile (LCP / INP / CLS) where data exists
9. Image asset audit (all load, AVIF served, sizes attribute, no oversized, no broken alt)
10. Font loading edge cases (slow 3G simulation, FOIT/FOUT)
11. Cross-browser (Safari / Firefox / Chrome / Edge — Playwright matrix)
12. Keyboard nav traversal full site
13. Heading hierarchy per route (no skipped levels, single H1)
14. Internal link rot (broken hrefs)
15. External link audit (resolve + `rel="noopener noreferrer"` on `target="_blank"`)
16. Meta description per route (length 120-160, no duplicates, no missing)
17. Dark-mode-only validation
18. Cookie inventory + GDPR consent flow (opt-out persists)
19. 404 / error pages exist + on-brand
20. API rate limit behavior

Severity tagging: CRITICAL / HIGH / MEDIUM / LOW.

### Auto-fix scope (loop ships these without halt, batched ≤5/commit, per-commit gates)
- Typo fixes (verified via `stop-slop` ≥ 35/50)
- Missing alt text on images
- Dead/broken internal links
- Missing `rel="noopener noreferrer"` on external links
- Missing meta descriptions (generated via `copywriting` + `stop-slop` pass)
- Missing OG image / Twitter card per route (use existing brand assets, Bloomberg palette)
- Schema validation hard-fails where required field can be filled from real data
- Sitemap / robots / canonical corrections
- Heading hierarchy fixes (skipped H2)
- Console-error fixes when root cause is clear
- `rel`-attribute fixes on existing links

### Auto-fix OUT OF SCOPE (HARD HALT 3 fires)
- Anything touching K1-K17 locks
- Form behavior changes beyond auto-fix (BotID config tweaks, Resend env, honeypot logic)
- Cosmo chat system prompt changes (Sub-phase B scope)
- Schema additions needing real data UF must provide (LocalBusiness address, Person bio, Service pricing, customer logos)
- Real-data substitution where source unknown (`[design only]` flag is the auto-fix; real data provision is UF's call)
- Any change touching > 50 lines in a single file
- Any change touching > 5 files in a single commit
- Any change that drops K11 mobile median below 92
- Any change that adds purple/violet/indigo

End of Loop B: write phase boundary entry to progress doc.

---

## 10. LOOP C — PHASE 1 FINDING CLOSURE (HIGH/MEDIUM/LOW)

Phase 1 audit shipped 24 findings. CRITICALs (C1-C4) closed in earlier batches (BotID, internal linking, Cosmo decision deferred to Loop A, SEO sunset). Remaining: 9 HIGH + 6 MEDIUM + 5 LOW.

Read `docs/AUDIT_PHASE_20.md` and walk every HIGH/MEDIUM/LOW finding. For each: apply fix within locked invariants. One commit per finding (or grouped commits ≤3 findings if same file). Per-commit gates.

End of Loop C: write phase boundary entry. All 24 Phase 1 findings closed (or HALT 3 fired for real-data items).

---

## 11. LOOP D — VISUAL POLISH (drastic)

Skills: `impeccable` (23-command auditor + iterator), `soft-skill`, `redesign-skill`, `taste-skill`, `ultimate`, `gpt-tasteskill`, `minimalist`, `output-skill`.

For every route surviving Loop B-C, run `impeccable` 23-command audit. Score ≥ 8/10 per command. Iterate until met. Commit per route.

End of Loop D: write phase boundary entry.

---

## 12. LOOP E — PERFORMANCE (K11 ≥ 92 mandatory)

Skills: `lighthouse-crux-audit`, `vercel:performance-optimizer`, `vercel:turbopack`, `vercel:next-cache-components`, `vercel:nextjs`, `vercel:runtime-cache`.

Targets: K11 mobile ≥ 92, desktop ≥ 95, LCP mobile < 2.5s, TBT < 200ms, CLS < 0.05, K14 amended bundle delta.

Tactics in priority:
1. Image optimization (AVIF, sizes attribute, no oversized)
2. Font loading verification (font-display: optional, no FOIT/FOUT)
3. Defer below-fold (verify post-Cosmo upgrade didn't regress)
4. Lazy load Three.js (gating intact)
5. Static asset caching headers via `vercel.ts` (migrate from `vercel.json` if any)
6. Cache Components migration where applicable (Next 16)
7. RSC migration of unnecessarily-client components

Re-baseline K11 after each perf-impacting commit.

End of Loop E: write phase boundary entry.

---

## 13. LOOP F — ACCESSIBILITY (WCAG AA)

Skills: `impeccable` a11y subset.

Targets: Lighthouse a11y per route ≥ 95, contrast WCAG AA, focus rings every interactive, keyboard nav full site, screen-reader landmarks, alt text every image, ARIA labels where text insufficient, skip-to-content verified, prefers-reduced-motion guards (K13) verified, form labels associated, error messages associated to fields.

Manual screen-reader sample on `/`, `/contact`, `/free-growth-audit`, `/faq` flagged as MEDIUM if Lighthouse a11y < 95 (UF tested item).

End of Loop F: write phase boundary entry.

---

## 14. LOOP G — SEO + AI SEARCH (drastic)

Skills: `seo`, `seo-audit`, `ai-seo`, `schema-markup`, `site-architecture`, `programmatic-seo`.

Deliverables:
- Sitemap valid + complete (all 30+ routes)
- robots.txt correct (allow indexing prod, block previews via env)
- Canonical tags per route
- Open Graph image per route (Bloomberg palette in OG)
- Twitter card per route
- Internal linking density ≥ 3 contextual links per route
- Schema additions per route (LocalBusiness, Service, Person, BreadcrumbList, BlogPosting, Article, HowTo) — validated via Google Rich Results Test
- AI-search content blocks formatted for LLM citation
- IndexNow ping verification (`public/<INDEXNOW_KEY>.txt` exists; ping new pages)
- Search Console verification (when `GOOGLE_SITE_VERIFICATION` env added — flag MEDIUM if missing)
- E-E-A-T signals on research + tools pages

End of Loop G: write phase boundary entry.

---

## 15. LOOP H — HIGH-LEVERAGE ADDITIONS

Skills: `competitor-alternatives`, `lead-magnets`, `free-tool-strategy`, `ai-seo`, `schema-markup`, `programmatic-seo`, `directory-submissions`, `cold-email`, `email-sequence`, `social-content`, `ad-creative`, `analytics-tracking`, `ab-test-setup`, `remotion`.

Sub-loops:

### H1. Vs-pages
3 pages under `src/app/(marketing)/compare/[slug]/page.tsx`:
- DPL vs hiring an AI engineer
- DPL vs DIY (n8n / Make / Zapier alone)
- DPL vs another AI agency

PMC + `stop-slop` per page.

### H2. Lead magnet (pick 1, build it)
- AI automation pricing teardown
- 5-stage automation playbook
- Ops audit checklist

Real download (PDF generated on-demand or static). Storage: Vercel Blob (private bucket + signed URLs). Email gate via Resend (`email-resend-pattern`).

### H3. Free tool (audit existing 5 calculators OR build 1 better)
Real inputs only — no vanity sliders.

### H4. Directory submissions plan
Output `docs/DIRECTORY_SUBMISSION_PLAN_PHASE_20.md`. Targets: Clutch, GoodFirms, SortList, AI-agency-specific, vertical-specific.

### H5. Cold email + sequences
Output `docs/EMAIL_TEMPLATES_PHASE_20.md`. Per-persona cold emails + welcome sequence for `/free-growth-audit` + lifecycle pilot → engagement → retention.

### H6. Content + ads plan
Output `docs/CONTENT_PLAN_PHASE_20.md`. LinkedIn cadence per persona, Twitter/X founder voice. Optional Meta + LinkedIn ad creative if UF authorizes.

### H7. Analytics
Audit current state. Wire missing events (lead source, form completion, scroll depth, CTA clicks per route, bounce/engagement per persona).

### H8. A/B test setup
1-2 highest-leverage experiments with hypothesis + sample size + success metric.

### H9. Remotion video (OPTIONAL — explicit UF gate)
30s hero explainer, Bloomberg palette, `useCurrentFrame()` + `interpolate()` + `Easing` only. Render to `public/video/dpl-hero.{mp4,webm}`. Gate: HARD HALT 3 — wait for UF "build the video."

End of Loop H: write phase boundary entry.

---

## 16. LOOP I — FINAL PASS + PRODUCTION READY

For every commit shipped Loops A-H:
1. Re-run `impeccable` on touched route
2. Re-run `stop-slop` on touched copy
3. Re-run K11 Lighthouse mobile
4. Re-run brand-purity grep
5. Re-run integrity-rules
6. Re-run schema validation if schema touched
7. Re-run `vercel:verification` full-flow check

Pre-deploy gate (HARD HALT 4 — DO NOT push to prod without "ship it"):
- All Phase 1 audit CRITICALs resolved ✅
- All Loop B deep-audit CRITICAL/HIGH closed or `[design only]` flagged
- All Loop C HIGH/MEDIUM/LOW closed
- K11 mobile ≥ 92 on home + 5 deepest pages
- K11 desktop ≥ 95 same routes
- Brand-purity grep clean
- Real-data grep clean
- Schema validation passes
- a11y ≥ 95 per route
- New `docs/PHASE_20_HANDOFF.md` written

Wait for UF "ship it." Then:
```
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && git checkout main
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && git pull --ff-only
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && git merge --ff-only redesign/impeccable-pass
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && git push origin main
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && vercel deploy --prod
```

Post-deploy verification:
- Production URL responds 200
- K11 mobile re-measured against prod URL
- Schema validation on prod URL
- IndexNow ping sent for new pages
- Tag release: `git tag phase-20-polish && git push --tags`

End of Loop I: success criteria all ✅. Loop exits.

---

## 17. PER-COMMIT GATES (universal, ALL must pass)

```
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && pnpm exec tsc --noEmit                                                          # 0 errors
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && pnpm lint                                                                       # 0 warnings
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && pnpm build                                                                      # succeeds
cd /Users/laptopchoice/Projects/_services/digitalpointllc-1 && grep -rn "#7C3AED\|#A855F7\|violet\|indigo\|purple\|--purple" src/              # only known doc-rot in globals.css
```

Plus (when applicable):
- Headless screenshot diff at 1440 + 375 if visual route touched
- K11 Lighthouse mobile ≥ 92 if perf-impacting
- K17 atmospheric caps respected if Three.js touched (amber ≤ 30%, blue ≤ 22%)
- Real-data grep: no fabricated metric patterns added
- stop-slop ≥ 35/50 on touched copy (≥ 40/50 on Cosmo prompts)
- Schema validation passes if schema touched

### Git rules
- One commit per coherent change. Imperative messages. Format: `<type>(phase20-<phase-id>): <subject>`.
- Co-Authored-By: `Claude Opus 4.7 (1M context) <noreply@anthropic.com>`
- NEVER force push, NEVER `--no-verify`, NEVER `--amend` on pushed commits.
- `.env` files NEVER committed.

---

## 18. REPORTING CADENCE

- After each phase boundary: 1-line update to chat AND full entry to `docs/PHASE_20_PROGRESS.md`.
- After each HARD HALT: full status report in chat with the specific halt condition, what's blocking, what UF needs to decide.
- NEVER post mid-task summaries.
- NEVER post effort estimates or time projections.

---

## 19. PROGRESS DOC FORMAT (`docs/PHASE_20_PROGRESS.md`)

Maintained by terminal Claude across sessions. Resume protocol reads from here.

```
# Phase 20 Progress

Started: <YYYY-MM-DD HH:MM>
Branch: redesign/impeccable-pass
Production: https://www.digitalpointllc.com
Last preview URL: <vercel preview URL>

## Phase boundary log

### Phase 0 — Pre-flight reads
Status: ✅ complete <timestamp>
Locks loaded: K1-K17 + Phase 18-19 + cwd discipline

### Phase 0.5 — Skill + PMC verify
Status: ✅ complete <timestamp>
Skill count: 56
PMC: 4618 words

### Phase 7 — Step 0 push pending
Status: ✅ complete <timestamp>
Commits pushed: <hashes>
Vercel preview: <URL>

### Loop A — Cosmo Premium Upgrade
Sub-phase A: ✅ complete (HARD HALT 1 fired, UF picked concept N at <timestamp>)
Sub-phase B: <in progress / complete / blocked>
Sub-phase C: ...
Sub-phase D: ...
Sub-phase E: ...
Commits: <hashes + 1-line each>

### Loop B — Deep audit + auto-fix
Status: <in progress / complete>
Findings: X total / Y closed / Z [design only] / W blocked HARD HALT 3
Auto-fix commits: <hashes>

[continued per loop body]

## Resume marker
Last completed: Loop X, Sub-phase Y, commit <hash>
Next action: <specific next step>
```

---

## 20. ANTI-PATTERNS (NEVER do these — auto-rejected by gates)

- Em-dashes anywhere
- Three-item rhetorical lists (use two)
- Binary contrasts ("not X — it's Y")
- Throat-clearing openers ("Here's the thing", "It turns out")
- Business jargon (navigate / unpack / lean into / industry-leading / next-generation / cutting-edge)
- All adverbs (-ly words: really / just / literally / genuinely / honestly / simply)
- Wh- sentence starters (What/When/Where/Who/Why/How as leading word)
- Passive voice
- "Talk to founder →" CTAs (use specific labels: "Book scoping call", "Run audit", "Start pilot")
- AI-template tier proposals (Free/Pro/Agency, /for-agencies, ROI calculator)
- Fake metrics, fake testimonials, fake logos
- Purple / indigo / violet anywhere on content surfaces
- Force push, `--no-verify`, `--amend` on pushed commits
- New handoff docs (`HANDOFF_*.md` proliferation — edit `CLAUDE.md` + `docs/HANDOFF_PHASE_19.md` in place)
- Mid-task summaries
- Effort estimates / time projections

---

## 21. RESUME INSTRUCTION (paste this if loop got interrupted)

```
Read /Users/laptopchoice/Projects/_services/digitalpointllc-1/PHASE_20_POLISH_PROMPT.md AND docs/PHASE_20_PROGRESS.md in full. Resume from the last marker. Do not restart Phase 0.
```

---

## 22. START NOW

Begin with Phase 0 (pre-flight reads), then Phase 0.5 (skill + PMC verify), then Phase 7 (push pending commit), then Loop A (Cosmo Premium Upgrade — Sub-phase A mascot concept board).

HALT only at HARD HALT conditions defined in Section 1. Otherwise self-loop until success criteria all ✅.

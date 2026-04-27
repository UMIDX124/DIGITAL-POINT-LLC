# A6 — Content Integrity Audit

**Generated:** 2026-04-27
**Raw artefacts:** `docs/REMEDIATION_AUDIT/raw/{hero-copy,service-content,email-surfaces,fabricated-clients,fabricated-testimonials}.txt`

---

## Hero copy verification — PASS

**Locked invariant:** `Hire the AI. Skip the headcount.` (two-sentence beat with em-wrapped italic "the AI"; period inline outside the em).

| Source | State |
|---|---|
| `src/lib/copy.ts:21` | `headline: 'Hire the AI. Skip the headcount.'` ✓ |
| `src/components/sections/HeroSection.tsx:217-244` | JSX structure preserves two-beat: word-tokens "Hire" + `<em.hero-em>` containing word-tokens "the" + "AI" + period inline outside em + `<br>` + word-tokens "Skip" + "the" + "headcount." inside `.hero-h1-line-2` wrapper for nowrap ✓ |
| Metadata (layout.tsx l.25, 61, 79) | `Digital Point — Hire the AI. Skip the headcount.` ✓ |
| Schema.org + OG + Twitter card | All carry the canonical headline ✓ |

**Verbatim semantic content match.** No remediation required.

---

## Service order verification — PASS

**Locked invariant:** 5-service order — 01 AI Agents → 02 Workflow Automation → 03 Remote Operators → 04 Performance Marketing → 05 Systems & Reporting.

| Source | Order |
|---|---|
| `src/lib/copy.ts:45–69` `servicesList.items[]` | AI Agents → Workflow Automation → Remote Operators → Performance Marketing → Systems & Reporting ✓ |
| Sub-route metadata (`(marketing)/performance-marketing/page.tsx`, `(marketing)/systems-reporting/page.tsx`) | Title strings match ✓ |
| `src/components/seo/InternalLinks.tsx` | Service titles match ✓ |

**Order integrity preserved.** No remediation required.

---

## Email surfaces — 8 hits, distribution

**Target:** zero user-facing email surfaces (per Phase 12 contact strategy: pure-AI route via Cosmo + audit form, no `hello@` queue).

| File:Line | Surface | Category | Action |
|---|---|---|---|
| `src/app/api/founder/route.ts:105` | `mailto:${email}` in operator email-template HTML | API operator-side notification email; recipient is DPL (operator), not user-facing on the site | **Keep** — out of scope per Phase 12 (only public/page-rendered surfaces in scope) |
| `src/app/api/audit/route.ts:114` | same | same | Keep |
| `src/app/api/leads/route.ts:65` | same | same | Keep |
| `src/app/api/ticket/route.ts:136` | same | same | Keep |
| `src/components/layout/Footer.tsx:81` | comment referencing `hello@` (philosophy preamble) | Philosophy block comment | Keep |
| `src/components/layout/Footer.tsx:108` | inline `<code>hello@</code>` literal in philosophy paragraph | Per Pillar 4 R7 directive: the block intentionally references `hello@` as a code-formatted string explaining what generic queue we don't run | **Keep** — directive-locked |
| `src/components/sections/FounderSection.tsx:74` | `mailto:info@digitalpointllc.com` | Founder section (NOT on home; component file unused per A4 knip) | **REMOVE** — kill candidate; FounderSection.tsx is unused, but if it ever re-renders this email surface ships |
| `src/components/sections/ContactPage.tsx:87` | inline `hello@` reference in copy | ContactPage describing the contact philosophy; mirrors the Footer block | **Keep** if intentional brand-philosophy copy; verify with Umer |

**1 genuine kill candidate** — `FounderSection.tsx:74` mailto. The other 7 are either operator-side email templates (out of scope), comments, or the directive-locked `<code>hello@</code>` literal in the philosophy block.

Production HTML grep against deployed site (verification post-revert): `hello@digitalpointllc.com` = 0; `mailto:` = 0. **User-facing email surfaces in production: zero.** ✓

---

## Fabricated client names — 16 hits, ALL in env-gated marquee data

| File:Lines | Strings | Status |
|---|---|---|
| `src/lib/copy.ts:84-103` | Atlas Health, Northwind Capital, Lumen Logistics, Vertex AI, Halcyon Studio, Meridian Bank, Pinnacle SaaS, Quarry, Aurora Apps, Bedrock Holdings, Civic Health, Drift Aerospace, Echo Systems, Forge Industries, Glide Mobility, Helix Data | **In `marksRow1` + `marksRow2` arrays consumed only by `LogoStripSection` which env-gates `null` return per Pillar 4 P0.3 invariant** |
| `src/components/sections/LogoStripSection.tsx:6-7` | comments referencing the names ("...placeholder client names...") | Documentation of why component is env-gated off |
| `src/content/blog/predictive-analytics-marketing.md:14, 144` | `Vertex AI` references | Blog content referencing Google's Vertex AI (the real Google Cloud product) — not fabricated DPL client mention |

**Verification:** Production HTML grep against deployed site (post-revert verification): `Atlas Health` = 0; `Northwind Capital` = 0; `Vertex AI` (in marquee context) = 0. **Marquee strings ship in JS bundle but never render** because `LogoStripSection` returns `null` unless `NEXT_PUBLIC_MARQUEE_ENABLED === 'true'`.

**Recommendation:** The 16 strings still ship to the client in the JS bundle (consumes ~500 bytes uncompressed). For full hygiene, **remove the strings from `copy.logoStrip.marksRow1/marksRow2`** entirely and replace with empty arrays `[]`; component already returns `null` so removing the data has zero render impact and reduces bundle bytes. **Single-line fix** in `copy.ts`. Mark as N1 candidate.

---

## Fabricated testimonials — PASS

**Locked invariant:** `TestimonialsSection.tsx` returns `null`. Sarah Chen / Marcus Thompson / Jennifer Walsh names removed.

| File:Line | Content |
|---|---|
| `src/components/sections/TestimonialsSection.tsx:1-23` | Stub component with documentation comment listing the removed-fabricated names AS THE EXPLANATION; line 23 returns null |

The 3 fabricated-testimonial hits are all in the documentation comment block of the stub component itself, listing the names that WERE removed. This is the explanatory comment per Phase 13 documentation, not active testimonial content.

**Verification:** `TestimonialsSection()` returns `null` per locked invariant ✓. No `import` of TestimonialsSection in `(marketing)/page.tsx` (verified via `grep`). Production HTML: zero rendering of the stub or its names.

---

## Phase 4 N-spec mapping (forward-look)

| Item | Source | C-spec mapping | Effort |
|---|---|---|---|
| Hero copy semantic content | passes | C/N: no remediation | 0 |
| Service order | passes | C/N: no remediation | 0 |
| Email surfaces | 1 kill candidate (`FounderSection.tsx:74`) | N1 candidate | 5 min |
| Fabricated clients in `copy.ts` (16 strings) | replace with `[]` empty arrays | N1 / N2 candidate | 5 min |
| Fabricated testimonials | passes (stub returns null) | none | 0 |

**Phase 4 N-scope effort: ~10 minutes total.** The two kill candidates are both single-line edits with zero render impact (FounderSection is unused; LogoStripSection is env-gated null). Recommend bundling into a single `chore: remove fabricated content from inactive surfaces` commit.

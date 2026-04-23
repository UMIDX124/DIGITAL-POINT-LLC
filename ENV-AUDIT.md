# DPL Environment Variable Audit — Final

Generated: 2026-04-23
Project: `umidx124s-projects/digitalpointllc-1`
Production URL: https://www.digitalpointllc.com

Status: **Clean.** Zero vars in "Needs Attention" state.

---

## What was done (automated via Vercel CLI)

### Removed — 6 zombie vars (referenced nowhere in the codebase)

| Var | Envs removed |
|-----|--------------|
| `UPSTASH_REDIS_REST_URL` | Production, Preview, Development |
| `UPSTASH_REDIS_REST_TOKEN` | Production, Preview, Development |
| `DATABASE_URL` | Production, Preview, Development |
| `LEAD_WEBHOOK_SECRET` | Production |
| `CRM_WEBHOOK_URL` | Production, Preview, Development |
| `CRM_WEBHOOK_SECRET` | Production, Preview, Development |

### Added — 3 vars the code actually needs

| Var | Envs added | Value |
|-----|-----------|-------|
| `SMTP_FROM` | Production, Preview, Development | `noreply@digitalpointllc.com` |
| `ADMIN_KEY` | Production, Preview, Development | `b21a32451f32f347d790ceffb2b513e4` |
| `INDEXNOW_KEY` | Production, Preview, Development | `46d0dad9247b88e0397637ac517a8bb6` |

**Save those two random keys somewhere safe.** They are written here so you have a record. Rotate instructions below.

### Skipped — 2 vars the code handles gracefully when unset

| Var | Why skipped |
|-----|-------------|
| `NEXT_PUBLIC_ADSENSE_ID` | Code gates the AdSense `<Script>` and `<AdUnit />` on a truthy value — no AdSense loads when unset, no breakage. Add this later if you want AdSense on the blog. |
| `GOOGLE_SITE_VERIFICATION` | Metadata gates the verification `<meta>` tag on a truthy value. Add later after adding the domain to Search Console. |

---

## Current state of every var in the project

### IN USE TODAY

| Var | Powers | File | Set? |
|-----|--------|------|------|
| `SMTP_HOST` | Audit form + chatbot lead email via nodemailer | `src/lib/email.ts` | Yes — all envs |
| `SMTP_PORT` | SMTP port | `src/lib/email.ts` | Yes — all envs |
| `SMTP_USER` | SMTP auth user | `src/lib/email.ts` | Yes — all envs |
| `SMTP_PASS` | SMTP auth pass | `src/lib/email.ts` | Yes — all envs |
| `SMTP_FROM` | "From" address — falls back to `SMTP_USER` | `src/lib/email.ts` | Yes — all envs |
| `GROQ_API_KEY` | Cosmo chatbot (currently disabled in Phase 2 — component preserved) | `src/lib/ai-chatbot/*` | Yes — all envs |
| `CHAT_MODEL` | Groq model for Cosmo | `src/lib/ai-chatbot/*` | Yes — all envs |
| `ADMIN_KEY` | Bearer token on `GET /api/submissions` | `src/app/api/submissions/route.ts` | Yes — all envs |
| `INDEXNOW_KEY` | Bing/Yandex IndexNow protocol key | `src/app/api/indexnow/route.ts` | Yes — all envs |

### OPTIONAL (code handles absent gracefully)

| Var | Note |
|-----|------|
| `NEXT_PUBLIC_ADSENSE_ID` | Gate in `src/app/layout.tsx` and `src/components/ads/AdUnit.tsx`. Unset = no AdSense. |
| `GOOGLE_SITE_VERIFICATION` | Gate in `src/app/layout.tsx` metadata. Unset = no verification meta tag. |

---

## Verification

After the automated cleanup:

- `vercel env ls` returns 27 rows total: 9 SMTP/Groq (original, untouched) + 9 new (3 vars × 3 envs).
- Zero "Needs Attention" warnings expected on your dashboard after the next production deploy settles.

---

## Rotation checklist

| Var | How to rotate |
|-----|---------------|
| `SMTP_PASS` | Your SMTP provider's credential page (Gmail, SES, Mailgun, Postmark). `vercel env rm` + `vercel env add`. |
| `GROQ_API_KEY` | https://console.groq.com/keys — create new, update Vercel, delete old. |
| `ADMIN_KEY` | Generate with `openssl rand -hex 16`. Write new, delete old. |
| `INDEXNOW_KEY` | Generate new, update Vercel, then also update `public/<key>.txt` in the repo (a file with exactly that key as its only content). Delete old file. Documented at https://www.bing.com/indexnow. |

---

## USER ACTION REQUIRED (optional, defer)

Neither of these blocks the site from working. Add them later if/when you need them.

### 1. `GOOGLE_SITE_VERIFICATION` — add to Production only

- Open Google Search Console → Add property → digitalpointllc.com → HTML tag verification → copy the `content="…"` value (not the full tag).
- Add via: `vercel env add GOOGLE_SITE_VERIFICATION production --value "<token>" --yes`

### 2. `NEXT_PUBLIC_ADSENSE_ID` — add to Production + Preview if you want AdSense live

- AdSense dashboard → Account → Settings → Account information → Publisher ID.
- Value looks like `ca-pub-XXXXXXXXXXXXXXXX`.
- Add via: `vercel env add NEXT_PUBLIC_ADSENSE_ID production --value "<pub-id>" --yes`

### 3. `INDEXNOW_KEY` verification file

- The code serves `public/<key>.txt`. The current key is `46d0dad9247b88e0397637ac517a8bb6`.
- Create `public/46d0dad9247b88e0397637ac517a8bb6.txt` containing exactly that key, commit it, push. Bing/Yandex will verify against it when you ping the IndexNow endpoint.
- Skip this if you are not actively pushing URLs to IndexNow.

---

## Local development

For local `pnpm dev`, do not copy production secrets to disk. Create `.env.local` manually with dev values:

```
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=<mailtrap user>
SMTP_PASS=<mailtrap pass>
SMTP_FROM="DPL Dev <dev@digitalpointllc.local>"
GROQ_API_KEY=  # optional; chatbot falls back to FAQ mode when absent
CHAT_MODEL=llama-3.3-70b-versatile
ADMIN_KEY=dev-admin-key
INDEXNOW_KEY=dev-indexnow-key
```

The audit endpoint (`/api/audit`) handles missing SMTP gracefully — it still returns 200 and only logs in development.

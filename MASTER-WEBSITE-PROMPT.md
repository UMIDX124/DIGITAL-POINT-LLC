# MASTER WEBSITE PROMPT — Production Business Website

> Copy this entire prompt into a new Claude Code session for your other business project.
> Replace all `{{PLACEHOLDER}}` values with your actual business info before pasting.

---

## REPLACE THESE VALUES FIRST:

```
{{COMPANY_NAME}} = Your Company Name (e.g., "Backup Solutions")
{{COMPANY_TAGLINE}} = One-line tagline (e.g., "Enterprise Backup & Recovery")
{{FOUNDER_1_NAME}} = First founder name (e.g., "M. Faizan Rafiq")
{{FOUNDER_1_TITLE}} = Title (e.g., "Founder" or "Co-Founder")
{{FOUNDER_1_BIO}} = 2-3 line bio
{{FOUNDER_2_NAME}} = Second founder name (leave blank if none)
{{FOUNDER_2_TITLE}} = Title
{{FOUNDER_2_BIO}} = 2-3 line bio
{{DOMAIN}} = Your domain (e.g., "backupsolutions.com")
{{COMPANY_EMAIL}} = Contact email
{{COMPANY_PHONE}} = Phone number
{{COMPANY_LOCATION}} = "United States" or specific city
{{COMPANY_YEAR_FOUNDED}} = Year (e.g., "2019")
{{LINKEDIN_URL}} = Company LinkedIn URL
{{SERVICES}} = Comma-separated list of services (e.g., "Cloud Backup, Disaster Recovery, Data Migration, Managed IT")
{{INDUSTRIES}} = Target industries (e.g., "Healthcare, Finance, Legal, SaaS, eCommerce")
{{CITIES}} = Target cities (e.g., "New York, Los Angeles, Chicago, Houston, Miami")
{{PRIMARY_COLOR}} = Hex code (e.g., "#9d4edd")
{{ADSENSE_PUB_ID}} = Google AdSense ID (e.g., "ca-pub-XXXXXXX") or "none"
{{INCLUDE_CHATBOT}} = "no" (exclude chatbot feature)
```

---

## THE PROMPT (Copy everything below this line):

---

You are building a production-grade, Silicon Valley corporate-level business website. This is NOT a template — it must look and feel like a $50K+ custom build. Build it step by step, thoroughly, with zero shortcuts.

## Tech Stack (MANDATORY — do not change):
- **Next.js 16** (App Router, Turbopack, React 19)
- **TypeScript** (strict mode)
- **Tailwind CSS 4** (utility-first, dark mode)
- **Framer Motion** (animations)
- **shadcn/ui** (component library — New York style)
- **Prisma** (SQLite for forms/submissions)
- **Nodemailer** (SMTP email)
- **Zod** (validation)
- **React Hook Form** (forms)
- **Lucide React** (icons)

## Company Info:
- **Name:** {{COMPANY_NAME}}
- **Tagline:** {{COMPANY_TAGLINE}}
- **Founder(s):** {{FOUNDER_1_NAME}} ({{FOUNDER_1_TITLE}}), {{FOUNDER_2_NAME}} ({{FOUNDER_2_TITLE}})
- **Domain:** {{DOMAIN}}
- **Email:** {{COMPANY_EMAIL}}
- **Location:** {{COMPANY_LOCATION}} (USA-based company)
- **Founded:** {{COMPANY_YEAR_FOUNDED}}
- **Services:** {{SERVICES}}
- **Target Industries:** {{INDUSTRIES}}
- **Target Cities:** {{CITIES}}

---

## PHASE 1: Project Setup & Design System

### 1.1 Initialize Project
```bash
npx create-next-app@latest {{project-name}} --typescript --tailwind --app --turbopack --src-dir
cd {{project-name}}
npx shadcn@latest init
npm install framer-motion lucide-react reading-time gray-matter react-hook-form @hookform/resolvers zod prisma @prisma/client nodemailer date-fns uuid clsx tailwind-merge class-variance-authority sonner next-themes recharts
npx prisma init --datasource-provider sqlite
```

### 1.2 Design System — Dark Cosmic Theme
Create a premium dark theme with these specifications:
- **Background:** Deep dark (#0d0815 or similar)
- **Primary accent:** {{PRIMARY_COLOR}} with lighter/darker variants
- **Signal color:** Contrasting accent for CTAs (e.g., #ff6b9d)
- **Surface layers:** Multiple dark surface levels for depth
- **Glass effects:** Glassmorphism with backdrop-blur
- **Typography:** Space Grotesk (display), Inter (body), IBM Plex Mono (code) via Google Fonts
- **Border radius:** 0.75rem base with calc-based variants
- **Animations:** Smooth transitions, hover effects, scroll animations

Create custom CSS utilities:
- `.glass` — glassmorphism effect
- `.glass-strong` — stronger glass effect
- `.signal-glow` — glowing box shadow
- `.text-gradient` — text gradient effect
- `.cosmic-bg` — gradient background

### 1.3 Tailwind Config
Extend Tailwind with:
- All custom colors as CSS variables
- Custom fonts (font-display, font-mono)
- Custom animations (twinkle, fade, pulse)
- Dark mode: class-based (hardcoded dark)

---

## PHASE 2: Layout & Navigation

### 2.1 Root Layout (`src/app/layout.tsx`)
- Dark mode HTML (`<html lang="en" className="dark">`)
- Google Fonts (Space Grotesk, Inter, IBM Plex Mono)
- Global metadata (title, description, OG tags, Twitter cards)
- Organization JSON-LD schema (name, logo, founders, address, LinkedIn)
- Security headers in next.config.ts (X-Frame-Options, CSP, XSS protection)
- Cookie consent banner component
- Toast notifications (Sonner)
- If AdSense: `next/script` with `strategy="afterInteractive"`

### 2.2 Navigation Component
Create a sticky, glass-effect navigation bar:
- Logo (mascot/icon) sitting ON the navbar (elevated, with shadow)
- White glow effect behind logo
- Company name + "LLC" text next to logo
- Desktop: Pill-shaped nav container with all links, centered between logo and CTA
- Active link indicator with animated background (framer-motion layoutId)
- "Free [Main CTA]" button on right (gradient, glowing)
- Mobile: Hamburger menu with slide-out drawer
- Scroll behavior: glass background appears on scroll
- Full-width layout

Nav links should include: Home, [Service 1], [Service 2], [Service 3], Case Studies, Results, Blog, About, Contact

### 2.3 Footer Component
- 4-column grid: Services, Company, Resources, Connect
- Newsletter signup form
- Social media links
- Legal links (Privacy Policy, Terms of Service)
- Copyright with year
- Built with dark surface background

---

## PHASE 3: Pages (Marketing Layout)

### 3.1 Homepage — Content-First Design
Section order (this is critical for AdSense approval):

1. **HeroSection** — Bold headline, subtitle, dual CTA buttons, animated background
2. **ProofBar** — Trust metrics strip (years in business, clients served, key metric, satisfaction rate)
3. **LatestInsights** — 6 latest blog posts in responsive grid (server component pulling from blog)
4. **FreeResources** — 3 cards linking to guides with icons, descriptions
5. **ProcessSection** — How it works (3-4 steps with icons)
6. **PillarsSection** — Core service pillars (3 cards with detailed descriptions)
7. **CaseStudiesPreview** — 3 case study cards with key metrics
8. **ProofSection** — Social proof, statistics, achievements
9. **TestimonialsSection** — Client testimonials carousel
10. **FAQSection** — Accordion FAQ with schema markup
11. **CTASection** — Final conversion section

### 3.2 Service Pages (one per service)
For each service in {{SERVICES}}, create:
- Hero with service-specific headline
- Problem/pain points section
- Solution overview
- Process steps
- Benefits with metrics
- FAQ section (with FAQSchema)
- CTA section

### 3.3 About Page
- Company story with timeline/milestones
- Founder section with photos/bios
- Mission and values
- Key metrics (years, clients, results)
- Team section
- CTA to contact

### 3.4 Contact Page
- Contact form (React Hook Form + Zod validation)
- Company info sidebar (email, phone, location)
- Founder direct contact section
- Map or location indicator

### 3.5 Results Page
- Case study highlights with real metrics
- Before/after comparisons
- Industry-specific results
- Client logos or testimonials
- CTA to get started

### 3.6 Case Studies Page & Data
Create `/case-studies` listing page and `/case-studies/[slug]` dynamic pages:
- 3+ case studies with: Client type, Problem, Strategy, Execution, Results (with numbers)
- Store data in `src/lib/case-studies.ts`
- Generate static params for all slugs
- Beautiful card layout with metric highlights

### 3.7 Legal Pages
- **/privacy-policy** — GDPR compliant, covers cookies, analytics, AdSense (if applicable), COPPA, data retention, user rights
- **/terms-of-service** — Service terms, liability limitations, IP rights, US governing law, dispute resolution

---

## PHASE 4: Blog System (Critical for AdSense)

### 4.1 Blog Infrastructure
- Blog posts as Markdown files in `src/content/blog/`
- Frontmatter: title, excerpt, category, tags, date, author, lastModified, featured, faqs
- `src/lib/blog.ts` — Parse posts, generate TOC from headings, calculate reading time
- Categories with color coding (create 4-6 relevant categories for your industry)
- Blog listing page with grid layout, category filters
- Category pages at `/blog/category/[category]`

### 4.2 Blog Post Template
Each blog post page must have:
- Hero: category tag, date, read time, title, excerpt, author name
- Sidebar: Table of Contents (sticky, scrollspy)
- Content: Full markdown rendering with prose styling
- Mid-article CTA: In-content lead capture (contextual to category)
- FAQ section: If post has FAQs, render with schema markup
- Internal links: Auto-generated related content links
- Lead magnet banner: End-of-post conversion CTA
- Author box: Author name, title, bio, expertise tags, LinkedIn link
- Related posts: 3 related articles from same category

### 4.3 Blog Content — Write 30+ Articles
Write 30+ substantial blog posts (1,500-3,000 words each) covering:
- Industry guides and how-tos
- Benchmark data and statistics
- Comparison articles (X vs Y)
- Best practices and strategies
- Tool reviews and recommendations
- Case study breakdowns

**CRITICAL HUMANIZATION RULES (Google AI Detection):**
- Use contractions EVERYWHERE (it's, don't, won't, can't, we've, you're, that's)
- Vary sentence length — mix short punchy sentences with longer explanatory ones
- Add personality phrases: "Here's the thing:", "Honestly,", "Look,", "The truth is"
- NO uniform template patterns — each post must feel uniquely written
- NO repetitive phrases across posts (vary your vocabulary)
- Spread dates across 6-8 months (not all the same date)
- Alternate authors between founders
- Include personal anecdotes and opinions
- Use conversational tone, not academic

### 4.4 Author System
- Define authors in AuthorBox component with:
  - Name, initials, title, bio (2-3 lines), expertise tags
- Alternate posts between authors (50/50 split)
- Show author in blog hero and author box at end
- Author expertise tags as small pills

---

## PHASE 5: SEO Infrastructure

### 5.1 Technical SEO
- **Sitemap** (`src/app/sitemap.ts`) — Dynamic, includes ALL pages with priority levels
- **Robots** (`src/app/robots.ts`) — Allow all crawlers, reference sitemap
- **Canonical URLs** — Set on all pages via metadata
- **OG Tags** — Title, description, url, type, image on every page
- **Twitter Cards** — summary_large_image on every page

### 5.2 Structured Data (JSON-LD)
- **Organization** — In root layout
- **BlogPosting** — On every blog post (author as Person, not Organization)
- **FAQPage** — On posts with FAQs
- **BreadcrumbList** — On all inner pages

### 5.3 Internal Linking
- Create `EnhancedInternalLinks.tsx` server component
- Auto-suggest related content links on blog posts
- Cross-link between blog posts, guides, and service pages

### 5.4 Programmatic SEO Pages (Optional but powerful)
Create dynamic pages for service x industry and service x city combinations:
- `/services/[service]/[industry]` — e.g., /services/cloud-backup/healthcare
- `/services/[service]/near/[city]` — e.g., /services/cloud-backup/near/new-york
- Store data in `src/lib/programmatic-seo.ts`
- Use 3+ template variants to avoid doorway page detection
- **IMPORTANT:** Add `robots: { index: false, follow: true }` initially (enable after AdSense approval)

### 5.5 Comparison Pages
- 5-10 comparison pages at `/compare/[slug]`
- Store data in `src/lib/comparisons.ts`
- Include verdict, pros/cons, recommendations

### 5.6 Guide Pages
- 3-6 comprehensive guides at `/guides/[slug]`
- Store data in `src/lib/guides.ts`
- 2,000-3,000 words each, table of contents, FAQ sections

### 5.7 IndexNow Integration
- API route at `/api/indexnow`
- Key file at `public/indexnow-key.txt`
- Submit new URLs to Bing/Yandex for instant indexing

---

## PHASE 6: Conversion & Lead Generation

### 6.1 Free Consultation/Audit Page
- Dedicated conversion page at `/free-[cta-name]`
- Minimal layout (no regular nav/footer distraction)
- Multi-step or single form
- Sidebar with trust signals, expected outcomes
- API route to save submissions + send confirmation email

### 6.2 Lead Capture Components
- **In-content CTA** — Mid-article contextual callout linking to consultation
- **Lead Magnet Banner** — Full-width gradient banner at end of posts
- **Sticky CTA Bar** — Fixed bottom bar on scroll
- **Exit Intent Modal** — Popup on mouse exit (desktop) or scroll-up (mobile)

### 6.3 Newsletter System
- Newsletter signup component (multiple placement points)
- API route at `/api/newsletter` — saves subscriber + sends welcome email
- Branded welcome email with HTML template

### 6.4 Contact & Form APIs
Create these API routes with Prisma + Nodemailer:
- `/api/audit` — Main consultation form (rate limited)
- `/api/newsletter` — Email signup
- `/api/contact` — General contact form
- All with: Zod validation, rate limiting, email confirmation, admin notification

---

## PHASE 7: AdSense Preparation (if applicable)

### 7.1 Technical Setup
- `public/ads.txt` with publisher ID
- AdSense script via `next/script` in root layout
- Ad unit wrapper component (`src/components/ads/AdUnit.tsx`)

### 7.2 Ad Placements (Non-intrusive)
- After blog title (responsive ad)
- Mid-article (in-article ad)
- End of article (responsive ad)
- Sidebar (display ad)
- Clean spacing, no accidental click areas

### 7.3 Cookie Consent
- Cookie consent banner component
- Accept/Decline buttons
- localStorage persistence
- Link to privacy policy
- Framer Motion slide-up animation

---

## PHASE 8: Research & Tools Pages

### 8.1 Research Hub
- `/research` — Hub page linking to data pages
- Create 3-5 interactive data/benchmark pages with charts (Recharts)
- Topics relevant to your industry

### 8.2 Tools Hub
- `/tools` — Hub page linking to calculators
- Create 3-5 interactive calculator tools
- Use React state for calculations, beautiful UI with results

---

## PHASE 9: Database Schema

### Prisma Models:
```prisma
model AuditSubmission {
  id          String   @id @default(uuid())
  name        String
  email       String
  company     String?
  phone       String?
  message     String?
  source      String?
  utmSource   String?
  utmMedium   String?
  utmCampaign String?
  createdAt   DateTime @default(now())
}

model ContactSubmission {
  id        String   @id @default(uuid())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
}

model NewsletterSubscriber {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())
}
```

---

## PHASE 10: Final Audit Checklist

Before deploying, verify ALL of these:

### Content Quality
- [ ] 30+ blog posts, each 1,500-3,000 words
- [ ] All content humanized (contractions, personality, varied structure)
- [ ] No duplicate or thin pages
- [ ] Authors displayed on every post
- [ ] Dates spread across 6+ months
- [ ] Reading times vary naturally

### Pages Working
- [ ] Every route loads without 404
- [ ] All blog cards are clickable (wrapped in Link)
- [ ] All internal links work
- [ ] Forms submit successfully
- [ ] Emails send correctly

### SEO
- [ ] Sitemap includes all pages
- [ ] Robots.txt is valid
- [ ] Every page has meta title + description
- [ ] OG tags on every page
- [ ] JSON-LD schemas render correctly
- [ ] Canonical URLs set
- [ ] Breadcrumbs on inner pages

### Legal & Compliance
- [ ] Privacy Policy exists and is comprehensive
- [ ] Terms of Service exists
- [ ] Cookie consent banner works
- [ ] ads.txt is correct (if AdSense)

### Technical
- [ ] `next build` passes with zero errors
- [ ] No TypeScript errors
- [ ] Mobile responsive on all pages
- [ ] Images optimized (next/image)
- [ ] Security headers configured
- [ ] API routes have rate limiting

### E-E-A-T
- [ ] About page with company history
- [ ] Named authors with bios and expertise
- [ ] Case studies with real metrics
- [ ] Testimonials section
- [ ] Contact information visible

---

## IMPORTANT NOTES:

1. **Build incrementally** — Don't try to create everything at once. Follow the phases.
2. **Test after each phase** — Run `next build` to catch errors early.
3. **Content is king** — Spend the most time on blog content quality. This is what Google evaluates.
4. **No chatbot** — This prompt excludes the AI chatbot feature intentionally.
5. **Deploy on Vercel** — Push to GitHub, connect to Vercel for auto-deploy.
6. **Google Search Console** — Submit sitemap after deploying.
7. **Wait for indexing** — Don't apply for AdSense until 50+ pages are indexed.

---

## FILE STRUCTURE REFERENCE:

```
src/
├── app/
│   ├── layout.tsx (root layout with fonts, metadata, scripts)
│   ├── (marketing)/
│   │   ├── page.tsx (homepage)
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── results/page.tsx
│   │   ├── case-studies/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── blog/category/[category]/page.tsx
│   │   ├── guides/page.tsx
│   │   ├── guides/[slug]/page.tsx
│   │   ├── compare/[slug]/page.tsx
│   │   ├── research/page.tsx
│   │   ├── tools/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms-of-service/page.tsx
│   │   ├── services/[service]/[industry]/page.tsx
│   │   └── services/[service]/near/[city]/page.tsx
│   ├── (conversion)/
│   │   ├── layout.tsx (minimal conversion layout)
│   │   └── free-[cta]/page.tsx
│   ├── api/
│   │   ├── audit/route.ts
│   │   ├── newsletter/route.ts
│   │   ├── contact/route.ts
│   │   └── indexnow/route.ts
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/ (Navigation, Footer)
│   ├── sections/ (all page sections)
│   ├── blog/ (AuthorBox, InContentCTA, LeadMagnetBanner)
│   ├── seo/ (Breadcrumbs, FAQSchema, InternalLinks)
│   ├── ads/ (AdUnit)
│   ├── ui/ (shadcn components)
│   └── CookieConsent.tsx
├── content/
│   └── blog/ (30+ markdown files)
├── lib/
│   ├── blog.ts
│   ├── case-studies.ts
│   ├── comparisons.ts
│   ├── guides.ts
│   ├── programmatic-seo.ts
│   ├── email.ts
│   ├── db.ts
│   └── utils.ts
└── public/
    ├── ads.txt
    ├── logo.png
    └── indexnow-key.txt
```

---

**START BUILDING. Follow phases 1-10 in order. Ask me before deploying.**

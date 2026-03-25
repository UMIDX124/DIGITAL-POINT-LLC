# Master Website Builder Prompt

> Copy everything below this line and paste into a new Claude Code session for your other business project. Replace all `[PLACEHOLDERS]` with your actual business info.

---

## BUSINESS INFO (REPLACE THESE)

```
COMPANY_NAME = [Your Company Name]
COMPANY_TAGLINE = [Your tagline - e.g. "We Turn Ad Spend Into Revenue"]
COMPANY_DESCRIPTION = [2-3 sentence description of what you do]
COMPANY_DOMAIN = [yourdomain.com]
COMPANY_FOUNDED = [Year]
COMPANY_LOCATION = [City, State, Country]

FOUNDER_1_NAME = [First founder name]
FOUNDER_1_TITLE = [Co-Founder / CEO]
FOUNDER_1_BIO = [2-3 line bio]
FOUNDER_1_EXPERTISE = [Expertise 1, Expertise 2, Expertise 3]

FOUNDER_2_NAME = [Second founder name]
FOUNDER_2_TITLE = [Co-Founder / CTO]
FOUNDER_2_BIO = [2-3 line bio]
FOUNDER_2_EXPERTISE = [Expertise 1, Expertise 2, Expertise 3]

BRAND_PRIMARY_COLOR = [Your brand color hex - e.g. #9d4edd]
BRAND_ACCENT_COLOR = [Secondary color - e.g. #ff6b9d]
BRAND_STYLE = [cosmic-dark / minimal-light / corporate-blue / etc]

SERVICES = [Service 1, Service 2, Service 3, ...]
INDUSTRIES_SERVED = [Industry 1, Industry 2, ...]
TARGET_CITIES = [City 1, City 2, ... (for local SEO)]

ADSENSE_ID = [ca-pub-XXXXXXXXXX or "none"]
GOOGLE_PARTNER = [true/false]
SMTP_EMAIL = [your-email@domain.com]
```

---

## THE PROMPT

Build me a complete, production-ready business website with the following architecture and features. This should be a Silicon Valley corporate-level website that represents my company globally. Deploy-ready on Vercel.

### TECH STACK (EXACT)
- Next.js 16+ (App Router, Turbopack)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- Framer Motion for animations
- Radix UI + shadcn/ui for base components
- Prisma with SQLite for form submissions
- Nodemailer for email notifications
- Recharts for data visualization
- React Hook Form + Zod for form validation
- Zustand for state management
- TanStack React Query for server state

### DESIGN SYSTEM
Create a fully custom design system with:

**Theme**: Dark cosmic theme (deep violet-black backgrounds, glass morphism, glow effects)
- Background: #0d0815
- Surface: #13091e
- Primary: [BRAND_PRIMARY_COLOR]
- Accent: [BRAND_ACCENT_COLOR]
- Text primary: #f4f0f9
- Text secondary: #b794c7
- Text muted: #7c5a8a
- Glass effects: backdrop-blur with rgba borders
- Glow effects: radial gradients, drop shadows

**Typography**:
- Display font: Space Grotesk (Google Fonts, variable weight 300-700)
- Body font: Inter (400-500)
- Mono font: IBM Plex Mono (for metrics, code)

**Animations** (Framer Motion):
- FadeUp on scroll (staggered children)
- Parallax hero with floating elements
- Spring physics on interactions
- Glass card hover effects (elevation + border glow)
- Button glow effects
- Animated section dividers
- Respect prefers-reduced-motion

**CSS Utilities**:
- .glass (backdrop-blur-xl, rgba background)
- .glass-strong (heavier blur)
- .text-gradient (gradient text)
- .cosmic-glow (radial glow background)
- .stars-bg (animated twinkling stars)
- .grid-bg (subtle grid pattern)
- .noise-overlay (SVG noise texture)
- .card-hover (elevation + border on hover)
- .btn-glow (button glow on hover)

### PAGES & ROUTES

**Homepage** (`/`) - Sections in this exact order:
1. HeroSection - Cosmic gradient background, parallax floating planets/orbs, company tagline, 2 CTA buttons (primary + ghost), animated stars
2. ProofBar - Trust metrics strip (X+ years, X clients, X% avg ROAS, Google Partner badge)
3. LatestInsights - 6 most recent blog posts in 3-column grid, auto-pulled from blog
4. FreeResources - 3 resource cards linking to guides
5. ProcessSection - How-we-work steps (5 steps with icons)
6. PillarsSection - Core service pillars with benefits
7. CaseStudiesPreview - 3 featured case studies with key metrics
8. ProofSection - Client results and testimonials count
9. TestimonialsSection - Customer testimonials with star ratings
10. FAQSection - Structured FAQ with Schema markup
11. CTASection - Final conversion CTA

**Service Pages** (one per service):
- /[service-slug] for each core service
- Hero, benefits, process, results, FAQ, CTA sections
- Internal links to related blog posts and guides

**About** (`/about`):
- Company story with timeline/milestones
- Co-founder profiles with photos/bios
- Values section
- Certifications section (Google Partner if applicable)
- Team stats (years, clients, results)

**Contact** (`/contact`):
- Contact form (name, email, subject, message)
- Company info sidebar (email, phone, location)
- Map or location indicator

**Results** (`/results`):
- Case study cards with before/after metrics
- ROAS improvements, CAC reductions, revenue growth
- Visual data presentation

**Case Studies** (`/case-studies`):
- 3+ detailed case studies
- Structure: Client type, Problem, Strategy, Execution, Results (with numbers)
- CTA to book consultation

**Blog System** (`/blog`, `/blog/[slug]`, `/blog/category/[category]`):
- 50-100 blog posts in markdown with YAML frontmatter
- Fields: title, excerpt, category, tags, date, author, faqs, featured
- 6 categories relevant to your business
- Auto-generated Table of Contents from H2/H3 headings
- Author box at end of every post (with bio, expertise tags, Google Partner badge)
- Related posts section (same category)
- FAQ section with Schema markup
- Mid-article CTA (InContentCTA) - contextual based on category
- End-of-article lead magnet banner (LeadMagnetBanner)
- Internal linking suggestions (EnhancedInternalLinks)
- Reading time calculated from word count
- Category pages with filtering
- Blog list with search and pagination
- Blog cards must be fully clickable (wrapped in Link)

**Guides Hub** (`/guides`, `/guides/[slug]`):
- 6+ comprehensive multi-section guides (2000-3000 words each)
- Structure: sections with key takeaways, FAQs, related links
- Topics covering your service expertise areas
- generateStaticParams for all guides

**Research Hub** (`/research`, `/research/[slug]`):
- 5+ original research/benchmark report pages
- Interactive Recharts data visualizations
- Industry-specific data and insights

**Tools Hub** (`/tools`, `/tools/[slug]`):
- 5+ interactive calculators relevant to your business
- React state-managed inputs with real-time calculations
- Tool Schema markup (SoftwareApplication, free)

**Comparison Pages** (`/compare/[slug]`):
- 10+ side-by-side comparison pages
- Pros/cons, comparison tables, recommendations
- generateStaticParams for all comparisons

**Programmatic SEO** (200+ pages):
- `/services/[service]/[industry]` - Service x Industry combinations
- `/services/[service]/near/[city]` - Service x City for local SEO
- Content generation functions with 3 template variants per page (to avoid doorway page detection)
- Humanized content: contractions, personality, varied sentence structures
- Mark these as noindex initially (for AdSense approval), re-enable later

**Legal Pages**:
- `/privacy-policy` - Full privacy policy (GDPR, cookies, AdSense, COPPA)
- `/terms-of-service` - Full terms (liability, IP, governing law)

**Lead Capture** (`/free-growth-audit` or `/free-consultation`):
- Multi-field form: name, email, company, website, business type, budget, team size, pain points, services needed, notes
- UTM tracking fields
- Rate limiting (5 per hour per IP)
- Database storage (Prisma)
- Admin email notification
- Branded confirmation response

### LAYOUT COMPONENTS

**Navigation** (sticky, glass effect):
- Logo on left with white glow effect + floating animation
- Pill-shaped nav container centered (flex-1 justify-center)
- Items: Home, [Your Service Pages], Case Studies, Results, Blog, About, Contact
- Active link indicator with animated background (layoutId)
- CTA button on right ("Free Growth Audit" or similar)
- Mobile hamburger menu with AnimatePresence full-screen overlay
- Scroll-based blur transition

**Footer**:
- 4-column layout: Brand info, Services, Company, Contact
- Gradient text headings
- Social links (LinkedIn, email, etc.)
- Trust badges (years in business, Google Partner)
- Legal links (Privacy Policy, Terms of Service)
- Copyright with dynamic year

### SEO INFRASTRUCTURE (CRITICAL)

**Metadata**:
- Title template: `%s | [COMPANY_NAME]`
- Per-page titles, descriptions, keywords
- Open Graph tags on every page (title, description, url, type, image)
- Twitter Card tags on every page
- Canonical URLs per page

**Structured Data (JSON-LD)**:
- Organization schema (name, url, logo, founders, address, credentials)
- BlogPosting schema on blog posts (headline, author as Person, datePublished)
- FAQPage schema on pages with FAQs
- SoftwareApplication schema on tool pages
- BreadcrumbList schema per page

**Technical SEO**:
- Dynamic robots.ts via Next.js metadata API
- Dynamic sitemap.ts with all 350+ pages and priority levels
- IndexNow API route for instant Bing/Yandex indexing
- Breadcrumbs component with Schema markup
- Internal linking strategy (related posts, contextual links, cross-page links)
- Canonical URLs explicitly set

### AUTHOR SYSTEM (E-E-A-T)

Create author data with 2 co-founders + team default:
- Each author: name, initials, title, bio (2-3 lines), expertise tags (3)
- AuthorBox component shown at bottom of every blog post
- Author name shown in blog post hero
- Alternate authors across posts (50/50 split)
- Google Certified Partner badge on author box (if applicable)
- Author as Person type in BlogPosting schema

### ADVERTISING (AdSense Ready)

- AdSense script via next/script with strategy="afterInteractive"
- public/ads.txt with publisher ID
- Reusable AdUnit component (auto, rectangle, horizontal, vertical formats)
- InArticleAd and SidebarAd wrapper components
- Clean spacing around ad placements
- No misleading UI or accidental click areas

### COOKIE CONSENT

- CookieConsent component (client-side, localStorage)
- Bottom-fixed banner with Accept/Decline buttons
- Links to privacy policy
- Framer Motion slide-up/slide-down animation
- Only shows when no consent choice exists

### GOOGLE PARTNER BADGE (if applicable)

- Reusable GooglePartnerBadge component (SVG shield)
- Displayed on: ProofBar, Footer, Author boxes, About page
- Organization schema hasCredential for Google Partner

### EMAIL SYSTEM

- Nodemailer with SMTP configuration
- HTML email templates with brand colors
- Newsletter welcome email (to subscriber)
- Admin notification emails (for form submissions)
- High-intent lead alerts
- HTML escaping for security
- Retry logic (2 attempts)

### DATABASE

Prisma with SQLite:
- FormSubmission model (all form fields + UTM tracking + status)
- NewsletterSubscriber model (email + timestamps)
- SupportTicket model (name, email, subject, message, priority, status)

### API ROUTES

- POST /api/audit (or /api/consultation) - Main lead form
- POST /api/newsletter - Newsletter signup
- POST /api/contact - Contact form
- POST /api/indexnow - IndexNow instant indexing

### SECURITY

- Security headers in next.config.ts (X-Frame-Options, X-Content-Type-Options, etc.)
- Rate limiting on all form endpoints
- HTML escaping on all user input
- Zod validation on all forms
- Parameterized database queries (Prisma)
- Environment variables for all secrets

### CONTENT HUMANIZATION (CRITICAL for AdSense)

ALL content must be humanized to pass AI detection:
- Use contractions throughout (it's, don't, we've, you're, etc.)
- Vary sentence structure (short punchy + longer explanatory)
- Add personality markers ("Here's the thing", "Look,", "Honestly,")
- No uniform template patterns across pages
- Different opening patterns per page/section
- Real numbers and specific examples
- Conversational tone, not corporate-formal
- 3 template variants for programmatic SEO pages

### PERFORMANCE

- Server Components by default, Client Components only when needed
- Static generation (generateStaticParams) for all content pages
- next/image for all images
- Google Fonts with display=swap
- Standalone output mode
- Sharp for image processing

### DEPLOYMENT

- Vercel-ready (auto-deploy from GitHub main branch)
- .env.local for local development
- Environment variables for all secrets
- No hardcoded API keys

---

## IMPORTANT NOTES

1. DO NOT include an AI chatbot - I don't want that feature
2. Make ALL blog content humanized with contractions and personality - zero AI detection risk
3. Blog dates should be spread across 8+ months (not all the same month)
4. Reading times should vary naturally based on word count
5. Every blog card must be clickable and navigate to the full post
6. All internal links must point to valid routes
7. Test build before deploying - all 350+ pages should generate with zero errors
8. Before deploying, ask me first for approval

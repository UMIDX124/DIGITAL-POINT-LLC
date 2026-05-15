import type { Metadata } from "next";
import { headers } from "next/headers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Logomark } from "@/components/brand/Logomark";
import { VisibilityPause } from "@/components/motion/VisibilityPause";
import { MouseTracker } from "@/components/motion/MouseTracker";
import { BotIdClient } from "botid/client";
import { SpeedInsights } from "@vercel/speed-insights/next";
// Phase 17b 3-restructured A3. Analytics gated on cookie consent.
import CookieConsent from "@/components/compliance/CookieConsent";
import AnalyticsGate from "@/components/compliance/AnalyticsGate";

/**
 * Phase 12. Instrument Serif served via manual @font-face in globals.css
 * (latin-subset ~10 KB / weight). Regular preloaded selectively in <head>;
 * italic loads on-demand when CSS first references it (hero-em / pullquote).
 * Geist Sans + Mono are already self-hosted via the `geist` npm package.
 */

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalpointllc.com"),
  title: {
    default: "Digital Point. Hire the AI. Skip the headcount.",
    template: "%s | Digital Point LLC",
  },
  description:
    "AI agents and trained operators run your ops and reporting work. Same output as a 4-person internal team, one retainer. Built for $1M-$50M companies.",
  keywords: [
    "AI agents",
    "AI automation agency",
    "AI workflow automation",
    "agent stack deployment",
    "CRM automation",
    "ops automation",
    "reporting automation",
    "lead routing AI",
    "sales follow-up AI",
    "remote operators",
    "trained operators backstop",
    "n8n workflows",
    "Groq llama AI",
    "scale without headcount",
    "AI ops infrastructure",
  ],
  authors: [{ name: "M. Faizan Rafiq" }, { name: "Anwaar Tayyab" }],
  creator: "Digital Point LLC",
  publisher: "Digital Point LLC",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Digital Point. Hire the AI. Skip the headcount.",
    description:
      "AI agents and trained operators run your ops and reporting work. Same output as a 4-person internal team, one retainer. Built for $1M-$50M companies.",
    url: "https://digitalpointllc.com",
    siteName: "Digital Point LLC",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Point LLC. AI Agents, Automation, Operators.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Point. Hire the AI. Skip the headcount.",
    description:
      "AI agents and trained operators run your ops and reporting work. Same output as a 4-person internal team, one retainer. Built for $1M-$50M companies.",
    images: ["/og-image.png"],
    creator: "@digitalpointllc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  } : undefined,
  alternates: {
    canonical: "https://digitalpointllc.com",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // CSP nonce read forces dynamic render. Required for inline script/style nonce attribution
  // (5 consumers: 3 JSON-LD blocks in this file + BlogPosting + CollectionPage schemas).
  const hdrs = await headers();
  const nonce = hdrs.get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Digital Point LLC",
              url: "https://digitalpointllc.com",
              logo: "https://digitalpointllc.com/dp-mark-light.png",
              description:
                "AI agents and trained operators run your ops and reporting work. Same output as a 4-person internal team, one retainer. Built for $1M-$50M companies.",
              sameAs: [
                "https://www.linkedin.com/company/digitalpointllc",
              ],
              /* Phase 17b 3-reversal E1. URL-based ContactPoint, no email.
                 Cosmo on-site chat + audit form are the canonical routes;
                 the deep-anchor URL points at the footer philosophy block
                 explaining the policy. */
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                description:
                  "Reach us through Cosmo (on-site chat) or the free growth audit form. Direct operator routing, no shared inbox.",
                url: "https://digitalpointllc.com/#contact-philosophy",
                areaServed: "Worldwide",
                availableLanguage: ["en"],
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              foundingDate: "2017",
              founder: [
                { "@type": "Person", name: "M. Faizan Rafiq", jobTitle: "Co-Founder" },
                {
                  "@type": "Person",
                  name: "Anwaar Tayyab",
                  jobTitle: "Co-Founder",
                  image: "https://digitalpointllc.com/dp-founder-anwaar.jpg",
                },
                { "@type": "Person", name: "Umer Farooq", jobTitle: "Operator" },
              ],
            }),
          }}
        />

        {/* Professional Service Schema */}
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Digital Point LLC",
              description:
                "AI agent and automation infrastructure that runs operational workflows (CRM, ops, reporting, growth) so you scale without scaling team.",
              url: "https://digitalpointllc.com",
              serviceType: [
                "AI Agent Deployment",
                "Workflow Automation",
                "Remote Operators",
                "Performance Marketing",
                "Reporting and Analytics",
                "Lead Operations",
              ],
              areaServed: { "@type": "Place", name: "Worldwide" },
              priceRange: "$$",
            }),
          }}
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Digital Point LLC",
              url: "https://digitalpointllc.com",
            }),
          }}
        />

        {/* Phase 18.6 P7 perf-pass. Instrument Serif preload tags removed.
            Browser console warning on production: "preloaded but not used
            within a few seconds from window load event". The preload was
            wasted bandwidth + parse cost. @font-face in globals.css uses
            font-display: optional so fonts load on-demand and visible-paint
            uses fallback until ready (Pillar 3R iter 2 CLS fix). Net: drop
            ~20KB of eager font fetch, paint stays stable. */}

        {/* Intro loader runs on every hard page load. Pure CSS, no JS, CSP-clean.
            Client navigations within Next.js do not retrigger because the
            loader markup mounts once at the root. Reduced-motion hides it. */}

        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>
      <body className="font-sans antialiased">
        {/* Phase 20 audit L5. Skip-to-content link for keyboard users.
            Visually hidden until focused, then anchors to <main id="main">
            in (marketing)/layout.tsx. */}
        <a href="#main" className="skip-to-content">Skip to content</a>
        {/* Phase 18.6 P5/P6. Inline style background:#000000 REMOVED so
            body's globals.css background (subtle radial atmosphere) takes
            effect. Color retained inline so unstyled fallback is readable. */}
        <div className="dpl-intro-loader" aria-hidden="true">
          <span className="dpl-intro-meta dpl-intro-meta--top">
            DPL · Operator Brief · v2026.05
          </span>
          <span className="dpl-intro-mascot">
            <Logomark mode="lockup" variant="dark" priority markSize={44} textSize={152} gap={14} className="dpl-intro-mascot-mark" />
          </span>
          <span className="dpl-intro-line" />
          <span className="dpl-intro-meta dpl-intro-meta--bottom">
            <span className="dpl-intro-meta__text">Booting trained agent stack</span>
            <span className="dpl-intro-meta__caret" aria-hidden="true" />
          </span>
        </div>
        <VisibilityPause />
        <MouseTracker />
        <BotIdClient
          protect={[
            { path: '/api/audit', method: 'POST' },
            { path: '/api/founder', method: 'POST' },
            { path: '/api/leads', method: 'POST' },
            { path: '/api/chat', method: 'POST' },
            { path: '/api/ticket', method: 'POST' },
            { path: '/api/newsletter', method: 'POST' },
          ]}
        />
        {children}
        <Toaster />
        <CookieConsent />
        <AnalyticsGate />
        {/* Phase 20 audit M1. Vercel Speed Insights for real-user CWV
            data (LCP, INP, CLS at 75th percentile). Client-only via the
            @vercel/speed-insights/next adapter. */}
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { headers } from "next/headers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { IntroSplash } from "@/components/brand/IntroSplash";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { BotIdClient } from "botid/client";
import { SpeedInsights } from "@vercel/speed-insights/next";
// Phase 17b 3-restructured A3. Analytics gated on cookie consent.
import CookieConsent from "@/components/compliance/CookieConsent";
import AnalyticsGate from "@/components/compliance/AnalyticsGate";
import {
  ORG_JSONLD_STR,
  PROFESSIONAL_SERVICE_JSONLD_STR,
  WEBSITE_JSONLD_STR,
} from "@/lib/jsonld";

/**
 * Phase 12. Instrument Serif served via manual @font-face in globals.css
 * (latin-subset ~10 KB / weight). Regular preloaded selectively in <head>;
 * italic loads on-demand when CSS first references it (hero-em / pullquote).
 * Geist Sans + Mono are already self-hosted via the `geist` npm package.
 */

export const metadata: Metadata = {
  metadataBase: new URL("https://www.digitalpointllc.com"),
  title: {
    default: "Digital Point. Hire the AI. Skip the headcount.",
    template: "%s · Digital Point LLC",
  },
  description:
    "AI agents and trained operators run your ops and reporting work. Same output as a 4-person internal team, one retainer. Built for $1M-$50M companies.",
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
    url: "https://www.digitalpointllc.com",
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
    canonical: "https://www.digitalpointllc.com",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the per-request nonce set by proxy.ts. Required for Next.js to
  // propagate nonces to its own inline + bundle scripts under our
  // strict-dynamic CSP. Without this, every <script> tag ships without a
  // nonce and the browser blocks the entire page's JS.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* JSON-LD schemas hash-pinned in CSP. Nonce is also attached so
            the scripts pass through whether the browser honours hashes
            for non-executable script types or not. */}
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: ORG_JSONLD_STR }}
        />
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: PROFESSIONAL_SERVICE_JSONLD_STR }}
        />
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: WEBSITE_JSONLD_STR }}
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
        <IntroSplash />
        {/* Phase 18.6 P5/P6. Inline style background:#000000 REMOVED so
            body's globals.css background (subtle radial atmosphere) takes
            effect. Color retained inline so unstyled fallback is readable. */}
        <MotionRoot />
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

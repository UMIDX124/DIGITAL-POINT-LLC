import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GrainOverlay } from "@/components/background/GrainOverlay";
import { CursorBloom } from "@/components/background/CursorBloom";
import { VisibilityPause } from "@/components/motion/VisibilityPause";
import ChatWidget from "@/components/chat/ChatWidget";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Phase 12 — Instrument Serif served via manual @font-face in globals.css
 * (latin-subset ~10 KB / weight). Regular preloaded selectively in <head>;
 * italic loads on-demand when CSS first references it (hero-em / pullquote).
 * Geist Sans + Mono are already self-hosted via the `geist` npm package.
 */

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalpointllc.com"),
  title: {
    default: "Digital Point — Hire the AI. Skip the headcount.",
    template: "%s | Digital Point LLC",
  },
  description:
    "Digital Point operates the AI agent + automation stack that runs your CRM, ops, reporting, and growth workflows — so you scale without scaling headcount.",
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
    title: "Digital Point — Hire the AI. Skip the headcount.",
    description:
      "Digital Point operates the AI agent + automation stack that runs your CRM, ops, reporting, and growth workflows — so you scale without scaling headcount.",
    url: "https://digitalpointllc.com",
    siteName: "Digital Point LLC",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Point LLC — AI Agents + Automation + Operators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Point — Hire the AI. Skip the headcount.",
    description:
      "Digital Point operates the AI agent + automation stack that runs your CRM, ops, reporting, and growth workflows — so you scale without scaling headcount.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Digital Point LLC",
              url: "https://www.digitalpointllc.com",
              logo: "https://www.digitalpointllc.com/Dp-logo1.png",
              description:
                "Digital Point operates the AI agent + automation stack that runs your CRM, ops, reporting, and growth workflows — so you scale without scaling headcount.",
              sameAs: [
                "https://www.linkedin.com/company/digitalpointllc",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                description:
                  "Reach out via the on-site Cosmo chat or the free growth audit form. Direct operator routing — no shared inbox.",
                url: "https://www.digitalpointllc.com/contact",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              foundingDate: "2017",
              founder: [
                { "@type": "Person", name: "M. Faizan Rafiq", jobTitle: "Co-Founder" },
                { "@type": "Person", name: "Anwaar Tayyab", jobTitle: "Co-Founder" },
              ],
            }),
          }}
        />

        {/* Professional Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Digital Point LLC",
              description:
                "AI agent and automation infrastructure that runs operational workflows — CRM, ops, reporting, growth — so you scale without scaling team.",
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Digital Point LLC",
              url: "https://digitalpointllc.com",
            }),
          }}
        />

        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://digitalpointllc.com" },
                { "@type": "ListItem", position: 2, name: "Remote Workforce", item: "https://digitalpointllc.com/remote-workforce" },
                { "@type": "ListItem", position: 3, name: "Automation", item: "https://digitalpointllc.com/automation" },
                { "@type": "ListItem", position: 4, name: "Performance Marketing", item: "https://digitalpointllc.com/performance-marketing" },
                { "@type": "ListItem", position: 5, name: "Results", item: "https://digitalpointllc.com/results" },
                { "@type": "ListItem", position: 6, name: "Free Growth Audit", item: "https://digitalpointllc.com/free-growth-audit" },
              ],
            }),
          }}
        />

        <link
          rel="preload"
          href="/fonts/instrument-serif-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/instrument-serif-italic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Phase 12 — CSS-only intro loader sessionStorage gate. Inline
            script runs synchronously before paint to mark <html> if the
            intro has been shown this session. CSS in globals.css uses the
            attribute selector to skip the @keyframes when present. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('dpl_i')==='1')document.documentElement.dataset.iSeen='1';else sessionStorage.setItem('dpl_i','1')}catch(e){}",
          }}
        />

        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>
      <body
        className="font-sans antialiased"
        style={{ background: "#000000", color: "#F5F5F7" }}
      >
        <div className="dpl-intro-loader" aria-hidden="true">
          <span className="dpl-intro-wordmark">Digital Point</span>
          <span className="dpl-intro-line" />
        </div>
        <GrainOverlay />
        <CursorBloom />
        <VisibilityPause />
        {children}
        <ChatWidget />
        <Toaster />
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_ADSENSE_ID ? (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        ) : null}
      </body>
    </html>
  );
}

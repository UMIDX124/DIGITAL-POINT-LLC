import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

/**
 * Phase 4a font stack:
 * - Geist Sans (Vercel, OFL) → primary UI + body (replaces Inter)
 * - Geist Mono (Vercel, OFL) → data + eyebrow labels (replaces JetBrains Mono)
 * - Instrument Serif → hero display + pull quote + italic accents (unchanged)
 *
 * Legacy --font-inter / --font-jetbrains-mono CSS vars are aliased to Geist
 * in globals.css so existing components (RecentWorkSection SVG labels etc.)
 * keep resolving without a component-level rewrite.
 */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalpointllc.com"),
  title: {
    default: "Digital Point LLC | Remote Operators + AI Workflows Since 2017",
    template: "%s | Digital Point LLC",
  },
  description:
    "We deploy trained remote operators and AI workflows that run your marketing, back-office, and reporting — so you don't hire a full department to scale one practice. One team. Three practices. Measurable outcomes.",
  keywords: [
    "remote workforce agency",
    "remote marketing team",
    "AI automation agency",
    "marketing automation",
    "back-office automation",
    "reporting automation",
    "performance marketing agency",
    "paid acquisition",
    "operated marketing team",
    "managed service",
    "outsourced marketing operations",
    "lead operations",
    "B2B marketing agency",
    "Meta ads agency",
    "Google ads agency",
    "n8n workflows",
    "AI automation",
    "pod-based marketing team",
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
  openGraph: {
    title: "Digital Point LLC | Remote Operators + AI Workflows",
    description:
      "Pod-based operators and AI workflows that run marketing, back-office, and reporting. One team. Three practices.",
    url: "https://digitalpointllc.com",
    siteName: "Digital Point LLC",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Point LLC — Remote Operators + AI Workflows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Point LLC | Remote Operators + AI Workflows",
    description:
      "Pod-based operators and AI workflows that run marketing, back-office, and reporting.",
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
    <html lang="en" className="dark" suppressHydrationWarning>
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
                "An operated team of remote specialists and AI workflows that run marketing, back-office, and reporting for growth-stage businesses.",
              sameAs: [
                "https://www.linkedin.com/company/digitalpointllc",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@digitalpointllc.com",
                contactType: "customer service",
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
                "Remote operators, AI workflows, and performance marketing — operated as a single service.",
              url: "https://digitalpointllc.com",
              serviceType: [
                "Remote Workforce",
                "Marketing Automation",
                "AI Workflows",
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

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <meta name="theme-color" content="#0D0D0D" />
        <meta name="msapplication-TileColor" content="#0D0D0D" />
      </head>
      <body
        className={`${instrumentSerif.variable} ${GeistSans.variable} ${GeistMono.variable} antialiased`}
        style={{ background: "#0D0D0D", color: "#F5F5F7" }}
      >
        {children}
        <Toaster />
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

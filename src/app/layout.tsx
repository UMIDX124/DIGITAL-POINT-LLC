import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalpointllc.com"),
  title: {
    default: "Digital Point LLC | Performance Marketing & Remote Workforce Solutions",
    template: "%s | Digital Point LLC",
  },
  description:
    "Digital Point helps businesses scale revenue with performance marketing, remote execution, and systems that actually hold. Paid acquisition, reporting clarity, and managed workforce support for founder-led and growth-stage businesses.",
  keywords: [
    "performance marketing agency",
    "paid acquisition agency",
    "digital marketing powerhouse",
    "remote workforce company",
    "remote marketing team",
    "remote execution support",
    "marketing automation",
    "reporting dashboards",
    "revenue systems",
    "RevOps support",
    "outsourced marketing operations",
    "founder-led growth audit",
    "CAC optimization",
    "ROAS improvement",
    "lead generation agency",
    "marketing attribution",
    "CRM optimization",
    "marketing operations",
    "remote team management",
    "performance marketing services",
    "digital marketing agency",
    "B2B marketing agency",
    "growth marketing agency",
    "paid media agency",
    "Meta ads agency",
    "Google ads agency",
  ],
  authors: [{ name: "Digital Point LLC" }],
  creator: "Digital Point LLC",
  publisher: "Digital Point LLC",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Digital Point LLC | Performance Marketing & Remote Workforce Solutions",
    description:
      "Scale revenue with performance marketing, remote execution, and systems that actually hold. Founder-led growth audits available.",
    url: "https://digitalpointllc.com",
    siteName: "Digital Point LLC",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital Point LLC - Performance Marketing & Remote Workforce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Point LLC | Performance Marketing & Remote Workforce",
    description:
      "Scale revenue with performance marketing, remote execution, and systems that actually hold.",
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
              url: "https://digitalpointllc.com",
              logo: "https://digitalpointllc.com/logo.png",
              description:
                "A performance marketing and remote execution company that helps businesses scale revenue with paid acquisition, systems, reporting clarity, and managed remote workforce support.",
              sameAs: [
                "https://linkedin.com/company/digitalpointllc",
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
              foundingDate: "2023",
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
                "Performance marketing, RevOps, and remote workforce solutions for scaling businesses.",
              url: "https://digitalpointllc.com",
              serviceType: [
                "Performance Marketing",
                "Remote Workforce Management",
                "Revenue Operations",
                "Marketing Automation",
                "Paid Acquisition",
                "Marketing Attribution",
                "CRM Optimization",
              ],
              areaServed: {
                "@type": "Place",
                name: "Worldwide",
              },
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
        
        {/* FAQPage Schema - Will be added dynamically on FAQ section */}
        
        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://digitalpointllc.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Performance Marketing",
                  item: "https://digitalpointllc.com/performance-marketing",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Remote Workforce",
                  item: "https://digitalpointllc.com/remote-workforce",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Systems & Reporting",
                  item: "https://digitalpointllc.com/systems-reporting",
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Results",
                  item: "https://digitalpointllc.com/results",
                },
                {
                  "@type": "ListItem",
                  position: 6,
                  name: "Free Growth Audit",
                  item: "https://digitalpointllc.com/free-growth-audit",
                },
              ],
            }),
          }}
        />
        
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0a0a0c" />
        <meta name="msapplication-TileColor" content="#0a0a0c" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

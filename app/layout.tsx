import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Navbar } from "@/components/layout/navbar";
import { siteConfig } from "@/lib/content";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "DigitalPoint LLC | Digital Growth & Remote Workforce Solutions",
    template: "%s | DigitalPoint LLC",
  },
  applicationName: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "digital growth partner",
    "remote workforce solutions",
    "digital marketing services",
    "growth systems",
    "technology support",
    "operational support",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/digitalpoint-favicon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: ["/digitalpoint-favicon.png"],
    apple: [
      {
        url: "/digitalpoint-favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "DigitalPoint LLC | Digital Growth & Remote Workforce Solutions",
    description: siteConfig.description,
    siteName: "DigitalPoint LLC",
    url: siteConfig.siteUrl,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DigitalPoint LLC | Digital Growth & Remote Workforce Solutions",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#3E1E68",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <MotionProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <div className="relative min-h-screen overflow-x-clip">
            <Navbar />
            {children}
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}

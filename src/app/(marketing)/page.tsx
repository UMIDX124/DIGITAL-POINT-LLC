import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { PersonaRouter } from "@/components/sections/PersonaRouter";
import { FeaturedGrowthSection } from "@/components/sections/FeaturedGrowthSection";
import { PricingBand } from "@/components/sections/PricingBand";
import { ActivityTicker } from "@/components/marketing/ActivityTicker";
import { HomeEvidence } from "@/components/sections/HomeEvidence";
import { AgencyMailboxPositioning } from "@/components/sections/AgencyMailboxPositioning";
import { OperationalHistory } from "@/components/sections/OperationalHistory";
import { RecoverySection } from "@/components/sections/RecoverySection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { HomeSystemFlow } from "@/components/sections/HomeSystemFlow";
import { MathSection } from "@/components/sections/MathSection";
import { FounderQuote } from "@/components/sections/FounderQuote";
import { FoundersSection } from "@/components/sections/FoundersSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StackSection } from "@/components/sections/StackSection";
import { IntegrationsBar } from "@/components/sections/IntegrationsBar";
import { CTASection } from "@/components/sections/CTASection";
import { GrowthPromoModal } from "@/components/marketing/GrowthPromoModal";

export const metadata: Metadata = {
  title: { absolute: "AI Agents That Run Your Ops · Digital Point LLC" },
  description:
    "Replace a four-person ops team with AI agents and one human operator. $30K a year instead of $400K. Audit free, written deployment plan within five business days.",
  alternates: { canonical: "https://www.digitalpointllc.com" },
  openGraph: {
    title: "AI Agents That Run Your Ops · Digital Point LLC",
    description:
      "Replace a four-person ops team with AI agents and one human operator. $30K a year instead of $400K.",
    url: "https://www.digitalpointllc.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agents That Run Your Ops · Digital Point LLC",
    description:
      "Four-person ops for $30K a year. Agents plus one human operator. Audit free.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PersonaRouter />
      <FeaturedGrowthSection />
      <HomeEvidence />
      <ActivityTicker />
      <AgencyMailboxPositioning />
      <OperationalHistory />
      <PillarsSection />
      <HomeSystemFlow />
      <MathSection />
      <FounderQuote />
      <FoundersSection variant="compact" />
      <ProcessSection />
      <StackSection />
      <IntegrationsBar />
      <RecoverySection />
      <PricingBand />
      <CTASection />
      <GrowthPromoModal />
    </>
  );
}

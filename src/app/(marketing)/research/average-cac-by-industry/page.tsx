import type { Metadata } from 'next';
import { ArticleSchema, FAQSchema } from '@/components/seo/FAQSchema';
import { AverageCACByIndustry } from './AverageCACByIndustry';

export const metadata: Metadata = {
  title: 'Average Customer Acquisition Cost (CAC) by Industry — 2026 Benchmarks',
  description: 'CAC benchmarks across 18 industries with breakdowns by company size, channel, and business model. Updated for 2026 with B2B and B2C comparisons.',
  keywords: ['average cac by industry', 'customer acquisition cost benchmarks', 'cac benchmarks 2026', 'b2b cac', 'b2c cac', 'cost per acquisition by industry'],
  alternates: { canonical: 'https://digitalpointllc.com/research/average-cac-by-industry' },
  openGraph: {
    title: 'Average CAC by Industry — 2026 Benchmarks — Digital Point LLC',
    description: 'Customer acquisition cost benchmarks across 18 industries. B2B vs B2C breakdowns and channel-level data.',
  },
};

const faqs = [
  { question: 'What is the average customer acquisition cost across all industries?', answer: 'The overall average CAC across industries is $198 for B2C and $702 for B2B. However, these numbers vary dramatically by industry — SaaS B2B averages $942 while e-commerce B2C averages $70.' },
  { question: 'How do you calculate CAC?', answer: 'CAC = Total Sales & Marketing Spend / Number of New Customers Acquired. Include all costs: ad spend, sales salaries, tools, content production, and overhead allocated to acquisition.' },
  { question: 'What is a good CAC to LTV ratio?', answer: 'A healthy CAC:LTV ratio is 1:3 or better, meaning your customer lifetime value is at least 3x your acquisition cost. Below 1:3, growth becomes unsustainable. Above 1:5, you may be underinvesting in growth.' },
  { question: 'Which marketing channel has the lowest CAC?', answer: 'Organic search (SEO) consistently delivers the lowest CAC at an average of $87 per customer, followed by email marketing at $102. Paid social averages $186 and paid search averages $162.' },
  { question: 'How has CAC changed in 2026 compared to previous years?', answer: 'Average CAC has increased 14% year-over-year since 2024, driven by rising ad costs and privacy-related signal loss. Companies investing in first-party data and organic channels have seen smaller increases (6-8%).' },
];

export default function AverageCACByIndustryPage() {
  return (
    <>
      <ArticleSchema
        title="Average Customer Acquisition Cost by Industry"
        description="CAC benchmarks across 18 industries with breakdowns by company size, channel, and business model."
        datePublished="2026-01-20"
        dateModified="2026-03-15"
        url="https://digitalpointllc.com/research/average-cac-by-industry"
      />
      <FAQSchema faqs={faqs} />
      <AverageCACByIndustry faqs={faqs} />
    </>
  );
}

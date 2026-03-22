import type { Metadata } from 'next';
import { ArticleSchema, FAQSchema } from '@/components/seo/FAQSchema';
import { FacebookAdsBenchmarks } from './FacebookAdsBenchmarks';

export const metadata: Metadata = {
  title: 'Facebook Ads Benchmarks 2026 — CPC, CPM, CTR & ROAS by Industry',
  description: 'Updated Facebook Ads benchmarks for 2026: average CPC, CPM, CTR, and ROAS across 12 industries. Based on $48M+ in tracked Meta ad spend.',
  keywords: ['facebook ads benchmarks 2026', 'meta ads benchmarks', 'facebook cpc by industry', 'facebook ads ctr', 'facebook ads cpm', 'facebook roas benchmarks'],
  alternates: { canonical: 'https://digitalpointllc.com/research/facebook-ads-benchmarks-2026' },
  openGraph: {
    title: 'Facebook Ads Benchmarks 2026 — CPC, CPM, CTR & ROAS by Industry',
    description: 'Updated Facebook Ads benchmarks for 2026 across 12 industries. Based on $48M+ in tracked Meta ad spend.',
  },
};

const faqs = [
  { question: 'What is the average CPC for Facebook Ads in 2026?', answer: 'The average CPC across all industries on Facebook in 2026 is $1.72. However, this varies significantly by industry — finance and insurance averages $3.89 while apparel averages $0.63.' },
  { question: 'What is a good CTR for Facebook Ads?', answer: 'The average Facebook Ads CTR in 2026 is 1.49%. A good CTR is above your industry average. E-commerce typically sees 1.2-1.8%, while B2B services average 0.78-1.1%.' },
  { question: 'How much does Facebook advertising cost per 1000 impressions?', answer: 'The average Facebook CPM in 2026 is $12.47. CPMs range from $6.80 in education to $28.40 in finance. CPMs tend to spike during Q4 due to holiday advertising competition.' },
  { question: 'What is a good ROAS for Facebook Ads?', answer: 'A healthy ROAS for Facebook Ads varies by industry. E-commerce brands typically target 3-5x ROAS, while B2B companies with higher LTV may be profitable at 2-3x. The cross-industry average is 2.87x.' },
  { question: 'Are Facebook Ads still worth it in 2026?', answer: 'Yes. Despite rising CPMs, Facebook (Meta) Ads remain one of the highest-ROI paid channels. Advantage+ campaigns and AI-driven creative optimization have improved performance for most advertisers in 2026.' },
];

export default function FacebookAdsBenchmarksPage() {
  return (
    <>
      <ArticleSchema
        title="Facebook Ads Benchmarks 2026"
        description="Updated Facebook Ads benchmarks for 2026: average CPC, CPM, CTR, and ROAS across 12 industries."
        datePublished="2026-03-01"
        dateModified="2026-03-20"
        url="https://digitalpointllc.com/research/facebook-ads-benchmarks-2026"
      />
      <FAQSchema faqs={faqs} />
      <FacebookAdsBenchmarks faqs={faqs} />
    </>
  );
}

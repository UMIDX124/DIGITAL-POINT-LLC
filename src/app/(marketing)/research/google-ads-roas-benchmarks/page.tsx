import type { Metadata } from 'next';
import { ArticleSchema, FAQSchema } from '@/components/seo/FAQSchema';
import { GoogleAdsROASBenchmarks } from './GoogleAdsROASBenchmarks';

export const metadata: Metadata = {
  title: 'Google Ads ROAS Benchmarks by Industry — Search, Display, YouTube & PMax',
  description: 'Google Ads ROAS benchmarks across Search, Display, YouTube, and Performance Max campaigns. Industry data from $62M in analyzed Google Ads spend.',
  keywords: ['google ads roas benchmarks', 'google ads roas by industry', 'search ads roas', 'performance max roas', 'youtube ads roas', 'google display ads roas'],
  alternates: { canonical: 'https://digitalpointllc.com/research/google-ads-roas-benchmarks' },
  openGraph: {
    title: 'Google Ads ROAS Benchmarks by Industry — Digital Point LLC',
    description: 'ROAS benchmarks for Search, Display, YouTube, and PMax campaigns across 12 industries.',
  },
};

const faqs = [
  { question: 'What is a good ROAS for Google Search Ads?', answer: 'The average ROAS for Google Search Ads across all industries is 4.2x. E-commerce averages 4.8x, while B2B services average 3.6x. A good ROAS for Search is typically above 3x for most businesses.' },
  { question: 'How does Performance Max ROAS compare to Search?', answer: 'Performance Max campaigns average 3.1x ROAS across industries, compared to 4.2x for Search. However, PMax reaches incremental audiences and often drives higher total revenue volume at a slightly lower efficiency.' },
  { question: 'What is the average ROAS for YouTube Ads?', answer: 'YouTube Ads average 1.9x ROAS when measured on direct conversions. However, view-through attribution can increase this to 2.8x. YouTube performs best as a mid-funnel awareness driver for brands with strong search presence.' },
  { question: 'Which industry has the highest Google Ads ROAS?', answer: 'Legal services consistently report the highest Google Search ROAS at 7.1x, driven by extremely high customer values (average case values of $5,000-$50,000+). Home services and automotive also perform well at 5.8x and 5.2x respectively.' },
];

export default function GoogleAdsROASBenchmarksPage() {
  return (
    <>
      <ArticleSchema
        title="Google Ads ROAS Benchmarks by Industry"
        description="Google Ads ROAS benchmarks across Search, Display, YouTube, and Performance Max campaigns."
        datePublished="2026-02-10"
        dateModified="2026-03-18"
        url="https://digitalpointllc.com/research/google-ads-roas-benchmarks"
      />
      <FAQSchema faqs={faqs} />
      <GoogleAdsROASBenchmarks faqs={faqs} />
    </>
  );
}

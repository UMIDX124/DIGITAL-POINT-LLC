import type { Metadata } from 'next';
import { ArticleSchema } from '@/components/seo/FAQSchema';
import { ResearchHub } from './ResearchHub';

export const metadata: Metadata = {
  title: 'Marketing Research & Industry Benchmarks — Digital Point LLC',
  description: 'Original research reports on advertising benchmarks, customer acquisition costs, marketing attribution, and remote workforce economics. Data-driven insights for growth teams.',
  keywords: ['marketing benchmarks', 'advertising research', 'industry benchmarks 2026', 'cac benchmarks', 'roas benchmarks', 'marketing attribution statistics'],
  alternates: { canonical: 'https://digitalpointllc.com/research' },
  openGraph: {
    title: 'Marketing Research & Industry Benchmarks — Digital Point LLC',
    description: 'Data-driven research reports on ad benchmarks, CAC, attribution, and remote workforce costs.',
  },
};

export default function ResearchPage() {
  return (
    <>
      <ArticleSchema
        title="Marketing Research & Industry Benchmarks"
        description="Original research reports on advertising benchmarks, customer acquisition costs, marketing attribution, and remote workforce economics."
        datePublished="2026-01-15"
        dateModified="2026-03-20"
        url="https://digitalpointllc.com/research"
      />
      <ResearchHub />
    </>
  );
}

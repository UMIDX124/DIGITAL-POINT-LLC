import type { Metadata } from 'next';
import { ToolSchema } from '@/components/seo/FAQSchema';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { DashboardCostCalculator } from './DashboardCostCalculator';

export const metadata: Metadata = {
  title: 'Marketing Dashboard Cost Calculator — Estimate Build vs Buy Costs',
  description: 'Calculate the true cost of building a custom marketing dashboard vs buying off-the-shelf. Compare tools like Looker, Tableau, Power BI, and custom solutions.',
  keywords: ['marketing dashboard cost', 'dashboard calculator', 'looker cost', 'tableau pricing', 'custom dashboard cost', 'marketing reporting cost'],
  alternates: { canonical: 'https://digitalpointllc.com/tools/dashboard-cost-calculator' },
  openGraph: {
    title: 'Marketing Dashboard Cost Calculator — Digital Point LLC',
    description: 'Estimate the true cost of your marketing dashboard: build vs buy, team costs, and tool licensing.',
  },
};

const faqs = [
  { question: 'How much does a custom marketing dashboard cost?', answer: 'A custom marketing dashboard typically costs $15,000-$80,000 to build, plus $2,000-$8,000/month in maintenance. Costs depend on data sources, complexity, and whether you use in-house or agency talent.' },
  { question: 'What is the cheapest marketing dashboard solution?', answer: 'Google Looker Studio (formerly Data Studio) is free for basic dashboards. However, costs increase when you need data warehousing ($300-$2,000/month), ETL tools ($200-$1,000/month), and analyst time to maintain them.' },
  { question: 'Should I build or buy a marketing dashboard?', answer: 'Buy if you need standard metrics and have under 5 data sources. Build custom if you need attribution modeling, custom KPIs, cross-platform blending, or automated alerting. Most companies spending $50k+/month on ads benefit from custom builds.' },
  { question: 'What tools do marketing dashboards use?', answer: 'Common tools include visualization (Looker, Tableau, Power BI, Metabase), data warehousing (BigQuery, Snowflake, Redshift), ETL (Fivetran, Airbyte, Stitch), and transformation (dbt). The total stack cost ranges from $500-$10,000/month.' },
];

export default function DashboardCostCalculatorPage() {
  return (
    <>
      <ToolSchema
        name="Marketing Dashboard Cost Calculator"
        description="Free calculator to estimate the cost of building or buying a marketing dashboard solution."
        url="https://digitalpointllc.com/tools/dashboard-cost-calculator"
      />
      <FAQSchema faqs={faqs} />
      <DashboardCostCalculator faqs={faqs} />
    </>
  );
}

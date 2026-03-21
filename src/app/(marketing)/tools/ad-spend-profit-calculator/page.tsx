import type { Metadata } from 'next';
import { ToolSchema, FAQSchema } from '@/components/seo/FAQSchema';
import { AdSpendCalculator } from './AdSpendCalculator';

export const metadata: Metadata = {
  title: 'Ad Spend Profit Calculator — Model Your Advertising ROI',
  description: 'Model profitability at different ad spend levels. Find your optimal budget and maximize advertising profit.',
  keywords: ['ad spend calculator', 'advertising profit', 'ad budget calculator', 'marketing roi', 'ad spend optimization'],
  alternates: { canonical: 'https://digitalpointllc.com/tools/ad-spend-profit-calculator' },
};

const faqs = [
  { question: 'How much should I spend on ads?', answer: 'Most growing businesses allocate 5-15% of revenue to advertising. The optimal amount depends on your industry, margins, and growth stage.' },
  { question: 'What is a good profit margin on ad spend?', answer: 'After accounting for COGS and ad spend, a healthy profit margin is 20-40%. If your margin is below 10%, your ads may not be sustainable at current efficiency.' },
  { question: 'When should I increase ad spend?', answer: 'Increase ad spend when your ROAS is stable above 3x, your fulfillment can handle growth, and incrementality tests show ads are driving new revenue.' },
];

export default function Page() {
  return (
    <>
      <ToolSchema name="Ad Spend Profit Calculator" description="Model advertising profitability at different spend levels." url="https://digitalpointllc.com/tools/ad-spend-profit-calculator" />
      <FAQSchema faqs={faqs} />
      <AdSpendCalculator faqs={faqs} />
    </>
  );
}

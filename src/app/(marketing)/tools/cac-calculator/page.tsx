import type { Metadata } from 'next';
import { ToolSchema, FAQSchema } from '@/components/seo/FAQSchema';
import { CACCalculator } from './CACCalculator';

export const metadata: Metadata = {
  title: 'Free CAC Calculator — Customer Acquisition Cost',
  description: 'Calculate your Customer Acquisition Cost (CAC) by channel. Compare CAC to LTV and find your most efficient acquisition sources.',
  keywords: ['cac calculator', 'customer acquisition cost', 'cac formula', 'ltv to cac ratio', 'marketing efficiency'],
  alternates: { canonical: 'https://digitalpointllc.com/tools/cac-calculator' },
};

const faqs = [
  { question: 'What is CAC?', answer: 'CAC (Customer Acquisition Cost) is the total cost of acquiring a new customer, including all marketing and sales expenses divided by the number of new customers acquired.' },
  { question: 'What is a good CAC to LTV ratio?', answer: 'A healthy LTV:CAC ratio is 3:1 or higher. This means each customer generates at least 3x what it costs to acquire them. Ratios below 1:1 mean you are losing money on acquisition.' },
  { question: 'How do you reduce CAC?', answer: 'Reduce CAC by improving conversion rates, optimizing ad targeting, building organic channels, increasing referrals, and improving sales process efficiency.' },
];

export default function CACCalculatorPage() {
  return (
    <>
      <ToolSchema name="CAC Calculator" description="Calculate Customer Acquisition Cost across channels." url="https://digitalpointllc.com/tools/cac-calculator" />
      <FAQSchema faqs={faqs} />
      <CACCalculator faqs={faqs} />
    </>
  );
}

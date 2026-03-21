import type { Metadata } from 'next';
import { ToolSchema } from '@/components/seo/FAQSchema';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { ROASCalculator } from './ROASCalculator';

export const metadata: Metadata = {
  title: 'Free ROAS Calculator — Calculate Return on Ad Spend',
  description: 'Calculate your ROAS (Return on Ad Spend) instantly. Compare platform-reported vs. blended ROAS and find your true advertising ROI.',
  keywords: ['roas calculator', 'return on ad spend', 'advertising roi', 'roas formula', 'ad spend calculator'],
  alternates: { canonical: 'https://digitalpointllc.com/tools/roas-calculator' },
  openGraph: {
    title: 'Free ROAS Calculator — Digital Point LLC',
    description: 'Calculate your true Return on Ad Spend. Compare platform-reported vs. blended ROAS.',
  },
};

const faqs = [
  { question: 'What is ROAS?', answer: 'ROAS (Return on Ad Spend) is a marketing metric that measures revenue generated for every dollar spent on advertising. A 4x ROAS means you earn $4 for every $1 spent on ads.' },
  { question: 'What is a good ROAS?', answer: 'A good ROAS varies by industry, but generally 3x-5x is considered healthy for e-commerce, while B2B companies often target 5x-10x due to higher customer lifetime values.' },
  { question: 'How is ROAS calculated?', answer: 'ROAS = Revenue from Ads / Cost of Ads. For example, if you spend $10,000 on ads and generate $40,000 in revenue, your ROAS is 4.0x.' },
  { question: 'What is the difference between ROAS and ROI?', answer: 'ROAS only measures ad spend vs. ad revenue. ROI (Return on Investment) factors in all costs including COGS, team salaries, and overhead. ROAS can be positive while overall ROI is negative.' },
];

export default function ROASCalculatorPage() {
  return (
    <>
      <ToolSchema
        name="ROAS Calculator"
        description="Free calculator to determine your Return on Ad Spend (ROAS) across advertising channels."
        url="https://digitalpointllc.com/tools/roas-calculator"
      />
      <FAQSchema faqs={faqs} />
      <ROASCalculator faqs={faqs} />
    </>
  );
}

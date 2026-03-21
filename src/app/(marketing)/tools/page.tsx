import type { Metadata } from 'next';
import { ToolsHub } from './ToolsHub';

export const metadata: Metadata = {
  title: 'Free Marketing Tools & Calculators',
  description: 'Free ROAS calculator, CAC calculator, ad spend profit calculator, and more. Instantly analyze your marketing performance.',
  alternates: { canonical: 'https://digitalpointllc.com/tools' },
  openGraph: {
    title: 'Free Marketing Tools & Calculators — Digital Point LLC',
    description: 'Interactive marketing calculators for ROAS, CAC, ad spend profitability, and attribution modeling.',
  },
};

export default function ToolsPage() {
  return <ToolsHub />;
}

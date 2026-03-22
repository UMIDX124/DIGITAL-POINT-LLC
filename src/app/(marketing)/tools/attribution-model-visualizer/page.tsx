import type { Metadata } from 'next';
import { ToolSchema } from '@/components/seo/FAQSchema';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { AttributionVisualizer } from './AttributionVisualizer';

export const metadata: Metadata = {
  title: 'Marketing Attribution Model Visualizer — Compare Models Side by Side',
  description: 'Visualize how different attribution models (first-click, last-click, linear, time-decay, position-based) distribute credit across your marketing touchpoints.',
  keywords: ['attribution model visualizer', 'marketing attribution', 'multi-touch attribution', 'first click attribution', 'last click attribution', 'linear attribution'],
  alternates: { canonical: 'https://digitalpointllc.com/tools/attribution-model-visualizer' },
  openGraph: {
    title: 'Marketing Attribution Model Visualizer — Digital Point LLC',
    description: 'Compare how first-click, last-click, linear, time-decay, and position-based models distribute conversion credit.',
  },
};

const faqs = [
  { question: 'What is an attribution model?', answer: 'An attribution model is a set of rules that determines how credit for conversions is assigned to different marketing touchpoints in a customer journey. Common models include first-click, last-click, linear, time-decay, and position-based.' },
  { question: 'Which attribution model is best?', answer: 'There is no single best model. First-click favors awareness channels, last-click favors conversion channels. Multi-touch models (linear, time-decay, position-based) give a more balanced view. Most companies benefit from comparing multiple models.' },
  { question: 'What is multi-touch attribution?', answer: 'Multi-touch attribution distributes conversion credit across all touchpoints in the customer journey, rather than giving 100% credit to a single touchpoint. This provides a more accurate picture of marketing effectiveness.' },
  { question: 'How does time-decay attribution work?', answer: 'Time-decay attribution gives more credit to touchpoints closer to the conversion. The last touchpoint before conversion gets the most credit, with each earlier touchpoint receiving progressively less.' },
];

export default function AttributionVisualizerPage() {
  return (
    <>
      <ToolSchema
        name="Marketing Attribution Model Visualizer"
        description="Free tool to visualize and compare how different attribution models distribute conversion credit across marketing touchpoints."
        url="https://digitalpointllc.com/tools/attribution-model-visualizer"
      />
      <FAQSchema faqs={faqs} />
      <AttributionVisualizer faqs={faqs} />
    </>
  );
}

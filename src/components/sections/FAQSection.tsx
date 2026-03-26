'use client';

import { useState, useCallback, memo } from 'react';
import { ChevronDown } from 'lucide-react';
import { Section, Container, SectionHeader, FadeUp, GlassCard } from '@/components/ui-dp/AnimatedElements';
import { FAQSchema } from '@/components/seo/FAQSchema';

const faqs = [
  {
    question: 'What size companies do you work with?',
    answer: 'Typically $1M–$20M annual revenue, or well-funded startups with clear product-market fit. We\'re not the right fit for pre-revenue or enterprise-scale businesses.',
  },
  {
    question: 'How is this different from an agency?',
    answer: 'Agencies execute tasks. We build systems, manage execution, and integrate with your team. You get outcomes, not just deliverables. Plus, our remote workforce model gives you capacity without the hiring overhead.',
  },
  {
    question: 'What does the remote workforce model include?',
    answer: 'Role-specific specialists (media buyers, creatives, analysts), pod structure with clear ownership, QA processes, and direct reporting to you. They work as an extension of your team.',
  },
  {
    question: 'How quickly can we start?',
    answer: 'Discovery call within 48 hours. Audit delivered in week one. Execution begins within 2–3 weeks of agreement. No 90-day onboarding marathons.',
  },
  {
    question: 'What platforms do you work with?',
    answer: 'Meta (Facebook/Instagram), Google (Search, YouTube, Display), TikTok, LinkedIn, and programmatic. We also build in HubSpot, Salesforce, Klaviyo, and custom dashboards.',
  },
  {
    question: 'What\'s the investment?',
    answer: 'Engagements start at $5K/month depending on scope. We structure around outcomes, not hours. Clear scope, clear deliverables, no surprises.',
  },
];

/** Memoized FAQ item — CSS grid transition instead of framer-motion AnimatePresence */
const FAQItem = memo(function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="border-b"
      style={{ borderColor: 'rgba(157, 78, 221, 0.15)' }}
    >
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className="font-display font-medium text-white pr-4">{question}</span>
        <span
          className="flex-shrink-0 transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <ChevronDown className="w-5 h-5 text-[#c77dff]" />
        </span>
      </button>

      {/* CSS grid transition for expand/collapse — no framer-motion needed */}
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-[#b794c7] text-sm leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
});

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  }, []);

  return (
    <Section className="relative overflow-hidden">
      <FAQSchema faqs={faqs} />
      {/* Cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#13091e] via-[#0d0815] to-[#0a0510]" />

      <Container className="relative z-10">
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions."
          description="Quick answers to help you decide if we're the right fit."
          align="center"
        />

        <FadeUp className="max-w-3xl mx-auto">
          <GlassCard className="p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </GlassCard>
        </FadeUp>
      </Container>
    </Section>
  );
}

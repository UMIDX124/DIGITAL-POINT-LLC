'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Section, Container, SectionHeader, FadeUp, GlassCard } from '@/components/ui-dp/AnimatedElements';

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

function FAQItem({ question, answer, isOpen, onToggle }: { 
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
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[#c77dff]" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[#b794c7] text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="relative overflow-hidden">
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
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </GlassCard>
        </FadeUp>
      </Container>
    </Section>
  );
}

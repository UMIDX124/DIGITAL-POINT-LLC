import { Search, Eye, Rocket } from 'lucide-react';
import { Section, Container, SectionHeader, FadeUp, GlassCard } from '@/components/ui-dp/AnimatedElements';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnose',
    description: 'We review your ad accounts, tracking setup, and reporting. Tell you exactly what\'s missing and what it\'s costing you.',
    detail: '1-hour call. Clear written summary. No fluff.',
  },
  {
    number: '02',
    icon: Eye,
    title: 'Fix Visibility',
    description: 'We build or repair your attribution, dashboards, and CRM structure. You finally see what\'s actually driving revenue.',
    detail: 'Most systems are live within 2 weeks.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Scale',
    description: 'With clear numbers, we execute. Media buying, creative testing, and remote team pods—all with proper tracking in place.',
    detail: 'You know what works. We scale that.',
  },
];

export function ProcessSection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Cosmic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#13091e] to-[#0d0815]" />
      
      {/* Animated glow — CSS animation instead of framer-motion infinite */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl animate-glow-pulse"
        style={{
          background: 'radial-gradient(ellipse, rgba(157, 78, 221, 0.3) 0%, transparent 70%)',
        }}
      />
      
      <Container className="relative z-10">
        <SectionHeader
          eyebrow="How We Start"
          title="Three steps. No guesswork."
          description="Most teams don't need more ads. They need to know which ads actually work."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <FadeUp key={step.number} delay={index * 0.15}>
              <div className="relative h-full">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div 
                    className="hidden md:block absolute top-16 left-full w-full h-px z-0"
                    style={{
                      background: 'linear-gradient(90deg, rgba(199, 125, 255, 0.4), transparent)',
                      width: 'calc(100% - 2rem)',
                      transform: 'translateX(-1rem)',
                    }}
                  />
                )}
                
                <GlassCard className="p-6 lg:p-8 h-full relative z-10">
                  {/* Step number */}
                  <div 
                    className="text-5xl font-display font-bold mb-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(199, 125, 255, 0.4) 0%, rgba(157, 78, 221, 0.1) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: 'rgba(157, 78, 221, 0.15)',
                      border: '1px solid rgba(199, 125, 255, 0.2)',
                    }}
                  >
                    <step.icon className="w-6 h-6 text-[#c77dff]" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[#b794c7] text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>
                  
                  {/* Detail */}
                  <div 
                    className="text-xs font-medium px-3 py-1.5 rounded-full inline-block"
                    style={{
                      background: 'rgba(157, 78, 221, 0.1)',
                      color: '#e0aaff',
                      border: '1px solid rgba(199, 125, 255, 0.2)',
                    }}
                  >
                    {step.detail}
                  </div>
                </GlassCard>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}

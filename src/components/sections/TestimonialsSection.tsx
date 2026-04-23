import { Quote } from 'lucide-react';
import { Section, Container, SectionHeader, FadeUp, GlassCard } from '@/components/ui-dp/AnimatedElements';

const testimonials = [
  {
    quote: "They built the tracking we'd been avoiding for two years. Now I actually know where to spend.",
    author: 'Sarah Chen',
    title: 'CEO, B2B SaaS',
    metric: '+127% MRR',
    metricLabel: 'Revenue growth in 6 months',
    initials: 'SC',
    color: '#F59E0B',
  },
  {
    quote: "Got execution capacity without the hiring headaches. They own outcomes, not just tasks.",
    author: 'Marcus Thompson',
    title: 'Founder, E-commerce',
    metric: '3.1x ROAS',
    metricLabel: 'Return on ad spend',
    initials: 'MT',
    color: '#F59E0B',
  },
  {
    quote: "We went from 'no idea where leads come from' to full attribution in 3 weeks.",
    author: 'Jennifer Walsh',
    title: 'CMO, Agency',
    metric: '-41% CAC',
    metricLabel: 'Customer acquisition cost reduction',
    initials: 'JW',
    color: '#FBBF24',
  },
];

export function TestimonialsSection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0510] via-[#141416] to-[#141416]" />

      <Container className="relative z-10">
        <SectionHeader
          eyebrow="Client Results"
          title="What clarity looks like."
          description="Founders who stopped guessing and started knowing."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeUp key={testimonial.author} delay={index * 0.1}>
              <GlassCard className="p-6 h-full flex flex-col">
                {/* Result badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full self-start mb-5"
                  style={{
                    background: 'rgba(217,119,6, 0.1)',
                    border: '1px solid rgba(245,158,11, 0.15)',
                  }}
                >
                  <span
                    className="text-sm font-bold"
                    style={{
                      background: 'linear-gradient(90deg, #F59E0B, #F59E0B)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {testimonial.metric}
                  </span>
                  <span className="text-[#71717A] text-xs">{testimonial.metricLabel}</span>
                </div>

                <Quote className="w-8 h-8 text-[#F59E0B] opacity-50 mb-4" />

                <p className="text-white/90 text-sm leading-relaxed mb-6 flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div
                  className="pt-4 border-t flex items-center gap-3"
                  style={{ borderColor: 'rgba(217,119,6, 0.2)' }}
                >
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${testimonial.color}40, ${testimonial.color}20)`,
                      border: `1px solid ${testimonial.color}40`,
                    }}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">{testimonial.author}</div>
                    <div className="text-[#71717A] text-xs">{testimonial.title}</div>
                  </div>
                </div>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}

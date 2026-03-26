import { AlertTriangle, BarChart3, Users, Clock, Zap, Target } from 'lucide-react';
import { Section, Container, GlassCard, StaggerContainer, StaggerItem, FadeUp } from '@/components/ui-dp/AnimatedElements';

const problems = [
  {
    icon: BarChart3,
    title: 'You can\'t prove what works',
    description: 'Money goes out. Revenue comes in. But you can\'t draw a straight line between them.',
  },
  {
    icon: AlertTriangle,
    title: 'Leads are unpredictable',
    description: 'One month you\'re scaling. The next month you\'re scrambling. No clear cause.',
  },
  {
    icon: Target,
    title: 'Your numbers don\'t match',
    description: 'Google says one thing. Meta says another. Your CRM shows something else entirely.',
  },
  {
    icon: Users,
    title: 'Vendors don\'t talk to each other',
    description: 'Agencies, freelancers, tools—each in their own silo. No one owns the whole picture.',
  },
  {
    icon: Clock,
    title: 'Nothing moves without you',
    description: 'Every decision loops back to the founder. You\'re the bottleneck by default.',
  },
  {
    icon: Zap,
    title: 'You know something is off',
    description: 'You can feel it. But you don\'t have the data to prove it—or the time to fix it.',
  },
];

// Pre-computed star positions to avoid hydration mismatch
const problemStars = Array.from({ length: 30 }, (_, i) => ({
  top: ((i * 17 + 7) % 100),
  left: ((i * 23 + 13) % 100),
  delay: (i % 5) * 0.6,
}));

export function ProblemSection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0815] via-[#13091e] to-[#1a0a2e]" />

      {/* Stars */}
      <div className="absolute inset-0 opacity-30">
        {problemStars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        {/* Header — replaced motion.span/h2/p whileInView with single FadeUp */}
        <FadeUp>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            {/* Eyebrow */}
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-medium uppercase tracking-wider"
              style={{
                background: 'rgba(255, 107, 107, 0.1)',
                border: '1px solid rgba(255, 107, 107, 0.2)',
                color: '#ff6b6b',
              }}
            >
              <AlertTriangle className="w-4 h-4" />
              The Reality
            </span>

            {/* Main Title */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight mb-6">
              <span className="block">You&apos;re not guessing.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e0aaff] via-[#c77dff] to-[#ff6b9d]">
                You just don&apos;t have the data.
              </span>
            </h2>

            {/* Description */}
            <p className="text-[#b794c7] text-lg md:text-xl leading-relaxed">
              Most founders are running on instinct because their systems don&apos;t tell them the truth.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <StaggerItem key={problem.title}>
              <GlassCard className="p-6 h-full">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(157, 78, 221, 0.15)',
                      border: '1px solid rgba(199, 125, 255, 0.2)',
                    }}
                  >
                    <problem.icon className="w-6 h-6 text-[#c77dff]" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-[#b794c7] text-sm leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}

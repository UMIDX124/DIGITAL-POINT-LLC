import { Reveal } from "@/components/motion/reveal";
import { CardGrid } from "@/components/ui/card-grid";
import { FeatureCard } from "@/components/ui/feature-card";
import { Section } from "@/components/ui/section";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeader } from "@/components/ui/section-header";
import { services } from "@/lib/content";

export function Services() {
  return (
    <Section id="services" labelledBy="services-heading" className="bg-white/[0.16]">
      <SectionContainer>
        <SectionHeader
          id="services-heading"
          eyebrow="Capabilities"
          title="Everything needed to build a cleaner, faster, more scalable growth operation."
          description="Each capability is designed to strengthen execution, increase visibility, and create leverage for leadership teams that need more than isolated tactics."
          align="center"
          className="mb-16"
        />

        <CardGrid columns="three">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.06}>
              <FeatureCard
                eyebrow={`Capability 0${index + 1}`}
                title={service.title}
                description={service.description}
                className="relative overflow-hidden transition duration-300 hover:-translate-y-2 hover:border-brand-primary/18 hover:shadow-[0_28px_72px_rgba(62,30,104,0.14)]"
              >
                <div className="mb-6 h-px w-full bg-[linear-gradient(90deg,rgba(62,30,104,0.18),rgba(228,90,146,0.18),transparent)]" />
                <ul className="space-y-4">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3.5 text-[15px] leading-[1.8] text-ink/78">
                      <span className="mt-[11px] h-1.5 w-1.5 rounded-full bg-[linear-gradient(135deg,#3E1E68_0%,#E45A92_100%)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </FeatureCard>
            </Reveal>
          ))}
        </CardGrid>
      </SectionContainer>
    </Section>
  );
}

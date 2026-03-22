import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section, Container } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';
import {
  services,
  industries,
  getServiceIndustryContent,
} from '@/lib/programmatic-seo';

interface PageProps {
  params: Promise<{ service: string; industry: string }>;
}

export async function generateStaticParams() {
  const params: { service: string; industry: string }[] = [];
  for (const service of services) {
    for (const industry of industries) {
      params.push({ service: service.slug, industry: industry.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service, industry } = await params;
  const content = getServiceIndustryContent(service, industry);
  if (!content) return {};

  const title = `${content.service.name} for ${content.industry.name} | Digital Point LLC`;
  const description = `Expert ${content.service.name.toLowerCase()} tailored for ${content.industry.name.toLowerCase()} companies. We help ${content.industry.name.toLowerCase()} businesses lower CAC, improve ROAS, and scale profitably.`;
  const url = `https://digitalpointllc.com/services/${service}/${industry}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ServiceIndustryPage({ params }: PageProps) {
  const { service, industry } = await params;
  const content = getServiceIndustryContent(service, industry);
  if (!content) notFound();

  return (
    <>
      <Section className="pt-32 pb-16">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: content.service.name, href: `/services/${service}` },
              { label: content.industry.name, href: `/services/${service}/${industry}` },
            ]}
          />

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-8 leading-tight">
            {content.service.name} for {content.industry.name}
          </h1>

          <div className="space-y-6 text-[#b794c7] text-lg leading-relaxed">
            <p>{content.intro}</p>
            <p>{content.whyItMatters}</p>
            <p>{content.approach}</p>
            <p>{content.results}</p>
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container size="narrow">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8">
            Key Benefits
          </h2>
          <ul className="space-y-4">
            {content.benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-[#b794c7] text-base leading-relaxed"
              >
                <span
                  className="mt-2 w-2 h-2 rounded-full shrink-0"
                  style={{ background: '#c77dff' }}
                />
                {benefit}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="py-16">
        <Container size="narrow">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8">
            How We Help {content.industry.name} Companies
          </h2>
          <div className="space-y-6">
            {content.howWeHelp.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4"
              >
                <span
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #7b2cbf 0%, #9d4edd 100%)',
                  }}
                >
                  {index + 1}
                </span>
                <p className="text-[#b794c7] text-base leading-relaxed pt-1">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-16 pb-32">
        <Container size="narrow">
          <GrowthAuditCTA />
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section, Container } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';
import {
  services,
  cities,
  getServiceCityContent,
} from '@/lib/programmatic-seo';

interface PageProps {
  params: Promise<{ service: string; city: string }>;
}

export async function generateStaticParams() {
  const params: { service: string; city: string }[] = [];
  for (const service of services) {
    for (const city of cities) {
      params.push({ service: service.slug, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service, city } = await params;
  const content = getServiceCityContent(service, city);
  if (!content) return {};

  const title = `${content.service.name} in ${content.city.name} | Digital Point LLC`;
  const description = `Professional ${content.service.name.toLowerCase()} for businesses in ${content.city.name}, ${content.city.state}. We help ${content.city.name} companies improve ROAS, reduce CAC, and scale paid media profitably.`;
  const url = `https://digitalpointllc.com/services/${service}/near/${city}`;

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

export default async function ServiceCityPage({ params }: PageProps) {
  const { service, city } = await params;
  const content = getServiceCityContent(service, city);
  if (!content) notFound();

  return (
    <>
      <Section className="pt-32 pb-16">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: content.service.name, href: `/services/${service}` },
              { label: content.city.name, href: `/services/${service}/near/${city}` },
            ]}
          />

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-8 leading-tight">
            {content.service.name} in {content.city.name}
          </h1>

          <div className="space-y-6 text-[#b794c7] text-lg leading-relaxed">
            <p>{content.intro}</p>
            <p>{content.localContext}</p>
            <p>{content.approach}</p>
            <p>{content.results}</p>
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container size="narrow">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8">
            Why {content.city.name} Businesses Choose Digital Point
          </h2>
          <ul className="space-y-4">
            {content.service.benefits.map((benefit, index) => (
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
            Serving {content.city.name}, {content.city.state} and Beyond
          </h2>
          <div className="space-y-6 text-[#b794c7] text-base leading-relaxed">
            <p>
              As a remote-first performance marketing agency, we work with businesses in {content.city.name} and
              across the United States. Our team delivers the same level of strategic depth and hands-on
              execution as a local agency — without the geographic limitations that restrict your talent
              options.
            </p>
            <p>
              Whether you are a {content.city.name}-based startup scaling paid acquisition or an established
              enterprise looking to optimize existing campaigns, our {content.service.name.toLowerCase()} services
              are built to deliver measurable results in the metrics that matter: ROAS, CAC, and revenue
              growth.
            </p>
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

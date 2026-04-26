import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section, Container } from '@/components/ui-dp/AnimatedElements';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { GrowthAuditCTA } from '@/components/seo/GrowthAuditCTA';
import { comparisons, getComparisonBySlug } from '@/lib/comparisons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};

  const url = `https://digitalpointllc.com/compare/${slug}`;

  return {
    title: `${comparison.metaTitle} | Digital Point LLC`,
    description: comparison.description,
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.description,
      url,
      type: 'article',
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) notFound();

  return (
    <>
      <Section className="pt-32 pb-16">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { label: 'Compare', href: '/compare' },
              { label: comparison.title, href: `/compare/${slug}` },
            ]}
          />

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-8 leading-tight" style={{ maxWidth: 'var(--maxw-heading-display)' }}>
            {comparison.metaTitle}
          </h1>

          <p className="text-[#D6D0C2] text-lg leading-relaxed">
            {comparison.intro}
          </p>
        </Container>
      </Section>

      {/* Comparison Table */}
      <Section className="py-16">
        <Container size="narrow">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-8" style={{ maxWidth: 'var(--maxw-heading-section)' }}>
            Side-by-Side Comparison
          </h2>
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full border-collapse min-w-[500px]">
              <thead>
                <tr>
                  <th
                    className="text-left text-xs uppercase tracking-wider text-[#8E8E96] py-3 px-4 border-b"
                    style={{ borderColor: 'rgba(255, 136, 0, 0.2)' }}
                  >
                    Category
                  </th>
                  <th
                    className="text-left text-xs uppercase tracking-wider py-3 px-4 border-b"
                    style={{
                      borderColor: 'rgba(255, 136, 0, 0.2)',
                      color: '#FF8800',
                    }}
                  >
                    {comparison.optionA.name}
                  </th>
                  <th
                    className="text-left text-xs uppercase tracking-wider py-3 px-4 border-b"
                    style={{
                      borderColor: 'rgba(255, 136, 0, 0.2)',
                      color: '#FF8800',
                    }}
                  >
                    {comparison.optionB.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.comparisonRows.map((row, index) => (
                  <tr key={index}>
                    <td
                      className="text-sm font-medium text-white py-3 px-4 border-b"
                      style={{ borderColor: 'rgba(255, 136, 0, 0.1)' }}
                    >
                      {row.category}
                    </td>
                    <td
                      className="text-sm text-[#D6D0C2] py-3 px-4 border-b"
                      style={{ borderColor: 'rgba(255, 136, 0, 0.1)' }}
                    >
                      {row.optionA}
                    </td>
                    <td
                      className="text-sm text-[#D6D0C2] py-3 px-4 border-b"
                      style={{ borderColor: 'rgba(255, 136, 0, 0.1)' }}
                    >
                      {row.optionB}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Pros and Cons */}
      <Section className="py-16">
        <Container size="narrow">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Option A */}
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'rgba(20,20,22, 0.6)',
                border: '1px solid rgba(255, 136, 0, 0.2)',
              }}
            >
              <h3 className="font-display text-xl font-bold text-white mb-6">
                {comparison.optionA.name}
              </h3>
              <div className="mb-6">
                <h4
                  className="text-sm font-semibold uppercase tracking-wider mb-3"
                  style={{ color: '#FF8800' }}
                >
                  Pros
                </h4>
                <ul className="space-y-2">
                  {comparison.optionA.pros.map((pro, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-[#D6D0C2] leading-relaxed"
                    >
                      <span className="text-green-400 mt-0.5 shrink-0">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4
                  className="text-sm font-semibold uppercase tracking-wider mb-3"
                  style={{ color: '#FF8800' }}
                >
                  Cons
                </h4>
                <ul className="space-y-2">
                  {comparison.optionA.cons.map((con, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-[#D6D0C2] leading-relaxed"
                    >
                      <span className="text-red-400 mt-0.5 shrink-0">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Option B */}
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: 'rgba(20,20,22, 0.6)',
                border: '1px solid rgba(255, 136, 0, 0.2)',
              }}
            >
              <h3 className="font-display text-xl font-bold text-white mb-6">
                {comparison.optionB.name}
              </h3>
              <div className="mb-6">
                <h4
                  className="text-sm font-semibold uppercase tracking-wider mb-3"
                  style={{ color: '#FF8800' }}
                >
                  Pros
                </h4>
                <ul className="space-y-2">
                  {comparison.optionB.pros.map((pro, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-[#D6D0C2] leading-relaxed"
                    >
                      <span className="text-green-400 mt-0.5 shrink-0">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4
                  className="text-sm font-semibold uppercase tracking-wider mb-3"
                  style={{ color: '#FF8800' }}
                >
                  Cons
                </h4>
                <ul className="space-y-2">
                  {comparison.optionB.cons.map((con, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-[#D6D0C2] leading-relaxed"
                    >
                      <span className="text-red-400 mt-0.5 shrink-0">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Recommendation */}
      <Section className="py-16">
        <Container size="narrow">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6" style={{ maxWidth: 'var(--maxw-heading-section)' }}>
            Our Recommendation
          </h2>
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 136, 0, 0.12), rgba(255, 136, 0, 0.06))',
              border: '1px solid rgba(255, 168, 51, 0.2)',
            }}
          >
            <p className="text-[#D6D0C2] text-base leading-relaxed">
              {comparison.recommendation}
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

/**
 * ServiceSchema — Phase 20 audit H1a.
 *
 * Per-pillar Service JSON-LD. Root layout already ships a single
 * ProfessionalService schema covering the firm; per-page Service schemas
 * give each pillar its own surface for AI-search citation and rich-result
 * eligibility. Five DPL pillars each get one (locked order: AI Agents,
 * Workflow Automation, Remote Operators, Performance Marketing, Systems
 * & Reporting).
 *
 * Server component, JSON-LD only — zero JS bundle impact.
 */
type ServiceSchemaProps = {
  /** Service name (matches the locked pillar name) */
  name: string;
  /** Plain-language description, 1-3 sentences */
  description: string;
  /** Canonical service-page URL */
  url: string;
  /** Free-form service category list (e.g. ['Lead Capture', 'Document Parsing']) */
  serviceTypes?: string[];
  /** Area served — defaults to Worldwide */
  areaServed?: string;
};

export function ServiceSchema({
  name,
  description,
  url,
  serviceTypes,
  areaServed = 'Worldwide',
}: ServiceSchemaProps) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: 'Digital Point LLC',
      url: 'https://digitalpointllc.com',
      logo: 'https://digitalpointllc.com/Dp-logo1.png',
    },
    areaServed: { '@type': 'Place', name: areaServed },
    ...(serviceTypes && serviceTypes.length > 0
      ? { serviceType: serviceTypes }
      : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default ServiceSchema;

import { createHash } from 'node:crypto';

// Site-wide JSON-LD schemas. Pre-serialized at module load so we can
// compute stable SHA-256 hashes and allowlist them in CSP — no nonce
// needed, layout can stay static, edge cache works.

export const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Digital Point LLC',
  url: 'https://www.digitalpointllc.com',
  logo: 'https://www.digitalpointllc.com/dp-mark-light.png',
  description:
    'AI agents and trained operators run your ops and reporting work. Same output as a 4-person internal team, one retainer. Built for $1M-$50M companies.',
  sameAs: ['https://www.linkedin.com/company/digitalpointllc'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    description:
      'Reach us through Cosmo (on-site chat) or the free growth audit form. Direct operator routing, no shared inbox.',
    url: 'https://www.digitalpointllc.com/contact',
    areaServed: 'Worldwide',
    availableLanguage: ['en'],
  },
  address: { '@type': 'PostalAddress', addressCountry: 'US' },
  foundingDate: '2017',
  founder: [
    { '@type': 'Person', name: 'M. Faizan Rafiq', jobTitle: 'Co-Founder' },
    {
      '@type': 'Person',
      name: 'Anwaar Tayyab',
      jobTitle: 'Co-Founder',
      image: 'https://www.digitalpointllc.com/dp-founder-anwaar.jpg',
    },
    { '@type': 'Person', name: 'Umer Farooq', jobTitle: 'Operator' },
  ],
} as const;

export const PROFESSIONAL_SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Digital Point LLC',
  description:
    'AI agent and automation infrastructure that runs operational workflows (CRM, ops, reporting, growth) so you scale without scaling team.',
  url: 'https://www.digitalpointllc.com',
  serviceType: [
    'AI Agent Deployment',
    'Workflow Automation',
    'Remote Operators',
    'Performance Marketing',
    'Reporting and Analytics',
    'Lead Operations',
  ],
  areaServed: { '@type': 'Place', name: 'Worldwide' },
  priceRange: '$10000-$30000',
} as const;

export const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Digital Point LLC',
  url: 'https://www.digitalpointllc.com',
} as const;

export const ORG_JSONLD_STR = JSON.stringify(ORG_JSONLD);
export const PROFESSIONAL_SERVICE_JSONLD_STR = JSON.stringify(PROFESSIONAL_SERVICE_JSONLD);
export const WEBSITE_JSONLD_STR = JSON.stringify(WEBSITE_JSONLD);

function sha256(s: string): string {
  return `'sha256-${createHash('sha256').update(s).digest('base64')}'`;
}

export const JSONLD_HASHES = [
  sha256(ORG_JSONLD_STR),
  sha256(PROFESSIONAL_SERVICE_JSONLD_STR),
  sha256(WEBSITE_JSONLD_STR),
];

/**
 * PersonSchema — Phase 20 audit H1b.
 *
 * Schema.org Person JSON-LD for DPL founders. Pairs with the Organization
 * schema in root layout (which already lists founder Person entries with
 * minimal fields) to surface E-E-A-T signals on the /about page.
 *
 * Server component, JSON-LD only.
 */
type PersonSchemaProps = {
  name: string;
  jobTitle: string;
  /** Profile URL or page-anchor referencing this person */
  url?: string;
  /** 1-2 sentence professional bio */
  description?: string;
  /** Optional same-as URLs (LinkedIn, X, etc.) */
  sameAs?: string[];
  /** Worker for: defaults to Digital Point LLC */
  worksFor?: string;
  worksForUrl?: string;
};

export function PersonSchema({
  name,
  jobTitle,
  url,
  description,
  sameAs,
  worksFor = 'Digital Point LLC',
  worksForUrl = 'https://digitalpointllc.com',
}: PersonSchemaProps) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    ...(url ? { url } : {}),
    ...(description ? { description } : {}),
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
    worksFor: {
      '@type': 'Organization',
      name: worksFor,
      url: worksForUrl,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default PersonSchema;

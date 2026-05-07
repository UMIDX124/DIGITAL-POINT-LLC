/**
 * BreadcrumbSchema — Phase 20 audit M5.
 *
 * Per-route BreadcrumbList JSON-LD. The site-wide BreadcrumbList in root
 * layout.tsx is a global navigation map (always Home → 5 fixed items),
 * not a route-specific breadcrumb. Hub pages (/research, /tools, /blog,
 * /guides) emit their own BreadcrumbList via this component.
 *
 * Usage:
 *   <BreadcrumbSchema items={[
 *     { name: 'Home', item: 'https://www.digitalpointllc.com' },
 *     { name: 'Research', item: 'https://www.digitalpointllc.com/research' },
 *   ]} />
 */
type BreadcrumbItem = {
  name: string;
  item: string;
};

type BreadcrumbSchemaProps = {
  items: BreadcrumbItem[];
};

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default BreadcrumbSchema;

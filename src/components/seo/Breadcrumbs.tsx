'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbSchema } from './FAQSchema';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const baseUrl = 'https://digitalpointllc.com';
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  return (
    <>
      <BreadcrumbSchema
        items={allItems.map((item) => ({
          name: item.label,
          url: `${baseUrl}${item.href}`,
        }))}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8E8E96]">
        {allItems.map((item, index) => (
          <span key={item.href} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="w-3 h-3" />}
            {index === allItems.length - 1 ? (
              <span className="text-[#D6D0C2]">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#A78BFA] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}

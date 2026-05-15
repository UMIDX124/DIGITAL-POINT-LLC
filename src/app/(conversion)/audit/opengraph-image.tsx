import { renderOg, ogSize, ogContentType } from '@/lib/og/template';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Book a free audit — Digital Point LLC';

export default function Image() {
  return renderOg({
    eyebrow: 'Audit',
    title: 'Free audit. Co-founder reviews your stack.',
    footer: 'digitalpointllc.com/audit',
  });
}

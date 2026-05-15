import { renderOg, ogSize, ogContentType } from '@/lib/og/template';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Digital Point LLC pricing — audit free, pilot $2,500, retainer $2,500/mo';

export default function Image() {
  return renderOg({
    eyebrow: 'Pricing',
    title: 'Audit free. Pilot $2,500. Retainer $2,500 a month.',
    footer: 'digitalpointllc.com/pricing',
  });
}

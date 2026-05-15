import { renderOg, ogSize, ogContentType } from '@/lib/og/template';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Digital Point LLC recovery — broken-agent diagnostic plus fix';

export default function Image() {
  return renderOg({
    eyebrow: 'Recovery',
    title: 'Your AI agent is broken. We fix it.',
    footer: 'digitalpointllc.com/recovery',
  });
}

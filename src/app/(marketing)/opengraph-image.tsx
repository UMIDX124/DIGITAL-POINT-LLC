import { renderOg, ogSize, ogContentType } from '@/lib/og/template';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Digital Point LLC — AI agents that run your ops';

export default function Image() {
  return renderOg({
    eyebrow: 'Home',
    title: 'AI agents that run your ops. $30K a year, not $400K.',
    footer: 'digitalpointllc.com',
  });
}

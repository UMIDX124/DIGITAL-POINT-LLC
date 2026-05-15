import { renderOg, ogSize, ogContentType } from '@/lib/og/template';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Digital Point LLC stack — n8n, Groq, Postgres, TypeScript';

export default function Image() {
  return renderOg({
    eyebrow: 'Stack',
    title: 'n8n. Groq. Postgres. TypeScript.',
    footer: 'digitalpointllc.com/stack',
  });
}

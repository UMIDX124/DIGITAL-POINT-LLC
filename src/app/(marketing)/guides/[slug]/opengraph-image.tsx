import { ImageResponse } from 'next/og';
import { getGuideBySlug } from '@/lib/guides';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Digital Point LLC guide';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const title = guide?.title ?? 'Digital Point LLC';
  const readTime = guide?.readTime ?? '';
  const eyebrow = readTime ? `Guide · ${readTime}` : 'Guide';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#0a0a0a',
          color: '#F5F5F7',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, color: '#969aa3', letterSpacing: 1 }}>Digital Point LLC</div>
          <div style={{ fontSize: 20, color: '#FF8800', textTransform: 'uppercase', letterSpacing: 2 }}>
            {eyebrow}
          </div>
        </div>

        <div style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 600, maxWidth: 1040 }}>
          {title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 8, height: 48, background: '#FF8800' }} />
          <div style={{ fontSize: 24, color: '#969aa3' }}>digitalpointllc.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

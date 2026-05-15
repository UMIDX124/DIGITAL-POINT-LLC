/**
 * F·28. Shared template for per-route OG images. Imported by individual
 * route opengraph-image.tsx files. Visual reuses brand tokens (warm
 * off-white canvas, amber accent, large display type), staying within
 * Next.js ImageResponse's CSS subset.
 */
import { ImageResponse } from 'next/og';
import type { CSSProperties } from 'react';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

type Props = {
  eyebrow?: string;
  title: string;
  footer?: string;
};

export function renderOg({ eyebrow, title, footer }: Props) {
  const containerStyle: CSSProperties = {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 80,
    background: '#FAFAF7',
    color: '#0A0A0B',
    fontFamily: 'system-ui, sans-serif',
  };

  const headStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 20,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#6E6E76',
  };

  const eyebrowStyle: CSSProperties = {
    color: '#A85800',
    letterSpacing: 3,
  };

  const titleStyle: CSSProperties = {
    fontSize: 84,
    lineHeight: 0.98,
    fontWeight: 600,
    letterSpacing: -2,
    maxWidth: 1040,
    display: 'flex',
  };

  const footerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    fontSize: 22,
    color: '#52525B',
  };

  const accentBarStyle: CSSProperties = {
    width: 8,
    height: 56,
    background: '#FF8800',
  };

  return new ImageResponse(
    (
      <div style={containerStyle}>
        <div style={headStyle}>
          <span>Digital Point LLC</span>
          {eyebrow ? <span style={eyebrowStyle}>{eyebrow}</span> : null}
        </div>

        <div style={titleStyle}>{title}</div>

        <div style={footerStyle}>
          <div style={accentBarStyle} />
          <span>{footer ?? 'digitalpointllc.com'}</span>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}

// Generate favicon.ico, apple-touch-icon.png, and og-image.png from SVG
import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// SVG for the icon (purple rounded square with DP logo)
const iconSvg = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="#7b2cbf"/>
    <stop offset="100%" stop-color="#9d4edd"/>
  </linearGradient>
</defs>
<rect width="512" height="512" rx="96" fill="url(#bg)"/>
<g transform="translate(16,16) scale(16)">
  <path d="M15.47,7.1l-1.3,1.85c-0.2,0.29-0.54,0.47-0.9,0.47h-7.1V7.09C6.16,7.1,15.47,7.1,15.47,7.1z" fill="white"/>
  <polygon points="24.3,7.1 13.14,22.91 5.7,22.91 16.86,7.1" fill="white"/>
  <path d="M14.53,22.91l1.31-1.86c0.2-0.29,0.54-0.47,0.9-0.47h7.09v2.33H14.53z" fill="white"/>
</g>
</svg>`;

// OG Image SVG (1200x630)
const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stop-color="#0d0815"/>
    <stop offset="50%" stop-color="#1a0a2e"/>
    <stop offset="100%" stop-color="#0d0815"/>
  </linearGradient>
  <radialGradient id="glow" cx="50%" cy="40%" r="50%">
    <stop offset="0%" stop-color="rgba(157,78,221,0.3)"/>
    <stop offset="100%" stop-color="transparent"/>
  </radialGradient>
  <linearGradient id="iconBg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#7b2cbf"/>
    <stop offset="100%" stop-color="#9d4edd"/>
  </linearGradient>
</defs>
<rect width="1200" height="630" fill="url(#bgGrad)"/>
<rect width="1200" height="630" fill="url(#glow)"/>
<!-- Border -->
<rect x="20" y="20" width="1160" height="590" rx="24" fill="none" stroke="rgba(157,78,221,0.3)" stroke-width="1"/>
<!-- Logo icon -->
<g transform="translate(520,120)">
  <rect width="160" height="160" rx="32" fill="url(#iconBg)"/>
  <g transform="translate(5,5) scale(5)">
    <path d="M15.47,7.1l-1.3,1.85c-0.2,0.29-0.54,0.47-0.9,0.47h-7.1V7.09C6.16,7.1,15.47,7.1,15.47,7.1z" fill="white"/>
    <polygon points="24.3,7.1 13.14,22.91 5.7,22.91 16.86,7.1" fill="white"/>
    <path d="M14.53,22.91l1.31-1.86c0.2-0.29,0.54-0.47,0.9-0.47h7.09v2.33H14.53z" fill="white"/>
  </g>
</g>
<!-- Title -->
<text x="600" y="340" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="56" fill="white">Digital Point</text>
<text x="600" y="390" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="28" fill="#b794c7">LLC</text>
<!-- Tagline -->
<text x="600" y="450" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="24" fill="#c77dff">Performance Marketing &amp; Remote Workforce Solutions</text>
<!-- Badges -->
<rect x="380" y="490" width="180" height="36" rx="18" fill="rgba(157,78,221,0.15)" stroke="rgba(199,125,255,0.25)" stroke-width="1"/>
<text x="470" y="514" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#c77dff">8+ Years in Market</text>
<rect x="580" y="490" width="180" height="36" rx="18" fill="rgba(157,78,221,0.15)" stroke="rgba(199,125,255,0.25)" stroke-width="1"/>
<text x="670" y="514" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#c77dff">Global Delivery</text>
<!-- Signal dot -->
<circle cx="600" cy="570" r="4" fill="#ff6b9d"/>
</svg>`;

async function main() {
  // Generate favicon.ico (32x32 PNG, browsers accept PNG in .ico)
  const favicon = await sharp(Buffer.from(iconSvg))
    .resize(32, 32)
    .png()
    .toBuffer();
  writeFileSync(join(publicDir, 'favicon.ico'), favicon);
  console.log('✓ favicon.ico');

  // Generate apple-touch-icon.png (180x180)
  const appleTouchIcon = await sharp(Buffer.from(iconSvg))
    .resize(180, 180)
    .png()
    .toBuffer();
  writeFileSync(join(publicDir, 'apple-touch-icon.png'), appleTouchIcon);
  console.log('✓ apple-touch-icon.png');

  // Generate og-image.png (1200x630)
  const ogImage = await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png()
    .toBuffer();
  writeFileSync(join(publicDir, 'og-image.png'), ogImage);
  console.log('✓ og-image.png');

  console.log('\nAll assets generated in /public');
}

main().catch(console.error);

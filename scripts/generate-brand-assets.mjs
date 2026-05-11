import sharp from 'sharp';
import fs from 'node:fs';

const AMBER = '#FF8800';
const CANVAS = '#0A0A0A';

// 256x256 raster brand mark for the schema logo URL and OG fallback.
// Logical 28x16 wave inside 256x256 frame with safe padding.
function buildLogoSVG({
  width,
  height,
  bg = CANVAS,
  fg = AMBER,
  rounded = 0,
}) {
  const scale = Math.min(width / 28, height / 16) * 0.62;
  const drawW = 28 * scale;
  const drawH = 16 * scale;
  const offsetX = (width - drawW) / 2;
  const offsetY = (height - drawH) / 2;
  const bars = [
    [0, 6, 4],
    [4, 3, 10],
    [8, 1, 14],
    [12, 2, 12],
    [16, 1, 14],
    [20, 3, 10],
    [24, 6, 4],
  ];
  const rects = bars
    .map(
      ([x, y, h]) =>
        `<rect x="${offsetX + x * scale}" y="${offsetY + y * scale}" width="${2 * scale}" height="${h * scale}" fill="${fg}" rx="${0.5 * scale}"/>`
    )
    .join('');
  const bgRect = `<rect width="${width}" height="${height}" fill="${bg}" rx="${rounded}"/>`;
  return `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${bgRect}${rects}</svg>`;
}

async function writePng(svg, outPath, { compressionLevel = 9, palette = true } = {}) {
  const buf = await sharp(Buffer.from(svg))
    .png({ compressionLevel, palette })
    .toBuffer();
  fs.writeFileSync(outPath, buf);
  return buf.length;
}

const targets = [
  { path: 'public/Dp-logo1.png', size: 256, rounded: 32 },
  { path: 'public/icon-192.png', size: 192, rounded: 24 },
  { path: 'public/icon-512.png', size: 512, rounded: 64 },
  { path: 'public/apple-touch-icon.png', size: 180, rounded: 22 },
  { path: 'public/favicon-32.png', size: 32, rounded: 4 },
  { path: 'public/favicon-16.png', size: 16, rounded: 2 },
  { path: 'public/favicon.png', size: 48, rounded: 6 },
];

for (const t of targets) {
  const svg = buildLogoSVG({ width: t.size, height: t.size, rounded: t.rounded });
  const bytes = await writePng(svg, t.path);
  console.log(`${t.path}: ${bytes} bytes (${t.size}x${t.size})`);
}

// 1200x630 OG image — top-left small mark, headline + microcopy left-aligned
const ogBars = [
  [0, 6, 4],
  [4, 3, 10],
  [8, 1, 14],
  [12, 2, 12],
  [16, 1, 14],
  [20, 3, 10],
  [24, 6, 4],
];
const markScale = 2.4;
const markOffsetX = 80;
const markOffsetY = 70;
const markRects = ogBars
  .map(
    ([x, y, h]) =>
      `<rect x="${markOffsetX + x * markScale}" y="${markOffsetY + y * markScale}" width="${2 * markScale}" height="${h * markScale}" fill="${AMBER}" rx="${0.5 * markScale}"/>`
  )
  .join('');

const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${CANVAS}"/>
  ${markRects}
  <text x="170" y="115" font-family="Inter, -apple-system, sans-serif" font-size="20" font-weight="500" fill="#F5F5F7" letter-spacing="2">DIGITAL POINT</text>
  <text x="80" y="350" font-family="Inter, -apple-system, sans-serif" font-size="92" font-weight="700" fill="#F5F5F7" letter-spacing="-3">Hire the <tspan fill="${AMBER}">AI</tspan>.</text>
  <text x="80" y="460" font-family="Inter, -apple-system, sans-serif" font-size="92" font-weight="700" fill="#F5F5F7" letter-spacing="-3">Skip the headcount.</text>
  <text x="80" y="550" font-family="ui-monospace, monospace" font-size="22" fill="#A1A1AA" letter-spacing="3">PRODUCTION AI AGENT OPERATIONS</text>
</svg>`;
const ogBytes = await writePng(ogSvg, 'public/og-image.png', { palette: false });
console.log(`public/og-image.png: ${ogBytes} bytes (1200x630)`);

console.log('done');

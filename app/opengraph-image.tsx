import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { heroSectionContent } from '@/lib/hero/hero-section-content';

export const alt = 'Taulant Sela, Senior Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Social platforms don't render SVG previews, so the share card is rendered to PNG at build time.
export default async function OpengraphImage() {
  const [avatar, geistRegular, geistBold] = await Promise.all([
    readFile(join(process.cwd(), 'app/favicon.ico')),
    readFile(join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf')),
    readFile(join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf')),
  ]);
  const { headlineHighlight, headlineSecondary, description } = heroSectionContent;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '96px 120px',
          color: '#ffffff',
          fontFamily: 'Geist',
          backgroundImage: 'linear-gradient(135deg, #1D4ED8 0%, #9333EA 50%, #0D9488 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
          <img
            src={`data:image/png;base64,${avatar.toString('base64')}`}
            width={168}
            height={168}
            alt=""
            style={{ borderRadius: 84, background: 'rgba(255,255,255,0.14)' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              {headlineHighlight}
            </div>
            <div style={{ marginTop: 12, fontSize: 44, opacity: 0.92 }}>{headlineSecondary}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* No-break spaces: Satori kerns Geist's "s" against a regular space, leaving a visible gap. */}
          <div style={{ fontSize: 32, opacity: 0.9 }}>{description.replaceAll(' ', '\u00a0')}</div>
          <div style={{ fontSize: 28, opacity: 0.7 }}>taulantsela.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Geist', data: geistRegular, weight: 400, style: 'normal' },
        { name: 'Geist', data: geistBold, weight: 700, style: 'normal' },
      ],
    },
  );
}

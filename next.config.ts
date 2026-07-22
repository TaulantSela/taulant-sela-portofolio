import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hoyo.tech',
      },
      {
        protocol: 'https',
        hostname: 'ghchart.rshah.org',
      },
      {
        protocol: 'https',
        hostname: 'github-contributions.vercel.app',
      },
    ],
  },
};

// Wires the MDX loader into both Turbopack (`next dev --turbopack`) and the webpack build.
// Posts live in `content/blog/*.mdx` and are imported by `app/blog/[slug]`, not routed directly,
// so `pageExtensions` stays untouched.
const withMDX = createMDX({});

export default withMDX(nextConfig);

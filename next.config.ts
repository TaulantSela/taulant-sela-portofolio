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
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
};

export default nextConfig;

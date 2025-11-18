import { AuroraBackground } from '@/components/aurora-background';
import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const siteUrl = 'https://taulantsela.com';
const socialImage = `${siteUrl}/og-image.svg`;

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Taulant Sela',
    url: siteUrl,
    image: socialImage,
    jobTitle: 'Software Engineer',
    sameAs: ['https://www.linkedin.com/in/taulantsela', 'https://github.com/TaulantSela', 'https://x.com/TaulantSela'],
    knowsAbout: ['web development', 'frontend engineering', 'React', 'TypeScript', 'Next.js'],
    worksFor: {
      '@type': 'Organization',
      name: 'Taulant Sela',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Taulant Sela - Portfolio',
    url: siteUrl,
    inLanguage: 'en',
    publisher: {
      '@type': 'Person',
      name: 'Taulant Sela',
      url: siteUrl,
    },
    description: 'Portfolio of Taulant Sela, Software Engineer, showcasing web development projects and skills.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Taulant Sela - Portfolio',
    template: '%s | Taulant Sela',
  },
  description: 'Portfolio of Taulant Sela, Software Engineer, showcasing web development projects and skills.',
  keywords: [
    'Taulant Sela',
    'Taulant Sela portfolio',
    'software engineer',
    'frontend engineer',
    'Next.js developer',
    'React developer',
    'TypeScript developer',
    'web development',
    'product engineering',
  ],
  authors: [{ name: 'Taulant Sela', url: siteUrl }],
  creator: 'Taulant Sela',
  publisher: 'Taulant Sela',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Taulant Sela - Portfolio',
    description: 'Portfolio of Taulant Sela, Software Engineer, showcasing web development projects and skills.',
    siteName: 'Taulant Sela - Portfolio',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'Taulant Sela - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TaulantSela',
    creator: '@TaulantSela',
    title: 'Taulant Sela - Portfolio',
    description: 'Portfolio of Taulant Sela, Software Engineer, showcasing web development projects and skills.',
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: 'Technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased transition-colors duration-500`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative z-0 flex min-h-screen flex-col">
            <Navigation />
            <main className="relative isolate flex flex-1 flex-col overflow-hidden bg-slate-50 transition-colors duration-500 dark:bg-slate-900">
              <AuroraBackground />
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

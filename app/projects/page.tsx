import { ProjectsGrid } from '@/components/projects-grid';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { fetchProjects } from '@/lib/projects/projects';
import { fetchProjectsPageContent } from '@/lib/projects/projects-page-content';

const siteUrl = 'https://taulantsela.com';
const pageUrl = `${siteUrl}/projects`;
const socialImage = `${siteUrl}/og-image.svg`;

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore projects delivered by Taulant Sela across product engineering, open source, and experimental builds.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Projects by Taulant Sela',
    description:
      'A curated portfolio of production launches, open source contributions, and personal experiments from Taulant Sela.',
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
    title: 'Taulant Sela — Projects',
    description: 'Recent product launches, open source work, and personal experiments built by Taulant Sela.',
    images: [socialImage],
  },
  keywords: [
    'Taulant Sela projects',
    'software portfolio',
    'Next.js projects',
    'React projects',
    'frontend engineering work',
  ],
};

export default async function ProjectsPage() {
  const [projects, pageContent] = await Promise.all([fetchProjects(), fetchProjectsPageContent()]);

  const { heading, description } = pageContent;

  return (
    <main className="relative isolate overflow-hidden px-6 py-24 transition-colors duration-500 sm:px-10 sm:py-32 lg:px-16">
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal className="mb-12 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="space-y-5 sm:space-y-6">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">{heading}</h1>
            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">{description}</p>
          </div>
          <Button asChild variant="ghost" size="sm" className="self-center sm:self-end">
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Highlights
            </Link>
          </Button>
        </ScrollReveal>

        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}

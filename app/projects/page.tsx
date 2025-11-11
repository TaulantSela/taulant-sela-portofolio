import { AuroraBackground } from '@/components/aurora-background';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TbBrandGithub } from 'react-icons/tb';

import { fetchProjects } from '@/lib/projects/projects';

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
  const projects = await fetchProjects();

  return (
    <main className="relative isolate overflow-hidden bg-slate-50 px-6 py-24 transition-colors duration-500 sm:px-10 sm:py-32 lg:px-16 dark:bg-slate-900/50">
      <AuroraBackground />
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal className="mb-12 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="space-y-5 sm:space-y-6">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">All Projects</h1>
            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Browse the full collection of company initiatives, open source contributions, and personal products I have
              built.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="self-center sm:self-end">
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Highlights
            </Link>
          </Button>
        </ScrollReveal>

        {projects.length ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ScrollReveal key={project.id} delay={80 + index * 60} threshold={0.05} className="group h-full w-full">
                <Card className="flex h-[630px] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 pt-0 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-white/10">
                  <div className="aspect-[16/9] flex-none overflow-hidden rounded-t-2xl bg-slate-900/80">
                    <Image
                      src={project.image || '/placeholder.png'}
                      alt={project.title}
                      height={202}
                      width={360}
                      className={`h-full w-full transition-transform duration-700 group-hover:scale-110 ${
                        project.imageFit === 'contain' ? 'object-contain p-6 group-hover:scale-100' : 'object-cover'
                      }`}
                    />
                  </div>
                  <CardHeader className="flex flex-col gap-4 pt-6">
                    <CardTitle className="w-full text-slate-900 dark:text-slate-100">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                          <span className="block text-xs tracking-wide text-slate-400 uppercase dark:text-slate-500">
                            {project.role === 'company'
                              ? 'Company Project'
                              : project.role === 'oss'
                                ? 'Open Source'
                                : 'Personal Project'}
                          </span>
                          <span>{project.title}</span>
                        </div>
                        <div className="flex shrink-0 space-x-2">
                          {project.links?.map((link) => {
                            const Icon = link.icon === 'github' ? TbBrandGithub : ExternalLink;
                            return (
                              <Link
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 transition-all duration-300 hover:scale-125 hover:text-slate-600 dark:hover:text-slate-300"
                                aria-label={`${project.title} ${link.label}`}
                              >
                                <Icon className="h-4 w-4" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </CardTitle>
                    <CardDescription className="line-clamp-5 text-sm dark:text-slate-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between gap-4 pt-4">
                    <p className="line-clamp-5 text-sm text-slate-500 dark:text-slate-400">{project.context}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.slice(0, 6).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs transition-transform duration-300 hover:scale-110"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-12 text-center text-slate-500 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/15 dark:bg-white/5 dark:text-white/60">
            No projects published yet.
          </div>
        )}
      </div>
    </main>
  );
}

import { ScrollReveal } from '@/components/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { thesisDemoCount, thesisDemoGroups } from '@/lib/projects/thesis-demos';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TbBrandGithub } from 'react-icons/tb';

const siteUrl = 'https://taulantsela.com';
const pageUrl = `${siteUrl}/projects/master-thesis`;
const socialImage = `${siteUrl}/og-image.svg`;
const repoUrl = 'https://github.com/TaulantSela/master-thesis';

const title = 'Master Thesis - Live Demos';
const description = `All ${thesisDemoCount} deployed apps from the React state-management study, grouped by application type.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/projects/master-thesis',
  },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title,
    description,
    images: [{ url: socialImage, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [socialImage],
  },
};

export default function MasterThesisDemosPage() {
  return (
    <main className="relative isolate overflow-hidden px-6 py-24 transition-colors duration-500 sm:px-10 sm:py-32 lg:px-16">
      <div className="relative mx-auto max-w-5xl">
        <ScrollReveal className="mb-12 flex flex-col gap-6">
          <Button asChild variant="ghost" size="sm" className="self-start">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
          <div className="space-y-5">
            <span className="block text-xs tracking-wide text-slate-400 uppercase dark:text-slate-500">
              Master Thesis - React State Management Study
            </span>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">Live Demos</h1>
            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              The study compares state-management approaches across three application types. Each variant below is the
              same app rebuilt with a different approach, so the deployments can be benchmarked against one another.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
                <TbBrandGithub className="mr-2 h-4 w-4" />
                View the monorepo
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-10">
          {thesisDemoGroups.map((group, groupIndex) => (
            <ScrollReveal key={group.app} delay={80 + groupIndex * 60} threshold={0.05}>
              <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{group.app}</h2>
                    <Badge variant="outline" className="text-xs">
                      {group.demos.length} variants
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{group.summary}</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.demos.map((demo) => (
                    <Link
                      key={demo.href}
                      href={demo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group h-full"
                    >
                      <Card className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 p-5 transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-xl dark:border-white/10">
                        <CardHeader className="p-0">
                          <CardTitle className="flex items-center justify-between gap-3 text-base text-slate-900 dark:text-slate-100">
                            {demo.approach}
                            <ExternalLink className="h-4 w-4 shrink-0 text-slate-400 transition-colors duration-300 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                          </CardTitle>
                          <CardDescription className="text-sm dark:text-slate-400">{demo.note}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <span className="text-xs break-all text-slate-400 dark:text-slate-500">
                            {new URL(demo.href).host}
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
}

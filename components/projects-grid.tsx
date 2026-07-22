'use client';

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { TbBrandGithub } from 'react-icons/tb';

import { ScrollReveal } from '@/components/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DEFAULT_PROJECT_SORT,
  PROJECT_SORTS,
  sortProjects,
  type Project,
  type ProjectSortKey,
} from '@/lib/projects/projects';
import { cn } from '@/lib/utils';

const roleLabels: Record<Project['role'], string> = {
  company: 'Company Project',
  oss: 'Open Source',
  personal: 'Personal Project',
};

type ProjectsGridProps = {
  projects: Project[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [sort, setSort] = useState<ProjectSortKey>(DEFAULT_PROJECT_SORT);
  const sorted = useMemo(() => sortProjects(projects, sort), [projects, sort]);

  if (!projects.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-12 text-center text-slate-500 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/15 dark:bg-white/5 dark:text-white/60">
        No projects published yet.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div
        role="radiogroup"
        aria-label="Sort projects"
        className="flex flex-wrap items-center justify-center gap-2 sm:justify-start"
      >
        <span className="mr-1 text-xs tracking-[0.3em] text-slate-500 uppercase dark:text-white/60">Sort by</span>
        {PROJECT_SORTS.map((option) => {
          const active = option.key === sort;
          return (
            <button
              key={option.key}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSort(option.key)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5',
                'focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px]',
                active
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
                  : 'border-slate-300/70 bg-white/80 text-slate-600 hover:border-slate-400 hover:text-slate-900 dark:border-white/20 dark:bg-white/10 dark:text-white/70 dark:hover:border-white/40 dark:hover:text-white',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((project, index) => (
          <ScrollReveal
            key={`${sort}-${project.id}`}
            delay={80 + index * 60}
            threshold={0.05}
            className="group h-full w-full"
          >
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
                        {roleLabels[project.role]}
                      </span>
                      <span>{project.title}</span>
                    </div>
                    <div className="flex shrink-0 space-x-2">
                      {project.links?.map((link) => {
                        const Icon = link.icon === 'github' ? TbBrandGithub : ExternalLink;
                        const external = link.href.startsWith('http');
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
    </div>
  );
}

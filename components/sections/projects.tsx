'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import NextLink from 'next/link';

import { ScrollReveal } from '@/components/scroll-reveal';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/projects/projects';

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  if (!projects.length) {
    return null;
  }

  const [leadProject, ...otherProjects] = projects;

  return (
    <section
      id="projects"
      className="relative isolate px-6 text-slate-900 transition-colors duration-500 sm:px-10 lg:px-16 dark:text-white"
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16">
        <ScrollReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" delay={60}>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-xs tracking-[0.4em] text-slate-500 uppercase dark:text-white/60">
              <span className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-1 text-slate-600 dark:border-white/20 dark:bg-white/10 dark:text-white/70">
                Selected Projects
              </span>
              <span className="hidden text-slate-500 lg:inline-flex dark:text-white/60">
                Recent partnerships & experiments
              </span>
            </div>
            <h2 className="max-w-xl text-4xl leading-tight font-semibold text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Lean collaborations rooted in steady delivery.
            </h2>
            <p className="max-w-2xl text-base text-slate-600 sm:text-lg dark:text-white/70">
              Front-end architecture, design system tuning, and release support for teams shipping on schedule.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="inline-flex items-center gap-3 rounded-full border-slate-300/70 bg-white/80 px-6 py-2 text-xs tracking-[0.3em] text-slate-600 uppercase transition-transform duration-300 hover:-translate-y-1 hover:border-slate-400 hover:text-slate-900 dark:border-white/20 dark:bg-white/10 dark:text-white/70 dark:hover:border-white/40 dark:hover:text-white"
          >
            <NextLink href="/projects">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </NextLink>
          </Button>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {leadProject ? (
            <ScrollReveal delay={140}>
              <ProjectSpotlight project={leadProject} />
            </ScrollReveal>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-slate-600 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/15 dark:bg-white/5 dark:text-white/60">
              <p className="text-center">No projects available.</p>
            </div>
          )}

          <aside className="flex flex-col gap-8">
            {otherProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={220 + index * 120} direction="up">
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}

type SpotlightProps = {
  project: Project;
};

function ProjectSpotlight({ project }: SpotlightProps) {
  const primaryLink = project.links?.[0];
  const target = primaryLink?.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <NextLink
      href={primaryLink?.href ?? '/projects'}
      {...target}
      className="group relative isolate flex h-full flex-col rounded-3xl border border-slate-300/50 bg-white/80 shadow-[0_24px_60px_rgba(148,163,184,0.35)] transition-transform duration-500 hover:-translate-y-2 hover:border-slate-400 dark:border-white/15 dark:bg-white/10 dark:shadow-[0_24px_60px_rgba(15,23,42,0.45)]"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <Image
          src={project.image || '/placeholder.png'}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className={`object-cover object-center opacity-85 transition duration-500 group-hover:scale-105 ${project.imageFit === 'contain' ? 'object-contain p-10' : ''}`}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-900/65 to-transparent" />
      <div className="relative flex h-full flex-col justify-between p-10 text-white">
        <div className="flex items-center justify-between text-xs tracking-[0.4em] text-white/70 uppercase">
          <span>Flagship</span>
          <span>
            {project.role === 'company' ? 'Enterprise' : project.role === 'personal' ? 'Personal' : 'Open Source'}
          </span>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl leading-tight font-semibold sm:text-4xl">{project.title}</h3>
            <p className="mt-4 max-w-xl text-sm text-white/75">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-white/75">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/30 bg-white/10 px-3 py-1 transition-colors duration-300 group-hover:border-white/60 group-hover:bg-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-white/75">
            {project.links?.slice(0, 2).map((link) => (
              <span
                key={link.href}
                className="rounded-full border border-white/35 bg-white/10 px-3 py-1 transition-colors duration-300 group-hover:border-white/60 group-hover:bg-white/20"
              >
                {link.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </NextLink>
  );
}

type CardProps = {
  project: Project;
};

function ProjectCard({ project }: CardProps) {
  const primaryLink = project.links?.[0];
  const target = primaryLink?.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <NextLink
      href={primaryLink?.href ?? '/projects'}
      {...target}
      className="group bg-card relative flex flex-col gap-4 rounded-3xl border border-slate-200 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-white/30"
    >
      <div className="animate-soft-pulse pointer-events-none absolute inset-0 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-white/0 dark:via-white/5 dark:to-white/10" />
      <div className="relative flex items-center justify-end text-xs tracking-[0.4em] text-slate-500 uppercase dark:text-white/60">
        <span>
          {project.role === 'company' ? 'Enterprise' : project.role === 'personal' ? 'Personal' : 'Open Source'}
        </span>
      </div>
      <div className="relative">
        <h3 className="text-2xl leading-tight font-semibold text-slate-900 dark:text-white">{project.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-white/60">{project.description}</p>
      </div>
      <div className="relative flex flex-wrap gap-2 text-xs text-slate-500 dark:text-white/60">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full border border-slate-300 px-3 py-1 dark:border-white/15">
            {tag}
          </span>
        ))}
      </div>
    </NextLink>
  );
}

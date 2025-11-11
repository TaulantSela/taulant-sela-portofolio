'use client';

import NextLink from 'next/link';

import GithubContributions from './github-contributions';
import { ScrollReveal } from './scroll-reveal';
import { Button } from './ui/button';

const marqueeItems = [
  'Clean Architecture',
  'Performance Optimization',
  'Maintainable Codebases',
  'Scalable Systems',
  'Technical Consulting',
  'Codebase Refactoring',
  'Team Leadership',
  'Technical Mentorship',
  'Agile & Scrum',
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden px-6 text-slate-950 transition-colors duration-500 sm:px-10 lg:px-16 dark:text-white"
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 lg:gap-20">
        <ScrollReveal once delay={80}>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl leading-tight font-semibold sm:text-6xl sm:leading-[1.05] lg:text-7xl">
                <span className="block">
                  <span className="animate-gradient-text">Taulant Sela</span>
                </span>
                <span className="block">Software Engineer turning ideas into refined products.</span>
              </h1>
              <p className="max-w-2xl text-lg text-slate-600 sm:text-xl dark:text-white/70">
                Collaborating with teams to design and develop modern web products that are built with clean
                architecture, reliable systems, and long-term maintainability in mind.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-slate-900 text-white transition-transform duration-300 hover:-translate-y-1 hover:bg-slate-800 active:translate-y-0 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
              >
                <NextLink href="#contact">Start a project</NextLink>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-300 bg-white/70 text-slate-900 transition-transform duration-300 hover:-translate-y-1 hover:bg-white dark:border-white/40 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                <NextLink href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                  Download credentials
                </NextLink>
              </Button>
            </div>
            <ScrollReveal once delay={150}>
              <div className="mt-5 rounded-[2rem] border border-slate-200/70 bg-white/80 px-3 py-4 shadow-inner dark:border-white/10 dark:bg-white/5">
                <div className="-mx-1 sm:-mx-2">
                  <GithubContributions />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>

        <ScrollReveal
          delay={320}
          className="relative overflow-hidden rounded-full border border-slate-200/80 bg-white/80 py-4 text-xs text-slate-500 uppercase backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/60"
        >
          <div className="animate-marquee flex items-center gap-10 tracking-[0.5em]">
            {marqueeItems.concat(marqueeItems).map((item, index) => (
              <span key={`${item}-${index}`} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-slate-900/20 via-slate-900/5 to-transparent dark:from-black/60 dark:via-black/20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-slate-900/20 via-slate-900/5 to-transparent dark:from-black/60 dark:via-black/20" />
        </ScrollReveal>
      </div>
    </section>
  );
}

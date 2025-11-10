'use client';

import { ScrollReveal } from '@/components/scroll-reveal';

export default function About() {
  return (
    <section
      id="about"
      className="relative isolate px-6 py-24 text-slate-950 transition-colors duration-500 sm:px-10 lg:px-16 dark:text-white"
    >
      <div className="relative mx-auto max-w-6xl space-y-12">
        <ScrollReveal className="space-y-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-300/60 bg-white/70 px-5 py-2 text-xs tracking-[0.4em] text-slate-500 uppercase dark:border-white/20 dark:bg-white/10 dark:text-white/60">
            About
            <span className="h-1.5 w-1.5 rounded-full bg-slate-600 dark:bg-white/70" />
            Taulant
          </div>
          <h2 className="max-w-3xl text-4xl leading-tight font-semibold text-slate-900 sm:text-5xl dark:text-white">
            Software engineer with a bias for clarity and momentum.
          </h2>
          <p className="max-w-3xl text-base text-slate-600 sm:text-lg dark:text-white/70">
            Remote-first from North Macedonia, I keep product intent, design detail, and engineering execution on the
            same track. Years of full-stack delivery—interface engineering, system design, integrations, and ops—help
            teams ship with less friction.
          </p>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal
            className="space-y-6 rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-[0_16px_50px_rgba(148,163,184,0.25)] transition-transform duration-500 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_16px_50px_rgba(15,23,42,0.45)]"
            delay={120}
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">How I work</h3>
            <p className="text-sm text-slate-600 dark:text-white/70">
              Transparent scope, quick prototypes, written decisions, and patterns teams can keep scaling after
              handoff—on both the UI and service layers.
            </p>
          </ScrollReveal>

          <ScrollReveal
            className="space-y-6 rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-[0_16px_50px_rgba(148,163,184,0.25)] transition-transform duration-500 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_16px_50px_rgba(15,23,42,0.45)]"
            delay={240}
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quick facts</h3>
            <div className="space-y-3 text-sm text-slate-600 dark:text-white/70">
              <p>• Remote from Struga, collaborating across time zones.</p>
              <p>• React 19, Next.js 15, Tailwind, TypeScript, Node.js, cloud services.</p>
              <p>• Comfortable jumping between UI polish, service integrations, and delivery coaching.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

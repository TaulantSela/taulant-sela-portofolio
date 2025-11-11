'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import type { SkillsSectionContent } from '@/lib/skills/skills-section-content';
import { techStack } from '@/lib/skills/tech-stack';
import { cn } from '@/lib/utils';

type SkillsProps = {
  content: SkillsSectionContent;
};

export default function Skills({ content }: SkillsProps) {
  const { badgeLeading, badgeTrailing, heading, description, captionLeading, captionTrailing } = content;

  return (
    <section
      id="skills"
      className="relative isolate px-6 text-slate-950 transition-colors duration-500 sm:px-10 lg:px-16 dark:text-white"
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
        <ScrollReveal className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-slate-300/70 bg-white/80 px-5 py-2 text-xs tracking-[0.4em] text-slate-500 uppercase dark:border-white/20 dark:bg-white/5 dark:text-white/60">
            {badgeLeading}
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400/90 dark:bg-white/60" />
            {badgeTrailing}
          </div>
          <h2 className="max-w-3xl text-4xl leading-tight font-semibold text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            {heading}
          </h2>
          <p className="max-w-3xl text-base text-slate-600 dark:text-white/70">{description}</p>
        </ScrollReveal>
        <div>
          <ScrollReveal
            delay={120}
            className="flex items-center justify-between text-xs tracking-[0.35em] text-slate-500 uppercase dark:text-white/50"
          >
            <span>{captionLeading}</span>
            <span>{captionTrailing}</span>
          </ScrollReveal>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {techStack.map((tech, index) => (
              <ScrollReveal key={tech.name} delay={160 + index * 35} className="h-full">
                <div className="group flex h-full w-full flex-col items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-3 text-center transition-transform duration-300 hover:-translate-y-1.5 hover:border-sky-300 dark:border-white/10 dark:bg-white/10">
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg text-[9px] font-semibold tracking-[0.2em] uppercase ring-1 transition duration-300 ring-inset',
                      tech.accent,
                    )}
                  >
                    {tech.icon ? (
                      <tech.icon className="h-4 w-4" />
                    ) : (
                      <span>{tech.initials ?? tech.name.slice(0, 2)}</span>
                    )}
                  </div>
                  <h3 className="text-[11px] font-medium tracking-[0.2em] text-slate-700 uppercase dark:text-white">
                    {tech.name}
                  </h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

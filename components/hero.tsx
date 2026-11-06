import type { HeroSectionContent } from '@/lib/hero/hero-section-content';

import Image from 'next/image';
import NextLink from 'next/link';

import GithubContributions from './github-contributions';
import { ScrollReveal } from './scroll-reveal';
import { Button } from './ui/button';
import { DraggableMarquee } from './ui/draggable-marquee';

type HeroProps = {
  content: HeroSectionContent;
};

export default function Hero({ content }: HeroProps) {
  const { headlineHighlight, headlineSecondary, description, location, facts, marqueeItems, cvUrl } = content;

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden px-6 text-slate-950 transition-colors duration-500 sm:px-10 lg:px-16 dark:text-white"
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 lg:gap-20">
        <ScrollReveal once delay={80}>
          <div className="flex flex-col gap-12">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center xl:grid-cols-[minmax(0,1fr)_24rem]">
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-6">
                  <h1 className="text-4xl leading-tight font-semibold sm:text-6xl sm:leading-[1.05] lg:text-7xl">
                    <span className="block">
                      <span className="animate-gradient-text">{headlineHighlight}</span>
                    </span>
                    <span className="mt-3 block text-2xl font-medium text-slate-600 sm:text-3xl lg:text-4xl dark:text-white/80">
                      {headlineSecondary}
                    </span>
                  </h1>
                  <p className="max-w-2xl text-lg text-slate-600 sm:text-xl dark:text-white/70">{description}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-slate-900 text-white transition-transform duration-300 hover:-translate-y-1 hover:bg-slate-800 active:translate-y-0 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                  >
                    <NextLink href="#contact">Get in touch</NextLink>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-slate-300 bg-white/70 text-slate-900 transition-transform duration-300 hover:-translate-y-1 hover:bg-white dark:border-white/40 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                  >
                    <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                      View CV
                    </a>
                  </Button>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200/80 bg-white/80 px-6 pt-6 pb-2 shadow-[0_16px_50px_rgba(148,163,184,0.25)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_16px_50px_rgba(15,23,42,0.45)]">
                <div className="flex items-center gap-4 border-b border-slate-200/70 pb-5 dark:border-white/10">
                  <Image src="/favicon.ico" alt="" width={56} height={56} className="h-14 w-14" />
                  <p className="font-medium text-slate-900 dark:text-white">{location}</p>
                </div>
                <dl className="divide-y divide-slate-200/70 dark:divide-white/10">
                  {facts.map(({ label, items, detail }) => (
                    <div key={label} className="space-y-1.5 py-3.5">
                      <dt className="text-[11px] tracking-[0.3em] text-slate-500 uppercase dark:text-white/50">
                        {label}
                      </dt>
                      <dd className="space-y-0.5">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {items.map(({ name, href }, index) => (
                            <span key={name}>
                              {index > 0 && <span className="text-slate-400 dark:text-white/40"> · </span>}
                              {href ? (
                                <a
                                  href={href}
                                  {...(href.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                                  className="whitespace-nowrap text-inherit underline decoration-slate-300 underline-offset-4 hover:scale-100 hover:decoration-slate-900 dark:decoration-white/30 dark:hover:decoration-white"
                                >
                                  {name}
                                </a>
                              ) : (
                                <span className="whitespace-nowrap">{name}</span>
                              )}
                            </span>
                          ))}
                        </p>
                        {detail && <p className="text-sm text-slate-500 dark:text-white/60">{detail}</p>}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
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
          <DraggableMarquee items={marqueeItems} className="gap-10 tracking-[0.5em]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-slate-900/20 via-slate-900/5 to-transparent dark:from-black/60 dark:via-black/20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-slate-900/20 via-slate-900/5 to-transparent dark:from-black/60 dark:via-black/20" />
        </ScrollReveal>
      </div>
    </section>
  );
}

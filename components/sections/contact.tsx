'use client';

import Link from 'next/link';

import { ContactForm } from '@/components/contact-form';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Rocket, Send, Sparkles, UserPlus } from 'lucide-react';
import { SiViber } from 'react-icons/si';
import { TbBrandGithub, TbBrandLinkedin, TbBrandWhatsapp } from 'react-icons/tb';

const contactLinks = [
  {
    title: 'Email',
    subtitle: 'taulant1995@gmail.com',
    href: 'mailto:taulant1995@gmail.com',
    icon: Send,
  },
  {
    title: 'Phone',
    subtitle: '+389 70 477 300',
    href: 'tel:+38970477300',
    icon: UserPlus,
    actions: [
      {
        title: 'Call',
        href: 'tel:+38970477300',
        icon: Send,
      },
      {
        title: 'Viber',
        href: 'viber://chat?number=%2B38970477300',
        icon: SiViber,
      },
      {
        title: 'WhatsApp',
        href: 'https://wa.me/38970477300',
        icon: TbBrandWhatsapp,
        isExternal: true,
      },
    ],
  },
  {
    title: 'LinkedIn',
    subtitle: '@taulantsela',
    href: 'https://www.linkedin.com/in/taulantsela',
    icon: TbBrandLinkedin,
  },
  {
    title: 'GitHub',
    subtitle: '@TaulantSela',
    href: 'https://github.com/TaulantSela',
    icon: TbBrandGithub,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate px-6 text-slate-950 transition-colors duration-500 sm:px-10 lg:px-16 dark:text-white"
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16">
        <ScrollReveal asChild className="space-y-6 text-center">
          <header className="space-y-6 text-center">
            <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-full border border-slate-200/60 bg-white/70 px-4 py-2.5 text-xs tracking-[0.2em] text-slate-500 sm:px-5 sm:py-3 sm:text-sm sm:tracking-[0.3em] dark:border-white/15 dark:bg-white/10 dark:text-white/70">
              <Rocket className="h-4 w-4 flex-shrink-0 text-emerald-500 dark:text-purple-300" />
              <span className="truncate">Let&apos;s build something amazing</span>
            </div>
            <h2 className="text-3xl leading-tight font-semibold text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              Ready to bring your next idea to life?
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg dark:text-white/70">
              Ready to ship your next big thing? Tell me the vision, the constraints, or the gap you need to close, and
              I&apos;ll chart the path from idea to launch.
            </p>
          </header>
        </ScrollReveal>

        <div className="grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="space-y-4 lg:space-y-6">
            <ScrollReveal className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.12)] sm:p-8 dark:border-white/15 dark:bg-white/[0.06] dark:shadow-[0_24px_70px_rgba(15,23,42,0.55)]">
              <div className="flex items-center justify-between text-xs tracking-[0.3em] text-slate-500 uppercase sm:tracking-[0.4em] dark:text-white/60">
                <span className="text-slate-600 dark:text-white/70">How I work</span>
              </div>
              <p className="mt-4 text-sm text-slate-600 sm:mt-6 dark:text-white/70">
                I stay close to product, design, and engineering partners—listening first, iterating thoughtfully, and
                shipping software that feels personal and dependable.
              </p>
            </ScrollReveal>

            <div className="space-y-4">
              {contactLinks.map(({ title, subtitle, href, icon: Icon, actions }, index) => {
                const isExternal = href.startsWith('http');
                const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

                return (
                  <ScrollReveal
                    key={title}
                    delay={160 + index * 120}
                    className="group flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:border-slate-300 sm:px-6 sm:py-5 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:border-white/30"
                  >
                    <Link
                      href={href}
                      {...linkProps}
                      className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4"
                      prefetch={false}
                    >
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-colors duration-300 group-hover:border-slate-300 group-hover:text-slate-900 sm:h-11 sm:w-11 dark:border-white/20 dark:bg-white/10 dark:text-white dark:group-hover:border-white/40 dark:group-hover:text-white/90">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs tracking-[0.2em] text-slate-500 uppercase sm:text-sm sm:tracking-[0.3em] dark:text-white/60">
                          {title}
                        </p>
                        <p className="truncate text-base font-medium text-slate-800 transition-colors duration-300 group-hover:text-slate-600 sm:text-lg dark:text-white dark:group-hover:text-white/80">
                          {subtitle}
                        </p>
                      </div>
                    </Link>
                    {actions?.length ? (
                      <div className="ml-2 flex flex-shrink-0 items-center gap-1 sm:ml-3 sm:gap-1.5">
                        {actions.map(({ title: actionTitle, href: actionHref, icon: ActionIcon, isExternal }) => {
                          const actionLinkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

                          return (
                            <Link
                              key={actionTitle}
                              href={actionHref}
                              {...actionLinkProps}
                              aria-label={`${actionTitle} via ${title}`}
                              className="flex h-8 w-8 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition-colors duration-300 hover:border-slate-300 hover:text-slate-900 sm:h-9 sm:w-9 dark:border-white/20 dark:bg-white/10 dark:text-white/70 dark:hover:border-white/40 dark:hover:text-white"
                              prefetch={false}
                            >
                              <ActionIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <Sparkles className="h-5 w-5 flex-shrink-0 text-emerald-400 transition-transform duration-300 group-hover:animate-pulse group-hover:text-emerald-500 dark:text-white/40 dark:group-hover:text-white/80" />
                    )}
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          <ScrollReveal
            delay={320}
            className="relative flex h-full rounded-3xl border border-slate-200 bg-white/95 p-1 shadow-[0_32px_120px_-25px_rgba(15,23,42,0.3)] backdrop-blur before:pointer-events-none before:absolute before:-inset-x-6 before:-bottom-10 before:h-16 before:rounded-full before:bg-gradient-to-b before:from-slate-900/20 before:to-transparent before:opacity-70 before:blur-3xl before:content-[''] dark:border-white/10 dark:bg-white/[0.08] dark:shadow-[0_32px_120px_-25px_rgba(15,23,42,0.55)] dark:before:from-purple-900/35"
          >
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

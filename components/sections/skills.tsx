'use client';

import { ScrollReveal } from '@/components/scroll-reveal';
import { cn } from '@/lib/utils';
import type { IconType } from 'react-icons';
import { MdOutlineHttp } from 'react-icons/md';
import { PiKanbanBold, PiPlugsConnectedBold, PiSquaresFourFill } from 'react-icons/pi';
import { RiShieldUserLine } from 'react-icons/ri';
import {
  SiAdobe,
  SiAmazon,
  SiAngular,
  SiContentful,
  SiExpress,
  SiFramer,
  SiGit,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMatillion,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiRadixui,
  SiReact,
  SiRedux,
  SiSass,
  SiSnowflake,
  SiTailwindcss,
  SiTypescript,
  SiWordpress,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

type TechStackItem = {
  name: string;
  accent: string;
  icon?: IconType;
  initials?: string;
};

const techStack: TechStackItem[] = [
  {
    name: 'React',
    icon: SiReact,
    accent:
      'bg-gradient-to-br from-sky-400/10 to-cyan-500/10 text-cyan-500 ring-cyan-400/40 group-hover:ring-cyan-400/70 dark:text-cyan-300',
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    accent:
      'bg-gradient-to-br from-yellow-400/10 to-amber-500/15 text-[#f7df1e] ring-yellow-400/40 group-hover:ring-yellow-400/70 dark:text-yellow-300',
  },
  {
    name: 'Angular',
    icon: SiAngular,
    accent:
      'bg-gradient-to-br from-red-500/15 to-rose-600/20 text-rose-500 ring-rose-500/40 group-hover:ring-rose-500/70 dark:text-rose-300',
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    accent:
      'bg-gradient-to-br from-slate-900/60 to-slate-800/70 text-white ring-white/20 group-hover:ring-white/40 dark:text-white',
  },
  {
    name: 'HTML',
    icon: SiHtml5,
    accent:
      'bg-gradient-to-br from-orange-400/15 to-red-500/20 text-orange-400 ring-orange-400/40 group-hover:ring-orange-400/70 dark:text-orange-300',
  },
  {
    name: 'Redux',
    icon: SiRedux,
    accent:
      'bg-gradient-to-br from-violet-500/15 to-purple-500/20 text-purple-400 ring-purple-400/40 group-hover:ring-purple-400/70 dark:text-purple-300',
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    accent:
      'bg-gradient-to-br from-sky-400/15 to-blue-500/15 text-sky-500 ring-sky-400/40 group-hover:ring-sky-400/70 dark:text-sky-300',
  },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    accent:
      'bg-gradient-to-br from-cyan-400/15 to-blue-500/15 text-cyan-400 ring-cyan-400/40 group-hover:ring-cyan-400/70 dark:text-cyan-300',
  },
  {
    name: 'SCSS',
    icon: SiSass,
    accent:
      'bg-gradient-to-br from-pink-400/20 to-rose-500/20 text-rose-400 ring-rose-400/40 group-hover:ring-rose-400/70 dark:text-rose-300',
  },
  {
    name: 'Radix UI',
    icon: SiRadixui,
    accent:
      'bg-gradient-to-br from-zinc-900/70 to-slate-800/70 text-white ring-white/15 group-hover:ring-white/35 dark:text-white',
  },
  {
    name: 'shadcn/ui',
    icon: PiSquaresFourFill,
    accent:
      'bg-gradient-to-br from-slate-900/70 to-zinc-800/70 text-white ring-white/20 group-hover:ring-white/40 dark:text-white',
  },
  {
    name: 'React Native',
    icon: TbBrandReactNative,
    accent:
      'bg-gradient-to-br from-cyan-500/15 to-indigo-500/20 text-cyan-400 ring-cyan-400/40 group-hover:ring-cyan-400/70 dark:text-cyan-300',
  },
  {
    name: 'IoT',
    icon: PiPlugsConnectedBold,
    accent:
      'bg-gradient-to-br from-emerald-400/15 to-cyan-500/15 text-emerald-500 ring-emerald-400/35 group-hover:ring-emerald-400/60 dark:text-emerald-200',
  },
  {
    name: 'Framer Motion',
    icon: SiFramer,
    accent:
      'bg-gradient-to-br from-purple-500/10 to-purple-900/30 text-purple-400 ring-purple-500/40 group-hover:ring-purple-500/70',
  },
  {
    name: 'Clerk',
    icon: RiShieldUserLine,
    accent:
      'bg-gradient-to-br from-rose-500/10 to-amber-300/20 text-rose-500 ring-rose-400/40 group-hover:ring-rose-400/60 dark:text-rose-300',
  },
  {
    name: 'Scrum Mastery',
    icon: PiKanbanBold,
    accent:
      'bg-gradient-to-br from-indigo-400/15 to-purple-500/20 text-indigo-400 ring-indigo-400/35 group-hover:ring-indigo-400/60 dark:text-indigo-200',
  },
  {
    name: 'Prisma',
    icon: SiPrisma,
    accent:
      'bg-gradient-to-br from-emerald-400/15 to-teal-500/15 text-emerald-400 ring-emerald-400/40 group-hover:ring-emerald-400/70 dark:text-emerald-300',
  },
  {
    name: 'GraphQL',
    icon: SiGraphql,
    accent:
      'bg-gradient-to-br from-rose-500/15 to-fuchsia-500/25 text-rose-400 ring-rose-400/40 group-hover:ring-rose-400/70 dark:text-rose-300',
  },
  {
    name: 'Express',
    icon: SiExpress,
    accent:
      'bg-gradient-to-br from-slate-200/60 to-slate-400/30 text-slate-700 ring-slate-400/40 group-hover:ring-slate-400/70 dark:text-white',
  },
  {
    name: 'REST',
    icon: MdOutlineHttp,
    accent:
      'bg-gradient-to-br from-slate-200/50 to-slate-400/30 text-slate-700 ring-slate-400/40 group-hover:ring-slate-400/70 dark:text-white',
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    accent:
      'bg-gradient-to-br from-lime-400/15 to-emerald-500/15 text-emerald-400 ring-emerald-400/40 group-hover:ring-emerald-400/70 dark:text-emerald-300',
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    accent:
      'bg-gradient-to-br from-sky-500/15 to-indigo-500/20 text-sky-500 ring-sky-500/40 group-hover:ring-sky-500/70 dark:text-sky-300',
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    accent:
      'bg-gradient-to-br from-emerald-400/15 to-green-500/20 text-emerald-500 ring-emerald-500/40 group-hover:ring-emerald-500/70 dark:text-emerald-300',
  },
  {
    name: 'Snowflake',
    icon: SiSnowflake,
    accent:
      'bg-gradient-to-br from-sky-300/15 to-blue-400/20 text-sky-400 ring-sky-400/35 group-hover:ring-sky-400/60 dark:text-sky-200',
  },
  {
    name: 'Matillion',
    icon: SiMatillion,
    accent:
      'bg-gradient-to-br from-lime-400/20 to-emerald-500/15 text-lime-500 ring-lime-400/40 group-hover:ring-lime-400/65 dark:text-lime-200',
  },
  {
    name: 'Adobe Experience Manager',
    icon: SiAdobe,
    accent:
      'bg-gradient-to-br from-red-500/20 to-orange-500/20 text-red-400 ring-red-400/35 group-hover:ring-red-400/60 dark:text-red-300',
    initials: 'AEM',
  },
  {
    name: 'Contentful',
    icon: SiContentful,
    accent:
      'bg-gradient-to-br from-sky-400/20 to-purple-500/20 text-sky-400 ring-sky-400/35 group-hover:ring-sky-400/60 dark:text-sky-200',
  },
  {
    name: 'WordPress',
    icon: SiWordpress,
    accent:
      'bg-gradient-to-br from-blue-500/20 to-slate-700/30 text-slate-600 ring-slate-500/40 group-hover:ring-slate-500/60 dark:text-slate-200',
  },
  {
    name: 'AWS',
    icon: SiAmazon,
    accent:
      'bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-500 ring-amber-500/40 group-hover:ring-amber-500/70 dark:text-amber-300',
  },
  {
    name: 'Git',
    icon: SiGit,
    accent:
      'bg-gradient-to-br from-orange-500/15 to-amber-500/25 text-orange-400 ring-orange-400/40 group-hover:ring-orange-400/70 dark:text-orange-300',
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative isolate px-6 text-slate-950 transition-colors duration-500 sm:px-10 lg:px-16 dark:text-white"
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
        <ScrollReveal className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-slate-300/70 bg-white/80 px-5 py-2 text-xs tracking-[0.4em] text-slate-500 uppercase dark:border-white/20 dark:bg-white/5 dark:text-white/60">
            Tech Arsenal
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400/90 dark:bg-white/60" />
            Core Stack
          </div>
          <h2 className="max-w-3xl text-4xl leading-tight font-semibold text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
            The toolkit behind thoughtful digital experiences.
          </h2>
          <p className="max-w-3xl text-base text-slate-600 dark:text-white/70">
            A collection of frameworks and tools that help me craft dependable, well-designed software.
          </p>
        </ScrollReveal>
        <div>
          <ScrollReveal
            delay={120}
            className="flex items-center justify-between text-xs tracking-[0.35em] text-slate-500 uppercase dark:text-white/50"
          >
            <span>Featured stack</span>
            <span>Always evolving</span>
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

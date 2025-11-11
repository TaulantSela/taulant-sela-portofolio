import { IconType } from 'react-icons';
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

export const techStack: TechStackItem[] = [
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

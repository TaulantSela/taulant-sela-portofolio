import profile from '@/public/profile_pic.jpg';
import { Download, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb';

import { Button } from './ui/button';

export default function Hero() {
  return (
    <section className="px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-in fade-in-50 slide-in-from-left-10 duration-700">
            <h1 className="mb-6 flex flex-col text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
              <span>Hi, I&apos;m</span>
              <span className="animate-pulse bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Taulant Sela
              </span>
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-slate-600 dark:text-slate-400">
              Software Engineer with 5+ years helping global teams ship high-impact React and Next.js experiences.
              I&apos;ve led multi-brand platform modernizations at Goodyear, guided smart office product teams at Hoyo
              Tech, and rebuilt digital music workflows for BMG Production Music.
              <br />
              <br />
              I thrive where design systems, performant frontends, and cross-functional collaboration intersect—often
              acting as the partner who translates product strategy into maintainable UI architecture, reusable
              component libraries, and smooth delivery rituals.
              <br />
              <br />
              Currently exploring deeper full-stack touches with Express and Node.js while continuing to push the React
              ecosystem forward through open-source contributions and technical storytelling.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-slate-900 transition-all duration-300 hover:scale-105 hover:bg-slate-800 active:scale-95 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                <Link href="/#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </Link>
              </Button>
              <a
                className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border bg-transparent px-6 text-sm font-medium whitespace-nowrap shadow-xs transition-all duration-300 outline-none hover:scale-105 focus-visible:ring-[3px] active:scale-95 disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                href="cv.pdf"
                aria-label="Download CV"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </div>
            <div className="mt-8 flex space-x-4">
              <a href="https://github.com/TaulantSela" target="_blank" rel="noopener noreferrer">
                <TbBrandGithub className="h-6 w-6 transition-colors hover:text-slate-700 dark:hover:text-slate-200" />
              </a>
              <a href="https://www.linkedin.com/in/taulantsela/" target="_blank" rel="noopener noreferrer">
                <TbBrandLinkedin className="h-6 w-6 transition-colors hover:text-[#0A66C2] dark:hover:text-[#0A66C2]" />
              </a>
              <a href="mailto:taulant1995@gmail.com" aria-label="Send email" target="_blank" rel="noopener noreferrer">
                <Mail className="h-6 w-6 transition-colors hover:text-slate-700 dark:hover:text-slate-200" />
              </a>
            </div>
          </div>
          <div className="animate-in fade-in-50 slide-in-from-right-10 flex justify-center delay-200 duration-700 lg:justify-end">
            <div className="relative">
              <div className="h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-1">
                <Image
                  src={profile}
                  alt="Taulant Sela"
                  className="h-full w-full rounded-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="absolute -right-4 -bottom-4 animate-bounce rounded-full bg-white p-4 shadow-lg dark:bg-slate-800">
                <div className="h-4 w-4 animate-pulse rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

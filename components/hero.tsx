import profile from '@/public/profile_pic.jpg';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <section className="px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-in fade-in-50 slide-in-from-left-10 duration-700">
            <h1 className="mb-6 text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
              Hi, I&apos;m{' '}
              <span className="animate-pulse bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Taulant Sela
              </span>
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-slate-600 dark:text-slate-400">
              Full-stack developer passionate about creating beautiful, functional web applications that solve
              real-world problems and deliver exceptional user experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-slate-900 transition-all duration-300 hover:scale-105 hover:bg-slate-800 active:scale-95 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>
            <div className="mt-8 flex space-x-4">
              <a href="https://github.com/TaulantSela" target="_blank">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/taulantsela/" target="_blank">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="mailto:taulant1995@gmail.com" aria-label="Send email" target="_blank">
                <Mail className="h-6 w-6" />
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

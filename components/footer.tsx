import { Heart } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-slate-100 px-6 py-16 text-slate-900 transition-colors duration-500 sm:px-10 lg:px-16 dark:bg-slate-950 dark:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(134,239,172,0.25),_transparent_60%)] opacity-90 dark:hidden" />
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_bottom,_rgba(99,102,241,0.25),_transparent_60%)] opacity-90 dark:block" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
        <Image src="/favicon.ico" alt="Taulant Sela logo" width={20} height={20} className="h-5 w-5" />

        <p className="text-xs tracking-[0.4em] text-slate-500 uppercase dark:text-white/50">Thanks for visiting</p>
        <p className="flex items-center justify-center gap-2 text-lg text-slate-600 dark:text-white/70">
          <span>Made with</span>
          <Heart className="animate-heartbeat h-4 w-4 text-red-500" fill="currentColor" aria-hidden="true" />
          <span>by Taulant Sela</span>
        </p>
      </div>
    </footer>
  );
}

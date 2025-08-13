import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export default function Navigation() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="animate-in fade-in-50 slide-in-from-left-5 text-xl font-bold text-slate-900 duration-500 dark:text-slate-100">
            Portfolio
          </div>
          <div className="hidden items-center space-x-8 md:flex">
            <Link href="#about">About</Link>
            <Link href="#projects">Projects</Link>
            <Link href="#skills">Skills</Link>
            <Link href="#blog">Blog</Link>
            <Link href="#contact">Contact</Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

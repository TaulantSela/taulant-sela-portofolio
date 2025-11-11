'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useOutsideClick } from '@/lib/hooks/use-outside-click';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Tech Arsenal' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const outsideClickRefs = useMemo(() => [menuRef, toggleRef], []);
  useOutsideClick(outsideClickRefs, closeMenu, isMenuOpen);

  // Handle scrolling to hash on page load (when navigating from other pages)
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();

    // Get the href and extract the section ID
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.substring(1);

      // If we're not on the homepage, navigate there first
      if (pathname !== '/') {
        router.push(`/${href}`);
      } else {
        // If we're on the homepage, scroll to the section
        const element = document.getElementById(sectionId);
        if (element) {
          // Use setTimeout to ensure smooth scroll happens after menu closes
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 0);
        }
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeMenu();

    // If we're on the homepage, scroll to top
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to homepage
      router.push('/');
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-2xl transition-colors duration-500 dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="inline-flex items-center gap-2 rounded-full border border-slate-800/40 bg-slate-900 px-4 py-1 text-xs tracking-[0.4em] text-slate-200 uppercase transition-colors duration-300 hover:border-slate-700 hover:bg-slate-800 dark:border-white/20 dark:bg-white/10 dark:text-white"
          >
            <Image src="/favicon.ico" alt="Taulant Sela logo" width={18} height={18} className="h-4 w-4" unoptimized />
            Taulant Sela
          </Link>
          <span className="text-[11px] tracking-[0.35em] text-slate-500 uppercase transition-colors duration-300 md:inline dark:text-white/60">
            Software Engineer
          </span>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
            ref={toggleRef}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:border-slate-300 hover:bg-white hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-[0_4px_14px_rgba(15,23,42,0.18)] dark:hover:border-white/25 dark:hover:bg-white/15 dark:hover:shadow-[0_12px_28px_rgba(15,23,42,0.35)] dark:focus-visible:ring-white/40"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-xs tracking-[0.35em] text-slate-500 uppercase transition-colors duration-300 hover:text-slate-900 dark:text-white/60 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>

      {isMenuOpen ? (
        <div
          id="mobile-navigation"
          ref={menuRef}
          className="border-t border-slate-200/70 bg-white/95 backdrop-blur-xl transition-colors duration-500 lg:hidden dark:border-white/10 dark:bg-slate-950/90"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="group flex items-center justify-between rounded-xl border border-transparent px-5 py-3 text-sm font-medium text-slate-700 transition-colors duration-300 hover:border-slate-200 hover:bg-slate-900/5 hover:text-slate-900 dark:text-white/80 dark:hover:border-white/15 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <span>{link.label}</span>
                <span className="w-6 text-right text-xs tracking-[0.4em] text-slate-300 uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-white/50">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}

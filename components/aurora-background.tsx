import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type AuroraVariant = 'portfolio' | 'hero' | 'about' | 'projects' | 'blog' | 'skills' | 'contact';

type AuroraBackgroundProps = {
  className?: string;
  variant?: AuroraVariant;
};

const projectPalette = {
  light: {
    background:
      'linear-gradient(180deg, rgba(248, 250, 252, 1) 0%, rgba(226, 232, 240, 1) 45%, rgba(248, 250, 252, 1) 100%)',
    accent: 'linear-gradient(135deg, rgba(134, 239, 172, 0.45) 0%, rgba(96, 165, 250, 0.35) 100%)',
  },
  dark: {
    background: 'linear-gradient(180deg, rgba(15, 23, 42, 1) 0%, rgba(30, 41, 59, 1) 40%, rgba(15, 23, 42, 1) 100%)',
    accent: 'linear-gradient(135deg, rgba(155, 135, 245, 0.6) 0%, rgba(96, 165, 250, 0.6) 100%)',
  },
};

const variantLayers: Record<AuroraVariant, ReactNode[]> = {
  hero: [
    <div
      key="hero-light"
      className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_65%)] opacity-90 dark:hidden"
    />,
    <div
      key="hero-dark"
      className="absolute inset-0 hidden bg-[radial-gradient(circle_at_top,_rgba(120,119,255,0.25),_transparent_65%)] opacity-90 dark:block"
    />,
    <div
      key="hero-drift-primary"
      className="animate-drift-slow absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-emerald-200/60 via-teal-100/40 to-emerald-50/0 blur-3xl dark:from-purple-500/40 dark:via-indigo-500/20 dark:to-purple-500/0"
    />,
    <div
      key="hero-drift-secondary"
      className="animate-drift-slower absolute bottom-[-40%] left-[-15%] h-[620px] w-[620px] rounded-full bg-gradient-to-tr from-sky-200/50 via-slate-100/60 to-slate-100/0 blur-3xl dark:from-blue-500/30 dark:via-slate-900 dark:to-slate-900/0"
    />,
    <div
      key="hero-soft-pulse"
      className="animate-soft-pulse absolute right-[18%] bottom-[22%] h-40 w-40 rounded-full bg-emerald-200/20 blur-xl dark:bg-indigo-400/10"
    />,
    <div key="hero-overlay" className="aurora-overlay" />,
  ],
  about: [
    <div
      key="about-light"
      className="absolute inset-0 bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:hidden"
    />,
    <div
      key="about-dark"
      className="absolute inset-0 hidden bg-gradient-to-br from-slate-900 via-slate-950/80 to-slate-900 dark:block"
    />,
    <div
      key="about-drift-primary"
      className="animate-drift-slow absolute top-[10%] left-[-15%] h-[320px] w-[320px] rounded-full bg-purple-200/30 blur-3xl dark:hidden"
    />,
    <div
      key="about-drift-primary-dark"
      className="animate-drift-slow absolute top-[10%] left-[-15%] hidden h-[320px] w-[320px] rounded-full bg-purple-500/20 blur-3xl dark:block"
    />,
    <div
      key="about-drift-secondary"
      className="animate-drift-slower absolute right-[-10%] bottom-[5%] h-[240px] w-[240px] rounded-full bg-sky-200/40 blur-3xl dark:hidden"
    />,
    <div
      key="about-drift-secondary-dark"
      className="animate-drift-slower absolute right-[-10%] bottom-[5%] hidden h-[240px] w-[240px] rounded-full bg-blue-500/20 blur-3xl dark:block"
    />,
    <div key="about-overlay" className="aurora-overlay" />,
  ],
  projects: [
    <div
      key="projects-light"
      className="absolute inset-0 opacity-100 dark:hidden"
      style={{ background: projectPalette.light.background }}
    />,
    <div
      key="projects-dark"
      className="absolute inset-0 hidden opacity-100 dark:block"
      style={{ background: projectPalette.dark.background }}
    />,
    <div
      key="projects-accent-light"
      className="animate-drift-slow absolute inset-0 opacity-40 blur-[180px] dark:hidden"
      style={{ backgroundImage: projectPalette.light.accent }}
    />,
    <div
      key="projects-accent-dark"
      className="animate-drift-slower absolute inset-0 hidden opacity-40 blur-[180px] dark:block"
      style={{ backgroundImage: projectPalette.dark.accent }}
    />,
    <div key="projects-overlay" className="aurora-overlay" />,
  ],
  blog: [
    <div
      key="blog-light"
      className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_65%)] opacity-90 dark:hidden"
    />,
    <div
      key="blog-dark"
      className="absolute inset-0 hidden bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.32),_transparent_65%)] opacity-90 dark:block"
    />,
    <div key="blog-overlay" className="aurora-overlay" />,
  ],
  skills: [
    <div
      key="skills-light"
      className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.16),_transparent_55%)] opacity-90 dark:hidden"
    />,
    <div
      key="skills-dark"
      className="absolute inset-0 hidden bg-[radial-gradient(circle_at_center,_rgba(165,180,252,0.42),_transparent_55%)] dark:block"
    />,
    <div key="skills-overlay" className="aurora-overlay" />,
  ],
  contact: [
    <div
      key="contact-light"
      className="absolute inset-0 opacity-90 dark:hidden"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% -10%, rgba(59,130,246,0.22), transparent 65%), radial-gradient(circle at -10% 90%, rgba(16,185,129,0.18), transparent 72%), radial-gradient(circle at 110% 92%, rgba(56,189,248,0.2), transparent 75%)',
      }}
    />,
    <div
      key="contact-dark"
      className="absolute inset-0 hidden opacity-90 dark:block"
      style={{
        backgroundImage:
          'radial-gradient(circle at 50% -10%, rgba(124,58,237,0.35), transparent 65%), radial-gradient(circle at -8% 88%, rgba(59,130,246,0.24), transparent 72%), radial-gradient(circle at 108% 90%, rgba(129,140,248,0.32), transparent 78%)',
      }}
    />,
    <div key="contact-overlay" className="aurora-overlay" />,
  ],
  portfolio: [
    <div
      key="portfolio-base-light"
      className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,_rgba(56,189,248,0.16),_transparent_62%),_radial-gradient(circle_at_82%_24%,_rgba(16,185,129,0.12),_transparent_68%),_radial-gradient(circle_at_50%_88%,_rgba(139,92,246,0.14),_transparent_70%)] opacity-95 dark:hidden"
    />,
    <div
      key="portfolio-base-dark"
      className="absolute inset-0 hidden opacity-95 dark:block"
      style={{
        backgroundImage:
          'radial-gradient(circle at 22% 16%, rgba(59,130,246,0.28), transparent 62%), radial-gradient(circle at 78% 22%, rgba(129,140,248,0.26), transparent 68%), radial-gradient(circle at 52% 88%, rgba(168,85,247,0.28), transparent 72%)',
      }}
    />,
    <div
      key="portfolio-drift-primary"
      className="animate-drift-slow absolute -top-48 right-[-28%] h-[780px] w-[780px] rounded-full bg-gradient-to-br from-emerald-200/45 via-cyan-200/25 to-transparent blur-[220px] dark:from-indigo-500/35 dark:via-purple-500/25 dark:to-transparent"
    />,
    <div
      key="portfolio-drift-secondary"
      className="animate-drift-slower absolute bottom-[-55%] left-[-30%] h-[820px] w-[820px] rounded-full bg-gradient-to-tr from-sky-200/40 via-emerald-200/15 to-transparent blur-[240px] dark:from-purple-500/35 dark:via-indigo-500/20 dark:to-transparent"
    />,
    <div
      key="portfolio-transition"
      className="absolute inset-x-[-30%] top-[48%] h-[1200px] bg-gradient-to-b from-[rgba(75,56,168,0.32)] via-[rgba(75,56,168,0.16)] to-transparent blur-[260px] dark:from-[rgba(18,12,48,0.82)] dark:via-[rgba(18,12,48,0.45)] dark:to-transparent"
    />,
    <div
      key="portfolio-soft-pulse"
      className="animate-soft-pulse absolute top-[42%] right-[20%] h-60 w-60 rounded-full bg-emerald-200/18 blur-[90px] dark:bg-indigo-400/18"
    />,
    <div key="portfolio-overlay" className="aurora-overlay" />,
  ],
};

export function AuroraBackground({ className, variant = 'hero' }: AuroraBackgroundProps) {
  const layers = variantLayers[variant] ?? variantLayers.hero;

  return (
    <div className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)} aria-hidden="true">
      {layers}
    </div>
  );
}

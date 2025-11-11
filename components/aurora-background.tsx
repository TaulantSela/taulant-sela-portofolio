import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type AuroraBackgroundProps = {
  className?: string;
};

const layers: ReactNode[] = [
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
];

export function AuroraBackground({ className }: AuroraBackgroundProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)} aria-hidden="true">
      {layers}
    </div>
  );
}

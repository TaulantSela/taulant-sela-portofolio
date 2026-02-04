import type { ApiContributionDay, ContributionDay } from '@/lib/github/contributions-api';
import { YEARS } from '@/lib/github/contributions-api';

export type YearlyData = {
  contributions: ContributionDay[];
  total: number;
};

export function buildYearlyData(contributions?: ApiContributionDay[], totals?: Record<string, number>) {
  const countsByDate = new Map<string, number>();

  contributions?.forEach((day) => {
    if (day?.date) {
      countsByDate.set(day.date, day.count ?? 0);
    }
  });

  const data: Record<number, YearlyData> = {};

  YEARS.forEach((year) => {
    const startOfYear = new Date(Date.UTC(year, 0, 1));
    const endOfYear = new Date(Date.UTC(year, 11, 31));
    const days: ContributionDay[] = [];
    let total = 0;

    for (let ts = startOfYear.getTime(); ts <= endOfYear.getTime(); ts += 24 * 60 * 60 * 1000) {
      const iso = new Date(ts).toISOString().slice(0, 10);
      const count = countsByDate.get(iso) ?? 0;
      days.push({ date: iso, count });
      total += count;
    }

    const apiTotal = totals && typeof totals[String(year)] === 'number' ? totals[String(year)]! : total;
    data[year] = { contributions: days, total: apiTotal };
  });

  return data;
}

export function getColorIndex(count: number) {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 11) return 3;
  return 4;
}

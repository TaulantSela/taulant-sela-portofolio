'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import {
  CURRENT_YEAR,
  GITHUB_USERNAME,
  YEARS,
  fetchContributionsRange,
} from '@/lib/github/contributions-api';
import { buildYearlyData, getColorIndex, type YearlyData } from '@/lib/github/contributions-helpers';

const COLOR_SCALE = [
  'bg-emerald-50/80 dark:bg-emerald-200/20',
  'bg-emerald-100/80 dark:bg-emerald-200/35',
  'bg-emerald-200/80 dark:bg-emerald-300/55',
  'bg-emerald-300/80 dark:bg-emerald-400/70',
  'bg-emerald-500/90 dark:bg-emerald-500/80',
];

const TILE_SIZE = 10;
const TILE_GAP = 2;
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const fallbackChartUrl = `https://ghchart.rshah.org/4062FF/${GITHUB_USERNAME}`;

export default function GithubContributions() {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [yearData, setYearData] = useState<Record<number, YearlyData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function preloadYears() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchContributionsRange({ signal: controller.signal });
        if (cancelled) return;

        const nextData = buildYearlyData(response.contributions, response.total);
        const bestYear = YEARS.reduce((best, year) =>
          nextData[year].total > nextData[best].total ? year : best,
        YEARS[0]);

        setYearData(nextData);
        setActiveYear(bestYear);
      } catch (error) {
        const isAbortError =
          error instanceof DOMException && error.name === 'AbortError';

        if (!isAbortError) {
          if (!cancelled) {
            setError('Unable to load.');
          }
          console.error('Failed to load GitHub contributions', error);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    preloadYears();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const activeData = activeYear === null ? undefined : yearData[activeYear];
  const normalizedDays = useMemo(() => activeData?.contributions ?? [], [activeData]);
  const total = activeData?.total ?? 0;
  const activeYearLabel = activeYear ?? CURRENT_YEAR;

  const firstDayOffset = useMemo(() => {
    if (activeYear === null) return 0;
    const startOfYear = new Date(Date.UTC(activeYear, 0, 1));
    return (startOfYear.getUTCDay() + 6) % 7;
  }, [activeYear]);

  const showGrid = normalizedDays.length > 0 && !isLoading;
  // Always use 53 weeks for consistent width across all years
  const fixedWeekCount = 53;
  const heatmapWidth = fixedWeekCount * (TILE_SIZE + TILE_GAP) - TILE_GAP;

  const monthPositions = useMemo(() => {
    if (normalizedDays.length === 0 || activeYear === null) return [];

    const positions: Array<{ label: string; offset: number }> = [];
    let currentMonth = -1;
    let monthStartIndex = 0;

    normalizedDays.forEach((day, index) => {
      const date = new Date(day.date + 'T00:00:00Z');
      const month = date.getUTCMonth();

      if (currentMonth === -1) {
        currentMonth = month;
        monthStartIndex = index;
      }

      const isLastDay = index === normalizedDays.length - 1;
      const isMonthChange = month !== currentMonth;

      if (isMonthChange || isLastDay) {
        const endIndex = isMonthChange ? index - 1 : index;
        const startColumn = Math.floor((firstDayOffset + monthStartIndex) / 7);
        const endColumn = Math.floor((firstDayOffset + endIndex) / 7);
        const columnWidth = TILE_SIZE + TILE_GAP;
        const columns = Math.max(1, endColumn - startColumn + 1);
        const occupiedWidth = columns * columnWidth - TILE_GAP;
        const offset = startColumn * columnWidth + occupiedWidth / 2;
        const labelDate = new Date(Date.UTC(activeYear, currentMonth, 1));
        const label = labelDate.toLocaleString('en-US', { month: 'short' });

        positions.push({ label, offset });

        currentMonth = month;
        monthStartIndex = index;
      }
    });

    return positions;
  }, [normalizedDays, activeYear, firstDayOffset]);

  const handleYearClick = (year: number) => {
    if (year === activeYear) return;
    if (!yearData[year]) return;
    setActiveYear(year);
  };

  return (
    <div className="mx-auto flex w-full max-w-full flex-col items-center gap-5 px-4 sm:px-6">
      <p className="text-sm font-semibold tracking-[0.25em] text-slate-500 uppercase dark:text-white/60">
        GitHub contributions
      </p>

      <div className="flex w-full flex-col items-center gap-6">
        <div className="w-full max-w-fit">
          <div className="relative w-full overflow-hidden rounded-2xl border border-emerald-200/65 bg-white/85 px-4 py-4 shadow-[0_22px_42px_-28px_rgba(16,185,129,0.7)] backdrop-blur-sm sm:px-5 sm:py-4 dark:border-emerald-400/25 dark:bg-slate-900/75 dark:shadow-[0_18px_38px_-20px_rgba(37,99,235,0.35)]">
            <div className="pointer-events-none absolute inset-0 bg-white/68 dark:bg-slate-900/40" />
            <div className="pointer-events-none absolute inset-0 border border-white/40 mix-blend-overlay dark:border-white/10" />

            <div className="relative flex min-h-5 items-center text-xs tracking-[0.3em] text-slate-400 uppercase dark:text-white/50">
              {!showGrid && isLoading ? (
                <span>Loading…</span>
              ) : showGrid ? (
                <span>
                  {total.toLocaleString()} {total === 1 ? 'contribution' : 'contributions'} in {activeYearLabel}
                </span>
              ) : (
                <span>Snapshot</span>
              )}
            </div>

            <div className="relative mt-6 overflow-y-hidden">
              {showGrid ? (
                <div className="relative w-full overflow-x-auto overflow-y-hidden">
                  <div className="relative mx-auto min-w-max">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className="mt-8 grid justify-end pr-2 text-[10px] text-slate-500 dark:text-slate-400"
                        style={{ gridTemplateRows: `repeat(7, ${TILE_SIZE}px)`, rowGap: TILE_GAP }}
                      >
                        {Array.from({ length: 7 }).map((_, index) => (
                          <span key={index} className="flex items-center justify-end" style={{ height: TILE_SIZE }}>
                            {DAY_LABELS[index]}
                          </span>
                        ))}
                      </div>
                      <div className="relative pt-8">
                        <div
                          className="pointer-events-none absolute top-0 left-0 h-4 text-[10px] text-slate-500 dark:text-slate-400"
                          style={{ width: heatmapWidth }}
                        >
                          {monthPositions.map(({ label, offset }, index) => (
                            <span
                              key={`${label}-${index}`}
                              className="absolute -translate-x-1/2 transform whitespace-nowrap"
                              style={{ left: offset }}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                        <div
                          className="grid"
                          style={{
                            gridTemplateColumns: `repeat(${fixedWeekCount}, ${TILE_SIZE}px)`,
                            gridTemplateRows: `repeat(7, ${TILE_SIZE}px)`,
                            gridAutoFlow: 'column',
                            columnGap: TILE_GAP,
                            rowGap: TILE_GAP,
                            width: heatmapWidth,
                          }}
                        >
                          {normalizedDays.map((day, index) => {
                            const position = firstDayOffset + index;
                            const columnStart = Math.floor(position / 7) + 1;
                            const rowStart = (position % 7) + 1;

                            return (
                              <div
                                key={day.date}
                                className={`rounded transition-colors duration-300 ${COLOR_SCALE[getColorIndex(day.count)]} bg-clip-padding`}
                                style={{
                                  width: TILE_SIZE,
                                  height: TILE_SIZE,
                                  gridColumnStart: columnStart,
                                  gridRowStart: rowStart,
                                }}
                                title={`${day.count} contributions on ${day.date}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : isLoading ? (
                <div className="relative w-full overflow-x-auto overflow-y-hidden">
                  <div
                    className="grid min-w-max"
                    style={{
                      gridTemplateColumns: `repeat(${fixedWeekCount}, ${TILE_SIZE}px)`,
                      gridTemplateRows: `repeat(7, ${TILE_SIZE}px)`,
                      gridAutoFlow: 'column',
                      columnGap: TILE_GAP,
                      rowGap: TILE_GAP,
                      width: heatmapWidth,
                    }}
                  >
                    {Array.from({ length: fixedWeekCount * 7 }).map((_, index) => (
                      <div
                        key={`loading-${index}`}
                        className="animate-pulse rounded bg-slate-900/10 dark:bg-white/10"
                        style={{ width: TILE_SIZE, height: TILE_SIZE }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex w-full justify-center py-4">
                  <Image
                    src={fallbackChartUrl}
                    alt={`GitHub contributions for ${GITHUB_USERNAME}`}
                    width={720}
                    height={180}
                    className="h-auto w-full max-w-lg rounded border border-white/40 object-cover dark:border-white/10"
                  />
                </div>
              )}
            </div>

            {error && (
              <p className="relative mt-4 rounded-xl border border-white/40 bg-white/70 px-4 py-3 text-xs tracking-[0.25em] text-slate-500 dark:border-white/10 dark:bg-white/10 dark:text-white/60">
                Unable to reach GitHub right now, showing a static snapshot instead.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-fit overflow-x-auto">
        <div className="flex items-center gap-2 px-2 pb-2">
          {YEARS.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => handleYearClick(year)}
              disabled={isLoading}
              className={`cursor-pointer rounded-full border px-3 py-1 text-[11px] tracking-[0.35em] whitespace-nowrap uppercase transition-colors duration-300 disabled:cursor-not-allowed ${
                year === activeYear
                  ? 'border-emerald-400 text-emerald-500 dark:border-emerald-300 dark:text-emerald-200'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:border-white/15 dark:text-white/60 dark:hover:border-white/40 dark:hover:text-white'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {showGrid ? (
        <div className="flex items-center gap-3 text-[8px] tracking-[0.3em] text-slate-400 uppercase dark:text-white/40">
          <span>Less</span>
          <span className="flex items-center gap-1">
            {COLOR_SCALE.map((color) => (
              <span key={color} className={`h-2 w-4 rounded-lg ${color}`} />
            ))}
          </span>
          <span>More</span>
        </div>
      ) : null}
    </div>
  );
}

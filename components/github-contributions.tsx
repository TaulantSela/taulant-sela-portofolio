'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type ContributionDay = {
  date: string;
  count: number;
};

type ApiContributionDay = ContributionDay & {
  color?: string;
};

type ContributionsResponse = {
  totalContributions?: number;
  weeks?: Array<{
    contributionDays: ApiContributionDay[];
  }>;
  contributions?: ApiContributionDay[];
};

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

const USERNAME = 'TaulantSela';
const CURRENT_YEAR = new Date().getFullYear();
const START_YEAR = 2017;
const YEARS = Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, idx) => CURRENT_YEAR - idx);
const API_BASE = 'https://github-contributions-api.jogruber.de/v4';
const fallbackChartUrl = `https://ghchart.rshah.org/4062FF/${USERNAME}`;

function getColorIndex(count: number) {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 11) return 3;
  return 4;
}

export default function GithubContributions() {
  const [activeYear, setActiveYear] = useState<number>(CURRENT_YEAR);
  const [pendingYear, setPendingYear] = useState<number | null>(CURRENT_YEAR);
  const [yearData, setYearData] = useState<Record<number, ContributionsResponse>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pendingYear === null) return;

    const controller = new AbortController();
    const year = pendingYear;
    const from = `${year}-01-01`;
    const to = `${year}-12-31`;
    const url = `${API_BASE}/${USERNAME}?from=${from}&to=${to}`;

    let cancelled = false;

    setError(null);
    setIsLoading(true);

    fetch(url, { cache: 'no-store', signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Status ${res.status}`);
        }
        const json = (await res.json()) as ContributionsResponse;
        if (!cancelled) {
          setYearData((prev) => ({ ...prev, [year]: json }));
          setActiveYear(year);
          setPendingYear(null);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled && err.name !== 'AbortError') {
          setError('Unable to load.');
          setPendingYear(null);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [pendingYear]);

  const activeData = yearData[activeYear];

  const normalizedDays = useMemo(() => {
    const map = new Map<string, number>();
    if (activeData) {
      if (Array.isArray(activeData.weeks)) {
        activeData.weeks.forEach((week) => {
          week.contributionDays.forEach((day) => {
            if (day?.date) {
              map.set(day.date, day.count);
            }
          });
        });
      }
      if (Array.isArray(activeData.contributions)) {
        activeData.contributions.forEach((day) => {
          if (day?.date) {
            map.set(day.date, day.count);
          }
        });
      }
    }

    const startOfYear = new Date(Date.UTC(activeYear, 0, 1));
    const endOfYear = new Date(Date.UTC(activeYear, 11, 31));

    const days: ContributionDay[] = [];
    for (let ts = startOfYear.getTime(); ts <= endOfYear.getTime(); ts += 24 * 60 * 60 * 1000) {
      const iso = new Date(ts).toISOString().slice(0, 10);
      days.push({ date: iso, count: map.get(iso) ?? 0 });
    }

    return days;
  }, [activeData, activeYear]);

  const firstDayOffset = useMemo(() => {
    const startOfYear = new Date(Date.UTC(activeYear, 0, 1));
    return (startOfYear.getUTCDay() + 6) % 7;
  }, [activeYear]);

  const total = useMemo(() => normalizedDays.reduce((acc, day) => acc + day.count, 0), [normalizedDays]);
  const showGrid = normalizedDays.length > 0;
  // Always use 53 weeks for consistent width across all years
  const fixedWeekCount = 53;
  const heatmapWidth = fixedWeekCount * (TILE_SIZE + TILE_GAP) - TILE_GAP;
  const skeletonWidth = fixedWeekCount * (TILE_SIZE + TILE_GAP) - TILE_GAP;

  const monthPositions = useMemo(() => {
    if (normalizedDays.length === 0) return [];

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
    if (year === activeYear || pendingYear === year) return;

    if (yearData[year]) {
      setActiveYear(year);
      setError(null);
      setIsLoading(false);
      setPendingYear(null);
      return;
    }

    setPendingYear(year);
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

            <div className="relative flex min-h-[20px] items-center text-xs tracking-[0.3em] text-slate-400 uppercase dark:text-white/50">
              {!showGrid && isLoading ? (
                <span>Loading…</span>
              ) : showGrid ? (
                <span>
                  {total.toLocaleString()} {total === 1 ? 'contribution' : 'contributions'} in {activeYear}
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
                      width: skeletonWidth,
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
                    alt={`GitHub contributions for ${USERNAME}`}
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
              disabled={pendingYear === year}
              className={`cursor-pointer rounded-full border px-3 py-1 text-[11px] tracking-[0.35em] whitespace-nowrap uppercase transition-colors duration-300 disabled:cursor-not-allowed ${
                year === activeYear
                  ? 'border-emerald-400 text-emerald-500 dark:border-emerald-300 dark:text-emerald-200'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:border-white/15 dark:text-white/60 dark:hover:border-white/40 dark:hover:text-white'
              } ${pendingYear === year ? 'opacity-60' : ''}`}
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
              <span key={color} className={`h-2 w-4 rounded-[4px] ${color}`} />
            ))}
          </span>
          <span>More</span>
        </div>
      ) : null}
    </div>
  );
}

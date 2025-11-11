'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type DraggableMarqueeProps = {
  items: string[];
  className?: string;
  itemClassName?: string;
  ariaLabel?: string;
};

const MARQUEE_DURATION_SECONDS = 28;

export function DraggableMarquee({ items, className, itemClassName, ariaLabel }: DraggableMarqueeProps) {
  const marqueeContent = useMemo(() => items.concat(items), [items]);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number | null>(null);
  const rawOffsetRef = useRef(0);
  const segmentWidthRef = useRef(0);
  const speedRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const applyTransform = useCallback((value: number) => {
    rawOffsetRef.current = value;
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const segmentWidth = segmentWidthRef.current;

    if (segmentWidth <= 0) {
      track.style.transform = `translateX(${-value}px)`;
      return;
    }

    let normalized = value % segmentWidth;

    if (normalized < 0) {
      normalized += segmentWidth;
    }

    track.style.transform = `translateX(-${normalized}px)`;
  }, []);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const width = track.scrollWidth / 2;
      segmentWidthRef.current = width;
      speedRef.current = width > 0 ? width / MARQUEE_DURATION_SECONDS : 0;
      applyTransform(rawOffsetRef.current);
    };

    measure();
    window.addEventListener('resize', measure);

    return () => {
      window.removeEventListener('resize', measure);
    };
  }, [applyTransform]);

  useEffect(() => {
    const step = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!isDraggingRef.current) {
        const speed = speedRef.current;

        if (speed > 0) {
          applyTransform(rawOffsetRef.current + delta * speed);
        }
      }

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = undefined;
      lastTimeRef.current = null;
    };
  }, [applyTransform]);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = rawOffsetRef.current;
    lastTimeRef.current = null;

    if (track.setPointerCapture) {
      track.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
  }, []);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) {
        return;
      }

      const delta = event.clientX - dragStartXRef.current;
      applyTransform(dragStartOffsetRef.current - delta);
      event.preventDefault();
    },
    [applyTransform],
  );

  const endDrag = useCallback((event?: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) {
      return;
    }

    isDraggingRef.current = false;
    setIsDragging(false);

    if (event && trackRef.current && trackRef.current.releasePointerCapture) {
      try {
        if (trackRef.current.hasPointerCapture(event.pointerId)) {
          trackRef.current.releasePointerCapture(event.pointerId);
        }
      } catch {
        // Ignore release errors (e.g. pointer already released)
      }
    }

    lastTimeRef.current = null;
  }, []);

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      endDrag(event);
    },
    [endDrag],
  );

  const handlePointerLeave = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.buttons === 0) {
        endDrag(event);
      }
    },
    [endDrag],
  );

  const trackClassName = cn(
    'flex min-w-max items-center will-change-transform select-none',
    isDragging ? 'cursor-grabbing' : 'cursor-grab',
    className,
  );

  const itemClasses = cn('flex-shrink-0 whitespace-nowrap', itemClassName);

  return (
    <div
      ref={trackRef}
      className={trackClassName}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      style={{ transform: 'translateX(0)' }}
      role="presentation"
      aria-label={ariaLabel}
    >
      {marqueeContent.map((item, index) => (
        <span key={`${item}-${index}`} className={itemClasses} aria-hidden={index >= items.length}>
          {item}
        </span>
      ))}
    </div>
  );
}

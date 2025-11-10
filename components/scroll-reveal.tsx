'use client';

import { Slot } from '@radix-ui/react-slot';
import { type HTMLAttributes, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right';

type ScrollRevealProps = {
  asChild?: boolean;
  delay?: number;
  direction?: Direction;
  once?: boolean;
  threshold?: number;
} & HTMLAttributes<HTMLElement>;

export function ScrollReveal({
  asChild = false,
  children,
  className,
  delay = 0,
  direction = 'up',
  once = false,
  threshold = 0.2,
  ...props
}: ScrollRevealProps) {
  const Comp = asChild ? Slot : 'div';
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      element.classList.add('reveal-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('reveal-visible');
            if (delay) {
              element.style.setProperty('--reveal-delay', `${delay}ms`);
            }
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            element.classList.remove('reveal-visible');
            element.style.removeProperty('--reveal-delay');
          }
        });
      },
      {
        threshold,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, once, threshold]);

  return (
    <Comp ref={ref} className={cn('reveal-item', `reveal-${direction}`, className)} {...props}>
      {children}
    </Comp>
  );
}

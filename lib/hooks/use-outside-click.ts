import { RefObject, useEffect, useRef } from 'react';

type PossibleRefs = RefObject<HTMLElement | null | undefined>[];

export function useOutsideClick(refs: PossibleRefs, handler: () => void, enabled: boolean = true) {
  const latestHandler = useRef(handler);
  latestHandler.current = handler;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;

      const isInside = refs.some((ref) => {
        const element = ref.current;
        return element?.contains(target ?? null) ?? false;
      });

      if (isInside) {
        return;
      }

      latestHandler.current();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [enabled, refs]);
}

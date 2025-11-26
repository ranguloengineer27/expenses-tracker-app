import { useCallback, useRef } from "react";

export function useDebounce(callback: (name: string) => void, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = useCallback((name: string) => {
    if (!delay) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(name);
    }, delay);

  }, [callback, delay]);

  return debouncedFn;
}

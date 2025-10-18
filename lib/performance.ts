// Performance optimization utilities
import { useEffect, useRef, useState } from 'react';

// Image lazy loading hook
export function useLazyImage(src: string, options?: IntersectionObserverInit) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      options
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, options]);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setIsError(true);

  return {
    imgRef,
    imageSrc,
    isLoaded,
    isError,
    handleLoad,
    handleError
  };
}

// Debounce hook for search and input
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Throttle function for scroll events
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Performance monitoring
export class PerformanceMonitor {
  static measure(name: string, fn: () => void): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const start = performance.now();
      fn();
      const end = performance.now();
      console.log(`${name} took ${end - start} milliseconds`);
    } else {
      fn();
    }
  }

  static measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const start = performance.now();
      return fn().then(result => {
        const end = performance.now();
        console.log(`${name} took ${end - start} milliseconds`);
        return result;
      });
    } else {
      return fn();
    }
  }
}

// Bundle size optimization
export const bundleOptimizations = {
  // Preload critical resources
  preloadResource: (href: string, as: string) => {
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    }
  }
};

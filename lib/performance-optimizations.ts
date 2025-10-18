/**
 * Performance optimization utilities for the application
 */

import { memo, useMemo, useCallback } from 'react';

/**
 * Higher-order component for memoizing components
 */
export const withMemo = <P extends object>(
  Component: React.ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  return memo(Component, areEqual);
};

/**
 * Hook for debouncing values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for throttling function calls
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastRun = React.useRef(Date.now());

  return React.useCallback(
    (...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    },
    [callback, delay]
  ) as T;
}

/**
 * Hook for intersection observer (lazy loading)
 */
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options]);

  return isIntersecting;
}

/**
 * Hook for preloading resources
 */
export function usePreload() {
  const preloadedResources = React.useRef(new Set<string>());

  const preload = useCallback((url: string, as: 'image' | 'script' | 'style' | 'font' = 'image') => {
    if (preloadedResources.current.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = as;
    
    if (as === 'font') {
      link.crossOrigin = 'anonymous';
    }

    document.head.appendChild(link);
    preloadedResources.current.add(url);
  }, []);

  return { preload };
}

/**
 * Hook for virtual scrolling
 */
export function useVirtualScroll<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = React.useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index,
    }));
  }, [items, itemHeight, containerHeight, scrollTop]);

  const totalHeight = items.length * itemHeight;
  const offsetY = scrollTop;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
  };
}

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTiming(name: string): void {
    this.metrics.set(name, performance.now());
  }

  endTiming(name: string): number {
    const startTime = this.metrics.get(name);
    if (!startTime) return 0;

    const duration = performance.now() - startTime;
    this.metrics.delete(name);
    return duration;
  }

  measureRender(componentName: string, renderFn: () => void): void {
    this.startTiming(`${componentName}-render`);
    renderFn();
    const duration = this.endTiming(`${componentName}-render`);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${duration.toFixed(2)}ms`);
    }
  }
}

/**
 * Image optimization utilities
 */
export const imageOptimization = {
  /**
   * Generate responsive image sizes
   */
  generateSizes: (baseWidth: number) => {
    return `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${baseWidth}px`;
  },

  /**
   * Generate srcSet for responsive images
   */
  generateSrcSet: (baseUrl: string, widths: number[] = [640, 750, 828, 1080, 1200, 1920]) => {
    return widths
      .map(width => `${baseUrl}?w=${width} ${width}w`)
      .join(', ');
  },

  /**
   * Lazy load images with intersection observer
   */
  useLazyImage: (src: string, placeholder?: string) => {
    const [imageSrc, setImageSrc] = React.useState(placeholder || '');
    const [isLoaded, setIsLoaded] = React.useState(false);
    const imgRef = React.useRef<HTMLImageElement>(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            setIsLoaded(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }, [src]);

    return { imageSrc, isLoaded, imgRef };
  },
};

/**
 * Bundle optimization utilities
 */
export const bundleOptimization = {
  /**
   * Dynamic import with loading state
   */
  useDynamicImport: <T>(importFn: () => Promise<T>) => {
    const [Component, setComponent] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const loadComponent = useCallback(async () => {
      if (Component) return Component;

      setLoading(true);
      setError(null);

      try {
        const componentModule = await importFn();
        setComponent(componentModule);
        return componentModule;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setLoading(false);
      }
    }, [Component, importFn]);

    return { Component, loading, error, loadComponent };
  },

  /**
   * Preload critical resources
   */
  preloadCriticalResources: () => {
    const criticalResources = [
      '/Brand-Logo.svg',
      '/fonts/inter.woff2',
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.svg') ? 'image' : 'font';
      document.head.appendChild(link);
    });
  },
};

// Import React for hooks
import React from 'react';

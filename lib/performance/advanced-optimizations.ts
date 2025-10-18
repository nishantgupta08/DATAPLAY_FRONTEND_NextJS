// Advanced Performance Optimizations
// Implements cutting-edge performance techniques for maximum speed

import { useCallback, useMemo, useRef, useEffect, useState } from 'react';

/**
 * Intersection Observer Hook for Lazy Loading
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options, hasIntersected]);

  return { ref, isIntersecting, hasIntersected };
}

/**
 * Virtual Scrolling Hook for Large Lists
 */
export function useVirtualScroll<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange]);

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.startIndex * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    containerRef,
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
    visibleRange,
  };
}

/**
 * Advanced Debouncing Hook
 */
export function useAdvancedDebounce<T>(
  value: T,
  delay: number,
  options: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
  } = {}
) {
  const { leading = false, trailing = true, maxWait } = options;
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const maxTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  // const lastCallTime = useRef<number>();
  const lastInvokeTime = useRef<number>(0);

  useEffect(() => {
    const now = Date.now();
    const isInvoking = leading && now - lastInvokeTime.current >= delay;

    if (isInvoking) {
      setDebouncedValue(value);
      lastInvokeTime.current = now;
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (trailing) {
        setDebouncedValue(value);
        lastInvokeTime.current = Date.now();
      }
    }, delay);

    if (maxWait && !maxTimeoutRef.current) {
      maxTimeoutRef.current = setTimeout(() => {
        setDebouncedValue(value);
        lastInvokeTime.current = Date.now();
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }, maxWait);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (maxTimeoutRef.current) clearTimeout(maxTimeoutRef.current);
    };
  }, [value, delay, leading, trailing, maxWait]);

  return debouncedValue;
}

/**
 * Memory-Efficient Image Preloading
 */
export function useImagePreloader(urls: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const preloadImage = useCallback((url: string) => {
    if (loadedImages.has(url) || loadingImages.has(url)) return;

    setLoadingImages(prev => new Set(prev).add(url));

    const img = new Image();
    img.onload = () => {
      setLoadedImages(prev => new Set(prev).add(url));
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(url);
        return newSet;
      });
    };
    img.onerror = () => {
      setFailedImages(prev => new Set(prev).add(url));
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(url);
        return newSet;
      });
    };
    img.src = url;
  }, [loadedImages, loadingImages]);

  useEffect(() => {
    urls.forEach(preloadImage);
  }, [urls, preloadImage]);

  return {
    loadedImages: Array.from(loadedImages),
    loadingImages: Array.from(loadingImages),
    failedImages: Array.from(failedImages),
    isLoaded: (url: string) => loadedImages.has(url),
    isLoading: (url: string) => loadingImages.has(url),
    hasFailed: (url: string) => failedImages.has(url),
  };
}

/**
 * Advanced Caching Hook
 */
export function useAdvancedCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number; // Time to live in milliseconds
    staleWhileRevalidate?: boolean;
    maxSize?: number;
  } = {}
) {
  const { ttl = 5 * 60 * 1000, staleWhileRevalidate = true, maxSize = 100 } = options;
  const cacheRef = useRef<Map<string, { data: T; timestamp: number; isStale: boolean }>>(new Map());
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getCachedData = useCallback((cacheKey: string) => {
    const cached = cacheRef.current.get(cacheKey);
    if (!cached) return null;

    const now = Date.now();
    const isExpired = now - cached.timestamp > ttl;

    if (isExpired && !staleWhileRevalidate) {
      cacheRef.current.delete(cacheKey);
      return null;
    }

    return {
      data: cached.data,
      isStale: isExpired,
    };
  }, [ttl, staleWhileRevalidate]);

  const setCachedData = useCallback((cacheKey: string, value: T) => {
    // Implement LRU eviction if cache is full
    if (cacheRef.current.size >= maxSize) {
      const firstKey = cacheRef.current.keys().next().value;
      if (firstKey) {
        cacheRef.current.delete(firstKey);
      }
    }

    cacheRef.current.set(cacheKey, {
      data: value,
      timestamp: Date.now(),
      isStale: false,
    });
  }, [maxSize]);

  const fetchData = useCallback(async () => {
    const cached = getCachedData(key);
    
    if (cached && !cached.isStale) {
      setData(cached.data);
      return cached.data;
    }

    if (cached && cached.isStale && staleWhileRevalidate) {
      setData(cached.data);
      // Continue to fetch fresh data in background
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      setCachedData(key, result);
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [key, fetcher, getCachedData, setCachedData, staleWhileRevalidate]);

  return {
    data,
    isLoading,
    error,
    fetchData,
    invalidate: () => cacheRef.current.delete(key),
    clear: () => cacheRef.current.clear(),
  };
}

/**
 * Performance Monitoring Hook
 */
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<{
    renderTime: number;
    memoryUsage: number;
    componentCount: number;
  }>({
    renderTime: 0,
    memoryUsage: 0,
    componentCount: 0,
  });

  const measureRender = useCallback((renderFn: () => void) => {
    const start = performance.now();
    renderFn();
    const end = performance.now();
    
    setMetrics(prev => ({
      ...prev,
      renderTime: end - start,
    }));
  }, []);

  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as { memory: { usedJSHeapSize: number } }).memory;
      setMetrics(prev => ({
        ...prev,
        memoryUsage: memory.usedJSHeapSize / 1024 / 1024, // MB
      }));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(measureMemory, 1000);
    return () => clearInterval(interval);
  }, [measureMemory]);

  return {
    metrics,
    measureRender,
    measureMemory,
  };
}

/**
 * Bundle Size Optimizer
 */
export class BundleSizeOptimizer {
  private static instance: BundleSizeOptimizer;
  private bundleSize: number = 0;
  private maxSize: number = 1024 * 1024; // 1MB default

  static getInstance(): BundleSizeOptimizer {
    if (!BundleSizeOptimizer.instance) {
      BundleSizeOptimizer.instance = new BundleSizeOptimizer();
    }
    return BundleSizeOptimizer.instance;
  }

  setMaxSize(size: number): void {
    this.maxSize = size;
  }

  trackBundleSize(size: number): void {
    this.bundleSize = size;
    
    if (size > this.maxSize) {
      console.warn(`Bundle size (${size} bytes) exceeds maximum allowed size (${this.maxSize} bytes)`);
    }
  }

  getBundleSize(): number {
    return this.bundleSize;
  }

  getSizePercentage(): number {
    return (this.bundleSize / this.maxSize) * 100;
  }

  isOverLimit(): boolean {
    return this.bundleSize > this.maxSize;
  }
}

/**
 * Advanced Error Boundary Hook
 */
export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);
  const [errorInfo, setErrorInfo] = useState<React.ErrorInfo | null>(null);

  const resetError = useCallback(() => {
    setError(null);
    setErrorInfo(null);
  }, []);

  const captureError = useCallback((error: Error, errorInfo: React.ErrorInfo) => {
    setError(error);
    setErrorInfo(errorInfo);
    
    // Log to analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as { gtag: (command: string, eventName: string, parameters: Record<string, unknown>) => void }).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        error_boundary: true,
      });
    }
  }, []);

  return {
    error,
    errorInfo,
    resetError,
    captureError,
  };
}

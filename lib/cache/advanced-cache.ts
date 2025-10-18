// Advanced Caching System
// Implements sophisticated caching strategies for optimal performance

import { useCallback, useRef, useEffect, useState } from 'react';

export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of entries
  staleWhileRevalidate?: boolean; // Serve stale data while revalidating
  serialize?: boolean; // Serialize data for storage
  version?: string; // Cache version for invalidation
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  isStale: boolean;
  accessCount: number;
  lastAccessed: number;
}

export class AdvancedCache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private options: Required<CacheOptions>;
  private accessOrder: string[] = [];

  constructor(options: CacheOptions = {}) {
    this.options = {
      ttl: 5 * 60 * 1000, // 5 minutes
      maxSize: 100,
      staleWhileRevalidate: true,
      serialize: false,
      version: '1.0.0',
      ...options,
    };
  }

  set(key: string, data: T, customTtl?: number): void {
    const ttl = customTtl || this.options.ttl;
    const now = Date.now();

    // Remove oldest entry if cache is full
    if (this.cache.size >= this.options.maxSize) {
      this.evictOldest();
    }

    // Update access order
    this.updateAccessOrder(key);

    this.cache.set(key, {
      data,
      timestamp: now,
      ttl,
      isStale: false,
      accessCount: 1,
      lastAccessed: now,
    });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    const isExpired = now - entry.timestamp > entry.ttl;

    // Update access tracking
    entry.accessCount++;
    entry.lastAccessed = now;
    this.updateAccessOrder(key);

    if (isExpired) {
      entry.isStale = true;
      
      if (!this.options.staleWhileRevalidate) {
        this.cache.delete(key);
        return null;
      }
    }

    return entry.data;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    const now = Date.now();
    const isExpired = now - entry.timestamp > entry.ttl;

    if (isExpired && !this.options.staleWhileRevalidate) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      const index = this.accessOrder.indexOf(key);
      if (index > -1) {
        this.accessOrder.splice(index, 1);
      }
    }
    return deleted;
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
  }

  size(): number {
    return this.cache.size;
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  values(): T[] {
    return Array.from(this.cache.values()).map(entry => entry.data);
  }

  entries(): Array<[string, T]> {
    return Array.from(this.cache.entries()).map(([key, entry]) => [key, entry.data]);
  }

  // Get cache statistics
  getStats(): {
    size: number;
    hitRate: number;
    averageAge: number;
    staleEntries: number;
  } {
    const entries = Array.from(this.cache.values());
    const now = Date.now();
    
    const totalAccesses = entries.reduce((sum, entry) => sum + entry.accessCount, 0);
    const hits = entries.filter(entry => entry.accessCount > 1).length;
    const hitRate = totalAccesses > 0 ? (hits / totalAccesses) * 100 : 0;
    
    const averageAge = entries.length > 0 
      ? entries.reduce((sum, entry) => sum + (now - entry.timestamp), 0) / entries.length
      : 0;
    
    const staleEntries = entries.filter(entry => entry.isStale).length;

    return {
      size: this.cache.size,
      hitRate,
      averageAge,
      staleEntries,
    };
  }

  // Clean up expired entries
  cleanup(): number {
    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, entry] of this.cache.entries()) {
      const isExpired = now - entry.timestamp > entry.ttl;
      
      if (isExpired && !this.options.staleWhileRevalidate) {
        this.cache.delete(key);
        const index = this.accessOrder.indexOf(key);
        if (index > -1) {
          this.accessOrder.splice(index, 1);
        }
        cleanedCount++;
      }
    }

    return cleanedCount;
  }

  // Invalidate cache by pattern
  invalidatePattern(pattern: RegExp): number {
    let invalidatedCount = 0;
    
    for (const key of this.cache.keys()) {
      if (pattern.test(key)) {
        this.delete(key);
        invalidatedCount++;
      }
    }

    return invalidatedCount;
  }

  // Update cache version (invalidates all entries)
  updateVersion(newVersion: string): void {
    this.options.version = newVersion;
    this.clear();
  }

  private evictOldest(): void {
    if (this.accessOrder.length === 0) return;
    
    const oldestKey = this.accessOrder[0];
    this.delete(oldestKey);
  }

  private updateAccessOrder(key: string): void {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
    this.accessOrder.push(key);
  }
}

// React hook for advanced caching
export function useAdvancedCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
) {
  const cacheRef = useRef<AdvancedCache<T>>(new AdvancedCache(options));
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getCachedData = useCallback(() => {
    return cacheRef.current.get(key);
  }, [key]);

  const setCachedData = useCallback((value: T) => {
    cacheRef.current.set(key, value);
  }, [key]);

  const fetchData = useCallback(async (forceRefresh = false) => {
    // Check cache first
    if (!forceRefresh) {
      const cached = getCachedData();
      if (cached) {
        setData(cached);
        return cached;
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      setCachedData(result);
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [fetcher, getCachedData, setCachedData]);

  const invalidate = useCallback(() => {
    cacheRef.current.delete(key);
    setData(null);
  }, [key]);

  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  // Auto-cleanup on unmount
  useEffect(() => {
    const cache = cacheRef.current;
    return () => {
      // Optional: cleanup expired entries
      cache.cleanup();
    };
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchData,
    invalidate,
    refresh,
    cache: cacheRef.current,
  };
}

// Multi-level cache system
export class MultiLevelCache<T> {
  private l1Cache: AdvancedCache<T>; // Memory cache
  private l2Cache: AdvancedCache<T>; // Persistent cache
  private options: CacheOptions;

  constructor(options: CacheOptions = {}) {
    this.options = options;
    this.l1Cache = new AdvancedCache({
      ...options,
      ttl: (options.ttl || 5 * 60 * 1000) / 2, // L1 cache has shorter TTL
    });
    this.l2Cache = new AdvancedCache({
      ...options,
      ttl: options.ttl || 5 * 60 * 1000,
    });
  }

  async get(key: string): Promise<T | null> {
    // Try L1 cache first
    let data = this.l1Cache.get(key);
    if (data) return data;

    // Try L2 cache
    data = this.l2Cache.get(key);
    if (data) {
      // Promote to L1 cache
      this.l1Cache.set(key, data);
      return data;
    }

    return null;
  }

  set(key: string, data: T): void {
    // Set in both caches
    this.l1Cache.set(key, data);
    this.l2Cache.set(key, data);
  }

  delete(key: string): boolean {
    const l1Deleted = this.l1Cache.delete(key);
    const l2Deleted = this.l2Cache.delete(key);
    return l1Deleted || l2Deleted;
  }

  clear(): void {
    this.l1Cache.clear();
    this.l2Cache.clear();
  }

  getStats() {
    return {
      l1: this.l1Cache.getStats(),
      l2: this.l2Cache.getStats(),
    };
  }
}

// Cache warming utilities
export class CacheWarmer<T> {
  private cache: AdvancedCache<T>;
  private warmingQueue: Set<string> = new Set();

  constructor(cache: AdvancedCache<T>) {
    this.cache = cache;
  }

  async warmCache(
    keys: string[],
    fetcher: (key: string) => Promise<T>,
    concurrency: number = 3
  ): Promise<void> {
    const chunks = this.chunkArray(keys, concurrency);
    
    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (key) => {
          if (this.warmingQueue.has(key)) return;
          
          this.warmingQueue.add(key);
          try {
            const data = await fetcher(key);
            this.cache.set(key, data);
          } catch (error) {
            console.warn(`Failed to warm cache for key: ${key}`, error);
          } finally {
            this.warmingQueue.delete(key);
          }
        })
      );
    }
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}

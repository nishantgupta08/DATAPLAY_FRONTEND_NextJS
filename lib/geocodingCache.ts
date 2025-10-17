import { GeocodeResult } from './geocoding';

interface CacheEntry {
  result: GeocodeResult;
  timestamp: number;
  expiresAt: number;
}

interface GeocodingCache {
  [key: string]: CacheEntry;
}

/**
 * Geocoding cache service with localStorage persistence
 * Caches geocoded results to avoid repeated API calls
 */
export class GeocodingCacheService {
  private static readonly CACHE_KEY = 'geocoding_cache';
  private static readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  private static cache: GeocodingCache = {};

  /**
   * Initialize cache from localStorage
   */
  static initialize(): void {
    if (typeof window === 'undefined') return; // Skip on server-side

    try {
      const stored = localStorage.getItem(this.CACHE_KEY);
      if (stored) {
        this.cache = JSON.parse(stored);
        this.cleanExpiredEntries();
      }
    } catch (error) {
      console.warn('Failed to load geocoding cache:', error);
      this.cache = {};
    }
  }

  /**
   * Get cached result for a location
   */
  static get(location: string): GeocodeResult | null {
    if (typeof window === 'undefined') return null;

    const entry = this.cache[location];
    if (!entry) return null;

    // Check if entry is expired
    if (Date.now() > entry.expiresAt) {
      delete this.cache[location];
      this.save();
      return null;
    }

    return entry.result;
  }

  /**
   * Set cached result for a location
   */
  static set(location: string, result: GeocodeResult): void {
    if (typeof window === 'undefined') return;

    const now = Date.now();
    this.cache[location] = {
      result,
      timestamp: now,
      expiresAt: now + this.CACHE_DURATION
    };

    this.save();
  }

  /**
   * Check if location is cached and not expired
   */
  static has(location: string): boolean {
    if (typeof window === 'undefined') return false;

    const entry = this.cache[location];
    if (!entry) return false;

    if (Date.now() > entry.expiresAt) {
      delete this.cache[location];
      this.save();
      return false;
    }

    return true;
  }

  /**
   * Clear all cached entries
   */
  static clear(): void {
    if (typeof window === 'undefined') return;

    this.cache = {};
    localStorage.removeItem(this.CACHE_KEY);
  }

  /**
   * Get cache statistics
   */
  static getStats(): { total: number; expired: number; valid: number } {
    const now = Date.now();
    let expired = 0;
    let valid = 0;

    Object.values(this.cache).forEach(entry => {
      if (now > entry.expiresAt) {
        expired++;
      } else {
        valid++;
      }
    });

    return {
      total: Object.keys(this.cache).length,
      expired,
      valid
    };
  }

  /**
   * Clean expired entries from cache
   */
  private static cleanExpiredEntries(): void {
    const now = Date.now();
    let cleaned = false;

    Object.keys(this.cache).forEach(key => {
      if (now > this.cache[key].expiresAt) {
        delete this.cache[key];
        cleaned = true;
      }
    });

    if (cleaned) {
      this.save();
    }
  }

  /**
   * Save cache to localStorage
   */
  private static save(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.cache));
    } catch (error) {
      console.warn('Failed to save geocoding cache:', error);
    }
  }
}

/**
 * Enhanced geocoding service with caching
 */
export class CachedGeocodingService {
  /**
   * Geocode a location with caching
   */
  static async geocode(location: string, geocodingFunction: () => Promise<GeocodeResult | null>): Promise<GeocodeResult | null> {
    // Initialize cache if not already done
    GeocodingCacheService.initialize();

    // Check cache first
    if (GeocodingCacheService.has(location)) {
      console.log(`Cache hit for location: ${location}`);
      return GeocodingCacheService.get(location);
    }

    // Not in cache, geocode and cache result
    console.log(`Cache miss for location: ${location}, geocoding...`);
    const result = await geocodingFunction();
    
    if (result) {
      GeocodingCacheService.set(location, result);
      console.log(`Cached result for location: ${location}`);
    }

    return result;
  }

  /**
   * Batch geocode with caching
   */
  static async batchGeocode(
    locations: string[], 
    geocodingFunction: (location: string) => Promise<GeocodeResult | null>
  ): Promise<Map<string, GeocodeResult>> {
    const results = new Map<string, GeocodeResult>();
    
    // Initialize cache
    GeocodingCacheService.initialize();

    for (const location of locations) {
      try {
        let result: GeocodeResult | null = null;
        
        // Check cache first
        if (GeocodingCacheService.has(location)) {
          result = GeocodingCacheService.get(location);
          console.log(`Cache hit for: ${location}`);
        } else {
          // Geocode and cache
          result = await geocodingFunction(location);
          if (result) {
            GeocodingCacheService.set(location, result);
            console.log(`Cached result for: ${location}`);
          }
        }
        
        if (result) {
          results.set(location, result);
        }
      } catch (error) {
        console.error(`Geocoding failed for ${location}:`, error);
      }
    }
    
    return results;
  }
}

// Core Web Vitals Optimization for Google SEO
// Implements Google's Core Web Vitals best practices for 2024

export interface CoreWebVitalsConfig {
  // Largest Contentful Paint (LCP) - should be under 2.5s
  lcpThreshold: number;
  // First Input Delay (FID) - should be under 100ms
  fidThreshold: number;
  // Cumulative Layout Shift (CLS) - should be under 0.1
  clsThreshold: number;
  // First Contentful Paint (FCP) - should be under 1.8s
  fcpThreshold: number;
  // Time to Interactive (TTI) - should be under 3.8s
  ttiThreshold: number;
}

export const CORE_WEB_VITALS_CONFIG: CoreWebVitalsConfig = {
  lcpThreshold: 2500, // 2.5 seconds
  fidThreshold: 100,  // 100 milliseconds
  clsThreshold: 0.1,  // 0.1
  fcpThreshold: 1800,  // 1.8 seconds
  ttiThreshold: 3800,  // 3.8 seconds
};

/**
 * Core Web Vitals optimization utilities
 */
export class CoreWebVitalsOptimizer {
  private static instance: CoreWebVitalsOptimizer;
  private metrics: Map<string, number> = new Map();

  static getInstance(): CoreWebVitalsOptimizer {
    if (!CoreWebVitalsOptimizer.instance) {
      CoreWebVitalsOptimizer.instance = new CoreWebVitalsOptimizer();
    }
    return CoreWebVitalsOptimizer.instance;
  }

  /**
   * Track Core Web Vitals metrics
   */
  trackMetrics(): void {
    if (typeof window === 'undefined') return;

    // Track LCP (Largest Contentful Paint)
    this.trackLCP();
    
    // Track FID (First Input Delay)
    this.trackFID();
    
    // Track CLS (Cumulative Layout Shift)
    this.trackCLS();
    
    // Track FCP (First Contentful Paint)
    this.trackFCP();
    
    // Track TTI (Time to Interactive)
    this.trackTTI();
  }

  private trackLCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.set('lcp', lastEntry.startTime);
        this.reportMetric('lcp', lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  private trackFID(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { processingStart?: number }) => {
          if (entry.processingStart) {
            const fid = entry.processingStart - entry.startTime;
            this.metrics.set('fid', fid);
            this.reportMetric('fid', fid);
          }
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  private trackCLS(): void {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { hadRecentInput?: boolean; value?: number }) => {
          if (!entry.hadRecentInput && entry.value !== undefined) {
            clsValue += entry.value;
            this.metrics.set('cls', clsValue);
            this.reportMetric('cls', clsValue);
          }
        });
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  private trackFCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries[0];
        this.metrics.set('fcp', fcpEntry.startTime);
        this.reportMetric('fcp', fcpEntry.startTime);
      });
      observer.observe({ entryTypes: ['paint'] });
    }
  }

  private trackTTI(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const ttiEntry = entries.find(entry => entry.name === 'TTI');
        if (ttiEntry) {
          this.metrics.set('tti', ttiEntry.startTime);
          this.reportMetric('tti', ttiEntry.startTime);
        }
      });
      observer.observe({ entryTypes: ['measure'] });
    }
  }

  private reportMetric(metric: string, value: number): void {
    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as { gtag: (command: string, eventName: string, parameters: Record<string, unknown>) => void }).gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: metric,
        value: Math.round(value),
        non_interaction: true,
      });
    }

    // Send to Google Search Console (if available)
    if (typeof window !== 'undefined' && 'navigator' in window) {
      // Use the Web Vitals library for more accurate measurements
      this.sendToSearchConsole(metric, value);
    }
  }

  private sendToSearchConsole(metric: string, value: number): void {
    // Implementation for sending to Google Search Console
    // This would typically use the web-vitals library
    console.log(`Core Web Vital - ${metric}: ${value}ms`);
  }

  /**
   * Get current metrics
   */
  getMetrics(): Map<string, number> {
    return this.metrics;
  }

  /**
   * Check if metrics meet Google's thresholds
   */
  checkThresholds(): { [key: string]: boolean } {
    const results: { [key: string]: boolean } = {};
    
    results.lcp = (this.metrics.get('lcp') || 0) <= CORE_WEB_VITALS_CONFIG.lcpThreshold;
    results.fid = (this.metrics.get('fid') || 0) <= CORE_WEB_VITALS_CONFIG.fidThreshold;
    results.cls = (this.metrics.get('cls') || 0) <= CORE_WEB_VITALS_CONFIG.clsThreshold;
    results.fcp = (this.metrics.get('fcp') || 0) <= CORE_WEB_VITALS_CONFIG.fcpThreshold;
    results.tti = (this.metrics.get('tti') || 0) <= CORE_WEB_VITALS_CONFIG.ttiThreshold;
    
    return results;
  }
}

/**
 * Performance optimization recommendations
 */
export const PERFORMANCE_RECOMMENDATIONS = {
  lcp: [
    'Optimize images with WebP format and proper sizing',
    'Use responsive images with srcset',
    'Implement lazy loading for below-the-fold content',
    'Minimize render-blocking resources',
    'Use a Content Delivery Network (CDN)',
    'Optimize server response times',
    'Preload critical resources'
  ],
  fid: [
    'Minimize JavaScript execution time',
    'Use code splitting and lazy loading',
    'Optimize third-party scripts',
    'Implement service workers for caching',
    'Use web workers for heavy computations',
    'Minimize main thread blocking'
  ],
  cls: [
    'Set explicit dimensions for images and videos',
    'Avoid inserting content above existing content',
    'Use CSS transforms instead of changing layout properties',
    'Preload fonts to avoid font swap',
    'Reserve space for dynamic content',
    'Use aspect-ratio CSS property'
  ],
  fcp: [
    'Optimize critical rendering path',
    'Minimize render-blocking CSS',
    'Use inline critical CSS',
    'Optimize server response times',
    'Use efficient image formats',
    'Implement resource hints (preload, prefetch)'
  ],
  tti: [
    'Minimize JavaScript bundle size',
    'Use code splitting',
    'Optimize third-party scripts',
    'Implement efficient caching strategies',
    'Use service workers',
    'Minimize main thread work'
  ]
};

/**
 * Generate performance optimization suggestions
 */
export const generatePerformanceSuggestions = (metrics: Map<string, number>): string[] => {
  const suggestions: string[] = [];
  const thresholds = CORE_WEB_VITALS_CONFIG;

  if ((metrics.get('lcp') || 0) > thresholds.lcpThreshold) {
    suggestions.push(...PERFORMANCE_RECOMMENDATIONS.lcp);
  }

  if ((metrics.get('fid') || 0) > thresholds.fidThreshold) {
    suggestions.push(...PERFORMANCE_RECOMMENDATIONS.fid);
  }

  if ((metrics.get('cls') || 0) > thresholds.clsThreshold) {
    suggestions.push(...PERFORMANCE_RECOMMENDATIONS.cls);
  }

  if ((metrics.get('fcp') || 0) > thresholds.fcpThreshold) {
    suggestions.push(...PERFORMANCE_RECOMMENDATIONS.fcp);
  }

  if ((metrics.get('tti') || 0) > thresholds.ttiThreshold) {
    suggestions.push(...PERFORMANCE_RECOMMENDATIONS.tti);
  }

  return [...new Set(suggestions)]; // Remove duplicates
};

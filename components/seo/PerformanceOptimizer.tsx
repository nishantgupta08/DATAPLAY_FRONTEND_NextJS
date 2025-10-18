// Performance Optimizer Component for Google SEO
// Implements Core Web Vitals tracking and optimization

'use client';

import { useEffect } from 'react';
import { CoreWebVitalsOptimizer, CORE_WEB_VITALS_CONFIG } from '@/lib/seo/performance/core-web-vitals';

interface PerformanceOptimizerProps {
  trackMetrics?: boolean;
  reportToAnalytics?: boolean;
  onMetricsUpdate?: (metrics: Map<string, number>) => void;
}

export default function PerformanceOptimizer({ 
  trackMetrics = true, 
  reportToAnalytics = true,
  onMetricsUpdate 
}: PerformanceOptimizerProps) {
  useEffect(() => {
    if (!trackMetrics || typeof window === 'undefined') return;

    const optimizer = CoreWebVitalsOptimizer.getInstance();
    
    // Track Core Web Vitals
    optimizer.trackMetrics();
    
    // Report metrics to analytics if enabled
    if (reportToAnalytics) {
      const interval = setInterval(() => {
        const metrics = optimizer.getMetrics();
        if (metrics.size > 0) {
          onMetricsUpdate?.(metrics);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [trackMetrics, reportToAnalytics, onMetricsUpdate]);

  return null; // This component doesn't render anything
}

// Hook for using Core Web Vitals in components
export function useCoreWebVitals() {
  const optimizer = CoreWebVitalsOptimizer.getInstance();
  
  return {
    metrics: optimizer.getMetrics(),
    checkThresholds: () => optimizer.checkThresholds(),
    trackMetrics: () => optimizer.trackMetrics()
  };
}

// Hook for performance recommendations
export function usePerformanceRecommendations() {
  const { metrics, checkThresholds } = useCoreWebVitals();
  
  const getRecommendations = () => {
    const recommendations: string[] = [];
    
    const lcp = metrics.get('lcp') || 0;
    const fid = metrics.get('fid') || 0;
    const cls = metrics.get('cls') || 0;
    const fcp = metrics.get('fcp') || 0;
    const tti = metrics.get('tti') || 0;
    
    if (lcp > CORE_WEB_VITALS_CONFIG.lcpThreshold) {
      recommendations.push('Optimize images and reduce server response time for better LCP');
    }
    
    if (fid > CORE_WEB_VITALS_CONFIG.fidThreshold) {
      recommendations.push('Minimize JavaScript execution time for better FID');
    }
    
    if (cls > CORE_WEB_VITALS_CONFIG.clsThreshold) {
      recommendations.push('Set explicit dimensions for images and avoid layout shifts');
    }
    
    if (fcp > CORE_WEB_VITALS_CONFIG.fcpThreshold) {
      recommendations.push('Optimize critical rendering path for better FCP');
    }
    
    if (tti > CORE_WEB_VITALS_CONFIG.ttiThreshold) {
      recommendations.push('Reduce JavaScript bundle size for better TTI');
    }
    
    return recommendations;
  };
  
  return {
    recommendations: getRecommendations(),
    metrics,
    isOptimized: () => {
      const thresholds = checkThresholds();
      return Object.values(thresholds).every(Boolean);
    }
  };
}

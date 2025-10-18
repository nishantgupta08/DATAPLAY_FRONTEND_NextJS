// Performance Monitoring Dashboard
// Real-time performance metrics and optimization recommendations

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useCoreWebVitals, usePerformanceRecommendations } from '@/components/seo/PerformanceOptimizer';
import { BundleSizeOptimizer } from '@/lib/performance/advanced-optimizations';

interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  tti: number;
  bundleSize: number;
  memoryUsage: number;
  renderTime: number;
}

interface PerformanceThresholds {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  tti: number;
  bundleSize: number;
}

const THRESHOLDS: PerformanceThresholds = {
  lcp: 2500,
  fid: 100,
  cls: 0.1,
  fcp: 1800,
  tti: 3800,
  bundleSize: 1024 * 1024, // 1MB
};

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: 0,
    fid: 0,
    cls: 0,
    fcp: 0,
    tti: 0,
    bundleSize: 0,
    memoryUsage: 0,
    renderTime: 0,
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  const { metrics: coreWebVitals } = useCoreWebVitals();
  const { recommendations, isOptimized } = usePerformanceRecommendations();
  const bundleOptimizer = BundleSizeOptimizer.getInstance();

  // Update metrics
  const updateMetrics = useCallback(() => {
    const newMetrics: PerformanceMetrics = {
      lcp: coreWebVitals.get('lcp') || 0,
      fid: coreWebVitals.get('fid') || 0,
      cls: coreWebVitals.get('cls') || 0,
      fcp: coreWebVitals.get('fcp') || 0,
      tti: coreWebVitals.get('tti') || 0,
      bundleSize: bundleOptimizer.getBundleSize(),
      memoryUsage: typeof performance !== 'undefined' && 'memory' in performance ? 
        (performance as { memory: { usedJSHeapSize: number } }).memory.usedJSHeapSize / 1024 / 1024 : 0,
      renderTime: 0, // This would be measured in components
    };
    
    setMetrics(newMetrics);
  }, [coreWebVitals, bundleOptimizer]);

  // Auto-refresh metrics
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, [autoRefresh, updateMetrics]);

  // Keyboard shortcut to toggle dashboard
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const getMetricColor = (value: number, threshold: number, reverse = false) => {
    const isGood = reverse ? value <= threshold : value >= threshold;
    if (isGood) return 'text-green-600';
    if (value > threshold * 1.5) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getMetricStatus = (value: number, threshold: number, reverse = false) => {
    const isGood = reverse ? value <= threshold : value >= threshold;
    if (isGood) return '✅ Good';
    if (value > threshold * 1.5) return '❌ Poor';
    return '⚠️ Needs Improvement';
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          title="Performance Dashboard (Ctrl+Shift+P)"
        >
          📊
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-xl border max-w-md">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Performance Dashboard</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`text-xs px-2 py-1 rounded ${
                autoRefresh ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {autoRefresh ? 'Auto' : 'Manual'}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {/* Core Web Vitals */}
        <div>
          <h4 className="font-medium text-sm text-gray-700 mb-2">Core Web Vitals</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>LCP:</span>
              <span className={getMetricColor(metrics.lcp, THRESHOLDS.lcp, true)}>
                {metrics.lcp.toFixed(0)}ms
              </span>
              <span className="text-gray-500">
                {getMetricStatus(metrics.lcp, THRESHOLDS.lcp, true)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>FID:</span>
              <span className={getMetricColor(metrics.fid, THRESHOLDS.fid, true)}>
                {metrics.fid.toFixed(0)}ms
              </span>
              <span className="text-gray-500">
                {getMetricStatus(metrics.fid, THRESHOLDS.fid, true)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>CLS:</span>
              <span className={getMetricColor(metrics.cls, THRESHOLDS.cls, true)}>
                {metrics.cls.toFixed(3)}
              </span>
              <span className="text-gray-500">
                {getMetricStatus(metrics.cls, THRESHOLDS.cls, true)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>FCP:</span>
              <span className={getMetricColor(metrics.fcp, THRESHOLDS.fcp, true)}>
                {metrics.fcp.toFixed(0)}ms
              </span>
              <span className="text-gray-500">
                {getMetricStatus(metrics.fcp, THRESHOLDS.fcp, true)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>TTI:</span>
              <span className={getMetricColor(metrics.tti, THRESHOLDS.tti, true)}>
                {metrics.tti.toFixed(0)}ms
              </span>
              <span className="text-gray-500">
                {getMetricStatus(metrics.tti, THRESHOLDS.tti, true)}
              </span>
            </div>
          </div>
        </div>

        {/* Bundle Size */}
        <div>
          <h4 className="font-medium text-sm text-gray-700 mb-2">Bundle Size</h4>
          <div className="text-xs">
            <div className="flex justify-between">
              <span>Size:</span>
              <span className={getMetricColor(metrics.bundleSize, THRESHOLDS.bundleSize, true)}>
                {(metrics.bundleSize / 1024).toFixed(1)}KB
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${Math.min(100, (metrics.bundleSize / THRESHOLDS.bundleSize) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Memory Usage */}
        <div>
          <h4 className="font-medium text-sm text-gray-700 mb-2">Memory Usage</h4>
          <div className="text-xs">
            <div className="flex justify-between">
              <span>Used:</span>
              <span>{metrics.memoryUsage.toFixed(1)}MB</span>
            </div>
          </div>
        </div>

        {/* Overall Status */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span>Overall Status:</span>
            <span className={isOptimized() ? 'text-green-600' : 'text-yellow-600'}>
              {isOptimized() ? '✅ Optimized' : '⚠️ Needs Attention'}
            </span>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Recommendations</h4>
            <div className="space-y-1 text-xs text-gray-600">
              {recommendations.slice(0, 3).map((rec, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-yellow-500 mr-1">•</span>
                  <span>{rec}</span>
                </div>
              ))}
              {recommendations.length > 3 && (
                <div className="text-gray-500">
                  +{recommendations.length - 3} more recommendations
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 border-t">
          <div className="flex gap-2">
            <button
              onClick={updateMetrics}
              className="flex-1 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700"
            >
              Refresh
            </button>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.open('https://pagespeed.web.dev/', '_blank');
                }
              }}
              className="flex-1 bg-gray-600 text-white text-xs py-1 px-2 rounded hover:bg-gray-700"
            >
              PageSpeed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

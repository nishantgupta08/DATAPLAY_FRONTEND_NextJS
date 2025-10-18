// Performance Monitoring Page
// Dedicated page for viewing performance metrics and optimization recommendations

'use client';

import { useState } from 'react';
import PerformanceDashboard from '@/components/performance/PerformanceDashboard';
import { useCoreWebVitals, usePerformanceRecommendations } from '@/components/seo/PerformanceOptimizer';
import { BundleSizeOptimizer } from '@/lib/performance/advanced-optimizations';

export default function PerformancePage() {
  // const [isVisible, setIsVisible] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(1000);

  const { metrics: coreWebVitals } = useCoreWebVitals();
  const { recommendations, isOptimized } = usePerformanceRecommendations();
  const bundleOptimizer = BundleSizeOptimizer.getInstance();

  // Force dashboard to be visible on this page
  // useEffect(() => {
  //   setIsVisible(true);
  // }, []);

  const getMetricStatus = (value: number, threshold: number, reverse = false) => {
    const isGood = reverse ? value <= threshold : value >= threshold;
    if (isGood) return { status: 'Good', color: 'text-green-600', bg: 'bg-green-50' };
    if (value > threshold * 1.5) return { status: 'Poor', color: 'text-red-600', bg: 'bg-red-50' };
    return { status: 'Needs Improvement', color: 'text-yellow-600', bg: 'bg-yellow-50' };
  };

  const lcp = coreWebVitals.get('lcp') || 0;
  const fid = coreWebVitals.get('fid') || 0;
  const cls = coreWebVitals.get('cls') || 0;
  const fcp = coreWebVitals.get('fcp') || 0;
  const tti = coreWebVitals.get('tti') || 0;

  const lcpStatus = getMetricStatus(lcp, 2500, true);
  const fidStatus = getMetricStatus(fid, 100, true);
  const clsStatus = getMetricStatus(cls, 0.1, true);
  const fcpStatus = getMetricStatus(fcp, 1800, true);
  const ttiStatus = getMetricStatus(tti, 3800, true);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Performance Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Real-time performance metrics and optimization recommendations
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="mr-2"
                />
                Auto Refresh
              </label>
              <label className="flex items-center">
                <span className="mr-2">Refresh Interval:</span>
                <select
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(Number(e.target.value))}
                  className="border rounded px-2 py-1"
                >
                  <option value={500}>0.5s</option>
                  <option value={1000}>1s</option>
                  <option value={2000}>2s</option>
                  <option value={5000}>5s</option>
                </select>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isOptimized() ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {isOptimized() ? '✅ Optimized' : '⚠️ Needs Attention'}
              </span>
            </div>
          </div>
        </div>

        {/* Core Web Vitals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Web Vitals</h3>
            <div className="space-y-4">
              <div className={`p-3 rounded-lg ${lcpStatus.bg}`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">LCP (Largest Contentful Paint)</span>
                  <span className={`font-bold ${lcpStatus.color}`}>
                    {lcp.toFixed(0)}ms
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Status: {lcpStatus.status} (Threshold: 2.5s)
                </div>
              </div>

              <div className={`p-3 rounded-lg ${fidStatus.bg}`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">FID (First Input Delay)</span>
                  <span className={`font-bold ${fidStatus.color}`}>
                    {fid.toFixed(0)}ms
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Status: {fidStatus.status} (Threshold: 100ms)
                </div>
              </div>

              <div className={`p-3 rounded-lg ${clsStatus.bg}`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">CLS (Cumulative Layout Shift)</span>
                  <span className={`font-bold ${clsStatus.color}`}>
                    {cls.toFixed(3)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Status: {clsStatus.status} (Threshold: 0.1)
                </div>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Metrics</h3>
            <div className="space-y-4">
              <div className={`p-3 rounded-lg ${fcpStatus.bg}`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">FCP (First Contentful Paint)</span>
                  <span className={`font-bold ${fcpStatus.color}`}>
                    {fcp.toFixed(0)}ms
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Status: {fcpStatus.status} (Threshold: 1.8s)
                </div>
              </div>

              <div className={`p-3 rounded-lg ${ttiStatus.bg}`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">TTI (Time to Interactive)</span>
                  <span className={`font-bold ${ttiStatus.color}`}>
                    {tti.toFixed(0)}ms
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Status: {ttiStatus.status} (Threshold: 3.8s)
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-50">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Bundle Size</span>
                  <span className="font-bold text-blue-600">
                    {(bundleOptimizer.getBundleSize() / 1024).toFixed(1)}KB
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {bundleOptimizer.getSizePercentage().toFixed(1)}% of limit
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-3">
              {recommendations.length > 0 ? (
                recommendations.slice(0, 5).map((rec, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-yellow-500 mr-2 mt-1">•</span>
                    <span className="text-sm text-gray-700">{rec}</span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-green-600">
                  ✅ All performance metrics are within optimal ranges!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Dashboard Component */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Performance Dashboard</h3>
          <div className="relative">
            <PerformanceDashboard />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => window.open('https://pagespeed.web.dev/', '_blank')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Test with PageSpeed Insights
            </button>
            <button
              onClick={() => window.open('https://search.google.com/test/rich-results', '_blank')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Test Rich Results
            </button>
            <button
              onClick={() => window.open('https://developers.google.com/speed/pagespeed/insights/', '_blank')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Lighthouse Audit
            </button>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.reload();
                }
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

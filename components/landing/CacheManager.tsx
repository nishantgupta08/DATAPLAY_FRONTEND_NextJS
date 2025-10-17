"use client";
import React, { useState, useEffect } from 'react';
import { GeocodingCacheService } from '@/lib/geocodingCache';

interface CacheStats {
  total: number;
  expired: number;
  valid: number;
}

export default function CacheManager() {
  const [stats, setStats] = useState<CacheStats>({ total: 0, expired: 0, valid: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    updateStats();
  }, []);

  const updateStats = () => {
    const cacheStats = GeocodingCacheService.getStats();
    setStats(cacheStats);
  };

  const clearCache = () => {
    GeocodingCacheService.clear();
    updateStats();
  };

  const refreshStats = () => {
    updateStats();
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-50 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm shadow-lg hover:bg-blue-700"
      >
        Cache Stats
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-900">Geocoding Cache</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Total entries:</span>
          <span className="font-medium">{stats.total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Valid entries:</span>
          <span className="font-medium text-green-600">{stats.valid}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Expired entries:</span>
          <span className="font-medium text-red-600">{stats.expired}</span>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <button
          onClick={refreshStats}
          className="w-full bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-200"
        >
          Refresh Stats
        </button>
        <button
          onClick={clearCache}
          className="w-full bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200"
        >
          Clear Cache
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        Cache expires after 7 days
      </div>
    </div>
  );
}

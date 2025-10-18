// Optimized YouTube Video Component
// Implements lazy loading, intersection observer, and performance optimizations

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/lib/performance/advanced-optimizations';

interface OptimizedYouTubeVideoProps {
  src: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  start?: number;
  end?: number;
  lazy?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  quality?: 'small' | 'medium' | 'large' | 'hd720' | 'hd1080' | 'highres';
  showThumbnail?: boolean;
  thumbnailQuality?: 'default' | 'medium' | 'high' | 'standard' | 'maxres';
}

export default function OptimizedYouTubeVideo({
  src,
  title = "YouTube Video",
  className = "",
  width = 560,
  height = 315,
  autoplay = false,
  muted = false,
  controls = true,
  loop = false,
  start,
  end,
  lazy = true,
  preload = 'metadata',
  quality = 'hd720',
  showThumbnail = true,
  thumbnailQuality = 'maxres',
}: OptimizedYouTubeVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  // const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Intersection Observer for lazy loading
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });
  
  const divRef = ref as React.RefObject<HTMLDivElement>;

  // Load video when it comes into view
  useEffect(() => {
    if (lazy && hasIntersected && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [lazy, hasIntersected, shouldLoad]);

  // Convert YouTube URL to optimized embed format
  const getOptimizedEmbedUrl = useCallback((url: string) => {
    if (!url) return '';
    
    // If already an embed URL, return as is
    if (url.includes('/embed/')) {
      return url;
    }
    
    // Convert regular YouTube URL to embed format
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    if (videoId) {
      let embedUrl = `https://www.youtube.com/embed/${videoId[1]}`;
      const params = new URLSearchParams();
      
      // Performance optimizations
      params.append('rel', '0'); // Don't show related videos
      params.append('modestbranding', '1'); // Minimal YouTube branding
      params.append('fs', '1'); // Allow fullscreen
      params.append('cc_load_policy', '0'); // Don't show captions by default
      params.append('enablejsapi', '1'); // Enable JavaScript API
      params.append('origin', typeof window !== 'undefined' ? window.location.origin : '');
      
      // Video quality optimization
      params.append('vq', quality);
      
      // Preload optimization
      if (preload === 'none') {
        params.append('preload', 'none');
      } else if (preload === 'metadata') {
        params.append('preload', 'metadata');
      }
      
      // User preferences
      if (autoplay) params.append('autoplay', '1');
      if (muted) params.append('mute', '1');
      if (!controls) params.append('controls', '0');
      if (loop) params.append('loop', '1');
      if (start) params.append('start', start.toString());
      if (end) params.append('end', end.toString());
      
      // Additional performance parameters
      params.append('iv_load_policy', '3'); // Hide annotations
      params.append('showinfo', '0'); // Hide video info
      params.append('playsinline', '1'); // Play inline on mobile
      
      const paramString = params.toString();
      if (paramString) {
        embedUrl += `?${paramString}`;
      }
      
      return embedUrl;
    }
    
    return url;
  }, [autoplay, muted, controls, loop, start, end, quality, preload]);

  // Get thumbnail URL for lazy loading
  const getThumbnailUrl = useCallback((url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId[1]}/${thumbnailQuality}default.jpg`;
    }
    return '';
  }, [thumbnailQuality]);

  const embedUrl = getOptimizedEmbedUrl(src);
  const thumbnailUrl = getThumbnailUrl(src);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(false);
  }, []);

  // const handlePlay = useCallback(() => {
  //   setIsPlaying(true);
  // }, []);

  // const handlePause = useCallback(() => {
  //   setIsPlaying(false);
  // }, []);

  // Preload critical resources
  useEffect(() => {
    if (shouldLoad && embedUrl) {
      // Preload the iframe source
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'document';
      link.href = embedUrl;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [shouldLoad, embedUrl]);

  // Show thumbnail while loading
  if (!shouldLoad && showThumbnail && thumbnailUrl) {
    return (
      <div 
        ref={divRef}
        className={`relative ${className}`}
        style={{ width, height }}
      >
        <div 
          className="relative w-full h-full bg-gray-200 rounded-lg cursor-pointer group"
          onClick={() => setShouldLoad(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg group-hover:bg-opacity-40 transition-all duration-300">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs opacity-75">Click to load video</p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (!shouldLoad) {
    return (
      <div 
        ref={divRef}
        className={`relative ${className}`}
        style={{ width, height }}
      >
        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-600">Loading video...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center rounded-lg z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-600">Loading video...</p>
          </div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 bg-red-50 flex items-center justify-center rounded-lg z-10">
          <div className="text-center">
            <div className="w-8 h-8 text-red-500 mx-auto mb-2">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <p className="text-sm text-red-600">Failed to load video</p>
            <button 
              onClick={() => {
                setHasError(false);
                setIsLoaded(false);
                setShouldLoad(true);
              }}
              className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        width={width}
        height={height}
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full rounded-lg transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        // Performance optimizations
        sandbox="allow-scripts allow-same-origin allow-presentation"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

// Hook for YouTube video optimization
export function useYouTubeOptimization() {
  const preloadVideo = useCallback((videoId: string) => {
    // Preload video metadata
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'document';
    link.href = `https://www.youtube.com/embed/${videoId}`;
    document.head.appendChild(link);
  }, []);

  const preloadThumbnail = useCallback((videoId: string, quality: string = 'maxres') => {
    // Preload thumbnail
    const img = new Image();
    img.src = `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
  }, []);

  const getVideoId = useCallback((url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  }, []);

  return {
    preloadVideo,
    preloadThumbnail,
    getVideoId,
  };
}

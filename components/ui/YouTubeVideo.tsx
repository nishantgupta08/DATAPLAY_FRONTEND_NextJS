"use client";

import { useState, useCallback } from 'react';

interface YouTubeVideoProps {
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
}

export default function YouTubeVideo({
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
}: YouTubeVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Convert YouTube URL to embed format if needed
  const getEmbedUrl = useCallback((url: string) => {
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
      
      if (autoplay) params.append('autoplay', '1');
      if (muted) params.append('mute', '1');
      if (!controls) params.append('controls', '0');
      if (loop) params.append('loop', '1');
      if (start) params.append('start', start.toString());
      if (end) params.append('end', end.toString());
      
      // Add additional parameters for better compatibility
      params.append('rel', '0'); // Don't show related videos
      params.append('modestbranding', '1'); // Minimal YouTube branding
      params.append('fs', '1'); // Allow fullscreen
      params.append('cc_load_policy', '0'); // Don't show captions by default
      params.append('enablejsapi', '1'); // Enable JavaScript API
      params.append('origin', typeof window !== 'undefined' ? window.location.origin : '');
      
      const paramString = params.toString();
      if (paramString) {
        embedUrl += `?${paramString}`;
      }
      
      return embedUrl;
    }
    
    return url;
  }, [autoplay, muted, controls, loop, start, end]);

  const embedUrl = getEmbedUrl(src);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoaded(false);
    setHasError(true);
  }, []);

  if (!src || !embedUrl) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center p-4">
          <div className="text-gray-500 mb-2">📹</div>
          <p className="text-sm text-gray-600">Video not available</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center p-4">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-sm text-gray-600">Failed to load video</p>
          <button 
            onClick={() => {
              setHasError(false);
              setIsLoaded(false);
            }}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-600">Loading video...</p>
          </div>
        </div>
      )}
      
      <iframe
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
      />
    </div>
  );
}

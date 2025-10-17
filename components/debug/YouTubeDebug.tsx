"use client";

import { useState, useEffect } from 'react';

interface YouTubeDebugProps {
  src: string;
  title?: string;
}

export default function YouTubeDebug({ src, title = "YouTube Video" }: YouTubeDebugProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    const info: string[] = [];
    
    // Check if we're in browser
    if (typeof window !== 'undefined') {
      info.push(`Browser: ${window.navigator.userAgent}`);
      info.push(`URL: ${window.location.href}`);
      info.push(`Video URL: ${src}`);
      
      // Check if YouTube is accessible
      fetch('https://www.youtube.com', { mode: 'no-cors' })
        .then(() => info.push('YouTube accessible: Yes'))
        .catch(() => info.push('YouTube accessible: No'));
    }
    
    setDebugInfo(info);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    setDebugInfo(prev => [...prev, 'Video loaded successfully']);
  };

  const handleError = (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    setIsLoaded(false);
    setHasError(true);
    const errorMessage = (e.nativeEvent as ErrorEvent)?.message || 'Unknown error';
    setDebugInfo(prev => [...prev, `Error: ${errorMessage}`]);
  };

  return (
    <div className="space-y-4">
      {/* Debug Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-800 mb-2">Debug Information</h3>
        <div className="space-y-1 text-sm text-yellow-700">
          {debugInfo.map((info, index) => (
            <div key={index} className="font-mono">{info}</div>
          ))}
        </div>
      </div>

      {/* Video Container */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {hasError ? (
          <div className="flex items-center justify-center h-full bg-red-50">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-2">⚠️</div>
              <p className="text-red-700 font-semibold">Video failed to load</p>
              <p className="text-red-600 text-sm mt-1">Check console for errors</p>
            </div>
          </div>
        ) : (
          <iframe
            src={src}
            title={title}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={handleLoad}
            onError={handleError}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-2" />
              <p className="text-gray-600">Loading video...</p>
            </div>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center space-x-4 text-sm">
        <span className={`px-2 py-1 rounded ${
          isLoaded ? 'bg-green-100 text-green-800' : 
          hasError ? 'bg-red-100 text-red-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          {isLoaded ? '✅ Loaded' : hasError ? '❌ Error' : '⏳ Loading'}
        </span>
        <span className="text-gray-500">
          URL: {src.length > 50 ? `${src.substring(0, 50)}...` : src}
        </span>
      </div>
    </div>
  );
}

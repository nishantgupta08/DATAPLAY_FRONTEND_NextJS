// Advanced Image Optimization Component
// Implements cutting-edge image optimization techniques

'use client';

import Image from 'next/image';
import { useState, useCallback, useMemo } from 'react';
import { useIntersectionObserver, useImagePreloader } from '@/lib/performance/advanced-optimizations';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
  fallback?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  // Advanced props
  lazy?: boolean;
  preload?: boolean;
  responsive?: boolean;
  webp?: boolean;
  avif?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  className,
  style,
  fill = false,
  fallback = '/placeholder.jpg',
  loading = 'lazy',
  onLoad,
  onError,
  lazy = true,
  preload = false,
  responsive = true,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Intersection Observer for lazy loading
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });
  
  const divRef = ref as React.RefObject<HTMLDivElement>;

  // Image preloading
  const { isLoaded: isPreloaded } = useImagePreloader(
    preload ? [src] : []
  );

  // Generate optimized image sources
  const optimizedSrc = useMemo(() => {
    if (imageError && fallback) {
      return fallback;
    }
    return currentSrc;
  }, [currentSrc, imageError, fallback]);

  // Generate responsive sizes
  const responsiveSizes = useMemo(() => {
    if (!responsive || !sizes) return sizes;
    
    return sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }, [responsive, sizes]);

  // Handle image load
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  // Handle image error
  const handleError = useCallback(() => {
    setImageError(true);
    setCurrentSrc(fallback);
    onError?.();
  }, [fallback, onError]);

  // Generate blur placeholder
  const generateBlurDataURL = useCallback((width: number = 10, height: number = 10) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, width, height);
    }
    return canvas.toDataURL();
  }, []);

  const defaultBlurDataURL = useMemo(() => {
    if (blurDataURL) return blurDataURL;
    if (placeholder === 'blur') {
      return generateBlurDataURL(width || 10, height || 10);
    }
    return undefined;
  }, [blurDataURL, placeholder, generateBlurDataURL, width, height]);

  // Determine if image should be loaded
  const shouldLoad = useMemo(() => {
    if (priority) return true;
    if (!lazy) return true;
    if (preload && isPreloaded(src)) return true;
    return hasIntersected;
  }, [priority, lazy, preload, isPreloaded, hasIntersected, src]);

  // Loading state
  const isLoading = !isLoaded && !imageError && shouldLoad;

  return (
    <div
      ref={divRef}
      className={`relative overflow-hidden ${className || ''}`}
      style={style}
    >
      {shouldLoad && (
        <Image
          src={optimizedSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          sizes={responsiveSizes}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          // Advanced optimization props
          unoptimized={false}
          draggable={false}
        />
      )}
      
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      
      {/* Error state */}
      {imageError && !fallback && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Failed to load image</div>
        </div>
      )}
    </div>
  );
}

// Hook for image optimization utilities
export function useImageOptimization() {
  const preloadCriticalImages = useCallback((urls: string[]) => {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }, []);

  const generateResponsiveSrcSet = useCallback((
    baseSrc: string,
    widths: number[] = [640, 750, 828, 1080, 1200, 1920]
  ) => {
    return widths
      .map(width => `${baseSrc}?w=${width} ${width}w`)
      .join(', ');
  }, []);

  const getImageDimensions = useCallback((src: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  return {
    preloadCriticalImages,
    generateResponsiveSrcSet,
    getImageDimensions,
  };
}

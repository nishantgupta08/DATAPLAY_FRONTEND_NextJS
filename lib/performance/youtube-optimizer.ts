// YouTube Video Performance Optimizer
// Advanced optimizations for YouTube video loading

export interface YouTubeOptimizationConfig {
  // Lazy loading settings
  lazyLoad: boolean;
  intersectionThreshold: number;
  rootMargin: string;
  
  // Preloading settings
  preloadThumbnails: boolean;
  preloadMetadata: boolean;
  thumbnailQuality: 'default' | 'medium' | 'high' | 'standard' | 'maxres';
  
  // Video quality settings
  defaultQuality: 'small' | 'medium' | 'large' | 'hd720' | 'hd1080' | 'highres';
  adaptiveQuality: boolean;
  
  // Performance settings
  enableIntersectionObserver: boolean;
  enablePreloading: boolean;
  enableThumbnailCaching: boolean;
  
  // Network optimization
  connectionType: 'slow-2g' | '2g' | '3g' | '4g' | '5g';
}

export const DEFAULT_YOUTUBE_CONFIG: YouTubeOptimizationConfig = {
  lazyLoad: true,
  intersectionThreshold: 0.1,
  rootMargin: '50px',
  preloadThumbnails: true,
  preloadMetadata: false,
  thumbnailQuality: 'maxres',
  defaultQuality: 'hd720',
  adaptiveQuality: true,
  enableIntersectionObserver: true,
  enablePreloading: true,
  enableThumbnailCaching: true,
  connectionType: '4g',
};

export class YouTubeOptimizer {
  private static instance: YouTubeOptimizer;
  private config: YouTubeOptimizationConfig;
  private thumbnailCache: Map<string, string> = new Map();
  private preloadedVideos: Set<string> = new Set();

  constructor(config: YouTubeOptimizationConfig = DEFAULT_YOUTUBE_CONFIG) {
    this.config = config;
  }

  static getInstance(): YouTubeOptimizer {
    if (!YouTubeOptimizer.instance) {
      YouTubeOptimizer.instance = new YouTubeOptimizer();
    }
    return YouTubeOptimizer.instance;
  }

  /**
   * Extract video ID from YouTube URL
   */
  extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  }

  /**
   * Generate optimized embed URL
   */
  generateOptimizedEmbedUrl(
    videoId: string,
    options: {
      autoplay?: boolean;
      muted?: boolean;
      controls?: boolean;
      loop?: boolean;
      start?: number;
      end?: number;
      quality?: string;
      preload?: string;
    } = {}
  ): string {
    const {
      autoplay = false,
      muted = false,
      controls = true,
      loop = false,
      start,
      end,
      quality = this.config.defaultQuality,
      preload = 'metadata',
    } = options;

    let embedUrl = `https://www.youtube.com/embed/${videoId}`;
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
    
    // Network optimization
    if (this.config.connectionType === 'slow-2g' || this.config.connectionType === '2g') {
      params.append('vq', 'small');
    } else if (this.config.connectionType === '3g') {
      params.append('vq', 'medium');
    }

    const paramString = params.toString();
    if (paramString) {
      embedUrl += `?${paramString}`;
    }

    return embedUrl;
  }

  /**
   * Generate thumbnail URL
   */
  generateThumbnailUrl(videoId: string, quality: string = this.config.thumbnailQuality): string {
    return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
  }

  /**
   * Preload video thumbnail
   */
  async preloadThumbnail(videoId: string): Promise<string> {
    if (this.thumbnailCache.has(videoId)) {
      return this.thumbnailCache.get(videoId)!;
    }

    const thumbnailUrl = this.generateThumbnailUrl(videoId);
    
    try {
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = thumbnailUrl;
      });
      
      this.thumbnailCache.set(videoId, thumbnailUrl);
      return thumbnailUrl;
    } catch (error) {
      console.warn(`Failed to preload thumbnail for video ${videoId}:`, error);
      return thumbnailUrl;
    }
  }

  /**
   * Preload video metadata
   */
  async preloadVideoMetadata(videoId: string): Promise<void> {
    if (this.preloadedVideos.has(videoId)) {
      return;
    }

    try {
      const embedUrl = this.generateOptimizedEmbedUrl(videoId, { preload: 'metadata' });
      
      // Create a hidden iframe to preload metadata
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = embedUrl;
      iframe.loading = 'lazy';
      
      document.body.appendChild(iframe);
      
      // Remove after a short delay
      setTimeout(() => {
        document.body.removeChild(iframe);
        this.preloadedVideos.add(videoId);
      }, 1000);
    } catch (error) {
      console.warn(`Failed to preload metadata for video ${videoId}:`, error);
    }
  }

  /**
   * Get optimal quality based on connection
   */
  getOptimalQuality(): string {
    if (!this.config.adaptiveQuality) {
      return this.config.defaultQuality;
    }

    // Check network connection
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as { connection?: { effectiveType?: string } }).connection;
      const effectiveType = connection?.effectiveType;

      switch (effectiveType) {
        case 'slow-2g':
        case '2g':
          return 'small';
        case '3g':
          return 'medium';
        case '4g':
          return 'hd720';
        default:
          return this.config.defaultQuality;
      }
    }

    return this.config.defaultQuality;
  }

  /**
   * Batch preload multiple videos
   */
  async batchPreload(videoIds: string[]): Promise<void> {
    const promises = videoIds.map(async (videoId) => {
      if (this.config.preloadThumbnails) {
        await this.preloadThumbnail(videoId);
      }
      if (this.config.preloadMetadata) {
        await this.preloadVideoMetadata(videoId);
      }
    });

    await Promise.allSettled(promises);
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    thumbnailCacheSize: number;
    preloadedVideosCount: number;
    cacheHitRate: number;
  } {
    return {
      thumbnailCacheSize: this.thumbnailCache.size,
      preloadedVideosCount: this.preloadedVideos.size,
      cacheHitRate: this.thumbnailCache.size / (this.thumbnailCache.size + this.preloadedVideos.size) || 0,
    };
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.thumbnailCache.clear();
    this.preloadedVideos.clear();
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<YouTubeOptimizationConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}

/**
 * Hook for YouTube optimization
 */
export function useYouTubeOptimization() {
  const optimizer = YouTubeOptimizer.getInstance();

  const preloadVideo = async (videoId: string) => {
    await optimizer.preloadVideoMetadata(videoId);
  };

  const preloadThumbnail = async (videoId: string) => {
    return await optimizer.preloadThumbnail(videoId);
  };

  const getOptimizedUrl = (videoId: string, options?: Record<string, unknown>) => {
    return optimizer.generateOptimizedEmbedUrl(videoId, options);
  };

  const getThumbnailUrl = (videoId: string) => {
    return optimizer.generateThumbnailUrl(videoId);
  };

  const getOptimalQuality = () => {
    return optimizer.getOptimalQuality();
  };

  return {
    preloadVideo,
    preloadThumbnail,
    getOptimizedUrl,
    getThumbnailUrl,
    getOptimalQuality,
    optimizer,
  };
}

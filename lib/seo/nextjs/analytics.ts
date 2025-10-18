// Next.js Analytics Utilities
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  pageview, 
  trackCourseView, 
  trackCourseEnrollment, 
  trackFormSubmission,
  trackScrollDepth,
  trackSearchQuery,
  trackSocialShare,
  trackPageLoadTime,
  trackError,
  trackEngagement
} from '../analytics/tracking';

// Hook for automatic page view tracking
export const usePageViewTracking = () => {
  const pathname = usePathname();
  
  useEffect(() => {
    pageview(pathname);
  }, [pathname]);
};

// Hook for course page tracking
export const useCourseTracking = (courseTitle: string, courseId: string) => {
  useEffect(() => {
    trackCourseView(courseTitle, courseId);
  }, [courseTitle, courseId]);
};

// Hook for scroll depth tracking
export const useScrollTracking = () => {
  useEffect(() => {
    let scrollDepth = 0;
    let maxScrollDepth = 0;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollDepth = Math.round((scrollTop / scrollHeight) * 100);
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track at 25%, 50%, 75%, and 100%
        if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
          trackScrollDepth(25);
        } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
          trackScrollDepth(50);
        } else if (maxScrollDepth >= 75 && maxScrollDepth < 100) {
          trackScrollDepth(75);
        } else if (maxScrollDepth >= 100) {
          trackScrollDepth(100);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

// Hook for page load time tracking
export const usePageLoadTracking = () => {
  useEffect(() => {
    const startTime = performance.now();
    
    const handleLoad = () => {
      const loadTime = Math.round(performance.now() - startTime);
      trackPageLoadTime(loadTime);
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);
};

// Hook for error tracking
export const useErrorTracking = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackError(event.message, false);
    };
    
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackError(event.reason?.toString() || 'Unhandled promise rejection', false);
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
};

// Hook for engagement tracking
export const useEngagementTracking = () => {
  useEffect(() => {
    let startTime = Date.now();
    let isActive = true;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isActive) {
          const duration = Date.now() - startTime;
          trackEngagement('page_view', duration);
          isActive = false;
        }
      } else {
        startTime = Date.now();
        isActive = true;
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};

// Hook for form tracking
export const useFormTracking = (formName: string) => {
  const handleFormSubmit = () => {
    trackFormSubmission(formName);
  };
  
  return { handleFormSubmit };
};

// Hook for search tracking
export const useSearchTracking = () => {
  const handleSearch = (query: string) => {
    trackSearchQuery(query);
  };
  
  return { handleSearch };
};

// Hook for social share tracking
export const useSocialShareTracking = () => {
  const handleSocialShare = (platform: string, content: string) => {
    trackSocialShare(platform, content);
  };
  
  return { handleSocialShare };
};

// Hook for course enrollment tracking
export const useCourseEnrollmentTracking = () => {
  const handleEnrollment = (courseTitle: string, courseId: string) => {
    trackCourseEnrollment(courseTitle, courseId);
  };
  
  return { handleEnrollment };
};

// Comprehensive analytics hook for pages
export const useAnalytics = (options?: {
  trackPageView?: boolean;
  trackScroll?: boolean;
  trackLoadTime?: boolean;
  trackErrors?: boolean;
  trackEngagement?: boolean;
  courseTitle?: string;
  courseId?: string;
}) => {
  const pathname = usePathname();
  
  // Page view tracking
  useEffect(() => {
    if (options?.trackPageView !== false) {
      pageview(pathname);
    }
  }, [pathname, options?.trackPageView]);
  
  // Course tracking
  useEffect(() => {
    if (options?.courseTitle && options?.courseId) {
      trackCourseView(options.courseTitle, options.courseId);
    }
  }, [options?.courseTitle, options?.courseId]);
  
  // Other tracking hooks
  useScrollTracking();
  usePageLoadTracking();
  useErrorTracking();
  useEngagementTracking();
};

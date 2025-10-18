// Advanced Analytics and Tracking Setup
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Google Analytics 4 Enhanced Ecommerce Events
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// Page view tracking
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Custom event tracking
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Enhanced Ecommerce Events
export const trackCourseView = (courseName: string, courseId: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'INR',
      value: 7500,
      items: [
        {
          item_id: courseId,
          item_name: courseName,
          item_category: 'Data Science Course',
          item_brand: 'Dataplay',
          price: 7500,
          currency: 'INR',
        },
      ],
    });
  }
};

export const trackCourseEnrollment = (courseName: string, courseId: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: `enrollment_${Date.now()}`,
      value: 7500,
      currency: 'INR',
      items: [
        {
          item_id: courseId,
          item_name: courseName,
          item_category: 'Data Science Course',
          item_brand: 'Dataplay',
          price: 7500,
          currency: 'INR',
        },
      ],
    });
  }
};

export const trackFormSubmission = (formName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      event_category: 'engagement',
      event_label: formName,
    });
  }
};

export const trackScrollDepth = (depth: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', {
      event_category: 'engagement',
      event_label: `${depth}%`,
      value: depth,
    });
  }
};

// Search Console integration
export const trackSearchQuery = (query: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: query,
    });
  }
};

// Social media tracking
export const trackSocialShare = (platform: string, content: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'share', {
      method: platform,
      content_type: content,
    });
  }
};

// Performance tracking
export const trackPageLoadTime = (loadTime: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: 'load',
      value: loadTime,
    });
  }
};

// Error tracking
export const trackError = (error: string, fatal: boolean = false) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error,
      fatal: fatal,
    });
  }
};

// User engagement tracking
export const trackEngagement = (action: string, duration?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_engagement', {
      engagement_time_msec: duration || 0,
      event_category: 'engagement',
      event_label: action,
    });
  }
};

// Main SEO Library Index

// Export all from sub-modules
export * from './schemas';
export * from './utils';
export * from './analytics';
export * from './config';
export * from './nextjs';
export * from './types';

// Re-export commonly used functions
export { generateOrganizationSchema, DATAPLAY_ORGANIZATION } from './schemas/organization';
export { generateCourseSchema, createDataplayCourse } from './schemas/course';
export { generateBreadcrumbSchema, BREADCRUMB_PATTERNS } from './schemas/breadcrumb';
export { generateFAQSchema, DATAPLAY_FAQS } from './schemas/faq';
export { generateWebsiteSchema, DATAPLAY_WEBSITE } from './schemas/website';
export { generateMetaTags, generateSEOTitle, generateMetaDescription, extractKeywords } from './utils/meta';
export { analyzeContent, optimizeContent, validateHeadingHierarchy } from './utils/content';
export { generateIconLinks, generateIconMetaTags, generateAllIconTags } from './utils/icons';
export { pageview, event, trackCourseView, trackCourseEnrollment, trackFormSubmission } from './analytics/tracking';

// Re-export config constants
export { SEO_CONFIG, PAGE_PRIORITIES, CHANGE_FREQUENCIES } from './config/constants';

// Re-export Next.js utilities
export { 
  generateNextJSMetadata,
  generateDefaultMetadata,
  generateCourseMetadata,
  generateFAQMetadata,
  generateLandingMetadata
} from './nextjs/metadata';

export {
  generateHomepageStructuredData,
  generateCourseStructuredData,
  generateFAQStructuredData,
  generateLandingStructuredData,
  renderStructuredData
} from './nextjs/structured-data';

export {
  usePageViewTracking,
  useCourseTracking,
  useScrollTracking,
  usePageLoadTracking,
  useErrorTracking,
  useEngagementTracking,
  useFormTracking,
  useSearchTracking,
  useSocialShareTracking,
  useCourseEnrollmentTracking,
  useAnalytics
} from './nextjs/analytics';

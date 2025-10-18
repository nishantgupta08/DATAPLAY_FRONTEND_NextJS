// Next.js SEO Utilities Index
export * from './metadata';
export * from './structured-data';
export * from './analytics';

// Re-export commonly used functions
export { 
  generateNextJSMetadata,
  generateDefaultMetadata,
  generateCourseMetadata,
  generateFAQMetadata,
  generateLandingMetadata
} from './metadata';

export {
  generateHomepageStructuredData,
  generateCourseStructuredData,
  generateFAQStructuredData,
  generateLandingStructuredData,
  renderStructuredData
} from './structured-data';

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
} from './analytics';

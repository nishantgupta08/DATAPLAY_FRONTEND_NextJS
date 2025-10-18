/**
 * @fileoverview SEO-specific TypeScript type definitions
 * @version 1.0.0
 * @author DataPlay SEO Team
 */

// Removed unused imports: BaseEntity, Course, User

// ============================================================================
// SEO CONFIGURATION TYPES
// ============================================================================

/**
 * SEO configuration interface
 */
export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string[];
  author: string;
  language: string;
  locale: string;
  robots: string;
  themeColor: string;
  backgroundColor: string;
}

/**
 * Page priority enumeration
 */
export enum PagePriority {
  HIGH = 1.0,
  MEDIUM = 0.8,
  LOW = 0.6,
  VERY_LOW = 0.4
}

/**
 * Change frequency enumeration
 */
export enum ChangeFrequency {
  ALWAYS = 'always',
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  NEVER = 'never'
}

// ============================================================================
// ORGANIZATION & BUSINESS TYPES
// ============================================================================

/**
 * Organization data for structured data
 */
export interface OrganizationData {
  name: string;
  url: string;
  logo: string;
  description: string;
  address: Address;
  contactPoint: ContactPoint;
  sameAs: string[];
  foundingDate?: string;
  numberOfEmployees?: number;
  industry?: string;
}

/**
 * Address information
 */
export interface Address {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

/**
 * Contact point information
 */
export interface ContactPoint {
  telephone: string;
  email: string;
  contactType: string;
  availableLanguage: string[];
}

// ============================================================================
// COURSE & EDUCATIONAL TYPES
// ============================================================================

/**
 * Course data for structured data
 */
export interface CourseData {
  name: string;
  description: string;
  provider: string;
  url: string;
  image?: string;
  courseMode: 'online' | 'offline' | 'blended';
  educationalLevel: 'beginner' | 'intermediate' | 'advanced';
  inLanguage: string;
  teaches: string[];
  price?: number;
  currency?: string;
  availability?: string;
  rating?: CourseRating;
  instructor?: Instructor;
}

/**
 * Course rating information
 */
export interface CourseRating {
  ratingValue: string;
  reviewCount: string;
  bestRating: string;
  worstRating: string;
}

/**
 * Instructor information
 */
export interface Instructor {
  name: string;
  type: 'Person' | 'Organization';
  url?: string;
  image?: string;
  description?: string;
}

// ============================================================================
// BREADCRUMB & NAVIGATION TYPES
// ============================================================================

/**
 * Breadcrumb item structure
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

/**
 * Breadcrumb pattern configuration
 */
export interface BreadcrumbPattern {
  course: (title: string, url: string) => BreadcrumbItem[];
  user: (name: string, url: string) => BreadcrumbItem[];
  category: (name: string, url: string) => BreadcrumbItem[];
}

// ============================================================================
// FAQ & CONTENT TYPES
// ============================================================================

/**
 * FAQ item structure
 */
export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

/**
 * Website data for structured data
 */
export interface WebsiteData {
  name: string;
  url: string;
  description: string;
  potentialAction: PotentialAction;
  publisher: OrganizationData;
}

/**
 * Potential action for search functionality
 */
export interface PotentialAction {
  target: string;
  queryInput: string;
}

// ============================================================================
// SEO DATA & CONTENT TYPES
// ============================================================================

/**
 * SEO data interface
 */
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  author?: string;
  canonical?: string;
  robots?: string;
  language?: string;
  locale?: string;
  image?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  expirationTime?: string;
  section?: string;
  tags?: string[];
}

/**
 * Geographic data for location-based SEO
 */
export interface GeographicData {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
}

/**
 * Review data for structured data
 */
export interface ReviewData {
  courseName: string;
  courseDescription: string;
  provider: string;
  rating: number;
  authorName: string;
  reviewText: string;
  datePublished: string;
}

/**
 * Event data for structured data
 */
export interface EventData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  locationUrl: string;
  organizer: string;
  organizerUrl: string;
  price: string;
  currency: string;
  availability: string;
  eventStatus: string;
}

/**
 * Local business data for structured data
 */
export interface LocalBusinessData {
  name: string;
  description: string;
  url: string;
  logo: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  openingHours: string[];
  priceRange: string;
  paymentAccepted: string;
  currenciesAccepted: string;
  areaServed: string[];
  serviceRadius: string;
  courses: Array<{
    name: string;
    description: string;
  }>;
  sameAs: string[];
  foundingDate: string;
  numberOfEmployees: string;
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
    bestRating: string;
    worstRating: string;
  };
  reviews?: Array<{
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
  }>;
}

/**
 * Content analysis result
 */
export interface ContentAnalysis {
  wordCount: number;
  readingTime: number;
  keywordDensity: Record<string, number>;
  headingStructure: HeadingStructure;
  readabilityScore: number;
  seoScore: number;
  suggestions: string[];
}

/**
 * Heading structure analysis
 */
export interface HeadingStructure {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
  total: number;
  hierarchy: boolean;
}

// ============================================================================
// ICON & ASSET TYPES
// ============================================================================

/**
 * Icon configuration
 */
export interface IconConfig {
  path: string;
  sizes: string;
  type: string;
  purpose?: string;
}

/**
 * Icon links and meta tags
 */
export interface IconTags {
  links: Array<{
    rel: string;
    href: string;
    sizes?: string;
    type?: string;
  }>;
  meta: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

// ============================================================================
// ANALYTICS & TRACKING TYPES
// ============================================================================

/**
 * Analytics event data
 */
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, unknown>;
}

/**
 * Tracking configuration
 */
export interface TrackingConfig {
  googleAnalytics?: {
    measurementId: string;
    config?: Record<string, unknown>;
  };
  googleTagManager?: {
    containerId: string;
  };
  microsoftClarity?: {
    projectId: string;
  };
  facebookPixel?: {
    pixelId: string;
  };
}

// ============================================================================
// SCHEMA.ORG TYPES
// ============================================================================

/**
 * Base schema interface
 */
export interface Schema {
  '@context': string;
  '@type': string;
  '@id'?: string;
}

/**
 * WebPage schema
 */
export interface WebPageSchema extends Schema {
  '@type': 'WebPage';
  name: string;
  description: string;
  url: string;
  isPartOf: {
    '@type': 'WebSite';
    name: string;
    url: string;
  };
  breadcrumb?: {
    '@type': 'BreadcrumbList';
    itemListElement: Array<{
      '@type': 'ListItem';
      position: number;
      name: string;
      item: string;
    }>;
  };
}

/**
 * FAQPage schema
 */
export interface FAQPageSchema extends Schema {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

/**
 * Course schema
 */
export interface CourseSchema extends Schema {
  '@type': 'Course';
  name: string;
  description: string;
  provider: {
    '@type': 'Organization';
    name: string;
    url: string;
    logo: string;
  };
  url: string;
  image?: string;
  courseMode: string;
  educationalLevel: string;
  inLanguage: string;
  teaches?: string[];
  offers?: {
    '@type': 'Offer';
    price: number;
    priceCurrency: string;
    availability: string;
    validFrom: string;
    url: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    reviewCount: string;
    bestRating: string;
    worstRating: string;
  };
  hasCourseInstance: {
    '@type': 'CourseInstance';
    courseMode: string;
    instructor: {
      '@type': string;
      name: string;
    };
  };
}

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================

// Removed unused type exports
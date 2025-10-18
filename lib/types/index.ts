/**
 * @fileoverview Core TypeScript type definitions for DataPlay application
 * @version 1.0.0
 * @author DataPlay Team
 */

// ============================================================================
// CORE APPLICATION TYPES
// ============================================================================

/**
 * Base entity interface with common properties
 */
export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * API response wrapper for consistent data structure
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// USER & AUTHENTICATION TYPES
// ============================================================================

/**
 * User role enumeration
 */
export enum UserRole {
  STUDENT = 'student',
  MENTOR = 'mentor',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

/**
 * User status enumeration
 */
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending'
}

/**
 * User profile information
 */
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  phone?: string;
  dateOfBirth?: Date;
  bio?: string;
  socialLinks?: SocialLinks;
  preferences?: UserPreferences;
}

/**
 * Social media links
 */
export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

/**
 * User preferences and settings
 */
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

/**
 * Notification settings
 */
export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

/**
 * Privacy settings
 */
export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showEmail: boolean;
  showPhone: boolean;
}

// ============================================================================
// COURSE & EDUCATION TYPES
// ============================================================================

/**
 * Course difficulty levels
 */
export enum CourseDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

/**
 * Course status enumeration
 */
export enum CourseStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  COMING_SOON = 'coming_soon'
}

/**
 * Course information
 */
export interface Course extends BaseEntity {
  title: string;
  subtitle: string;
  description: string;
  difficulty: CourseDifficulty;
  status: CourseStatus;
  duration: number; // in weeks
  price: number;
  currency: string;
  imageUrl: string;
  videoUrl?: string;
  instructor: Instructor;
  curriculum: CurriculumItem[];
  requirements: string[];
  outcomes: string[];
  tags: string[];
  rating?: CourseRating;
  enrollmentCount: number;
  nextCohortDate?: Date;
}

/**
 * Course instructor information
 */
export interface Instructor {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  expertise: string[];
  socialLinks: SocialLinks;
}

/**
 * Course curriculum structure
 */
export interface CurriculumItem {
  id: number;
  title: string;
  description: string;
  type: 'module' | 'lesson' | 'assignment' | 'quiz';
  duration: number; // in minutes
  order: number;
  isRequired: boolean;
  isCompleted?: boolean;
  subItems?: CurriculumItem[];
}

/**
 * Course rating and reviews
 */
export interface CourseRating {
  average: number;
  count: number;
  distribution: {
    [key: number]: number; // rating -> count
  };
}

/**
 * Student enrollment information
 */
export interface Enrollment extends BaseEntity {
  userId: number;
  courseId: number;
  status: EnrollmentStatus;
  progress: number; // percentage
  startDate: Date;
  endDate?: Date;
  lastAccessedAt?: Date;
  certificateUrl?: string;
}

/**
 * Enrollment status enumeration
 */
export enum EnrollmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PAUSED = 'paused',
  CANCELLED = 'cancelled'
}

// ============================================================================
// SEO & METADATA TYPES
// ============================================================================

/**
 * SEO configuration for pages
 */
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
}

/**
 * Page metadata for Next.js
 */
export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  author?: string;
  robots?: string;
  canonical?: string;
  openGraph?: OpenGraphData;
  twitter?: TwitterData;
}

/**
 * Open Graph metadata
 */
export interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  url: string;
  type: 'website' | 'article' | 'profile';
  siteName?: string;
  locale?: string;
}

/**
 * Twitter Card metadata
 */
export interface TwitterData {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description: string;
  image: string;
  creator?: string;
  site?: string;
}

// ============================================================================
// ANALYTICS & TRACKING TYPES
// ============================================================================

/**
 * Analytics event types
 */
export enum AnalyticsEventType {
  PAGE_VIEW = 'page_view',
  COURSE_VIEW = 'course_view',
  COURSE_ENROLLMENT = 'course_enrollment',
  USER_SIGNUP = 'user_signup',
  USER_LOGIN = 'user_login',
  SEARCH = 'search',
  CLICK = 'click',
  SCROLL = 'scroll',
  FORM_SUBMIT = 'form_submit'
}

/**
 * Analytics event data
 */
export interface AnalyticsEvent {
  type: AnalyticsEventType;
  properties: Record<string, unknown>;
  userId?: number;
  sessionId?: string;
  timestamp: Date;
  page?: string;
  referrer?: string;
}

// ============================================================================
// API & NETWORK TYPES
// ============================================================================

/**
 * HTTP method enumeration
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

/**
 * API endpoint configuration
 */
export interface ApiEndpoint {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * Request configuration
 */
export interface RequestConfig {
  endpoint: ApiEndpoint;
  data?: unknown;
  params?: Record<string, string>;
  signal?: AbortSignal;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Make all properties optional
 */
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Make all properties required
 */
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * Pick specific properties from type
 */
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Omit specific properties from type
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Component props with children
 */
export interface ComponentWithChildren {
  children: React.ReactNode;
}

/**
 * Component props with className
 */
export interface ComponentWithClassName {
  className?: string;
}

/**
 * Base component props
 */
export interface BaseComponentProps extends ComponentWithChildren, ComponentWithClassName {
  id?: string;
  'data-testid'?: string;
}

// ============================================================================
// FORM & VALIDATION TYPES
// ============================================================================

/**
 * Form field validation rules
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => boolean | string;
}

/**
 * Form field configuration
 */
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox';
  placeholder?: string;
  validation?: ValidationRule;
  options?: { value: string; label: string }[];
}

/**
 * Form state
 */
export interface FormState<T = Record<string, unknown>> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// ============================================================================
// EXPORT ALL TYPES
// ============================================================================


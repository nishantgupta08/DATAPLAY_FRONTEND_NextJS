// SEO Configuration Constants
import type { SEOConfig } from '../types';
import { PagePriority, ChangeFrequency } from '../types';

export const SEO_CONFIG: SEOConfig = {
  // Site Information
  siteName: 'Dataplay',
  siteUrl: 'https://dataplay.co.in',
  defaultDescription: 'Data Science Learning Platform with structured paths, interview prep, and real-world projects',
  
  // Default Meta Tags
  defaultTitle: 'Dataplay – Data Science Learning Platform',
  defaultKeywords: [
    'data science course',
    'data analyst course',
    'data engineering course',
    'python course',
    'SQL course',
    'machine learning',
    'data science training',
    'online data science course',
    'data science certification',
    'data science bootcamp',
    'data science fellowship',
    'India'
  ],
  author: 'Dataplay Team',
  language: 'en',
  locale: 'en_IN',
  robots: 'index, follow',
  themeColor: '#FF6B35',
  backgroundColor: '#FFFFFF'
};

// Page priority constants
export const PAGE_PRIORITIES = {
  HOME: PagePriority.HIGH,
  LANDING: 0.95,
  COURSES: 0.90,
  COURSE_DETAIL: 0.85,
  FAQ: 0.80,
  ABOUT: 0.70,
  CONTACT: 0.70,
  PRIVACY: 0.50,
  TERMS: 0.50
} as const;

// Change frequency constants
export const CHANGE_FREQUENCIES = {
  HOME: ChangeFrequency.WEEKLY,
  LANDING: ChangeFrequency.WEEKLY,
  COURSES: ChangeFrequency.WEEKLY,
  COURSE_DETAIL: ChangeFrequency.WEEKLY,
  FAQ: ChangeFrequency.MONTHLY,
  ABOUT: ChangeFrequency.MONTHLY,
  CONTACT: ChangeFrequency.MONTHLY,
  PRIVACY: ChangeFrequency.YEARLY,
  TERMS: ChangeFrequency.YEARLY
} as const;

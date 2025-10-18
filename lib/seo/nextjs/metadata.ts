// Next.js SEO Metadata Utilities
import type { Metadata } from 'next';
import type { SEOData } from '../types';
import { SEO_CONFIG } from '../config/constants';

// Generate Next.js metadata from SEO data
export const generateNextJSMetadata = (seoData: SEOData): Metadata => {
  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    authors: [{ name: seoData.author || SEO_CONFIG.siteName }],
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    alternates: {
      canonical: seoData.canonical,
      languages: {
        'en-IN': SEO_CONFIG.siteUrl,
        'en-US': SEO_CONFIG.siteUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: seoData.canonical,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: seoData.image || `${SEO_CONFIG.siteUrl}/Brand-Logo.svg`,
          width: 1200,
          height: 630,
          alt: seoData.title,
        },
      ],
      locale: 'en_IN',
      type: (seoData.type as 'article' | 'website' | 'book' | 'profile') || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [seoData.image || `${SEO_CONFIG.siteUrl}/Brand-Logo.svg`],
      site: '@dataplay',
      creator: '@dataplay',
    },
    verification: {
      google: 'SOdoDmVwmitkQciSMId7J2IbqHKcoyhdKRCX9VkHSYk',
    },
    category: 'Education',
    classification: 'Data Science Education',
    other: {
      'geo.region': 'IN',
      'geo.placename': 'India',
      'geo.position': '20.5937;78.9629',
      'ICBM': '20.5937, 78.9629',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': SEO_CONFIG.siteName,
      'msapplication-TileColor': '#6366f1',
      'msapplication-config': '/browserconfig.xml',
      'theme-color': '#6366f1',
    },
  };
};

// Generate default metadata for the site
export const generateDefaultMetadata = (): Metadata => {
  return generateNextJSMetadata({
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    keywords: SEO_CONFIG.defaultKeywords,
    canonical: SEO_CONFIG.siteUrl,
  });
};

// Generate course page metadata
export const generateCourseMetadata = (
  courseTitle: string,
  courseDescription: string,
  courseUrl: string,
  courseImage?: string
): Metadata => {
  return generateNextJSMetadata({
    title: `${courseTitle} | ${SEO_CONFIG.siteName}`,
    description: courseDescription,
    keywords: [
      courseTitle.toLowerCase(),
      'data science course',
      'online course',
      'data analysis',
      'python course',
      'SQL course',
      'machine learning',
      'data engineering',
      'certification',
      'India'
    ],
    canonical: courseUrl,
    image: courseImage,
    type: 'website',
  });
};

// Generate FAQ page metadata
export const generateFAQMetadata = (): Metadata => {
  return generateNextJSMetadata({
    title: `FAQ - Frequently Asked Questions | ${SEO_CONFIG.siteName}`,
    description: 'Get answers to common questions about Dataplay courses, mentorship programs, payment options, and career outcomes.',
    keywords: [
      'FAQ',
      'data science course questions',
      'data analyst course FAQ',
      'data engineering course FAQ',
      'online course support',
      'data science training questions',
      'course enrollment FAQ'
    ],
    canonical: `${SEO_CONFIG.siteUrl}/faq`,
  });
};

// Generate landing page metadata
export const generateLandingMetadata = (): Metadata => {
  return generateNextJSMetadata({
    title: `Data Science Courses in India | ${SEO_CONFIG.siteName} - Learn Data Analysis & Engineering`,
    description: 'Master data science with comprehensive courses. Learn Python, SQL, machine learning, and data engineering. Join 1000+ students across India.',
    keywords: [
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
      'India'
    ],
    canonical: `${SEO_CONFIG.siteUrl}/landing`,
  });
};

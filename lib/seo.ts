// SEO optimization utilities
import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = '/Brand-Logo.svg',
    url = 'https://dataplay.co.in',
    type = 'website' as const,
    publishedTime,
    modifiedTime,
    author = 'Dataplay',
    section,
    tags = []
  } = config;

  return {
    title: `${title} | Dataplay`,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title: `${title} | Dataplay`,
      description,
      url,
      siteName: 'Dataplay',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_IN',
      type,
      publishedTime,
      modifiedTime,
      authors: [author],
      section,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Dataplay`,
      description,
      images: [image],
      site: '@dataplay',
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
    alternates: {
      canonical: url,
    },
  };
}

// Structured data generators
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateCourseStructuredData(course: {
  name: string;
  description: string;
  provider: string;
  url: string;
  image?: string;
  duration?: string;
  level?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: course.provider,
    },
    url: course.url,
    image: course.image,
    courseMode: 'online',
    educationalLevel: course.level,
    timeRequired: course.duration,
  };
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Dataplay',
    url: 'https://dataplay.co.in',
    logo: 'https://dataplay.co.in/Brand-Logo.svg',
    description: 'Data Science Learning Platform',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.linkedin.com/company/data-play/',
      'https://www.instagram.com/dataplay_dataplay/',
    ],
  };
}

// SEO utilities
export const seoUtils = {
  // Generate meta tags for pages
  generatePageMeta: (title: string, description: string, keywords: string[] = []) => ({
    title: `${title} | Dataplay`,
    description,
    keywords: keywords.join(', '),
  }),

  // Generate canonical URL
  generateCanonicalUrl: (path: string) => `https://dataplay.co.in${path}`,

  // Generate sitemap entry
  generateSitemapEntry: (url: string, lastmod: string, changefreq: string = 'weekly', priority: number = 0.5) => ({
    url,
    lastmod,
    changefreq,
    priority,
  }),
};

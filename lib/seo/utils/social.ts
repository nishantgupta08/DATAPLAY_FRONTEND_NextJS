// Social Media SEO Utilities
import type { SEOData } from '../types';

/**
 * Social media platform configuration
 */
export interface SocialPlatform {
  name: string;
  ogProperty: string;
  twitterProperty: string;
  required: boolean;
}

/**
 * Social media platforms configuration
 */
export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    name: 'Facebook',
    ogProperty: 'og:title',
    twitterProperty: 'twitter:title',
    required: true
  },
  {
    name: 'Twitter',
    ogProperty: 'og:description',
    twitterProperty: 'twitter:description',
    required: true
  },
  {
    name: 'LinkedIn',
    ogProperty: 'og:image',
    twitterProperty: 'twitter:image',
    required: true
  }
];

/**
 * Generate social media meta tags
 */
export const generateSocialMetaTags = (seoData: SEOData) => {
  const tags = [];

  // Open Graph tags
  tags.push({ property: 'og:type', content: seoData.type || 'website' });
  tags.push({ property: 'og:url', content: seoData.canonical });
  tags.push({ property: 'og:title', content: seoData.title });
  tags.push({ property: 'og:description', content: seoData.description });
  tags.push({ property: 'og:image', content: seoData.image || 'https://dataplay.co.in/Brand-Logo.svg' });
  tags.push({ property: 'og:site_name', content: 'Dataplay' });
  tags.push({ property: 'og:locale', content: 'en_IN' });

  // Twitter Card tags
  tags.push({ property: 'twitter:card', content: 'summary_large_image' });
  tags.push({ property: 'twitter:url', content: seoData.canonical });
  tags.push({ property: 'twitter:title', content: seoData.title });
  tags.push({ property: 'twitter:description', content: seoData.description });
  tags.push({ property: 'twitter:image', content: seoData.image || 'https://dataplay.co.in/Brand-Logo.svg' });
  tags.push({ property: 'twitter:site', content: '@dataplay' });
  tags.push({ property: 'twitter:creator', content: '@dataplay' });

  return tags;
};

/**
 * Validate social media meta tags
 */
export const validateSocialMetaTags = (seoData: SEOData) => {
  const issues: string[] = [];

  // Check for required Open Graph tags
  if (!seoData.title) {
    issues.push('Missing og:title - required for social sharing');
  }

  if (!seoData.description) {
    issues.push('Missing og:description - required for social sharing');
  }

  if (!seoData.image) {
    issues.push('Missing og:image - recommended for better social sharing');
  }

  if (!seoData.canonical) {
    issues.push('Missing og:url - required for social sharing');
  }

  return {
    isValid: issues.length === 0,
    issues
  };
};

/**
 * Generate social sharing URLs
 */
export const generateSocialSharingUrls = (url: string, title: string, description: string) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`
  };
};

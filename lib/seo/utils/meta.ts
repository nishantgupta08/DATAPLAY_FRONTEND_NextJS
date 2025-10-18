// Meta Tags Utilities
import type { SEOData } from '../types';

// Re-export the type for backward compatibility
export type MetaData = SEOData;

export const generateMetaTags = (data: MetaData) => {
  const tags = [
    { name: 'title', content: data.title },
    { name: 'description', content: data.description },
    { name: 'keywords', content: data.keywords.join(', ') },
    { name: 'author', content: data.author || 'Dataplay' },
    { name: 'robots', content: data.robots || 'index, follow' },
    { name: 'language', content: data.language || 'English' },
    { name: 'revisit-after', content: '7 days' },
    
    // Open Graph
    { property: 'og:type', content: data.type || 'website' },
    { property: 'og:url', content: data.canonical },
    { property: 'og:title', content: data.title },
    { property: 'og:description', content: data.description },
    { property: 'og:image', content: data.image || 'https://dataplay.co.in/Brand-Logo.svg' },
    { property: 'og:site_name', content: 'Dataplay' },
    { property: 'og:locale', content: 'en_IN' },
    
    // Twitter
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:url', content: data.canonical },
    { property: 'twitter:title', content: data.title },
    { property: 'twitter:description', content: data.description },
    { property: 'twitter:image', content: data.image || 'https://dataplay.co.in/Brand-Logo.svg' },
    
    // Canonical
    { rel: 'canonical', href: data.canonical },
    
    // Geographic
    { name: 'geo.region', content: 'IN' },
    { name: 'geo.placename', content: 'India' },
    { name: 'geo.position', content: '20.5937;78.9629' },
    { name: 'ICBM', content: '20.5937, 78.9629' }
  ];
  
  return tags;
};

export const generateSEOTitle = (
  title: string,
  siteName: string = 'Dataplay',
  maxLength: number = 60
): string => {
  const fullTitle = `${title} | ${siteName}`;
  return fullTitle.length <= maxLength ? fullTitle : title;
};

export const generateMetaDescription = (
  content: string,
  maxLength: number = 160
): string => {
  if (content.length <= maxLength) return content;
  
  // Try to cut at sentence boundary
  const sentences = content.split(/[.!?]+/);
  let result = '';
  
  for (const sentence of sentences) {
    if ((result + sentence).length <= maxLength - 3) {
      result += sentence + '. ';
    } else {
      break;
    }
  }
  
  return result.trim() || content.substring(0, maxLength - 3) + '...';
};

export const extractKeywords = (content: string, maxKeywords: number = 10): string[] => {
  // Remove HTML tags and get clean text
  const cleanText = content.replace(/<[^>]*>/g, '').toLowerCase();
  
  // Common stop words to exclude
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ]);
  
  // Extract words and count frequency
  const words = cleanText
    .split(/\W+/)
    .filter(word => word.length > 2 && !stopWords.has(word))
    .reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
  // Sort by frequency and return top keywords
  return Object.entries(words)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
};

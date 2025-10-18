// Content Optimization Utilities
import type { ContentAnalysis, HeadingStructure } from '../types';

// Re-export the type for backward compatibility
export type { ContentAnalysis, HeadingStructure };

export const analyzeContent = (content: string): ContentAnalysis => {
  const cleanText = content.replace(/<[^>]*>/g, '');
  const words = cleanText.split(/\s+/).filter(word => word.length > 0);
  
  // Keyword density analysis
  const keywordCounts: Record<string, number> = {};
  words.forEach(word => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
    if (cleanWord.length > 2) {
      keywordCounts[cleanWord] = (keywordCounts[cleanWord] || 0) + 1;
    }
  });
  
  // Heading structure analysis
  // const headingMatches = content.match(/<h([1-6])[^>]*>/gi) || [];
  const headingStructure = {
    h1: (content.match(/<h1[^>]*>/gi) || []).length,
    h2: (content.match(/<h2[^>]*>/gi) || []).length,
    h3: (content.match(/<h3[^>]*>/gi) || []).length,
    h4: (content.match(/<h4[^>]*>/gi) || []).length,
    h5: (content.match(/<h5[^>]*>/gi) || []).length,
    h6: (content.match(/<h6[^>]*>/gi) || []).length,
    total: (content.match(/<h[1-6][^>]*>/gi) || []).length,
    hierarchy: true
  };
  
  // Link analysis (commented out as not used in ContentAnalysis interface)
  // const internalLinks = (content.match(/href="[^"]*dataplay\.co\.in[^"]*"/gi) || []).length;
  // const externalLinks = (content.match(/href="https?:\/\/[^"]*"/gi) || []).length - internalLinks;
  
  // Media analysis (commented out as not used in ContentAnalysis interface)
  // const images = (content.match(/<img[^>]*>/gi) || []).length;
  // const videos = (content.match(/<video[^>]*>/gi) || []).length;
  
  // Simple readability score (Flesch Reading Ease approximation)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const syllables = words.reduce((count, word) => {
    return count + Math.max(1, word.match(/[aeiouy]+/gi)?.length || 1);
  }, 0);
  
  const readabilityScore = Math.max(0, Math.min(100, 
    206.835 - (1.015 * (words.length / sentences.length)) - (84.6 * (syllables / words.length))
  ));
  
  return {
    wordCount: words.length,
    readingTime: Math.ceil(words.length / 200), // Average reading speed: 200 words per minute
    keywordDensity: keywordCounts,
    readabilityScore,
    headingStructure,
    seoScore: Math.round((readabilityScore + (headingStructure.total > 0 ? 20 : 0)) / 2),
    suggestions: []
  };
};

export const optimizeContent = (content: string, targetKeywords: string[]): string => {
  let optimized = content;
  
  // Ensure proper heading hierarchy
  if (!content.includes('<h1>')) {
    optimized = `<h1>${targetKeywords[0] || 'Main Title'}</h1>\n${optimized}`;
  }
  
  // Add internal links to important pages
  const internalLinkPatterns = [
    { pattern: /data science course/gi, link: '/courses' },
    { pattern: /data analyst/gi, link: '/courses/data-analyst' },
    { pattern: /data engineering/gi, link: '/courses/data-engineering' },
    { pattern: /FAQ/gi, link: '/faq' },
    { pattern: /contact/gi, link: '/contact' }
  ];
  
  internalLinkPatterns.forEach(({ pattern, link }) => {
    optimized = optimized.replace(pattern, (match) => 
      `<a href="${link}" title="Learn more about ${match}">${match}</a>`
    );
  });
  
  return optimized;
};

export const generateInternalLinks = (content: string): string[] => {
  const linkMatches = content.match(/href="([^"]*)"/gi) || [];
  return linkMatches.map(match => match.replace(/href="([^"]*)"/i, '$1'));
};

export const validateHeadingHierarchy = (content: string): boolean => {
  const headings = content.match(/<h([1-6])[^>]*>/gi) || [];
  const levels = headings.map(h => parseInt(h.match(/<h([1-6])/i)?.[1] || '0'));
  
  // Check if headings follow proper hierarchy
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i-1] + 1) {
      return false; // Skip heading level
    }
  }
  
  return true;
};

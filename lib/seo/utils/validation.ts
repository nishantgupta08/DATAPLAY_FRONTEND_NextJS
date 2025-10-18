// SEO Validation Utilities
import type { SEOData } from '../types';

/**
 * SEO validation result
 */
export interface SEOValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

/**
 * Validate SEO data for completeness and best practices
 */
export const validateSEOData = (seoData: SEOData): SEOValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 100;

  // Title validation
  if (!seoData.title) {
    errors.push('Title is required');
    score -= 20;
  } else if (seoData.title.length > 60) {
    warnings.push('Title should be under 60 characters for optimal display');
    score -= 5;
  } else if (seoData.title.length < 30) {
    warnings.push('Title should be at least 30 characters for better SEO');
    score -= 5;
  }

  // Description validation
  if (!seoData.description) {
    errors.push('Description is required');
    score -= 20;
  } else if (seoData.description.length > 160) {
    warnings.push('Description should be under 160 characters for optimal display');
    score -= 5;
  } else if (seoData.description.length < 120) {
    warnings.push('Description should be at least 120 characters for better SEO');
    score -= 5;
  }

  // Keywords validation
  if (!seoData.keywords || seoData.keywords.length === 0) {
    warnings.push('Keywords are recommended for better SEO');
    score -= 10;
  } else if (seoData.keywords.length > 10) {
    warnings.push('Too many keywords may be seen as spam');
    score -= 5;
  }

  // Canonical URL validation
  if (!seoData.canonical) {
    errors.push('Canonical URL is required');
    score -= 15;
  } else if (!seoData.canonical.startsWith('http')) {
    errors.push('Canonical URL must be a valid HTTP/HTTPS URL');
    score -= 10;
  }

  // Image validation
  if (seoData.image && !seoData.image.startsWith('http')) {
    warnings.push('Image URL should be absolute for better social sharing');
    score -= 5;
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    score: Math.max(0, score)
  };
};

/**
 * Validate structured data JSON-LD
 */
export const validateStructuredData = (structuredData: Record<string, unknown>): SEOValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 100;

  // Check for required @context
  if (!structuredData['@context']) {
    errors.push('Structured data must include @context');
    score -= 30;
  } else if (structuredData['@context'] !== 'https://schema.org') {
    warnings.push('@context should be "https://schema.org"');
    score -= 5;
  }

  // Check for required @type
  if (!structuredData['@type']) {
    errors.push('Structured data must include @type');
    score -= 30;
  }

  // Check for common required fields based on type
  const type = structuredData['@type'] as string;
  if (type === 'Course' && !structuredData.name) {
    errors.push('Course structured data must include name');
    score -= 20;
  }

  if (type === 'Organization' && !structuredData.name) {
    errors.push('Organization structured data must include name');
    score -= 20;
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    score: Math.max(0, score)
  };
};

/**
 * Generate SEO recommendations based on validation results
 */
export const generateSEORecommendations = (validationResult: SEOValidationResult): string[] => {
  const recommendations: string[] = [];

  if (validationResult.score < 70) {
    recommendations.push('Critical SEO issues need immediate attention');
  }

  if (validationResult.errors.length > 0) {
    recommendations.push('Fix all errors before publishing');
  }

  if (validationResult.warnings.length > 0) {
    recommendations.push('Address warnings to improve SEO performance');
  }

  if (validationResult.score >= 90) {
    recommendations.push('Excellent SEO implementation!');
  } else if (validationResult.score >= 80) {
    recommendations.push('Good SEO implementation with room for minor improvements');
  } else {
    recommendations.push('SEO implementation needs significant improvements');
  }

  return recommendations;
};

/**
 * Comprehensive SEO audit
 */
export const performSEOAudit = (seoData: SEOData, structuredData?: Record<string, unknown>) => {
  const seoValidation = validateSEOData(seoData);
  const structuredDataValidation = structuredData ? validateStructuredData(structuredData) : null;

  return {
    seo: seoValidation,
    structuredData: structuredDataValidation,
    overallScore: structuredDataValidation 
      ? Math.round((seoValidation.score + structuredDataValidation.score) / 2)
      : seoValidation.score,
    recommendations: [
      ...generateSEORecommendations(seoValidation),
      ...(structuredDataValidation ? generateSEORecommendations(structuredDataValidation) : [])
    ]
  };
};

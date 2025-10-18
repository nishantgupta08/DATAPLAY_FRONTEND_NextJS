// SEO Testing Utilities
import type { SEOData } from '../types';

/**
 * SEO testing configuration
 */
export interface SEOTestConfig {
  baseUrl: string;
  timeout: number;
  userAgent: string;
}

/**
 * SEO test result
 */
export interface SEOTestResult {
  url: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Default SEO test configuration
 */
export const DEFAULT_SEO_TEST_CONFIG: SEOTestConfig = {
  baseUrl: 'https://dataplay.co.in',
  timeout: 10000,
  userAgent: 'Mozilla/5.0 (compatible; SEO-Test-Bot/1.0)'
};

/**
 * Test if a URL is accessible and returns proper status
 */
export const testUrlAccessibility = async (
  url: string, 
  config: SEOTestConfig = DEFAULT_SEO_TEST_CONFIG
): Promise<SEOTestResult> => {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': config.userAgent
      },
      signal: AbortSignal.timeout(config.timeout)
    });

    if (response.ok) {
      return {
        url,
        status: 'pass',
        message: `URL is accessible (${response.status})`,
        details: {
          status: response.status,
          headers: Object.fromEntries(response.headers.entries())
        }
      };
    } else {
      return {
        url,
        status: 'fail',
        message: `URL returned error status: ${response.status}`,
        details: { status: response.status }
      };
    }
  } catch (error) {
    return {
      url,
      status: 'fail',
      message: `Failed to access URL: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: { error: error instanceof Error ? error.message : 'Unknown error' }
    };
  }
};

/**
 * Test meta tags on a page
 */
export const testMetaTags = (seoData: SEOData): SEOTestResult[] => {
  const results: SEOTestResult[] = [];

  // Test title
  if (!seoData.title) {
    results.push({
      url: 'meta-title',
      status: 'fail',
      message: 'Title meta tag is missing'
    });
  } else if (seoData.title.length > 60) {
    results.push({
      url: 'meta-title',
      status: 'warning',
      message: `Title is too long (${seoData.title.length} characters). Should be under 60.`
    });
  } else {
    results.push({
      url: 'meta-title',
      status: 'pass',
      message: 'Title meta tag is properly configured'
    });
  }

  // Test description
  if (!seoData.description) {
    results.push({
      url: 'meta-description',
      status: 'fail',
      message: 'Description meta tag is missing'
    });
  } else if (seoData.description.length > 160) {
    results.push({
      url: 'meta-description',
      status: 'warning',
      message: `Description is too long (${seoData.description.length} characters). Should be under 160.`
    });
  } else {
    results.push({
      url: 'meta-description',
      status: 'pass',
      message: 'Description meta tag is properly configured'
    });
  }

  // Test canonical URL
  if (!seoData.canonical) {
    results.push({
      url: 'canonical-url',
      status: 'fail',
      message: 'Canonical URL is missing'
    });
  } else if (!seoData.canonical.startsWith('http')) {
    results.push({
      url: 'canonical-url',
      status: 'fail',
      message: 'Canonical URL must be absolute (start with http/https)'
    });
  } else {
    results.push({
      url: 'canonical-url',
      status: 'pass',
      message: 'Canonical URL is properly configured'
    });
  }

  return results;
};

/**
 * Test structured data validity
 */
export const testStructuredData = (structuredData: Record<string, unknown>): SEOTestResult[] => {
  const results: SEOTestResult[] = [];

  // Test @context
  if (!structuredData['@context']) {
    results.push({
      url: 'structured-data-context',
      status: 'fail',
      message: 'Structured data missing @context'
    });
  } else if (structuredData['@context'] !== 'https://schema.org') {
    results.push({
      url: 'structured-data-context',
      status: 'warning',
      message: 'Structured data @context should be "https://schema.org"'
    });
  } else {
    results.push({
      url: 'structured-data-context',
      status: 'pass',
      message: 'Structured data @context is correct'
    });
  }

  // Test @type
  if (!structuredData['@type']) {
    results.push({
      url: 'structured-data-type',
      status: 'fail',
      message: 'Structured data missing @type'
    });
  } else {
    results.push({
      url: 'structured-data-type',
      status: 'pass',
      message: `Structured data @type is set to ${structuredData['@type']}`
    });
  }

  return results;
};

/**
 * Comprehensive SEO test suite
 */
export const runSEOTestSuite = async (
  seoData: SEOData,
  structuredData?: Record<string, unknown>,
  config: SEOTestConfig = DEFAULT_SEO_TEST_CONFIG
) => {
  const results: SEOTestResult[] = [];

  // Test URL accessibility
  if (seoData.canonical) {
    const urlTest = await testUrlAccessibility(seoData.canonical, config);
    results.push(urlTest);
  }

  // Test meta tags
  const metaTests = testMetaTags(seoData);
  results.push(...metaTests);

  // Test structured data
  if (structuredData) {
    const structuredDataTests = testStructuredData(structuredData);
    results.push(...structuredDataTests);
  }

  // Calculate overall score
  const totalTests = results.length;
  const passedTests = results.filter(r => r.status === 'pass').length;
  const failedTests = results.filter(r => r.status === 'fail').length;
  const warningTests = results.filter(r => r.status === 'warning').length;

  return {
    results,
    summary: {
      total: totalTests,
      passed: passedTests,
      failed: failedTests,
      warnings: warningTests,
      score: Math.round((passedTests / totalTests) * 100)
    }
  };
};

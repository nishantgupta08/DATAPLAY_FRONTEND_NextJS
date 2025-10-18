// Enhanced Meta Tags for Google SEO Best Practices
// Implements Google's latest meta tag guidelines and recommendations

export interface EnhancedMetaTags {
  // Basic meta tags
  title: string;
  description: string;
  keywords: string[];
  
  // Open Graph tags
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  ogSiteName: string;
  ogLocale: string;
  
  // Twitter Card tags
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterSite: string;
  twitterCreator: string;
  
  // Technical SEO tags
  canonical: string;
  robots: string;
  language: string;
  author: string;
  publisher: string;
  
  // Geographic tags
  geoRegion: string;
  geoPlacename: string;
  geoPosition: string;
  icbm: string;
  
  // Mobile and app tags
  viewport: string;
  themeColor: string;
  mobileWebAppCapable: string;
  appleMobileWebAppCapable: string;
  appleMobileWebAppStatusBarStyle: string;
  appleMobileWebAppTitle: string;
  
  // Performance tags
  dnsPrefetch: string[];
  preconnect: string[];
  preload: string[];
  
  // Security tags
  contentSecurityPolicy: string;
  xFrameOptions: string;
  xContentTypeOptions: string;
  xXSSProtection: string;
  referrerPolicy: string;
  
  // Additional SEO tags
  revisitAfter: string;
  rating: string;
  distribution: string;
  target: string;
  classification: string;
  category: string;
  coverage: string;
  audience: string;
  expires: string;
  lastModified: string;
  generator: string;
  replyTo: string;
  owner: string;
  url: string;
  identifier: string;
  directory: string;
  pagename: string;
  coAuthor: string;
  syndicationSource: string;
  originalSource: string;
  originalPublicationDate: string;
  originalAuthor: string;
  originalTitle: string;
  originalDescription: string;
  originalImage: string;
  originalUrl: string;
  originalSiteName: string;
  originalLocale: string;
  originalType: string;
  originalTags: string[];
  originalKeywords: string[];
  originalCategory: string;
  originalAudience: string;
  originalTarget: string;
  originalDistribution: string;
  originalRating: string;
  originalCoverage: string;
  originalClassification: string;
  originalGenerator: string;
  originalReplyTo: string;
  originalOwner: string;
  originalIdentifier: string;
  originalDirectory: string;
  originalPagename: string;
  originalCoAuthor: string;
  originalSyndicationSource: string;
}

/**
 * Generate enhanced meta tags for optimal SEO
 */
export class EnhancedMetaTagGenerator {
  private baseUrl: string;
  private siteName: string;
  private defaultImage: string;

  constructor(baseUrl: string, siteName: string, defaultImage: string) {
    this.baseUrl = baseUrl;
    this.siteName = siteName;
    this.defaultImage = defaultImage;
  }

  /**
   * Generate comprehensive meta tags
   */
  generateMetaTags(data: {
    title: string;
    description: string;
    keywords: string[];
    image?: string;
    url?: string;
    type?: string;
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  }): EnhancedMetaTags {
    const url = data.url || this.baseUrl;
    const image = data.image || this.defaultImage;
    const type = data.type || 'website';
    const author = data.author || 'Dataplay Team';

    return {
      // Basic meta tags
      title: this.optimizeTitle(data.title),
      description: this.optimizeDescription(data.description),
      keywords: data.keywords,
      
      // Open Graph tags
      ogTitle: this.optimizeTitle(data.title),
      ogDescription: this.optimizeDescription(data.description),
      ogImage: image,
      ogUrl: url,
      ogType: type,
      ogSiteName: this.siteName,
      ogLocale: 'en_IN',
      
      // Twitter Card tags
      twitterCard: 'summary_large_image',
      twitterTitle: this.optimizeTitle(data.title),
      twitterDescription: this.optimizeDescription(data.description),
      twitterImage: image,
      twitterSite: '@dataplay',
      twitterCreator: '@dataplay',
      
      // Technical SEO tags
      canonical: url,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      language: 'en-IN',
      author: author,
      publisher: this.siteName,
      
      // Geographic tags
      geoRegion: 'IN',
      geoPlacename: 'India',
      geoPosition: '20.5937;78.9629',
      icbm: '20.5937, 78.9629',
      
      // Mobile and app tags
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes',
      themeColor: '#FF6B35',
      mobileWebAppCapable: 'yes',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'default',
      appleMobileWebAppTitle: this.siteName,
      
      // Performance tags
      dnsPrefetch: [
        '//fonts.googleapis.com',
        '//fonts.gstatic.com',
        '//www.google-analytics.com',
        '//www.googletagmanager.com'
      ],
      preconnect: [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com'
      ],
      preload: [
        '/Brand-Logo.svg',
        '/fonts/inter.woff2'
      ],
      
      // Security tags
      contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;",
      xFrameOptions: 'SAMEORIGIN',
      xContentTypeOptions: 'nosniff',
      xXSSProtection: '1; mode=block',
      referrerPolicy: 'strict-origin-when-cross-origin',
      
      // Additional SEO tags
      revisitAfter: '7 days',
      rating: 'general',
      distribution: 'global',
      target: 'all',
      classification: 'Education',
      category: 'Data Science Education',
      coverage: 'worldwide',
      audience: 'students, professionals, data scientists',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      lastModified: new Date().toISOString(),
      generator: 'Next.js',
      replyTo: 'contact@dataplay.co.in',
      owner: this.siteName,
      url: url,
      identifier: url,
      directory: 'yes',
      pagename: data.title,
      coAuthor: author,
      syndicationSource: this.siteName,
      originalSource: this.siteName,
      originalPublicationDate: data.publishedTime || new Date().toISOString(),
      originalAuthor: author,
      originalTitle: data.title,
      originalDescription: data.description,
      originalImage: image,
      originalUrl: url,
      originalSiteName: this.siteName,
      originalLocale: 'en_IN',
      originalType: type,
      originalTags: data.tags || [],
      originalKeywords: data.keywords,
      originalCategory: 'Education',
      originalAudience: 'students, professionals, data scientists',
      originalTarget: 'all',
      originalDistribution: 'global',
      originalRating: 'general',
      originalCoverage: 'worldwide',
      originalClassification: 'Education',
      originalGenerator: 'Next.js',
      originalReplyTo: 'contact@dataplay.co.in',
      originalOwner: this.siteName,
      originalIdentifier: url,
      originalDirectory: 'yes',
      originalPagename: data.title,
      originalCoAuthor: author,
      originalSyndicationSource: this.siteName
    };
  }

  private optimizeTitle(title: string): string {
    // Ensure title is between 30-60 characters for optimal display
    if (title.length > 60) {
      return title.substring(0, 57) + '...';
    }
    if (title.length < 30) {
      return title + ' | ' + this.siteName;
    }
    return title;
  }

  private optimizeDescription(description: string): string {
    // Ensure description is between 120-160 characters
    if (description.length > 160) {
      return description.substring(0, 157) + '...';
    }
    if (description.length < 120) {
      return description + ' Learn more about data science education and career opportunities.';
    }
    return description;
  }

  /**
   * Generate meta tags as HTML string
   */
  generateMetaTagsHTML(metaTags: EnhancedMetaTags): string {
    const tags: string[] = [];

    // Basic meta tags
    tags.push(`<title>${metaTags.title}</title>`);
    tags.push(`<meta name="description" content="${metaTags.description}" />`);
    tags.push(`<meta name="keywords" content="${metaTags.keywords.join(', ')}" />`);
    tags.push(`<meta name="author" content="${metaTags.author}" />`);
    tags.push(`<meta name="robots" content="${metaTags.robots}" />`);
    tags.push(`<meta name="language" content="${metaTags.language}" />`);
    tags.push(`<meta name="revisit-after" content="${metaTags.revisitAfter}" />`);

    // Open Graph tags
    tags.push(`<meta property="og:title" content="${metaTags.ogTitle}" />`);
    tags.push(`<meta property="og:description" content="${metaTags.ogDescription}" />`);
    tags.push(`<meta property="og:image" content="${metaTags.ogImage}" />`);
    tags.push(`<meta property="og:url" content="${metaTags.ogUrl}" />`);
    tags.push(`<meta property="og:type" content="${metaTags.ogType}" />`);
    tags.push(`<meta property="og:site_name" content="${metaTags.ogSiteName}" />`);
    tags.push(`<meta property="og:locale" content="${metaTags.ogLocale}" />`);

    // Twitter Card tags
    tags.push(`<meta name="twitter:card" content="${metaTags.twitterCard}" />`);
    tags.push(`<meta name="twitter:title" content="${metaTags.twitterTitle}" />`);
    tags.push(`<meta name="twitter:description" content="${metaTags.twitterDescription}" />`);
    tags.push(`<meta name="twitter:image" content="${metaTags.twitterImage}" />`);
    tags.push(`<meta name="twitter:site" content="${metaTags.twitterSite}" />`);
    tags.push(`<meta name="twitter:creator" content="${metaTags.twitterCreator}" />`);

    // Technical SEO tags
    tags.push(`<link rel="canonical" href="${metaTags.canonical}" />`);
    tags.push(`<meta name="publisher" content="${metaTags.publisher}" />`);

    // Geographic tags
    tags.push(`<meta name="geo.region" content="${metaTags.geoRegion}" />`);
    tags.push(`<meta name="geo.placename" content="${metaTags.geoPlacename}" />`);
    tags.push(`<meta name="geo.position" content="${metaTags.geoPosition}" />`);
    tags.push(`<meta name="ICBM" content="${metaTags.icbm}" />`);

    // Mobile and app tags
    tags.push(`<meta name="viewport" content="${metaTags.viewport}" />`);
    tags.push(`<meta name="theme-color" content="${metaTags.themeColor}" />`);
    tags.push(`<meta name="mobile-web-app-capable" content="${metaTags.mobileWebAppCapable}" />`);
    tags.push(`<meta name="apple-mobile-web-app-capable" content="${metaTags.appleMobileWebAppCapable}" />`);
    tags.push(`<meta name="apple-mobile-web-app-status-bar-style" content="${metaTags.appleMobileWebAppStatusBarStyle}" />`);
    tags.push(`<meta name="apple-mobile-web-app-title" content="${metaTags.appleMobileWebAppTitle}" />`);

    // Performance tags
    metaTags.dnsPrefetch.forEach(url => {
      tags.push(`<link rel="dns-prefetch" href="${url}" />`);
    });
    metaTags.preconnect.forEach(url => {
      tags.push(`<link rel="preconnect" href="${url}" />`);
    });
    metaTags.preload.forEach(url => {
      tags.push(`<link rel="preload" href="${url}" as="image" />`);
    });

    // Security tags
    tags.push(`<meta http-equiv="Content-Security-Policy" content="${metaTags.contentSecurityPolicy}" />`);
    tags.push(`<meta http-equiv="X-Frame-Options" content="${metaTags.xFrameOptions}" />`);
    tags.push(`<meta http-equiv="X-Content-Type-Options" content="${metaTags.xContentTypeOptions}" />`);
    tags.push(`<meta http-equiv="X-XSS-Protection" content="${metaTags.xXSSProtection}" />`);
    tags.push(`<meta name="referrer" content="${metaTags.referrerPolicy}" />`);

    // Additional SEO tags
    tags.push(`<meta name="rating" content="${metaTags.rating}" />`);
    tags.push(`<meta name="distribution" content="${metaTags.distribution}" />`);
    tags.push(`<meta name="target" content="${metaTags.target}" />`);
    tags.push(`<meta name="classification" content="${metaTags.classification}" />`);
    tags.push(`<meta name="category" content="${metaTags.category}" />`);
    tags.push(`<meta name="coverage" content="${metaTags.coverage}" />`);
    tags.push(`<meta name="audience" content="${metaTags.audience}" />`);
    tags.push(`<meta name="expires" content="${metaTags.expires}" />`);
    tags.push(`<meta name="last-modified" content="${metaTags.lastModified}" />`);
    tags.push(`<meta name="generator" content="${metaTags.generator}" />`);
    tags.push(`<meta name="reply-to" content="${metaTags.replyTo}" />`);
    tags.push(`<meta name="owner" content="${metaTags.owner}" />`);
    tags.push(`<meta name="url" content="${metaTags.url}" />`);
    tags.push(`<meta name="identifier" content="${metaTags.identifier}" />`);
    tags.push(`<meta name="directory" content="${metaTags.directory}" />`);
    tags.push(`<meta name="pagename" content="${metaTags.pagename}" />`);
    tags.push(`<meta name="co-author" content="${metaTags.coAuthor}" />`);
    tags.push(`<meta name="syndication-source" content="${metaTags.syndicationSource}" />`);

    return tags.join('\n');
  }
}

/**
 * Google SEO best practices for meta tags
 */
export const GOOGLE_SEO_BEST_PRACTICES = {
  title: [
    'Keep titles between 30-60 characters',
    'Include primary keyword at the beginning',
    'Make titles unique for each page',
    'Use action words and emotional triggers',
    'Avoid keyword stuffing'
  ],
  description: [
    'Keep descriptions between 120-160 characters',
    'Include a clear call-to-action',
    'Use active voice and compelling language',
    'Include primary keyword naturally',
    'Make descriptions unique for each page'
  ],
  keywords: [
    'Use 5-10 relevant keywords maximum',
    'Include semantic variations',
    'Focus on user intent',
    'Avoid keyword stuffing',
    'Use long-tail keywords'
  ],
  openGraph: [
    'Use high-quality images (1200x630px)',
    'Write compelling og:title and og:description',
    'Use appropriate og:type for content',
    'Include og:url for canonical reference',
    'Use og:locale for international targeting'
  ],
  twitter: [
    'Use summary_large_image for better engagement',
    'Keep Twitter titles under 70 characters',
    'Use relevant hashtags in descriptions',
    'Include Twitter handle for attribution',
    'Use high-quality images'
  ],
  technical: [
    'Always include canonical URLs',
    'Use proper robots meta tags',
    'Include viewport meta tag for mobile',
    'Use HTTPS for all URLs',
    'Implement proper redirects'
  ]
};

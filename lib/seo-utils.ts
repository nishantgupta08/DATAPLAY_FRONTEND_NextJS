// Advanced SEO Utilities for Content Optimization

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage?: string;
  structuredData?: Record<string, unknown>[];
}

// Generate optimized meta descriptions
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

// Generate SEO-friendly titles
export const generateSEOTitle = (
  title: string,
  siteName: string = 'Dataplay',
  maxLength: number = 60
): string => {
  const fullTitle = `${title} | ${siteName}`;
  return fullTitle.length <= maxLength ? fullTitle : title;
};

// Extract keywords from content
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

// Generate breadcrumb structured data
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

// Generate FAQ structured data
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Generate course structured data
export const generateCourseSchema = (course: {
  name: string;
  description: string;
  provider: string;
  url: string;
  image?: string;
  price?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.name,
  "description": course.description,
  "provider": {
    "@type": "Organization",
    "name": course.provider,
    "url": "https://dataplay.co.in"
  },
  "url": course.url,
  "image": course.image,
  "courseMode": "online",
  "educationalLevel": "beginner",
  "inLanguage": "en-IN",
  ...(course.price && {
    "offers": {
      "@type": "Offer",
      "price": course.price,
      "priceCurrency": course.currency || "INR",
      "availability": "https://schema.org/InStock"
    }
  }),
  ...(course.rating && {
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": course.rating,
      "reviewCount": course.reviewCount || 0,
      "bestRating": "5",
      "worstRating": "1"
    }
  })
});

// Generate organization structured data
export const generateOrganizationSchema = (org: {
  name: string;
  description: string;
  url: string;
  logo: string;
  address?: string;
  phone?: string;
  email?: string;
  socialMedia?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": org.name,
  "description": org.description,
  "url": org.url,
  "logo": org.logo,
  "image": org.logo,
  ...(org.address && {
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India",
      "streetAddress": org.address
    }
  }),
  ...(org.phone && {
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": org.phone,
      "contactType": "customer service"
    }
  }),
  ...(org.email && {
    "email": org.email
  }),
  ...(org.socialMedia && {
    "sameAs": org.socialMedia
  })
});

// Generate article structured data
export const generateArticleSchema = (article: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.headline,
  "description": article.description,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Dataplay",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dataplay.co.in/Brand-Logo.svg"
    }
  },
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "image": article.image,
  "url": article.url
});

// Generate local business structured data
export const generateLocalBusinessSchema = (business: {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: string;
  openingHours?: string[];
  priceRange?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": business.name,
  "description": business.description,
  "url": business.url,
  "telephone": business.telephone,
  "email": business.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": business.address,
    "addressCountry": "IN",
    "addressRegion": "India"
  },
  ...(business.openingHours && {
    "openingHours": business.openingHours
  }),
  ...(business.priceRange && {
    "priceRange": business.priceRange
  })
});

// Generate review structured data
export const generateReviewSchema = (review: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  itemReviewed: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "author": {
    "@type": "Person",
    "name": review.author
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": review.rating,
    "bestRating": "5",
    "worstRating": "1"
  },
  "reviewBody": review.reviewBody,
  "datePublished": review.datePublished,
  "itemReviewed": {
    "@type": "Thing",
    "name": review.itemReviewed
  }
});

// Generate product structured data
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  availability: string;
  brand: string;
  category: string;
  rating?: number;
  reviewCount?: number;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image,
  "brand": {
    "@type": "Brand",
    "name": product.brand
  },
  "category": product.category,
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": product.currency,
    "availability": product.availability
  },
  ...(product.rating && {
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount || 0,
      "bestRating": "5",
      "worstRating": "1"
    }
  })
});

// Generate video structured data
export const generateVideoSchema = (video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
  embedUrl: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": video.name,
  "description": video.description,
  "thumbnailUrl": video.thumbnailUrl,
  "uploadDate": video.uploadDate,
  "duration": video.duration,
  "contentUrl": video.contentUrl,
  "embedUrl": video.embedUrl
});

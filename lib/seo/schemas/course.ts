// Course Schema Generator
import type { CourseData } from '../types';

// Re-export the type for backward compatibility
export type { CourseData };

export const generateCourseSchema = (data: CourseData) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": data.name,
  "description": data.description,
  "provider": {
    "@type": "Organization",
    "name": data.provider,
    "url": "https://dataplay.co.in",
    "logo": "https://dataplay.co.in/Brand-Logo.svg"
  },
  "url": data.url,
  "image": data.image,
  "courseMode": data.courseMode || "online",
  "educationalLevel": data.educationalLevel || "beginner",
  "inLanguage": data.inLanguage || "en-IN",
  "teaches": data.teaches || [],
  ...(data.price && {
    "offers": {
      "@type": "Offer",
      "price": data.price,
      "priceCurrency": data.currency || "INR",
      "availability": data.availability || "https://schema.org/InStock",
      "validFrom": "2024-01-01",
      "url": data.url
    }
  }),
  ...(data.rating && {
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": data.rating.ratingValue,
      "reviewCount": data.rating.reviewCount,
      "bestRating": data.rating.bestRating,
      "worstRating": data.rating.worstRating
    }
  }),
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": data.courseMode || "online",
    "instructor": {
      "@type": data.instructor?.type || "Organization",
      "name": data.instructor?.name || "Dataplay Mentors"
    }
  }
});

// Default course data for Dataplay courses
export const createDataplayCourse = (name: string, description: string, url: string, image?: string): CourseData => ({
  name,
  description,
  provider: "Dataplay",
  url,
  image,
  courseMode: "online",
  educationalLevel: "beginner",
  inLanguage: "en-IN",
  teaches: ["Python", "SQL", "Machine Learning", "Data Analysis", "Data Engineering"],
  price: 7500,
  currency: "INR",
  availability: "https://schema.org/InStock",
  rating: {
    ratingValue: "4.8",
    reviewCount: "25",
    bestRating: "5",
    worstRating: "1"
  },
  instructor: {
    name: "Dataplay Mentors",
    type: "Organization"
  }
});

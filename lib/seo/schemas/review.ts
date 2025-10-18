// Review Schema Generator
import type { ReviewData } from '../types';

// Re-export the type for backward compatibility
export type { ReviewData };

export const generateReviewSchema = (data: ReviewData) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Course",
    "name": data.courseName,
    "description": data.courseDescription,
    "provider": {
      "@type": "Organization",
      "name": data.provider
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": data.rating,
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Person",
    "name": data.authorName
  },
  "reviewBody": data.reviewText,
  "datePublished": data.datePublished
});

// Default Dataplay review data
export const DATAPLAY_REVIEWS: ReviewData[] = [
  {
    courseName: "Data Analyst Track",
    courseDescription: "Comprehensive data analysis course with Python, SQL, and visualization",
    provider: "Dataplay",
    rating: 4.8,
    authorName: "Priya Sharma",
    reviewText: "Excellent course! The instructors are knowledgeable and the projects are real-world applicable. Highly recommended for anyone starting their data science journey.",
    datePublished: "2024-01-15"
  },
  {
    courseName: "Data Engineering Track", 
    courseDescription: "Advanced data engineering with cloud platforms and big data tools",
    provider: "Dataplay",
    rating: 4.9,
    authorName: "Rajesh Kumar",
    reviewText: "Outstanding curriculum covering modern data engineering practices. The hands-on approach with real projects made learning very effective.",
    datePublished: "2024-01-20"
  }
];

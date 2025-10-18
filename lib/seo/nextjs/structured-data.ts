// Next.js Structured Data Utilities
import type { 
  CourseData
} from '../types';
import { 
  generateOrganizationSchema,
  generateCourseSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebsiteSchema,
  DATAPLAY_ORGANIZATION,
  DATAPLAY_WEBSITE,
  BREADCRUMB_PATTERNS
} from '../schemas';

// Generate structured data for homepage
export const generateHomepageStructuredData = () => {
  const websiteSchema = generateWebsiteSchema(DATAPLAY_WEBSITE);
  const organizationSchema = generateOrganizationSchema(DATAPLAY_ORGANIZATION);
  
  return [websiteSchema, organizationSchema];
};

// Generate structured data for course page
export const generateCourseStructuredData = (
  courseTitle: string,
  courseDescription: string,
  courseUrl: string,
  courseImage?: string
) => {
  const courseData: CourseData = {
    name: courseTitle,
    description: courseDescription,
    provider: 'Dataplay',
    url: courseUrl,
    image: courseImage,
    courseMode: 'online',
    educationalLevel: 'beginner',
    inLanguage: 'en-IN',
    teaches: ['Python', 'SQL', 'Machine Learning', 'Data Analysis', 'Data Engineering'],
    price: 7500,
    currency: 'INR',
    availability: 'https://schema.org/InStock',
    rating: {
      ratingValue: '4.8',
      reviewCount: '25',
      bestRating: '5',
      worstRating: '1'
    },
    instructor: {
      name: 'Dataplay Mentors',
      type: 'Organization'
    }
  };
  
  const courseSchema = generateCourseSchema(courseData);
  const breadcrumbSchema = generateBreadcrumbSchema(
    BREADCRUMB_PATTERNS.course(courseTitle, courseUrl)
  );
  const organizationSchema = generateOrganizationSchema(DATAPLAY_ORGANIZATION);
  
  return [courseSchema, breadcrumbSchema, organizationSchema];
};

// Generate structured data for FAQ page
export const generateFAQStructuredData = () => {
  const faqSchema = generateFAQSchema([
    {
      question: "Who are these programs for?",
      answer: "Beginners and working professionals aiming to upskill in data and design."
    },
    {
      question: "Are classes live?",
      answer: "Yes. We run regular live cohorts with lifetime access to recordings."
    },
    {
      question: "Do you offer placement support?",
      answer: "We provide resume refactoring, mock interviews, and referrals when possible."
    },
    {
      question: "Can I get a refund?",
      answer: "If you're not satisfied within the trial window, contact support for options."
    },
    {
      question: "When does the cohort start?",
      answer: "Cohort starts 24 Oct 2025. Classes run 6–8 pm IST."
    },
    {
      question: "How do fees work?",
      answer: "Data Analyst: ₹7,500 upfront + ₹30,000 after placement. Data Engineering: ₹10,000 upfront + ₹30,000 after placement."
    },
    {
      question: "Do I keep access?",
      answer: "Yes, you get lifetime access to updated materials and recordings."
    }
  ]);
  
  const breadcrumbSchema = generateBreadcrumbSchema(BREADCRUMB_PATTERNS.faq);
  const websiteSchema = generateWebsiteSchema(DATAPLAY_WEBSITE);
  
  return [faqSchema, breadcrumbSchema, websiteSchema];
};

// Generate structured data for landing page
export const generateLandingStructuredData = () => {
  const websiteSchema = generateWebsiteSchema(DATAPLAY_WEBSITE);
  const organizationSchema = generateOrganizationSchema(DATAPLAY_ORGANIZATION);
  
  return [websiteSchema, organizationSchema];
};

// Helper function to render structured data in Next.js
export const renderStructuredData = (schemas: Record<string, unknown>[]) => {
  if (!Array.isArray(schemas) || schemas.length === 0) {
    return [];
  }

  return schemas
    .filter(schema => schema && typeof schema === 'object' && schema['@context'])
    .map((schema, index) => {
      try {
        return {
          key: `structured-data-${index}`,
          type: "application/ld+json",
          dangerouslySetInnerHTML: { 
            __html: JSON.stringify(schema, null, 0) 
          }
        };
      } catch (error) {
        console.warn('Failed to stringify structured data:', error);
        return null;
      }
    })
    .filter(Boolean);
};

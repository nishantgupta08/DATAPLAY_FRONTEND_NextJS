// Breadcrumb Schema Generator
import type { BreadcrumbItem } from '../types';

// Re-export the type for backward compatibility
export type { BreadcrumbItem };

export const generateBreadcrumbSchema = (breadcrumbs: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

// Common breadcrumb patterns for Dataplay
export const BREADCRUMB_PATTERNS = {
  home: [{ name: "Home", url: "https://dataplay.co.in", position: 1 }],
  
  courses: [
    { name: "Home", url: "https://dataplay.co.in", position: 1 },
    { name: "Courses", url: "https://dataplay.co.in/courses", position: 2 }
  ],
  
  course: (courseName: string, courseUrl: string) => [
    { name: "Home", url: "https://dataplay.co.in", position: 1 },
    { name: "Courses", url: "https://dataplay.co.in/courses", position: 2 },
    { name: courseName, url: courseUrl, position: 3 }
  ],
  
  faq: [
    { name: "Home", url: "https://dataplay.co.in", position: 1 },
    { name: "FAQ", url: "https://dataplay.co.in/faq", position: 2 }
  ],
  
  landing: [
    { name: "Home", url: "https://dataplay.co.in", position: 1 },
    { name: "Landing", url: "https://dataplay.co.in/landing", position: 2 }
  ]
};

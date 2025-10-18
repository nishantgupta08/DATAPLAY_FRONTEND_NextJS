// Website Schema Generator
import type { WebsiteData } from '../types';
import { DATAPLAY_ORGANIZATION } from './organization';

// Re-export the type for backward compatibility
export type { WebsiteData };

export const generateWebsiteSchema = (data: WebsiteData) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": data.name,
  "description": data.description,
  "url": data.url,
  "potentialAction": {
    "@type": "SearchAction",
    "target": data.potentialAction.target,
    "query-input": data.potentialAction.queryInput
  },
  ...(data.publisher && {
    "publisher": {
      "@type": "Organization",
      "name": data.publisher.name,
      "url": data.publisher.url,
      "logo": data.publisher.logo
    }
  })
});

// Default Dataplay website data
export const DATAPLAY_WEBSITE: WebsiteData = {
  name: "Dataplay",
  description: "Data Science Learning Platform with structured paths, interview prep, and real-world projects",
  url: "https://dataplay.co.in",
  potentialAction: {
    target: "https://dataplay.co.in/search?q={search_term_string}",
    queryInput: "required name=search_term_string"
  },
  publisher: DATAPLAY_ORGANIZATION
};

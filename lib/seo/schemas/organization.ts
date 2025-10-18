// Organization Schema Generator
import type { OrganizationData } from '../types';

// Re-export the type for backward compatibility
export type { OrganizationData };

export const generateOrganizationSchema = (data: OrganizationData) => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": data.name,
  "description": data.description,
  "url": data.url,
  "logo": data.logo,
  "image": data.logo,
  ...(data.foundingDate && { "foundingDate": data.foundingDate }),
  ...(data.address && {
    "address": {
      "@type": "PostalAddress",
      "addressCountry": data.address.addressCountry,
      "addressRegion": data.address.addressRegion,
      ...(data.address.streetAddress && { "streetAddress": data.address.streetAddress })
    }
  }),
  ...(data.contactPoint && {
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": data.contactPoint.telephone,
      "email": data.contactPoint.email,
      "contactType": data.contactPoint.contactType,
      "availableLanguage": data.contactPoint.availableLanguage
    }
  }),
  ...(data.sameAs && { "sameAs": data.sameAs }),
});

// Default Dataplay organization data
export const DATAPLAY_ORGANIZATION: OrganizationData = {
  name: "DataPlay",
  description: "DataPlay offers data science courses, mock interviews, real‑world projects, and skill development training.",
  url: "https://dataplay.co.in",
  logo: "https://dataplay.co.in/Brand-Logo.svg",
  foundingDate: "2023",
  address: {
    streetAddress: "123 Data Science Street",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400001",
    addressCountry: "IN"
  },
  contactPoint: {
    telephone: "+91-XXXXXXXXXX",
    email: "hr@dataplay.co.in",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"]
  },
  sameAs: [
    "https://www.linkedin.com/company/dataplay",
    "https://twitter.com/dataplay"
  ]
};

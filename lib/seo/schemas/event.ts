// Event Schema Generator
import type { EventData } from '../types';

// Re-export the type for backward compatibility
export type { EventData };

export const generateEventSchema = (data: EventData) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": data.name,
  "description": data.description,
  "startDate": data.startDate,
  "endDate": data.endDate,
  "location": {
    "@type": "VirtualLocation",
    "url": data.locationUrl
  },
  "organizer": {
    "@type": "Organization",
    "name": data.organizer,
    "url": data.organizerUrl
  },
  "offers": {
    "@type": "Offer",
    "price": data.price,
    "priceCurrency": data.currency,
    "availability": data.availability
  },
  "eventStatus": data.eventStatus,
  "eventAttendanceMode": "OnlineEventAttendanceMode"
});

// Default Dataplay event data
export const DATAPLAY_EVENTS: EventData[] = [
  {
    name: "Data Science Career Workshop",
    description: "Free workshop on data science career paths and opportunities",
    startDate: "2024-02-15T18:00:00+05:30",
    endDate: "2024-02-15T20:00:00+05:30",
    locationUrl: "https://dataplay.co.in/workshop",
    organizer: "Dataplay",
    organizerUrl: "https://dataplay.co.in",
    price: "0",
    currency: "INR",
    availability: "https://schema.org/InStock",
    eventStatus: "https://schema.org/EventScheduled"
  }
];

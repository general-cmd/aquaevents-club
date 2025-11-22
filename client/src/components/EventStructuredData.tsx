import { Helmet } from 'react-helmet-async';

interface Event {
  _id?: string;
  name: { es: string; en: string };
  date: string;
  endDate?: string;
  location: {
    city: string;
    region: string;
    venue?: string;
    address?: string;
  };
  discipline: string;
  description?: { es: string; en: string };
  registrationUrl?: string;
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  seo?: {
    canonical?: string;
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface EventStructuredDataProps {
  event: Event;
}

export default function EventStructuredData({ event }: EventStructuredDataProps) {
  // Generate event URL from canonical or ID
  const eventUrl = event.seo?.canonical || 
    `https://aquaevents.club/evento/${event._id || ''}`;
  
  // Create structured data for SportsEvent schema
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": event.name.es,
    "startDate": event.date,
    "endDate": event.endDate || event.date, // Required by Google
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location.venue || event.location.city,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.location.city,
        "addressRegion": event.location.region,
        "addressCountry": "ES"
      }
    },
    "image": [
      "https://aquaevents.club/logo.svg"
    ],
    "description": event.description?.es || `${event.name.es} en ${event.location.city}, ${event.location.region}`,
    "url": eventUrl,
    "performer": {
      "@type": "SportsTeam",
      "name": "Participantes"
    },
    "organizer": {
      "@type": "Organization",
      "name": "AquaEvents.club",
      "url": "https://aquaevents.club"
    }
  };

  // Add optional fields
  if (event.registrationUrl) {
    structuredData.url = event.registrationUrl;
    structuredData.offers = {
      "@type": "Offer",
      "url": event.registrationUrl,
      "availability": "https://schema.org/InStock"
    };
  }

  if (event.contact?.email) {
    structuredData.organizer.email = event.contact.email;
  }

  if (event.contact?.phone) {
    structuredData.organizer.telephone = event.contact.phone;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}


import { useEffect } from 'react';

interface Event {
  name: { es: string; en: string };
  date: string;
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
}

interface EventStructuredDataProps {
  event: Event;
}

export default function EventStructuredData({ event }: EventStructuredDataProps) {
  useEffect(() => {
    // Create structured data for SportsEvent schema
    const structuredData: any = {
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      "name": event.name.es,
      "startDate": event.date,
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
      "image": "https://aquaevents.club/logo.svg",
      "description": event.description?.es || `${event.name.es} en ${event.location.city}, ${event.location.region}`,
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

    // Create or update script tag
    let script = document.getElementById('event-structured-data') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'event-structured-data';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById('event-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [event]);

  return null; // This component doesn't render anything visible
}


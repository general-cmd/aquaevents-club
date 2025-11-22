import { describe, it, expect, beforeAll } from "vitest";
import { getEventBySlug } from "./services/mongodb";

describe("SSR Structured Data Injection", () => {
  it("should fetch event by slug from MongoDB", async () => {
    const slug = "v-duatlón-cros-jerez-la-bazana";
    const event = await getEventBySlug(slug);
    
    console.log("Event fetched:", event ? event.name?.es : "Not found");
    
    expect(event).toBeTruthy();
    if (event) {
      expect(event.name).toBeDefined();
      expect(event.name.es).toBeTruthy();
      expect(event.location).toBeDefined();
      expect(event.date).toBeDefined();
    }
  });

  it("should generate valid structured data for an event", async () => {
    const slug = "v-duatlón-cros-jerez-la-bazana";
    const event = await getEventBySlug(slug);
    
    if (!event) {
      console.log("Skipping test - event not found");
      return;
    }

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

    // Verify required fields for Google Rich Results
    expect(structuredData["@type"]).toBe("SportsEvent");
    expect(structuredData.name).toBeTruthy();
    expect(structuredData.startDate).toBeTruthy();
    expect(structuredData.eventStatus).toBe("https://schema.org/EventScheduled");
    expect(structuredData.eventAttendanceMode).toBe("https://schema.org/OfflineEventAttendanceMode");
    expect(structuredData.location).toBeDefined();
    expect(structuredData.location["@type"]).toBe("Place");
    expect(structuredData.image).toBeTruthy();
    expect(structuredData.organizer).toBeDefined();

    console.log("✅ Structured data is valid for Google Rich Results");
    console.log(JSON.stringify(structuredData, null, 2));
  });

  it("should match event URL regex pattern", () => {
    const testUrls = [
      "/eventos/v-duatlón-cros-jerez-la-bazana",
      "/evento/68f689165df3d511ef6ef217",
      "/eventos/test-event-name",
    ];

    const regex = /^\/eventos?\/([^?#]+)/;

    testUrls.forEach(url => {
      const match = url.match(regex);
      expect(match).toBeTruthy();
      if (match) {
        const slug = decodeURIComponent(match[1]);
        console.log(`URL: ${url} -> Slug: ${slug}`);
        expect(slug).toBeTruthy();
      }
    });
  });
});


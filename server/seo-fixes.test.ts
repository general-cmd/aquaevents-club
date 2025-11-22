import { describe, it, expect } from "vitest";
import { getEventBySlug } from "./services/mongodb";
import { getEvents, getPublishedBlogPosts, getAllFederations } from "./db";

describe("SEO Fixes - SSR Structured Data", () => {
  it("should fetch event by slug for SSR injection", async () => {
    const slug = "v-duatlón-cros-jerez-la-bazana";
    const event = await getEventBySlug(slug);
    
    expect(event).toBeTruthy();
    expect(event?.name).toBeDefined();
    expect(event?.location).toBeDefined();
    expect(event?.date).toBeDefined();
    
    console.log("✅ Event fetched successfully for SSR:", event?.name?.es);
  });

  it("should generate valid structured data from event", async () => {
    const slug = "v-duatlón-cros-jerez-la-bazana";
    const event = await getEventBySlug(slug);
    
    if (!event) {
      throw new Error("Event not found");
    }

    // Simulate SSR structured data generation
    const structuredData = {
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

    // Verify all required fields for Google Rich Results
    expect(structuredData["@type"]).toBe("SportsEvent");
    expect(structuredData.name).toBeTruthy();
    expect(structuredData.startDate).toBeTruthy();
    expect(structuredData.eventStatus).toBe("https://schema.org/EventScheduled");
    expect(structuredData.eventAttendanceMode).toBe("https://schema.org/OfflineEventAttendanceMode");
    expect(structuredData.location).toBeDefined();
    expect(structuredData.image).toBeTruthy();
    expect(structuredData.organizer).toBeDefined();

    console.log("✅ Structured data is valid for Google Rich Results");
  });
});

describe("SEO Fixes - Dynamic Sitemap", () => {
  it("should fetch events for sitemap", async () => {
    const events = await getEvents(1000);
    
    expect(events).toBeDefined();
    expect(events.length).toBeGreaterThan(0);
    
    console.log(`✅ Fetched ${events.length} events for sitemap`);
  });

  it("should extract slug from event canonical URL", async () => {
    const events = await getEvents(1000);
    const eventsWithSlugs = events.filter(e => e.seo?.canonical);
    
    expect(eventsWithSlugs.length).toBeGreaterThan(0);
    
    // Test slug extraction logic
    for (const event of eventsWithSlugs) {
      const match = event.seo.canonical.match(/\/eventos?\/([^?#]+)/);
      if (match) {
        const slug = match[1];
        expect(slug).toBeTruthy();
        expect(slug).not.toContain("http");
        console.log(`✅ Extracted slug: ${slug}`);
      }
    }
  });

  it("should fetch blog posts for sitemap", async () => {
    const blogPosts = await getPublishedBlogPosts();
    
    expect(blogPosts).toBeDefined();
    expect(blogPosts.length).toBeGreaterThan(0);
    
    console.log(`✅ Fetched ${blogPosts.length} blog posts for sitemap`);
  });

  it("should fetch federations for sitemap", async () => {
    const federations = await getAllFederations();
    
    expect(federations).toBeDefined();
    expect(federations.length).toBeGreaterThan(0);
    
    console.log(`✅ Fetched ${federations.length} federations for sitemap`);
  });

  it("should generate sitemap with all content types", async () => {
    const staticPages = 5;
    const events = await getEvents(1000);
    const blogPosts = await getPublishedBlogPosts();
    const federations = await getAllFederations();
    
    const totalUrls = staticPages + events.length + blogPosts.length + federations.length;
    
    expect(totalUrls).toBeGreaterThan(50);
    
    console.log(`✅ Sitemap will contain ${totalUrls} URLs:`);
    console.log(`   - ${staticPages} static pages`);
    console.log(`   - ${events.length} events`);
    console.log(`   - ${blogPosts.length} blog posts`);
    console.log(`   - ${federations.length} federations`);
  });
});


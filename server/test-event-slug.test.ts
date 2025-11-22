import { describe, it, expect } from "vitest";
import { getEventsCollection } from "./services/mongodb";

describe("Event Slug Extraction", () => {
  it("should fetch event and check for slug field", async () => {
    const collection = await getEventsCollection();
    const event = await collection.findOne({});
    
    console.log("\n=== Event Structure ===");
    console.log("_id:", event?._id);
    console.log("name:", event?.name);
    console.log("slug:", event?.slug);
    console.log("seo:", event?.seo);
    console.log("\nAll fields:", Object.keys(event || {}));
    
    expect(event).toBeTruthy();
  });

  it("should extract slug from canonical URL if no slug field", async () => {
    const collection = await getEventsCollection();
    const event = await collection.findOne({});
    
    if (event && event.seo?.canonical) {
      // Extract slug from canonical URL
      // Example: "https://aquaevents.club/eventos/v-duatlón-cros-jerez-la-bazana"
      const match = event.seo.canonical.match(/\/eventos?\/([^?#]+)/);
      const slug = match ? decodeURIComponent(match[1]) : null;
      
      console.log("\n=== Slug Extraction ===");
      console.log("Canonical URL:", event.seo.canonical);
      console.log("Extracted slug:", slug);
      
      expect(slug).toBeTruthy();
    }
  });
});


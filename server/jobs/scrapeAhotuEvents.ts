import { getDb } from "../db";
import { worldTriathlonEvents } from "../../drizzle/schema";
import { invokeLLM } from "../_core/llm";

interface AhotuEvent {
  title: string;
  city: string;
  date: string;
  distances: string[];
  eventType: string;
}

/**
 * Scrape German triathlon events from Ahotu
 * This is a simplified version - in production, use proper web scraping with Puppeteer
 */
export async function scrapeAhotuEvents() {
  console.log("[Ahotu Scraper] Starting scrape...");
  
  // For now, manually input the events we found
  // TODO: Implement automated scraping with Puppeteer
  const ahotuEvents: AhotuEvent[] = [
    {
      title: "IRONMAN 70.3 Kraichgau",
      city: "Östringen",
      date: "2026-05-31",
      distances: ["1.2 mi swim", "55.9 mi bike", "13.1 mi run"],
      eventType: "triathlon"
    },
    {
      title: "IRONMAN Hamburg - European Championship",
      city: "Hamburg",
      date: "2026-06-07",
      distances: ["2.4 mi swim", "111.8 mi bike", "26.1 mi run"],
      eventType: "triathlon"
    },
    {
      title: "IRONMAN European Championship Frankfurt",
      city: "Frankfurt",
      date: "2026-06-28",
      distances: ["2.4 mi swim", "111.8 mi bike", "26.1 mi run"],
      eventType: "triathlon"
    },
    {
      title: "CHALLENGE Roth",
      city: "Roth",
      date: "2026-07-05",
      distances: ["2.4 mi swim", "111.8 mi bike", "26.1 mi run"],
      eventType: "triathlon"
    },
    {
      title: "International Triple Ultra Triathlon Lensahn",
      city: "Lensahn",
      date: "2026-07-31",
      distances: ["7.1 mi swim", "335.5 mi bike", "78.7 mi run"],
      eventType: "triathlon"
    },
    {
      title: "IRONMAN 70.3 Leipzig",
      city: "Leipzig",
      date: "2026-08-23",
      distances: ["1.2 mi swim", "55.9 mi bike", "13.1 mi run"],
      eventType: "triathlon"
    },
    {
      title: "Cologne City Triathlon",
      city: "Cologne",
      date: "2026-09-06",
      distances: ["1.4 mi swim", "25 mi bike", "5.9 mi run"],
      eventType: "triathlon"
    }
  ];
  
  for (const event of ahotuEvents) {
    try {
      await processEvent(event);
    } catch (error) {
      console.error(`[Ahotu Scraper] Failed to process ${event.title}:`, error);
    }
  }
  
  console.log(`[Ahotu Scraper] Processed ${ahotuEvents.length} events`);
}

async function processEvent(event: AhotuEvent) {
  const db = await getDb();
  if (!db) {
    console.warn("[Ahotu Scraper] Database not available");
    return;
  }
  
  console.log(`[Ahotu Scraper] Processing: ${event.title}`);
  
  // Translate title to Spanish and keep German
  const translations = await translateEvent(event.title, event.city);
  
  // Generate FAQ schema
  const faqSchema = await generateFAQ(event);
  
  // Generate meta descriptions
  const metaDescription = await generateMetaDescription(event, translations);
  
  const eventId = `ahotu_${event.city.toLowerCase()}_${event.date}`;
  
  const eventData = {
    id: eventId,
    eventId: eventId,
    source: "ahotu",
    countryCode: "DE",
    title: JSON.stringify({
      en: event.title,
      es: translations.es,
      de: translations.de
    }),
    description: JSON.stringify({
      en: `${event.title} in ${event.city}. Distances: ${event.distances.join(", ")}`,
      es: `${translations.es} en ${event.city}. Distancias: ${event.distances.join(", ")}`,
      de: `${translations.de} in ${event.city}. Distanzen: ${event.distances.join(", ")}`
    }),
    metaDescription: JSON.stringify(metaDescription),
    venue: event.city,
    city: event.city,
    country: "Germany",
    latitude: "0", // TODO: Geocode city
    longitude: "0",
    date: new Date(event.date),
    finishDate: new Date(event.date),
    eventType: event.eventType,
    categories: JSON.stringify(["Triathlon"]),
    specifications: JSON.stringify(event.distances),
    worldTriathlonUrl: `https://www.ahotu.com/calendar/triathlon/germany`,
    faqSchema: JSON.stringify(faqSchema),
    lastSyncedAt: new Date(),
    published: true
  };
  
  await db.insert(worldTriathlonEvents).values(eventData).onDuplicateKeyUpdate({
    set: {
      ...eventData,
      updatedAt: new Date()
    }
  });
  
  console.log(`[Ahotu Scraper] ✓ Stored: ${event.title}`);
}

async function translateEvent(title: string, city: string): Promise<{ es: string; de: string }> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "Translate triathlon event titles. Keep brand names (IRONMAN, CHALLENGE) unchanged. Return JSON with 'es' and 'de' keys."
        },
        {
          role: "user",
          content: `Translate to Spanish and German: "${title}"`
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "translation",
          strict: true,
          schema: {
            type: "object",
            properties: {
              es: { type: "string" },
              de: { type: "string" }
            },
            required: ["es", "de"],
            additionalProperties: false
          }
        }
      }
    });
    
    const content = response.choices[0].message.content;
    return JSON.parse(typeof content === 'string' ? content : '{"es":"","de":""}');
  } catch (error) {
    console.error("[Ahotu Scraper] Translation failed:", error);
    return { es: title, de: title };
  }
}

async function generateFAQ(event: AhotuEvent): Promise<Array<any>> {
  try {
    const prompt = `
Generate 5 FAQ questions and answers for this triathlon event:
- Event: ${event.title}
- Location: ${event.city}, Germany
- Date: ${event.date}
- Distances: ${event.distances.join(", ")}

Questions should target long-tail queries like:
- "What are the distances for this triathlon?"
- "Is wetsuit allowed?"
- "What is the registration deadline?"
- "Can beginners participate?"
- "What is the cut-off time?"

Return JSON array of {question, answer} objects in English, Spanish, and German.
Format: { "faqs": [{ "question": { "en": "...", "es": "...", "de": "..." }, "answer": { "en": "...", "es": "...", "de": "..." } }] }
    `;
    
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are an expert in triathlon events." },
        { role: "user", content: prompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "faq_schema",
          strict: true,
          schema: {
            type: "object",
            properties: {
              faqs: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: {
                      type: "object",
                      properties: {
                        en: { type: "string" },
                        es: { type: "string" },
                        de: { type: "string" }
                      },
                      required: ["en", "es", "de"],
                      additionalProperties: false
                    },
                    answer: {
                      type: "object",
                      properties: {
                        en: { type: "string" },
                        es: { type: "string" },
                        de: { type: "string" }
                      },
                      required: ["en", "es", "de"],
                      additionalProperties: false
                    }
                  },
                  required: ["question", "answer"],
                  additionalProperties: false
                }
              }
            },
            required: ["faqs"],
            additionalProperties: false
          }
        }
      }
    });
    
    const content = response.choices[0].message.content;
    const result = JSON.parse(typeof content === 'string' ? content : '{}');
    return result.faqs || [];
  } catch (error) {
    console.error("[Ahotu Scraper] FAQ generation failed:", error);
    return [];
  }
}

async function generateMetaDescription(event: AhotuEvent, translations: { es: string; de: string }): Promise<Record<string, string>> {
  const date = new Date(event.date).toLocaleDateString();
  
  return {
    en: `${event.title} in ${event.city} on ${date}. Triathlon event with distances: ${event.distances.join(", ")}. Register now!`,
    es: `${translations.es} en ${event.city} el ${date}. Evento de triatlón. ¡Regístrate ahora!`,
    de: `${translations.de} in ${event.city} am ${date}. Triathlon-Veranstaltung. Jetzt anmelden!`
  };
}

// Run scraper if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  scrapeAhotuEvents()
    .then(() => {
      console.log("[Ahotu Scraper] Complete");
      process.exit(0);
    })
    .catch((error) => {
      console.error("[Ahotu Scraper] Failed:", error);
      process.exit(1);
    });
}

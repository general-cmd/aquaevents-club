import { fetchWorldTriathlonEvents, getWorldTriathlonCountryId, detectEventType, extractCity, WorldTriathlonEvent } from "../_core/worldTriathlon";
import { getDb } from "../db";
import { worldTriathlonEvents } from "../../drizzle/schema";
import { invokeLLM } from "../_core/llm";

/**
 * Sync World Triathlon events for all configured countries
 * Runs daily at 2 AM UTC via cron job
 */
export async function syncWorldTriathlonEvents() {
  const countries = ["ES", "DE"]; // Start with Spain and Germany
  
  console.log("[Sync] Starting World Triathlon event sync...");
  
  for (const countryCode of countries) {
    console.log(`[Sync] Fetching events for ${countryCode}...`);
    
    const countryId = getWorldTriathlonCountryId(countryCode);
    const wtEvents = await fetchWorldTriathlonEvents(countryId);
    
    console.log(`[Sync] Found ${wtEvents.length} events for ${countryCode}`);
    
    for (const wtEvent of wtEvents) {
      try {
        await upsertEvent(wtEvent, countryCode);
      } catch (error) {
        console.error(`[Sync] Failed to upsert event ${wtEvent.event_id}:`, error);
      }
    }
  }
  
  console.log("[Sync] Sync complete");
}

/**
 * Upsert a single event with translation and FAQ generation
 */
async function upsertEvent(wtEvent: WorldTriathlonEvent, countryCode: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Sync] Database not available, skipping event");
    return;
  }
  
  const eventId = `wt_${wtEvent.event_id}`;
  
  console.log(`[Sync] Processing event: ${wtEvent.event_title}`);
  
  // Translate title to Spanish, German, and English
  const translations = await translateText(wtEvent.event_title, "en", ["es", "de"]);
  
  // Generate FAQ schema
  const faqSchema = await generateFAQSchema(wtEvent);
  
  // Detect event type
  const eventType = detectEventType(wtEvent.event_specifications);
  
  // Extract city from venue
  const city = extractCity(wtEvent.event_venue);
  
  // Generate meta description
  const metaDescription = await generateMetaDescription(wtEvent, translations);
  
  const eventData = {
    id: eventId,
    eventId: wtEvent.event_id.toString(),
    source: "world_triathlon",
    countryCode: countryCode,
    title: JSON.stringify({
      en: wtEvent.event_title,
      es: translations.es,
      de: translations.de
    }),
    description: JSON.stringify({
      en: `${wtEvent.event_title} - ${wtEvent.event_venue}`,
      es: `${translations.es} - ${wtEvent.event_venue}`,
      de: `${translations.de} - ${wtEvent.event_venue}`
    }),
    metaDescription: JSON.stringify(metaDescription),
    venue: wtEvent.event_venue,
    city: city,
    country: wtEvent.event_country,
    latitude: wtEvent.event_latitude.toString(),
    longitude: wtEvent.event_longitude.toString(),
    date: new Date(wtEvent.event_date),
    finishDate: new Date(wtEvent.event_finish_date),
    eventType: eventType,
    categories: JSON.stringify(wtEvent.event_categories.map((c: any) => c.cat_name)),
    specifications: JSON.stringify(wtEvent.event_specifications.map((s: any) => s.cat_name)),
    worldTriathlonUrl: wtEvent.event_listing,
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
  
  console.log(`[Sync] ✓ Upserted event: ${wtEvent.event_title}`);
}

/**
 * Translate text to multiple target languages using LLM
 */
async function translateText(text: string, sourceLang: string, targetLangs: string[]): Promise<Record<string, string>> {
  const translations: Record<string, string> = {};
  
  for (const targetLang of targetLangs) {
    try {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `Translate swimming/triathlon event titles from ${sourceLang} to ${targetLang}. Keep proper nouns unchanged. Return only the translation, no explanations.`
          },
          { role: "user", content: text }
        ]
      });
      
      const content = response.choices[0].message.content;
      translations[targetLang] = typeof content === 'string' ? content.trim() : text;
    } catch (error) {
      console.error(`[Sync] Translation failed for ${targetLang}:`, error);
      translations[targetLang] = text; // Fallback to original
    }
  }
  
  return translations;
}

/**
 * Generate FAQ schema for AISEO optimization
 */
async function generateFAQSchema(wtEvent: WorldTriathlonEvent): Promise<Array<any>> {
  try {
    const eventType = wtEvent.event_specifications[0]?.cat_name || "triathlon";
    
    const prompt = `
Generate 5 FAQ questions and answers for this ${eventType} event:
- Event: ${wtEvent.event_title}
- Location: ${wtEvent.event_venue}, ${wtEvent.event_country}
- Date: ${wtEvent.event_date}

Questions should target long-tail queries like:
- "What distance is this event?"
- "Is wetsuit allowed at this event?"
- "What is the registration deadline?"
- "Can beginners participate?"
- "What are the age categories?"

Return JSON array of {question, answer} objects in English, Spanish, and German.
Format: { "faqs": [{ "question": { "en": "...", "es": "...", "de": "..." }, "answer": { "en": "...", "es": "...", "de": "..." } }] }
    `;
    
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are an expert in swimming and triathlon events." },
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
    return result.faqs;
  } catch (error) {
    console.error("[Sync] FAQ generation failed:", error);
    return [];
  }
}

/**
 * Generate SEO meta descriptions in multiple languages
 */
async function generateMetaDescription(wtEvent: WorldTriathlonEvent, translations: Record<string, string>): Promise<Record<string, string>> {
  const eventType = wtEvent.event_specifications[0]?.cat_name || "triathlon";
  const city = extractCity(wtEvent.event_venue);
  const date = new Date(wtEvent.event_date).toLocaleDateString();
  
  return {
    en: `${wtEvent.event_title} in ${city} on ${date}. Official World Triathlon ${eventType} event. Register now for this ${eventType} competition.`,
    es: `${translations.es} en ${city} el ${date}. Evento oficial de World Triathlon. Regístrate ahora para esta competición de ${eventType}.`,
    de: `${translations.de} in ${city} am ${date}. Offizielles World Triathlon ${eventType} Event. Jetzt für diesen ${eventType} Wettkampf anmelden.`
  };
}

// Run sync if executed directly (ES module check)
if (import.meta.url === `file://${process.argv[1]}`) {
  syncWorldTriathlonEvents()
    .then(() => {
      console.log("[Sync] Manual sync complete");
      process.exit(0);
    })
    .catch((error) => {
      console.error("[Sync] Manual sync failed:", error);
      process.exit(1);
    });
}

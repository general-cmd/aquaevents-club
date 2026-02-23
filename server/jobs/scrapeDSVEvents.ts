import puppeteer from 'puppeteer';
import { getDb } from '../db';
import { worldTriathlonEvents } from '../../drizzle/schema';
import { invokeLLM } from '../_core/llm';

interface DSVEvent {
  name: string;
  date: Date;
  city: string;
  venue?: string;
  type: string;
}

/**
 * Scrape swimming events from German Swimming Federation (DSV) calendar
 * URL: https://www.dsv.de/de/leistungs--und-wettkampfsport/schwimmen/wettkampf-national/kalender/
 */
export async function scrapeDSVEvents(): Promise<void> {
  console.log('[DSV Scraper] Starting DSV event scraping...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://www.dsv.de/de/leistungs--und-wettkampfsport/schwimmen/wettkampf-national/kalender/', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // Wait for calendar to load
    await page.waitForSelector('#ContentSection__fromTextBox', { timeout: 10000 });

    // Set date range (next 3 months)
    const today = new Date();
    const threeMonthsLater = new Date(today);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    };

    // Fill in date range
    await page.evaluate((fromDate, toDate) => {
      const fromInput = document.querySelector('#ContentSection__fromTextBox') as HTMLInputElement;
      const toInput = document.querySelector('#ContentSection__untilTextBox') as HTMLInputElement;
      if (fromInput) fromInput.value = fromDate;
      if (toInput) toInput.value = toDate;
    }, formatDate(today), formatDate(threeMonthsLater));

    // Click update button
    await page.click('#ContentSection__updateButton');
    
    // Wait for results to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Extract event data from the page
    const events = await page.evaluate(() => {
      const eventElements = document.querySelectorAll('.event-row, tr[class*="event"]');
      const extractedEvents: any[] = [];

      eventElements.forEach((element) => {
        try {
          // Try to extract event information
          // This is a generic approach - actual selectors may need adjustment
          const nameElement = element.querySelector('.event-name, td:nth-child(1)');
          const dateElement = element.querySelector('.event-date, td:nth-child(2)');
          const locationElement = element.querySelector('.event-location, td:nth-child(3)');

          if (nameElement && dateElement) {
            extractedEvents.push({
              name: nameElement.textContent?.trim() || '',
              date: dateElement.textContent?.trim() || '',
              location: locationElement?.textContent?.trim() || '',
            });
          }
        } catch (error) {
          console.error('Error extracting event:', error);
        }
      });

      return extractedEvents;
    });

    console.log(`[DSV Scraper] Found ${events.length} events`);

    if (events.length === 0) {
      console.warn('[DSV Scraper] No events found. The page structure may have changed.');
      console.log('[DSV Scraper] Attempting alternative extraction method...');
      
      // Alternative: Extract from table structure
      const alternativeEvents = await page.evaluate(() => {
        const tables = document.querySelectorAll('table');
        const extractedEvents: any[] = [];

        tables.forEach((table) => {
          const rows = table.querySelectorAll('tr');
          rows.forEach((row, index) => {
            if (index === 0) return; // Skip header row
            
            const cells = row.querySelectorAll('td');
            if (cells.length >= 3) {
              extractedEvents.push({
                name: cells[0]?.textContent?.trim() || '',
                date: cells[1]?.textContent?.trim() || '',
                location: cells[2]?.textContent?.trim() || '',
              });
            }
          });
        });

        return extractedEvents;
      });

      console.log(`[DSV Scraper] Alternative method found ${alternativeEvents.length} events`);
      events.push(...alternativeEvents);
    }

    // Process and store events
    const db = await getDb();
    if (!db) {
      console.error('[DSV Scraper] Database not available');
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const event of events.slice(0, 10)) { // Limit to 10 events for initial test
      try {
        // Parse date
        let eventDate: Date;
        try {
          // Try German date format (DD.MM.YYYY)
          const dateParts = event.date.split('.');
          if (dateParts.length === 3) {
            eventDate = new Date(
              parseInt(dateParts[2]),
              parseInt(dateParts[1]) - 1,
              parseInt(dateParts[0])
            );
          } else {
            eventDate = new Date(event.date);
          }
        } catch {
          console.warn(`[DSV Scraper] Could not parse date: ${event.date}`);
          continue;
        }

        // Extract city from location
        const city = event.location.split(',')[0].trim() || 'Unknown';

        // Translate event to ES/DE/EN using LLM
        const translationPrompt = `Translate this German swimming event to Spanish, German, and English. Return ONLY valid JSON with this exact structure:
{
  "title": {"es": "Spanish title", "de": "German title", "en": "English title"},
  "description": {"es": "Spanish description", "de": "German description", "en": "English description"},
  "metaDescription": {"es": "Spanish meta", "de": "German meta", "en": "English meta"}
}

Event: ${event.name}
Location: ${city}, Germany
Date: ${eventDate.toLocaleDateString('de-DE')}

Create a brief description (2-3 sentences) about this swimming competition.`;

        const translationResponse = await invokeLLM({
          messages: [
            { role: 'system', content: 'You are a professional translator specializing in sports events. Always return valid JSON.' },
            { role: 'user', content: translationPrompt },
          ],
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'event_translation',
              strict: true,
              schema: {
                type: 'object',
                properties: {
                  title: {
                    type: 'object',
                    properties: {
                      es: { type: 'string' },
                      de: { type: 'string' },
                      en: { type: 'string' },
                    },
                    required: ['es', 'de', 'en'],
                    additionalProperties: false,
                  },
                  description: {
                    type: 'object',
                    properties: {
                      es: { type: 'string' },
                      de: { type: 'string' },
                      en: { type: 'string' },
                    },
                    required: ['es', 'de', 'en'],
                    additionalProperties: false,
                  },
                  metaDescription: {
                    type: 'object',
                    properties: {
                      es: { type: 'string' },
                      de: { type: 'string' },
                      en: { type: 'string' },
                    },
                    required: ['es', 'de', 'en'],
                    additionalProperties: false,
                  },
                },
                required: ['title', 'description', 'metaDescription'],
                additionalProperties: false,
              },
            },
          },
        });

        const translationContent = translationResponse.choices[0].message.content;
        const translation = JSON.parse(typeof translationContent === 'string' ? translationContent : '{}');

        // Generate FAQ
        const faqPrompt = `Generate 3 FAQ questions and answers about this swimming event in Spanish, German, and English. Return ONLY valid JSON:
{
  "faqs": [
    {
      "question": {"es": "Spanish Q", "de": "German Q", "en": "English Q"},
      "answer": {"es": "Spanish A", "de": "German A", "en": "English A"}
    }
  ]
}

Event: ${event.name}
Location: ${city}, Germany`;

        const faqResponse = await invokeLLM({
          messages: [
            { role: 'system', content: 'You are an expert in swimming competitions. Always return valid JSON.' },
            { role: 'user', content: faqPrompt },
          ],
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'event_faq',
              strict: true,
              schema: {
                type: 'object',
                properties: {
                  faqs: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        question: {
                          type: 'object',
                          properties: {
                            es: { type: 'string' },
                            de: { type: 'string' },
                            en: { type: 'string' },
                          },
                          required: ['es', 'de', 'en'],
                          additionalProperties: false,
                        },
                        answer: {
                          type: 'object',
                          properties: {
                            es: { type: 'string' },
                            de: { type: 'string' },
                            en: { type: 'string' },
                          },
                          required: ['es', 'de', 'en'],
                          additionalProperties: false,
                        },
                      },
                      required: ['question', 'answer'],
                      additionalProperties: false,
                    },
                  },
                },
                required: ['faqs'],
                additionalProperties: false,
              },
            },
          },
        });

        const faqContent = faqResponse.choices[0].message.content;
        const faq = JSON.parse(typeof faqContent === 'string' ? faqContent : '{"faqs":[]}');

        // Insert into database
        await db.insert(worldTriathlonEvents).values({
          id: `dsv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          eventId: `dsv-${event.name.replace(/\s+/g, '-').toLowerCase()}`,
          source: 'scraped',
          title: JSON.stringify(translation.title),
          description: JSON.stringify(translation.description),
          metaDescription: JSON.stringify(translation.metaDescription),
          date: eventDate,
          city,
          venue: event.location,
          country: 'Germany',
          countryCode: 'DE',
          eventType: 'swimming',
          faqSchema: JSON.stringify(faq.faqs),
          worldTriathlonUrl: 'https://www.dsv.de/de/leistungs--und-wettkampfsport/schwimmen/wettkampf-national/kalender/',
        });

        successCount++;
        console.log(`[DSV Scraper] ✓ Imported: ${event.name} (${city})`);
      } catch (error) {
        errorCount++;
        console.error(`[DSV Scraper] ✗ Failed to import event:`, error);
      }
    }

    console.log(`[DSV Scraper] Complete: ${successCount} imported, ${errorCount} errors`);
  } catch (error) {
    console.error('[DSV Scraper] Fatal error:', error);
  } finally {
    await browser.close();
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  scrapeDSVEvents()
    .then(() => {
      console.log('[DSV Scraper] Finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('[DSV Scraper] Error:', error);
      process.exit(1);
    });
}

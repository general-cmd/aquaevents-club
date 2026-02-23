const WORLD_TRIATHLON_API_KEY = "f04e83fecd83c82a392f0a97d8505c46";
const WORLD_TRIATHLON_API_BASE = "https://api.triathlon.org/v1";

export interface WorldTriathlonEvent {
  event_id: number;
  event_title: string;
  event_slug: string;
  event_venue: string;
  event_country: string;
  event_latitude: number;
  event_longitude: number;
  event_date: string;
  event_finish_date: string;
  event_country_isoa2: string;
  event_categories: Array<{ cat_name: string; cat_id: number }>;
  event_specifications: Array<{ cat_name: string; cat_id: number }>;
  event_listing: string;
}

/**
 * Fetch events from World Triathlon API for a specific country
 */
export async function fetchWorldTriathlonEvents(countryId: number): Promise<WorldTriathlonEvent[]> {
  try {
    const response = await fetch(
      `${WORLD_TRIATHLON_API_BASE}/events?country_id=${countryId}`,
      {
        headers: {
          apikey: WORLD_TRIATHLON_API_KEY
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`World Triathlon API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`[World Triathlon API] Failed to fetch events for country ${countryId}:`, error);
    return [];
  }
}

/**
 * Map country code to World Triathlon country ID
 */
export function getWorldTriathlonCountryId(countryCode: string): number {
  const countryMap: Record<string, number> = {
    ES: 273, // Spain
    DE: 178, // Germany
    FR: 168, // France
    IT: 203, // Italy
    UK: 296  // United Kingdom
  };
  
  return countryMap[countryCode] || 273;
}

/**
 * Detect event type from specifications
 */
export function detectEventType(specifications: Array<{ cat_name: string }>): string {
  const specNames = specifications.map(s => s.cat_name.toLowerCase());
  
  if (specNames.some(s => s.includes("duathlon"))) return "duathlon";
  if (specNames.some(s => s.includes("triathlon"))) return "triathlon";
  if (specNames.some(s => s.includes("open water") || s.includes("aquathlon"))) return "open_water";
  
  return "swimming";
}

/**
 * Extract city from venue string
 */
export function extractCity(venue: string): string {
  // Simple extraction - take first part before comma
  return venue.split(",")[0].trim();
}

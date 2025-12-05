/**
 * AI-powered event content translation utility
 * Translates event titles and descriptions from Spanish to target languages
 * Uses in-memory caching to avoid repeated API calls
 */

// In-memory cache for translations
const translationCache = new Map<string, string>();

// Language name mapping for LLM prompts
const languageNames: Record<string, string> = {
  es: "Spanish",
  ca: "Catalan",
  eu: "Basque",
  gl: "Galician",
  va: "Valencian",
  en: "English"
};

/**
 * Generate cache key for translation
 */
function getCacheKey(text: string, targetLang: string): string {
  return `${targetLang}:${text}`;
}

/**
 * Translate event title using AI
 * @param spanishTitle - Original Spanish title
 * @param targetLang - Target language code (ca, eu, gl, va, en)
 * @returns Translated title or original if translation fails
 */
export async function translateEventTitle(
  spanishTitle: string,
  targetLang: string
): Promise<string> {
  // Return original if source language
  if (targetLang === 'es') {
    return spanishTitle;
  }

  // Check cache first
  const cacheKey = getCacheKey(spanishTitle, targetLang);
  const cached = translationCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const targetLanguage = languageNames[targetLang] || targetLang;
    
    const response = await fetch('/api/translate-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: spanishTitle,
        targetLang: targetLanguage,
        type: 'title'
      })
    });

    if (!response.ok) {
      console.warn(`Translation API failed for ${targetLang}:`, response.statusText);
      return spanishTitle;
    }

    const data = await response.json();
    const translated = data.translation || spanishTitle;

    // Cache the result
    translationCache.set(cacheKey, translated);

    return translated;
  } catch (error) {
    console.error('Translation error:', error);
    return spanishTitle; // Fallback to original
  }
}

/**
 * Translate event description using AI
 * @param spanishDescription - Original Spanish description
 * @param targetLang - Target language code (ca, eu, gl, va, en)
 * @returns Translated description or original if translation fails
 */
export async function translateEventDescription(
  spanishDescription: string,
  targetLang: string
): Promise<string> {
  // Return original if source language
  if (targetLang === 'es') {
    return spanishDescription;
  }

  // Check cache first
  const cacheKey = getCacheKey(spanishDescription, targetLang);
  const cached = translationCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const targetLanguage = languageNames[targetLang] || targetLang;
    
    const response = await fetch('/api/translate-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: spanishDescription,
        targetLang: targetLanguage,
        type: 'description'
      })
    });

    if (!response.ok) {
      console.warn(`Translation API failed for ${targetLang}:`, response.statusText);
      return spanishDescription;
    }

    const data = await response.json();
    const translated = data.translation || spanishDescription;

    // Cache the result
    translationCache.set(cacheKey, translated);

    return translated;
  } catch (error) {
    console.error('Translation error:', error);
    return spanishDescription; // Fallback to original
  }
}

/**
 * Batch translate multiple event titles
 * More efficient than individual calls for listing pages
 */
export async function translateEventTitles(
  titles: string[],
  targetLang: string
): Promise<Map<string, string>> {
  const results = new Map<string, string>();

  // Return originals if source language
  if (targetLang === 'es') {
    titles.forEach(title => results.set(title, title));
    return results;
  }

  // Check cache and separate uncached titles
  const uncachedTitles: string[] = [];
  titles.forEach(title => {
    const cacheKey = getCacheKey(title, targetLang);
    const cached = translationCache.get(cacheKey);
    if (cached) {
      results.set(title, cached);
    } else {
      uncachedTitles.push(title);
    }
  });

  // If all cached, return immediately
  if (uncachedTitles.length === 0) {
    return results;
  }

  // Translate uncached titles
  try {
    const targetLanguage = languageNames[targetLang] || targetLang;
    
    const response = await fetch('/api/translate-event-batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titles: uncachedTitles,
        targetLang: targetLanguage
      })
    });

    if (!response.ok) {
      // Fallback to originals
      uncachedTitles.forEach(title => results.set(title, title));
      return results;
    }

    const data = await response.json();
    const translations: Record<string, string> = data.translations || {};

    // Cache and add to results
    uncachedTitles.forEach(title => {
      const translated = translations[title] || title;
      const cacheKey = getCacheKey(title, targetLang);
      translationCache.set(cacheKey, translated);
      results.set(title, translated);
    });

    return results;
  } catch (error) {
    console.error('Batch translation error:', error);
    // Fallback to originals
    uncachedTitles.forEach(title => results.set(title, title));
    return results;
  }
}

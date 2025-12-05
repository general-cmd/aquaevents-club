/**
 * Server-side event translation using LLM
 * Translates event titles and descriptions from Spanish to target languages
 */

import { invokeLLM } from "./_core/llm";

/**
 * Translate event title using LLM
 */
export async function translateEventTitle(
  spanishTitle: string,
  targetLanguage: string
): Promise<string> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a professional translator specializing in aquatic sports events. Translate event titles from Spanish to ${targetLanguage}. Keep the translation concise, accurate, and natural. Preserve proper nouns (federation names, cities) but translate event types and categories.`
        },
        {
          role: "user",
          content: `Translate this event title to ${targetLanguage}:\n\n${spanishTitle}\n\nProvide ONLY the translated title, no explanations.`
        }
      ]
    });

    const content = response.choices[0]?.message?.content;
    const translation = typeof content === 'string' ? content.trim() : spanishTitle;
    return translation || spanishTitle;
  } catch (error) {
    console.error('[Translation] Error translating title:', error);
    return spanishTitle;
  }
}

/**
 * Translate event description using LLM
 */
export async function translateEventDescription(
  spanishDescription: string,
  targetLanguage: string
): Promise<string> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a professional translator specializing in aquatic sports events. Translate event descriptions from Spanish to ${targetLanguage}. Maintain the tone, preserve technical terms, and keep the translation natural and engaging.`
        },
        {
          role: "user",
          content: `Translate this event description to ${targetLanguage}:\n\n${spanishDescription}\n\nProvide ONLY the translated description, no explanations.`
        }
      ]
    });

    const content = response.choices[0]?.message?.content;
    const translation = typeof content === 'string' ? content.trim() : spanishDescription;
    return translation || spanishDescription;
  } catch (error) {
    console.error('[Translation] Error translating description:', error);
    return spanishDescription;
  }
}

/**
 * Batch translate multiple event titles
 * More efficient than individual calls
 */
export async function translateEventTitlesBatch(
  titles: string[],
  targetLanguage: string
): Promise<Record<string, string>> {
  try {
    const titlesText = titles.map((t, i) => `${i + 1}. ${t}`).join('\n');

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a professional translator specializing in aquatic sports events. Translate event titles from Spanish to ${targetLanguage}. Preserve proper nouns but translate event types. Return translations in the same numbered format.`
        },
        {
          role: "user",
          content: `Translate these event titles to ${targetLanguage}:\n\n${titlesText}\n\nProvide ONLY the numbered translations, one per line, no explanations.`
        }
      ]
    });

    const content = response.choices[0]?.message?.content;
    const translationsText = typeof content === 'string' ? content.trim() : '';
    if (!translationsText) {
      // Fallback: return originals
      const result: Record<string, string> = {};
      titles.forEach(title => result[title] = title);
      return result;
    }

    // Parse numbered translations
    const lines = translationsText.split('\n').filter(line => line.trim());
    const result: Record<string, string> = {};

    titles.forEach((originalTitle, index) => {
      const line: string = lines[index];
      if (line) {
        // Remove number prefix (e.g., "1. " or "1) ")
        const translated = line.replace(/^\d+[\.\)]\s*/, '').trim();
        result[originalTitle] = translated || originalTitle;
      } else {
        result[originalTitle] = originalTitle;
      }
    });

    return result;
  } catch (error) {
    console.error('[Translation] Error in batch translation:', error);
    // Fallback: return originals
    const result: Record<string, string> = {};
    titles.forEach(title => result[title] = title);
    return result;
  }
}

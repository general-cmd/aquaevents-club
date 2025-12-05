/**
 * React hook for translating event content
 * Uses tRPC to call server-side LLM translation
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { trpc } from '@/lib/trpc';

// In-memory cache for translations
const translationCache = new Map<string, string>();

function getCacheKey(text: string, lang: string): string {
  return `${lang}:${text}`;
}

/**
 * Hook to translate a single event title
 */
export function useEventTitle(spanishTitle: string | undefined): string {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [translatedTitle, setTranslatedTitle] = useState(spanishTitle || '');

  const translateMutation = trpc.translation.translateEvent.useMutation();

  useEffect(() => {
    if (!spanishTitle) {
      setTranslatedTitle('');
      return;
    }

    // Return original if Spanish
    if (currentLang === 'es') {
      setTranslatedTitle(spanishTitle);
      return;
    }

    // Check cache
    const cacheKey = getCacheKey(spanishTitle, currentLang);
    const cached = translationCache.get(cacheKey);
    if (cached) {
      setTranslatedTitle(cached);
      return;
    }

    // Translate via API
    translateMutation.mutate(
      {
        text: spanishTitle,
        targetLang: currentLang,
        type: 'title'
      },
      {
        onSuccess: (data) => {
          const translated = data.translation;
          translationCache.set(cacheKey, translated);
          setTranslatedTitle(translated);
        },
        onError: () => {
          // Fallback to original
          setTranslatedTitle(spanishTitle);
        }
      }
    );
  }, [spanishTitle, currentLang]);

  return translatedTitle;
}

/**
 * Hook to translate event description
 */
export function useEventDescription(spanishDescription: string | undefined): string {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [translatedDescription, setTranslatedDescription] = useState(spanishDescription || '');

  const translateMutation = trpc.translation.translateEvent.useMutation();

  useEffect(() => {
    if (!spanishDescription) {
      setTranslatedDescription('');
      return;
    }

    // Return original if Spanish
    if (currentLang === 'es') {
      setTranslatedDescription(spanishDescription);
      return;
    }

    // Check cache
    const cacheKey = getCacheKey(spanishDescription, currentLang);
    const cached = translationCache.get(cacheKey);
    if (cached) {
      setTranslatedDescription(cached);
      return;
    }

    // Translate via API
    translateMutation.mutate(
      {
        text: spanishDescription,
        targetLang: currentLang,
        type: 'description'
      },
      {
        onSuccess: (data) => {
          const translated = data.translation;
          translationCache.set(cacheKey, translated);
          setTranslatedDescription(translated);
        },
        onError: () => {
          // Fallback to original
          setTranslatedDescription(spanishDescription);
        }
      }
    );
  }, [spanishDescription, currentLang]);

  return translatedDescription;
}

/**
 * Hook to batch translate multiple event titles
 * More efficient for listing pages
 */
export function useEventTitles(events: Array<{ name: { es: string } | string }>): Map<string, string> {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [translations, setTranslations] = useState<Map<string, string>>(new Map());

  const batchTranslateMutation = trpc.translation.translateEventBatch.useMutation();

  useEffect(() => {
    // Extract Spanish titles
    const spanishTitles = events.map(e => 
      typeof e.name === 'string' ? e.name : e.name.es
    ).filter(Boolean);

    if (spanishTitles.length === 0) {
      setTranslations(new Map());
      return;
    }

    // Return originals if Spanish
    if (currentLang === 'es') {
      const map = new Map<string, string>();
      spanishTitles.forEach(title => map.set(title, title));
      setTranslations(map);
      return;
    }

    // Check cache and separate uncached
    const resultMap = new Map<string, string>();
    const uncachedTitles: string[] = [];

    spanishTitles.forEach(title => {
      const cacheKey = getCacheKey(title, currentLang);
      const cached = translationCache.get(cacheKey);
      if (cached) {
        resultMap.set(title, cached);
      } else {
        uncachedTitles.push(title);
      }
    });

    // If all cached, return immediately
    if (uncachedTitles.length === 0) {
      setTranslations(resultMap);
      return;
    }

    // Translate uncached titles
    batchTranslateMutation.mutate(
      {
        titles: uncachedTitles,
        targetLang: currentLang
      },
      {
        onSuccess: (data) => {
          const translationsData = data.translations;
          
          // Cache and add to result
          uncachedTitles.forEach(title => {
            const translated = translationsData[title] || title;
            const cacheKey = getCacheKey(title, currentLang);
            translationCache.set(cacheKey, translated);
            resultMap.set(title, translated);
          });

          setTranslations(resultMap);
        },
        onError: () => {
          // Fallback to originals
          uncachedTitles.forEach(title => {
            resultMap.set(title, title);
          });
          setTranslations(resultMap);
        }
      }
    );
  }, [events, currentLang]);

  return translations;
}

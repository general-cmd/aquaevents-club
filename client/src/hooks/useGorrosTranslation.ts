import { useMemo } from 'react';
import { useLocation } from 'wouter';

export type Language = 'es' | 'en' | 'ca' | 'va' | 'eu' | 'gl';

export function useGorrosTranslation() {
  const [location] = useLocation();
  
  // Get language from URL query parameter
  const lang: Language = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang') as Language;
    return ['en', 'ca', 'va', 'eu', 'gl'].includes(langParam) ? langParam : 'es';
  }, [location]);

  return { lang };
}

export function getLanguageName(lang: Language): string {
  const names: Record<Language, string> = {
    es: 'Español',
    en: 'English',
    ca: 'Català',
    va: 'Valencià',
    eu: 'Euskara',
    gl: 'Galego',
  };
  return names[lang];
}

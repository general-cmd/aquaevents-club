import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';

type Language = 'es' | 'de' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  es: {
    'nav.home': 'Inicio',
    'nav.events': 'Eventos',
    'nav.blog': 'Blog',
    'nav.caps': 'Gorros Personalizados',
    'events.title': 'Calendario de Eventos',
    'events.upcoming': 'Próximos Eventos',
    'events.filter.all': 'Todos',
    'events.filter.swimming': 'Natación',
    'events.filter.triathlon': 'Triatlón',
    'events.filter.duathlon': 'Duatlón',
    'events.date': 'Fecha',
    'events.location': 'Ubicación',
    'events.register': 'Inscribirse',
    'events.more_info': 'Más información',
    'footer.about': 'Sobre Nosotros',
    'footer.contact': 'Contacto',
    'footer.privacy': 'Privacidad',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.events': 'Veranstaltungen',
    'nav.blog': 'Blog',
    'nav.caps': 'Personalisierte Badekappen',
    'events.title': 'Veranstaltungskalender',
    'events.upcoming': 'Kommende Veranstaltungen',
    'events.filter.all': 'Alle',
    'events.filter.swimming': 'Schwimmen',
    'events.filter.triathlon': 'Triathlon',
    'events.filter.duathlon': 'Duathlon',
    'events.date': 'Datum',
    'events.location': 'Ort',
    'events.register': 'Anmelden',
    'events.more_info': 'Mehr Informationen',
    'footer.about': 'Über Uns',
    'footer.contact': 'Kontakt',
    'footer.privacy': 'Datenschutz',
  },
  en: {
    'nav.home': 'Home',
    'nav.events': 'Events',
    'nav.blog': 'Blog',
    'nav.caps': 'Custom Swim Caps',
    'events.title': 'Event Calendar',
    'events.upcoming': 'Upcoming Events',
    'events.filter.all': 'All',
    'events.filter.swimming': 'Swimming',
    'events.filter.triathlon': 'Triathlon',
    'events.filter.duathlon': 'Duathlon',
    'events.date': 'Date',
    'events.location': 'Location',
    'events.register': 'Register',
    'events.more_info': 'More Info',
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [language, setLanguageState] = useState<Language>('es');

  // Detect language from URL path
  useEffect(() => {
    const pathLang = location.split('/')[1];
    if (pathLang === 'de' || pathLang === 'en') {
      setLanguageState(pathLang);
    } else {
      setLanguageState('es');
    }
  }, [location]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Store preference
    localStorage.setItem('preferredLanguage', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

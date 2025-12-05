export type Language = 'es' | 'ca' | 'eu' | 'gl' | 'va' | 'en';

export interface WidgetTranslations {
  upcomingEvents: string;
  eventsAvailable: string;
  event: string;
  events: string;
  noEvents: string;
  register: string;
  poweredBy: string;
  calendarTitle: string;
  upcomingEventsShort: string;
}

export const widgetTranslations: Record<Language, WidgetTranslations> = {
  es: {
    upcomingEvents: 'Próximos Eventos',
    eventsAvailable: 'eventos disponibles',
    event: 'evento',
    events: 'eventos',
    noEvents: 'No hay eventos próximos',
    register: 'Inscribirse',
    poweredBy: 'Powered by AquaEvents.club',
    calendarTitle: 'Calendario de Eventos',
    upcomingEventsShort: 'eventos próximos',
  },
  ca: {
    upcomingEvents: 'Pròxims Esdeveniments',
    eventsAvailable: 'esdeveniments disponibles',
    event: 'esdeveniment',
    events: 'esdeveniments',
    noEvents: 'No hi ha esdeveniments propers',
    register: 'Inscriure\'s',
    poweredBy: 'Impulsat per AquaEvents.club',
    calendarTitle: 'Calendari d\'Esdeveniments',
    upcomingEventsShort: 'esdeveniments propers',
  },
  eu: {
    upcomingEvents: 'Hurrengo Ekitaldiak',
    eventsAvailable: 'ekitaldi eskuragarri',
    event: 'ekitaldi',
    events: 'ekitaldiak',
    noEvents: 'Ez dago hurrengo ekitaldirik',
    register: 'Izena eman',
    poweredBy: 'AquaEvents.club-ek egina',
    calendarTitle: 'Ekitaldien Egutegia',
    upcomingEventsShort: 'hurrengo ekitaldiak',
  },
  gl: {
    upcomingEvents: 'Próximos Eventos',
    eventsAvailable: 'eventos dispoñibles',
    event: 'evento',
    events: 'eventos',
    noEvents: 'Non hai eventos próximos',
    register: 'Inscribirse',
    poweredBy: 'Desenvolvido por AquaEvents.club',
    calendarTitle: 'Calendario de Eventos',
    upcomingEventsShort: 'eventos próximos',
  },
  va: {
    upcomingEvents: 'Pròxims Esdeveniments',
    eventsAvailable: 'esdeveniments disponibles',
    event: 'esdeveniment',
    events: 'esdeveniments',
    noEvents: 'No hi ha esdeveniments pròxims',
    register: 'Inscriure\'s',
    poweredBy: 'Impulsat per AquaEvents.club',
    calendarTitle: 'Calendari d\'Esdeveniments',
    upcomingEventsShort: 'esdeveniments pròxims',
  },
  en: {
    upcomingEvents: 'Upcoming Events',
    eventsAvailable: 'events available',
    event: 'event',
    events: 'events',
    noEvents: 'No upcoming events',
    register: 'Register',
    poweredBy: 'Powered by AquaEvents.club',
    calendarTitle: 'Events Calendar',
    upcomingEventsShort: 'upcoming events',
  },
};

export const getTranslation = (lang: Language = 'es'): WidgetTranslations => {
  return widgetTranslations[lang] || widgetTranslations.es;
};

// Month names in different languages
export const monthNames: Record<Language, string[]> = {
  es: [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ],
  ca: [
    'gener', 'febrer', 'març', 'abril', 'maig', 'juny',
    'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'
  ],
  eu: [
    'urtarrila', 'otsaila', 'martxoa', 'apirila', 'maiatza', 'ekaina',
    'uztaila', 'abuztua', 'iraila', 'urria', 'azaroa', 'abendua'
  ],
  gl: [
    'xaneiro', 'febreiro', 'marzo', 'abril', 'maio', 'xuño',
    'xullo', 'agosto', 'setembro', 'outubro', 'novembro', 'decembro'
  ],
  va: [
    'gener', 'febrer', 'març', 'abril', 'maig', 'juny',
    'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'
  ],
  en: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
};

// Weekday abbreviations
export const weekdayAbbr: Record<Language, string[]> = {
  es: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  ca: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'],
  eu: ['ig', 'al', 'ar', 'az', 'og', 'or', 'lr'],
  gl: ['dom', 'lun', 'mar', 'mér', 'xov', 'ven', 'sáb'],
  va: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'],
  en: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
};

export const formatDate = (dateString: string, lang: Language = 'es'): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = monthNames[lang][date.getMonth()];
  const year = date.getFullYear();
  
  if (lang === 'en') {
    return `${month} ${day}, ${year}`;
  }
  
  return `${day} de ${month} de ${year}`;
};

export const getWeekday = (dateString: string, lang: Language = 'es'): string => {
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return weekdayAbbr[lang][dayIndex];
};

export const getMonthYear = (dateString: string, lang: Language = 'es'): string => {
  const date = new Date(dateString);
  const month = monthNames[lang][date.getMonth()];
  const year = date.getFullYear();
  
  if (lang === 'en') {
    return `${month} ${year}`;
  }
  
  // Capitalize first letter for other languages
  return `${month.charAt(0).toUpperCase() + month.slice(1)} de ${year}`;
};

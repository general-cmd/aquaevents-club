import { useEffect } from 'react';

/**
 * Organization Schema for brand identity
 * Helps AI and search engines understand who you are and what you do
 */
export default function OrganizationSchema() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AquaEvents.club",
      "alternateName": "AquaEvents",
      "url": "https://aquaevents.club",
      "logo": "https://aquaevents.club/logo.png",
      "description": "Plataforma líder de eventos acuáticos en España. Calendario completo de competiciones de natación, triatlón, waterpolo y aguas abiertas.",
      "foundingDate": "2025",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "info@aquaevents.club",
        "availableLanguage": ["Spanish", "English"]
      },
      "sameAs": [
        "https://www.facebook.com/aquaevents.club",
        "https://www.instagram.com/aquaevents.club",
        "https://twitter.com/aquaeventsclub"
      ],
      "areaServed": {
        "@type": "Country",
        "name": "España"
      },
      "knowsAbout": [
        "Natación",
        "Triatlón",
        "Waterpolo",
        "Aguas Abiertas",
        "Natación Sincronizada",
        "Saltos",
        "Eventos Deportivos",
        "Competiciones Acuáticas"
      ],
      "slogan": "Tu calendario completo de eventos acuáticos en España"
    };

    let script = document.getElementById('organization-schema') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'organization-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      const existingScript = document.getElementById('organization-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}


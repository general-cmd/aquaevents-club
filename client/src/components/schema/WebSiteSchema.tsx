import { useEffect } from 'react';

/**
 * WebSite Schema for homepage
 * Helps search engines understand the site structure and search functionality
 */
export default function WebSiteSchema() {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "AquaEvents.club",
      "alternateName": "Calendario de Eventos Acuáticos en España",
      "url": "https://aquaevents.club",
      "description": "Calendario completo de eventos acuáticos en España 2026. Competiciones de natación, triatlón, waterpolo y aguas abiertas. Actualizado mensualmente con eventos oficiales.",
      "inLanguage": "es-ES",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://aquaevents.club/eventos?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AquaEvents.club",
        "url": "https://aquaevents.club",
        "logo": {
          "@type": "ImageObject",
          "url": "https://aquaevents.club/logo.png"
        }
      }
    };

    let script = document.getElementById('website-schema') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'website-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      const existingScript = document.getElementById('website-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}


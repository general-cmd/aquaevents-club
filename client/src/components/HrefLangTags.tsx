import { Helmet } from "react-helmet-async";

interface HrefLangTagsProps {
  basePath: string; // e.g., "/gorros-natacion/silicona"
}

/**
 * Adds hreflang tags for multilingual SEO
 * Tells Google which language versions are available
 */
export default function HrefLangTags({ basePath }: HrefLangTagsProps) {
  const baseUrl = "https://aquaevents.club";
  
  return (
    <Helmet>
      {/* Spanish (default) */}
      <link rel="alternate" hrefLang="es" href={`${baseUrl}${basePath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${basePath}`} />
      
      {/* English */}
      <link rel="alternate" hrefLang="en" href={`${baseUrl}${basePath}?lang=en`} />
      
      {/* Catalan */}
      <link rel="alternate" hrefLang="ca" href={`${baseUrl}${basePath}?lang=ca`} />
      
      {/* Valencian */}
      <link rel="alternate" hrefLang="va" href={`${baseUrl}${basePath}?lang=va`} />
      
      {/* Basque */}
      <link rel="alternate" hrefLang="eu" href={`${baseUrl}${basePath}?lang=eu`} />
      
      {/* Galician */}
      <link rel="alternate" hrefLang="gl" href={`${baseUrl}${basePath}?lang=gl`} />
    </Helmet>
  );
}

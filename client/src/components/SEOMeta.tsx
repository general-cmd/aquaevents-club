import { Helmet } from "react-helmet-async";

interface SEOMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

/**
 * SEO Meta component for dynamic meta tags
 * Includes Open Graph and Twitter Card tags for social sharing
 */
export function SEOMeta({
  title = "AquaEvents.club - Calendario Completo de Eventos Acuáticos en España 2026",
  description = "Descubre todas las competiciones de natación, triatlón, waterpolo y aguas abiertas en España. Actualizado mensualmente con eventos oficiales de federaciones nacionales y autonómicas.",
  image = "https://aquaevents.club/og-image.jpg",
  url = "https://aquaevents.club",
  type = "website",
  noindex = false,
}: SEOMetaProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="AquaEvents.club" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Noindex for thin content pages */}
      {noindex && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  );
}

/**
 * Truncate text to specified length for meta descriptions
 */
export function truncateForMeta(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trim() + "...";
}


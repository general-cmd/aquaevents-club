import { Request } from "express";

export type CountryCode = "ES" | "DE" | "FR" | "IT" | "UK";

/**
 * Detect country from subdomain (de.aquaevents.club → "DE")
 * Falls back to ES (Spain) as default
 */
export function getCountryFromSubdomain(req: Request): CountryCode {
  const hostname = req.hostname;
  
  if (hostname.startsWith("de.")) return "DE";
  if (hostname.startsWith("fr.")) return "FR";
  if (hostname.startsWith("it.")) return "IT";
  if (hostname.startsWith("uk.")) return "UK";
  
  return "ES"; // Default to Spain
}

/**
 * Map country code to language code
 */
export function getLanguageFromCountry(countryCode: CountryCode): string {
  const languageMap: Record<CountryCode, string> = {
    ES: "es",
    DE: "de",
    FR: "fr",
    IT: "it",
    UK: "en"
  };
  
  return languageMap[countryCode];
}

/**
 * Get country name in local language
 */
export function getCountryName(countryCode: CountryCode, language: string): string {
  const countryNames: Record<CountryCode, Record<string, string>> = {
    ES: { es: "España", de: "Spanien", en: "Spain", fr: "Espagne", it: "Spagna" },
    DE: { es: "Alemania", de: "Deutschland", en: "Germany", fr: "Allemagne", it: "Germania" },
    FR: { es: "Francia", de: "Frankreich", en: "France", fr: "France", it: "Francia" },
    IT: { es: "Italia", de: "Italien", en: "Italy", fr: "Italie", it: "Italia" },
    UK: { es: "Reino Unido", de: "Vereinigtes Königreich", en: "United Kingdom", fr: "Royaume-Uni", it: "Regno Unito" }
  };
  
  return countryNames[countryCode][language] || countryNames[countryCode]["en"];
}

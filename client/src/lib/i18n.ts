import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import es from "./locales/es.json";
import ca from "./locales/ca.json";
import eu from "./locales/eu.json";
import gl from "./locales/gl.json";
import va from "./locales/va.json";
import en from "./locales/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      ca: { translation: ca },
      eu: { translation: eu },
      gl: { translation: gl },
      va: { translation: va },
      en: { translation: en },
    },
    fallbackLng: "es",
    lng: "es", // Force Spanish as default language
    supportedLngs: ["es", "ca", "eu", "gl", "va", "en"],
    detection: {
      order: ["querystring", "localStorage"], // Removed "navigator" to prevent English default
      caches: ["localStorage"],
      lookupQuerystring: "lang",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

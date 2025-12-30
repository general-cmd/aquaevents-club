import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Synchronizes the <html lang> attribute with the current i18n language
 * Critical for SEO - ensures Google sees the correct language in the HTML tag
 */
export default function HtmlLangSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update html lang attribute whenever language changes
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return null; // This component doesn't render anything
}

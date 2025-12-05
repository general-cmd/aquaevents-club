import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="AquaEvents.club" className="h-14 w-14 object-contain" />
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            AquaEvents.club
          </span>
        </a>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="/eventos" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            {t("nav.events")}
          </a>
          <a href="/federaciones" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            {t("nav.federations")}
          </a>
          <a href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            {t("nav.blog")}
          </a>
          <a href="/gorros-natacion" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            {t("nav.customCaps")}
          </a>
          <a href="/enviar-evento" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            {t("nav.submitEvent")}
          </a>
          <a href="/perfil" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            {t("nav.myProfile")}
          </a>
          <LanguageSwitcher />
          <Button 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
            onClick={() => document.getElementById('newsletter-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t("nav.subscribeFree")}
          </Button>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="/eventos" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.events")}
            </a>
            <a 
              href="/federaciones" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.federations")}
            </a>
            <a 
              href="/blog" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.blog")}
            </a>
            <a 
              href="/gorros-natacion" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.customCaps")}
            </a>
            <a 
              href="/enviar-evento" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.submitEvent")}
            </a>
            <a 
              href="/perfil" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.myProfile")}
            </a>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('newsletter-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t("nav.subscribeFree")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

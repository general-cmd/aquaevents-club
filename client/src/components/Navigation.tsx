import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { ChevronDown } from "lucide-react";

export default function Navigation() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <a href="/" className="flex items-center gap-2 md:gap-3 flex-shrink min-w-0">
          <img src="/logo.png" alt="AquaEvents.club" className="h-10 w-10 md:h-14 md:w-14 object-contain flex-shrink-0" />
          <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent truncate">
            AquaEvents.club
          </span>
        </a>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="/eventos" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            {t("nav.events")}
          </a>
          <a href="/de/events" className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1">
            🇩🇪 Deutsche Events
          </a>
          <a href="/federaciones" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            {t("nav.federations")}
          </a>
          <div className="relative group">
            <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1">
              Recursos
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-72 bg-white shadow-lg rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <a href="/blog" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors font-medium">
                  📚 Todos los Artículos
                </a>
                <div className="border-t my-2"></div>
                <a href="/blog/preparacion-profesional-competiciones" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                  🏆 Preparación para Competiciones
                </a>
                <a href="/blog/guia-subvenciones-clubes-2026" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                  💰 Guía de Subvenciones 2026
                </a>
                <a href="/blog/beneficios-natacion-aguas-abiertas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                  🌊 Beneficios Aguas Abiertas
                </a>
                <a href="/blog/tecnicas-avanzadas-viraje" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                  🔄 Técnicas de Viraje
                </a>
                <a href="/blog/elegir-competicion-segun-nivel" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                  🎯 Elegir Competición
                </a>
                <a href="/blog/nutricion-nadadores-alto-rendimiento" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                  🍎 Nutrición Deportiva
                </a>
                <a href="/blog/mejores-gafas-natacion-2026" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors">
                  🥽 Mejores Gafas 2026
                </a>
              </div>
            </div>
          </div>
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

        <div className="md:hidden flex items-center gap-1 flex-shrink-0">
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
              href="/de/events" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              🇩🇪 Deutsche Events
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

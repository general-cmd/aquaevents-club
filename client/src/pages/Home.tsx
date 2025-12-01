import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_LOGO } from "@/const";
import { Calendar, MapPin, Trophy, Users, Clock, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import WebSiteSchema from "@/components/schema/WebSiteSchema";
import OrganizationSchema from "@/components/schema/OrganizationSchema";
import FAQSchema from "@/components/schema/FAQSchema";
import { SEOMeta } from "@/components/SEOMeta";
import NewsletterSignupForm from "@/components/NewsletterSignupForm";

interface Event {
  _id: string;
  name: { es: string; en: string };
  date: string;
  location: { city: string; region: string };
  discipline: string;
  seo?: { canonical: string };
}

interface Stats {
  total: number;
  upcoming: number;
  byDiscipline: Array<{ _id: string; count: number }>;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Use tRPC hooks for data fetching
  const { data: eventsData, isLoading: eventsLoading } = trpc.events.list.useQuery({ limit: 6 });
  const { data: statsData, isLoading: statsLoading } = trpc.events.stats.useQuery();
  
  const events = eventsData?.events || [];
  const stats = statsData?.stats || null;
  const loading = eventsLoading || statsLoading;

  // No useEffect needed - tRPC handles data fetching automatically

  // FAQ data for schema markup
  const faqs = [
    {
      question: "¿Dónde puedo encontrar eventos de natación en España 2026?",
      answer: "AquaEvents.club es el calendario más completo de eventos acuáticos en España 2026. Recopilamos competiciones de natación, triatlón, waterpolo y aguas abiertas de todas las federaciones oficiales, actualizado mensualmente el día 15."
    },
    {
      question: "¿Cómo puedo inscribirme en una competición?",
      answer: "Cada evento incluye información de contacto y enlaces directos a la página oficial de inscripción. Haz clic en 'Ver Detalles' del evento que te interese para acceder a toda la información necesaria."
    },
    {
      question: "¿Cuándo se actualiza el calendario?",
      answer: "Actualizamos el calendario automáticamente el día 15 de cada mes con los últimos eventos publicados por la RFEN, FETRI y todas las federaciones autonómicas. Suscríbete a nuestro newsletter para recibir las novedades."
    },
    {
      question: "¿Es gratis usar AquaEvents.club?",
      answer: "Sí, completamente gratis. Nuestro objetivo es facilitar el acceso a la información de eventos acuáticos para clubes, nadadores, triatletas y aficionados en toda España."
    }
  ];

  return (
    <>
      <SEOMeta />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
        {/* Schema.org Structured Data for AI SEO */}
        <WebSiteSchema />
        <OrganizationSchema />
        <FAQSchema faqs={faqs} />
      {/* Header/Navigation */}
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
              Eventos
            </a>
            <a href="/federaciones" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Federaciones
            </a>
            <a href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Blog
            </a>
            <a href="/gorros-natacion" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Gorros Personalizados
            </a>
            <a href="/enviar-evento" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Enviar Evento
            </a>
            <a href="/perfil" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Mi Perfil
            </a>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
              onClick={() => document.getElementById('newsletter-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Suscríbete Gratis
            </Button>
          </nav>
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a 
                href="/eventos" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Eventos
              </a>
              <a 
                href="/federaciones" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Federaciones
              </a>
              <a 
                href="/blog" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </a>
              <a 
                href="/gorros-natacion" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gorros Personalizados
              </a>
              <a 
                href="/enviar-evento" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Enviar Evento
              </a>
              <a 
                href="/perfil" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Mi Perfil
              </a>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document.getElementById('newsletter-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Suscríbete Gratis
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="newsletter-form" className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent leading-tight">
            Calendario Completo de Eventos Acuáticos en España 2026
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Descubre todas las competiciones de natación, triatlón, waterpolo y aguas abiertas. 
            Actualizado mensualmente con eventos oficiales de federaciones nacionales y autonómicas.
          </p>
          
          {/* Newsletter CTA */}
          <Card className="max-w-2xl mx-auto bg-white shadow-xl border-2 border-blue-100">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                🏊 Descarga GRATIS la Guía de Supervivencia para Clubes Acuáticos 2025
              </h3>
              <ul className="text-left mb-6 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>Más de €10,000 en Subvenciones Ocultas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>30 Días para Aumentar Ingresos en 25%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>Sistemas que Ahorran 10+ Horas Semanales</span>
                </li>
              </ul>
              {/* Newsletter signup form */}
              <NewsletterSignupForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {loading ? "..." : stats?.upcoming || 0}+
              </div>
              <div className="text-blue-100 text-sm md:text-base">Eventos Próximos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {loading ? "..." : (stats?.byDiscipline?.length || 0)}
              </div>
              <div className="text-blue-100 text-sm md:text-base">Disciplinas</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                Toda
              </div>
              <div className="text-blue-100 text-sm md:text-base">España</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                100%
              </div>
              <div className="text-blue-100 text-sm md:text-base">Gratis</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-gray-900">
          ¿Por qué AquaEvents.club?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Actualizado Mensualmente</h3>
              <p className="text-gray-600 text-sm">
                Calendario completo actualizado el día 15 de cada mes
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Toda España</h3>
              <p className="text-gray-600 text-sm">
                Eventos de todas las comunidades autónomas
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Fuentes Oficiales</h3>
              <p className="text-gray-600 text-sm">
                Datos directos de RFEN, FETRI y federaciones autonómicas
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Para Clubes</h3>
              <p className="text-gray-600 text-sm">
                Recursos, guías y herramientas para gestionar tu club
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sponsor CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-10">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto border-2 border-blue-200 shadow-xl">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                    🎯 ¿Tu club necesita gorros personalizados?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Entrega rápida</span> • 
                    <span className="font-semibold"> Diseño gratis</span> • 
                    <span className="font-semibold"> Calidad premium</span>
                  </p>
                  <p className="text-lg font-bold text-blue-600 mb-4">
                    Usa AQUA20 para 20% descuento
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 w-full md:w-auto"
                    onClick={() => window.location.href = '/gorros-natacion'}
                  >
                    Personaliza Ahora →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Próximos Eventos
          </h2>
          <Button variant="outline" className="hidden md:inline-flex" onClick={() => window.location.href = '/eventos'}>
            Ver Todos <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
        
        {loading ? (
          <div className="text-center text-gray-600 py-12">
            <p>Cargando eventos...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: any) => (
              <Card key={event._id} className="hover:shadow-lg transition-shadow border-2 hover:border-blue-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                      {event.discipline}
                    </Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
                    {event.name.es}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-4">
                    <MapPin className="w-4 h-4" />
                    {event.location.city}, {event.location.region}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      // Extract slug from canonical URL or use _id as fallback
                      let slug = event._id;
                      if (event.seo?.canonical) {
                        const parts = event.seo.canonical.split('/');
                        slug = parts[parts.length - 1];
                      }
                      // Navigate using the slug (browser will handle encoding)
                      window.location.href = `/eventos/${encodeURIComponent(slug)}`;
                    }}
                  >
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 py-12">
            <p>No hay eventos próximos disponibles.</p>
          </div>
        )}
        
        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" onClick={() => window.location.href = '/eventos'}>
            Ver Todos los Eventos <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Swimming Caps CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Organizas un Evento Acuático?
            </h2>
            <p className="text-xl mb-2 text-blue-50">
              Gorros de natación personalizados de alta calidad para tu competición
            </p>
            <p className="text-lg mb-8 text-blue-100">
              25 años de experiencia | Más de 1 millón de gorros producidos | Envío gratis a toda la UE
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
                onClick={() => window.location.href = '/gorros-natacion'}
              >
                Ver Precios y Solicitar Presupuesto
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-blue-700 px-8 py-6 text-lg font-semibold"
                onClick={() => window.open('https://www.instagram.com/euroswimcaps', '_blank')}
              >
                Ver Ejemplos en Instagram
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-gray-900">
            Preguntas Frecuentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  ¿Dónde puedo encontrar eventos de natación en España 2026?
                </h3>
                <p className="text-gray-700">
                  AquaEvents.club es el calendario más completo de eventos acuáticos en España 2026. 
                  Recopilamos competiciones de natación, triatlón, waterpolo y aguas abiertas de todas 
                  las federaciones oficiales, actualizado mensualmente el día 15.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  ¿Cómo puedo inscribirme en una competición?
                </h3>
                <p className="text-gray-700">
                  Cada evento incluye información de contacto y enlaces directos a la página oficial 
                  de inscripción. Haz clic en "Ver Detalles" del evento que te interese para acceder 
                  a toda la información necesaria.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  ¿Cuándo se actualiza el calendario?
                </h3>
                <p className="text-gray-700">
                  Actualizamos el calendario automáticamente el día 15 de cada mes con los últimos 
                  eventos publicados por la RFEN, FETRI y todas las federaciones autonómicas. 
                  Suscríbete a nuestro newsletter para recibir las novedades.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  ¿Es gratis usar AquaEvents.club?
                </h3>
                <p className="text-gray-700">
                  Sí, completamente gratis. Nuestro objetivo es facilitar el acceso a la información 
                  de eventos acuáticos para clubes, nadadores, triatletas y aficionados en toda España.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="AquaEvents.club" className="h-10 w-10 rounded-full" />
                <span className="font-bold text-lg">AquaEvents.club</span>
              </div>
              <p className="text-gray-400 text-sm">
                El calendario más completo de eventos acuáticos en España
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Servicios</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/eventos" className="hover:text-white">Calendario de Eventos</a></li>
                <li><a href="/gorros-natacion" className="hover:text-white">Gorros Personalizados</a></li>
                <li><a href="/enviar-evento" className="hover:text-white">Publicar Evento</a></li>
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/privacidad" className="hover:text-white">Política de Privacidad</a></li>
                <li><a href="/terminos" className="hover:text-white">Términos de Servicio</a></li>
                <li><a href="mailto:general@aquaevents.club" className="hover:text-white">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
            <p>© 2025 AquaEvents.club. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}


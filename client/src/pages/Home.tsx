import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_LOGO } from "@/const";
import { Calendar, MapPin, Trophy, Users, Clock, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import WebSiteSchema from "@/components/schema/WebSiteSchema";
import OrganizationSchema from "@/components/schema/OrganizationSchema";
import FAQSchema from "@/components/schema/FAQSchema";
import { SEOMeta } from "@/components/SEOMeta";
import NewsletterSignupForm from "@/components/NewsletterSignupForm";
import Footer from "@/components/Footer";

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
  const { t } = useTranslation();
  
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
      <Navigation />

      {/* Hero Section */}
      <section id="newsletter-form" className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent leading-tight">
            {t("home.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            {t("home.hero.subtitle")}
          </p>
          
          {/* Newsletter CTA */}
          <Card className="max-w-2xl mx-auto bg-white shadow-xl border-2 border-blue-100">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                {t("home.sponsor.title")}
              </h3>
              <ul className="text-left mb-6 space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>{t("home.newsletter.benefit1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>{t("home.newsletter.benefit2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>{t("home.newsletter.benefit3")}</span>
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
              <div className="text-blue-100 text-sm md:text-base">{t("home.stats.events")}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {loading ? "..." : (stats?.byDiscipline?.length || 0)}
              </div>
              <div className="text-blue-100 text-sm md:text-base">{t("home.stats.disciplines")}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {t("stats.all")}
              </div>
              <div className="text-blue-100 text-sm md:text-base">{t("stats.spain")}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                100%
              </div>
              <div className="text-blue-100 text-sm md:text-base">{t("stats.free")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-gray-900">
          {t("home.features.title")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">{t("home.features.calendar.title")}</h3>
              <p className="text-gray-600 text-sm">
                {t("home.features.calendar.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">{t("home.features.federations.title")}</h3>
              <p className="text-gray-600 text-sm">
                {t("home.features.federations.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">{t("home.features.filters.title")}</h3>
              <p className="text-gray-600 text-sm">
                {t("home.features.filters.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">{t("home.features.notifications.title")}</h3>
              <p className="text-gray-600 text-sm">
                {t("home.features.notifications.description")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

    

      {/* Upcoming Events Preview */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            {t("events.upcoming")}
          </h2>
          <Button variant="outline" className="hidden md:inline-flex" onClick={() => window.location.href = '/eventos'}>
            {t("common.viewAll")} <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
        
        {loading ? (
          <div className="text-center text-gray-600 py-12">
            <p>{t("common.loading")}</p>
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
                    {t("events.viewDetails")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 py-12">
            <p>{t("events.empty")}</p>
          </div>
        )}
        
        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" onClick={() => window.location.href = '/eventos'}>
            {t("common.viewAll")} <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Material para Clubes - Subtle CTA */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-gray-600 mb-3">
              ℹ️ Este servicio gratuito es posible gracias a la venta de material deportivo
            </p>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              ¿Tu club necesita gorros personalizados?
            </h3>
            <p className="text-gray-700 mb-6">
              Diseño gratuito • Entrega rápida • Calidad profesional
            </p>
            <Button 
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => window.location.href = '/gorros-natacion'}
            >
              Ver Material para Clubes
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-gray-900">
            {t("home.faq.title")}
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  {t("home.faq.q1.question")}
                </h3>
                <p className="text-gray-700">
                  {t("home.faq.q1.answer")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  {t("home.faq.q2.question")}
                </h3>
                <p className="text-gray-700">
                  {t("home.faq.q2.answer")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  {t("home.faq.q3.question")}
                </h3>
                <p className="text-gray-700">
                  {t("home.faq.q3.answer")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  {t("home.faq.q4.question")}
                </h3>
                <p className="text-gray-700">
                  {t("home.faq.q4.answer")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
}


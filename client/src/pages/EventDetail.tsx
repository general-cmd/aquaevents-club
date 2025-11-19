import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ExternalLink, Mail, Phone, Globe, Trophy } from "lucide-react";

import { Link, useParams } from "wouter";
import EventStructuredData from "@/components/EventStructuredData";
import { trpc } from "@/lib/trpc";

interface Event {
  _id: string;
  name: { es: string; en: string };
  date: string;
  location: { 
    city: string; 
    region: string;
    venue?: string;
    address?: string;
  };
  discipline: string;
  federation?: string;
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  description?: { es: string; en: string };
  seo?: {
    canonical: string;
    metaTitle?: string;
    metaDescription?: string;
  };
  registrationUrl?: string;
  categories?: string[];
}

export default function EventDetail() {
  const params = useParams();
  const eventId = params.id;
  // Decode the URL parameter in case it's encoded
  const decodedId = eventId ? decodeURIComponent(eventId) : '';
  
  // Use tRPC to fetch event details
  const { data: eventData, isLoading, error } = trpc.events.getById.useQuery(
    { id: decodedId },
    { enabled: !!decodedId }
  );
  
  const event = (eventData?.event as any) || null;
  const loading = isLoading;
  const notFound = error || (eventData && !eventData.success);

  const getDisciplineIcon = (discipline: string) => {
    const icons: Record<string, string> = {
      swimming: "🏊",
      triathlon: "🏃",
      waterpolo: "🤽",
      "open-water": "🌊",
      duathlon: "🚴",
      synchronized_swimming: "💃",
    };
    return icons[discipline] || "🏆";
  };

  const getDisciplineLabel = (discipline: string) => {
    const labels: Record<string, string> = {
      swimming: "Natación",
      triathlon: "Triatlón",
      waterpolo: "Waterpolo",
      "open-water": "Aguas Abiertas",
      duathlon: "Duatlón",
      synchronized_swimming: "Natación Artística",
    };
    return labels[discipline] || discipline;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-xl text-gray-600">Cargando evento...</div>
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Evento no encontrado</h1>
        <p className="text-gray-600 mb-6">El evento que buscas no existe o ha sido eliminado.</p>
        <Link href="/eventos">
          <a>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
              Ver todos los eventos
            </Button>
          </a>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Add structured data for SEO */}
      {event && <EventStructuredData event={event} />}
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3">
              <img src="/logo.png" alt="AquaEvents.club" className="h-14 w-14 object-contain" />
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                AquaEvents.club
              </span>
            </a>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/eventos">
              <a className="text-blue-600 font-semibold">Eventos</a>
            </Link>
            <Link href="/blog">
              <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Blog</a>
            </Link>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
              Suscríbete Gratis
            </Button>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/">
            <a className="hover:text-blue-600">Inicio</a>
          </Link>
          <span>/</span>
          <Link href="/eventos">
            <a className="hover:text-blue-600">Eventos</a>
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{event.name.es}</span>
        </div>
      </div>

      {/* Event Header */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 text-base px-4 py-1">
              {getDisciplineIcon(event.discipline)} {getDisciplineLabel(event.discipline)}
            </Badge>
            {event.federation && (
              <Badge variant="outline" className="text-base px-4 py-1">
                {event.federation}
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {event.name.es}
          </h1>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Fecha</div>
                <div className="font-semibold">{formatDate(event.date)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Ubicación</div>
                <div className="font-semibold">{event.location.city}, {event.location.region}</div>
                {event.location.venue && (
                  <div className="text-sm text-gray-600">{event.location.venue}</div>
                )}
              </div>
            </div>
          </div>

          {/* Registration CTA */}
          {event.registrationUrl && (
            <Card className="bg-gradient-to-r from-blue-600 to-cyan-500 border-0 mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-white text-center md:text-left">
                    <h3 className="text-xl font-bold mb-1">¿Quieres participar?</h3>
                    <p className="text-blue-100">Inscríbete ahora en este evento</p>
                  </div>
                  <Button 
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                    onClick={() => window.open(event.registrationUrl, '_blank')}
                  >
                    Inscribirse Ahora
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Event Details */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            {event.description?.es && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre el Evento</h2>
                  <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
                      {event.description?.es.split('\n\n').map((paragraph: string, idx: number) => (                  <p key={idx} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Categories */}
            {event.categories && event.categories.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Categorías</h2>
                  <div className="flex flex-wrap gap-2">
                      {event.categories?.map((category: string, idx: number) => (                    <Badge key={idx} variant="outline" className="text-sm">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sponsor CTA */}
            <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">
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
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                  onClick={() => window.open('https://euroswimcaps.com?coupon=AQUA20', '_blank')}
                >
                  Personaliza Ahora →
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            {event.contact && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Información de Contacto</h3>
                  <div className="space-y-3">
                    {event.contact.email && (
                      <a 
                        href={`mailto:${event.contact.email}`}
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-blue-500" />
                        <span className="text-sm break-all">{event.contact.email}</span>
                      </a>
                    )}
                    {event.contact.phone && (
                      <a 
                        href={`tel:${event.contact.phone}`}
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{event.contact.phone}</span>
                      </a>
                    )}
                    {event.contact.website && (
                      <a 
                        href={event.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <Globe className="w-4 h-4 text-blue-500" />
                        <span className="text-sm break-all">Sitio web oficial</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Info */}
            <Card className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white border-0">
              <CardContent className="p-6">
                <Trophy className="w-8 h-8 mb-3" />
                <h3 className="text-lg font-bold mb-2">Evento Oficial</h3>
                <p className="text-blue-100 text-sm">
                  Este evento está registrado en el calendario oficial de competiciones acuáticas de España
                </p>
              </CardContent>
            </Card>

            {/* Newsletter CTA */}
            <Card className="border-2 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  📬 No te pierdas ningún evento
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Suscríbete para recibir el calendario actualizado cada mes
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500">
                  Suscribirme Gratis
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logo.png" alt="AquaEvents.club" className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold">AquaEvents.club</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            El calendario más completo de eventos acuáticos en España
          </p>
          <div className="text-sm text-gray-500">
            © 2025 AquaEvents.club. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}


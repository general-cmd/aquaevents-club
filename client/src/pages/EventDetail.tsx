import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, ExternalLink, Mail, Globe, ArrowLeft, Share2, Heart } from "lucide-react";
import { Link, useParams, useLocation } from "wouter";
import EventStructuredData from "@/components/EventStructuredData";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

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
  const [, setLocation] = useLocation();
  const eventId = params.id;
  const decodedId = eventId ? decodeURIComponent(eventId) : '';
  const { isAuthenticated } = useAuth();
  
  const { data: eventData, isLoading, error } = trpc.events.getById.useQuery(
    { id: decodedId },
    { enabled: !!decodedId }
  );
  
  const event = (eventData?.event as any) || null;
  const loading = isLoading;
  const notFound = error || (eventData && !eventData.success);

  // Check if event is favorited
  const { data: favoriteCheck } = trpc.favorites.check.useQuery(
    { eventId: event?._id?.toString() || "" },
    { enabled: isAuthenticated && !!event?._id }
  );
  const isFavorited = favoriteCheck?.isFavorited || false;

  // Favorite mutations
  const addFavoriteMutation = trpc.favorites.add.useMutation({
    onSuccess: () => {
      toast.success("Evento añadido a favoritos");
      trpc.useUtils().favorites.check.invalidate();
    },
    onError: () => {
      toast.error("Error al añadir a favoritos");
    },
  });

  const removeFavoriteMutation = trpc.favorites.remove.useMutation({
    onSuccess: () => {
      toast.success("Evento eliminado de favoritos");
      trpc.useUtils().favorites.check.invalidate();
    },
    onError: () => {
      toast.error("Error al eliminar de favoritos");
    },
  });

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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleAddToCalendar = () => {
    if (!event) return;
    const startDate = new Date(event.date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const title = encodeURIComponent(event.name.es);
    const location = encodeURIComponent(`${event.location.venue || ''}, ${event.location.city}`);
    const description = encodeURIComponent(event.description?.es || '');
    
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${startDate}&location=${location}&details=${description}`;
    window.open(googleCalUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.name.es,
          text: event.description?.es || '',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">❗</div>
            <h2 className="text-2xl font-bold mb-2">Evento no encontrado</h2>
            <p className="text-gray-600 mb-6">
              El evento que buscas no existe o ha sido eliminado.
            </p>
            <Button onClick={() => setLocation('/eventos')}>
              Ver todos los eventos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <EventStructuredData event={event} />
      
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header with Logo and Navigation */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2">
                <img src="/logo.png" alt="AquaEvents.club" className="h-10 w-10" />
                <span className="text-2xl font-bold text-blue-600">AquaEvents.club</span>
              </a>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/"><a className="text-gray-700 hover:text-blue-600">Inicio</a></Link>
              <Link href="/eventos"><a className="text-gray-700 hover:text-blue-600">Eventos</a></Link>
              <Link href="/federaciones"><a className="text-gray-700 hover:text-blue-600">Federaciones</a></Link>
              <Link href="/blog"><a className="text-gray-700 hover:text-blue-600">Blog</a></Link>
            </nav>
          </div>
        </header>

        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/"><a className="hover:text-blue-600">Inicio</a></Link>
            <span>/</span>
            <Link href="/eventos"><a className="hover:text-blue-600">Eventos</a></Link>
            <span>/</span>
            <span className="text-gray-900">{getDisciplineLabel(event.discipline)}</span>
            <span>/</span>
            <span className="text-gray-900">{event.name.es}</span>
          </nav>
        </div>

        {/* Back Button */}
        <div className="container mx-auto px-4 mb-6">
          <Button variant="outline" onClick={() => setLocation('/eventos')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a eventos
          </Button>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-12">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              {/* Title and Badges */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-4">{event.name.es}</h1>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {getDisciplineLabel(event.discipline)}
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Próximo
                  </Badge>
                </div>
              </div>

              {/* Description */}
              {event.description?.es && (
                <p className="text-gray-700 mb-8 text-lg">
                  {event.description.es}
                </p>
              )}

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Left Column - Event Info */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Información del Evento</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Fecha:</span>
                        <span className="ml-2">{formatDate(event.date)}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Hora:</span>
                        <span className="ml-2">{formatTime(event.date)}</span>
                      </div>
                    </div>
                    {event.categories && event.categories.length > 0 && (
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-orange-500 mt-0.5" />
                        <div>
                          <span className="font-medium">Categoría:</span>
                          <span className="ml-2">{event.categories[0]}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Location */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Ubicación</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Ciudad:</span>
                        <span className="ml-2">{event.location.city}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Región:</span>
                        <span className="ml-2">{event.location.region}</span>
                      </div>
                    </div>
                    {event.location.venue && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                        <div>
                          <span className="font-medium">Lugar:</span>
                          <span className="ml-2">{event.location.venue}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              {(event.contact?.email || event.contact?.website) && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Contacto</h3>
                  <div className="space-y-3">
                    {event.contact.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Email:</span>
                        <a href={`mailto:${event.contact.email}`} className="text-blue-600 hover:underline">
                          {event.contact.email}
                        </a>
                      </div>
                    )}
                    {event.contact.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Web:</span>
                        <a href={event.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {event.contact.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Event Actions */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Acciones del Evento</h3>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleAddToCalendar} className="bg-blue-600 hover:bg-blue-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Añadir al Calendario
                  </Button>
                  <Button onClick={handleShare} variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir Evento
                  </Button>
                  {isAuthenticated && (
                    <Button
                      onClick={() => {
                        if (isFavorited) {
                          removeFavoriteMutation.mutate({ eventId: event._id.toString() });
                        } else {
                          addFavoriteMutation.mutate({ eventId: event._id.toString() });
                        }
                      }}
                      variant={isFavorited ? "default" : "outline"}
                      className={isFavorited ? "bg-red-500 hover:bg-red-600" : ""}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                      {isFavorited ? "Eliminar de Favoritos" : "Guardar en Favoritos"}
                    </Button>
                  )}
                  {event.seo?.canonical && (
                    <Button variant="outline" asChild>
                      <a href={event.seo.canonical} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Original
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Related Resources */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Recursos Relacionados</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/blog/guia-subvenciones-clubes-acuaticos">
                    <a className="block p-4 border-2 border-pink-200 rounded-lg hover:border-pink-400 transition-colors">
                      <div className="text-2xl mb-2">💰</div>
                      <h4 className="font-semibold mb-1">Guía de Subvenciones para Clubes</h4>
                      <p className="text-sm text-gray-600">
                        Descubre todas las ayudas disponibles del CSD y comunidades autónomas para tu club deportivo.
                      </p>
                    </a>
                  </Link>

                  <Link href="/blog/preparacion-competicion-natacion">
                    <a className="block p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors">
                      <div className="text-2xl mb-2">🏊‍♂️</div>
                      <h4 className="font-semibold mb-1">Preparación para Competiciones</h4>
                      <p className="text-sm text-gray-600">
                        Consejos de entrenadores profesionales para preparar competiciones de alto nivel.
                      </p>
                    </a>
                  </Link>

                  <a 
                    href="https://euroswimcaps.com?coupon=AQUA20" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-4 border-2 border-orange-200 rounded-lg hover:border-orange-400 transition-colors"
                  >
                    <div className="text-2xl mb-2">🎽</div>
                    <h4 className="font-semibold mb-1">Material de Natación</h4>
                    <p className="text-sm text-gray-600">
                      Gorros personalizados para tu club. Usa AQUA20 para 20% descuento.
                    </p>
                  </a>

                  <Link href={`/eventos?disciplina=${event.discipline}&region=${event.location.region}`}>
                    <a className="block p-4 border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors">
                      <div className="text-2xl mb-2">📅</div>
                      <h4 className="font-semibold mb-1">Más Eventos Similares</h4>
                      <p className="text-sm text-gray-600">
                        Encuentra más eventos de {getDisciplineLabel(event.discipline)} en {event.location.region}.
                      </p>
                    </a>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">AquaEvents.club</h3>
                <p className="text-gray-400">
                  El calendario más completo de eventos acuáticos en España
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Enlaces</h4>
                <div className="space-y-2">
                  <Link href="/"><a className="block text-gray-400 hover:text-white">Inicio</a></Link>
                  <Link href="/eventos"><a className="block text-gray-400 hover:text-white">Eventos</a></Link>
                  <Link href="/federaciones"><a className="block text-gray-400 hover:text-white">Federaciones</a></Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Patrocinado por</h4>
                <a 
                  href="https://euroswimcaps.com?coupon=AQUA20" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  EuroSwimCaps.com
                </a>
                <p className="text-sm text-gray-400 mt-2">Official Equipment Partner</p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>© 2025 AquaEvents.club. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}


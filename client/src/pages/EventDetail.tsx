import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, MapPin, Clock, Users, ExternalLink, Mail, Globe, ArrowLeft, Share2, Heart, Bell, DollarSign, Building, Phone } from "lucide-react";
import { Link, useParams, useLocation } from "wouter";
import EventStructuredData from "@/components/EventStructuredData";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { SEOMeta, truncateForMeta } from "@/components/SEOMeta";
import RelatedEvents from "@/components/RelatedEvents";
import EquipmentServiceSection from "@/components/EquipmentServiceSection";
import RecommendedGear from "@/components/RecommendedGear";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { formatDate as formatDateDDMMYYYY, formatDateTime } from "@/lib/dateFormat";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useEventTitle, useEventDescription } from "@/hooks/useEventTranslation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ProductCarouselPopup, { PopupProduct } from "@/components/ProductCarouselPopup";
import { useProductPopup } from "@/hooks/useProductPopup";

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
  const { t } = useTranslation();
  const params = useParams();
  const [, setLocation] = useLocation();
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
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

  // Translate event title and description
  const spanishTitle = event?.name?.es || event?.name || '';
  const spanishDescription = event?.description?.es || event?.description || '';
  const translatedTitle = useEventTitle(spanishTitle);
  const translatedDescription = useEventDescription(spanishDescription);

  // Product popup for impulse purchases
  const { showPopup, closePopup } = useProductPopup({
    scrollDepthTrigger: 50,
    timeOnPageTrigger: 30,
    storageKey: `eventPopup_${event?._id}`
  });

  // Select products based on event discipline
  const popupProducts: PopupProduct[] = [
    {
      title: "Arena Cobra Ultra Swipe Gafas de Natación",
      description: "Tecnología anti-vaho de larga duración. Perfectas para competición y entrenamiento.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dIADXyiXhgpkLxBv.jpg",
      amazonUrl: "https://www.amazon.es/dp/B0DRNXT7CP?tag=aquaevents00d-21&linkCode=ll1",
      price: "€29,99",
      rating: 4.6,
      reviewCount: 2847
    },
    {
      title: "Speedo Pull Buoy Flotador de Entrenamiento",
      description: "Pull buoy para mejorar técnica de brazos. Ideal para entrenamientos de fuerza.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/FPGnBFdnjuxSMAcP.jpg",
      amazonUrl: "https://www.amazon.es/dp/B000BPZJ8K?tag=aquaevents00d-21&linkCode=ll1",
      price: "€12,95",
      rating: 4.7,
      reviewCount: 2156
    },
    {
      title: "Arena Powerfin Pro Aletas de Entrenamiento",
      description: "Aletas cortas para mejorar potencia y técnica. Recomendadas por entrenadores profesionales.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/QixLQJWLVXjDhbGA.jpg",
      amazonUrl: "https://www.amazon.es/dp/B07L5QVQXZ?tag=aquaevents00d-21&linkCode=ll1",
      price: "€34,99",
      rating: 4.5,
      reviewCount: 892
    }
  ];

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

  // Reminder mutation
  const createReminderMutation = trpc.reminders.create.useMutation({
    onSuccess: () => {
      toast.success("Recordatorio creado correctamente");
      setReminderDialogOpen(false);
    },
    onError: () => {
      toast.error("Error al crear recordatorio");
    },
  });

  const handleCreateReminder = (reminderType: "1_week" | "3_days" | "1_day" | "same_day") => {
    if (!event) return;
    createReminderMutation.mutate({
      eventId: event._id.toString(),
      eventTitle: translatedTitle,
      eventDate: event.date,
      reminderType,
    });
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

  /**
   * Context-aware internal linking logic for swimming caps
   * Routes users to the most relevant material page based on event type
   */
  const getSmartCapsLink = () => {
    if (!event) return "/gorros-natacion/silicona";

    const eventText = `${translatedTitle} ${translatedDescription} ${getDisciplineLabel(event.discipline)}`.toLowerCase();

    // Triathlon, Open Water, Long Distance → Latex (economical, single-use)
    if (eventText.match(/triatlón|travesía|aguas abiertas|ironman|open water/i)) {
      return "/gorros-natacion/latex";
    }

    // Water Polo, Rugby → Gamuza (premium grip, no wrinkles)
    if (eventText.match(/waterpolo|water polo|rugby/i)) {
      return "/gorros-natacion/gamuza";
    }

    // Schools, Kids, Courses → Tela (comfortable, easy to wear)
    if (eventText.match(/escuela|infantil|cursillo|niños|kids|school/i)) {
      return "/gorros-natacion/tela";
    }

    // Default: Standard Swim Meets → Silicona (competition standard)
    return "/gorros-natacion/silicona";
  };

  const formatDateLong = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
    const title = encodeURIComponent(translatedTitle);
    const location = encodeURIComponent(`${event.location.venue || ''}, ${event.location.city}`);
    const description = encodeURIComponent(event.description?.es || '');
    
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${startDate}&location=${location}&details=${description}`;
    window.open(googleCalUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: translatedTitle,
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

  const metaDescription = event.description?.es 
    ? truncateForMeta(event.description.es) 
    : `${translatedTitle} - ${formatDateLong(event.date)} en ${event.location.city}, ${event.location.region}. Evento de ${getDisciplineLabel(event.discipline)}.`;

  // Calculate content length to determine if page should be indexed
  const contentLength = (event.description?.es || '').length + (event.description?.en || '').length;
  const shouldNoIndex = contentLength < 200; // Noindex pages with less than 200 chars of content

  // Generate unique meta title with event details
  const uniqueMetaTitle = `${translatedTitle} - ${formatDateLong(event.date)} | ${event.location.city} | AquaEvents.club`;

  return (
    <>
      <SEOMeta 
        title={uniqueMetaTitle}
        description={metaDescription}
        url={`https://aquaevents.club/evento/${params.id}`}
        type="article"
        noindex={shouldNoIndex}
      />
      <EventStructuredData event={event} />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Eventos", url: "/eventos" },
        { name: translatedTitle, url: `/evento/${params.id}` }
      ]} />
      
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
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex gap-6">
                <Link href="/"><a className="text-gray-700 hover:text-blue-600">Inicio</a></Link>
                <Link href="/eventos"><a className="text-gray-700 hover:text-blue-600">Eventos</a></Link>
                <Link href="/federaciones"><a className="text-gray-700 hover:text-blue-600">Federaciones</a></Link>
                <Link href="/blog"><a className="text-gray-700 hover:text-blue-600">Blog</a></Link>
                <Link href="/enviar-evento"><a className="text-gray-700 hover:text-blue-600">Enviar Evento</a></Link>
                <Link href="/perfil"><a className="text-gray-700 hover:text-blue-600">Mi Perfil</a></Link>
              </nav>
              <LanguageSwitcher />
            </div>
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
            <span className="text-gray-900">{translatedTitle}</span>
          </nav>
        </div>

        {/* Back Button */}
        <div className="container mx-auto px-4 mb-6">
          <Button variant="outline" onClick={() => setLocation('/eventos')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.back")} {t("events.title").toLowerCase()}
          </Button>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-12">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              {/* Title and Badges */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold mb-4">{translatedTitle}</h1>
                <div className="flex gap-2">
                  <Link href={`/eventos?discipline=${encodeURIComponent(event.discipline)}`}>
                    <a>
                      <Badge variant="secondary" className="text-sm hover:bg-blue-200 cursor-pointer">
                        {getDisciplineLabel(event.discipline)}
                      </Badge>
                    </a>
                  </Link>
                  <Badge variant="outline" className="text-sm">
                    Próximo
                  </Badge>
                </div>
              </div>

              {/* Description */}
              {translatedDescription && (
                <p className="text-gray-700 mb-8 text-lg">
                  {translatedDescription}
                </p>
              )}

              {/* Two Column Layout */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Left Column - Event Info */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t("eventDetail.eventInfo")}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <span className="font-medium">{t("eventDetail.date")}:</span>
                        <span className="ml-2">
                          {formatDateLong((event as any).startDate || event.date)}
                          {(event as any).endDate && (
                            <span> - {formatDateLong((event as any).endDate)}</span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <span className="font-medium">{t("eventDetail.time")}:</span>
                        <span className="ml-2">{formatTime(event.date)}</span>
                      </div>
                    </div>
                    {event.categories && event.categories.length > 0 && (
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-orange-500 mt-0.5" />
                        <div>
                          <span className="font-medium">{t("eventDetail.category")}:</span>
                          <span className="ml-2">{event.categories.join(", ")}</span>
                        </div>
                      </div>
                    )}
                    {(event as any).price && (
                      <div className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <span className="font-medium">Precio:</span>
                          <span className="ml-2">{(event as any).price}</span>
                        </div>
                      </div>
                    )}
                    {(event as any).organizerType && (
                      <div className="flex items-start gap-3">
                        <Building className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div>
                          <span className="font-medium">{t("eventDetail.type")}:</span>
                          <span className="ml-2 capitalize">{(event as any).organizerType === 'federation' ? 'Federación' : (event as any).organizerType === 'club' ? 'Club' : 'Otro'}</span>
                        </div>
                      </div>
                    )}
                    {event.federation && (
                      <div className="flex items-start gap-3">
                        <Building className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <span className="font-medium">Federación:</span>
                          <Link href={`/eventos?organizer=${encodeURIComponent(event.federation)}`}>
                            <a className="ml-2 text-blue-600 hover:underline">{event.federation}</a>
                          </Link>
                        </div>
                      </div>
                    )}
                    {(event as any).maxCapacity && (
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <span className="font-medium">{t("eventDetail.capacity")}:</span>
                          <span className="ml-2">
                            {(event as any).currentRegistrations || 0} / {(event as any).maxCapacity}
                            {(event as any).maxCapacity !== 'ilimitado' && (event as any).currentRegistrations >= parseInt((event as any).maxCapacity) && (
                              <Badge variant="destructive" className="ml-2">{t("eventDetail.full")}</Badge>
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Location */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">{t("eventDetail.locationSection")}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <span className="font-medium">{t("eventDetail.city")}:</span>
                        <span className="ml-2">{event.location.city}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <span className="font-medium">{t("eventDetail.region")}:</span>
                        <span className="ml-2">{event.location.region}</span>
                      </div>
                    </div>
                    {event.location.venue && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                        <div>
                          <span className="font-medium">{t("eventDetail.venue")}:</span>
                          <span className="ml-2">{event.location.venue}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              {(event.contact?.email || event.contact?.website || (event as any).contactEmail || (event as any).contactPhone || (event as any).website) && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{t("eventDetail.contactSection")}</h3>
                  <div className="space-y-3">
                    {((event as any).contactEmail || event.contact?.email) && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">{t("eventDetail.email")}:</span>
                        <a href={`mailto:${(event as any).contactEmail || event.contact.email}`} className="text-blue-600 hover:underline">
                          {(event as any).contactEmail || event.contact.email}
                        </a>
                      </div>
                    )}
                    {(event as any).contactPhone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Teléfono:</span>
                        <a href={`tel:${(event as any).contactPhone}`} className="text-blue-600 hover:underline">
                          {(event as any).contactPhone}
                        </a>
                      </div>
                    )}
                    {((event as any).website || event.contact?.website) && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">{t("eventDetail.website")}:</span>
                        <a href={(event as any).website || event.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {(event as any).website || event.contact.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Event Actions */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">{t("eventDetail.eventActions")}</h3>
                <div className="flex flex-wrap gap-3">
                  {event.registrationUrl && (
                    <Button asChild className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600">
                      <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t("eventDetail.registerEvent")}
                      </a>
                    </Button>
                  )}
                  <Button onClick={handleAddToCalendar} className="bg-blue-600 hover:bg-blue-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    {t("eventDetail.addToCalendar")}
                  </Button>
                  <Button onClick={handleShare} variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    {t("events.share")}
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
                  {isAuthenticated && (
                    <Dialog open={reminderDialogOpen} onOpenChange={setReminderDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Bell className="w-4 h-4 mr-2" />
                          {t("eventDetail.remindMe")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>¿Cuándo quieres recibir el recordatorio?</DialogTitle>
                          <DialogDescription>
                            Selecciona cuándo te gustaría recibir una notificación sobre este evento.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-3 py-4">
                          <Button
                            onClick={() => handleCreateReminder("1_week")}
                            variant="outline"
                            className="justify-start"
                            disabled={createReminderMutation.isPending}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Una semana antes
                          </Button>
                          <Button
                            onClick={() => handleCreateReminder("3_days")}
                            variant="outline"
                            className="justify-start"
                            disabled={createReminderMutation.isPending}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Tres días antes
                          </Button>
                          <Button
                            onClick={() => handleCreateReminder("1_day")}
                            variant="outline"
                            className="justify-start"
                            disabled={createReminderMutation.isPending}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Un día antes
                          </Button>
                          <Button
                            onClick={() => handleCreateReminder("same_day")}
                            variant="outline"
                            className="justify-start"
                            disabled={createReminderMutation.isPending}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            El mismo día
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
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

              {/* FAQ Section */}
              {(event as any).faqItems && (event as any).faqItems.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h3>
                  <div className="space-y-4">
                    {(event as any).faqItems.map((faq: { question: string; answer: string }, index: number) => (
                      <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <h4 className="font-semibold text-lg mb-2">{faq.question}</h4>
                          <p className="text-gray-700">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Equipment Service Section - Commercial Context for SEO/AI */}
              <EquipmentServiceSection
                eventName={translatedTitle}
                eventId={event._id?.toString() || params.id || ''}
                city={event.location.city}
                eventDate={event.date}
                discipline={event.discipline}
              />

              {/* Original material section preserved for reference
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                <p className="text-sm text-gray-500 mt-3">
                  Mínimo 50 unidades · Envío gratis península · 25 años de experiencia
                </p>
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

                  <Link href={getSmartCapsLink()}>
                    <a className="block p-4 border-2 border-orange-200 rounded-lg hover:border-orange-400 transition-colors">
                      <div className="text-2xl mb-2">🎽</div>
                      <h4 className="font-semibold mb-1">Gorros Personalizados para Eventos</h4>
                      <p className="text-sm text-gray-600">
                        25 años de experiencia | +1M gorros producidos | Envío gratis UE
                      </p>
                    </a>
                  </Link>

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

        {/* Recommended Gear - Amazon Affiliate Section */}
        <div className="container mx-auto px-4 mb-12">
          <RecommendedGear 
            discipline={event.discipline}
            eventName={translatedTitle}
          />
        </div>

        {/* Related Events */}
        <RelatedEvents eventId={event._id.toString()} discipline={event.discipline} />

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
                <h4 className="font-semibold mb-4">Gorros Personalizados</h4>
                <Link href={getSmartCapsLink()}>
                  <a className="text-blue-400 hover:text-blue-300">
                    AquaEvents.club
                  </a>
                </Link>
                <p className="text-sm text-gray-400 mt-2">Official Equipment Partner</p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>© 2025 AquaEvents.club. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Product Carousel Popup */}
      {showPopup && event && (
        <ProductCarouselPopup
          products={popupProducts}
          title="¿Necesitas equipo para este evento?"
          subtitle="Productos recomendados para mejorar tu rendimiento"
          onClose={closePopup}
        />
      )}
    </>
  );
}


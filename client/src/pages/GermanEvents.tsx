import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AwinBanner from "@/components/AwinBanner";
import RecommendedGear from "@/components/RecommendedGear";

export default function GermanEvents() {
  const language = 'de'; // German language for this page
  const { data, isLoading } = trpc.germanEvents.listByCountry.useQuery({ countryCode: "DE" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

  const events = data?.events || [];

  // Parse multilingual fields
  const parseMultilingual = (field: string | null, fallback: string = '') => {
    if (!field) return fallback;
    try {
      const parsed = JSON.parse(field);
      return parsed[language] || parsed.en || parsed.es || fallback;
    } catch {
      return field;
    }
  };

  // Group events by type
  const swimmingEvents = events.filter(e => e.eventType === 'swimming' || e.eventType === 'open_water');
  const triathlonEvents = events.filter(e => e.eventType === 'triathlon');
  const duathlonEvents = events.filter(e => e.eventType === 'duathlon');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">
            {language === 'de' ? 'Schwimm- und Triathlon-Veranstaltungen in Deutschland' : 
             language === 'en' ? 'Swimming and Triathlon Events in Germany' :
             'Eventos de Natación y Triatlón en Alemania'}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {language === 'de' ? 'Entdecken Sie die besten Schwimm- und Triathlon-Veranstaltungen in Deutschland. Von IRONMAN bis zu lokalen Wettkämpfen.' :
             language === 'en' ? 'Discover the best swimming and triathlon events in Germany. From IRONMAN to local competitions.' :
             'Descubre los mejores eventos de natación y triatlón en Alemania. Desde IRONMAN hasta competiciones locales.'}
          </p>
          <div className="mt-8 flex gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              {events.length} {language === 'de' ? 'Veranstaltungen' : language === 'en' ? 'Events' : 'Eventos'}
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Event Tabs */}
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="all">Alle</TabsTrigger>
            <TabsTrigger value="swimming">Schwimmen</TabsTrigger>
            <TabsTrigger value="triathlon">Triathlon</TabsTrigger>
            <TabsTrigger value="duathlon">Duathlon</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <EventGrid events={events} language={language} parseMultilingual={parseMultilingual} />
          </TabsContent>

          <TabsContent value="swimming" className="mt-8">
            <EventGrid events={swimmingEvents} language={language} parseMultilingual={parseMultilingual} />
            <div className="mt-12">
              <RecommendedGear />
            </div>
          </TabsContent>

          <TabsContent value="triathlon" className="mt-8">
            <EventGrid events={triathlonEvents} language={language} parseMultilingual={parseMultilingual} />
            <div className="mt-12">
              <AwinBanner />
            </div>
          </TabsContent>

          <TabsContent value="duathlon" className="mt-8">
            <EventGrid events={duathlonEvents} language={language} parseMultilingual={parseMultilingual} />
            <div className="mt-12">
              <AwinBanner />
            </div>
          </TabsContent>
        </Tabs>

        {/* City Quick Links */}
        <section className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6">
            {language === 'de' ? 'Veranstaltungen nach Stadt' :
             language === 'en' ? 'Events by City' :
             'Eventos por Ciudad'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Berlin', 'Hamburg', 'Cologne', 'Frankfurt', 'Leipzig', 'Roth', 'Östringen', 'Lensahn'].map(city => (
              <Button
                key={city}
                variant="outline"
                className="h-auto py-4"
                onClick={() => window.location.href = `/${language}/events/${city.toLowerCase()}`}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {city}
              </Button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function EventGrid({ 
  events, 
  language, 
  parseMultilingual 
}: { 
  events: any[]; 
  language: string;
  parseMultilingual: (field: string | null, fallback?: string) => string;
}) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          {language === 'de' ? 'Keine Veranstaltungen gefunden' :
           language === 'en' ? 'No events found' :
           'No se encontraron eventos'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id} className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <Badge variant={event.eventType === 'triathlon' ? 'default' : 'secondary'}>
                {event.eventType}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {event.date ? new Date(event.date).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'en' ? 'en-US' : 'es-ES') : 'TBD'}
              </span>
            </div>
            <CardTitle className="text-xl">
              {parseMultilingual(event.title, 'Untitled Event')}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {event.city}, {event.country}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {parseMultilingual(event.description, '')}
            </p>
            {event.worldTriathlonUrl && (
              <Button variant="default" className="w-full" asChild>
                <a href={event.worldTriathlonUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {language === 'de' ? 'Mehr erfahren' :
                   language === 'en' ? 'Learn More' :
                   'Más información'}
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

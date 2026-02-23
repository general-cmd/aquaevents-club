import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ExternalLink, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AwinBanner from "@/components/AwinBanner";
import RecommendedGear from "@/components/RecommendedGear";
import { useLocation } from "wouter";

interface GermanCityEventsProps {
  city: string;
}

export default function GermanCityEvents({ city }: GermanCityEventsProps) {
  const language = 'de'; // German language for city pages
  const [, setLocation] = useLocation();
  const { data, isLoading } = trpc.germanEvents.listByCity.useQuery({ city });

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

  const hasTriathlon = events.some(e => e.eventType === 'triathlon' || e.eventType === 'duathlon');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 mb-4"
            onClick={() => setLocation(`/de/events`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zu allen Veranstaltungen
          </Button>
          <h1 className="text-5xl font-bold mb-4">
            Veranstaltungen in {city}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Alle Schwimm- und Triathlon-Veranstaltungen in {city}, Deutschland
          </p>
          <div className="mt-8">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              {events.length} Veranstaltungen
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {language === 'de' ? `Keine Veranstaltungen in ${city} gefunden` :
               language === 'en' ? `No events found in ${city}` :
               `No se encontraron eventos en ${city}`}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setLocation(`/de/events`)}
            >
              Alle Veranstaltungen anzeigen
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                      {event.venue || event.city}
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

            {/* Show appropriate affiliate content */}
            {hasTriathlon ? (
              <div className="mt-12">
                <AwinBanner />
              </div>
            ) : (
              <div className="mt-12">
                <RecommendedGear />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

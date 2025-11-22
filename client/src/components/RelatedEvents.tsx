import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

interface RelatedEventsProps {
  eventId: string;
  discipline: string;
}

export default function RelatedEvents({ eventId, discipline }: RelatedEventsProps) {
  const { data, isLoading } = trpc.events.getRelated.useQuery({
    eventId,
    discipline,
    limit: 3,
  });

  if (isLoading || !data?.success || data.events.length === 0) {
    return null;
  }

  const getDisciplineLabel = (disc: string) => {
    const labels: Record<string, string> = {
      swimming: "Natación",
      triathlon: "Triatlón",
      waterpolo: "Waterpolo",
      "open-water": "Aguas Abiertas",
      duathlon: "Duatlón",
      synchronized_swimming: "Natación Artística",
    };
    return labels[disc] || disc;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Eventos Relacionados
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {data.events.map((event: any) => (
          <Card key={event._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Badge className="mb-3">{getDisciplineLabel(event.discipline)}</Badge>
              <h3 className="text-xl font-bold mb-3 line-clamp-2">
                {event.name.es}
              </h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location.city}, {event.location.region}
                </div>
              </div>
              <Link href={`/evento/${encodeURIComponent(event._id)}`}>
                <Button variant="outline" className="w-full">
                  Ver Detalles
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


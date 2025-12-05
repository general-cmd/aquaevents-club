/**
 * Event card component with AI-powered translation
 */

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "wouter";
import { useEventTitle } from "@/hooks/useEventTranslation";
import { useTranslation } from "react-i18next";

interface EventCardProps {
  event: {
    _id: string;
    name: { es: string; en: string } | string;
    date: string;
    location: { city: string; region: string };
    discipline: string;
    seo?: { canonical: string };
  };
  getDisciplineIcon: (discipline: string) => string;
  getDisciplineLabel: (discipline: string) => string;
  formatDate: (date: string) => string;
}

export default function EventCard({ event, getDisciplineIcon, getDisciplineLabel, formatDate }: EventCardProps) {
  const { t } = useTranslation();
  
  // Extract Spanish title
  const spanishTitle = typeof event.name === 'string' ? event.name : event.name.es;
  
  // Get translated title based on current language
  const translatedTitle = useEventTitle(spanishTitle);

  return (
    <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
            {getDisciplineIcon(event.discipline)} {getDisciplineLabel(event.discipline)}
          </Badge>
          <div className="text-sm font-semibold text-gray-700">
            {formatDate(event.date)}
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {translatedTitle || spanishTitle}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 text-blue-500" />
          <span>{event.location.city}, {event.location.region}</span>
        </div>

        <Link href={`/eventos/${(() => {
          // Extract slug from canonical URL or use _id as fallback
          if (event.seo?.canonical) {
            const parts = event.seo.canonical.split('/');
            return encodeURIComponent(parts[parts.length - 1]);
          }
          return event._id;
        })()}`}>
          <a>
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
            >
              {t("events.viewDetails")}
            </Button>
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}

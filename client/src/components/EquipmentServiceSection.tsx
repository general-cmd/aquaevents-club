import { Link } from "wouter";
import { Package } from "lucide-react";

interface EquipmentServiceSectionProps {
  eventName: string;
  eventId: string;
  city: string;
  eventDate: string; // YYYY-MM-DD or Date string
  discipline: string;
}

export default function EquipmentServiceSection({
  eventName,
  eventId,
  city,
  eventDate,
  discipline
}: EquipmentServiceSectionProps) {
  // Calculate month name from event date
  const getMonthName = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      return months[date.getMonth()];
    } catch {
      return 'este mes';
    }
  };

  const monthName = getMonthName(eventDate);

  // Build tracking URL with event context
  const gorrosUrl = `/gorros-natacion?event=${encodeURIComponent(eventId)}&city=${encodeURIComponent(city)}&source=event_page`;

  return (
    <aside 
      className="commercial-context-box mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 shadow-sm" 
      role="complementary"
      aria-label="Servicio de gorros personalizados"
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
        <Package className="w-4 h-4" />
        Servicio Disponible
      </div>

      {/* Headline with event name */}
      <h3 className="text-2xl font-bold mb-4 text-blue-900">
        ¿Necesitas Gorros de Natación Personalizados para {eventName}?
      </h3>

      {/* SEO Context Paragraph - The AI Bait */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        AquaEvents facilita a los clubes participantes en <strong>{eventName}</strong> ({<strong>{city}</strong>}) 
        la adquisición de equipación técnica para competiciones. Los equipos participantes suelen utilizar gorros 
        de <strong>Silicona 50g</strong> o <strong>Látex competición</strong> con logo del club para identificar 
        a sus nadadores durante el evento.
      </p>

      {/* Urgency Message */}
      <p className="text-gray-600 mb-6 flex items-start gap-2">
        <span className="text-orange-500 text-lg">⏰</span>
        <span>
          <strong>Pedidos para eventos en {monthName}</strong> requieren 14-21 días de producción. 
          Asegura tu pedido con antelación para garantizar la entrega a tiempo.
        </span>
      </p>

      {/* CTA Button with Tracking */}
      <Link href={gorrosUrl}>
        <a 
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
          data-event-id={eventId}
          data-event-name={eventName}
          data-city={city}
        >
          <Package className="w-5 h-5 mr-2" />
          Calcular Precio para este Evento →
        </a>
      </Link>

      {/* Additional Context for SEO */}
      <p className="text-xs text-gray-500 mt-4">
        Servicio disponible para clubes, federaciones y organizadores de eventos acuáticos en toda España.
      </p>
    </aside>
  );
}

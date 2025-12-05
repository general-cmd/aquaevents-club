import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2, Calendar, MapPin, Users } from "lucide-react";
import { getTranslation, formatDate, getWeekday, getMonthYear, type Language } from "@/lib/widgetTranslations";

interface WidgetParams {
  fed?: string;
  mode: 'all' | 'own';
  discipline?: string;
  region?: string;
  style: 'list' | 'calendar' | 'cards';
  color: string;
  lang: Language;
}

export default function WidgetCalendar() {
  const [, setLocation] = useLocation();
  const [params, setParams] = useState<WidgetParams>({
    mode: 'all',
    style: 'list',
    color: '0ea5e9',
    lang: 'es',
  });

  useEffect(() => {
    // Parse URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    setParams({
      fed: urlParams.get('fed') || undefined,
      mode: (urlParams.get('mode') as 'all' | 'own') || 'all',
      discipline: urlParams.get('discipline') || undefined,
      region: urlParams.get('region') || undefined,
      style: (urlParams.get('style') as 'list' | 'calendar' | 'cards') || 'list',
      color: urlParams.get('color') || '0ea5e9',
      lang: (urlParams.get('lang') as Language) || 'es',
    });
  }, []);

  const { data, isLoading } = trpc.widget.getEvents.useQuery({
    federationId: params.fed,
    mode: params.mode,
    discipline: params.discipline,
    region: params.region,
    limit: 50,
  });

  const t = getTranslation(params.lang);
  const primaryColor = `#${params.color}`;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const events = data?.events || [];

  // List View
  if (params.style === 'list') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {t.upcomingEvents}
            </h1>
            <p className="text-slate-600 text-sm">
              {events.length} {events.length === 1 ? t.event : t.events} {t.eventsAvailable}
            </p>
          </div>

          {events.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p className="text-slate-600">{t.noEvents}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((event: any) => (
                <div
                  key={event._id}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 ${
                    event.isOwnEvent ? 'ring-2' : ''
                  }`}
                  style={event.isOwnEvent ? { borderColor: primaryColor, borderWidth: '2px' } : {}}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {event.isOwnEvent && (
                          <span
                            className="px-2 py-0.5 rounded text-xs font-medium text-white"
                            style={{ backgroundColor: primaryColor }}
                          >
                            {params.lang === 'es' && 'Nuestro Evento'}
                            {params.lang === 'ca' && 'El Nostre Esdeveniment'}
                            {params.lang === 'eu' && 'Gure Ekitaldia'}
                            {params.lang === 'gl' && 'O Noso Evento'}
                            {params.lang === 'va' && 'El Nostre Esdeveniment'}
                            {params.lang === 'en' && 'Our Event'}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                          {event.discipline}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {event.name?.es || event.name}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(event.date, params.lang)}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location?.city || event.city}, {event.location?.region || event.region}
                        </div>
                        {event.maxCapacity && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.currentRegistrations || 0}/{event.maxCapacity}
                          </div>
                        )}
                      </div>
                    </div>
                    {event.registrationUrl && (
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {t.register}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Powered by footer */}
          <div className="mt-8 text-center">
            <a
              href="https://aquaevents.club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              {t.poweredBy}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Cards View
  if (params.style === 'cards') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {t.upcomingEvents}
            </h1>
            <p className="text-slate-600 text-sm">
              {events.length} {events.length === 1 ? t.event : t.events} {t.eventsAvailable}
            </p>
          </div>

          {events.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p className="text-slate-600">{t.noEvents}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event: any) => (
                <div
                  key={event._id}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
                    event.isOwnEvent ? 'ring-2' : ''
                  }`}
                  style={event.isOwnEvent ? { borderColor: primaryColor, borderWidth: '2px' } : {}}
                >
                  {event.isOwnEvent && (
                    <div
                      className="px-4 py-2 text-center text-sm font-medium text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {params.lang === 'es' && 'Nuestro Evento'}
                      {params.lang === 'ca' && 'El Nostre Esdeveniment'}
                      {params.lang === 'eu' && 'Gure Ekitaldia'}
                      {params.lang === 'gl' && 'O Noso Evento'}
                      {params.lang === 'va' && 'El Nostre Esdeveniment'}
                      {params.lang === 'en' && 'Our Event'}
                    </div>
                  )}
                  <div className="p-4">
                    <div className="mb-3">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                        {event.discipline}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-3 line-clamp-2">
                      {event.name?.es || event.name}
                    </h3>
                    <div className="space-y-2 text-sm text-slate-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="line-clamp-1">{formatDate(event.date, params.lang)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="line-clamp-1">
                          {event.location?.city || event.city}, {event.location?.region || event.region}
                        </span>
                      </div>
                      {event.maxCapacity && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 flex-shrink-0" />
                          <span>{event.currentRegistrations || 0}/{event.maxCapacity}</span>
                        </div>
                      )}
                    </div>
                    {event.registrationUrl && (
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity text-center"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {t.register}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Powered by footer */}
          <div className="mt-8 text-center">
            <a
              href="https://aquaevents.club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              {t.poweredBy}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Calendar View (simplified month view)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {t.calendarTitle}
          </h1>
          <p className="text-slate-600 text-sm">
            {events.length} {events.length === 1 ? t.event : t.events} {t.upcomingEventsShort}
          </p>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-slate-600">{t.noEvents}</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-6">
              {Object.entries(
                events.reduce((acc: Record<string, any[]>, event: any) => {
                  const monthYear = getMonthYear(event.date, params.lang);
                  if (!acc[monthYear]) acc[monthYear] = [];
                  acc[monthYear].push(event);
                  return acc;
                }, {} as Record<string, any[]>)
              ).map(([monthYear, monthEvents]) => (
                <div key={monthYear}>
                  <h2
                    className="text-lg font-semibold mb-3 pb-2 border-b-2 capitalize"
                    style={{ borderColor: primaryColor }}
                  >
                    {monthYear}
                  </h2>
                  <div className="space-y-2">
                    {monthEvents.map((event: any) => (
                      <div
                        key={event._id}
                        className={`flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors ${
                          event.isOwnEvent ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="text-center flex-shrink-0">
                          <div
                            className="text-2xl font-bold"
                            style={{ color: event.isOwnEvent ? primaryColor : '#334155' }}
                          >
                            {new Date(event.date).getDate()}
                          </div>
                          <div className="text-xs text-slate-500 uppercase">
                            {getWeekday(event.date, params.lang)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {event.isOwnEvent && (
                              <span
                                className="px-2 py-0.5 rounded text-xs font-medium text-white"
                                style={{ backgroundColor: primaryColor }}
                              >
                                {params.lang === 'es' && 'Nuestro Evento'}
                                {params.lang === 'ca' && 'El Nostre Esdeveniment'}
                                {params.lang === 'eu' && 'Gure Ekitaldia'}
                                {params.lang === 'gl' && 'O Noso Evento'}
                                {params.lang === 'va' && 'El Nostre Esdeveniment'}
                                {params.lang === 'en' && 'Our Event'}
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                              {event.discipline}
                            </span>
                          </div>
                          <h3 className="font-medium text-slate-900 truncate">
                            {event.name?.es || event.name}
                          </h3>
                          <p className="text-sm text-slate-600 truncate">
                            {event.location?.city || event.city}, {event.location?.region || event.region}
                          </p>
                        </div>
                        {event.registrationUrl && (
                          <a
                            href={event.registrationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded text-sm font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap"
                            style={{ backgroundColor: primaryColor }}
                          >
                            {t.register}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Powered by footer */}
        <div className="mt-8 text-center">
          <a
            href="https://aquaevents.club"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
          >
            {t.poweredBy}
          </a>
        </div>
      </div>
    </div>
  );
}

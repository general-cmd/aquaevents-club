import { Link, useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Phone, Globe, MapPin, Calendar, ArrowLeft } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function FederationDetail() {
  const [, params] = useRoute("/federaciones/:id");
  const federationId = params?.id || "";

  const { data: federationData, isLoading: federationLoading } = trpc.federations.getById.useQuery({ id: federationId });
  const { data: eventsData, isLoading: eventsLoading } = trpc.federations.getEvents.useQuery({ federationId });

  const federation = federationData?.federation;
  const events = eventsData?.events || [];

  if (federationLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando federación...</p>
        </div>
      </div>
    );
  }

  if (!federation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-12 text-center">
            <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Federación no encontrada</h2>
            <p className="text-gray-600 mb-6">
              La federación que buscas no existe o ha sido eliminada.
            </p>
            <Link href="/federaciones">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
                Ver todas las federaciones
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-3">
                <img src="/logo.png" alt="AquaEvents.club" className="w-12 h-12" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  AquaEvents.club
                </span>
              </a>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <Link href="/federaciones">Federaciones</Link>
          <span>/</span>
          <span className="text-gray-900">{federation.name}</span>
        </div>
      </div>

      {/* Federation Info */}
      <section className="container mx-auto px-4 py-8">
        <Link href="/federaciones">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Federaciones
          </Button>
        </Link>

        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {federation.logo && (
                <img 
                  src={federation.logo} 
                  alt={federation.name}
                  className="w-32 h-32 object-contain"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{federation.name}</h1>
                  {federation.acronym && (
                    <Badge variant="outline">{federation.acronym}</Badge>
                  )}
                </div>
                {federation.description && (
                  <p className="text-gray-600 mb-4">{federation.description}</p>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  {federation.region && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span>{federation.region}</span>
                    </div>
                  )}
                  {federation.email && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <a href={`mailto:${federation.email}`} className="hover:text-blue-600">
                        {federation.email}
                      </a>
                    </div>
                  )}
                  {federation.phone && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <a href={`tel:${federation.phone}`} className="hover:text-blue-600">
                        {federation.phone}
                      </a>
                    </div>
                  )}
                  {federation.website && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <a 
                        href={federation.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-600"
                      >
                        Sitio web oficial
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Section */}
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Eventos Organizados</h2>
        {eventsLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: any) => {
              const slug = event.seo?.canonical?.split('/').pop() || event._id;
              return (
                <Card key={event._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Badge className="mb-3">{event.discipline}</Badge>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">
                      {event.name?.es || event.name}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {event.location?.city}, {event.location?.region}
                      </div>
                    </div>
                    <Link href={`/eventos/${encodeURIComponent(slug)}`}>
                      <Button variant="outline" className="w-full">
                        Ver Detalles
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">
                No hay eventos próximos organizados por esta federación.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}


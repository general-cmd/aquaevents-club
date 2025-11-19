import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, MapPin, User } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function UserFavorites() {
  const { user, loading, isAuthenticated } = useAuth();
  
  const { data: favoritesData, isLoading: favoritesLoading } = trpc.favorites.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const { data: eventsData } = trpc.events.list.useQuery({ limit: 500 });

  const removeFavoriteMutation = trpc.favorites.remove.useMutation({
    onSuccess: () => {
      // Invalidate favorites list to refresh
      trpc.useUtils().favorites.list.invalidate();
    },
  });

  if (loading || favoritesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <img 
                    src="/logo.png" 
                    alt="AquaEvents.club" 
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    AquaEvents.club
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <Heart className="w-20 h-20 mx-auto mb-6 text-gray-400" />
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                Inicia Sesión
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Necesitas iniciar sesión para ver tus eventos favoritos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={getLoginUrl()}>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                    Iniciar Sesión
                  </Button>
                </a>
                <Link href="/">
                  <Button variant="outline">
                    Volver al Inicio
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  // Get favorite event IDs
  const favoriteEventIds = favoritesData?.favorites?.map((f: any) => f.eventId) || [];
  
  // Filter events to show only favorites
  const favoriteEvents = eventsData?.events?.filter((event: any) => 
    favoriteEventIds.includes(event._id?.toString())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img 
                  src="/logo.png" 
                  alt="AquaEvents.club" 
                  className="w-12 h-12 object-contain"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  AquaEvents.club
                </span>
              </a>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/eventos">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Eventos
                </a>
              </Link>
              <Link href="/federaciones">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Federaciones
                </a>
              </Link>
              <Link href="/blog">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Blog
                </a>
              </Link>
              <Link href="/perfil">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Mi Perfil
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Favorites Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Mis Eventos Favoritos
            </h1>
            <p className="text-lg text-gray-600">
              Eventos que has guardado para seguir de cerca
            </p>
          </div>

          {favoriteEvents.length === 0 ? (
            <Card className="max-w-2xl mx-auto text-center">
              <CardContent className="p-12">
                <Heart className="w-20 h-20 mx-auto mb-6 text-gray-400" />
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  No tienes favoritos aún
                </h3>
                <p className="text-gray-600 mb-6">
                  Explora eventos y guárdalos como favoritos para encontrarlos fácilmente aquí
                </p>
                <Link href="/eventos">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                    Explorar Eventos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteEvents.map((event: any) => {
                const eventName = event.name?.es || event.title || "Evento sin nombre";
                const eventDate = event.date || "Fecha por confirmar";
                const eventCity = event.location?.city || event.city || "Ciudad";
                const eventRegion = event.location?.region || event.region || "Región";
                const discipline = event.discipline || "Disciplina";
                
                // Extract slug from canonical URL
                const canonicalUrl = event.seo?.canonical || "";
                const slug = canonicalUrl.split("/").pop() || event._id;

                return (
                  <Card key={event._id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          {discipline}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFavoriteMutation.mutate({ eventId: event._id.toString() })}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </Button>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-3 text-gray-900 line-clamp-2">
                        {eventName}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(eventDate).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {eventCity}, {eventRegion}
                        </div>
                      </div>

                      <Link href={`/eventos/${encodeURIComponent(slug)}`}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                          Ver Detalles
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


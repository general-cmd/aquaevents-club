import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Mail, Phone, Globe, MapPin } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Federations() {
  const { data, isLoading } = trpc.federations.list.useQuery();

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
                <a className="text-blue-600 font-medium">
                  Federaciones
                </a>
              </Link>
              <Link href="/blog">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Blog
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Federaciones Acuáticas de España
          </h1>
          <p className="text-lg text-gray-600">
            Descubre las federaciones nacionales, autonómicas y clubes que organizan eventos acuáticos en toda España
          </p>
        </div>

        {/* Federations Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Cargando federaciones...</p>
          </div>
        ) : data?.federations && data.federations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.federations.map((federation: any) => (
              <Card key={federation.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {federation.logo && (
                    <img 
                      src={federation.logo} 
                      alt={federation.name}
                      className="w-20 h-20 object-contain mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {federation.name}
                  </h3>
                  {federation.acronym && (
                    <p className="text-sm text-gray-500 mb-3">{federation.acronym}</p>
                  )}
                  {federation.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{federation.description}</p>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    {federation.region && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {federation.region}
                      </div>
                    )}
                    {federation.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${federation.email}`} className="hover:text-blue-600">
                          {federation.email}
                        </a>
                      </div>
                    )}
                    {federation.website && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4" />
                        <a 
                          href={federation.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-blue-600"
                        >
                          Sitio web
                        </a>
                      </div>
                    )}
                  </div>

                  <Link href={`/federaciones/${federation.id}`}>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                      Ver Eventos
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                Próximamente
              </h3>
              <p className="text-gray-600 mb-6">
                Estamos trabajando en añadir información detallada de todas las federaciones acuáticas de España.
              </p>
              <Link href="/eventos">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                  Ver Eventos
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}


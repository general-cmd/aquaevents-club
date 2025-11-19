import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_LOGO } from "@/const";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt="AquaEvents.club" className="h-12 w-12 rounded-full" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              AquaEvents.club
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/eventos" className="text-gray-700 hover:text-blue-600 transition-colors">
              Eventos
            </a>
            <a href="/federaciones" className="text-gray-700 hover:text-blue-600 transition-colors">
              Federaciones
            </a>
            <a href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
              Blog
            </a>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
              Suscríbete Gratis
            </Button>
          </nav>
          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Tu Calendario Completo de Eventos Acuáticos en España 2026
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Descubre competiciones de natación, triatlón, waterpolo y aguas abiertas. 
            Actualizado mensualmente con eventos de la RFEN, FETRI y federaciones autonómicas.
          </p>
          
          {/* Newsletter CTA */}
          <Card className="max-w-2xl mx-auto bg-white shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                🏊 Descarga GRATIS la Guía de Supervivencia para Clubes Acuáticos 2025
              </h3>
              <ul className="text-left mb-6 space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  Más de €10,000 en Subvenciones Ocultas
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  30 Días para Aumentar Ingresos en 25%
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  Sistemas que Ahorran 10+ Horas Semanales
                </li>
              </ul>
              {/* Systeme.io form will be injected here */}
              <div id="newsletter-form">
                <script
                  id="form-script-tag-20543028"
                  src="https://go.aquaevents.club/public/remote/page/333287841dd1b4e8a4dd8be9446652d6ece139e0.js"
                ></script>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">300+</div>
              <div className="text-blue-100">Eventos Anuales</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">17</div>
              <div className="text-blue-100">Federaciones</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4</div>
              <div className="text-blue-100">Deportes</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Gratis</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          ¿Por qué AquaEvents.club?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Actualizado Mensualmente</h3>
              <p className="text-gray-600 text-sm">
                Calendario completo actualizado el día 15 de cada mes
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Toda España</h3>
              <p className="text-gray-600 text-sm">
                Eventos de todas las comunidades autónomas
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Fuentes Oficiales</h3>
              <p className="text-gray-600 text-sm">
                Datos directos de RFEN, FETRI y federaciones autonómicas
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Para Clubes</h3>
              <p className="text-gray-600 text-sm">
                Recursos, guías y herramientas para gestionar tu club
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sponsor CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto border-2 border-blue-200 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    🎯 ¿Tu club necesita gorros personalizados?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Entrega rápida</span> • 
                    <span className="font-semibold"> Diseño gratis</span> • 
                    <span className="font-semibold"> Calidad premium</span>
                  </p>
                  <p className="text-lg font-bold text-blue-600 mb-4">
                    Usa AQUA20 para 20% descuento
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 w-full md:w-auto"
                    onClick={() => window.open('https://euroswimcaps.com?coupon=AQUA20', '_blank')}
                  >
                    Personaliza Ahora →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Próximos Eventos
          </h2>
          <Button variant="outline" className="hidden md:inline-flex">
            Ver Todos →
          </Button>
        </div>
        <div className="text-center text-gray-600 py-12">
          <p>Cargando eventos...</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={APP_LOGO} alt="AquaEvents.club" className="h-10 w-10 rounded-full" />
                <span className="font-bold text-lg">AquaEvents.club</span>
              </div>
              <p className="text-gray-400 text-sm">
                El calendario más completo de eventos acuáticos en España
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Eventos</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/eventos" className="hover:text-white">Todos los Eventos</a></li>
                <li><a href="/eventos?sport=natacion" className="hover:text-white">Natación</a></li>
                <li><a href="/eventos?sport=triatlon" className="hover:text-white">Triatlón</a></li>
                <li><a href="/eventos?sport=waterpolo" className="hover:text-white">Waterpolo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="/federaciones" className="hover:text-white">Federaciones</a></li>
                <li><a href="/guia-subvenciones" className="hover:text-white">Guía de Subvenciones</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/privacidad" className="hover:text-white">Política de Privacidad</a></li>
                <li><a href="/terminos" className="hover:text-white">Términos de Servicio</a></li>
                <li><a href="/contacto" className="hover:text-white">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 AquaEvents.club. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


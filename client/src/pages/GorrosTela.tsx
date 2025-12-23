import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Truck, Clock, Users, Heart } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import BulkOrderCalculator from "@/components/BulkOrderCalculator";
import CapTestimonials from "@/components/CapTestimonials";
import DesignPreviewTool from "@/components/DesignPreviewTool";

/**
 * Polyester & Lycra Swimming Caps Product Page
 * Pricing: Polyester €2.10, Lycra €2.80-€3.50 for recreational/merchandising
 * Perfect for children, swim schools, and comfortable recreational swimming
 */
export default function GorrosTela() {
  return (
    <>
      <Helmet>
        <title>Gorros de Tela Personalizados | Poliéster y Lycra | Desde €2.10 | AquaEvents.club</title>
        <meta
          name="description"
          content="Gorros de tela (poliéster y lycra) personalizados desde €2.10. Ideales para niños, escuelas de natación y uso recreativo. Cómodos, ligeros y 100% hipoalergénicos. Envío gratis."
        />
        <link rel="canonical" href="https://aquaevents.club/gorros-natacion/tela" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Gorros de Tela Personalizados - Poliéster y Lycra" />
        <meta property="og:description" content="Gorros de tela cómodos y ligeros desde €2.10. Perfectos para escuelas de natación y uso recreativo." />
        <meta property="og:image" content="https://aquaevents.club/gorro-lycra-hero.jpg" />
        <meta property="og:url" content="https://aquaevents.club/gorros-natacion/tela" />

        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Gorros de Tela Personalizados (Poliéster y Lycra)",
            "description": "Gorros de natación de tela personalizados. Disponibles en poliéster (€2.10) y lycra (€2.80-€3.50). Ideales para niños, escuelas de natación y uso recreativo. Cómodos, ligeros y 100% hipoalergénicos.",
            "image": "https://aquaevents.club/gorro-lycra-hero.jpg",
            "brand": {
              "@type": "Brand",
              "name": "EuroSwimCaps"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "EUR",
              "lowPrice": "2.10",
              "highPrice": "3.50",
              "offerCount": "2",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "AquaEvents.club"
              }
            }
          })}
        </script>

        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://aquaevents.club",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Gorros de Natación",
                "item": "https://aquaevents.club/gorros-natacion",
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Gorros de Tela",
                "item": "https://aquaevents.club/gorros-natacion/tela",
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-20">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div>
              <nav className="text-sm mb-6 opacity-90">
                <Link href="/" className="hover:underline">INICIO</Link>
                <span className="mx-2">•</span>
                <Link href="/gorros-natacion" className="hover:underline">GORROS DE NATACIÓN</Link>
                <span className="mx-2">•</span>
                <span>GORROS DE TELA</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 italic">
                GORROS DE TELA PERSONALIZADOS
              </h1>
              <p className="text-xl mb-8">
                Gorros de poliéster y lycra ideales para escuelas de natación, niños y uso recreativo. Cómodos, ligeros y perfectos para merchandising.
              </p>
              <p className="text-lg mb-8">
                Nuestros gorros de tela ofrecen máxima comodidad con materiales suaves y elásticos. Disponibles en poliéster (económico) y lycra (máxima elasticidad). Perfectos para programas de aprendizaje y natación recreativa.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                  <a href="#presupuesto">
                    Solicitar Presupuesto
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/gorros-natacion">
                    Ver Todos los Gorros
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img
                src="/gorro-lycra-hero.jpg"
                alt="Gorros de tela personalizados - poliéster y lycra"
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-5xl">
            <h2 className="text-3xl font-bold text-center mb-4">Precios Gorros de Tela Personalizados</h2>
            <p className="text-center text-gray-600 mb-12">
              Precio estándar para 100 gorros <strong>incluyendo envío gratuito</strong>. Pedido mínimo 50 piezas. Descuentos significativos en 250, 500, 1000 y 1500+ piezas.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Card className="border-2 border-teal-600 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-teal-50">
                  <CardTitle className="text-center text-2xl">Gorros de Poliéster</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 mb-2">1 color de impresión</p>
                    <p className="text-5xl font-bold text-teal-600 mb-2">€2.10</p>
                    <p className="text-gray-600">por unidad</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">100% poliéster suave y ligero</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Ideal para niños y escuelas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Económico para eventos masivos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">10 colores disponibles</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-cyan-600 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-cyan-50">
                  <CardTitle className="text-center text-2xl">Gorros de Lycra</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 mb-2">1 color de impresión</p>
                    <p className="text-5xl font-bold text-cyan-600 mb-2">€3.50</p>
                    <p className="text-gray-600">por unidad</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Máxima elasticidad y recuperación</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Ajuste ergonómico con banda elástica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Personalizable en ambos lados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Tallas adulto y junior</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Características</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <Users className="w-8 h-8 text-teal-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Ideal para Escuelas de Natación</h3>
                    <p className="text-gray-600">Perfectos para programas de aprendizaje, natación infantil y actividades recreativas.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <Heart className="w-8 h-8 text-teal-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Máxima Comodidad</h3>
                    <p className="text-gray-600">Materiales suaves y ligeros que no aprietan. Ideales para sesiones largas de natación.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <Truck className="w-8 h-8 text-teal-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Envío Gratuito en Europa</h3>
                    <p className="text-gray-600">Envío estándar gratuito en todos los pedidos europeos que cumplan cantidades mínimas.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <Clock className="w-8 h-8 text-teal-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Entrega en 3 Semanas</h3>
                    <p className="text-gray-600">Tiempo de entrega de 3 semanas desde la aprobación y el pago. Servicio express disponible.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Color Options */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">Opciones de Color</h2>
            <p className="text-center text-gray-600 mb-8">
              Amplia gama de colores disponibles para poliéster y lycra.
            </p>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <img
                src="/gorro-polyester-colors.jpg"
                alt="Colores disponibles para gorros de tela - poliéster y lycra"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-center text-sm text-gray-500 mt-4">
                Colores brillantes y vibrantes. Personalización disponible con hasta 6 colores de impresión.
              </p>
            </div>
          </div>
        </section>

        {/* Bulk Order Calculator */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <BulkOrderCalculator capType="tela-polyester" capTypeLabel="Gorros de Tela" />
          </div>
        </section>

        {/* Design Preview Tool */}
        <section className="py-16">
          <div className="container max-w-6xl">
            <DesignPreviewTool capType="tela-polyester" />
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Lo Que Dicen Nuestros Clientes</h2>
            <CapTestimonials capType="tela-polyester" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuál es el pedido mínimo?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">50 unidades. Descuentos significativos para 250, 500, 1000+ unidades.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuál es la diferencia entre poliéster y lycra?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Poliéster (€2.10) es más económico y ligero, ideal para eventos y merchandising. Lycra (€3.50) ofrece mayor elasticidad, ajuste ergonómico y es personalizable en ambos lados.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Son aptos para competición?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">No, estos gorros están diseñados para uso recreativo, escuelas de natación y merchandising. Para competición recomendamos gorros de silicona.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Son hipoalergénicos?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Sí, ambos materiales (poliéster y lycra) son 100% hipoalergénicos y seguros para pieles sensibles.</p></CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="presupuesto" className="py-16 bg-gradient-to-b from-white to-teal-50">
          <div className="container max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Solicita tu Presupuesto</h2>
              <p className="text-gray-600">Respuesta en menos de 24 horas.</p>
            </div>
            <QuoteForm productType="Gorros de Tela (Poliéster/Lycra)" />
          </div>
        </section>
      </div>
    </>
  );
}

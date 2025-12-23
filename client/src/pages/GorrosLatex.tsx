import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Truck, Clock, DollarSign } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import BulkOrderCalculator from "@/components/BulkOrderCalculator";
import CapTestimonials from "@/components/CapTestimonials";
import DesignPreviewTool from "@/components/DesignPreviewTool";

/**
 * Latex Swimming Caps Product Page
 * Accurate pricing from EuroSwimCaps.com: €2.10 for 250 caps (1 color print)
 * Minimum order 100 pieces. Significant discounts at 250, 500, 1000 & 1500+ pieces.
 */
export default function GorrosLatex() {
  return (
    <>
      <Helmet>
        <title>Gorros de Látex Personalizados | Económicos para Eventos | AquaEvents.club</title>
        <meta
          name="description"
          content="Gorros de látex personalizados desde €2.10. Ideales para eventos únicos y regalos promocionales. Pedido mínimo 100 unidades. Envío gratuito en Europa."
        />
        <link rel="canonical" href="https://aquaevents.club/gorros-natacion/latex" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Gorros de Látex Personalizados para Eventos" />
        <meta property="og:description" content="Gorros de látex económicos desde €2.10. Perfectos para eventos únicos y promociones." />
        <meta property="og:image" content="https://aquaevents.club/gorro-latex-verde.webp" />
        <meta property="og:url" content="https://aquaevents.club/gorros-natacion/latex" />

        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Gorros de Látex Personalizados",
            "description": "Gorros de látex personalizados ideales para eventos únicos y regalos promocionales. Fabricados con látex de alta calidad.",
            "image": "https://aquaevents.club/gorro-latex-verde.webp",
            "brand": {
              "@type": "Brand",
              "name": "EuroSwimCaps"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://aquaevents.club/gorros-natacion/latex",
              "priceCurrency": "EUR",
              "price": "2.10",
              "priceValidUntil": "2026-12-31",
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
                "name": "Gorros de Látex",
                "item": "https://aquaevents.club/gorros-natacion/latex",
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-16">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div>
              <nav className="text-sm mb-6 opacity-90">
                <Link href="/" className="hover:underline">INICIO</Link>
                <span className="mx-2">•</span>
                <Link href="/gorros-natacion" className="hover:underline">GORROS DE NATACIÓN</Link>
                <span className="mx-2">•</span>
                <span>GORROS DE LÁTEX</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 italic">
                GORROS DE LÁTEX PERSONALIZADOS
              </h1>
              <p className="text-xl mb-8">
                Somos uno de los proveedores líderes de Europa de gorros de natación personalizados. Los gorros de látex son ideales para eventos únicos y regalos promocionales.
              </p>
              <p className="text-lg mb-8">
                Los gorros de látex están hechos de una fina capa de látex, comúnmente utilizados para eventos únicos o regalos promocionales.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
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
                src="/gorros-silicona-personalizados-ice-swimmers.jpg"
                alt="Gorros de natación personalizados Ice Swimmers - Pedido real de club con diseño blanco y azul"
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">Precios Gorros de Látex Personalizados</h2>
            <p className="text-center text-gray-600 mb-12">
              Precio estándar para 250 gorros <strong>incluyendo envío gratuito</strong>. Pedido mínimo 100 piezas. Descuentos significativos en 250, 500, 1000 y 1500+ piezas.
            </p>

            <div className="grid md:grid-cols-1 gap-6 max-w-md mx-auto">
              <Card className="border-2 border-green-500">
                <CardHeader className="bg-green-50">
                  <CardTitle className="text-center">Impresión 1 Color</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 mb-2">€2.10</div>
                    <div className="text-gray-600 mb-4">por unidad (250 gorros)</div>
                    <p className="text-sm text-gray-500">
                      Descuentos disponibles para pedidos de 500, 1000 y 1500+ unidades. Contacta para presupuesto personalizado.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Características</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Económico y Versátil</h3>
                  <p className="text-gray-600">Ideal para eventos únicos, promociones y regalos corporativos.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <DollarSign className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Precio Competitivo</h3>
                  <p className="text-gray-600">Desde €2.10 por unidad con descuentos por volumen.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Truck className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Envío Gratuito en Europa</h3>
                  <p className="text-gray-600">Envío estándar gratuito en todos los pedidos europeos.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Entrega en 3 Semanas</h3>
                  <p className="text-gray-600">Tiempo de entrega de 3 semanas desde la aprobación y el pago.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Color Options Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">Opciones de Color</h2>
            <p className="text-center text-gray-600 mb-8">
              Disponible en una amplia gama de colores brillantes. ¡Tenemos la gama de colores MÁS GRANDE de Europa!
            </p>

            {/* Color Chart Image */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <img
                src="/gorro-colores-chart-latex.webp"
                alt="Carta de colores de gorros de látex - 20+ colores disponibles con códigos Pantone"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Top 10 Colors with Pantone Codes */}
            <h3 className="text-2xl font-bold text-center mb-6">Top 10 Colores Más Populares</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { code: 'S132H NEW NAVY', pantone: '(PANTONE 654C)' },
                { code: 'F202 ORANGE', pantone: '(PANTONE 021C)' },
                { code: 'S17 MID YELLOW', pantone: '(PANTONE 109C)' },
                { code: 'F355C GREEN', pantone: '(PANTONE 355C)' },
                { code: 'F286C ROYAL BLUE', pantone: '(PANTONE 286C)' },
                { code: 'F203H RED', pantone: '(PANTONE 179C)' },
                { code: 'F419 BLACK', pantone: '(PANTONE 419)' },
                { code: 'F000 WHITE', pantone: '(PANTONE 000)' },
                { code: 'B3 LIGHT ROYAL', pantone: '(PANTONE 285C)' },
                { code: 'F213C PINK', pantone: '(PANTONE 213C)' },
              ].map((capColor) => (
                <Card key={capColor.code} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-bold text-sm mb-1">{capColor.code}</h3>
                    <p className="text-xs text-gray-600">{capColor.pantone}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-8">
              Todos los colores incluyen referencias Pantone para garantizar la precisión exacta del color. Más de 20 colores disponibles.
            </p>
          </div>
        </section>

        {/* Bulk Order Calculator */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <BulkOrderCalculator capType="latex" capTypeLabel="Gorros de Látex" />
          </div>
        </section>

        {/* Design Preview Tool */}
        <section className="py-16">
          <div className="container max-w-6xl">
            <DesignPreviewTool capType="latex" />
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Lo Que Dicen Nuestros Clientes</h2>
            <CapTestimonials capType="latex" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuál es el pedido mínimo?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">100 unidades. Descuentos significativos para 250, 500, 1000+ unidades.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Los gorros de látex son aptos para personas con alergia?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">No, contienen látex natural. Para personas con alergia al látex, recomendamos gorros de silicona o gamuza.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuánto duran los gorros de látex?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Son ideales para eventos únicos. No son tan duraderos como silicona, pero son muy económicos.</p></CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="presupuesto" className="py-16 bg-gradient-to-b from-white to-green-50">
          <div className="container max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Solicita tu Presupuesto</h2>
              <p className="text-gray-600">Respuesta en menos de 24 horas.</p>
            </div>
            <QuoteForm productType="Gorros de Látex" />
          </div>
        </section>
      </div>
    </>
  );
}

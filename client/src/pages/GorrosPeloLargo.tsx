import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Truck, Clock, Shield } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import BulkOrderCalculator from "@/components/BulkOrderCalculator";
import CapTestimonials from "@/components/CapTestimonials";
import DesignPreviewTool from "@/components/DesignPreviewTool";

/**
 * Long Hair Swimming Caps Product Page
 * Accurate pricing from EuroSwimCaps.com: €6.20 (1 color), €7.55 (2 colors), €9.25 (3 colors) for 100 caps
 * Minimum order 50 pieces. Significant discounts at 250, 500, 1000 & 1500+ pieces.
 */
export default function GorrosPeloLargo() {
  return (
    <>
      <Helmet>
        <title>Gorros de Silicona para Pelo Largo | Especial Nadadores | AquaEvents.club</title>
        <meta
          name="description"
          content="Gorros de silicona para pelo largo desde €6.20. Diseño especial sin enganches. Ideales para nadadores con cabello largo. Envío gratuito en Europa."
        />
        <link rel="canonical" href="https://aquaevents.club/gorros-natacion/pelo-largo" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Gorros de Silicona para Pelo Largo Personalizados" />
        <meta property="og:description" content="Gorros especiales para pelo largo desde €6.20. Diseño sin enganches y máxima comodidad." />
        <meta property="og:image" content="https://aquaevents.club/gorro-pelo-largo-azul-hero.webp" />
        <meta property="og:url" content="https://aquaevents.club/gorros-natacion/pelo-largo" />

        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Gorros de Silicona para Pelo Largo Personalizados",
            "description": "Gorros de silicona especialmente diseñados para nadadores con pelo largo. Forma especial para evitar enganches y máxima comodidad.",
            "image": "https://aquaevents.club/gorro-pelo-largo-azul-hero.webp",
            "brand": {
              "@type": "Brand",
              "name": "EuroSwimCaps"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://aquaevents.club/gorros-natacion/pelo-largo",
              "priceCurrency": "EUR",
              "price": "6.20",
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
                "name": "Gorros para Pelo Largo",
                "item": "https://aquaevents.club/gorros-natacion/pelo-largo",
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div>
              <nav className="text-sm mb-6 opacity-90">
                <Link href="/" className="hover:underline">INICIO</Link>
                <span className="mx-2">•</span>
                <Link href="/gorros-natacion" className="hover:underline">GORROS DE NATACIÓN</Link>
                <span className="mx-2">•</span>
                <span>GORROS PARA PELO LARGO</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 italic">
                GORROS DE SILICONA PARA PELO LARGO
              </h1>
              <p className="text-xl mb-8">
                Somos uno de los proveedores líderes de Europa de gorros de natación personalizados. Los gorros para pelo largo están diseñados para evitar enganches.
              </p>
              <p className="text-lg mb-8">
                Para nadadores con pelo largo, nuestros gorros tienen espacio extra en el interior para acomodar y evitar enganches. Estos gorros están hechos de silicona, aumentando la durabilidad y ofreciendo un rendimiento elegante.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
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
                src="/gorro-pelo-largo-azul-hero.webp"
                alt="Gorro de silicona para pelo largo azul personalizado"
                className="w-full max-w-md mx-auto rounded-full shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">Precios Gorros para Pelo Largo Personalizados</h2>
            <p className="text-center text-gray-600 mb-12">
              Precio estándar para 100 gorros <strong>incluyendo envío gratuito</strong>. Pedido mínimo 50 piezas. Descuentos significativos en 250, 500, 1000 y 1500+ piezas.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-purple-500">
                <CardHeader className="bg-purple-50">
                  <CardTitle className="text-center">Impresión 1 Color</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-600 mb-2">€6.20</div>
                    <div className="text-gray-600">por unidad</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-500">
                <CardHeader className="bg-pink-50">
                  <CardTitle className="text-center">Impresión 2 Colores</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-pink-600 mb-2">€7.55</div>
                    <div className="text-gray-600">por unidad</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-700">
                <CardHeader className="bg-purple-100">
                  <CardTitle className="text-center">Impresión 3 Colores</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-700 mb-2">€9.25</div>
                    <div className="text-gray-600">por unidad</div>
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
                <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Forma Especial para Pelo Largo</h3>
                  <p className="text-gray-600">Diseño con espacio extra para acomodar cabello largo sin enganches.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">100% Hipoalergénico</h3>
                  <p className="text-gray-600">Silicona de alta calidad, segura para pieles sensibles.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Patrón Antideslizante Interior</h3>
                  <p className="text-gray-600">Diseño interior especial para mantener el gorro en su lugar.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Truck className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Envío Gratuito en Europa</h3>
                  <p className="text-gray-600">Envío estándar gratuito en todos los pedidos europeos.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Entrega en 3 Semanas</h3>
                  <p className="text-gray-600">Tiempo de entrega de 3 semanas desde la aprobación y el pago.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Disponible en Múltiples Colores</h3>
                  <p className="text-gray-600">Amplia gama de colores disponibles para personalización.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Color Options */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">Opciones de Color</h2>
            <p className="text-center text-gray-600 mb-8">
              Disponible en 10+ colores populares. ¡Tenemos la gama de colores MÁS GRANDE de Europa!
            </p>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <img
                src="/euroswimcaps-silicone-colors-official.webp"
                alt="Carta de colores de gorros para pelo largo - 10+ colores con códigos Pantone"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-center text-sm text-gray-500 mt-4">
                Diseño especial para pelo largo disponible en múltiples colores con referencias Pantone.
              </p>
            </div>
          </div>
        </section>

        {/* Bulk Order Calculator */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <BulkOrderCalculator capType="pelo-largo" capTypeLabel="Gorros de Pelo Largo" />
          </div>
        </section>

        {/* Design Preview Tool */}
        <section className="py-16">
          <div className="container max-w-6xl">
            <DesignPreviewTool capType="pelo-largo" />
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Lo Que Dicen Nuestros Clientes</h2>
            <CapTestimonials capType="pelo-largo" />
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
                <CardHeader><CardTitle className="text-lg">¿Qué hace especial el diseño para pelo largo?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Espacio extra en el interior para acomodar cabello largo sin enganches ni molestias.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Son aptos para competición?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Sí, cumplen normativas FINA. Ideales para nadadores competitivos con cabello largo.</p></CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="presupuesto" className="py-16 bg-gradient-to-b from-white to-purple-50">
          <div className="container max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Solicita tu Presupuesto</h2>
              <p className="text-gray-600">Respuesta en menos de 24 horas.</p>
            </div>
            <QuoteForm productType="Gorros para Pelo Largo" />
          </div>
        </section>
      </div>
    </>
  );
}

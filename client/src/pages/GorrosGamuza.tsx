import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Package, Truck, Clock } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

/**
 * Gamuza (Suede) Swimming Caps Product Page
 * Accurate pricing from EuroSwimCaps.com: €4.99 (1 color), €6.40 (2 colors), €7.99 (3 colors) for 100 caps
 */
export default function GorrosGamuza() {
  const colors = [
    { code: "f209s", name: "Negro", pantone: "Black" },
    { code: "sd11s", name: "Plata Metálico", pantone: "877c" },
    { code: "f206s", name: "Azul Royal", pantone: "293c" },
    { code: "f230s", name: "Azul Cielo", pantone: "298c" },
    { code: "f217s", name: "Verde Kelly", pantone: "355c" },
    { code: "se28s", name: "Verde Neón", pantone: "7479c" },
    { code: "f203s", name: "Rojo", pantone: "179c" },
    { code: "sc16s", name: "Rosa Neón", pantone: "806c" },
    { code: "f202s", name: "Naranja", pantone: "165c" },
    { code: "sc17s", name: "Amarillo Medio", pantone: "123c" },
    { code: "Sh83s", name: "Amarillo", pantone: "106c" },
    { code: "f211s", name: "Blanco", pantone: "White" },
  ];

  return (
    <>
      <Helmet>
        <title>Gorros de Gamuza Personalizados | Desde €4.99 | Tacto Suave Premium</title>
        <meta
          name="description"
          content="Gorros de gamuza (suede) personalizados para clubes. Tacto suave premium, sin látex, acabado antiarrugas. €4.99 por unidad (100 caps). Envío gratis España. 12 colores disponibles."
        />
        <link rel="canonical" href="https://aquaevents.club/gorros-natacion/gamuza" />

        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Gorros de Gamuza Personalizados",
            "description": "Gorros de natación de gamuza (suede) con superficie especial suave, 100% hipoalergénicos, sin arrugas. Ideal para nadadores con sensibilidad al látex.",
            "image": "https://aquaevents.club/gorro-gamuza-azul-hero.webp",
            "brand": {
              "@type": "Brand",
              "name": "EuroSwimCaps",
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "EUR",
              "lowPrice": "4.99",
              "highPrice": "7.99",
              "offerCount": "3",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "AquaEvents.club",
              },
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
            },
          })}
        </script>

        {/* Breadcrumb Schema */}
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
                "name": "Gorros de Gamuza",
                "item": "https://aquaevents.club/gorros-natacion/gamuza",
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-20">
          <div className="container">
            <nav className="text-sm mb-6 opacity-90">
              <Link href="/" className="hover:underline">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/gorros-natacion" className="hover:underline">Gorros de Natación</Link>
              <span className="mx-2">/</span>
              <span>Gorros de Gamuza</span>
            </nav>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Gorros de Gamuza Personalizados
                </h1>
                <p className="text-xl mb-8">
                  Tacto suave premium con tratamiento especial de superficie gamuza. 100% hipoalergénicos, sin arrugas, máxima elasticidad. Ideal para nadadores con sensibilidad al látex.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>100% hipoalergénicos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Superficie gamuza sin arrugas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Máxima elasticidad y recuperación</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Envío gratuito a España</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-cyan-600 hover:bg-gray-100">
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

              <div className="flex justify-center">
                <img
                  src="/gorro-gamuza-azul-hero.webp"
                  alt="Gorro de gamuza azul personalizado para natación"
                  className="rounded-full w-96 h-96 object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">Precios Gorros de Gamuza Personalizados</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Precio estándar para 100 gorros <strong>incluyendo envío gratuito</strong>. Pedido mínimo 50 unidades. 
              Descuentos significativos para 250, 500, 1000 y 1500+ unidades.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border-2 hover:border-cyan-500 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="text-orange-500 font-semibold mb-2">1 color de impresión</div>
                  <div className="text-4xl font-bold mb-4">€4.99<span className="text-lg text-gray-600">/ud</span></div>
                  <div className="text-sm text-gray-600">Para 100 gorros</div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-cyan-500 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="text-orange-500 font-semibold mb-2">2 colores de impresión</div>
                  <div className="text-4xl font-bold mb-4">€6.40<span className="text-lg text-gray-600">/ud</span></div>
                  <div className="text-sm text-gray-600">Para 100 gorros</div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-cyan-500 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="text-orange-500 font-semibold mb-2">3 colores de impresión</div>
                  <div className="text-4xl font-bold mb-4">€7.99<span className="text-lg text-gray-600">/ud</span></div>
                  <div className="text-sm text-gray-600">Para 100 gorros</div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-700 font-semibold">
                ¿Necesitas más de 250 unidades? <a href="mailto:general@aquaevents.club?subject=Descuento Volumen Gorros Gamuza" className="text-cyan-600 hover:underline">Consulta descuentos por volumen</a>
              </p>
            </div>
          </div>
        </section>

        {/* Color Options */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">Opciones de Color</h2>
            <p className="text-center text-gray-600 mb-8">
              15+ colores disponibles con referencias Pantone para garantizar la precisión del color.
            </p>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <img
                src="/gorro-colores-chart-1.webp"
                alt="Carta de colores de gorros de gamuza - 15+ colores con códigos Pantone"
                className="w-full h-auto rounded-lg"
              />
              <p className="text-center text-sm text-gray-500 mt-4">
                Tacto suave premium con amplia gama de colores. Referencias Pantone para precisión exacta.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Características de los Gorros de Gamuza</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="font-semibold mb-2">Tacto Suave Premium</h3>
                <p className="text-gray-600 text-sm">Tratamiento especial de superficie gamuza para máxima comodidad</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="font-semibold mb-2">Sin Arrugas</h3>
                <p className="text-gray-600 text-sm">Exterior sin arrugas para un acabado profesional y duradero</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="font-semibold mb-2">Envío Gratuito</h3>
                <p className="text-gray-600 text-sm">Envío gratuito a toda España para pedidos que cumplan cantidades mínimas</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="font-semibold mb-2">Entrega 3 Semanas</h3>
                <p className="text-gray-600 text-sm">Tiempo de producción estándar de 3 semanas desde aprobación y pago</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuál es el pedido mínimo?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">50 unidades. Descuentos para 250, 500, 1000+ unidades.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Los gorros de gamuza son aptos para personas con alergia al látex?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Sí, son 100% hipoalergénicos y perfectos para nadadores con sensibilidad al látex.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Qué hace especial el acabado gamuza?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Tratamiento especial de superficie que proporciona tacto suave premium y acabado sin arrugas.</p></CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section id="presupuesto" className="py-16 bg-gradient-to-b from-white to-cyan-50">
          <div className="container max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Solicita tu Presupuesto</h2>
              <p className="text-gray-600">
                Nuestro equipo te ayudará con el diseño y te proporcionará muestras visuales. Respuesta en menos de 24 horas.
              </p>
            </div>
            <QuoteForm productType="Gorros de Gamuza" />
          </div>
        </section>
      </div>
    </>
  );
}

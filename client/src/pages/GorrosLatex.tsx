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

        {/* FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Cuál es la diferencia entre gorros de látex y silicona?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Los gorros de látex son más económicos (€2.10 vs €4.45) y más finos, ideales para eventos únicos y regalos promocionales. Los gorros de silicona son más duraderos, hipoalergénicos y cómodos para uso regular. El látex es menos resistente al cloro y puede causar alergias en algunas personas."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuál es el pedido mínimo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "El pedido mínimo es de 100 unidades. Ofrecemos descuentos significativos para pedidos de 250, 500, 1000 y 1500+ unidades."
                }
              },
              {
                "@type": "Question",
                "name": "¿Los gorros de látex son aptos para personas con alergia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, los gorros de látex contienen látex natural que puede causar reacciones alérgicas. Para personas con alergia al látex, recomendamos gorros de silicona (100% hipoalergénicos) o gamuza."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuánto duran los gorros de látex?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Los gorros de látex son ideales para eventos únicos o uso ocasional. No son tan duraderos como los de silicona (duran 3-6 meses vs 1-2 años), pero son muy económicos y perfectos para regalos promocionales."
                }
              },
              {
                "@type": "Question",
                "name": "¿Son aptos para competiciones oficiales?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, los gorros de látex cumplen con las normativas FINA y pueden usarse en competiciones oficiales. Sin embargo, muchos nadadores prefieren silicona para competiciones por su mayor durabilidad y comodidad."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué grosor tienen los gorros de látex?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Los gorros de látex tienen un grosor de aproximadamente 0.3-0.4mm, mucho más finos que los de silicona (50GMS). Esto los hace más ligeros y económicos, pero menos duraderos."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cómo se cuidan los gorros de látex?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Enjuaga con agua fría después de cada uso y sécalo completamente antes de guardarlo. Evita el contacto con aceites, cremas y objetos punzantes. Guárdalo en un lugar fresco y seco, lejos de la luz solar directa."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuántos colores de impresión puedo elegir?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Puedes elegir 1 color de impresión. El precio base de €2.10 incluye impresión en 1 color. Para múltiples colores, consulta nuestras opciones de gorros de silicona."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuál es el tiempo de entrega?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "El tiempo de producción y entrega es de aproximadamente 3 semanas desde la confirmación del pedido. Ofrecemos envío gratuito en Europa."
                }
              },
              {
                "@type": "Question",
                "name": "¿Para qué tipo de eventos son ideales los gorros de látex?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Los gorros de látex son perfectos para eventos únicos como triatlón, travesías, campeonatos, regalos corporativos y promociones. Su precio económico los hace ideales cuando necesitas muchas unidades para un evento puntual."
                }
              }
            ]
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
                { code: 'S132H NEW NAVY', pantone: '(PANTONE 654C)', bg: '#003366', text: 'white' },
                { code: 'F202 ORANGE', pantone: '(PANTONE 021C)', bg: '#FF6600', text: 'white' },
                { code: 'S17 MID YELLOW', pantone: '(PANTONE 109C)', bg: '#FFD700', text: 'black' },
                { code: 'F355C GREEN', pantone: '(PANTONE 355C)', bg: '#00A651', text: 'white' },
                { code: 'F286C ROYAL BLUE', pantone: '(PANTONE 286C)', bg: '#0033A0', text: 'white' },
                { code: 'F203H RED', pantone: '(PANTONE 179C)', bg: '#E4002B', text: 'white' },
                { code: 'F419 BLACK', pantone: '(PANTONE 419)', bg: '#000000', text: 'white' },
                { code: 'F000 WHITE', pantone: '(PANTONE 000)', bg: '#FFFFFF', text: 'black' },
                { code: 'B3 LIGHT ROYAL', pantone: '(PANTONE 285C)', bg: '#0066CC', text: 'white' },
                { code: 'F213C PINK', pantone: '(PANTONE 213C)', bg: '#FF69B4', text: 'white' },
              ].map((capColor) => (
                <Card 
                  key={capColor.code} 
                  className="overflow-hidden hover:shadow-xl transition-all hover:scale-105 border-2"
                  style={{ backgroundColor: capColor.bg, borderColor: capColor.bg }}
                >
                  <CardContent className="p-6 text-center min-h-[140px] flex flex-col justify-center">
                    <h3 
                      className="font-bold text-sm mb-2 leading-tight"
                      style={{ color: capColor.text }}
                    >
                      {capColor.code}
                    </h3>
                    <p 
                      className="text-xs leading-tight"
                      style={{ color: capColor.text, opacity: 0.9 }}
                    >
                      {capColor.pantone}
                    </p>
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
                <CardHeader><CardTitle className="text-lg">¿Cuál es la diferencia entre gorros de látex y silicona?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Los gorros de látex son más económicos (€2.10 vs €4.45) y más finos, ideales para eventos únicos y regalos promocionales. Los gorros de silicona son más duraderos, hipoalergénicos y cómodos para uso regular. El látex es menos resistente al cloro y puede causar alergias en algunas personas.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuál es el pedido mínimo?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">El pedido mínimo es de 100 unidades. Ofrecemos descuentos significativos para pedidos de 250, 500, 1000 y 1500+ unidades.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Los gorros de látex son aptos para personas con alergia?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">No, los gorros de látex contienen látex natural que puede causar reacciones alérgicas. Para personas con alergia al látex, recomendamos gorros de silicona (100% hipoalergénicos) o gamuza.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuánto duran los gorros de látex?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Los gorros de látex son ideales para eventos únicos o uso ocasional. No son tan duraderos como los de silicona (duran 3-6 meses vs 1-2 años), pero son muy económicos y perfectos para regalos promocionales.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Son aptos para competiciones oficiales?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Sí, los gorros de látex cumplen con las normativas FINA y pueden usarse en competiciones oficiales. Sin embargo, muchos nadadores prefieren silicona para competiciones por su mayor durabilidad y comodidad.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Qué grosor tienen los gorros de látex?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Los gorros de látex tienen un grosor de aproximadamente 0.3-0.4mm, mucho más finos que los de silicona (50GMS). Esto los hace más ligeros y económicos, pero menos duraderos.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cómo se cuidan los gorros de látex?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Enjuaga con agua fría después de cada uso y sécalo completamente antes de guardarlo. Evita el contacto con aceites, cremas y objetos punzantes. Guárdalo en un lugar fresco y seco, lejos de la luz solar directa.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuántos colores de impresión puedo elegir?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Puedes elegir 1 color de impresión. El precio base de €2.10 incluye impresión en 1 color. Para múltiples colores, consulta nuestras opciones de gorros de silicona.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuál es el tiempo de entrega?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">El tiempo de producción y entrega es de aproximadamente 3 semanas desde la confirmación del pedido. Ofrecemos envío gratuito en Europa.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Para qué tipo de eventos son ideales los gorros de látex?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Los gorros de látex son perfectos para eventos únicos como triatlón, travesías, campeonatos, regalos corporativos y promociones. Su precio económico los hace ideales cuando necesitas muchas unidades para un evento puntual.</p></CardContent>
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

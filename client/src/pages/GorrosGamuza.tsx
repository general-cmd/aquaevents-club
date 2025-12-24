import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Package, Truck, Clock } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import BulkOrderCalculator from "@/components/BulkOrderCalculator";
import CapTestimonials from "@/components/CapTestimonials";
import DesignPreviewTool from "@/components/DesignPreviewTool";
import { useTranslation } from "react-i18next";
import HrefLangTags from "@/components/HrefLangTags";
import FAQSchema from "@/components/FAQSchema";

/**
 * Gamuza (Suede) Swimming Caps Product Page
 * Accurate pricing from EuroSwimCaps.com: €4.99 (1 color), €6.40 (2 colors), €7.99 (3 colors) for 100 caps
 */
export default function GorrosGamuza() {
  const { t } = useTranslation();
  const translations = t('gorros.gamuza', { returnObjects: true }) as any;
  
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
        <title>{translations.pageTitle}</title>
        <meta
          name="description"
          content={translations.metaDescription}
        />
        <link rel="canonical" href="https://aquaevents.club/gorros-natacion/gamuza" />
      </Helmet>
      <HrefLangTags basePath="/gorros-natacion/gamuza" />
      <FAQSchema faqs={translations.faqs || []} />
      <Helmet>

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
              <Link href="/" className="hover:underline">{translations.breadcrumbHome}</Link>
              <span className="mx-2">/</span>
              <Link href="/gorros-natacion" className="hover:underline">{translations.breadcrumbCaps}</Link>
              <span className="mx-2">/</span>
              <span>{translations.breadcrumbGamuza}</span>
            </nav>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {translations.heroHeading}
                </h1>
                <p className="text-xl mb-8">
                  {translations.heroP1}
                </p>
                <p className="text-lg mb-8">
                  {translations.heroP2}
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
                    {translations.ctaButton}
                  </a>
                </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link href="/gorros-natacion">
                      {translations.viewAllCaps}
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="flex justify-center">
                <img
                  src="/gorro-silicona-personalizado-beavers-trust.jpg"
                  alt="Gorro personalizado The Beavers Trust - Ejemplo real de pedido con escudo bordado para club deportivo"
                  className="rounded-lg w-96 h-96 object-cover shadow-2xl"
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
          <div className="container max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">Opciones de Color</h2>
            <p className="text-center text-gray-600 mb-8">
              15+ colores disponibles con referencias Pantone para garantizar la precisión del color.
            </p>

            {/* Color Chart Image */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <img
                src="/gorro-colores-chart-1.webp"
                alt="Carta de colores de gorros de gamuza - 15+ colores con códigos Pantone"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Top 10 Colors with Pantone Codes */}
            <h3 className="text-2xl font-bold text-center mb-6">Top 10 Colores Más Populares</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { code: 'F286C ROYAL BLUE', pantone: '(PANTONE 286C)', bg: '#0033A0', text: 'white' },
                { code: 'F419 BLACK', pantone: '(PANTONE 419)', bg: '#000000', text: 'white' },
                { code: 'F203H RED', pantone: '(PANTONE 179C)', bg: '#E4002B', text: 'white' },
                { code: 'F355C GREEN', pantone: '(PANTONE 355C)', bg: '#00A651', text: 'white' },
                { code: 'F000 WHITE', pantone: '(PANTONE 000)', bg: '#FFFFFF', text: 'black' },
                { code: 'F109C YELLOW', pantone: '(PANTONE 109C)', bg: '#FFD700', text: 'black' },
                { code: 'F213C PINK', pantone: '(PANTONE 213C)', bg: '#FF69B4', text: 'white' },
                { code: 'F298C LIGHT BLUE', pantone: '(PANTONE 298C)', bg: '#00BFFF', text: 'white' },
                { code: 'F021C ORANGE', pantone: '(PANTONE 021C)', bg: '#FF6600', text: 'white' },
                { code: 'F2665C PURPLE', pantone: '(PANTONE 2665C)', bg: '#8B00FF', text: 'white' },
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
              Tacto suave premium con amplia gama de colores. Referencias Pantone para precisión exacta. Más de 15 colores disponibles.
            </p>
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

        {/* Bulk Order Calculator */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <BulkOrderCalculator capType="gamuza" capTypeLabel="Gorros de Gamuza" />
          </div>
        </section>

        {/* Design Preview Tool */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl">
            <DesignPreviewTool capType="gamuza" />
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Lo Que Dicen Nuestros Clientes</h2>
            <CapTestimonials capType="gamuza" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Qué son los gorros de gamuza?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Los gorros de gamuza (suede) son gorros de silicona con un tratamiento especial de superficie que proporciona un tacto suave premium y acabado sin arrugas. Son 100% hipoalergénicos, no contienen látex y ofrecen mayor comodidad que los gorros de silicona estándar.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuál es la diferencia entre gorros de gamuza y silicona?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Los gorros de gamuza tienen una superficie especial con acabado suave (suede finish) que los hace más cómodos y sin arrugas. Los gorros de silicona estándar tienen superficie lisa. Ambos son duraderos e hipoalergénicos, pero la gamuza ofrece una experiencia premium. Precio: €4.99 (gamuza) vs €4.45 (silicona estándar).</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuál es el pedido mínimo?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">El pedido mínimo es de 50 unidades. Ofrecemos descuentos progresivos para pedidos de 250, 500, 1000 y más unidades.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Los gorros de gamuza son aptos para personas con alergia al látex?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Sí, los gorros de gamuza son 100% hipoalergénicos y no contienen látex. Son perfectos para nadadores con sensibilidad al látex o piel sensible.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Qué hace especial el acabado gamuza?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">El tratamiento especial de superficie proporciona un tacto suave premium similar a la gamuza, acabado sin arrugas, mayor comodidad al ponerse y quitarse, y una apariencia elegante y profesional.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Son aptos para competiciones oficiales?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Sí, los gorros de gamuza cumplen con las normativas FINA y son ideales para competiciones oficiales. Muchos nadadores profesionales los prefieren por su comodidad superior.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuánto duran los gorros de gamuza?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Con el cuidado adecuado, los gorros de gamuza pueden durar entre 1 y 2 años de uso regular, similar a los gorros de silicona estándar. Son muy resistentes al cloro y al desgaste.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cómo se limpian y mantienen?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Enjuaga con agua fría después de cada uso, sécalo con una toalla suave y déjalo secar al aire. No uses productos químicos agresivos. El acabado gamuza mantiene su suavidad con el cuidado adecuado.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuántos colores de impresión puedo elegir?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Puedes elegir entre 1, 2 o 3 colores de impresión. Precios para 100 unidades: €4.99 (1 color), €6.40 (2 colores), €7.99 (3 colores). Disponemos de 12 colores de gorro base.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuál es el tiempo de entrega?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">El tiempo de producción y entrega es de aproximadamente 3 semanas desde la confirmación del pedido y aprobación del diseño. Ofrecemos envío gratuito a toda España.</p></CardContent>
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

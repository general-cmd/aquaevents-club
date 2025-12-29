import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Truck, Clock, DollarSign } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import BulkOrderCalculator from "@/components/BulkOrderCalculator";
import CapTestimonials from "@/components/CapTestimonials";
import DesignPreviewTool from "@/components/DesignPreviewTool";
import { useTranslation } from "react-i18next";
import HrefLangTags from "@/components/HrefLangTags";
import FAQSchema from "@/components/FAQSchema";

/**
 * Latex Swimming Caps Product Page
 * Accurate pricing from EuroSwimCaps.com: €2.10 for 250 caps (1 color print)
 * Minimum order 100 pieces. Significant discounts at 250, 500, 1000 & 1500+ pieces.
 */
export default function GorrosLatex() {
  const { t } = useTranslation();
  const translations = t('gorros.latex', { returnObjects: true }) as any;
  
  return (
    <>
      <Helmet>
        <title>{translations.pageTitle}</title>
        <meta
          name="description"
          content={translations.metaDescription}
        />
        <link rel="canonical" href="https://aquaevents.club/gorros-natacion/latex" />
      </Helmet>
      <HrefLangTags basePath="/gorros-natacion/latex" />
      <FAQSchema faqs={translations.faqs || []} />
      <Helmet>
        
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
                <Link href="/" className="hover:underline">{translations.breadcrumbHome}</Link>
                <span className="mx-2">•</span>
                <Link href="/gorros-natacion" className="hover:underline">{translations.breadcrumbCaps}</Link>
                <span className="mx-2">•</span>
                <span>{translations.breadcrumbLatex}</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 italic">
                Gorros de Látex Personalizados para Triatlones y Eventos Masivos
              </h1>
              <p className="text-xl mb-8">
                {translations.heroP1}
              </p>
              <p className="text-lg mb-8">
                {translations.heroP2}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
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

        {/* Unique Value Proposition - Latex */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-900">Látex: La Opción Económica para Triatlones y Eventos Masivos</h2>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-700 leading-relaxed mb-4">
                Los gorros de látex representan la solución más rentable para organizadores de eventos deportivos de gran escala, triatlones, pruebas de aguas abiertas y campañas promocionales corporativas. Con un precio de <strong>€2.10 por unidad en pedidos de 250 gorros</strong>, el látex ofrece un 53% de ahorro respecto a la silicona, lo que lo convierte en la elección preferida cuando el presupuesto es prioritario.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                En España, más del 70% de los triatlones y pruebas de aguas abiertas utilizan gorros de látex personalizados para identificar categorías por colores (elite, grupos de edad, relevos). La Federación Española de Triatlón (FETRI) recomienda látex para eventos de un solo día donde los participantes no reutilizarán el gorro tras la competición. El grosor de 0.3-0.4mm permite una <strong>visibilidad excepcional de los colores</strong> incluso a distancia, crucial para árbitros y cámaras de televisión.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Para eventos masivos como la Travesía del Estrecho de Gibraltar (1,200+ nadadores) o el Ironman Barcelona (2,500+ participantes), el látex es la única opción económicamente viable. Un pedido de 2,000 gorros de látex cuesta aproximadamente €3,800 (con descuentos por volumen), mientras que la misma cantidad en silicona superaría los €8,000. Este ahorro de <strong>€4,200 por evento</strong> permite a los organizadores destinar recursos a otros aspectos críticos como seguridad, logística o premios.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Aunque el látex tiene una vida útil más corta que la silicona (3-6 meses vs 2+ años), esto no es un inconveniente para su uso previsto: <strong>eventos únicos donde los participantes reciben el gorro como parte del kit de carrera</strong>. De hecho, muchos triatletas conservan sus gorros de látex como recuerdo de competiciones emblemáticas, convirtiendo cada gorro en un elemento de branding duradero para patrocinadores.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                El látex natural es biodegradable y se descompone en 1-5 años, frente a los 50-80 años de la silicona sintética. Para eventos con certificación ambiental (ISO 20121) o compromisos de sostenibilidad, el látex es la opción más responsable desde el punto de vista ecológico. Organizaciones como Oceankind y Triathlon Clean Seas recomiendan activamente el látex sobre materiales sintéticos para pruebas en entornos naturales.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                La tecnología de impresión sobre látex permite reproducir logotipos con hasta 2 colores Pantone, suficiente para la mayoría de diseños corporativos y patrocinadores. El grosor reducido del material (0.3-0.4mm) hace que los colores sean más vibrantes y visibles que en silicona de 50GMS, especialmente bajo luz solar directa en pruebas outdoor.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Para la temporada 2026, EuroSwimCaps ofrece más de 20 colores de látex con referencias Pantone certificadas, incluyendo tonos neón (naranja, amarillo, verde) especialmente populares para pruebas de aguas abiertas donde la visibilidad es crítica. El tiempo de producción estándar de 3 semanas permite planificar eventos con antelación, y el servicio express reduce este plazo a 10 días laborables para situaciones urgentes.
              </p>
            </div>

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
        {translations.faqs && translations.faqs.length > 0 && (
          <section className="py-16">
            <div className="container max-w-4xl">
              <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
              <div className="space-y-6">
                {translations.faqs.map((faq: any, index: number) => (
                  <Card key={index}>
                    <CardHeader><CardTitle className="text-lg">{faq.question}</CardTitle></CardHeader>
                    <CardContent><p className="text-gray-600">{faq.answer}</p></CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

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

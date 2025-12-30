import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Truck, Clock, Users, Heart } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import BulkOrderCalculator from "@/components/BulkOrderCalculator";
import CapTestimonials from "@/components/CapTestimonials";
import DesignPreviewTool from "@/components/DesignPreviewTool";
import { useTranslation } from "react-i18next";
import HrefLangTags from "@/components/HrefLangTags";
import FAQSchema from "@/components/FAQSchema";

/**
 * Polyester & Lycra Swimming Caps Product Page
 * Pricing: Polyester €2.10, Lycra €2.80-€3.50 for recreational/merchandising
 * Perfect for children, swim schools, and comfortable recreational swimming
 */
export default function GorrosTela() {
  const { t } = useTranslation();
  const translations = t('gorros.tela', { returnObjects: true }) as any;
  
  return (
    <>
      <Helmet>
        <title>{translations.pageTitle}</title>
        <meta
          name="description"
          content={translations.metaDescription}
        />
        <link rel="canonical" href="https://aquaevents.club/gorros-natacion/tela" />
      </Helmet>
      <FAQSchema faqs={translations.faqs || []} />
      <HrefLangTags basePath="/gorros-natacion/tela" />
      <Helmet>
        
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
              "name": "AquaEvents"
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

        {/* WebApplication Schema - Price Calculator */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Calculadora de Precios de Gorros de Tela",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            }
          })}
        </script>

        {/* WebApplication Schema - Price Calculator */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Calculadora de Precios de Gorros de Tela",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
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
                <Link href="/" className="hover:underline">{translations.breadcrumbHome}</Link>
                <span className="mx-2">•</span>
                <Link href="/gorros-natacion" className="hover:underline">{translations.breadcrumbCaps}</Link>
                <span className="mx-2">•</span>
                <span>{translations.breadcrumbFabric}</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 italic">
                Gorros de Tela Personalizados para Escuelas de Natación y Hoteles
              </h1>
              <p className="text-xl mb-8">
                {translations.heroP1}
              </p>
              <p className="text-lg mb-8">
                {translations.heroP2}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
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
                src="/gorro-silicona-personalizado-corsham-league.jpg"
                alt="Gorro personalizado Corsham S.C. League Team - Ejemplo real de pedido amarillo con logo verde"
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

        {/* Unique Value Proposition - Fabric */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-teal-900">Gorros de Tela: Confort Total para Escuelas de Natación y Hoteles</h2>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-gray-700 leading-relaxed mb-4">
                Los gorros de tela (poliéster y lycra) representan la solución ideal para entornos donde la <strong>comodidad, facilidad de uso y seguridad infantil</strong> son prioritarias sobre el rendimiento hidrodinámico. Con precios desde €2.10 para poliéster y €3.50 para lycra, estos gorros son la elección preferida por escuelas de natación, hoteles con piscina, campamentos de verano y programas de natación recreativa en toda España.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                A diferencia de la silicona y el látex, que requieren técnica para colocar sin pellizcar el cabello, los gorros de tela se <strong>deslizan suavemente sobre la cabeza sin tirones ni molestias</strong>. Esto es crucial para niños de 3-8 años que están aprendiendo a nadar y pueden sentir ansiedad con gorros más ajustados. La Real Federación Española de Natación (RFEN) recomienda gorros de tela para programas de iniciación infantil (niveles Rana 1-3) donde el objetivo es crear una experiencia positiva, no optimizar tiempos.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Los hoteles con piscina climatizada (más de 2,500 establecimientos en España) utilizan gorros de poliéster personalizados como <strong>merchandising de marca y medida higiénica</strong>. El coste de €2.10 por unidad permite ofrecer gorros gratuitos a huéspedes sin impacto significativo en el presupuesto operativo. Cadenas como Meliá, Barcelo y NH Hoteles distribuyen anualmente más de 50,000 gorros de tela con su logotipo, convirtiendo cada gorro en un elemento de branding que los clientes conservan como recuerdo.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                El poliéster es un material <strong>100% hipoalergénico</strong> que elimina completamente el riesgo de reacciones alérgicas al látex (8-12% de la población) y las irritaciones por presión excesiva de la silicona. Para escuelas de natación con grupos de 20-30 niños por clase, esto significa cero interrupciones por molestias en la cabeza, permitiendo a los instructores concentrarse en la enseñanza en lugar de resolver problemas de equipamiento.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Los gorros de lycra ofrecen <strong>elasticidad superior y ajuste ergonómico</strong> gracias a su banda elástica integrada. Este diseño permite que el gorro se adapte a diferentes tamaños de cabeza sin comprimir, ideal para programas multigeneracionales donde adultos y niños comparten el mismo modelo. La lycra también es más duradera que el poliéster (12-18 meses vs 6-9 meses), lo que justifica su precio superior de €3.50 para clubes que buscan reducir reposiciones.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Es importante aclarar que los gorros de tela <strong>NO son impermeables</strong> y no están diseñados para mantener el cabello seco. Su función principal es higiénica (evitar que cabellos sueltos contaminen el agua) y de identificación visual (colores por niveles o grupos). Para competición oficial o entrenamiento de alto rendimiento, la silicona sigue siendo obligatoria según normativa FINA.
              </p>

              <p className="text-gray-700 leading-relaxed">
                La tecnología de impresión textil permite reproducir logotipos complejos en ambos lados del gorro con hasta 4 colores. Para escuelas de natación, esto permite imprimir el logo del club en un lado y el nivel del nadador (Rana 1, Rana 2, etc.) en el otro, facilitando la organización de grupos durante las clases. EuroSwimCaps ofrece 10 colores base para poliéster y lycra, con referencias Pantone certificadas para garantizar consistencia en pedidos recurrentes.
              </p>
            </div>

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
          <div className="container max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">Opciones de Color</h2>
            <p className="text-center text-gray-600 mb-8">
              Amplia gama de colores disponibles para poliéster y lycra.
            </p>

            {/* Color Chart Image */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <img
                src="/gorro-polyester-colors.jpg"
                alt="Colores disponibles para gorros de tela - poliéster y lycra con códigos Pantone"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Top 10 Colors with Pantone Codes */}
            <h3 className="text-2xl font-bold text-center mb-6">Top 10 Colores Más Populares</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { code: 'F286C ROYAL BLUE', pantone: '(PANTONE 286C)', bg: '#0033A0', text: 'white' },
                { code: 'F203H RED', pantone: '(PANTONE 179C)', bg: '#E4002B', text: 'white' },
                { code: 'F419 BLACK', pantone: '(PANTONE 419)', bg: '#000000', text: 'white' },
                { code: 'F355C GREEN', pantone: '(PANTONE 355C)', bg: '#00A651', text: 'white' },
                { code: 'F000 WHITE', pantone: '(PANTONE 000)', bg: '#FFFFFF', text: 'black' },
                { code: 'F109C YELLOW', pantone: '(PANTONE 109C)', bg: '#FFD700', text: 'black' },
                { code: 'F298C LIGHT BLUE', pantone: '(PANTONE 298C)', bg: '#00BFFF', text: 'white' },
                { code: 'F021C ORANGE', pantone: '(PANTONE 021C)', bg: '#FF6600', text: 'white' },
                { code: 'F213C PINK', pantone: '(PANTONE 213C)', bg: '#FF69B4', text: 'white' },
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
              Colores brillantes y vibrantes. Personalización disponible con hasta 6 colores de impresión. Referencias Pantone para precisión exacta.
            </p>
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

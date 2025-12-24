import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuoteForm from "@/components/QuoteForm";
import BulkOrderCalculator from "@/components/BulkOrderCalculator";
import CapTestimonials from "@/components/CapTestimonials";
import DesignPreviewTool from "@/components/DesignPreviewTool";
import { CheckCircle2, Truck, Clock, Shield, Palette } from "lucide-react";
import { useGorrosTranslation } from "@/hooks/useGorrosTranslation";
import { gorrosSiliconaTranslations } from "@/translations/gorrosSilicona";
import HrefLangTags from "@/components/HrefLangTags";

/**
 * Silicone Swimming Caps Product Page
 * Mirrors EuroSwimCaps.com structure with accurate pricing
 */
export default function GorrosSilicona() {
  const { lang } = useGorrosTranslation();
  const t = gorrosSiliconaTranslations[lang];

  const colors = [
    { name: "Azul Oscuro", code: "F208", pantone: "276c" },
    { name: "Azul Marino", code: "S132H", pantone: "654c" },
    { name: "Azul Royal Claro", code: "B3", pantone: "285C" },
    { name: "Azul Claro", code: "SH71H", pantone: "288C" },
    { name: "Azul Royal Oscuro", code: "BF", pantone: "2126C" },
    { name: "Azul Royal", code: "F206H", pantone: "293c" },
    { name: "Naranja", code: "F202", pantone: "165c" },
    { name: "Naranja Neón", code: "E1", pantone: "811C" },
    { name: "Amarillo Medio", code: "S17", pantone: "123c" },
    { name: "Oro Metálico", code: "Y7", pantone: "142C" },
    { name: "Amarillo", code: "SH83", pantone: "106C" },
    { name: "Amarillo Flúor", code: "SH83F", pantone: "600c" },
    { name: "Burdeos", code: "SH75", pantone: "7426c" },
    { name: "Rojo Oscuro", code: "R1", pantone: "206c" },
    { name: "Rojo", code: "F203H", pantone: "179c" },
    { name: "Rosa Fucsia", code: "F204H", pantone: "226c" },
    { name: "Rosa Neón", code: "SC16", pantone: "806c" },
    { name: "Rosa Bebé", code: "GL04", pantone: "203c" },
    { name: "Negro", code: "F209H", pantone: "-" },
    { name: "Verde Kelly", code: "F217", pantone: "355c" },
    { name: "Plata Metálico", code: "SD11H", pantone: "877c" },
    { name: "Verde Claro", code: "SH86", pantone: "2257c" },
    { name: "Morado", code: "SH73H", pantone: "2597c" },
    { name: "Verde Neón", code: "SE25", pantone: "7479c" },
    { name: "Azul Cielo", code: "F230H", pantone: "298c" },
    { name: "Verde Neón Brillante", code: "F233H", pantone: "802c" },
    { name: "Blanco", code: "F211H", pantone: "-" },
    { name: "Bronce Metálico", code: "G509", pantone: "147c" },
    { name: "Oro Metálico", code: "F233", pantone: "871c" },
  ];

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <meta
          name="description"
          content={t.metaDescription}
        />
        <link rel="canonical" href="https://aquaevents.club/gorros-natacion/silicona" />
      </Helmet>
      <HrefLangTags basePath="/gorros-natacion/silicona" />
      <Helmet>
        
        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Gorros de Silicona Personalizados",
            "description": "Gorros de silicona personalizados de alta calidad para clubes de natación. Ideales para uso diario y competición. 100% hipoalergénicos, 50GMS de grosor, máxima durabilidad.",
            "image": "https://aquaevents.club/gorro-silicona-azul-personalizado.jpg",
            "brand": {
              "@type": "Brand",
              "name": "EuroSwimCaps",
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "EUR",
              "lowPrice": "4.45",
              "highPrice": "7.50",
              "offerCount": "3",
              "availability": "https://schema.org/InStock",
              "priceSpecification": [
                {
                  "@type": "PriceSpecification",
                  "price": "4.45",
                  "priceCurrency": "EUR",
                  "name": "1 color de impresión",
                },
                {
                  "@type": "PriceSpecification",
                  "price": "5.95",
                  "priceCurrency": "EUR",
                  "name": "2 colores de impresión",
                },
                {
                  "@type": "PriceSpecification",
                  "price": "7.50",
                  "priceCurrency": "EUR",
                  "name": "3 colores de impresión",
                },
              ],
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "247",
            },
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
                "name": "¿Cuál es la diferencia entre gorros de silicona y látex?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Los gorros de silicona son más duraderos, hipoalergénicos y cómodos que los de látex. La silicona es más gruesa (50GMS), no causa alergias, mantiene mejor la forma y dura hasta 3 veces más. Los gorros de látex son más económicos pero menos resistentes al cloro y pueden causar reacciones alérgicas."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuál es el pedido mínimo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "El pedido mínimo es de 50 unidades. Ofrecemos descuentos progresivos para pedidos de 250, 500, 1000 y más unidades."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuántos colores puedo imprimir?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Puedes elegir entre 1, 2 o 3 colores de impresión. Precios para 100 unidades: €4.45 (1 color), €5.95 (2 colores), €7.50 (3 colores). Disponemos de más de 30 colores de gorro base."
                }
              },
              {
                "@type": "Question",
                "name": "¿Son aptos para competición?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, nuestros gorros de silicona cumplen con las normativas FINA y son ideales para competiciones oficiales. Son utilizados por clubes profesionales y nadadores de élite."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuánto duran los gorros de silicona?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Con el cuidado adecuado, los gorros de silicona pueden durar entre 1 y 2 años de uso regular. Son mucho más resistentes al cloro y al desgaste que los gorros de látex o tela."
                }
              },
              {
                "@type": "Question",
                "name": "¿Son hipoalergénicos?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, la silicona es 100% hipoalergénica y no contiene látex. Es ideal para personas con alergias o piel sensible. No causa irritación ni reacciones alérgicas."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cómo se limpian y mantienen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Enjuaga el gorro con agua fría después de cada uso, sécalo con una toalla y déjalo secar al aire. No lo expongas al sol directo ni uses secadora. Evita objetos punzantes y guárdalo en un lugar fresco y seco."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué grosor tienen los gorros?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nuestros gorros de silicona tienen un grosor de 50GMS (gramos por metro cuadrado), que es el estándar profesional. Este grosor garantiza durabilidad, elasticidad y comodidad óptimas."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuál es el tiempo de entrega?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "El tiempo de producción y entrega es de aproximadamente 3 semanas desde la confirmación del pedido y aprobación del diseño. Ofrecemos envío gratuito a toda España."
                }
              },
              {
                "@type": "Question",
                "name": "¿Puedo ver una muestra antes de hacer el pedido completo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, ofrecemos muestras físicas para pedidos grandes. También proporcionamos mockups digitales gratuitos para que puedas visualizar el diseño final antes de la producción."
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
                "name": "Gorros de Silicona",
                "item": "https://aquaevents.club/gorros-natacion/silicona",
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
            <nav className="text-sm mb-6 opacity-90">
              <Link href="/" className="hover:underline">{t.breadcrumbHome}</Link>
              <span className="mx-2">•</span>
              <Link href="/gorros-natacion" className="hover:underline">{t.breadcrumbCaps}</Link>
              <span className="mx-2">•</span>
              <span>{t.breadcrumbSilicone}</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 italic">
              {t.heroHeading}
            </h1>
            <p className="text-xl mb-8 max-w-3xl">
              {t.heroP1}
            </p>
            <p className="text-lg mb-8 max-w-3xl">
              {t.heroP2}
            </p>
            <p className="text-lg mb-8 max-w-3xl">
              {t.heroP3}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => {
                  const form = document.getElementById('presupuesto');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {t.ctaButton}
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/gorros-natacion">
                  Ver Todos los Gorros
                </Link>
              </Button>
            </div>
            
            <div className="hidden md:block">
              <img
                src="/gorro-silicona-amarillo-hero.webp"
                alt="Gorro de silicona amarillo personalizado en agua"
                className="w-full max-w-md mx-auto rounded-full shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-4">Precios Gorros de Silicona Personalizados</h2>
            <p className="text-center text-gray-600 mb-12">
              Precio estándar para 100 gorros <strong>incluyendo envío gratuito</strong>. Pedido mínimo 50 piezas. Descuentos significativos en 250, 500, 1000 y 1500+ piezas.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-blue-600">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-4 text-blue-600">1 color de impresión</h3>
                  <p className="text-4xl font-bold mb-4">€4.45</p>
                  <p className="text-gray-600">por unidad</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-600">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-4 text-blue-600">2 colores de impresión</h3>
                  <p className="text-4xl font-bold mb-4">€5.95</p>
                  <p className="text-gray-600">por unidad</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-600">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-4 text-blue-600">3 colores de impresión</h3>
                  <p className="text-4xl font-bold mb-4">€7.50</p>
                  <p className="text-gray-600">por unidad</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-center mt-8 text-gray-700 font-semibold">
              Descuentos significativos disponibles para pedidos de 250, 500, 1000 y 1500+ piezas. Impresión multicolor también disponible.
            </p>
          </div>
        </section>

        {/* Color Options */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-4">Opciones de Color</h2>
            <p className="text-center text-gray-600 mb-8">
              Tenemos la GAMA DE COLORES MÁS AMPLIA de Europa para gorros de natación. Más de 30 colores disponibles con referencias Pantone.
            </p>

            {/* Color Chart Image */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <img
                src="/euroswimcaps-silicone-colors-official.webp"
                alt="Carta de colores oficial de gorros de silicona - Más de 30 colores con códigos Pantone"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Top 10 Colors with Pantone Codes */}
            <h3 className="text-2xl font-bold text-center mb-6">Top 10 Colores Más Populares</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { name: 'Azul Royal', code: 'F286C ROYAL BLUE', pantone: '(PANTONE 286C)', bg: '#0033A0', text: 'white' },
                { name: 'Rojo', code: 'F203H RED', pantone: '(PANTONE 179C)', bg: '#E4002B', text: 'white' },
                { name: 'Negro', code: 'F419 BLACK', pantone: '(PANTONE 419)', bg: '#000000', text: 'white' },
                { name: 'Blanco', code: 'F000 WHITE', pantone: '(PANTONE 000)', bg: '#FFFFFF', text: 'black' },
                { name: 'Amarillo', code: 'F109C YELLOW', pantone: '(PANTONE 109C)', bg: '#FFD700', text: 'black' },
                { name: 'Verde', code: 'F355C GREEN', pantone: '(PANTONE 355C)', bg: '#00A651', text: 'white' },
                { name: 'Rosa', code: 'F213C PINK', pantone: '(PANTONE 213C)', bg: '#FF69B4', text: 'white' },
                { name: 'Naranja', code: 'F021C ORANGE', pantone: '(PANTONE 021C)', bg: '#FF6600', text: 'white' },
                { name: 'Morado', code: 'F2665C PURPLE', pantone: '(PANTONE 2665C)', bg: '#8B00FF', text: 'white' },
                { name: 'Azul Claro', code: 'F298C LIGHT BLUE', pantone: '(PANTONE 298C)', bg: '#00BFFF', text: 'white' },
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
              Todos los colores incluyen referencias Pantone para garantizar la precisión exacta del color. Más de 30 colores disponibles bajo pedido.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Características</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <Palette className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Amplia Gama de Colores</h3>
                    <p className="text-gray-600">Disponibles en una amplia selección de excelentes colores con referencias Pantone para precisión exacta.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">100% Hipoalergénico</h3>
                    <p className="text-gray-600">Material de silicona de alta calidad, completamente hipoalergénico y seguro para pieles sensibles.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <Truck className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Envío Gratuito</h3>
                    <p className="text-gray-600">Envío gratuito a España y toda Europa en pedidos que cumplan las cantidades mínimas.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <Clock className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Entrega Rápida</h3>
                    <p className="text-gray-600">Tiempo de entrega de 3 semanas desde la aprobación del diseño. Servicios express y super express disponibles.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle2 className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Pantallas Gratuitas</h3>
                    <p className="text-gray-600">Pantallas gratuitas en todos los gorros (sujeto a aprobación del diseño).</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <CheckCircle2 className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Impresión hasta 6 Colores</h3>
                    <p className="text-gray-600">Impresión de hasta 6 colores en gorros (sujeto al diseño). Todos los gorros impresos en nuestra fábrica del Reino Unido.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-bold mb-4 text-lg">Especificaciones Técnicas</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span><strong>Grosor:</strong> 50GMS para máxima durabilidad</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span><strong>Talla:</strong> Única (adultos y niños)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span><strong>Material:</strong> 100% silicona hipoalergénica</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span><strong>Totalmente personalizable:</strong> Logotipos, nombres, patrocinadores</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span><strong>Gorros para cabello largo:</strong> Disponibles bajo pedido</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span><strong>Visuales disponibles:</strong> Previa solicitud antes de la producción</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bulk Order Calculator */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <BulkOrderCalculator capType="silicona" capTypeLabel="Gorros de Silicona" />
          </div>
        </section>

        {/* Design Preview Tool */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl">
            <DesignPreviewTool capType="silicona" />
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Lo Que Dicen Nuestros Clientes</h2>
            <CapTestimonials capType="silicona" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuál es la diferencia entre gorros de silicona y látex?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Los gorros de silicona son más duraderos, hipoalergénicos y cómodos que los de látex. La silicona es más gruesa (50GMS), no causa alergias, mantiene mejor la forma y dura hasta 3 veces más. Los gorros de látex son más económicos pero menos resistentes al cloro y pueden causar reacciones alérgicas.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuál es el pedido mínimo?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">El pedido mínimo es de 50 unidades. Ofrecemos descuentos progresivos para pedidos de 250, 500, 1000 y más unidades.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuántos colores puedo imprimir?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Puedes elegir entre 1, 2 o 3 colores de impresión. Precios para 100 unidades: €4.45 (1 color), €5.95 (2 colores), €7.50 (3 colores). Disponemos de más de 30 colores de gorro base.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Son aptos para competición?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Sí, nuestros gorros de silicona cumplen con las normativas FINA y son ideales para competiciones oficiales. Son utilizados por clubes profesionales y nadadores de élite.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuánto duran los gorros de silicona?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Con el cuidado adecuado, los gorros de silicona pueden durar entre 1 y 2 años de uso regular. Son mucho más resistentes al cloro y al desgaste que los gorros de látex o tela.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Son hipoalergénicos?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Sí, la silicona es 100% hipoalergénica y no contiene látex. Es ideal para personas con alergias o piel sensible. No causa irritación ni reacciones alérgicas.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cómo se limpian y mantienen?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Enjuaga el gorro con agua fría después de cada uso, sécalo con una toalla y déjalo secar al aire. No lo expongas al sol directo ni uses secadora. Evita objetos punzantes y guárdalo en un lugar fresco y seco.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Qué grosor tienen los gorros?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Nuestros gorros de silicona tienen un grosor de 50GMS (gramos por metro cuadrado), que es el estándar profesional. Este grosor garantiza durabilidad, elasticidad y comodidad óptimas.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuál es el tiempo de entrega?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">El tiempo de producción y entrega es de aproximadamente 3 semanas desde la confirmación del pedido y aprobación del diseño. Ofrecemos envío gratuito a toda España.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Puedo ver una muestra antes de hacer el pedido completo?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Sí, ofrecemos muestras físicas para pedidos grandes. También proporcionamos mockups digitales gratuitos para que puedas visualizar el diseño final antes de la producción.</p></CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="presupuesto" className="py-16">
          <div className="container max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Solicita tu Presupuesto</h2>
              <p className="text-gray-600">Respuesta en menos de 24 horas.</p>
            </div>
            <QuoteForm productType="Gorros de Silicona" />
          </div>
        </section>
      </div>
    </>
  );
}

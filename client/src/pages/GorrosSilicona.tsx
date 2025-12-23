import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuoteForm from "@/components/QuoteForm";
import BulkOrderCalculator from "@/components/BulkOrderCalculator";
import CapTestimonials from "@/components/CapTestimonials";
import DesignPreviewTool from "@/components/DesignPreviewTool";
import { CheckCircle2, Truck, Clock, Shield, Palette } from "lucide-react";

/**
 * Silicone Swimming Caps Product Page
 * Mirrors EuroSwimCaps.com structure with accurate pricing
 */
export default function GorrosSilicona() {
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
        <title>Gorros de Silicona Personalizados | Desde €4.45 | Envío Gratis España</title>
        <meta
          name="description"
          content="Gorros de silicona personalizados para clubes. €4.45 (1 color), €5.95 (2 colores), €7.50 (3 colores) por 100 unidades. 50GMS grosor. 30+ colores. Envío gratis. 3 semanas entrega."
        />
        <link rel="canonical" href="https://aquaevents.club/gorros-natacion/silicona" />
        
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
              <Link href="/" className="hover:underline">INICIO</Link>
              <span className="mx-2">•</span>
              <Link href="/gorros-natacion" className="hover:underline">GORROS DE NATACIÓN</Link>
              <span className="mx-2">•</span>
              <span>GORROS DE SILICONA</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 italic">
              GORROS DE SILICONA PERSONALIZADOS
            </h1>
            <p className="text-xl mb-8 max-w-3xl">
              Somos uno de los proveedores líderes, más antiguos y de mayor confianza de Europa de gorros de natación totalmente personalizados e impresos, además de una amplia gama de otros productos y servicios.
            </p>
            <p className="text-lg mb-8 max-w-3xl">
              Nos especializamos en gorros de natación y somos expertos en esta área técnica y especializada de impresión. Ideales para usuarios diarios, con mucho más desgaste garantizado.
            </p>
            <p className="text-lg mb-8 max-w-3xl">
              Este gorro de silicona es adecuado para adultos y niños ya que es de talla única, la forma y el ajuste moldeados están diseñados para proporcionar <strong>máxima comodidad</strong> junto con <strong>máximo rendimiento</strong>.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <a href="https://www.euroswimcaps.com/how-to-order" target="_blank" rel="noopener noreferrer">
                  Solicitar Presupuesto
                </a>
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
                <CardHeader><CardTitle className="text-lg">¿Cuál es el pedido mínimo?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">50 unidades. Descuentos para 250, 500, 1000+ unidades.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Cuántos colores puedo imprimir?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">1, 2 o 3 colores. Precios: €4.45 (1 color), €5.95 (2 colores), €7.50 (3 colores) para 100 unidades.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">¿Son aptos para competición?</CardTitle></CardHeader>
                <CardContent><p className="text-gray-600">Sí, cumplen normativas FINA. Ideales para competiciones.</p></CardContent>
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

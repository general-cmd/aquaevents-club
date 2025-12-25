import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Package, Truck, Clock, Star } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { useTranslation } from "react-i18next";
import HrefLangTags from "@/components/HrefLangTags";

/**
 * Main Swimming Caps Overview Page
 * SEO optimized for "gorros de natación personalizados" and related keywords
 * Includes CollectionPage, FAQPage, and Review schema markup
 */
export default function GorrosNatacionMain() {
  const { t } = useTranslation();
  const translations = t('gorros.main', { returnObjects: true }) as any;
  const products = [
    {
      name: "Gorros de Silicona",
      slug: "silicona",
      price: "desde €4.45",
      image: "/gorro-silicona-amarillo-hero.webp",
      description: "Ideales para uso diario. Mayor durabilidad y resistencia al cloro. 100% hipoalergénicos.",
      features: ["Máxima durabilidad", "50GMS grosor", "Ajuste perfecto", "30+ colores"],
    },
    {
      name: "Gorros de Látex",
      slug: "latex",
      price: "desde €2.10",
      image: "/gorro-latex-verde.webp",
      description: "Perfectos para eventos y promociones. Económicos y versátiles. Amplia gama de colores.",
      features: ["Mejor precio", "Eventos masivos", "Rápida entrega", "20+ colores"],
    },
    {
      name: "Gorros de Gamuza",
      slug: "gamuza",
      price: "desde €4.99",
      image: "/gorro-gamuza-azul-hero.webp",
      description: "Tacto suave y cómodo. Ideal para nadadores con sensibilidad al látex. Acabado premium.",
      features: ["Tacto suave", "Sin látex", "Acabado premium", "15+ colores"],
    },
    {
      name: "Gorros Pelo Largo",
      slug: "pelo-largo",
      price: "desde €6.20",
      image: "/gorro-pelo-largo-azul-hero.webp",
      description: "Diseñados específicamente para nadadores con cabello largo. Mayor capacidad y comodidad.",
      features: ["Diseño especial", "Mayor capacidad", "Ajuste cómodo", "10+ colores"],
    },
    {
      name: "Gorros de Tela",
      slug: "tela",
      price: "desde €2.10",
      image: "/gorro-lycra-hero.jpg",
      description: "Poliéster y lycra para escuelas y uso recreativo. Cómodos, ligeros y económicos.",
      features: ["Ideal niños", "Máxima comodidad", "Escuelas natación", "Varios colores"],
    },
  ];

  const faqs = [
    {
      question: "¿Cuál es el pedido mínimo de gorros personalizados?",
      answer: "El pedido mínimo es de 50 unidades para gorros de látex y 50 unidades para gorros de silicona. Ofrecemos descuentos significativos para pedidos de 250, 500, 1000 y 1500+ unidades.",
    },
    {
      question: "¿Cuánto tiempo tarda la producción de gorros personalizados?",
      answer: "El tiempo de producción estándar es de 3 semanas desde la aprobación del diseño y el pago. Ofrecemos servicios express y super express para entregas más rápidas si es necesario.",
    },
    {
      question: "¿Qué tipo de personalización ofrecen?",
      answer: "Ofrecemos impresión de hasta 6 colores en los gorros. Podemos imprimir logotipos de clubes, nombres, patrocinadores y diseños personalizados. Las pantallas son gratuitas sujetas a la aprobación del diseño.",
    },
    {
      question: "¿Cuál es la diferencia entre gorros de silicona y látex?",
      answer: "Los gorros de silicona son más duraderos, resistentes al cloro y cómodos para uso diario (€4.45/ud). Los gorros de látex son más económicos y perfectos para eventos masivos o promociones (€2.10/ud). Ambos son 100% hipoalergénicos.",
    },
    {
      question: "¿Ofrecen envío gratuito a España?",
      answer: "Sí, ofrecemos envío gratuito a toda España y Europa para pedidos que cumplan con las cantidades mínimas. El envío estándar tarda 3-5 días laborables una vez finalizada la producción.",
    },
    {
      question: "¿Puedo ver una muestra antes de hacer el pedido completo?",
      answer: "Sí, podemos proporcionar muestras físicas y visuales digitales de su diseño antes de la producción. Contacte con nosotros para solicitar muestras y discutir los detalles de su pedido.",
    },
    {
      question: "¿Qué colores están disponibles para los gorros?",
      answer: "Tenemos la gama de colores MÁS AMPLIA de Europa. Gorros de silicona: 30+ colores. Gorros de látex: 20+ colores. Gorros de ante: 15+ colores. Gorros pelo largo: 10+ colores. Todos con referencias Pantone para garantizar la precisión del color.",
    },
    {
      question: "¿Los gorros son adecuados para competición oficial?",
      answer: "Sí, todos nuestros gorros cumplen con las normativas de competición de la FINA y federaciones nacionales. Los gorros de silicona son especialmente populares para competiciones por su ajuste perfecto y durabilidad.",
    },
  ];

  const testimonials = [
    {
      name: "Amanda",
      club: "CN Sabadell",
      rating: 5,
      text: "Excelente comunicación y producto de gran calidad para nuestro club. Los gorros de silicona con 2 colores quedaron perfectos. Entrega rápida. Totalmente recomendados.",
    },
    {
      name: "Martín",
      club: "Swilly Seals Ireland",
      rating: 5,
      text: "Nos recomendaron Euro Swim Caps y todo fue muy profesional. Los gorros y el diseño son de máxima calidad y tienen muy buena relación calidad-precio. Los recomendaría a cualquiera.",
    },
    {
      name: "Isabella",
      club: "Club Natación Barcelona",
      rating: 5,
      text: "Pedimos 250 gorros y Euro Swim Cap fue brillante en todo momento. Cambiamos el diseño varias veces y nada fue demasiado problema. Los gorros son exactamente lo que queríamos y la calidad es excelente.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{translations.pageTitle}</title>
        <meta
          name="description"
          content={translations.metaDescription}
        />
        <meta name="keywords" content="gorros natación personalizados, gorros piscina club, gorros natación al por mayor, gorros silicona personalizados, gorros latex baratos, gorros natación competición" />
        <link rel="canonical" href="https://aquaevents.club/gorros-natacion" />
      </Helmet>
      <HrefLangTags basePath="/gorros-natacion" />
      <Helmet>
        
        {/* Open Graph */}
        <meta property="og:title" content="Gorros de Natación Personalizados para Clubes | Desde €2.10" />
        <meta property="og:description" content="Gorros personalizados para clubes. Silicona, Látex, Ante, Pelo Largo. Envío gratis España. +2M gorros impresos." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aquaevents.club/gorros-natacion" />
        <meta property="og:image" content="https://aquaevents.club/gorro-silicona-azul-personalizado.jpg" />

        {/* CollectionPage schema removed - incomplete Product schemas were causing Google Search Console errors.
             Main Product schema is injected via SSR in server/_core/vite.ts with all required fields. */}

        {/* FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
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
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
          <div className="container">
            <nav className="text-sm mb-6 opacity-90">
              <Link href="/" className="hover:underline">{translations.breadcrumbHome}</Link>
              <span className="mx-2">/</span>
              <span>{translations.breadcrumbCaps}</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {translations.heroHeading}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl">
              {translations.heroP1}
            </p>
            <p className="text-lg mb-8 max-w-3xl">
              {translations.heroP2}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Pedido mínimo 50 unidades</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                <span>Envío gratis España</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Entrega 3 semanas</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span>Hasta 6 colores impresión</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <a href="#presupuesto">
                  {translations.ctaButton}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/blog/guia-pedido-gorros-club">
                  Guía de Pedido
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Portfolio Examples */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">Proyectos Recientes - Gorros Personalizados para Clubes</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Más de 2 millones de gorros personalizados entregados a clubes, federaciones y equipos de competición en toda Europa.
            </p>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <img
                  src="/gorro-silicona-personalizado-the-trigent.jpg"
                  alt="Gorro de natación silicona personalizado The Trigent - Diseño multicolor para club de triatlón con impresión de logo profesional"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-center px-4 font-semibold">The Trigent - Triatlón Multicolor</p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <img
                  src="/gorro-silicona-personalizado-100tri-race-team.jpg"
                  alt="Gorros de silicona personalizados 100% TRI Race Team - Color naranja con logo blanco para equipo de competición"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-center px-4 font-semibold">100% TRI Race Team - Naranja</p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <img
                  src="/gorros-silicona-personalizados-ice-swimmers.jpg"
                  alt="Gorros de natación silicona Ice Swimmers - Pedido personalizado blanco y azul para club de natación en aguas abiertas"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-center px-4 font-semibold">Ice Swimmers - Aguas Abiertas</p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <img
                  src="/gorros-silicona-multicolor-swimadelica.jpg"
                  alt="Gorros de silicona multicolor Swimadelica - Producción de 6 colores diferentes con diseño artístico personalizado"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-center px-4 font-semibold">Swimadelica - 6 Colores Artísticos</p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <img
                  src="/gorro-silicona-personalizado-beavers-trust.jpg"
                  alt="Gorro silicona personalizado The Beavers Trust - Color rojo con escudo bordado para club deportivo Hampton & Richmond Borough FC"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-center px-4 font-semibold">The Beavers Trust - Rojo Escudo</p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <img
                  src="/gorro-silicona-personalizado-bosh-winter.jpg"
                  alt="Gorros de natación personalizados BOSH - Diseño azul celeste con logo negro para eventos de invierno"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-center px-4 font-semibold">BOSH - Eventos Invierno</p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <img
                  src="/gorro-silicona-personalizado-corsham-league.jpg"
                  alt="Gorro silicona Corsham S.C. League Team - Color amarillo con logo verde para equipo de liga de natación"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-center px-4 font-semibold">Corsham S.C. - Liga Amarillo</p>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <img
                  src="/gorro-pelo-largo-azul-hero.webp"
                  alt="Gorros para pelo largo azules personalizados para equipo de sincronizada y natación artística"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-center px-4 font-semibold">Pelo Largo - Sincronizada</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">Tipos de Gorros Personalizados</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Ofrecemos 5 tipos de gorros de natación personalizados para adaptarse a las necesidades de tu club, federación o evento.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.slug} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <img
                      src={product.image}
                      alt={`${product.name} personalizados para clubes de natación`}
                      className="w-full h-48 object-cover rounded-t-lg mb-4"
                    />
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-blue-600">
                      {product.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <ul className="space-y-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full">
                      <Link href={`/gorros-natacion/${product.slug}`}>
                        Ver Detalles
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Comparativa de Gorros de Natación</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-4 text-left">Característica</th>
                    <th className="p-4 text-center">Silicona</th>
                    <th className="p-4 text-center">Látex</th>
                    <th className="p-4 text-center">Gamuza</th>
                    <th className="p-4 text-center">Pelo Largo</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-4 font-semibold">Precio (100 uds)</td>
                    <td className="p-4 text-center">€4.45</td>
                    <td className="p-4 text-center">€2.10</td>
                    <td className="p-4 text-center">€4.99</td>
                    <td className="p-4 text-center">€6.20</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Durabilidad</td>
                    <td className="p-4 text-center">⭐⭐⭐⭐⭐</td>
                    <td className="p-4 text-center">⭐⭐⭐</td>
                    <td className="p-4 text-center">⭐⭐⭐⭐</td>
                    <td className="p-4 text-center">⭐⭐⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Uso recomendado</td>
                    <td className="p-4 text-center">Diario / Competición</td>
                    <td className="p-4 text-center">Eventos / Promociones</td>
                    <td className="p-4 text-center">Diario / Sensibilidad</td>
                    <td className="p-4 text-center">Cabello largo</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Resistencia al cloro</td>
                    <td className="p-4 text-center">Excelente</td>
                    <td className="p-4 text-center">Buena</td>
                    <td className="p-4 text-center">Muy buena</td>
                    <td className="p-4 text-center">Excelente</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Grosor</td>
                    <td className="p-4 text-center">50GMS</td>
                    <td className="p-4 text-center">Fino</td>
                    <td className="p-4 text-center">Medio</td>
                    <td className="p-4 text-center">50GMS</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Colores disponibles</td>
                    <td className="p-4 text-center">30+</td>
                    <td className="p-4 text-center">20+</td>
                    <td className="p-4 text-center">15+</td>
                    <td className="p-4 text-center">10+</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">Ideal para</td>
                    <td className="p-4 text-center">Clubes competitivos</td>
                    <td className="p-4 text-center">Eventos masivos</td>
                    <td className="p-4 text-center">Comodidad premium</td>
                    <td className="p-4 text-center">Nadadores pelo largo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-center mt-8 text-gray-600">
              <strong>Descuentos significativos disponibles para pedidos de 250, 500, 1000 y 1500+ unidades.</strong> Contacte para presupuesto personalizado.
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Lo Que Dicen Nuestros Clubes</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <Card key={idx} className="bg-white">
                  <CardHeader>
                    <div className="flex gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.club}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section id="presupuesto" className="py-16 bg-gradient-to-b from-white to-blue-50">
          <div className="container max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Solicita tu Presupuesto</h2>
              <p className="text-gray-600">
                Más de 2 millones de gorros impresos para clubes y federaciones. Te responderemos en menos de 24 horas.
              </p>
            </div>
            <QuoteForm productType="Gorros de Natación" />
          </div>
        </section>
      </div>
    </>
  );
}

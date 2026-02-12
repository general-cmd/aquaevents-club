import { useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Calendar, Thermometer, Ruler, Waves, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import BlogAffiliateSection, { SWIMMING_TRAINING_PRODUCTS } from "@/components/BlogAffiliateSection";
import SocialShareButtons from "@/components/SocialShareButtons";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Cómo Elegir Traje de Neopreno para Aguas Abiertas: Guía Completa 2026",
  "description": "Guía definitiva para elegir tu traje de neopreno perfecto. Grosor, ajuste, flotabilidad y comparativa de marcas (Orca, Zone3, Huub). Consejos de triatletas profesionales.",
  "image": "https://aquaevents.club/logo.png",
  "author": {
    "@type": "Organization",
    "name": "AquaEvents.club"
  },
  "publisher": {
    "@type": "Organization",
    "name": "AquaEvents.club",
    "logo": {
      "@type": "ImageObject",
      "url": "https://aquaevents.club/logo.png"
    }
  },
  "datePublished": "2026-01-05",
  "dateModified": "2026-01-05"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué grosor de neopreno necesito para aguas abiertas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El grosor depende de la temperatura del agua: 3-4mm para aguas cálidas (+20°C), 4-5mm para aguas templadas (16-20°C), y 5-6mm para aguas frías (<16°C). La mayoría de neoprenos de triatlón usan grosor variable: 5mm en torso/piernas (flotabilidad) y 2-3mm en brazos/hombros (flexibilidad para brazada). En España, un neopreno 4-5mm cubre el 90% de condiciones."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo sé si un neopreno me queda bien?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un neopreno bien ajustado debe sentirse ceñido pero sin restringir la respiración. Prueba: levanta los brazos sobre la cabeza (no debe haber exceso de material en axilas), simula brazada de crol (hombros flexibles sin tirones), y verifica que el cuello cierre sin ahogar. Debe haber contacto completo con la piel sin bolsas de aire. Si entra agua fría por cuello/muñecas, es demasiado grande."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto dura un traje de neopreno de triatlón?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Con cuidado adecuado, un neopreno de calidad dura 3-5 años (50-100 usos). Factores clave: enjuagar con agua dulce después de cada uso, secar a la sombra (nunca al sol directo), colgar por la cintura (no por hombros), y evitar uñas/objetos afilados al ponértelo. Los neoprenos de gama alta (Orca Apex, Zone3 Vanquish) tienen costuras reforzadas que duran más."
      }
    },
    {
      "@type": "Question",
      "name": "¿Puedo usar un neopreno de surf para nadar en aguas abiertas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No es recomendable. Los neoprenos de surf priorizan aislamiento térmico con grosor uniforme (3-5mm en todo el cuerpo), lo que restringe el movimiento de brazos. Los neoprenos de natación/triatlón tienen paneles específicos: grosor reducido en hombros (2-3mm) para brazada libre, y mayor flotabilidad en caderas/piernas (5mm) para posición horizontal óptima. La diferencia en rendimiento es significativa."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué marcas de neopreno son las mejores para triatlón?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Las marcas líderes son Orca (tecnología Yamamoto, excelente flotabilidad), Zone3 (mejor relación calidad-precio), Huub (diseño innovador por Dan Bullock), Blueseventy (favorita de triatletas profesionales), y Sailfish (especialistas alemanes). Para principiantes: Zone3 Advance (250-350€). Para avanzados: Orca Apex o Huub Archimedes (400-600€). Evita marcas genéricas sin especificaciones de grosor variable."
      }
    }
  ]
};

export default function BlogNeoprenoAguasAbiertas() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Cómo Elegir Traje de Neopreno para Aguas Abiertas: Guía Completa 2026 | AquaEvents.club</title>
        <meta 
          name="description" 
          content="Guía definitiva para elegir tu traje de neopreno perfecto para aguas abiertas y triatlón. Grosor, ajuste, flotabilidad y comparativa de marcas (Orca, Zone3, Huub). Consejos de profesionales." 
        />
        <meta name="keywords" content="neopreno aguas abiertas, traje neopreno triatlón, como elegir neopreno, Orca neopreno, Zone3 wetsuit, grosor neopreno, neopreno natación" />
        <link rel="canonical" href="https://aquaevents.club/blog/neopreno-aguas-abiertas" />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img 
                  src="/logo.png" 
                  alt="AquaEvents.club" 
                  className="w-12 h-12 object-contain"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  AquaEvents.club
                </span>
              </a>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/eventos">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Eventos
                </a>
              </Link>
              <Link href="/federaciones">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Federaciones
                </a>
              </Link>
              <Link href="/blog">
                <a className="text-blue-600 font-medium">
                  Blog
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-cyan-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-cyan-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Guía de Compra 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cómo Elegir Traje de Neopreno para Aguas Abiertas: Guía Completa 2026
            </h1>
            <p className="text-xl text-cyan-100 mb-4">
              Todo lo que necesitas saber sobre grosor, ajuste, flotabilidad y marcas. Consejos de triatletas profesionales para elegir tu neopreno perfecto.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Actualizado: 5 de enero de 2026
              </span>
              <span className="flex items-center gap-2">
                <Waves className="w-4 h-4" />
                15 min lectura
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Elegir el traje de neopreno adecuado puede transformar tu experiencia en aguas abiertas, mejorando tu flotabilidad, velocidad y comodidad térmica. Un neopreno bien ajustado puede reducir tu tiempo de nado en 5-10% comparado con nadar sin él, mientras que un neopreno mal elegido puede restringir tu brazada y causar rozaduras dolorosas.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Esta guía completa te enseña cómo elegir tu traje de neopreno perfecto para natación en aguas abiertas y triatlón. Cubrimos grosor óptimo según temperatura del agua, cómo verificar el ajuste correcto, diferencias entre gamas de entrada y profesionales, y comparativa de las mejores marcas del mercado en 2026.
            </p>
          </section>

          {/* Temperature Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Grosor del Neopreno Según Temperatura del Agua</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-cyan-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Temperatura Agua</th>
                    <th className="px-4 py-3 text-left font-semibold">Grosor Recomendado</th>
                    <th className="px-4 py-3 text-left font-semibold">Tipo de Neopreno</th>
                    <th className="px-4 py-3 text-left font-semibold">Duración Cómoda</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-cyan-50">
                    <td className="px-4 py-3 font-semibold">&lt; 12°C</td>
                    <td className="px-4 py-3">5-6mm + accesorios</td>
                    <td className="px-4 py-3">Aguas muy frías + gorro/guantes neopreno</td>
                    <td className="px-4 py-3">30-45 min</td>
                  </tr>
                  <tr className="hover:bg-cyan-50">
                    <td className="px-4 py-3 font-semibold">12-16°C</td>
                    <td className="px-4 py-3">5mm (torso) / 3mm (brazos)</td>
                    <td className="px-4 py-3">Aguas frías - Neopreno triatlón estándar</td>
                    <td className="px-4 py-3">45-90 min</td>
                  </tr>
                  <tr className="hover:bg-cyan-50 bg-green-50">
                    <td className="px-4 py-3 font-semibold">16-20°C</td>
                    <td className="px-4 py-3">4-5mm (torso) / 2-3mm (brazos)</td>
                    <td className="px-4 py-3">⭐ Rango óptimo España - Uso todo el año</td>
                    <td className="px-4 py-3">1-2 horas</td>
                  </tr>
                  <tr className="hover:bg-cyan-50">
                    <td className="px-4 py-3 font-semibold">20-24°C</td>
                    <td className="px-4 py-3">3-4mm (torso) / 2mm (brazos)</td>
                    <td className="px-4 py-3">Aguas templadas - Verano Mediterráneo</td>
                    <td className="px-4 py-3">2+ horas</td>
                  </tr>
                  <tr className="hover:bg-cyan-50">
                    <td className="px-4 py-3 font-semibold">&gt; 24°C</td>
                    <td className="px-4 py-3">Sin neopreno o sleeveless</td>
                    <td className="px-4 py-3">Aguas cálidas - Opcional para flotabilidad</td>
                    <td className="px-4 py-3">Ilimitado</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              *Duraciones orientativas para nadadores con técnica correcta. Principiantes pueden sentir frío antes debido a menor eficiencia de brazada.
            </p>
          </section>

          {/* Fit Guide */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Cómo Verificar el Ajuste Perfecto: Checklist Completa</h2>
            
            <div className="space-y-6">
              <Card className="border-2 border-green-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                    Señales de Ajuste Correcto
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Cuello:</strong> Cierra completamente alrededor del cuello sin ahogar. Debe haber contacto total con la piel (sin bolsas de aire) pero permitir tragar sin molestias.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Hombros:</strong> Al simular brazada de crol, los hombros se mueven libremente sin tirones. No debe haber exceso de material en axilas cuando levantas los brazos.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Torso:</strong> Ceñido pero sin restringir la respiración profunda. Puedes inhalar completamente sin sentir opresión en el pecho.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Piernas:</strong> Las piernas del neopreno terminan justo por encima del tobillo (no deben cubrir el pie). Sin arrugas en la entrepierna al caminar.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Muñecas:</strong> Cierran ajustadas sin cortar la circulación. Puedes meter un dedo entre el neopreno y la muñeca, pero no dos dedos.
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-600">
                    <AlertTriangle className="w-6 h-6" />
                    Señales de Ajuste Incorrecto (Cambiar Talla)
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Demasiado grande:</strong> Entra agua fría por cuello/muñecas, bolsas de aire en axilas o espalda, exceso de material que se arruga al nadar.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Demasiado pequeño:</strong> Dificultad para respirar profundamente, hombros restringidos (no puedes completar brazada completa), marcas rojas profundas tras 10 min de uso.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Longitud incorrecta:</strong> Piernas del neopreno cubren el pie (demasiado largo) o terminan muy por encima del tobillo (demasiado corto). Ambos casos afectan hidrodinámica.
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Brand Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Comparativa de Marcas Líderes 2026</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Marca</th>
                    <th className="px-4 py-3 text-left font-semibold">Gama Entrada</th>
                    <th className="px-4 py-3 text-left font-semibold">Gama Alta</th>
                    <th className="px-4 py-3 text-left font-semibold">Especialidad</th>
                    <th className="px-4 py-3 text-left font-semibold">Precio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-blue-50">
                    <td className="px-4 py-3 font-semibold text-blue-600">Orca</td>
                    <td className="px-4 py-3">Athlex Float</td>
                    <td className="px-4 py-3">Apex Pro</td>
                    <td className="px-4 py-3">Tecnología Yamamoto, flotabilidad superior</td>
                    <td className="px-4 py-3">300-650€</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="px-4 py-3 font-semibold text-blue-600">Zone3</td>
                    <td className="px-4 py-3">Advance</td>
                    <td className="px-4 py-3">Vanquish</td>
                    <td className="px-4 py-3">Mejor relación calidad-precio</td>
                    <td className="px-4 py-3">250-500€</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="px-4 py-3 font-semibold text-blue-600">Huub</td>
                    <td className="px-4 py-3">Aegis III</td>
                    <td className="px-4 py-3">Archimedes</td>
                    <td className="px-4 py-3">Diseño innovador (3:5 buoyancy)</td>
                    <td className="px-4 py-3">350-600€</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="px-4 py-3 font-semibold text-blue-600">Blueseventy</td>
                    <td className="px-4 py-3">Sprint</td>
                    <td className="px-4 py-3">Helix</td>
                    <td className="px-4 py-3">Favorita triatletas profesionales</td>
                    <td className="px-4 py-3">300-550€</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="px-4 py-3 font-semibold text-blue-600">Sailfish</td>
                    <td className="px-4 py-3">One</td>
                    <td className="px-4 py-3">Ultimate IPS</td>
                    <td className="px-4 py-3">Especialistas alemanes, durabilidad</td>
                    <td className="px-4 py-3">280-520€</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Buying Tips */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Consejos de Compra: Evita Estos Errores Comunes</h2>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  Error #1: Comprar Online Sin Probar
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>El problema:</strong> Cada marca tiene tallaje diferente. Un "M" de Orca no es igual a un "M" de Zone3. Comprar sin probar es la causa #1 de devoluciones.
                </p>
                <p className="text-gray-700">
                  <strong>La solución:</strong> Visita una tienda especializada para probar tallas. Una vez conozcas tu talla exacta en una marca, puedes comprar online con confianza. Muchas tiendas ofrecen "prueba en casa" con devolución gratuita.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Thermometer className="w-6 h-6 text-blue-600" />
                  Error #2: Elegir Grosor Basándote Solo en Tu Tolerancia al Frío
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>El problema:</strong> "Yo no tengo frío fácilmente, así que compro un neopreno fino." El grosor del neopreno también afecta la flotabilidad, no solo el aislamiento térmico.
                </p>
                <p className="text-gray-700">
                  <strong>La solución:</strong> Un neopreno más grueso (5mm torso) mejora tu posición horizontal en el agua, reduciendo el esfuerzo de piernas. Incluso en aguas cálidas (20°C+), muchos triatletas usan neopreno por la ventaja de flotabilidad.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Ruler className="w-6 h-6 text-green-600" />
                  Error #3: Confundir "Ajustado" con "Incómodo"
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>El problema:</strong> Un neopreno debe sentirse muy ceñido en tierra, lo que puede resultar incómodo al principio. Muchos principiantes piden una talla más grande por error.
                </p>
                <p className="text-gray-700">
                  <strong>La solución:</strong> En el agua, el neopreno se expande ligeramente y la presión del agua lo comprime contra tu cuerpo. Lo que se siente "demasiado ajustado" en tierra es perfecto en el agua. Si puedes respirar profundamente y mover los hombros, el ajuste es correcto.
                </p>
              </div>
            </div>
          </section>

          {/* Affiliate Section */}
          <BlogAffiliateSection 
            title="Equipo Esencial para Aguas Abiertas"
            intro="Productos complementarios recomendados por triatletas profesionales. Envío rápido con Amazon Prime."
            products={SWIMMING_TRAINING_PRODUCTS.filter(p => 
              p.title.toLowerCase().includes('pull') || 
              p.title.toLowerCase().includes('tabla') ||
              p.title.toLowerCase().includes('aleta')
            )}
          />

          {/* Social Sharing */}
          <section className="mb-12">
            <SocialShareButtons 
              url="https://aquaevents.club/blog/neopreno-aguas-abiertas"
              title="Cómo Elegir Traje de Neopreno para Aguas Abiertas: Guía Completa 2026"
              description="Guía definitiva para elegir tu neopreno perfecto. Grosor, ajuste, flotabilidad y comparativa de marcas."
              hashtags={["triatlon", "aguasabiertas", "neopreno", "openwater"]}
            />
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Preguntas Frecuentes</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">¿Qué grosor de neopreno necesito para aguas abiertas?</h3>
                <p className="text-gray-700">
                  El grosor depende de la temperatura del agua: <strong>3-4mm para aguas cálidas (+20°C)</strong>, <strong>4-5mm para aguas templadas (16-20°C)</strong>, y <strong>5-6mm para aguas frías (&lt;16°C)</strong>. La mayoría de neoprenos de triatlón usan grosor variable: 5mm en torso/piernas (flotabilidad) y 2-3mm en brazos/hombros (flexibilidad para brazada). En España, un neopreno 4-5mm cubre el 90% de condiciones.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">¿Cómo sé si un neopreno me queda bien?</h3>
                <p className="text-gray-700">
                  Un neopreno bien ajustado debe sentirse <strong>ceñido pero sin restringir la respiración</strong>. Prueba: levanta los brazos sobre la cabeza (no debe haber exceso de material en axilas), simula brazada de crol (hombros flexibles sin tirones), y verifica que el cuello cierre sin ahogar. Debe haber contacto completo con la piel sin bolsas de aire. Si entra agua fría por cuello/muñecas, es demasiado grande.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">¿Cuánto dura un traje de neopreno de triatlón?</h3>
                <p className="text-gray-700">
                  Con cuidado adecuado, un neopreno de calidad dura <strong>3-5 años (50-100 usos)</strong>. Factores clave: enjuagar con agua dulce después de cada uso, secar a la sombra (nunca al sol directo), colgar por la cintura (no por hombros), y evitar uñas/objetos afilados al ponértelo. Los neoprenos de gama alta (Orca Apex, Zone3 Vanquish) tienen costuras reforzadas que duran más.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">¿Puedo usar un neopreno de surf para nadar en aguas abiertas?</h3>
                <p className="text-gray-700">
                  No es recomendable. Los neoprenos de surf priorizan aislamiento térmico con grosor uniforme (3-5mm en todo el cuerpo), lo que restringe el movimiento de brazos. Los <strong>neoprenos de natación/triatlón tienen paneles específicos</strong>: grosor reducido en hombros (2-3mm) para brazada libre, y mayor flotabilidad en caderas/piernas (5mm) para posición horizontal óptima. La diferencia en rendimiento es significativa.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">¿Qué marcas de neopreno son las mejores para triatlón?</h3>
                <p className="text-gray-700">
                  Las marcas líderes son <strong>Orca</strong> (tecnología Yamamoto, excelente flotabilidad), <strong>Zone3</strong> (mejor relación calidad-precio), <strong>Huub</strong> (diseño innovador por Dan Bullock), <strong>Blueseventy</strong> (favorita de triatletas profesionales), y <strong>Sailfish</strong> (especialistas alemanes). Para principiantes: Zone3 Advance (250-350€). Para avanzados: Orca Apex o Huub Archimedes (400-600€). Evita marcas genéricas sin especificaciones de grosor variable.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Conclusión: Invierte en Ajuste, No Solo en Marca</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El mejor neopreno no es necesariamente el más caro, sino el que se ajusta perfectamente a tu cuerpo y se adapta a las condiciones de agua donde nadas habitualmente. Un neopreno de gama media (300-400€) bien ajustado superará en rendimiento a un modelo de élite (600€+) que te queda grande o pequeño.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Para nadadores en España, recomendamos un neopreno <strong>4-5mm de grosor variable</strong> (5mm torso, 2-3mm brazos) que cubre temperaturas de 14-22°C. Marcas recomendadas: <strong>Zone3 Advance</strong> (mejor relación calidad-precio para principiantes), <strong>Orca Athlex Float</strong> (flotabilidad superior para nadadores con técnica en desarrollo), y <strong>Huub Archimedes</strong> (diseño innovador para triatletas avanzados). Siempre prueba antes de comprar, y recuerda que el ajuste correcto es más importante que la marca.
            </p>

            <Card className="bg-cyan-50 border-2 border-cyan-600">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4 text-center">¿Buscas Travesías de Aguas Abiertas?</h3>
                <p className="text-center text-gray-700 mb-6">
                  Descubre travesías, triatlones y eventos de aguas abiertas en toda España. Calendario actualizado con 290+ eventos para 2026.
                </p>
                <div className="flex justify-center">
                  <Link href="/eventos">
                    <a className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                      Ver Calendario de Eventos
                    </a>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </article>
    </div>
  );
}

import { useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Calendar, Zap, RotateCcw, Target, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlogAffiliateSection, { SWIMMING_TRAINING_PRODUCTS } from "@/components/BlogAffiliateSection";
import SocialShareButtons from "@/components/SocialShareButtons";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Técnicas Avanzadas de Viraje en Natación: Guía Profesional 2026",
  "description": "Domina los virajes de natación con técnicas profesionales: viraje de volteo (crol/espalda), viraje abierto (braza/mariposa), timing perfecto y ejercicios específicos. Mejora tus tiempos en competición.",
  "image": "https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-4_1770939992000_na1fn_YmxvZy10ZWNuaWNhcy12aXJhamUtaGVyby5qcGc.jpg",
  "author": { "@type": "Organization", "name": "AquaEvents.club" },
  "publisher": { "@type": "Organization", "name": "AquaEvents.club", "logo": { "@type": "ImageObject", "url": "https://aquaevents.club/logo.png" } },
  "datePublished": "2026-01-28",
  "dateModified": "2026-01-28"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "¿Cuánto tiempo puedo ganar con un viraje perfecto?", "acceptedAnswer": { "@type": "Answer", "text": "Un viraje de volteo bien ejecutado puede ahorrar 0.3-0.5 segundos por viraje comparado con uno deficiente. En una prueba de 400m (7 virajes), esto representa 2-3.5 segundos de diferencia total. En competición de alto nivel, donde las diferencias son milésimas, dominar los virajes es crítico. Nadadores élite completan el viraje (5m antes + 5m después de la pared) en 2-2.5 segundos, mientras nadadores amateur tardan 3.5-4.5 segundos." } },
    { "@type": "Question", "name": "¿Cuál es el error más común en los virajes?", "acceptedAnswer": { "@type": "Answer", "text": "El error más frecuente es perder velocidad antes de llegar a la pared. Muchos nadadores reducen la intensidad en los últimos 2-3 metros, lo que arruina el viraje. Debes mantener la velocidad hasta el último momento y usar el impulso para ejecutar la voltereta. Otros errores: girar demasiado lejos de la pared (pierdes impulso), no exhalar durante la voltereta (marearse), y empujar con las piernas flexionadas en lugar de extendidas." } },
    { "@type": "Question", "name": "¿A qué distancia de la pared debo empezar el viraje de volteo?", "acceptedAnswer": { "@type": "Answer", "text": "La distancia óptima es 1-1.5 metros de la pared. A esta distancia, das la última brazada completa, metes la cabeza y ejecutas la voltereta de forma que tus pies contacten la pared con las rodillas flexionadas a 90-100 grados. Si empiezas demasiado lejos (2m+), llegas con las piernas muy flexionadas (impulso débil). Si empiezas muy cerca (menos de 1m), no completas la rotación y golpeas la pared con la espalda." } },
    { "@type": "Question", "name": "¿Debo respirar antes del viraje?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, toma la última respiración 2-3 brazadas antes del viraje (aproximadamente 5-7 metros de la pared). Esto te permite ejecutar el viraje sin necesidad de respirar y mantener la posición hidrodinámica durante el deslizamiento. Exhala durante la voltereta para evitar mareos. Evita respirar en la última brazada antes del viraje, ya que levantas la cabeza y pierdes velocidad." } },
    { "@type": "Question", "name": "¿Cuántas patadas de delfín puedo dar bajo el agua tras el viraje?", "acceptedAnswer": { "@type": "Answer", "text": "Según las reglas FINA, puedes permanecer bajo el agua hasta 15 metros tras el viraje en crol, espalda y mariposa. La mayoría de nadadores de élite dan 3-5 patadas de delfín potentes en crol/espalda, y hasta 8-10 en mariposa. En braza, solo puedes dar 1 patada de delfín tras el viraje antes de iniciar el primer ciclo de brazada. Practica contar las patadas para no sobrepasar los 15m (descalificación)." } },
    { "@type": "Question", "name": "¿Cómo practicar virajes sin piscina de 25m?", "acceptedAnswer": { "@type": "Answer", "text": "Ejercicios en seco: practica volteretas en colchoneta para automatizar el movimiento. En piscina: haz series de virajes continuos (10-15 virajes seguidos sin nadar entre ellos) para perfeccionar técnica y timing. Ejercicio efectivo: nada 25m sprint, viraje perfecto, 15m bajo el agua con patadas de delfín, repite 8-10 veces. Grábate en vídeo para analizar errores de posición." } }
  ]
};

export default function BlogTecnicasViraje() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Técnicas Avanzadas de Viraje en Natación: Guía Profesional 2026 | AquaEvents.club</title>
        <meta name="description" content="Domina los virajes de natación con técnicas profesionales: viraje de volteo (crol/espalda), viraje abierto (braza/mariposa), timing perfecto y ejercicios específicos para mejorar tus tiempos en competición." />
        <meta name="keywords" content="viraje natación, flip turn, viraje volteo, técnica viraje crol, viraje espalda, viraje braza, patada delfín viraje, entrenamiento virajes" />
        <link rel="canonical" href="https://aquaevents.club/blog/tecnicas-avanzadas-viraje" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="relative h-[400px] bg-gradient-to-r from-orange-600 to-red-500 overflow-hidden">
        <img src="https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-4_1770939992000_na1fn_YmxvZy10ZWNuaWNhcy12aXJhamUtaGVyby5qcGc.jpg" alt="Técnicas avanzadas de viraje en natación" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <Badge className="w-fit mb-4 bg-white/20 text-white border-white/40"><RotateCcw className="w-4 h-4 mr-2" />Técnica Avanzada</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">Técnicas Avanzadas de Viraje en Natación</h1>
          <div className="flex items-center gap-4 text-white/90">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />28 Ene 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" />11 min lectura</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            Los virajes son uno de los aspectos más subestimados de la natación competitiva. Un viraje perfecto puede ahorrarte décimas preciosas en cada largo, mientras que un viraje deficiente puede arruinar meses de entrenamiento. Esta guía profesional te enseña las <strong>técnicas avanzadas de viraje</strong> para crol, espalda, braza y mariposa, con ejercicios específicos, análisis de timing y errores comunes que debes evitar para dominar esta habilidad crítica.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3"><Zap className="w-8 h-8 text-yellow-600" />Viraje de Volteo (Crol y Espalda)</h2>
          <p className="text-gray-700 mb-6">El viraje de volteo (flip turn) es la técnica más rápida y eficiente para crol y espalda. Dominar esta técnica requiere coordinación, timing perfecto y práctica constante.</p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Fases del Viraje de Volteo Perfecto</h3>
            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
              <li><strong>Aproximación (5m antes):</strong> Mantén velocidad máxima, toma última respiración 2-3 brazadas antes, acelera en los últimos metros.</li>
              <li><strong>Última Brazada (1-1.5m):</strong> Brazada completa y potente, cabeza abajo, prepara la voltereta sin perder velocidad.</li>
              <li><strong>Voltereta:</strong> Mete barbilla al pecho, flexiona cadera 90°, gira sobre el eje longitudinal, exhala por la nariz.</li>
              <li><strong>Contacto con Pared:</strong> Pies tocan la pared con rodillas a 90-100°, brazos extendidos en flecha sobre la cabeza.</li>
              <li><strong>Impulso:</strong> Empuje explosivo con piernas, giro final para quedar boca abajo (crol) o boca arriba (espalda).</li>
              <li><strong>Deslizamiento (5-7m):</strong> Posición hidrodinámica perfecta, 3-5 patadas de delfín potentes bajo el agua.</li>
              <li><strong>Salida a Superficie:</strong> Rompe la superficie antes de los 15m, primera brazada potente para mantener velocidad.</li>
            </ol>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Errores Comunes y Correcciones</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-blue-200 px-4 py-3 text-left font-semibold">Error</th>
                    <th className="border border-blue-200 px-4 py-3 text-left font-semibold">Consecuencia</th>
                    <th className="border border-blue-200 px-4 py-3 text-left font-semibold">Corrección</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-blue-200 px-4 py-3">Reducir velocidad antes de la pared</td>
                    <td className="border border-blue-200 px-4 py-3">Pierdes impulso, viraje lento</td>
                    <td className="border border-blue-200 px-4 py-3">Acelera hasta el último momento</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-blue-200 px-4 py-3">Girar demasiado lejos (2m+)</td>
                    <td className="border border-blue-200 px-4 py-3">Piernas muy flexionadas, impulso débil</td>
                    <td className="border border-blue-200 px-4 py-3">Última brazada a 1-1.5m de la pared</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-200 px-4 py-3">No exhalar durante voltereta</td>
                    <td className="border border-blue-200 px-4 py-3">Mareo, desorientación</td>
                    <td className="border border-blue-200 px-4 py-3">Exhala por la nariz al girar</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-blue-200 px-4 py-3">Empujar con piernas flexionadas</td>
                    <td className="border border-blue-200 px-4 py-3">Impulso reducido 40-50%</td>
                    <td className="border border-blue-200 px-4 py-3">Rodillas a 90° al contacto, extensión explosiva</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3"><Target className="w-8 h-8 text-green-600" />Viraje Abierto (Braza y Mariposa)</h2>
          <p className="text-gray-700 mb-6">El viraje abierto requiere tocar la pared con ambas manos simultáneamente (regla obligatoria en braza y mariposa). La clave es minimizar el tiempo de contacto con la pared y maximizar el impulso.</p>
          
          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Técnica del Viraje Abierto Profesional</h3>
            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
              <li><strong>Aproximación:</strong> Última brazada completa, estira brazos al máximo para tocar la pared lo antes posible.</li>
              <li><strong>Contacto:</strong> Ambas manos tocan simultáneamente (descalificación si no), dedos apuntan hacia arriba o hacia los lados.</li>
              <li><strong>Recogida:</strong> Flexiona codos y acerca el cuerpo a la pared, gira hombros 90° hacia el lado de respiración.</li>
              <li><strong>Giro:</strong> Lleva rodillas al pecho, gira 180° (queda mirando la dirección de salida), una mano se suelta primero.</li>
              <li><strong>Impulso:</strong> Pies en la pared, brazos en flecha, empuje explosivo en posición hidrodinámica.</li>
              <li><strong>Fase Subacuática:</strong> Braza: 1 patada de delfín + pull-out. Mariposa: 3-5 patadas de delfín potentes.</li>
            </ol>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ejercicios para Perfeccionar Virajes</h2>
          <div className="space-y-4">
            <Card><CardContent className="p-6"><h3 className="font-bold text-lg mb-2 text-blue-600">Serie de Virajes Continuos</h3><p className="text-gray-700 mb-2"><strong>Objetivo:</strong> Automatizar el movimiento y mejorar timing.</p><p className="text-gray-700"><strong>Ejecución:</strong> 10-15 virajes seguidos sin nadar entre ellos. Empuja de la pared, deslízate 5m, frena, gira y repite. Enfócate en posición perfecta y timing.</p></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="font-bold text-lg mb-2 text-green-600">25m Sprint + Viraje + 15m Subacuático</h3><p className="text-gray-700 mb-2"><strong>Objetivo:</strong> Integrar viraje en contexto de velocidad.</p><p className="text-gray-700"><strong>Ejecución:</strong> 8x(25m sprint máximo + viraje perfecto + 15m bajo el agua con patadas de delfín). Descanso 30-45 segundos. Cronometra cada repetición.</p></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="font-bold text-lg mb-2 text-purple-600">Virajes con Ojos Cerrados</h3><p className="text-gray-700 mb-2"><strong>Objetivo:</strong> Desarrollar sensación de distancia y timing sin referencias visuales.</p><p className="text-gray-700"><strong>Ejecución:</strong> Nada 25m, cierra los ojos los últimos 5m, ejecuta el viraje guiándote por la línea de fondo. Mejora la propiocepción.</p></CardContent></Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Equipo para Entrenar Virajes</h2>
          <p className="text-gray-700 mb-6">El equipamiento adecuado te ayuda a perfeccionar técnica y potencia en los virajes. Desde <Link href="/gorros-natacion" className="text-blue-600 hover:underline">gorros hidrodinámicos</Link> hasta accesorios de entrenamiento específicos.</p>
          <BlogAffiliateSection products={SWIMMING_TRAINING_PRODUCTS} />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq, index) => (
              <Card key={index}><CardContent className="p-6"><h3 className="text-xl font-bold text-gray-900 mb-3">{faq.name}</h3><p className="text-gray-700 leading-relaxed">{faq.acceptedAnswer.text}</p></CardContent></Card>
            ))}
          </div>
        </section>

        <div className="bg-gradient-to-r from-orange-600 to-red-500 rounded-xl p-8 text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para Mejorar tus Tiempos?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">Encuentra competiciones donde poner en práctica tus nuevas habilidades de viraje y mejorar tus marcas personales.</p>
          <Link href="/eventos"><Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-orange-50"><Zap className="w-5 h-5 mr-2" />Ver Calendario de Competiciones</Button></Link>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparte este artículo</h3>
          <SocialShareButtons url="https://aquaevents.club/blog/tecnicas-avanzadas-viraje" title="Técnicas Avanzadas de Viraje en Natación: Guía Profesional 2026" />
        </div>
      </div>
    </div>
  );
}

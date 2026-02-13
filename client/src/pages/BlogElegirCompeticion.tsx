import { useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Calendar, Trophy, Target, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlogAffiliateSection, { SWIMMING_TRAINING_PRODUCTS } from "@/components/BlogAffiliateSection";
import SocialShareButtons from "@/components/SocialShareButtons";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Cómo Elegir la Competición de Natación Adecuada según tu Nivel",
  "description": "Guía completa para elegir la competición de natación perfecta: criterios por nivel (principiante, intermedio, avanzado), tipos de competiciones, cómo prepararte y qué esperar en tu primera carrera.",
  "image": "https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-5_1770939992000_na1fn_YmxvZy1lbGVnaXItY29tcGV0aWNpb24taGVyby5qcGc.jpg",
  "author": { "@type": "Organization", "name": "AquaEvents.club" },
  "publisher": { "@type": "Organization", "name": "AquaEvents.club", "logo": { "@type": "ImageObject", "url": "https://aquaevents.club/logo.png" } },
  "datePublished": "2026-02-01",
  "dateModified": "2026-02-01"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "¿Cuándo estoy listo para mi primera competición de natación?", "acceptedAnswer": { "@type": "Answer", "text": "Estás listo cuando puedas nadar la distancia de tu prueba objetivo de forma continua y con técnica aceptable. Para principiantes, las pruebas de 50m son ideales (requieren 1-2 meses de entrenamiento regular). No necesitas ser rápido para competir; las competiciones locales y de club aceptan todos los niveles. Señales de que estás listo: nadas 200m sin parar, dominas virajes básicos, y te sientes cómodo nadando con otros en el carril." } },
    { "@type": "Question", "name": "¿Qué distancia debo elegir para mi primera competición?", "acceptedAnswer": { "@type": "Answer", "text": "Para principiantes absolutos: 50m (1 largo en piscina de 50m, 2 largos en piscina de 25m). Para nadadores con 3-6 meses de experiencia: 100m. Evita distancias superiores a 200m en tu primera competición. La clave es terminar con sensación de éxito, no de agotamiento extremo. Puedes inscribirte en varias pruebas el mismo día si hay descanso suficiente (mínimo 30-45 minutos entre pruebas)." } },
    { "@type": "Question", "name": "¿Qué diferencia hay entre competiciones federadas y no federadas?", "acceptedAnswer": { "@type": "Answer", "text": "Competiciones federadas requieren licencia federativa, cronometraje electrónico oficial, y los tiempos cuentan para rankings nacionales. Son más serias y competitivas. Competiciones no federadas (locales, de club, populares) son más relajadas, permiten participación sin licencia, y son ideales para principiantes. Muchas competiciones populares ofrecen categorías por edad y nivel, garantizando competencia justa." } },
    { "@type": "Question", "name": "¿Cuánto cuesta participar en una competición de natación?", "acceptedAnswer": { "@type": "Answer", "text": "Competiciones locales/populares: 5-15€ por prueba. Competiciones federadas autonómicas: 10-25€ por prueba. Campeonatos nacionales: 15-40€ por prueba. Además, necesitas licencia federativa (40-80€/año) para competiciones oficiales. Travesías de aguas abiertas: 20-50€ dependiendo de distancia. Muchos clubes organizan competiciones internas gratuitas para sus socios, ideales para debutar." } },
    { "@type": "Question", "name": "¿Qué llevar el día de la competición?", "acceptedAnswer": { "@type": "Answer", "text": "Imprescindible: bañador/bañador de competición, gorro (a veces lo proporciona la organización), gafas (lleva unas de repuesto), toalla, chanclas, ropa de abrigo para después. Recomendado: bebida isotónica, snack ligero (plátano, barrita), cronómetro, bolsa impermeable para ropa mojada. Para competiciones federadas: licencia federativa impresa o en móvil. Llega con 60-90 minutos de antelación para inscripción, calentamiento y familiarizarte con la instalación." } },
    { "@type": "Question", "name": "¿Cómo superar los nervios de la primera competición?", "acceptedAnswer": { "@type": "Answer", "text": "Estrategias efectivas: llega temprano para familiarizarte con el entorno, haz un calentamiento completo (20-30 min) para canalizar la energía nerviosa, visualiza tu carrera perfecta, recuerda que todos los nadadores están nerviosos (incluso los experimentados), y enfócate en tu propio rendimiento (no en ganar). Los nervios son normales y disminuyen drásticamente tras las primeras brazadas. Muchos nadadores reportan que la segunda competición es 80% menos estresante que la primera." } }
  ]
};

export default function BlogElegirCompeticion() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Cómo Elegir la Competición de Natación Adecuada según tu Nivel | AquaEvents.club</title>
        <meta name="description" content="Guía completa para elegir la competición de natación perfecta según tu nivel: criterios por nivel (principiante, intermedio, avanzado), tipos de competiciones, preparación y qué esperar en tu primera carrera." />
        <meta name="keywords" content="primera competición natación, elegir competición natación, competiciones principiantes, natación nivel intermedio, calendario competiciones, inscripción competición natación" />
        <link rel="canonical" href="https://aquaevents.club/blog/elegir-competicion-segun-nivel" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="relative h-[400px] bg-gradient-to-r from-purple-600 to-pink-500 overflow-hidden">
        <img src="https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-5_1770939992000_na1fn_YmxvZy1lbGVnaXItY29tcGV0aWNpb24taGVyby5qcGc.jpg" alt="Cómo elegir la competición de natación adecuada" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <Badge className="w-fit mb-4 bg-white/20 text-white border-white/40"><Trophy className="w-4 h-4 mr-2" />Guía de Competición</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">Cómo Elegir la Competición de Natación Adecuada</h1>
          <div className="flex items-center gap-4 text-white/90">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />01 Feb 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" />9 min lectura</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            Elegir tu primera competición de natación puede ser intimidante. ¿Estás preparado? ¿Qué distancia elegir? ¿Competición federada o popular? Esta guía te ayuda a tomar la decisión correcta según tu <strong>nivel de experiencia</strong>, <strong>objetivos deportivos</strong> y <strong>estado de forma</strong>, para que tu debut en competición sea una experiencia positiva que te motive a seguir mejorando.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3"><Target className="w-8 h-8 text-blue-600" />Criterios de Selección por Nivel</h2>
          
          <div className="space-y-6">
            <Card className="border-2 border-green-200">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Nivel Principiante (0-6 meses de experiencia)</h3>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold mb-2">Perfil:</h4>
                  <p className="text-gray-700">Nadas 200-400m sin parar, técnica básica correcta, virajes simples, entrenas 2-3 veces/semana.</p>
                </div>
                <h4 className="font-bold mb-3">Competiciones Recomendadas:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Competiciones de club internas:</strong> Ambiente familiar, sin presión, ideal para debutar</li>
                  <li>• <strong>Jornadas populares locales:</strong> Categorías por edad, no requieren licencia federativa</li>
                  <li>• <strong>Distancias:</strong> 50m (1-2 largos), máximo 100m</li>
                  <li>• <strong>Estilos:</strong> Crol (el más dominado), evita estilos técnicos (braza/mariposa) al principio</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                  <p className="text-gray-700"><strong>Consejo:</strong> Tu objetivo es terminar y disfrutar, no ganar. El 90% de principiantes que completan su primera competición repiten en menos de 3 meses.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Nivel Intermedio (6-24 meses de experiencia)</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold mb-2">Perfil:</h4>
                  <p className="text-gray-700">Nadas 800-1500m sin parar, virajes de volteo correctos, dominas 2-3 estilos, entrenas 3-4 veces/semana.</p>
                </div>
                <h4 className="font-bold mb-3">Competiciones Recomendadas:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Competiciones federadas autonómicas:</strong> Cronometraje oficial, ambiente competitivo pero accesible</li>
                  <li>• <strong>Ligas locales/provinciales:</strong> Varias jornadas, permite medir progreso</li>
                  <li>• <strong>Distancias:</strong> 100-400m (zona de confort), prueba 50m para trabajar velocidad</li>
                  <li>• <strong>Estilos:</strong> Crol + tu segundo mejor estilo (espalda/braza), considera estilos en 100m</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                  <p className="text-gray-700"><strong>Consejo:</strong> Establece objetivos de tiempo realistas (mejora 2-5% respecto a entrenamientos). Inscríbete en 2-3 pruebas por jornada para maximizar experiencia.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">Nivel Avanzado (2+ años de experiencia)</h3>
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold mb-2">Perfil:</h4>
                  <p className="text-gray-700">Nadas 2000m+ sin parar, dominas los 4 estilos, virajes profesionales, entrenas 4-6 veces/semana con plan estructurado.</p>
                </div>
                <h4 className="font-bold mb-3">Competiciones Recomendadas:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Campeonatos autonómicos/nacionales:</strong> Alto nivel competitivo, mínimas de clasificación</li>
                  <li>• <strong>Circuitos nacionales (Copa España, etc.):</strong> Múltiples jornadas, ranking nacional</li>
                  <li>• <strong>Distancias:</strong> Especialización (velocista 50-100m, medio-fondista 200-400m, fondista 800-1500m)</li>
                  <li>• <strong>Estilos:</strong> Especialización en 1-2 estilos + estilos para sumar puntos por equipo</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                  <p className="text-gray-700"><strong>Consejo:</strong> Planifica temporada con picos de forma (tapering) para 2-3 competiciones objetivo. Usa competiciones menores como preparación.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3"><Users className="w-8 h-8 text-orange-600" />Tipos de Competiciones</h2>
          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="border border-orange-200 px-4 py-3 text-left font-semibold">Tipo</th>
                    <th className="border border-orange-200 px-4 py-3 text-left font-semibold">Características</th>
                    <th className="border border-orange-200 px-4 py-3 text-left font-semibold">Ideal Para</th>
                    <th className="border border-orange-200 px-4 py-3 text-left font-semibold">Coste</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-orange-200 px-4 py-3"><strong>Jornadas de Club</strong></td>
                    <td className="border border-orange-200 px-4 py-3">Internas, ambiente familiar, cronometraje manual</td>
                    <td className="border border-orange-200 px-4 py-3">Principiantes absolutos</td>
                    <td className="border border-orange-200 px-4 py-3">Gratis-5€</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border border-orange-200 px-4 py-3"><strong>Populares Locales</strong></td>
                    <td className="border border-orange-200 px-4 py-3">Abiertas a todos, categorías por edad, sin licencia</td>
                    <td className="border border-orange-200 px-4 py-3">Principiantes e intermedios</td>
                    <td className="border border-orange-200 px-4 py-3">5-15€</td>
                  </tr>
                  <tr>
                    <td className="border border-orange-200 px-4 py-3"><strong>Federadas Autonómicas</strong></td>
                    <td className="border border-orange-200 px-4 py-3">Licencia obligatoria, cronometraje electrónico, rankings</td>
                    <td className="border border-orange-200 px-4 py-3">Intermedios y avanzados</td>
                    <td className="border border-orange-200 px-4 py-3">10-25€</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border border-orange-200 px-4 py-3"><strong>Campeonatos Nacionales</strong></td>
                    <td className="border border-orange-200 px-4 py-3">Mínimas de clasificación, alto nivel, transmisión online</td>
                    <td className="border border-orange-200 px-4 py-3">Avanzados/élite</td>
                    <td className="border border-orange-200 px-4 py-3">15-40€</td>
                  </tr>
                  <tr>
                    <td className="border border-orange-200 px-4 py-3"><strong>Aguas Abiertas</strong></td>
                    <td className="border border-orange-200 px-4 py-3">Mar/lago/río, distancias variables (1-10km), neopreno permitido</td>
                    <td className="border border-orange-200 px-4 py-3">Todos los niveles (según distancia)</td>
                    <td className="border border-orange-200 px-4 py-3">20-50€</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Equipo para tu Primera Competición</h2>
          <p className="text-gray-700 mb-6">Prepárate con el equipamiento adecuado para rendir al máximo. Desde <Link href="/gorros-natacion" className="text-blue-600 hover:underline">gorros de competición profesionales</Link> hasta accesorios esenciales.</p>
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

        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-8 text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para tu Primera Competición?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">Explora nuestro calendario actualizado de competiciones en toda España y encuentra la perfecta para tu nivel.</p>
          <Link href="/eventos"><Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-purple-50"><Trophy className="w-5 h-5 mr-2" />Ver Calendario de Competiciones</Button></Link>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparte este artículo</h3>
          <SocialShareButtons url="https://aquaevents.club/blog/elegir-competicion-segun-nivel" title="Cómo Elegir la Competición de Natación Adecuada según tu Nivel" />
        </div>
      </div>
    </div>
  );
}

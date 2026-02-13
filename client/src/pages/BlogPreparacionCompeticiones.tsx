import { useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Calendar, Trophy, Brain, Utensils, Dumbbell, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlogAffiliateSection, { SWIMMING_TRAINING_PRODUCTS } from "@/components/BlogAffiliateSection";
import SocialShareButtons from "@/components/SocialShareButtons";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Preparación Profesional para Competiciones de Natación: Guía Completa 2026",
  "description": "Guía completa de preparación para competiciones de natación: ciclos de entrenamiento, preparación mental, nutrición pre-competición y estrategias de calentamiento. Plan profesional paso a paso.",
  "image": "https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-1_1770939992000_na1fn_YmxvZy1wcmVwYXJhY2lvbi1jb21wZXRpY2lvbi1oZXJv.jpg",
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
  "datePublished": "2026-01-15",
  "dateModified": "2026-01-15"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo antes debo empezar a prepararme para una competición?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Para competiciones importantes, inicia la preparación específica 8-12 semanas antes. Este periodo incluye: fase de acumulación (4-6 semanas de volumen alto), fase de intensificación (2-3 semanas de trabajo específico) y tapering (1-2 semanas de reducción progresiva). Para competiciones menores o de entrenamiento, 4-6 semanas son suficientes."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué debo comer la noche antes de una competición?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La cena pre-competición debe ser rica en carbohidratos complejos (pasta, arroz, patata), moderada en proteínas magras (pollo, pescado) y baja en grasas y fibra para facilitar la digestión. Evita alimentos nuevos, picantes o que causen gases. Hidrátate bien pero sin exceso. Ejemplo: pasta con salsa de tomate y pechuga de pollo a la plancha, acompañado de pan blanco."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo controlar los nervios antes de competir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Técnicas efectivas: respiración diafragmática (4-7-8), visualización positiva de tu carrera, rutinas pre-competición consistentes, música motivacional, y reencuadre cognitivo (convertir nervios en excitación). Practica estas técnicas en entrenamientos. Los nervios son normales y pueden mejorar el rendimiento si se canalizan correctamente."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto debo reducir el entrenamiento en el tapering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reduce el volumen de entrenamiento un 40-60% durante el tapering (1-2 semanas antes de la competición), pero mantén la intensidad alta en series cortas. Ejemplo: si nadas 40km/semana, reduce a 16-24km manteniendo series de velocidad. Aumenta las horas de sueño y reduce actividades extenuantes fuera del agua."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué incluir en el calentamiento pre-competición?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Calentamiento estándar (20-30 minutos): 400-800m nado suave, 4x50m técnica (drill), 4x25m progresivos, 2-4x50m al ritmo de carrera con descanso completo, 100-200m nado suave. Ajusta según la distancia de tu prueba: carreras cortas (50-100m) requieren más activación; distancias largas (800-1500m) necesitan calentamiento más conservador."
      }
    },
    {
      "@type": "Question",
      "name": "¿Debo entrenar el día antes de la competición?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, pero con sesión muy ligera: 1000-1500m de nado suave con algunas series cortas de técnica (4x50m) para mantener la sensación del agua. Evita esfuerzos intensos. El objetivo es activación neuromuscular, no entrenamiento. Muchos nadadores prefieren nadar por la mañana si compiten por la tarde del día siguiente."
      }
    }
  ]
};

export default function BlogPreparacionCompeticiones() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Preparación Profesional para Competiciones de Natación: Guía Completa 2026 | AquaEvents.club</title>
        <meta 
          name="description" 
          content="Guía completa de preparación para competiciones de natación: ciclos de entrenamiento, preparación mental, nutrición pre-competición y estrategias de calentamiento profesional. Plan paso a paso para nadadores de todos los niveles." 
        />
        <meta name="keywords" content="preparación competición natación, tapering natación, nutrición pre-competición, preparación mental nadadores, calentamiento competición, ciclos entrenamiento natación" />
        <link rel="canonical" href="https://aquaevents.club/blog/preparacion-profesional-competiciones" />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-blue-600 to-cyan-500 overflow-hidden">
        <img 
          src="https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-1_1770939992000_na1fn_YmxvZy1wcmVwYXJhY2lvbi1jb21wZXRpY2lvbi1oZXJv.jpg"
          alt="Preparación profesional para competiciones de natación"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <Badge className="w-fit mb-4 bg-white/20 text-white border-white/40">
            <Trophy className="w-4 h-4 mr-2" />
            Guía de Competición
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
            Preparación Profesional para Competiciones de Natación
          </h1>
          <div className="flex items-center gap-4 text-white/90">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              15 Ene 2026
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              12 min lectura
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            La diferencia entre un buen rendimiento y una marca personal en competición no solo depende del entrenamiento físico. La preparación profesional para competiciones de natación es un proceso integral que combina <strong>periodización del entrenamiento</strong>, <strong>preparación mental</strong>, <strong>estrategia nutricional</strong> y <strong>gestión del tapering</strong>. Esta guía te proporciona un plan completo basado en metodologías utilizadas por nadadores de élite y avaladas por entrenadores profesionales.
          </p>
        </div>

        {/* Ciclos de Entrenamiento */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Dumbbell className="w-8 h-8 text-blue-600" />
            Ciclos de Entrenamiento: Periodización para Competición
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            La periodización del entrenamiento divide la preparación en fases específicas, cada una con objetivos claros. Para una competición importante, el ciclo completo dura entre 8-12 semanas.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Fases del Ciclo de Preparación</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-blue-200 px-4 py-3 text-left font-semibold">Fase</th>
                    <th className="border border-blue-200 px-4 py-3 text-left font-semibold">Duración</th>
                    <th className="border border-blue-200 px-4 py-3 text-left font-semibold">Objetivo</th>
                    <th className="border border-blue-200 px-4 py-3 text-left font-semibold">Volumen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-blue-200 px-4 py-3"><strong>Acumulación</strong></td>
                    <td className="border border-blue-200 px-4 py-3">4-6 semanas</td>
                    <td className="border border-blue-200 px-4 py-3">Construir base aeróbica y resistencia</td>
                    <td className="border border-blue-200 px-4 py-3">Alto (100%)</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-blue-200 px-4 py-3"><strong>Intensificación</strong></td>
                    <td className="border border-blue-200 px-4 py-3">2-3 semanas</td>
                    <td className="border border-blue-200 px-4 py-3">Trabajo específico al ritmo de carrera</td>
                    <td className="border border-blue-200 px-4 py-3">Medio-Alto (80-90%)</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-200 px-4 py-3"><strong>Tapering</strong></td>
                    <td className="border border-blue-200 px-4 py-3">1-2 semanas</td>
                    <td className="border border-blue-200 px-4 py-3">Recuperación y pico de forma</td>
                    <td className="border border-blue-200 px-4 py-3">Bajo (40-60%)</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-blue-200 px-4 py-3"><strong>Competición</strong></td>
                    <td className="border border-blue-200 px-4 py-3">1-3 días</td>
                    <td className="border border-blue-200 px-4 py-3">Rendimiento máximo</td>
                    <td className="border border-blue-200 px-4 py-3">Mínimo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Ejemplo de Semana en Fase de Intensificación</h3>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <ul className="space-y-3 text-gray-700">
              <li><strong>Lunes:</strong> 3000m - Series de velocidad (8x100m al 85% con 1:30 descanso)</li>
              <li><strong>Martes:</strong> 4000m - Resistencia aeróbica (nado continuo con cambios de ritmo)</li>
              <li><strong>Miércoles:</strong> 2500m - Técnica y drills + 6x50m sprint</li>
              <li><strong>Jueves:</strong> 3500m - Series al ritmo de carrera (4x200m al 90% con 2:00 descanso)</li>
              <li><strong>Viernes:</strong> 2000m - Recuperación activa (nado suave, estiramientos)</li>
              <li><strong>Sábado:</strong> 4000m - Test de velocidad (simulación de carrera)</li>
              <li><strong>Domingo:</strong> Descanso o nado muy suave (1000m)</li>
            </ul>
          </div>
        </section>

        {/* Preparación Mental */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            Preparación Mental: El Factor Psicológico
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Hasta el 40% del rendimiento en competición depende del estado mental del nadador. Los nervios, la presión y la falta de confianza pueden arruinar meses de entrenamiento físico. La preparación mental debe entrenarse con la misma disciplina que la técnica de nado.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Técnicas de Preparación Mental Profesional</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-3 text-blue-600">Visualización Positiva</h4>
                <p className="text-gray-700">
                  Dedica 10-15 minutos diarios a visualizar tu carrera perfecta: desde el calentamiento hasta tocar la pared final. Imagina sensaciones, sonidos y emociones positivas. Practica especialmente la salida, virajes y llegada.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-3 text-purple-600">Respiración Diafragmática</h4>
                <p className="text-gray-700">
                  Técnica 4-7-8: inhala 4 segundos, retén 7 segundos, exhala 8 segundos. Repite 4-5 ciclos antes de competir para reducir frecuencia cardíaca y activar el sistema nervioso parasimpático (calma).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-3 text-green-600">Rutinas Pre-Competición</h4>
                <p className="text-gray-700">
                  Crea una rutina consistente: misma música, mismo orden de calentamiento, mismos estiramientos. La familiaridad reduce ansiedad y crea automatismos que liberan recursos mentales para la carrera.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-3 text-orange-600">Reencuadre Cognitivo</h4>
                <p className="text-gray-700">
                  Convierte "estoy nervioso" en "estoy emocionado y listo". Los nervios son energía que puede potenciar tu rendimiento si los interpretas como señal de preparación, no de amenaza.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Nutrición Pre-Competición */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Utensils className="w-8 h-8 text-green-600" />
            Nutrición Pre-Competición: Estrategia de Carga
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            La nutrición en los 3 días previos a la competición determina tus reservas de glucógeno muscular, tu nivel de hidratación y tu estado digestivo. Una estrategia nutricional incorrecta puede reducir tu rendimiento hasta un 15-20%.
          </p>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Plan Nutricional 72 Horas Antes</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-green-200 px-4 py-3 text-left font-semibold">Momento</th>
                    <th className="border border-green-200 px-4 py-3 text-left font-semibold">Qué Comer</th>
                    <th className="border border-green-200 px-4 py-3 text-left font-semibold">Qué Evitar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-green-200 px-4 py-3"><strong>3 días antes</strong></td>
                    <td className="border border-green-200 px-4 py-3">Aumentar carbohidratos al 60-70% de calorías (pasta, arroz, pan)</td>
                    <td className="border border-green-200 px-4 py-3">Alimentos nuevos, grasas excesivas</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-green-200 px-4 py-3"><strong>Noche antes</strong></td>
                    <td className="border border-green-200 px-4 py-3">Cena ligera: pasta con salsa tomate, pollo, pan blanco</td>
                    <td className="border border-green-200 px-4 py-3">Fibra alta, picantes, lácteos pesados</td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 px-4 py-3"><strong>Desayuno (3h antes)</strong></td>
                    <td className="border border-green-200 px-4 py-3">Tostadas con miel, plátano, zumo, café ligero</td>
                    <td className="border border-green-200 px-4 py-3">Grasas, proteínas pesadas, exceso de fibra</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-green-200 px-4 py-3"><strong>1h antes</strong></td>
                    <td className="border border-green-200 px-4 py-3">Gel energético o barrita + 200ml agua</td>
                    <td className="border border-green-200 px-4 py-3">Comidas sólidas, exceso de líquidos</td>
                  </tr>
                  <tr>
                    <td className="border border-green-200 px-4 py-3"><strong>30 min antes</strong></td>
                    <td className="border border-green-200 px-4 py-3">Sorbos de bebida isotónica</td>
                    <td className="border border-green-200 px-4 py-3">Cualquier alimento sólido</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              Hidratación: Clave Olvidada
            </h4>
            <p className="text-gray-700">
              Bebe 2-3 litros de agua diarios en los 3 días previos. El día de la competición, 400-600ml 2 horas antes, y 150-200ml 15 minutos antes. Orina de color amarillo claro indica hidratación óptima. La deshidratación del 2% reduce el rendimiento hasta un 10%.
            </p>
          </div>
        </section>

        {/* Calentamiento */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-orange-600" />
            Calentamiento Pre-Competición: Protocolo Profesional
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            El calentamiento prepara el sistema cardiovascular, activa las fibras musculares rápidas y mejora la coordinación neuromuscular. Un calentamiento inadecuado puede costar décimas preciosas en carreras cortas.
          </p>

          <div className="bg-orange-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Protocolo de Calentamiento Estándar (20-30 min)</h3>
            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
              <li><strong>Nado Suave (400-800m):</strong> Estilo libre a ritmo cómodo para elevar temperatura corporal y frecuencia cardíaca gradualmente.</li>
              <li><strong>Drills de Técnica (4x50m):</strong> Ejercicios específicos del estilo de tu carrera (catch-up, one-arm, fist drill) para activar patrones motores.</li>
              <li><strong>Progresivos (4x25m):</strong> Aumenta velocidad gradualmente de 60% a 90% para preparar el sistema anaeróbico.</li>
              <li><strong>Series al Ritmo de Carrera (2-4x50m):</strong> Nada al ritmo exacto de tu objetivo con descanso completo (2-3 min) para calibrar sensaciones.</li>
              <li><strong>Nado de Recuperación (100-200m):</strong> Vuelta a la calma antes de la carrera para evitar fatiga prematura.</li>
            </ol>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h4 className="font-bold text-lg mb-3">Ajustes Según Distancia de Carrera</h4>
            <ul className="space-y-2 text-gray-700">
              <li><strong>50-100m (Sprint):</strong> Calentamiento más largo (30-40 min) con más series de activación (6x50m progresivos).</li>
              <li><strong>200-400m (Media distancia):</strong> Calentamiento estándar (20-30 min) equilibrando activación y conservación de energía.</li>
              <li><strong>800-1500m (Fondo):</strong> Calentamiento más corto (15-20 min) enfocado en técnica, evitando fatiga.</li>
            </ul>
          </div>
        </section>

        {/* Equipo Recomendado */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Equipo Esencial para Competición</h2>
          <p className="text-gray-700 mb-6">
            El equipo adecuado marca la diferencia en competición. Desde <Link href="/gorros-natacion" className="text-blue-600 hover:underline">gorros de competición profesionales</Link> hasta accesorios de entrenamiento que perfeccionan tu técnica antes del día D.
          </p>
          <BlogAffiliateSection products={SWIMMING_TRAINING_PRODUCTS} />
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.name}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-8 text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para tu Próxima Competición?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Encuentra competiciones de natación cerca de ti en nuestro calendario actualizado de eventos acuáticos en toda España.
          </p>
          <Link href="/eventos">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              <Trophy className="w-5 h-5 mr-2" />
              Ver Calendario de Competiciones
            </Button>
          </Link>
        </div>

        {/* Social Sharing */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparte este artículo</h3>
          <SocialShareButtons 
            url="https://aquaevents.club/blog/preparacion-profesional-competiciones"
            title="Preparación Profesional para Competiciones de Natación: Guía Completa 2026"
          />
        </div>
      </div>
    </div>
  );
}

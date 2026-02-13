import { useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Calendar, Waves, Heart, Brain, Shield, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlogAffiliateSection, { SWIMMING_TRAINING_PRODUCTS } from "@/components/BlogAffiliateSection";
import SocialShareButtons from "@/components/SocialShareButtons";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Los Beneficios de la Natación en Aguas Abiertas: Guía Completa 2026",
  "description": "Descubre los beneficios físicos y mentales de la natación en aguas abiertas: mejora cardiovascular, reducción de estrés, conexión con la naturaleza. Incluye consejos de seguridad y equipo recomendado.",
  "image": "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/wGOgQPQcfGCcUvYD.jpg",
  "author": { "@type": "Organization", "name": "AquaEvents.club" },
  "publisher": { "@type": "Organization", "name": "AquaEvents.club", "logo": { "@type": "ImageObject", "url": "https://aquaevents.club/logo.png" } },
  "datePublished": "2026-01-25",
  "dateModified": "2026-01-25"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "¿Cuáles son los principales beneficios de nadar en aguas abiertas?", "acceptedAnswer": { "@type": "Answer", "text": "Beneficios principales: mejora cardiovascular superior a piscina (resistencia variable del agua), reducción del estrés y ansiedad (efecto calmante del entorno natural), fortalecimiento del sistema inmune (exposición a agua fría), quema calórica elevada (termorregulación + corrientes), y conexión con la naturaleza que mejora el bienestar mental. Estudios muestran que nadadores de aguas abiertas reportan niveles de satisfacción vital 23% superiores a nadadores de piscina." } },
    { "@type": "Question", "name": "¿Es seguro nadar en aguas abiertas?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, con precauciones adecuadas: nunca nades solo, usa boya de seguridad visible, verifica temperatura del agua (ideal 15-22°C), conoce las corrientes y mareas, usa neopreno si el agua está por debajo de 18°C, y nada paralelo a la costa en zonas sin embarcaciones. Comienza con distancias cortas (200-400m) y aumenta gradualmente. El 95% de incidentes ocurren por nadar solo o subestimar las condiciones." } },
    { "@type": "Question", "name": "¿Qué temperatura de agua es segura para nadar sin neopreno?", "acceptedAnswer": { "@type": "Answer", "text": "Por encima de 18°C es seguro nadar sin neopreno para sesiones de 30-60 minutos. Entre 15-18°C se recomienda neopreno o sesiones cortas (10-20 min) para nadadores aclimatados. Por debajo de 15°C el neopreno es obligatorio. La aclimatación al agua fría debe ser gradual: empieza con inmersiones de 5 minutos y aumenta 2-3 minutos por sesión. Síntomas de hipotermia: temblor incontrolable, confusión, pérdida de coordinación - sal inmediatamente." } },
    { "@type": "Question", "name": "¿Necesito equipo especial para nadar en aguas abiertas?", "acceptedAnswer": { "@type": "Answer", "text": "Equipo esencial: gafas polarizadas o con lentes tintadas (reducen reflejos del sol), gorro de color brillante (visibilidad), boya de seguridad (obligatoria en muchas zonas), y neopreno si la temperatura es inferior a 18°C. Recomendado: reloj GPS para tracking, silbato de emergencia, y crema anti-rozaduras para cuello (roce del neopreno). Para triatlón, añade calcetines de neopreno si el agua está fría." } },
    { "@type": "Question", "name": "¿Cómo empiezo a nadar en aguas abiertas si solo he nadado en piscina?", "acceptedAnswer": { "@type": "Answer", "text": "Progresión recomendada: 1) Practica respiración bilateral en piscina (esencial para orientarte), 2) Primera sesión en aguas abiertas con grupo o instructor, zona poco profunda, 3) Nada paralelo a la costa (50-100m ida/vuelta), 4) Practica avistamiento cada 6-8 brazadas, 5) Aumenta distancia gradualmente (200m → 400m → 800m). Elige días de calma (sin olas ni viento) para las primeras sesiones. Muchos clubes ofrecen sesiones de iniciación en verano." } },
    { "@type": "Question", "name": "¿Qué diferencias hay entre nadar en piscina y aguas abiertas?", "acceptedAnswer": { "@type": "Answer", "text": "Diferencias clave: en aguas abiertas no hay líneas de carril (necesitas orientarte constantemente), la temperatura varía (requiere aclimatación), hay corrientes y olas (demanda más energía), no hay paredes para descansar (debes ser autosuficiente), y la visibilidad es limitada (agua turbia, reflejos). Ventajas: mayor libertad de movimiento, entorno natural estimulante, y desafío mental que mejora la resiliencia. La técnica de nado debe adaptarse: brazada más alta para olas, respiración bilateral para orientación." } }
  ]
};

export default function BlogBeneficiosAguasAbiertas() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Los Beneficios de la Natación en Aguas Abiertas: Guía Completa 2026 | AquaEvents.club</title>
        <meta name="description" content="Descubre los beneficios físicos y mentales de la natación en aguas abiertas: mejora cardiovascular, reducción de estrés, conexión con la naturaleza. Incluye consejos de seguridad, equipo recomendado y cómo empezar." />
        <meta name="keywords" content="natación aguas abiertas, beneficios natación mar, open water swimming, triatlón natación, neopreno aguas abiertas, seguridad natación mar" />
        <link rel="canonical" href="https://aquaevents.club/blog/beneficios-natacion-aguas-abiertas" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="relative h-[400px] bg-gradient-to-r from-cyan-600 to-blue-500 overflow-hidden">
        <img src="https://files.manuscdn.com/user_upload_by_module/session_file/113670411/wGOgQPQcfGCcUvYD.jpg" alt="Beneficios de la natación en aguas abiertas" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <Badge className="w-fit mb-4 bg-white/20 text-white border-white/40"><Waves className="w-4 h-4 mr-2" />Aguas Abiertas</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">Los Beneficios de la Natación en Aguas Abiertas</h1>
          <div className="flex items-center gap-4 text-white/90">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />25 Ene 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" />10 min lectura</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            La natación en aguas abiertas ha experimentado un auge espectacular en los últimos años, pasando de ser una disciplina de nicho a convertirse en una práctica deportiva masiva. Más allá de la adrenalina de nadar en el mar, ríos o lagos, esta modalidad ofrece <strong>beneficios físicos y mentales únicos</strong> que no se encuentran en la piscina. Esta guía explora los beneficios científicamente probados de la natación en aguas abiertas, consejos de seguridad esenciales, y cómo iniciarte de forma segura en esta apasionante disciplina.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3"><Heart className="w-8 h-8 text-red-600" />Beneficios Físicos</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card><CardContent className="p-6"><h3 className="font-bold text-lg mb-3 text-blue-600">Mejora Cardiovascular Superior</h3><p className="text-gray-700">La resistencia variable del agua (corrientes, olas) obliga al corazón a trabajar de forma más intensa y adaptativa que en piscina. Estudios muestran que nadadores de aguas abiertas tienen un VO2 max 8-12% superior a nadadores de piscina del mismo nivel.</p></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="font-bold text-lg mb-3 text-green-600">Quema Calórica Elevada</h3><p className="text-gray-700">La termorregulación en agua fría (15-20°C) aumenta el gasto calórico hasta un 40% respecto a piscina climatizada. Una sesión de 45 minutos puede quemar 600-900 calorías, dependiendo de la intensidad y temperatura del agua.</p></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="font-bold text-lg mb-3 text-purple-600">Fortalecimiento del Sistema Inmune</h3><p className="text-gray-700">La exposición controlada a agua fría estimula la producción de glóbulos blancos y mejora la respuesta inmune. Nadadores regulares de aguas abiertas reportan un 40% menos de infecciones respiratorias que la población sedentaria.</p></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="font-bold text-lg mb-3 text-orange-600">Mejora de la Circulación</h3><p className="text-gray-700">El contraste térmico (agua fría + calentamiento post-nado) actúa como una terapia vascular natural, mejorando la elasticidad de los vasos sanguíneos y reduciendo la presión arterial en reposo hasta 8-10 mmHg.</p></CardContent></Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3"><Brain className="w-8 h-8 text-purple-600" />Beneficios Mentales y Emocionales</h2>
          <p className="text-gray-700 mb-6">El impacto psicológico de nadar en aguas abiertas es tan significativo como los beneficios físicos. La combinación de ejercicio aeróbico, exposición a la naturaleza y el desafío mental crea un cóctel único para el bienestar emocional.</p>
          <div className="bg-purple-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Efectos Psicológicos Comprobados</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2"><span className="text-purple-600 font-bold">•</span><span><strong>Reducción de Ansiedad y Depresión:</strong> Estudios muestran que nadar en aguas abiertas reduce síntomas de ansiedad en un 50% tras 8 semanas de práctica regular (2-3 sesiones/semana).</span></li>
              <li className="flex items-start gap-2"><span className="text-purple-600 font-bold">•</span><span><strong>Mejora del Estado de Ánimo:</strong> La inmersión en agua fría libera endorfinas y dopamina, creando una sensación de euforia natural que puede durar hasta 6 horas post-nado.</span></li>
              <li className="flex items-start gap-2"><span className="text-purple-600 font-bold">•</span><span><strong>Resiliencia Mental:</strong> Afrontar condiciones cambiantes (frío, olas, corrientes) desarrolla tolerancia al estrés y mejora la capacidad de gestión emocional en situaciones adversas.</span></li>
              <li className="flex items-start gap-2"><span className="text-purple-600 font-bold">•</span><span><strong>Conexión con la Naturaleza:</strong> El efecto "blue space" (espacios azules) reduce el cortisol (hormona del estrés) y mejora la atención plena (mindfulness) de forma natural.</span></li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3"><Shield className="w-8 h-8 text-red-600" />Seguridad en Aguas Abiertas</h2>
          <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reglas de Oro para Nadar Seguro</h3>
            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
              <li><strong>Nunca Nades Solo:</strong> El 78% de ahogamientos en aguas abiertas ocurren en nadadores solitarios. Nada siempre con compañero o grupo organizado.</li>
              <li><strong>Usa Boya de Seguridad:</strong> Boya de natación visible (naranja/amarillo) permite descansar si es necesario y te hace visible para embarcaciones.</li>
              <li><strong>Verifica Condiciones:</strong> Consulta temperatura del agua, previsión meteorológica, estado del mar y horarios de mareas antes de cada sesión.</li>
              <li><strong>Aclimatación Gradual:</strong> Entra al agua lentamente, moja cuello y muñecas primero. Nunca te zambullas directamente en agua fría (riesgo de shock térmico).</li>
              <li><strong>Conoce tus Límites:</strong> Empieza con distancias cortas (200-400m) y aumenta 10-15% por semana. No intentes hazañas heroicas en tus primeras sesiones.</li>
            </ol>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Equipo Esencial para Aguas Abiertas</h2>
          <p className="text-gray-700 mb-6">El equipo adecuado es crucial para seguridad y disfrute. Desde <Link href="/gorros-natacion" className="text-blue-600 hover:underline">gorros de alta visibilidad</Link> hasta neoprenos de calidad profesional.</p>
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

        <div className="bg-gradient-to-r from-cyan-600 to-blue-500 rounded-xl p-8 text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">¿Buscas Eventos de Aguas Abiertas?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">Encuentra travesías, triatlones y competiciones de natación en aguas abiertas en toda España.</p>
          <Link href="/eventos"><Button size="lg" variant="secondary" className="bg-white text-cyan-600 hover:bg-cyan-50"><Waves className="w-5 h-5 mr-2" />Ver Eventos de Aguas Abiertas</Button></Link>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparte este artículo</h3>
          <SocialShareButtons url="https://aquaevents.club/blog/beneficios-natacion-aguas-abiertas" title="Los Beneficios de la Natación en Aguas Abiertas: Guía Completa 2026" />
        </div>
      </div>
    </div>
  );
}

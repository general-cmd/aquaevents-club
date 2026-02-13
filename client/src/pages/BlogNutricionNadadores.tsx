import { useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Calendar, Utensils, Zap, Droplets, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlogAffiliateSection, { SWIMMING_TRAINING_PRODUCTS } from "@/components/BlogAffiliateSection";
import SocialShareButtons from "@/components/SocialShareButtons";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Nutrición para Nadadores de Alto Rendimiento: Guía Completa 2026",
  "description": "Guía completa de nutrición para nadadores: macronutrientes óptimos, timing de comidas, hidratación, suplementación y planes de alimentación según fase de entrenamiento. Maximiza tu rendimiento con nutrición científica.",
  "image": "https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-6_1770939992000_na1fn_YmxvZy1udXRyaWNpb24tbmFkYWRvcmVzLWhlcm8uanBn.jpg",
  "author": { "@type": "Organization", "name": "AquaEvents.club" },
  "publisher": { "@type": "Organization", "name": "AquaEvents.club", "logo": { "@type": "ImageObject", "url": "https://aquaevents.club/logo.png" } },
  "datePublished": "2026-02-05",
  "dateModified": "2026-02-05"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "¿Cuántas calorías debe consumir un nadador de alto rendimiento?", "acceptedAnswer": { "@type": "Answer", "text": "Depende del volumen de entrenamiento. Nadadores de élite (15-20km/semana): 3500-5000 kcal/día. Nadadores intermedios (8-12km/semana): 2500-3500 kcal/día. Nadadores recreativos (4-6km/semana): 2000-2800 kcal/día. Las mujeres suelen necesitar 15-20% menos que los hombres. La clave es ajustar según peso corporal, composición y rendimiento: si pierdes peso involuntariamente o el rendimiento cae, aumenta calorías gradualmente (200-300 kcal/día)." } },
    { "@type": "Question", "name": "¿Qué comer antes de entrenar natación?", "acceptedAnswer": { "@type": "Answer", "text": "Timing y composición: 2-3 horas antes: comida completa con carbohidratos complejos + proteína magra (pasta con pollo, arroz con pescado). 1 hora antes: snack ligero rico en carbohidratos (plátano + tostada con miel, barrita energética). 30 min antes: solo líquidos o gel energético si es necesario. Evita grasas y fibra excesiva que ralentizan digestión. Entrenamientos matutinos: desayuno ligero 60-90 min antes (tostadas, cereales, fruta)." } },
    { "@type": "Question", "name": "¿Es necesario tomar suplementos para nadar mejor?", "acceptedAnswer": { "@type": "Answer", "text": "No son obligatorios pero pueden optimizar rendimiento si la dieta base es correcta. Suplementos con evidencia científica: creatina monohidrato (mejora sprints y potencia), cafeína (aumenta resistencia y concentración), beta-alanina (reduce fatiga muscular), y proteína whey (recuperación post-entrenamiento). Evita suplementos sin evidencia (BCAA si consumes proteína suficiente, quemagrasas, detox). Consulta con nutricionista deportivo antes de suplementar." } },
    { "@type": "Question", "name": "¿Cuánta agua debo beber durante el entrenamiento?", "acceptedAnswer": { "@type": "Answer", "text": "Regla general: 150-250ml cada 15-20 minutos de entrenamiento. Para sesiones de más de 60 minutos, usa bebida isotónica (6-8% carbohidratos + electrolitos). Señales de deshidratación: orina oscura, sed intensa, fatiga prematura, calambres. Pesaje pre/post-entrenamiento: cada kg perdido = 1.5L de líquido a reponer. En entrenamientos intensos o ambientes cálidos, las pérdidas pueden superar 1-2L/hora." } },
    { "@type": "Question", "name": "¿Qué comer después de entrenar para recuperar mejor?", "acceptedAnswer": { "@type": "Answer", "text": "Ventana anabólica (30-60 min post-entrenamiento): consume carbohidratos + proteína en ratio 3:1 o 4:1. Ejemplos: batido de proteína + plátano, sándwich de pavo + zumo, yogur griego + miel + fruta. Objetivo: 20-30g proteína + 60-80g carbohidratos. Comida completa 2-3 horas después: plato equilibrado con proteína, carbohidratos complejos y verduras. La recuperación nutricional es tan importante como el entrenamiento para adaptaciones musculares." } },
    { "@type": "Question", "name": "¿Los nadadores deben seguir dietas bajas en carbohidratos?", "acceptedAnswer": { "@type": "Answer", "text": "No. Los carbohidratos son el combustible principal para natación de intensidad media-alta. Nadadores de alto rendimiento necesitan 6-10g carbohidratos/kg peso corporal/día (ejemplo: nadador de 70kg = 420-700g/día). Dietas bajas en carbohidratos reducen glucógeno muscular, disminuyen rendimiento en series de alta intensidad y aumentan fatiga. Excepción: nadadores con sobrepeso pueden reducir carbohidratos temporalmente bajo supervisión profesional, pero nunca por debajo de 3-4g/kg." } }
  ]
};

export default function BlogNutricionNadadores() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Nutrición para Nadadores de Alto Rendimiento: Guía Completa 2026 | AquaEvents.club</title>
        <meta name="description" content="Guía completa de nutrición para nadadores de alto rendimiento: macronutrientes óptimos, timing de comidas, hidratación, suplementación y planes de alimentación según fase de entrenamiento. Maximiza tu rendimiento." />
        <meta name="keywords" content="nutrición nadadores, dieta nadadores alto rendimiento, alimentación deportiva natación, suplementos natación, hidratación nadadores, macronutrientes natación" />
        <link rel="canonical" href="https://aquaevents.club/blog/nutricion-nadadores-alto-rendimiento" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="relative h-[400px] bg-gradient-to-r from-green-600 to-teal-500 overflow-hidden">
        <img src="https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-6_1770939992000_na1fn_YmxvZy1udXRyaWNpb24tbmFkYWRvcmVzLWhlcm8uanBn.jpg" alt="Nutrición para nadadores de alto rendimiento" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <Badge className="w-fit mb-4 bg-white/20 text-white border-white/40"><Utensils className="w-4 h-4 mr-2" />Nutrición Deportiva</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">Nutrición para Nadadores de Alto Rendimiento</h1>
          <div className="flex items-center gap-4 text-white/90">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />05 Feb 2026</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" />13 min lectura</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            La nutrición es el tercer pilar del rendimiento en natación, junto con el entrenamiento y el descanso. Un nadador puede entrenar perfectamente, pero si su <strong>alimentación es deficiente</strong>, nunca alcanzará su máximo potencial. Esta guía basada en evidencia científica te enseña cómo optimizar tu nutrición para <strong>maximizar rendimiento</strong>, <strong>acelerar recuperación</strong> y <strong>mantener composición corporal óptima</strong> durante toda la temporada.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3"><Zap className="w-8 h-8 text-yellow-600" />Macronutrientes para Nadadores</h2>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Distribución Óptima de Macronutrientes</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="border border-yellow-200 px-4 py-3 text-left font-semibold">Macronutriente</th>
                    <th className="border border-yellow-200 px-4 py-3 text-left font-semibold">% Calorías</th>
                    <th className="border border-yellow-200 px-4 py-3 text-left font-semibold">g/kg peso/día</th>
                    <th className="border border-yellow-200 px-4 py-3 text-left font-semibold">Función Principal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-yellow-200 px-4 py-3"><strong>Carbohidratos</strong></td>
                    <td className="border border-yellow-200 px-4 py-3">55-65%</td>
                    <td className="border border-yellow-200 px-4 py-3">6-10 g/kg</td>
                    <td className="border border-yellow-200 px-4 py-3">Combustible principal, reposición glucógeno</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-yellow-200 px-4 py-3"><strong>Proteínas</strong></td>
                    <td className="border border-yellow-200 px-4 py-3">15-20%</td>
                    <td className="border border-yellow-200 px-4 py-3">1.6-2.0 g/kg</td>
                    <td className="border border-yellow-200 px-4 py-3">Reparación muscular, adaptaciones</td>
                  </tr>
                  <tr>
                    <td className="border border-yellow-200 px-4 py-3"><strong>Grasas</strong></td>
                    <td className="border border-yellow-200 px-4 py-3">20-30%</td>
                    <td className="border border-yellow-200 px-4 py-3">1.0-1.5 g/kg</td>
                    <td className="border border-yellow-200 px-4 py-3">Energía larga duración, hormonas</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mt-4 text-sm">
              <strong>Ejemplo práctico:</strong> Nadador de 70kg en fase de entrenamiento intenso necesita: 490-700g carbohidratos, 112-140g proteínas, 70-105g grasas = 3200-4200 kcal/día.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card><CardContent className="p-6"><h3 className="font-bold text-lg mb-3 text-blue-600">Carbohidratos</h3><p className="text-gray-700 mb-3">Fuentes preferidas: arroz, pasta, patata, avena, pan integral, frutas, quinoa. Timing crítico: antes y después de entrenamientos para maximizar glucógeno.</p><p className="text-sm text-gray-600"><strong>Evita:</strong> Azúcares simples fuera de ventana peri-entrenamiento.</p></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="font-bold text-lg mb-3 text-green-600">Proteínas</h3><p className="text-gray-700 mb-3">Fuentes de calidad: pollo, pavo, pescado, huevos, yogur griego, legumbres, tofu. Distribuye en 4-6 comidas (20-30g por comida) para síntesis proteica óptima.</p><p className="text-sm text-gray-600"><strong>Objetivo:</strong> 0.3-0.4g/kg por comida.</p></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="font-bold text-lg mb-3 text-orange-600">Grasas Saludables</h3><p className="text-gray-700 mb-3">Fuentes esenciales: aceite de oliva, aguacate, frutos secos, pescado azul (omega-3). Críticas para producción hormonal y absorción de vitaminas liposolubles.</p><p className="text-sm text-gray-600"><strong>Evita:</strong> Grasas trans y exceso de saturadas.</p></CardContent></Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3"><Droplets className="w-8 h-8 text-blue-600" />Hidratación: El Factor Olvidado</h2>
          <p className="text-gray-700 mb-6">La deshidratación del 2% del peso corporal reduce el rendimiento hasta un 10-15%. Aunque nades en agua, sudas y pierdes líquidos que deben reponerse estratégicamente.</p>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Protocolo de Hidratación Profesional</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">•</span><span><strong>Hidratación Base:</strong> 30-40ml/kg peso corporal/día (ejemplo: 70kg = 2.1-2.8L/día)</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">•</span><span><strong>Pre-Entrenamiento (2h antes):</strong> 400-600ml agua para asegurar hidratación óptima</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">•</span><span><strong>Durante Entrenamiento:</strong> 150-250ml cada 15-20 min. Bebida isotónica si &gt;60 min</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">•</span><span><strong>Post-Entrenamiento:</strong> 1.5L por cada kg de peso perdido durante la sesión</span></li>
              <li className="flex items-start gap-2"><span className="text-blue-600 font-bold">•</span><span><strong>Monitorización:</strong> Orina amarillo claro = hidratación correcta. Orina oscura = deshidratación</span></li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2"><span className="text-2xl">⚠️</span>Señales de Deshidratación</h4>
            <p className="text-gray-700">Sed intensa, fatiga prematura, calambres musculares, dolor de cabeza, orina oscura y escasa, frecuencia cardíaca elevada en reposo. Si experimentas 2+ síntomas, aumenta ingesta de líquidos inmediatamente.</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Timing de Comidas: Cuándo Comer</h2>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Plan Diario Ejemplo (Nadador 70kg, Entrenamiento 17:00)</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4">
                <p className="font-bold text-green-600">07:00 - Desayuno</p>
                <p className="text-gray-700">Avena (80g) + plátano + miel + yogur griego (150g) + café | 600 kcal</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <p className="font-bold text-green-600">10:30 - Snack Media Mañana</p>
                <p className="text-gray-700">Tostadas integrales (2) + pavo (50g) + aguacate | 350 kcal</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <p className="font-bold text-green-600">13:30 - Comida</p>
                <p className="text-gray-700">Arroz (150g) + pollo (150g) + verduras + aceite oliva | 750 kcal</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <p className="font-bold text-green-600">15:30 - Pre-Entrenamiento</p>
                <p className="text-gray-700">Plátano + barrita energética + 500ml agua | 250 kcal</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="font-bold text-blue-600">17:00-19:00 - ENTRENAMIENTO</p>
                <p className="text-gray-700">Bebida isotónica durante sesión (500ml)</p>
              </div>
              <div className="border-l-4 border-orange-600 pl-4">
                <p className="font-bold text-orange-600">19:15 - Post-Entrenamiento Inmediato</p>
                <p className="text-gray-700">Batido proteína (30g) + plátano + 600ml agua | 300 kcal</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <p className="font-bold text-green-600">21:00 - Cena</p>
                <p className="text-gray-700">Pasta (150g) + salmón (150g) + ensalada + aceite oliva | 800 kcal</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <p className="font-bold text-green-600">23:00 - Snack Nocturno (opcional)</p>
                <p className="text-gray-700">Yogur griego (150g) + frutos secos (30g) | 250 kcal</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4 font-bold">Total: ~3300 kcal | 480g CHO | 160g PRO | 85g FAT</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Equipo Esencial para Entrenar</h2>
          <p className="text-gray-700 mb-6">Optimiza tu rendimiento con el equipamiento adecuado. Desde <Link href="/gorros-natacion" className="text-blue-600 hover:underline">gorros profesionales</Link> hasta accesorios de entrenamiento de calidad.</p>
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

        <div className="bg-gradient-to-r from-green-600 to-teal-500 rounded-xl p-8 text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para Mejorar tu Rendimiento?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">Encuentra competiciones donde poner en práctica tu nueva estrategia nutricional y alcanzar tus mejores marcas.</p>
          <Link href="/eventos"><Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50"><Zap className="w-5 h-5 mr-2" />Ver Calendario de Competiciones</Button></Link>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparte este artículo</h3>
          <SocialShareButtons url="https://aquaevents.club/blog/nutricion-nadadores-alto-rendimiento" title="Nutrición para Nadadores de Alto Rendimiento: Guía Completa 2026" />
        </div>
      </div>
    </div>
  );
}

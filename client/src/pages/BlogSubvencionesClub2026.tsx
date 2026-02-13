import { useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Calendar, Euro, FileText, Building2, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlogAffiliateSection, { SWIMMING_TRAINING_PRODUCTS } from "@/components/BlogAffiliateSection";
import SocialShareButtons from "@/components/SocialShareButtons";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Guía Completa de Subvenciones para Clubes Acuáticos 2026",
  "description": "Guía actualizada 2026 de subvenciones y ayudas para clubes de natación: CSD, comunidades autónomas, diputaciones y ayuntamientos. Requisitos, plazos y cómo solicitarlas paso a paso.",
  "image": "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/jYZPaQTdmTdQdTXh.jpg",
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
  "datePublished": "2026-01-20",
  "dateModified": "2026-01-20"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué tipos de subvenciones puede solicitar un club de natación?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los clubes pueden acceder a: subvenciones del CSD (Consejo Superior de Deportes) para tecnificación deportiva, ayudas autonómicas para promoción del deporte base, subvenciones de diputaciones provinciales para equipamiento e instalaciones, y ayudas municipales para actividades deportivas locales. También existen convocatorias específicas para mujeres en el deporte, deporte inclusivo y eventos deportivos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuándo se abren las convocatorias de subvenciones deportivas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El calendario típico es: CSD abre convocatorias en enero-febrero, comunidades autónomas entre febrero-abril, diputaciones provinciales en marzo-mayo, y ayuntamientos suelen tener dos convocatorias (primavera y otoño). Es crucial consultar el BOE y boletines oficiales autonómicos regularmente desde enero para no perder plazos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué documentación necesito para solicitar una subvención?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Documentación básica: CIF del club, estatutos actualizados, certificado de estar al corriente con Hacienda y Seguridad Social, memoria de actividades del año anterior, presupuesto detallado del proyecto, número de licencias federativas, y certificado de cuenta bancaria. Algunas convocatorias requieren además plan de igualdad, memoria económica auditada o proyecto técnico-deportivo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto dinero puede recibir un club pequeño en subvenciones?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un club pequeño (50-150 licencias) puede obtener entre 3.000-15.000€ anuales combinando diferentes convocatorias: ayuntamiento (1.000-3.000€), diputación (2.000-5.000€), comunidad autónoma (3.000-7.000€). Clubes medianos (150-500 licencias) pueden alcanzar 15.000-40.000€, y clubes grandes con programas de tecnificación pueden superar los 100.000€ anuales."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué errores comunes rechazan las solicitudes de subvención?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Errores frecuentes: presentar fuera de plazo (causa automática de rechazo), presupuesto poco detallado o incoherente, no justificar la necesidad del proyecto, memoria de actividades genérica sin datos concretos, no aportar certificados actualizados de Hacienda/Seguridad Social, y no cumplir requisitos de paridad de género cuando aplica. Revisa las bases de la convocatoria línea por línea."
      }
    },
    {
      "@type": "Question",
      "name": "¿Puedo solicitar varias subvenciones para el mismo proyecto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, pero debes declararlo en cada solicitud y asegurar que el total de ayudas no supera el 100% del coste del proyecto. Es común combinar subvención autonómica (50% del proyecto) + diputación (30%) + ayuntamiento (20%). Algunas convocatorias del CSD son incompatibles entre sí, revisa las bases específicas."
      }
    }
  ]
};

export default function BlogSubvencionesClub2026() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Guía Completa de Subvenciones para Clubes Acuáticos 2026 | AquaEvents.club</title>
        <meta 
          name="description" 
          content="Guía actualizada 2026 de subvenciones y ayudas para clubes de natación en España: CSD, comunidades autónomas, diputaciones y ayuntamientos. Requisitos, plazos y proceso de solicitud paso a paso." 
        />
        <meta name="keywords" content="subvenciones clubes natación, ayudas deportivas 2026, CSD subvenciones, financiación clubes deportivos, subvenciones comunidades autónomas, ayudas ayuntamientos deporte" />
        <link rel="canonical" href="https://aquaevents.club/blog/guia-subvenciones-clubes-2026" />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-green-600 to-emerald-500 overflow-hidden">
        <img 
          src="https://files.manuscdn.com/user_upload_by_module/session_file/113670411/jYZPaQTdmTdQdTXh.jpg"
          alt="Guía de subvenciones para clubes acuáticos 2026"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
        />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <Badge className="w-fit mb-4 bg-white/20 text-white border-white/40">
            <Euro className="w-4 h-4 mr-2" />
            Guía Financiera
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
            Guía Completa de Subvenciones para Clubes Acuáticos 2026
          </h1>
          <div className="flex items-center gap-4 text-white/90">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              20 Ene 2026
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              15 min lectura
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl text-gray-700 leading-relaxed">
            La financiación es uno de los mayores desafíos para los clubes de natación en España. Sin embargo, existen múltiples líneas de <strong>subvenciones públicas</strong> que pueden cubrir desde equipamiento deportivo hasta programas de tecnificación. Esta guía actualizada para 2026 te explica paso a paso cómo acceder a ayudas del <strong>Consejo Superior de Deportes (CSD)</strong>, <strong>comunidades autónomas</strong>, <strong>diputaciones provinciales</strong> y <strong>ayuntamientos</strong>, con plazos, requisitos y estrategias para maximizar tus posibilidades de éxito.
          </p>
        </div>

        {/* Tipos de Subvenciones */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            Tipos de Subvenciones Disponibles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="border-2 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-blue-600 mb-3">1. Consejo Superior de Deportes (CSD)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Tecnificación Deportiva:</strong> 10.000-100.000€ para programas de alto rendimiento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Deporte Femenino:</strong> Ayudas específicas para promover la participación femenina</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Eventos Deportivos:</strong> Financiación para organizar competiciones nacionales</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Plazo típico:</strong> Enero-Febrero | <strong>Convocatoria:</strong> BOE
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-green-600 mb-3">2. Comunidades Autónomas</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Deporte Base:</strong> 3.000-20.000€ para escuelas deportivas y cantera</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Equipamiento:</strong> Ayudas para material deportivo y mejoras de instalaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Formación:</strong> Cursos para entrenadores y gestores deportivos</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Plazo típico:</strong> Febrero-Abril | <strong>Convocatoria:</strong> Boletín autonómico
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-purple-600 mb-3">3. Diputaciones Provinciales</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Infraestructuras:</strong> 5.000-30.000€ para mejoras de piscinas y vestuarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Competiciones Provinciales:</strong> Organización de campeonatos y ligas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Transporte:</strong> Desplazamientos a competiciones autonómicas/nacionales</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Plazo típico:</strong> Marzo-Mayo | <strong>Convocatoria:</strong> Web diputación
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-orange-600 mb-3">4. Ayuntamientos</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Actividades Locales:</strong> 1.000-5.000€ para escuelas municipales y eventos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Cesión de Instalaciones:</strong> Uso gratuito o bonificado de piscinas municipales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Promoción Deportiva:</strong> Campañas de captación y jornadas de puertas abiertas</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Plazo típico:</strong> Primavera y Otoño | <strong>Convocatoria:</strong> BOP o web municipal
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Calendario de Convocatorias */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-purple-600" />
            Calendario de Convocatorias 2026
          </h2>
          
          <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="border border-purple-200 px-4 py-3 text-left font-semibold">Mes</th>
                    <th className="border border-purple-200 px-4 py-3 text-left font-semibold">Organismo</th>
                    <th className="border border-purple-200 px-4 py-3 text-left font-semibold">Tipo de Ayuda</th>
                    <th className="border border-purple-200 px-4 py-3 text-left font-semibold">Cuantía Típica</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-purple-200 px-4 py-3"><strong>Enero</strong></td>
                    <td className="border border-purple-200 px-4 py-3">CSD</td>
                    <td className="border border-purple-200 px-4 py-3">Tecnificación Deportiva</td>
                    <td className="border border-purple-200 px-4 py-3">10.000-100.000€</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border border-purple-200 px-4 py-3"><strong>Febrero</strong></td>
                    <td className="border border-purple-200 px-4 py-3">CSD / CC.AA.</td>
                    <td className="border border-purple-200 px-4 py-3">Deporte Femenino / Deporte Base</td>
                    <td className="border border-purple-200 px-4 py-3">5.000-30.000€</td>
                  </tr>
                  <tr>
                    <td className="border border-purple-200 px-4 py-3"><strong>Marzo</strong></td>
                    <td className="border border-purple-200 px-4 py-3">CC.AA. / Diputaciones</td>
                    <td className="border border-purple-200 px-4 py-3">Equipamiento / Infraestructuras</td>
                    <td className="border border-purple-200 px-4 py-3">3.000-25.000€</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border border-purple-200 px-4 py-3"><strong>Abril</strong></td>
                    <td className="border border-purple-200 px-4 py-3">Ayuntamientos</td>
                    <td className="border border-purple-200 px-4 py-3">Actividades Deportivas Locales</td>
                    <td className="border border-purple-200 px-4 py-3">1.000-5.000€</td>
                  </tr>
                  <tr>
                    <td className="border border-purple-200 px-4 py-3"><strong>Mayo</strong></td>
                    <td className="border border-purple-200 px-4 py-3">Diputaciones</td>
                    <td className="border border-purple-200 px-4 py-3">Eventos Deportivos Provinciales</td>
                    <td className="border border-purple-200 px-4 py-3">2.000-10.000€</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border border-purple-200 px-4 py-3"><strong>Septiembre</strong></td>
                    <td className="border border-purple-200 px-4 py-3">Ayuntamientos</td>
                    <td className="border border-purple-200 px-4 py-3">Promoción Deportiva (2ª convocatoria)</td>
                    <td className="border border-purple-200 px-4 py-3">1.000-3.000€</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              Consejo Clave: No Esperes a la Convocatoria
            </h4>
            <p className="text-gray-700">
              Empieza a preparar la documentación en diciembre-enero. Las convocatorias del CSD se publican en enero y cierran en 15-30 días. Tener toda la documentación lista (certificados, memorias, presupuestos) te permite presentar la solicitud el mismo día de apertura, maximizando tus opciones.
            </p>
          </div>
        </section>

        {/* Documentación Necesaria */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="w-8 h-8 text-orange-600" />
            Documentación Necesaria
          </h2>
          
          <div className="bg-orange-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Checklist de Documentos Básicos</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">CIF del club deportivo</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Estatutos actualizados y registrados</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Certificado Hacienda (estar al corriente)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Certificado Seguridad Social</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Memoria de actividades año anterior</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Presupuesto detallado del proyecto</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Número de licencias federativas</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Certificado de cuenta bancaria</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Composición junta directiva</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Plan de igualdad (si aplica)</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Documentación Adicional Según Convocatoria</h3>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-2 text-blue-600">Para Subvenciones de Tecnificación (CSD)</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Proyecto técnico-deportivo detallado (objetivos, metodología, calendario)</li>
                  <li>• CV de entrenadores titulados</li>
                  <li>• Resultados deportivos últimos 2 años (ranking nacional/autonómico)</li>
                  <li>• Número de deportistas en programas de tecnificación</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-2 text-green-600">Para Subvenciones de Equipamiento</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Presupuestos de proveedores (mínimo 3 ofertas comparativas)</li>
                  <li>• Justificación de la necesidad del equipamiento</li>
                  <li>• Inventario actual de material deportivo</li>
                  <li>• Compromiso de uso del material (años de vida útil)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-2 text-purple-600">Para Subvenciones de Eventos Deportivos</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Proyecto del evento (fecha, sede, participantes esperados)</li>
                  <li>• Presupuesto desglosado (arbitraje, cronometraje, premios, difusión)</li>
                  <li>• Autorización federativa para organizar la competición</li>
                  <li>• Plan de comunicación y difusión del evento</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Estrategias de Éxito */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Estrategias para Maximizar Éxito</h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-600 mb-3">1. Diversifica las Fuentes de Financiación</h3>
              <p className="text-gray-700 mb-3">
                No dependas de una sola convocatoria. Combina subvenciones de diferentes niveles administrativos para el mismo año fiscal. Ejemplo de estrategia para un club mediano:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>CSD:</strong> Programa de tecnificación (15.000€)</li>
                <li>• <strong>Comunidad Autónoma:</strong> Deporte base y escuela (8.000€)</li>
                <li>• <strong>Diputación:</strong> Equipamiento (5.000€)</li>
                <li>• <strong>Ayuntamiento:</strong> Actividades locales (2.000€)</li>
                <li className="font-bold text-blue-600">= Total: 30.000€ anuales</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-600 mb-3">2. Crea una Memoria de Actividades Profesional</h3>
              <p className="text-gray-700 mb-3">
                La memoria es tu carta de presentación. Debe incluir datos concretos y medibles:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Número exacto de deportistas por categoría y género</li>
                <li>• Resultados deportivos destacados (podios, mínimas, récords)</li>
                <li>• Actividades realizadas con fechas y participantes</li>
                <li>• Impacto social (deporte inclusivo, igualdad, promoción local)</li>
                <li>• Fotografías de eventos y entrenamientos</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-purple-600 mb-3">3. Presupuesta con Realismo y Detalle</h3>
              <p className="text-gray-700 mb-3">
                Un presupuesto genérico es señal de rechazo. Desglosa cada partida con precios de mercado reales:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Equipamiento:</strong> "Material deportivo" ❌ → "20 tablas Speedo Kickboard a 15€/ud = 300€" ✅</li>
                <li>• <strong>Personal:</strong> "Entrenadores" ❌ → "2 entrenadores nivel II, 10h/semana, 15€/h x 40 semanas = 12.000€" ✅</li>
                <li>• <strong>Desplazamientos:</strong> "Transporte" ❌ → "Autobús 50 plazas a Campeonato Nacional (600km ida/vuelta) = 1.200€" ✅</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-orange-600 mb-3">4. Cumple Escrupulosamente los Plazos</h3>
              <p className="text-gray-700 mb-3">
                Presentar fuera de plazo es causa automática de rechazo, sin excepciones. Estrategia de gestión de plazos:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Configura alertas en el BOE y boletines autonómicos desde enero</li>
                <li>• Prepara documentación recurrente (certificados, estatutos) en diciembre</li>
                <li>• Presenta en los primeros 5 días de apertura (demuestra interés y evita saturación de última hora)</li>
                <li>• Guarda justificante de presentación electrónica con sello de fecha/hora</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Equipo para el Club */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Equipo Esencial para tu Club</h2>
          <p className="text-gray-700 mb-6">
            Una vez obtengas las subvenciones, invierte en equipamiento de calidad que mejore el rendimiento de tus nadadores. Desde <Link href="/gorros-natacion" className="text-blue-600 hover:underline">gorros personalizados para tu club</Link> hasta material de entrenamiento profesional.
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
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl p-8 text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">¿Organizas Eventos para tu Club?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Publica tus competiciones en nuestro calendario y aumenta la visibilidad de tu club ante miles de nadadores en toda España.
          </p>
          <Link href="/eventos">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
              <Calendar className="w-5 h-5 mr-2" />
              Ver Calendario de Eventos
            </Button>
          </Link>
        </div>

        {/* Social Sharing */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparte este artículo</h3>
          <SocialShareButtons 
            url="https://aquaevents.club/blog/guia-subvenciones-clubes-2026"
            title="Guía Completa de Subvenciones para Clubes Acuáticos 2026"
          />
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Mail, FileText, Calendar, Users } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

export default function BlogGuiaClub() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Guía para Presidentes de Club: Cómo Organizar un Pedido de 200 Gorros sin Volverse Loco | AquaEvents</title>
        <meta name="description" content="Guía paso a paso para organizar pedidos de gorros personalizados para tu club de natación. Aprende a gestionar diseño, aprobaciones, pagos y entregas sin complicaciones." />
        <link rel="canonical" href="https://aquaevents.club/blog/guia-pedido-gorros-club" />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
              ← Volver al Blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Guía para Presidentes de Club: Cómo Organizar un Pedido de 200 Gorros sin Volverse Loco
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Proceso paso a paso para coordinar diseño, aprobaciones, pagos y entregas sin complicaciones
            </p>
            <p className="text-sm text-gray-500">
              Tiempo de lectura: 8 minutos | Actualizado: Diciembre 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          
          {/* Introducción */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">El Dolor de Cabeza de Todo Presidente de Club</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Si eres presidente, tesorero o responsable de material de un club de natación, sabes que organizar un pedido de gorros personalizados puede convertirse en una pesadilla: coordinar diseños con la junta directiva, recoger logos de patrocinadores, gestionar pagos, cumplir plazos de entrega para el campeonato...
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Después de trabajar con más de 500 clubes en España, hemos identificado los 5 pasos clave que convierten un proceso caótico en una experiencia fluida. Esta guía te ahorrará horas de trabajo y dolores de cabeza.
            </p>
          </section>

          {/* Paso 1 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h2 className="text-3xl font-bold">Recoger Requisitos (Antes de Contactar al Proveedor)</h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              El error más común es contactar al proveedor sin tener clara la información básica. Esto genera idas y venidas innecesarias. Antes de enviar el primer email, asegúrate de tener:
            </p>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Checklist de Información Necesaria
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Cantidad total:</strong> ¿Cuántos nadadores tienes? Cuenta por categorías (benjamín, alevín, infantil, junior, absoluto). Añade un 10% extra para nuevas incorporaciones.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Tallas:</strong> Junior (6-12 años) vs Adulto (13+ años). Si tienes dudas, consulta con tu proveedor.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Colores oficiales del club:</strong> Código Pantone o HEX (ej: #003366). Evita decir "azul marino" sin especificar.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Logo vectorizado:</strong> Archivo en PDF, AI o EPS. NO envíes JPG de baja resolución (explicamos por qué más abajo).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Fecha límite:</strong> ¿Cuándo es el primer campeonato donde necesitas los gorros? Cuenta mínimo 15 días laborables.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <p className="text-gray-800">
                <strong>💡 Consejo Pro:</strong> Crea una hoja de cálculo con las tallas y nombres de todos los nadadores. Te servirá para futuros pedidos y evitarás errores de cantidad.
              </p>
            </div>
          </section>

          {/* Paso 2 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h2 className="text-3xl font-bold">Elegir Material y Diseño</h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              No todos los gorros son iguales. La elección del material depende de tu presupuesto y uso:
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2 text-green-600">Silicona (Recomendado)</h3>
                  <ul className="text-sm space-y-2">
                    <li>✅ Dura 2-3 años</li>
                    <li>✅ 100% impermeable</li>
                    <li>✅ Apto para competición oficial</li>
                    <li>💰 Desde 5,55€/ud (50 uds)</li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-3">
                    <strong>Ideal para:</strong> Clubes federados, competiciones oficiales, uso intensivo.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2 text-yellow-600">Látex (Económico)</h3>
                  <ul className="text-sm space-y-2">
                    <li>⚠️ Dura 6-12 meses</li>
                    <li>✅ Apto para competición</li>
                    <li>⚠️ Puede causar alergias</li>
                    <li>💰 Desde 3,20€/ud (50 uds)</li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-3">
                    <strong>Ideal para:</strong> Entrenamientos, eventos puntuales, presupuesto ajustado.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2 text-orange-600">Poliéster (Ocio)</h3>
                  <ul className="text-sm space-y-2">
                    <li>❌ NO apto para competición</li>
                    <li>⚠️ 60% impermeable</li>
                    <li>✅ Muy cómodo</li>
                    <li>💰 Desde 2,80€/ud (50 uds)</li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-3">
                    <strong>Ideal para:</strong> Piscina recreativa, campus de verano, merchandising.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Diseño: Dónde Colocar el Logo</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Las opciones más comunes son:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Laterales (ambos lados):</strong> Máxima visibilidad en fotos y vídeos. Ideal para patrocinadores.</li>
              <li><strong>Frontal:</strong> Visible cuando el nadador está en el poyete de salida.</li>
              <li><strong>Trasero:</strong> Visible durante la natación (vista desde atrás).</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <p className="text-gray-800">
                <strong>📸 Ejemplo Real:</strong> El Club Natación Pozuelo pidió 250 gorros con logo del club en laterales y patrocinador en la parte trasera. Resultado: patrocinador renovó para la siguiente temporada al ver la visibilidad en redes sociales.
              </p>
            </div>
          </section>

          {/* Paso 3 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h2 className="text-3xl font-bold">Gestionar Aprobaciones (Sin Volverse Loco)</h2>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              Este es el paso donde más tiempo se pierde. La clave es establecer un proceso claro desde el inicio:
            </p>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Proceso de Aprobación Recomendado</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <strong>Solicita el diseño visual al proveedor</strong>
                      <p className="text-gray-600 text-sm mt-1">Contacta a info@euroswimcaps.com con tu logo y requisitos. Recibirás un mockup en 24-48h.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <strong>Convoca una reunión de junta directiva</strong>
                      <p className="text-gray-600 text-sm mt-1">Presenta el diseño y establece un plazo de 48h para cambios. Después de ese plazo, NO se aceptan modificaciones.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <strong>Aprobación por email</strong>
                      <p className="text-gray-600 text-sm mt-1">Envía un email con el asunto "APROBACIÓN FINAL - Gorros [Nombre del Club]" y adjunta el diseño aprobado. Esto evita malentendidos.</p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
              <h4 className="font-semibold text-red-900 mb-2">❌ Errores Comunes que Debes Evitar:</h4>
              <ul className="space-y-2 text-gray-800">
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <span><strong>Enviar logo en JPG de baja resolución:</strong> El resultado será pixelado. Siempre pide el logo vectorizado (PDF, AI, EPS) al diseñador original.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <span><strong>No confirmar tallas:</strong> Asume que el 30% serán junior y el 70% adulto, pero verifica con tus entrenadores.</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <span><strong>Pedir con menos de 15 días de antelación:</strong> El plazo estándar es 10-15 días laborables. Si necesitas urgente, consulta disponibilidad de servicio express (+20%).</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Paso 4 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <h2 className="text-3xl font-bold">Coordinar Pago y Entrega</h2>
            </div>

            <h3 className="text-2xl font-semibold mb-4">Opciones de Pago</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              La mayoría de proveedores ofrecen:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Transferencia bancaria:</strong> Pago al 100% antes de producción (más común).</li>
              <li><strong>Factura a 30 días:</strong> Para clubes con historial de pedidos recurrentes.</li>
              <li><strong>Pago contra entrega:</strong> Disponible en algunos casos, consulta con tu proveedor.</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">Opciones de Entrega</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Coordina la entrega según tus necesidades:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Sede del club:</strong> Lo más común. Asegúrate de que haya alguien para recibir el paquete.</li>
              <li><strong>Dirección del evento:</strong> Si necesitas los gorros directamente en el campeonato.</li>
              <li><strong>Domicilio del presidente:</strong> Si la sede no tiene horario de recepción.</li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
              <p className="text-gray-800">
                <strong>✅ Qué Hacer si Hay Gorros Defectuosos:</strong> Los proveedores serios incluyen un 2-3% extra de gorros por posibles defectos de fabricación. Si encuentras más del 5% defectuosos, contacta inmediatamente con fotos. La reposición suele ser gratuita.
              </p>
            </div>
          </section>

          {/* Checklist Final */}
          <section className="mb-12">
            <div className="bg-blue-600 text-white p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6">✅ Checklist Final Antes de Confirmar el Pedido</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span>Logo vectorizado enviado (PDF, AI o EPS)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span>Colores confirmados (Pantone o HEX)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span>Cantidad por talla confirmada</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span>Fecha de entrega acordada (mínimo 15 días)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span>Presupuesto aprobado por tesorería</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span>Dirección de entrega confirmada</span>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusión */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Conclusión: De Caos a Proceso Fluido</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Organizar un pedido de 200 gorros no tiene por qué ser una pesadilla. Con estos 4 pasos claros, convertirás un proceso caótico en una experiencia fluida que te ahorrará horas de trabajo y dolores de cabeza.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Recuerda: la clave está en la preparación. Dedica 30 minutos a recoger toda la información necesaria ANTES de contactar al proveedor, y el resto del proceso será pan comido.
            </p>

            <Card className="bg-blue-50 border-2 border-blue-600">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-4 text-center">¿Listo para Hacer tu Pedido?</h3>
                <p className="text-center text-gray-700 mb-6">
                  Contacta con nosotros y recibe un presupuesto personalizado en 24h. Más de 500 clubes confían en nosotros.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/gorros-natacion">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Ver Precios y Opciones
                    </Button>
                  </Link>
                  <a href="mailto:info@euroswimcaps.com">
                    <Button size="lg" variant="outline">
                      <Mail className="w-5 h-5 mr-2" />
                      Contactar Ahora
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </article>
    </div>
  );
}

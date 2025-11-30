import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Mail, Phone, Globe } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import SwimCapsInquiryForm from "@/components/SwimCapsInquiryForm";

export default function GorrosNatacion() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Gorros de Natación Personalizados para Eventos y Clubes
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            25 años de experiencia | Más de 1 millón de gorros impresos | Máxima calidad al mejor precio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Solicitar Presupuesto
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-lg"
              onClick={() => document.getElementById('ejemplos')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Ejemplos
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-blue-100">Gorros Producidos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Clubes y Eventos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">¿Por Qué Elegir Nuestros Gorros?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Silicona de Alta Calidad</h3>
              <p className="text-gray-600">
                Utilizamos silicona 100% premium que garantiza durabilidad, elasticidad perfecta y resistencia al cloro. 
                Nuestros gorros mantienen su forma y color incluso después de cientos de usos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Impresión de Alta Resolución</h3>
              <p className="text-gray-600">
                Tecnología de impresión de última generación que permite logos, textos y diseños complejos con colores vibrantes 
                que no se desvanecen. Ideal para eventos, competiciones y patrocinadores.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pedidos Mínimos Flexibles</h3>
              <p className="text-gray-600">
                Desde 50 unidades para clubes pequeños hasta 10.000+ para grandes eventos. 
                Ofrecemos soluciones personalizadas para cada necesidad y presupuesto.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">
                Producción en 10-15 días laborables. Servicio express disponible para eventos urgentes. 
                Envío a toda España y Europa con seguimiento completo.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Asesoramiento de Diseño Gratis</h3>
              <p className="text-gray-600">
                Nuestro equipo de diseñadores te ayuda a crear el gorro perfecto sin coste adicional. 
                Proporcionamos muestras digitales antes de la producción.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Precio Más Competitivo</h3>
              <p className="text-gray-600">
                Producción propia sin intermediarios. Garantizamos el mejor precio del mercado español 
                sin comprometer la calidad. Descuentos por volumen disponibles.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-gray-50 py-16" id="ejemplos">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Perfectos Para Cualquier Evento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Competiciones de Natación</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Campeonatos autonómicos y nacionales con logos de federaciones</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Identificación por categorías con colores personalizados</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Logos de patrocinadores en alta resolución</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Numeración individual para identificación de nadadores</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Eventos de Triatlón</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Diseños llamativos para visibilidad en aguas abiertas</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Colores fluorescentes para seguridad y localización</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Logos de eventos Ironman, Challenge, y circuitos locales</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Recuerdo premium para participantes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Clubes de Natación</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Gorros con escudo y nombre del club para entrenamientos</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Diferentes colores por categorías de edad</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Pedidos recurrentes con descuentos especiales</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Opción de venta a socios para financiación del club</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Travesías en Aguas Abiertas</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Gorros incluidos en el pack de inscripción</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Diseños conmemorativos con fecha y ubicación del evento</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Colores diferenciados por distancias (500m, 1km, 2km, 5km)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Logos de ayuntamientos y patrocinadores locales</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Precios Transparentes y Competitivos</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Todos los precios incluyen diseño personalizado, impresión a una cara, y envío a península. 
          Descuentos adicionales para pedidos recurrentes y grandes volúmenes.
        </p>
        
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4 text-left">Cantidad</th>
                <th className="p-4 text-left">1 Color</th>
                <th className="p-4 text-left">2 Colores</th>
                <th className="p-4 text-left">3 Colores</th>
                <th className="p-4 text-left">4 Colores</th>
                <th className="p-4 text-left">Envío UE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">50 unidades</td>
                <td className="p-4">5,55€</td>
                <td className="p-4">7,55€</td>
                <td className="p-4">9,40€</td>
                <td className="p-4">11,00€</td>
                <td className="p-4 text-green-600 font-semibold">GRATIS</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 bg-blue-50">
                <td className="p-4 font-semibold">100 unidades</td>
                <td className="p-4 text-green-600 font-semibold">4,45€</td>
                <td className="p-4">5,95€</td>
                <td className="p-4">7,40€</td>
                <td className="p-4">8,60€</td>
                <td className="p-4 text-green-600 font-semibold">GRATIS</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">250 unidades</td>
                <td className="p-4 text-green-600 font-semibold">3,65€</td>
                <td className="p-4">4,95€</td>
                <td className="p-4">5,99€</td>
                <td className="p-4">6,90€</td>
                <td className="p-4 text-green-600 font-semibold">GRATIS</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 bg-blue-50">
                <td className="p-4 font-semibold">500 unidades</td>
                <td className="p-4 text-green-600 font-semibold">2,99€</td>
                <td className="p-4">3,99€</td>
                <td className="p-4">4,99€</td>
                <td className="p-4">5,99€</td>
                <td className="p-4 text-green-600 font-semibold">GRATIS</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">1.000 unidades</td>
                <td className="p-4 text-green-600 font-semibold">2,50€</td>
                <td className="p-4">POA</td>
                <td className="p-4">POA</td>
                <td className="p-4">POA</td>
                <td className="p-4 text-green-600 font-semibold">GRATIS</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 bg-blue-50">
                <td className="p-4 font-semibold">2.000 unidades</td>
                <td className="p-4 text-green-600 font-semibold">2,30€</td>
                <td className="p-4">POA</td>
                <td className="p-4">POA</td>
                <td className="p-4">POA</td>
                <td className="p-4 text-green-600 font-semibold">GRATIS</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold">5.000+ unidades</td>
                <td className="p-4 text-green-600 font-semibold">POA</td>
                <td className="p-4">POA</td>
                <td className="p-4">POA</td>
                <td className="p-4">POA</td>
                <td className="p-4 text-green-600 font-semibold">GRATIS</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            * Gorros de silicona tipo gamuza: +0,50€ por unidad | Sin coste de configuración/pantallas | Coincidencia de color Pantone disponible | POA = Precio bajo consulta
          </p>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
            onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Solicitar Presupuesto Personalizado
          </Button>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Proceso Simple en 4 Pasos</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-lg mb-2">Contacto</h3>
              <p className="text-gray-600">
                Envíanos tu idea, logo y cantidad necesaria por Instagram, email o teléfono
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-lg mb-2">Diseño</h3>
              <p className="text-gray-600">
                Recibe una muestra digital en 24-48h. Revisiones ilimitadas hasta tu aprobación
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-lg mb-2">Producción</h3>
              <p className="text-gray-600">
                Fabricación en 10-15 días con control de calidad en cada gorro
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-lg mb-2">Entrega</h3>
              <p className="text-gray-600">
                Envío con seguimiento a la dirección que indiques. Pago contra entrega disponible
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">¿Cuál es el pedido mínimo?</h3>
            <p className="text-gray-700">
              El pedido mínimo es de 50 unidades. Para clubes pequeños o eventos con menos participantes, 
              podemos ofrecer soluciones alternativas como gorros de stock con pegatinas personalizadas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">¿Cuánto tarda la producción?</h3>
            <p className="text-gray-700">
              El plazo estándar es de 10-15 días laborables desde la aprobación del diseño. Ofrecemos servicio 
              express de 7 días con un recargo del 20%. Para pedidos urgentes, consúltanos disponibilidad.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">¿Puedo ver una muestra física antes de producir todo el pedido?</h3>
            <p className="text-gray-700">
              Sí, para pedidos superiores a 500 unidades ofrecemos muestra física sin coste adicional. 
              Para pedidos menores, la muestra tiene un coste de 25€ que se descuenta del pedido final.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">¿Qué información necesito proporcionar para el diseño?</h3>
            <p className="text-gray-700">
              Necesitamos tu logo en formato vectorial (AI, EPS, SVG) o alta resolución (PNG, JPG mínimo 300dpi), 
              textos que quieras incluir, colores preferidos del gorro, y cantidad aproximada. Si no tienes logo, 
              podemos ayudarte a crear uno.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">¿Los gorros son aptos para competiciones oficiales?</h3>
            <p className="text-gray-700">
              Sí, nuestros gorros cumplen con todas las normativas de FINA (World Aquatics) y RFEN. 
              Son utilizados en campeonatos autonómicos, nacionales e internacionales sin ningún problema.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">¿Ofrecen descuentos para pedidos recurrentes?</h3>
            <p className="text-gray-700">
              Sí, clubes y organizadores de eventos anuales reciben descuentos especiales de hasta el 15% 
              en pedidos recurrentes. Además, almacenamos tu diseño para futuras reposiciones sin coste adicional.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para Crear Tus Gorros Personalizados?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Más de 500 clubes y eventos confían en nosotros. Únete a ellos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg"
              onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mail className="w-5 h-5 mr-2" />
              Solicitar Presupuesto
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-blue-700 px-8 py-6 text-lg"
              onClick={() => window.open('https://www.instagram.com/euroswimcaps', '_blank')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Seguir en Instagram
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 text-blue-100">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              <span>@euroswimcaps</span>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="formulario" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Solicita Tu Presupuesto Personalizado
          </h2>
          <p className="text-xl text-gray-700">
            Completa el formulario y recibe un presupuesto detallado en menos de 24 horas
          </p>
        </div>
        <SwimCapsInquiryForm />
      </section>

      {/* SEO Content Section */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h2>Gorros de Natación Personalizados: La Guía Definitiva para Eventos y Clubes en 2026</h2>
          
          <p>
            Los gorros de natación personalizados se han convertido en un elemento imprescindible para eventos deportivos acuáticos, 
            clubes de natación y competiciones de triatlón en España. Con más de 25 años de experiencia en la fabricación de gorros 
            de silicona de alta calidad, hemos producido más de un millón de unidades para eventos de todos los tamaños, desde 
            travesías locales con 100 participantes hasta campeonatos nacionales con miles de nadadores.
          </p>

          <h3>¿Por Qué los Gorros Personalizados Son Esenciales para Tu Evento?</h3>
          
          <p>
            En el competitivo mundo de los eventos deportivos acuáticos, los gorros personalizados cumplen múltiples funciones que 
            van más allá de la simple protección del cabello. Permiten la identificación rápida de participantes por categorías 
            mediante colores diferenciados, facilitan el seguimiento visual en aguas abiertas para garantizar la seguridad, 
            sirven como soporte publicitario para patrocinadores del evento, y actúan como recuerdo premium que los participantes 
            conservan durante años.
          </p>

          <p>
            Los organizadores de eventos de natación y triatlón en España están descubriendo que invertir en gorros de calidad 
            con diseños atractivos aumenta la percepción de valor del evento, lo que se traduce en mayor satisfacción de los 
            participantes y mejores valoraciones en redes sociales. Un gorro bien diseñado se convierte en una herramienta de 
            marketing orgánico cuando los nadadores lo utilizan en entrenamientos posteriores, generando visibilidad continua 
            para tu marca o evento.
          </p>

          <h3>Tecnología de Impresión de Alta Resolución</h3>
          
          <p>
            Utilizamos tecnología de impresión de última generación que permite reproducir logos complejos, degradados de color 
            y textos pequeños con una nitidez excepcional. A diferencia de los métodos tradicionales de serigrafía que limitan 
            el número de colores, nuestra técnica de impresión digital permite diseños multicolor sin costes adicionales. 
            Los colores permanecen vibrantes incluso después de cientos de exposiciones al cloro, al sol y al agua salada.
          </p>

          <h3>Silicona Premium: La Diferencia Está en el Material</h3>
          
          <p>
            No todos los gorros de silicona son iguales. Utilizamos silicona 100% premium de grado médico que ofrece una 
            elasticidad superior, permitiendo que el gorro se ajuste cómodamente a cualquier tamaño de cabeza sin causar 
            presión excesiva. Esta silicona de alta calidad resiste la degradación causada por el cloro y los rayos UV, 
            manteniendo su forma original durante años de uso intensivo. Muchos nadadores profesionales y clubes de élite 
            confían en nuestros gorros precisamente por esta durabilidad excepcional.
          </p>

          <h3>Casos de Uso: Desde Competiciones Federadas hasta Travesías Populares</h3>
          
          <p>
            Nuestros gorros personalizados han sido utilizados en una amplia variedad de eventos acuáticos en toda España. 
            Los campeonatos autonómicos de natación utilizan nuestros gorros con los colores y escudos de las federaciones 
            regionales, permitiendo identificar rápidamente a los nadadores de cada comunidad. Los eventos de triatlón como 
            Ironman y Challenge confían en nosotros para producir gorros en colores fluorescentes que mejoran la visibilidad 
            y seguridad en el segmento de natación en aguas abiertas.
          </p>

          <p>
            Las travesías populares en playas y embalses utilizan nuestros gorros como parte del pack de inscripción, 
            diferenciando las distancias mediante colores (por ejemplo, amarillo para 500m, azul para 1km, rojo para 2km). 
            Los clubes de natación encargan gorros con su escudo y nombre para entrenamientos diarios, creando sentido de 
            pertenencia entre los nadadores jóvenes y reforzando la identidad visual del club en competiciones.
          </p>

          <h3>Proceso de Pedido Sin Complicaciones</h3>
          
          <p>
            Hemos simplificado el proceso de pedido para que organizadores de eventos y responsables de clubes puedan obtener 
            sus gorros personalizados sin estrés. Todo comienza con un contacto inicial donde nos proporcionas tu logo, 
            colores preferidos y cantidad estimada. Nuestro equipo de diseñadores crea una muestra digital en 24-48 horas 
            que te enviamos para aprobación. Puedes solicitar todas las revisiones que necesites hasta que el diseño sea 
            exactamente como lo imaginas.
          </p>

          <p>
            Una vez aprobado el diseño, iniciamos la producción con un plazo estándar de 10-15 días laborables. Para eventos 
            urgentes, ofrecemos servicio express de 7 días con un recargo moderado. El envío se realiza con seguimiento 
            completo a la dirección que indiques, y ofrecemos opciones de pago flexibles incluyendo transferencia bancaria, 
            pago contra entrega y facturación a 30 días para clientes recurrentes.
          </p>

          <h3>Precios Competitivos Sin Comprometer la Calidad</h3>
          
          <p>
            Al tener producción propia sin intermediarios, podemos ofrecer los precios más competitivos del mercado español 
            manteniendo los más altos estándares de calidad. Nuestros precios comienzan en 3,50€ por unidad para pedidos 
            pequeños de 50-99 gorros, y descienden hasta 2,20€ por unidad para pedidos de 500-999 unidades. Para eventos 
            grandes con más de 1.000 participantes, ofrecemos precios especiales personalizados que hacen que los gorros 
            personalizados sean una inversión accesible para cualquier presupuesto.
          </p>

          <h3>Sostenibilidad y Responsabilidad Ambiental</h3>
          
          <p>
            Somos conscientes del impacto ambiental de la producción de artículos deportivos. Por eso, utilizamos silicona 
            de larga duración que reduce la necesidad de reemplazos frecuentes, minimizamos los residuos de producción 
            mediante procesos optimizados, y ofrecemos programas de reciclaje para gorros al final de su vida útil. 
            Muchos de nuestros clientes utilizan los gorros durante 3-5 años antes de necesitar reemplazo, lo que reduce 
            significativamente la huella ambiental comparado con gorros de látex de menor calidad que deben reemplazarse 
            cada temporada.
          </p>

          <h3>Testimonios de Clubes y Organizadores</h3>
          
          <p>
            Más de 500 clubes de natación y organizadores de eventos en España confían en nosotros para sus gorros 
            personalizados. Federaciones autonómicas como la Catalana, la Madrileña y la Andaluza han utilizado nuestros 
            gorros en sus campeonatos regionales. Eventos icónicos como travesías en Baleares y Canarias eligen nuestros 
            gorros año tras año por la calidad consistente y el servicio personalizado.
          </p>

          <h3>Contacto y Presupuesto Personalizado</h3>
          
          <p>
            Si estás organizando un evento de natación, triatlón o travesía en aguas abiertas, o si tu club necesita gorros 
            personalizados para la temporada 2026, contáctanos para recibir un presupuesto personalizado sin compromiso. 
            Puedes encontrarnos en Instagram como @euroswimcaps, donde compartimos ejemplos de nuestros trabajos recientes 
            y respondemos consultas en menos de 24 horas.
          </p>

          <p>
            Con 25 años de experiencia, más de un millón de gorros producidos y cientos de clientes satisfechos, somos el 
            proveedor de confianza para eventos acuáticos en España. Descubre por qué organizadores de toda la península 
            eligen nuestros gorros de silicona personalizados para hacer que sus eventos destaquen.
          </p>
        </div>
      </section>
    </div>
  );
}

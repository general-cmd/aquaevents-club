import { useEffect } from "react";
import Footer from "@/components/Footer";
import { Link } from "wouter";

/**
 * Aviso Legal (Legal Notice) Page
 * Required by Spanish law (LSSI - Ley de Servicios de la Sociedad de la Información)
 */
export default function AvisoLegal() {
  useEffect(() => {
    document.title = "Aviso Legal | AquaEvents.club";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="AquaEvents.club" className="h-10 w-10 rounded-full" />
              <span className="font-bold text-xl text-blue-600">AquaEvents.club</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Aviso Legal</h1>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            {/* Company Info */}
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Datos Identificativos</h2>
              <p className="text-gray-700 mb-4">
                En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI), se informa a los usuarios de los siguientes datos identificativos del titular del sitio web:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Denominación social:</strong> BRU&YOU LTD</li>
                <li><strong>Número de registro:</strong> Company No. 12886384 (England & Wales)</li>
                <li><strong>Domicilio social:</strong> 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom</li>
                <li><strong>Correo electrónico:</strong> <a href="mailto:hola@aquaevents.club" className="text-blue-600 hover:underline">hola@aquaevents.club</a></li>
                <li><strong>Sitio web:</strong> <a href="https://aquaevents.club" className="text-blue-600 hover:underline">https://aquaevents.club</a></li>
              </ul>
            </section>

            {/* Object */}
            <section>
              <h2 className="text-2xl font-bold mb-4">2. Objeto</h2>
              <p className="text-gray-700 mb-4">
                AquaEvents.club es una plataforma digital que ofrece un calendario centralizado de eventos acuáticos (natación, waterpolo, aguas abiertas, triatlón, etc.) en España. El servicio es gratuito para usuarios, clubes y federaciones.
              </p>
              <p className="text-gray-700">
                <strong>Modelo de negocio:</strong> AquaEvents.club es un servicio gratuito financiado por la venta de material deportivo (gorros de natación personalizados). No vendemos datos de usuarios a terceros.
              </p>
            </section>

            {/* Terms of Use */}
            <section>
              <h2 className="text-2xl font-bold mb-4">3. Condiciones de Uso</h2>
              <p className="text-gray-700 mb-4">
                El acceso y uso de este sitio web implica la aceptación de las presentes condiciones de uso. El usuario se compromete a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Utilizar el sitio web de conformidad con la ley y las presentes condiciones</li>
                <li>No realizar actividades ilícitas o contrarias a la buena fe</li>
                <li>No introducir virus informáticos o realizar acciones que dañen el sistema</li>
                <li>No suplantar la identidad de otros usuarios</li>
                <li>Proporcionar información veraz al enviar eventos o registrarse</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold mb-4">4. Propiedad Intelectual</h2>
              <p className="text-gray-700 mb-4">
                Todos los contenidos del sitio web (textos, imágenes, diseño gráfico, código fuente, logotipos, etc.) son propiedad de BRU&YOU LTD o de terceros que han autorizado su uso, y están protegidos por las leyes de propiedad intelectual.
              </p>
              <p className="text-gray-700">
                Los usuarios pueden visualizar, imprimir y descargar contenidos exclusivamente para uso personal y no comercial. Queda prohibida la reproducción, distribución o modificación sin autorización expresa.
              </p>
            </section>

            {/* Event Data */}
            <section>
              <h2 className="text-2xl font-bold mb-4">5. Información de Eventos</h2>
              <p className="text-gray-700 mb-4">
                La información de eventos publicada en AquaEvents.club proviene de fuentes públicas (federaciones, clubes, organizadores) y de envíos de usuarios. BRU&YOU LTD no se responsabiliza de:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>La exactitud, actualización o veracidad de la información de eventos</li>
                <li>Cambios de fecha, cancelaciones o modificaciones no comunicadas</li>
                <li>Problemas derivados de la inscripción o participación en eventos</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Recomendamos a los usuarios verificar siempre la información directamente con el organizador oficial del evento.
              </p>
            </section>

            {/* Liability */}
            <section>
              <h2 className="text-2xl font-bold mb-4">6. Limitación de Responsabilidad</h2>
              <p className="text-gray-700 mb-4">
                BRU&YOU LTD no se hace responsable de:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Interrupciones o errores en el acceso al sitio web</li>
                <li>Contenidos de sitios web de terceros enlazados desde AquaEvents.club</li>
                <li>Daños derivados del uso indebido del sitio web por parte de usuarios</li>
                <li>Pérdida de datos o información almacenada por el usuario</li>
              </ul>
            </section>

            {/* Links */}
            <section>
              <h2 className="text-2xl font-bold mb-4">7. Enlaces a Terceros</h2>
              <p className="text-gray-700">
                AquaEvents.club puede contener enlaces a sitios web de terceros (federaciones, clubes, organizadores). BRU&YOU LTD no controla ni se responsabiliza del contenido, políticas de privacidad o prácticas de estos sitios externos.
              </p>
            </section>

            {/* Applicable Law */}
            <section>
              <h2 className="text-2xl font-bold mb-4">8. Legislación Aplicable y Jurisdicción</h2>
              <p className="text-gray-700">
                Las presentes condiciones se rigen por la legislación española. Para cualquier controversia derivada del uso del sitio web, las partes se someten a los Juzgados y Tribunales de Madrid, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold mb-4">9. Contacto</h2>
              <p className="text-gray-700">
                Para cualquier consulta relacionada con el presente Aviso Legal, puede contactarnos en:
              </p>
              <p className="text-gray-700 mt-2">
                <a href="mailto:hola@aquaevents.club" className="text-blue-600 hover:underline font-medium">
                  hola@aquaevents.club
                </a>
              </p>
            </section>

            {/* Last Updated */}
            <section className="border-t pt-6 mt-8">
              <p className="text-gray-500 text-sm">
                Última actualización: 8 de diciembre de 2025
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

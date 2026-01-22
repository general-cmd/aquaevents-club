import { useEffect } from "react";
import Footer from "@/components/Footer";
import { Link } from "wouter";

/**
 * Política de Privacidad (Privacy Policy) Page
 * GDPR compliant privacy policy in Spanish
 */
export default function PoliticaPrivacidad() {
  useEffect(() => {
    document.title = "Política de Privacidad | AquaEvents.club";
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
          <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            {/* Introduction */}
            <section>
              <p className="text-gray-700 mb-4">
                AquaEvents.club, patrocinado por euroswimcaps.com, se compromete a proteger la privacidad de nuestros usuarios. Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos su información personal de acuerdo con el Reglamento General de Protección de Datos (RGPD) y la legislación española aplicable.
              </p>
            </section>

            {/* Data Controller */}
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Responsable del Tratamiento</h2>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Plataforma:</strong> AquaEvents.club</li>
                <li><strong>Patrocinador:</strong> euroswimcaps.com</li>
                <li><strong>Correo electrónico:</strong> <a href="mailto:hola@aquaevents.club" className="text-blue-600 hover:underline">hola@aquaevents.club</a></li>
                <li><strong>Sitio web:</strong> <a href="https://aquaevents.club" className="text-blue-600 hover:underline">https://aquaevents.club</a></li>
              </ul>
            </section>

            {/* Data Collected */}
            <section>
              <h2 className="text-2xl font-bold mb-4">2. Datos que Recopilamos</h2>
              <p className="text-gray-700 mb-4">
                Recopilamos los siguientes tipos de datos personales:
              </p>
              
              <h3 className="text-xl font-semibold mb-3">2.1. Datos de Registro</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Tipo de usuario (nadador, club, federación, otro)</li>
                <li>Disciplinas de interés</li>
                <li>Consentimiento para recibir notificaciones</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.2. Datos de Eventos Enviados</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
                <li>Información del evento (nombre, fecha, ubicación, descripción)</li>
                <li>Datos de contacto del organizador</li>
                <li>Información de registro y capacidad</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.3. Datos de Navegación</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Dirección IP</li>
                <li>Tipo de navegador y dispositivo</li>
                <li>Páginas visitadas y tiempo de navegación</li>
                <li>Cookies y tecnologías similares</li>
              </ul>
            </section>

            {/* Purpose */}
            <section>
              <h2 className="text-2xl font-bold mb-4">3. Finalidad del Tratamiento</h2>
              <p className="text-gray-700 mb-4">
                Utilizamos sus datos personales para las siguientes finalidades:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Gestión del servicio:</strong> Crear y gestionar su cuenta de usuario</li>
                <li><strong>Publicación de eventos:</strong> Procesar y publicar eventos enviados por usuarios</li>
                <li><strong>Comunicaciones:</strong> Enviar notificaciones de nuevos eventos (solo con consentimiento)</li>
                <li><strong>Mejora del servicio:</strong> Analizar el uso del sitio web para mejorar la experiencia</li>
                <li><strong>Cumplimiento legal:</strong> Cumplir con obligaciones legales y regulatorias</li>
              </ul>
            </section>

            {/* Legal Basis */}
            <section>
              <h2 className="text-2xl font-bold mb-4">4. Base Legal del Tratamiento</h2>
              <p className="text-gray-700 mb-4">
                El tratamiento de sus datos personales se basa en:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Consentimiento:</strong> Para el envío de notificaciones por correo electrónico</li>
                <li><strong>Ejecución de contrato:</strong> Para la prestación del servicio de calendario de eventos</li>
                <li><strong>Interés legítimo:</strong> Para la mejora del servicio y análisis estadísticos</li>
                <li><strong>Obligación legal:</strong> Para el cumplimiento de requisitos legales</li>
              </ul>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-2xl font-bold mb-4">5. Compartir Datos con Terceros</h2>
              <p className="text-gray-700 mb-4">
                <strong>No vendemos sus datos personales a terceros.</strong> Podemos compartir datos en los siguientes casos:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar el sitio web (hosting, email, analytics)</li>
                <li><strong>Publicación de eventos:</strong> La información de eventos es pública y visible para todos los usuarios</li>
                <li><strong>Obligaciones legales:</strong> Cuando sea requerido por ley o autoridades competentes</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold mb-4">6. Conservación de Datos</h2>
              <p className="text-gray-700 mb-4">
                Conservamos sus datos personales durante el tiempo necesario para cumplir con las finalidades descritas:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Cuentas de usuario:</strong> Hasta que solicite la eliminación de su cuenta</li>
                <li><strong>Eventos publicados:</strong> Indefinidamente como archivo histórico (se pueden eliminar a petición)</li>
                <li><strong>Consentimientos:</strong> Hasta que retire su consentimiento</li>
                <li><strong>Datos de navegación:</strong> Máximo 2 años</li>
              </ul>
            </section>

            {/* User Rights */}
            <section>
              <h2 className="text-2xl font-bold mb-4">7. Derechos de los Usuarios</h2>
              <p className="text-gray-700 mb-4">
                Usted tiene los siguientes derechos sobre sus datos personales:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Acceso:</strong> Obtener confirmación sobre si tratamos sus datos y acceder a ellos</li>
                <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos ("derecho al olvido")</li>
                <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento de sus datos</li>
                <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado y transferirlos a otro responsable</li>
                <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos</li>
                <li><strong>Retirada del consentimiento:</strong> Retirar el consentimiento en cualquier momento</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Para ejercer estos derechos, puede contactarnos en <a href="mailto:hola@aquaevents.club" className="text-blue-600 hover:underline">hola@aquaevents.club</a>. Responderemos a su solicitud en un plazo máximo de 30 días.
              </p>
            </section>

            {/* Security */}
            <section>
              <h2 className="text-2xl font-bold mb-4">8. Seguridad de los Datos</h2>
              <p className="text-gray-700">
                Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales contra acceso no autorizado, pérdida, destrucción o alteración. Esto incluye cifrado SSL/TLS, contraseñas seguras, y acceso restringido a datos personales.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold mb-4">9. Cookies</h2>
              <p className="text-gray-700 mb-4">
                Utilizamos cookies y tecnologías similares para mejorar la experiencia del usuario y analizar el tráfico del sitio web. Las cookies que utilizamos son:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio (sesión de usuario)</li>
                <li><strong>Cookies analíticas:</strong> Para entender cómo los usuarios interactúan con el sitio</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-bold mb-4">10. Transferencias Internacionales</h2>
              <p className="text-gray-700">
                Algunos de nuestros proveedores de servicios pueden estar ubicados fuera del Espacio Económico Europeo (EEE). En estos casos, garantizamos que se implementan las salvaguardas adecuadas conforme al RGPD (cláusulas contractuales tipo, Privacy Shield, etc.).
              </p>
            </section>

            {/* Minors */}
            <section>
              <h2 className="text-2xl font-bold mb-4">11. Menores de Edad</h2>
              <p className="text-gray-700">
                Nuestro servicio no está dirigido a menores de 14 años. No recopilamos intencionadamente datos personales de menores sin el consentimiento de sus padres o tutores. Si descubrimos que hemos recopilado datos de un menor sin consentimiento, eliminaremos esa información de inmediato.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-2xl font-bold mb-4">12. Cambios en la Política de Privacidad</h2>
              <p className="text-gray-700">
                Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos cualquier cambio significativo publicando la nueva política en esta página y actualizando la fecha de "última actualización". Le recomendamos revisar esta política regularmente.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold mb-4">13. Contacto</h2>
              <p className="text-gray-700 mb-4">
                Para cualquier consulta sobre esta Política de Privacidad o sobre el tratamiento de sus datos personales, puede contactarnos en:
              </p>
              <p className="text-gray-700">
                <a href="mailto:hola@aquaevents.club" className="text-blue-600 hover:underline font-medium">
                  hola@aquaevents.club
                </a>
              </p>
              <p className="text-gray-700 mt-4">
                También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si considera que el tratamiento de sus datos personales no cumple con la normativa vigente.
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

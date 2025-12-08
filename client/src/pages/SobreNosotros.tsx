import { useEffect } from "react";
import Footer from "@/components/Footer";
import { Link } from "wouter";

/**
 * Sobre Nosotros (About Us) Page
 * Explains the mission, business model, and transparency
 */
export default function SobreNosotros() {
  useEffect(() => {
    document.title = "Sobre Nosotros | AquaEvents.club";
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
          <h1 className="text-4xl font-bold mb-8">Sobre Nosotros</h1>

          <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
            {/* Mission */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
              <p className="text-gray-700 mb-4">
                AquaEvents.club nace con el objetivo de centralizar y facilitar el acceso a todos los eventos acuáticos en España. Queremos que nadadores, clubes, federaciones y aficionados puedan encontrar fácilmente competiciones de natación, waterpolo, aguas abiertas, triatlón y otros deportes acuáticos en un solo lugar.
              </p>
              <p className="text-gray-700">
                Creemos que el deporte acuático español merece una plataforma moderna, accesible y gratuita que conecte a toda la comunidad.
              </p>
            </section>

            {/* What We Do */}
            <section>
              <h2 className="text-2xl font-bold mb-4">¿Qué Hacemos?</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl">📅</span>
                  <div>
                    <strong>Calendario Centralizado:</strong> Recopilamos eventos de todas las federaciones autonómicas y clubes de España en un calendario único y actualizado.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl">🔍</span>
                  <div>
                    <strong>Búsqueda Avanzada:</strong> Filtra eventos por disciplina, región, categoría y fecha para encontrar exactamente lo que buscas.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl">🏊</span>
                  <div>
                    <strong>Información Completa:</strong> Cada evento incluye detalles de ubicación, contacto, inscripción y categorías.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl">📧</span>
                  <div>
                    <strong>Alertas Personalizadas:</strong> Recibe notificaciones de nuevos eventos que coincidan con tus intereses (opcional).
                  </div>
                </li>
              </ul>
            </section>

            {/* Business Model */}
            <section className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Modelo de Negocio Transparente</h2>
              <p className="text-gray-700 mb-4">
                <strong>AquaEvents.club es un servicio 100% gratuito</strong> para usuarios, clubes y federaciones. No cobramos por publicar eventos ni por acceder al calendario.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>¿Cómo nos financiamos?</strong> A través de la venta de material deportivo, específicamente gorros de natación personalizados para clubes. Esta actividad nos permite mantener el servicio de calendario gratuito y de alta calidad.
              </p>
              <p className="text-gray-700 font-medium">
                ✅ No vendemos datos de usuarios a terceros<br />
                ✅ No mostramos publicidad invasiva<br />
                ✅ Tu privacidad es nuestra prioridad
              </p>
            </section>

            {/* Who We Are */}
            <section>
              <h2 className="text-2xl font-bold mb-4">¿Quiénes Somos?</h2>
              <p className="text-gray-700 mb-4">
                AquaEvents.club es operado por <strong>BRU&YOU LTD</strong>, una empresa registrada en Inglaterra y Gales (Company No. 12886384) con sede en Londres.
              </p>
              <p className="text-gray-700 mb-4">
                Nuestro equipo está formado por apasionados del deporte acuático que entienden las necesidades de nadadores, entrenadores y organizadores de eventos.
              </p>
              <div className="bg-gray-100 rounded-lg p-6 mt-6">
                <h3 className="font-bold mb-3">Datos de la Empresa</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Denominación social:</strong> BRU&YOU LTD</li>
                  <li><strong>Número de registro:</strong> Company No. 12886384 (England & Wales)</li>
                  <li><strong>Domicilio social:</strong> 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom</li>
                  <li><strong>Correo electrónico:</strong> <a href="mailto:hola@aquaevents.club" className="text-blue-600 hover:underline">hola@aquaevents.club</a></li>
                </ul>
              </div>
            </section>

            {/* Values */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Nuestros Valores</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-lg mb-2">🎯 Transparencia</h3>
                  <p className="text-gray-700 text-sm">
                    Somos claros sobre nuestro modelo de negocio y el uso de datos.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-lg mb-2">🤝 Colaboración</h3>
                  <p className="text-gray-700 text-sm">
                    Trabajamos con federaciones y clubes para ofrecer información precisa.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-lg mb-2">🔒 Privacidad</h3>
                  <p className="text-gray-700 text-sm">
                    Protegemos los datos de nuestros usuarios conforme al RGPD.
                  </p>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <h3 className="font-bold text-lg mb-2">💙 Pasión</h3>
                  <p className="text-gray-700 text-sm">
                    Amamos el deporte acuático y queremos ayudar a que crezca.
                  </p>
                </div>
              </div>
            </section>

            {/* For Federations */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Para Federaciones y Clubes</h2>
              <p className="text-gray-700 mb-4">
                Si representas a una federación autonómica o club deportivo, nos encantaría colaborar contigo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Publicamos tus eventos de forma gratuita</li>
                <li>Ayudamos a aumentar la visibilidad de tus competiciones</li>
                <li>Facilitamos que los nadadores encuentren tus eventos</li>
                <li>Ofrecemos importación masiva de calendarios vía CSV</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>¿Interesado en colaborar?</strong> Escríbenos a <a href="mailto:hola@aquaevents.club" className="text-blue-600 hover:underline">hola@aquaevents.club</a>
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Contacto</h2>
              <p className="text-gray-700 mb-4">
                ¿Tienes preguntas, sugerencias o quieres colaborar con nosotros?
              </p>
              <p className="text-gray-700">
                📧 <a href="mailto:hola@aquaevents.club" className="text-blue-600 hover:underline font-medium">hola@aquaevents.club</a>
              </p>
              <p className="text-gray-700 mt-2">
                Respondemos a todos los mensajes en un plazo máximo de 48 horas.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

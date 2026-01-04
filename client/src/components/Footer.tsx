import { Link } from "wouter";

/**
 * Shared Footer Component with Legal Compliance
 * Includes BRU&YOU LTD company details as required by Spanish law (LSSI)
 */
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="AquaEvents.club" className="h-10 w-10 rounded-full" />
              <span className="font-bold text-lg">AquaEvents.club</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              <strong>AquaEvents.club</strong>: La mayor plataforma de gestión de eventos acuáticos en España. 
              Proveedor líder de <strong>gorros de natación personalizados</strong> para clubes y competiciones.
            </p>
            <p className="text-gray-500 text-xs">
              Servicio gratuito financiado por la venta de material deportivo. No vendemos tus datos a terceros.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/eventos" className="hover:text-white">Calendario de Eventos</Link></li>
              <li><Link href="/federaciones" className="hover:text-white">Federaciones</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/enviar-evento" className="hover:text-white">Publicar Evento</Link></li>
              <li><Link href="/gorros-natacion" className="hover:text-white text-xs">Material para Clubes</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/aviso-legal" className="hover:text-white">Aviso Legal</Link></li>
              <li><Link href="/politica-privacidad" className="hover:text-white">Política de Privacidad</Link></li>
              <li><Link href="/sobre-nosotros" className="hover:text-white">Sobre Nosotros</Link></li>
              <li><a href="mailto:hola@aquaevents.club" className="hover:text-white">Contacto</a></li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="font-bold mb-4">Información de la Empresa</h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li><strong className="text-gray-300">BRU&YOU LTD</strong></li>
              <li>Company No. 12886384</li>
              <li>Registrada en Inglaterra y Gales</li>
              <li className="pt-2">
                71-75 Shelton Street<br />
                Covent Garden<br />
                London, WC2H 9JQ<br />
                United Kingdom
              </li>
              <li className="pt-2">
                <a href="mailto:hola@aquaevents.club" className="hover:text-white">
                  hola@aquaevents.club
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>© 2025 AquaEvents.club - BRU&YOU LTD. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

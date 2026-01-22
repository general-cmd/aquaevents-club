import { Link } from "wouter";

/**
 * Shared Footer Component with Legal Compliance
 * Includes sponsorship information and legal links
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

          {/* Sponsorship Info */}
          <div>
            <h4 className="font-bold mb-4">Patrocinador</h4>
            <ul className="space-y-2 text-gray-400 text-xs">
              <li><strong className="text-gray-300">euroswimcaps.com</strong></li>
              <li>Proveedor líder de gorros de natación personalizados</li>
              <li className="pt-2">
                <a href="https://euroswimcaps.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Visitar euroswimcaps.com
                </a>
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
          <p>© 2025 AquaEvents.club - Patrocinado por euroswimcaps.com. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

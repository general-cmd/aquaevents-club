import { ExternalLink } from "lucide-react";

/**
 * Blog Affiliate Section Component
 * Contextual affiliate product recommendations for blog posts
 * Optimized for SEO/AISEO with natural integration
 */

const AFFILIATE_TAG = "aquaevents00d-21";

interface AffiliateProduct {
  title: string;
  description: string;
  imageUrl: string;
  amazonUrl: string;
  price: string;
  badge?: string;
}

interface BlogAffiliateSectionProps {
  title?: string;
  intro?: string;
  products: AffiliateProduct[];
  className?: string;
}

export default function BlogAffiliateSection({ 
  title = "Material Recomendado para Nadadores",
  intro = "Productos esenciales que te ayudarán a mejorar tu rendimiento en competición y entrenamiento.",
  products,
  className = ""
}: BlogAffiliateSectionProps) {
  return (
    <aside className={`bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 my-8 border border-blue-100 ${className}`}>
      {/* Section Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-2xl">🏊</span>
          {title}
        </h3>
        <p className="text-gray-600 text-sm">
          {intro}
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Product Image */}
            <div className="relative bg-gray-50 aspect-square">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-contain p-4"
                loading="lazy"
              />
              {product.badge && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">
                {product.title}
              </h4>
              
              <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-3">
                <span className="text-lg font-bold text-gray-900">{product.price}</span>
              </div>

              {/* CTA Button */}
              <a
                href={product.amazonUrl}
                target="_blank"
                rel="nofollow noopener noreferrer sponsored"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                Ver en Amazon
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Disclosure */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          💡 Enlaces de afiliado. Como Afiliado de Amazon, obtenemos ingresos por compras cualificadas.
        </p>
      </div>
    </aside>
  );
}

// Pre-configured product sets for common blog topics
export const SWIMMING_TRAINING_PRODUCTS: AffiliateProduct[] = [
  {
    title: "Arena Cobra Ultra Swipe Racing Goggles",
    description: "Tecnología anti-vaho de larga duración. Perfectas para competición y entrenamiento.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dIADXyiXhgpkLxBv.jpg",
    amazonUrl: "https://amzn.to/4ky7xE2",
    price: "€75,00",
    badge: "Más Vendido"
  },
  {
    title: "Speedo Swimming Kickboard",
    description: "Tabla ergonómica para mejorar técnica de piernas. Material resistente al cloro.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/eklFkYVPbkHXWHcv.jpg",
    amazonUrl: "https://amzn.to/3OGlOCI",
    price: "€25,99"
  },
  {
    title: "Arena Powerfin Pro II Training Fins",
    description: "Aletas cortas para mejorar potencia y técnica. Recomendadas por entrenadores.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/OJkaStlHPPJPCHAI.jpg",
    amazonUrl: "https://amzn.to/465OU4q",
    price: "€60,00"
  }
];

export const OPEN_WATER_PRODUCTS: AffiliateProduct[] = [
  {
    title: "Zone3 Swim Safety Buoy / Dry Bag (28L)",
    description: "Boya de alta visibilidad con compartimento estanco. Esencial para aguas abiertas.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/SVOFMiWIIokyUpnJ.jpg",
    amazonUrl: "https://amzn.to/4rPKyqA",
    price: "€38,00",
    badge: "Seguridad"
  },
  {
    title: "Aqua Sphere Kayenne Swim Goggles",
    description: "Lentes grandes con protección UV. Máxima visibilidad en aguas abiertas.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/tYUHEnMGJqogKZVO.webp",
    amazonUrl: "https://amzn.to/4qBy9FO",
    price: "€33,01"
  },
  {
    title: "Speedo Aqua V Racing Swimming Cap",
    description: "Gorro de competición de alto rendimiento. Reduce la resistencia al agua.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/DlXwQSuAqkbAWsiK.jpg",
    amazonUrl: "https://amzn.to/467hL8F",
    price: "€30,00"
  }
];

export const COMPETITION_PRODUCTS: AffiliateProduct[] = [
  {
    title: "Arena Cobra Ultra Swipe Racing Goggles",
    description: "Gafas de competición con tecnología anti-vaho. Homologadas FINA.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dIADXyiXhgpkLxBv.jpg",
    amazonUrl: "https://amzn.to/4ky7xE2",
    price: "€75,00",
    badge: "FINA Approved"
  },
  {
    title: "FINIS Tempo Trainer Pro",
    description: "Metrónomo acuático para mejorar ritmo y frecuencia de brazada. Herramienta profesional.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/BnMwYFnPRGKqlnrT.jpg",
    amazonUrl: "https://amzn.to/4rHWNoU",
    price: "€63,95"
  },
  {
    title: "TYR Big Mesh Mummy Backpack Bag",
    description: "Mochila de malla para equipo de natación. Secado rápido y gran capacidad.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/xAavhXJwdKvdZqcf.jpg",
    amazonUrl: "https://amzn.to/4arYiAI",
    price: "€24,65"
  }
];

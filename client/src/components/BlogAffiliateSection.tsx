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
    title: "Arena Cobra Ultra Swipe Gafas de Natación",
    description: "Tecnología anti-vaho de larga duración. Perfectas para competición y entrenamiento.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dIADXyiXhgpkLxBv.jpg",
    amazonUrl: `https://www.amazon.es/dp/B0DRNXT7CP?tag=${AFFILIATE_TAG}&linkCode=ll1`,
    price: "€29,99",
    badge: "Más Vendido"
  },
  {
    title: "Speedo Kickboard Elite Tabla de Natación",
    description: "Tabla ergonómica para mejorar técnica de piernas. Material resistente al cloro.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/TgLEEIGTAlSUKZRA.jpg",
    amazonUrl: `https://www.amazon.es/dp/B00CXTFSWQ?tag=${AFFILIATE_TAG}&linkCode=ll1`,
    price: "€16,95"
  },
  {
    title: "Arena Powerfin Pro Aletas de Entrenamiento",
    description: "Aletas cortas para mejorar potencia y técnica. Recomendadas por entrenadores.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/VWVuuufAGBQGXvAP.jpg",
    amazonUrl: `https://www.amazon.es/dp/B07L5QVQXZ?tag=${AFFILIATE_TAG}&linkCode=ll1`,
    price: "€34,99"
  }
];

export const OPEN_WATER_PRODUCTS: AffiliateProduct[] = [
  {
    title: "Zone3 Neoprene Buoy Boya de Seguridad",
    description: "Boya de alta visibilidad con compartimento estanco. Esencial para aguas abiertas.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/yDtzKeCtijeeJqtf.jpg",
    amazonUrl: `https://www.amazon.es/dp/B07BQXH4YD?tag=${AFFILIATE_TAG}&linkCode=ll1`,
    price: "€24,99",
    badge: "Seguridad"
  },
  {
    title: "Aqua Sphere Kayenne Gafas Aguas Abiertas",
    description: "Lentes grandes con protección UV. Máxima visibilidad en aguas abiertas.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/bEgrihdZajYzWrJT.jpg",
    amazonUrl: `https://www.amazon.es/dp/B09FK77WW2?tag=${AFFILIATE_TAG}&linkCode=ll1`,
    price: "€27,95"
  },
  {
    title: "BodyGlide Anti-Rozaduras para Triatlón",
    description: "Protección contra rozaduras en neopreno. Imprescindible para triatletas.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/VWVuuufAGBQGXvAP.jpg",
    amazonUrl: `https://www.amazon.es/dp/B0043S06GI?tag=${AFFILIATE_TAG}&linkCode=ll1`,
    price: "€12,99"
  }
];

export const COMPETITION_PRODUCTS: AffiliateProduct[] = [
  {
    title: "Arena Cobra Ultra Swipe Gafas de Competición",
    description: "Gafas de competición con tecnología anti-vaho. Homologadas FINA.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dIADXyiXhgpkLxBv.jpg",
    amazonUrl: `https://www.amazon.es/dp/B0DRNXT7CP?tag=${AFFILIATE_TAG}&linkCode=ll1`,
    price: "€29,99",
    badge: "FINA Approved"
  },
  {
    title: "SiS Go Energy Gels Pack 30 Unidades",
    description: "Geles energéticos isotónicos. Perfectos para competición y entrenamientos largos.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/VWVuuufAGBQGXvAP.jpg",
    amazonUrl: `https://www.amazon.es/dp/B07BQXH4YD?tag=${AFFILIATE_TAG}&linkCode=ll1`,
    price: "€32,99"
  },
  {
    title: "Speedo Team Rucksack Mochila 30L",
    description: "Mochila impermeable con compartimentos separados para equipo mojado.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/VWVuuufAGBQGXvAP.jpg",
    amazonUrl: `https://www.amazon.es/dp/B07L5QVQXZ?tag=${AFFILIATE_TAG}&linkCode=ll1`,
    price: "€39,99"
  }
];

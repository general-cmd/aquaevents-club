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
    title: "Speedo Biofuse 2.0 Gafas",
    description: "Gafas cómodas con tecnología Biofuse para ajuste perfecto. Ideales para entrenamientos largos.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/jGPjkMiKTRbWJwID.png",
    amazonUrl: "https://amzn.to/46smj9R",
    price: "€75.00",
    badge: "Más Vendido"
  },
  {
    title: "Arena Powerfin Pro II",
    description: "Aletas cortas para mejorar potencia y técnica. Recomendadas por entrenadores profesionales.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/cCBVriFwuAWTHUbt.png",
    amazonUrl: "https://amzn.to/465OU4q",
    price: "€60.00"
  },
  {
    title: "FINIS Tempo Trainer Pro",
    description: "Metrónomo acuático para mejorar ritmo y frecuencia de brazada. Herramienta profesional.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/BXZlWrZwrgGrVxEm.png",
    amazonUrl: "https://amzn.to/4rHWNoU",
    price: "€63.95"
  }
];

export const OPEN_WATER_PRODUCTS: AffiliateProduct[] = [
  {
    title: "Zone3 Boya de Seguridad",
    description: "Boya de seguridad con compartimento estanco de 28L. Esencial para aguas abiertas.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/hlDbjoemJftSGTFG.png",
    amazonUrl: "https://amzn.to/4rPKyqA",
    price: "€38.00",
    badge: "Seguridad"
  },
  {
    title: "Aqua Sphere Kayenne",
    description: "Gafas estilo máscara para aguas abiertas. Visión panorámica y máxima comodidad.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/SeVQMNKnyueaUmIx.png",
    amazonUrl: "https://amzn.to/4qBy9FO",
    price: "€33.01"
  },
  {
    title: "Body Glide For Her",
    description: "Bálsamo anti-rozaduras especialmente formulado. Resistente al agua y de larga duración.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/xvjfyJTxDphjkmgI.png",
    amazonUrl: "https://amzn.to/4rAUKUl",
    price: "€58.99"
  }
];

export const COMPETITION_PRODUCTS: AffiliateProduct[] = [
  {
    title: "Arena Cobra Ultra Swipe",
    description: "Gafas de competición con tecnología anti-vaho Swipe. Máximo rendimiento en carreras.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/tADKuTrxoagLdzWJ.png",
    amazonUrl: "https://amzn.to/4ky7xE2",
    price: "€75.00",
    badge: "FINA Approved"
  },
  {
    title: "Speedo Unisex Aqua V Racing Swimming Cap | Racewear",
    description: "Gorro de competición de alta calidad. Diseño hidrodinámico para máximo rendimiento.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/wmXvNVCmZVFKJsNt.png",
    amazonUrl: "https://amzn.to/467hL8F",
    price: "€30.00"
  },
  {
    title: "Arena Cobra Edge Swipe",
    description: "Gafas de competición con lentes espejadas. Tecnología anti-vaho Swipe de larga duración.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dYjjZdUJxbbNbRWm.png",
    amazonUrl: "https://amzn.to/4rUarFO",
    price: "€26.50"
  }
];

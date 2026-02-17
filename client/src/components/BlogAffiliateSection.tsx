import { ExternalLink } from "lucide-react";
import { AMAZON_PRODUCTS, type AffiliateProduct } from '@/config/affiliateConfig';

/**
 * Blog Affiliate Section Component
 * 
 * ⚠️ TO UPDATE AMAZON PRODUCTS: Edit /client/src/config/affiliateConfig.tsx
 * DO NOT edit product data in this file!
 */

// AffiliateProduct interface is now imported from affiliateConfig

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
// Products are pulled from centralized config
export const SWIMMING_TRAINING_PRODUCTS: AffiliateProduct[] = [
  { ...AMAZON_PRODUCTS.SPEEDO_BIOFUSE, badge: "Más Vendido" },
  AMAZON_PRODUCTS.ARENA_POWERFIN,
  AMAZON_PRODUCTS.FINIS_TEMPO_TRAINER
];

export const OPEN_WATER_PRODUCTS: AffiliateProduct[] = [
  { ...AMAZON_PRODUCTS.ZONE3_SAFETY_BUOY, badge: "Seguridad" },
  AMAZON_PRODUCTS.AQUA_SPHERE_KAYENNE,
  AMAZON_PRODUCTS.BODY_GLIDE_HER
];

export const SWIMSUIT_PRODUCTS: AffiliateProduct[] = [
  { ...AMAZON_PRODUCTS.TURBO_SWIM_TRUNKS, badge: "Competición" },
  AMAZON_PRODUCTS.ARENA_COBRA_ULTRA,
  AMAZON_PRODUCTS.SPEEDO_RACING_CAP
];

export const COMPETITION_PRODUCTS: AffiliateProduct[] = [
  { ...AMAZON_PRODUCTS.ARENA_COBRA_ULTRA, badge: "FINA Approved" },
  AMAZON_PRODUCTS.SPEEDO_RACING_CAP,
  AMAZON_PRODUCTS.ARENA_COBRA_EDGE
];

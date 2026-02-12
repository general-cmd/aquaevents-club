import { ExternalLink } from "lucide-react";

/**
 * Affiliate Product Card Component
 * Displays Amazon affiliate products with proper disclosure and tracking
 */

export interface AffiliateProduct {
  title: string;
  description: string;
  imageUrl: string;
  amazonUrl: string; // Full Amazon URL with affiliate tag
  price: string;
  rating?: number;
  reviewCount?: number;
}

interface AffiliateProductCardProps {
  product: AffiliateProduct;
  className?: string;
}

export default function AffiliateProductCard({ product, className = "" }: AffiliateProductCardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      {/* Product Image */}
      <div className="relative bg-gray-50 aspect-square">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-contain p-4"
          loading="lazy"
        />
        {/* Affiliate Badge */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          Recomendado
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-sm">
                  {i < Math.floor(product.rating!) ? "★" : "☆"}
                </span>
              ))}
            </div>
            {product.reviewCount && (
              <span className="text-xs text-gray-500">
                ({product.reviewCount.toLocaleString()})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
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

        {/* Affiliate Disclosure */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          Enlace de afiliado
        </p>
      </div>
    </div>
  );
}

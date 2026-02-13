import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface PopupProduct {
  title: string;
  description: string;
  imageUrl: string;
  amazonUrl: string;
  price: string;
  rating?: number;
  reviewCount?: number;
}

interface ProductCarouselPopupProps {
  products: PopupProduct[];
  title?: string;
  subtitle?: string;
  onClose?: () => void;
}

/**
 * Product Carousel Pop-up Component
 * Displays Amazon affiliate products in a carousel format to drive impulse purchases
 * Triggered by scroll depth or time on page
 */
export default function ProductCarouselPopup({
  products,
  title = "¿Necesitas equipo para este evento?",
  subtitle = "Productos recomendados para mejorar tu rendimiento",
  onClose
}: ProductCarouselPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const currentProduct = products[currentIndex];

  if (!isVisible || products.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl mx-4 animate-in slide-in-from-bottom duration-300">
        <Card className="border-2 border-blue-200 shadow-2xl">
          <CardContent className="p-0">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 rounded-t-lg">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <p className="text-blue-100">{subtitle}</p>
            </div>

            {/* Carousel Content */}
            <div className="p-8">
              <div className="flex items-center gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0 w-48 h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={currentProduct.imageUrl}
                    alt={currentProduct.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {currentProduct.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {currentProduct.description}
                  </p>

                  {/* Rating */}
                  {currentProduct.rating && currentProduct.reviewCount && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(currentProduct.rating!)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {currentProduct.rating} ({currentProduct.reviewCount.toLocaleString()})
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="text-3xl font-bold text-blue-600 mb-4">
                    {currentProduct.price}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={currentProduct.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-block w-full"
                  >
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Ver en Amazon
                    </Button>
                  </a>
                </div>
              </div>

              {/* Carousel Navigation */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>

                <div className="flex items-center gap-2">
                  {products.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-blue-600 w-8"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Ir al producto ${index + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 text-center mt-4">
                Enlaces de afiliado de Amazon. Ganamos una comisión por compras cualificadas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

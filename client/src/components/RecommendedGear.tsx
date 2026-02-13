import AffiliateProductCard, { AffiliateProduct } from "./AffiliateProductCard";

/**
 * Recommended Gear Component
 * Displays contextual Amazon affiliate products based on event discipline
 */

const AFFILIATE_TAG = "aquaevents00d-21";

// Product database with high-converting items
const PRODUCTS: Record<string, AffiliateProduct[]> = {
  // Pool Swimming Products
  pool: [
    {
      title: "Arena Cobra Ultra Swipe Gafas de Natación",
      description: "Tecnología anti-vaho de larga duración. Perfectas para competición y entrenamiento.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dIADXyiXhgpkLxBv.jpg",
      amazonUrl: `https://www.amazon.es/dp/B0DRNXT7CP?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€29,99",
      rating: 4.6,
      reviewCount: 2847
    },
    {
      title: "Speedo Kickboard Elite Tabla de Natación",
      description: "Tabla ergonómica para mejorar técnica de piernas. Material resistente al cloro.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/TgLEEIGTAlSUKZRA.jpg",
      amazonUrl: `https://www.amazon.es/dp/B00CXTFSWQ?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€16,95",
      rating: 4.7,
      reviewCount: 1523
    },
    {
      title: "Arena Powerfin Pro Aletas de Entrenamiento",
      description: "Aletas cortas para mejorar potencia y técnica. Recomendadas por entrenadores profesionales.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/MTfqHGwWewNPXXhl.jpg",
      amazonUrl: `https://www.amazon.es/dp/B07L5QVQXZ?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€34,99",
      rating: 4.5,
      reviewCount: 892
    }
  ],

  // Open Water / Triathlon Products
  openWater: [
    {
      title: "Zone3 Neoprene Buoy Boya de Seguridad",
      description: "Boya de natación de alta visibilidad con compartimento estanco. Esencial para aguas abiertas.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/yDtzKeCtijeeJqtf.jpg",
      amazonUrl: `https://www.amazon.es/dp/B07BQXH4YD?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€24,99",
      rating: 4.6,
      reviewCount: 1247
    },
    {
      title: "Aqua Sphere Kayenne Gafas Aguas Abiertas",
      description: "Lentes grandes con protección UV. Máxima visibilidad en aguas abiertas.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/apyEizadNgXIFRTI.jpg",
      amazonUrl: `https://www.amazon.es/dp/B00CXTFSWQ?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€27,95",
      rating: 4.7,
      reviewCount: 3421
    },
    {
      title: "BodyGlide Anti-Rozaduras para Triatlón",
      description: "Protección contra rozaduras en neopreno. Imprescindible para triatletas.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/VWVuuufAGBQGXvAP.jpg",
      amazonUrl: `https://www.amazon.es/dp/B0043S06GI?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€12,99",
      rating: 4.8,
      reviewCount: 5632
    }
  ],

  // Waterpolo Products
  waterpolo: [
    {
      title: "Turbo Waterpolo Cap Gorro Profesional",
      description: "Gorro de waterpolo con protección auricular reforzada. Homologado FINA.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/VWVuuufAGBQGXvAP.jpg",
      amazonUrl: `https://www.amazon.es/dp/B09FK77WW2?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€18,99",
      rating: 4.5,
      reviewCount: 687
    },
    {
      title: "Arena Cobra Ultra Swipe Gafas de Natación",
      description: "Tecnología anti-vaho de larga duración. Perfectas para competición y entrenamiento.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dIADXyiXhgpkLxBv.jpg",
      amazonUrl: `https://www.amazon.es/dp/B0DRNXT7CP?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€29,99",
      rating: 4.6,
      reviewCount: 2847
    },
    {
      title: "Speedo Team Rucksack Mochila 30L",
      description: "Mochila impermeable con compartimentos separados para equipo mojado.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/VWVuuufAGBQGXvAP.jpg",
      amazonUrl: `https://www.amazon.es/dp/B07L5QVQXZ?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€39,99",
      rating: 4.7,
      reviewCount: 1834
    }
  ],

  // Artistic Swimming Products
  artistic: [
    {
      title: "Speedo Aquapure Gafas Natación Sincronizada",
      description: "Gafas de bajo perfil para natación artística. Ajuste seguro y cómodo.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/apyEizadNgXIFRTI.jpg",
      amazonUrl: `https://www.amazon.es/dp/B00CXTFSWQ?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€19,99",
      rating: 4.5,
      reviewCount: 432
    },
    {
      title: "Arena Cobra Ultra Swipe Gafas de Natación",
      description: "Tecnología anti-vaho de larga duración. Perfectas para competición y entrenamiento.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dIADXyiXhgpkLxBv.jpg",
      amazonUrl: `https://www.amazon.es/dp/B0DRNXT7CP?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€29,99",
      rating: 4.6,
      reviewCount: 2847
    },
    {
      title: "Speedo Kickboard Elite Tabla de Natación",
      description: "Tabla ergonómica para mejorar técnica de piernas. Material resistente al cloro.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/TgLEEIGTAlSUKZRA.jpg",
      amazonUrl: `https://www.amazon.es/dp/B00CXTFSWQ?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€16,95",
      rating: 4.7,
      reviewCount: 1523
    }
  ],

  // Universal products (fallback)
  default: [
    {
      title: "Arena Cobra Ultra Swipe Gafas de Natación",
      description: "Tecnología anti-vaho de larga duración. Perfectas para competición y entrenamiento.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dIADXyiXhgpkLxBv.jpg",
      amazonUrl: `https://www.amazon.es/dp/B0DRNXT7CP?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€29,99",
      rating: 4.6,
      reviewCount: 2847
    },
    {
      title: "Speedo Kickboard Elite Tabla de Natación",
      description: "Tabla ergonómica para mejorar técnica de piernas. Material resistente al cloro.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/TgLEEIGTAlSUKZRA.jpg",
      amazonUrl: `https://www.amazon.es/dp/B00CXTFSWQ?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€16,95",
      rating: 4.7,
      reviewCount: 1523
    },
    {
      title: "SiS Go Energy Gels Pack 30 Unidades",
      description: "Geles energéticos isotónicos. Perfectos para competición y entrenamientos largos.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/VWVuuufAGBQGXvAP.jpg",
      amazonUrl: `https://www.amazon.es/dp/B07BQXH4YD?tag=${AFFILIATE_TAG}&linkCode=ll1`,
      price: "€32,99",
      rating: 4.6,
      reviewCount: 2134
    }
  ]
};

interface RecommendedGearProps {
  discipline?: string; // "natacion", "aguas abiertas", "triatlon", "waterpolo", "artistica"
  eventName?: string;
  className?: string;
}

export default function RecommendedGear({ discipline, eventName, className = "" }: RecommendedGearProps) {
  // Determine which products to show based on discipline
  const getProducts = (): AffiliateProduct[] => {
    if (!discipline) return PRODUCTS.default;

    const lowerDiscipline = discipline.toLowerCase();
    
    // Open water / Triathlon
    if (
      lowerDiscipline.includes("aguas abiertas") ||
      lowerDiscipline.includes("open water") ||
      lowerDiscipline.includes("triatl") ||
      lowerDiscipline.includes("aquatl") ||
      lowerDiscipline.includes("travesía")
    ) {
      return PRODUCTS.openWater;
    }

    // Waterpolo
    if (lowerDiscipline.includes("waterpolo") || lowerDiscipline.includes("water polo")) {
      return PRODUCTS.waterpolo;
    }

    // Artistic Swimming
    if (
      lowerDiscipline.includes("artística") ||
      lowerDiscipline.includes("sincronizada") ||
      lowerDiscipline.includes("artistic")
    ) {
      return PRODUCTS.artistic;
    }

    // Pool swimming (default for natacion)
    if (lowerDiscipline.includes("natación") || lowerDiscipline.includes("natacion")) {
      return PRODUCTS.pool;
    }

    return PRODUCTS.default;
  };

  const products = getProducts();

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 ${className}`}>
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Material Recomendado para {discipline || "Nadadores"}
        </h2>
        <p className="text-gray-600 text-sm">
          Productos esenciales seleccionados por nadadores profesionales. 
          <span className="text-blue-600 font-medium"> Envío rápido con Amazon Prime.</span>
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <AffiliateProductCard key={index} product={product} />
        ))}
      </div>

      {/* Disclosure */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          💡 Como Afiliado de Amazon, AquaEvents.club obtiene ingresos por compras cualificadas
        </p>
      </div>
    </div>
  );
}

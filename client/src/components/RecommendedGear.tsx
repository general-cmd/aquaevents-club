import AffiliateProductCard, { AffiliateProduct } from "./AffiliateProductCard";

/**
 * Recommended Gear Component
 * Displays contextual Amazon affiliate products based on event discipline
 * Updated with official Amazon affiliate links
 */

// Product database with high-converting items
const PRODUCTS: Record<string, AffiliateProduct[]> = {
  // Pool Swimming Products
  pool: [
    {
      title: "Speedo Biofuse 2.0 Gafas",
      description: "Gafas cómodas con tecnología Biofuse para ajuste perfecto. Ideales para entrenamientos largos.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/ohMdDoogAyLszFkv.jpg",
      amazonUrl: "https://amzn.to/46smj9R",
      price: "€75,00",
      rating: 4.6,
      reviewCount: 1047
    },
    {
      title: "Speedo Tabla de Natación",
      description: "Tabla ergonómica para mejorar técnica de piernas. Material resistente al cloro.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/eklFkYVPbkHXWHcv.jpg",
      amazonUrl: "https://amzn.to/3OGlOCI",
      price: "€25,99",
      rating: 4.6,
      reviewCount: 955
    },
    {
      title: "Arena Powerfin Pro II",
      description: "Aletas cortas para mejorar potencia y técnica. Recomendadas por entrenadores profesionales.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/OJkaStlHPPJPCHAI.jpg",
      amazonUrl: "https://amzn.to/465OU4q",
      price: "€60,00",
      rating: 4.6,
      reviewCount: 850
    },
    {
      title: "Speedo Tech Paddle",
      description: "Palas técnicas para mejorar fuerza de brazos. Diseño ergonómico sin correas.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/sRFQaWKFZiMDwbiR.jpg",
      amazonUrl: "https://amzn.to/46RHZMu",
      price: "€22,35",
      rating: 4.5,
      reviewCount: 750
    },
    {
      title: "Arena Pullkick Pro",
      description: "Pull buoy y kickboard 2 en 1 para entrenamientos versátiles. Ideal para mejorar técnica.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/FPGnBFdnjuxSMAcP.jpg",
      amazonUrl: "https://amzn.to/3ZBw8OS",
      price: "€80,00",
      rating: 4.6,
      reviewCount: 46
    },
    {
      title: "Focevi Snorkel Natación",
      description: "Tubo frontal para entrenar técnica sin girar la cabeza. Mejora la posición del cuerpo.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/bMimtYkdUOWJJbQC.jpg",
      amazonUrl: "https://amzn.to/4rAUbKd",
      price: "€19,99",
      rating: 4.5,
      reviewCount: 3125
    },
    {
      title: "FINIS Tempo Trainer Pro",
      description: "Metrónomo acuático para mejorar ritmo y frecuencia de brazada. Herramienta profesional.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/BnMwYFnPRGKqlnrT.jpg",
      amazonUrl: "https://amzn.to/4rHWNoU",
      price: "€63,95",
      rating: 4.2,
      reviewCount: 2067
    },
    {
      title: "Arena Cobra Ultra Swipe",
      description: "Gafas de competición con tecnología anti-vaho Swipe. Máximo rendimiento en carreras.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dIADXyiXhgpkLxBv.jpg",
      amazonUrl: "https://amzn.to/4ky7xE2",
      price: "€75,00",
      rating: 4.6,
      reviewCount: 1047
    },
    {
      title: "TYR Big Mesh Mummy",
      description: "Mochila de malla para equipo de natación. Secado rápido y gran capacidad.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/xAavhXJwdKvdZqcf.jpg",
      amazonUrl: "https://amzn.to/4arYiAI",
      price: "€24,65",
      rating: 4.7,
      reviewCount: 4359
    }
  ],

  // Open Water / Triathlon Products
  openWater: [
    {
      title: "Zone3 Boya de Seguridad",
      description: "Boya de seguridad con compartimento estanco de 28L. Esencial para aguas abiertas.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/SVOFMiWIIokyUpnJ.jpg",
      amazonUrl: "https://amzn.to/4rPKyqA",
      price: "€38,00",
      rating: 4.3,
      reviewCount: 585
    },
    {
      title: "Aqua Sphere Kayenne",
      description: "Lentes grandes con protección UV. Máxima visibilidad en aguas abiertas.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/apyEizadNgXIFRTI.jpg",
      amazonUrl: "https://amzn.to/4qBy9FO",
      price: "€33,01",
      rating: 4.3,
      reviewCount: 608
    },
    {
      title: "Speedo Unisex Aqua V Racing Swimming Cap",
      description: "Gorro de competición de alto rendimiento. Reduce la resistencia al agua.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/DlXwQSuAqkbAWsiK.jpg",
      amazonUrl: "https://amzn.to/467hL8F",
      price: "€30,00",
      rating: 4.4,
      reviewCount: 83
    },
    {
      title: "Body Glide For Her",
      description: "Protección anti-rozaduras especialmente formulada. Resistente al agua.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/DlXwQSuAqkbAWsiK.jpg",
      amazonUrl: "https://amzn.to/4rAUKUl",
      price: "€58,99",
      rating: 4.5,
      reviewCount: 25858
    },
    {
      title: "ZONE3 Heat Tech Neoprene Shoes",
      description: "Escarpines de neopreno con tecnología térmica. Protección y calor en aguas frías.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/sUWzadmGkORSXrkl.jpg",
      amazonUrl: "https://amzn.to/4qFIeBA",
      price: "€44,05",
      rating: 4.3,
      reviewCount: 163
    }
  ],

  // Waterpolo Products
  waterpolo: [
    {
      title: "Arena Cobra Ultra Swipe Racing Goggles",
      description: "Gafas de competición con tecnología anti-vaho Swipe. Perfectas para waterpolo.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dIADXyiXhgpkLxBv.jpg",
      amazonUrl: "https://amzn.to/4ky7xE2",
      price: "€75,00",
      rating: 4.6,
      reviewCount: 2847
    },
    {
      title: "Speedo Kickboard (Tangerine/Blue)",
      description: "Tabla ergonómica para entrenamientos de waterpolo. Material resistente.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/eklFkYVPbkHXWHcv.jpg",
      amazonUrl: "https://amzn.to/4cqb7xZ",
      price: "€16,95",
      rating: 4.7,
      reviewCount: 1834
    },
    {
      title: "Arena Team Mesh Bag (Pool Gear Bag)",
      description: "Bolsa de malla para equipo de waterpolo. Secado rápido y gran capacidad.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/YHvaPvbWypHHBLGm.jpg",
      amazonUrl: "https://amzn.to/4ailOS3",
      price: "€19,99",
      rating: 4.7,
      reviewCount: 1543
    }
  ],

  // Artistic Swimming Products
  artistic: [
    {
      title: "Speedo Biofuse 2.0 Goggles (Clear/Smoke)",
      description: "Gafas de bajo perfil para natación artística. Ajuste seguro y cómodo.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/ohMdDoogAyLszFkv.jpg",
      amazonUrl: "https://amzn.to/4cugVXj",
      price: "€16,99",
      rating: 4.5,
      reviewCount: 432
    },
    {
      title: "Arena Cobra Edge Swipe Mirror Goggles",
      description: "Gafas con lentes espejo para natación artística. Tecnología anti-vaho de larga duración.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/eRueXeUtwMPdjbHt.webp",
      amazonUrl: "https://amzn.to/4rUarFO",
      price: "€32,99",
      rating: 4.6,
      reviewCount: 2847
    },
    {
      title: "Speedo Swimming Kickboard",
      description: "Tabla ergonómica para mejorar técnica. Material resistente al cloro.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/eklFkYVPbkHXWHcv.jpg",
      amazonUrl: "https://amzn.to/3OGlOCI",
      price: "€25,99",
      rating: 4.7,
      reviewCount: 1523
    }
  ],

  // Universal products (fallback)
  default: [
    {
      title: "Speedo Biofuse 2.0 Swim Goggles",
      description: "Gafas cómodas con tecnología Biofuse para ajuste perfecto. Ideales para todo tipo de nadadores.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/ohMdDoogAyLszFkv.jpg",
      amazonUrl: "https://amzn.to/46smj9R",
      price: "€75,00",
      rating: 4.6,
      reviewCount: 2847
    },
    {
      title: "Speedo Tabla de Natación",
      description: "Tabla ergonómica para mejorar técnica de piernas. Material resistente al cloro.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/eklFkYVPbkHXWHcv.jpg",
      amazonUrl: "https://amzn.to/3OGlOCI",
      price: "€25,99",
      rating: 4.6,
      reviewCount: 955
    },
    {
      title: "FINIS Tempo Trainer Pro",
      description: "Metrónomo acuático para mejorar ritmo y frecuencia de brazada. Herramienta profesional.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/BnMwYFnPRGKqlnrT.jpg",
      amazonUrl: "https://amzn.to/4rHWNoU",
      price: "€63,95",
      rating: 4.2,
      reviewCount: 2067
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

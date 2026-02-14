import { Card, CardContent } from "@/components/ui/card";

/**
 * Recommended Gear Component
 * Displays contextual Amazon affiliate products based on event discipline
 * Updated with official Amazon affiliate links from verified Google Sheet data
 */

// Product database with high-converting items
const PRODUCTS: Record<string, AffiliateProduct[]> = {
  // Pool Products
  pool: [
    {
      title: "Speedo Biofuse 2.0 Gafas",
      description: "Gafas cómodas con tecnología Biofuse para ajuste perfecto. Ideales para entrenamientos largos.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/jGPjkMiKTRbWJwID.png",
      amazonUrl: "https://amzn.to/46smj9R",
      price: "€75.00",
      rating: 4.6,
      reviewCount: 1047
    },
    {
      title: "Speedo Tabla de Natación",
      description: "Tabla ergonómica para mejorar técnica de piernas. Material resistente al cloro.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/usootFBPeYgHfrXL.png",
      amazonUrl: "https://amzn.to/3OGlOCI",
      price: "€25.99",
      rating: 4.6,
      reviewCount: 952
    },
    {
      title: "Arena Powerfin Pro II",
      description: "Aletas cortas para mejorar potencia y técnica. Recomendadas por entrenadores profesionales.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/cCBVriFwuAWTHUbt.png",
      amazonUrl: "https://amzn.to/465OU4q",
      price: "€60.00",
      rating: 4.6,
      reviewCount: 850
    },
    {
      title: "Speedo Tech Paddle",
      description: "Palas técnicas para mejorar fuerza de brazos. Diseño ergonómico sin correas.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/lJoLEQfXERNGevqq.png",
      amazonUrl: "https://amzn.to/46RHZMu",
      price: "€22.35",
      rating: 4.5,
      reviewCount: 750
    },
    {
      title: "Focevi Snorkel Natación",
      description: "Tubo frontal para entrenar técnica sin girar la cabeza. Mejora la posición del cuerpo.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/OVOPsfnySgNCTypj.png",
      amazonUrl: "https://amzn.to/4rAUbKd",
      price: "€19.99",
      rating: 4.5,
      reviewCount: 3125
    },
    {
      title: "FINIS Tempo Trainer Pro",
      description: "Metrónomo acuático para mejorar ritmo y frecuencia de brazada. Herramienta profesional.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/BXZlWrZwrgGrVxEm.png",
      amazonUrl: "https://amzn.to/4rHWNoU",
      price: "€63.95",
      rating: 4.2,
      reviewCount: 2067
    },
    {
      title: "Speedo Unisex Aqua V Racing Swimming Cap | Racewear",
      description: "Gorro de competición de alta calidad. Diseño hidrodinámico para máximo rendimiento.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/wmXvNVCmZVFKJsNt.png",
      amazonUrl: "https://amzn.to/467hL8F",
      price: "€30.00",
      rating: 4.4,
      reviewCount: 83
    },
    {
      title: "TYR Big Mesh Mummy",
      description: "Mochila de malla para equipo de natación. Secado rápido y gran capacidad.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/NVWRTknHRrttvrus.png",
      amazonUrl: "https://amzn.to/4arYiAI",
      price: "€24.65",
      rating: 4.7,
      reviewCount: 4359
    }
  ],

  // Open Water Products
  openWater: [
    {
      title: "Zone3 Boya de Seguridad",
      description: "Boya de seguridad con compartimento estanco de 28L. Esencial para aguas abiertas.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/hlDbjoemJftSGTFG.png",
      amazonUrl: "https://amzn.to/4rPKyqA",
      price: "€38.00",
      rating: 4.3,
      reviewCount: 5857
    },
    {
      title: "Aqua Sphere Kayenne",
      description: "Gafas estilo máscara para aguas abiertas. Visión panorámica y máxima comodidad.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/SeVQMNKnyueaUmIx.png",
      amazonUrl: "https://amzn.to/4qBy9FO",
      price: "€33.01",
      rating: 4.3,
      reviewCount: 608
    },
    {
      title: "Body Glide For Her",
      description: "Bálsamo anti-rozaduras especialmente formulado. Resistente al agua y de larga duración.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/xvjfyJTxDphjkmgI.png",
      amazonUrl: "https://amzn.to/4rAUKUl",
      price: "€58.99",
      rating: 4.5,
      reviewCount: 25858
    },
    {
      title: "ORCA Openwater Core for Men, Black High Visibility, Warm",
      description: "Neopreno de alta visibilidad para aguas abiertas. Diseño térmico para aguas frías.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/uctYhezcOUQGNRTq.png",
      amazonUrl: "https://amzn.to/4tCh413",
      price: "€465.00",
      rating: 4.3,
      reviewCount: 34
    },
    {
      title: "ZONE3 Heat Tech Neoprene Shoes Heat Tech Unisex Adult",
      description: "Escarpines de neopreno térmicos. Protección y calor para pies en aguas frías.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/eVjehAOAMjTcFrdz.png",
      amazonUrl: "https://amzn.to/4qFIeBA",
      price: "€44.05",
      rating: 4.3,
      reviewCount: 163
    }
  ],

  // Competition Products
  competition: [
    {
      title: "Arena Cobra Edge Swipe",
      description: "Gafas de competición con lentes espejadas. Tecnología anti-vaho Swipe de larga duración.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dYjjZdUJxbbNbRWm.png",
      amazonUrl: "https://amzn.to/4rUarFO",
      price: "€26.50",
      rating: 4.6,
      reviewCount: 19
    },
    {
      title: "Arena Cobra Ultra Swipe",
      description: "Gafas de competición con tecnología anti-vaho Swipe. Máximo rendimiento en carreras.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/tADKuTrxoagLdzWJ.png",
      amazonUrl: "https://amzn.to/4ky7xE2",
      price: "€75.00",
      rating: 4.6,
      reviewCount: 1047
    },
    {
      title: "Arena Pullkick Pro",
      description: "Pull buoy y kickboard 2 en 1 para entrenamientos versátiles. Ideal para mejorar técnica.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/TiZnYrgoauGYoUoH.png",
      amazonUrl: "https://amzn.to/3ZBw8OS",
      price: "€80.00",
      rating: 4.6,
      reviewCount: 46
    },
    {
      title: "Speedo Unisex Biofuse 2.0 Swimming Goggles",
      description: "Gafas versátiles con tecnología Biofuse. Perfectas para entrenamientos y competiciones.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/rnOcfhcUHkgNOnCB.png",
      amazonUrl: "https://amzn.to/4cugVXj",
      price: "€25.00",
      rating: 4.4,
      reviewCount: 13713
    }
  ],

  // Training Products
  training: [
    {
      title: "Pull Kick de Espuma Elite",
      description: "Pull buoy de espuma de alta densidad. Mejora la técnica de brazos y flotabilidad.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/mvqjjWEprqbvtPzA.png",
      amazonUrl: "https://amzn.to/4cqb7xZ",
      price: "€30.03",
      rating: 4.5,
      reviewCount: 75
    },
    {
      title: "SiS Science In Sport GO Isotonic Energy Gels, 22g Carb",
      description: "Geles energéticos isotónicos para rendimiento deportivo. 22g de carbohidratos por gel.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/KXGotYyaqFQdankY.png",
      amazonUrl: "https://amzn.to/40b5JaG",
      price: "€52.86",
      rating: 4.2,
      reviewCount: 4524
    },
    {
      title: "Orca Men's Openwater Core TRN - Black - Warm Thermal",
      description: "Neopreno de entrenamiento para aguas abiertas. Diseño térmico para sesiones largas.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/BJRKdwRnFqjVHZsZ.png",
      amazonUrl: "https://amzn.to/4bV0ovk",
      price: "€639.63",
      rating: 4.7,
      reviewCount: 47
    },
    {
      title: "TurboTronic Pop Turbo Swim Trunks for Men Unisex Adult",
      description: "Bañador de competición de alta calidad. Diseño hidrodinámico y resistente al cloro.",
      imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/TNdwDhoAMkQUYhkk.png",
      amazonUrl: "https://amzn.to/4ailOS3",
      price: "€32.70",
      rating: 3.8,
      reviewCount: 70
    }
  ]
};

interface AffiliateProduct {
  title: string;
  description: string;
  imageUrl: string;
  amazonUrl: string;
  price: string;
  rating: number;
  reviewCount: number;
}

interface RecommendedGearProps {
  discipline?: string;
}

export default function RecommendedGear({ discipline = "pool" }: RecommendedGearProps) {
  // Map event disciplines to product categories
  const categoryMap: Record<string, string> = {
    "natación": "pool",
    "aguas abiertas": "openWater",
    "triatlón": "openWater",
    "waterpolo": "pool",
    "natación artística": "competition",
    "salvamento": "openWater",
    "masters": "competition",
    "infantil": "training",
    "juvenil": "training",
    "absoluta": "competition",
  };

  const category = categoryMap[discipline.toLowerCase()] || "pool";
  const products = PRODUCTS[category] || PRODUCTS.pool;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Material Recomendado</h2>
      <p className="text-muted-foreground mb-6">
        Encuentra el mejor equipo para tu entrenamiento y competiciones. Enlaces de afiliado de Amazon.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer sponsored" className="block">
              <div className="aspect-square relative bg-gray-100">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
                  </div>
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                </div>
                
                <button className="w-full bg-[#FF9900] hover:bg-[#FA8900] text-white font-medium py-2 px-4 rounded transition-colors">
                  Ver en Amazon
                </button>
              </CardContent>
            </a>
          </Card>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground mt-4 text-center">
        Como asociado de Amazon, AquaEvents.club gana comisiones por compras calificadas.
      </p>
    </div>
  );
}

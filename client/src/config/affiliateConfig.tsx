/**
 * AFFILIATE CONFIGURATION FILE
 * 
 * ⚠️ IMPORTANT: This is the ONLY file you need to edit when updating affiliate offers
 * 
 * When Amazon products or Awin banners change:
 * 1. Update the relevant section below
 * 2. Save the file
 * 3. Push to GitHub
 * 
 * DO NOT edit individual component files - all affiliate content is managed here!
 */

// ============================================================================
// AWIN 365RIDER BANNER CONFIGURATION
// ============================================================================
// Update this section when 365Rider changes their promotional banner

export const AWIN_BANNER_CONFIG = {
  // Replace the entire <a> tag when the offer changes
  bannerHTML: `
    <!-- START ADVERTISER: 365Rider from awin.com -->
    <a rel="sponsored" href="https://www.awin1.com/cread.php?s=3215850&v=26763&q=438708&r=863879">
        <img src="https://www.awin1.com/cshow.php?s=3215850&v=26763&q=438708&r=863879" border="0">
    </a>
    <!-- END ADVERTISER: 365Rider from awin.com -->
  `,
  
  // Alternative: If you have a direct image URL, update these instead
  clickUrl: "https://www.awin1.com/cread.php?s=3215850&v=26763&q=438708&r=863879",
  imageUrl: "https://www.awin1.com/cshow.php?s=3215850&v=26763&q=438708&r=863879",
  altText: "365Rider - Equipamiento para ciclismo y triatlón"
};

// ============================================================================
// AMAZON AFFILIATE TAG
// ============================================================================
// Your Amazon Associates tracking ID

export const AMAZON_AFFILIATE_TAG = "aquaevents00d-21";

// ============================================================================
// AMAZON PRODUCT DATABASE
// ============================================================================
// Update product prices, images, or links here when Amazon changes them
// All products from your verified Google Sheet

export interface AffiliateProduct {
  title: string;
  description: string;
  imageUrl: string;
  amazonUrl: string;
  price: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  asin?: string; // For reference
}

export const AMAZON_PRODUCTS = {
  // Goggles
  SPEEDO_BIOFUSE: {
    title: "Speedo Biofuse 2.0 Gafas",
    description: "Gafas cómodas con tecnología Biofuse para ajuste perfecto. Ideales para entrenamientos largos.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/JAkSQotpFjWMHEke.png",
    amazonUrl: "https://amzn.to/46smj9R",
    price: "€75.00",
    rating: 4.6,
    reviewCount: 1047,
    asin: "B0DRNXT7CP"
  },
  
  ARENA_COBRA_EDGE: {
    title: "Arena Cobra Edge Swipe",
    description: "Gafas de competición con lentes espejadas. Tecnología anti-vaho Swipe de larga duración.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/qWBLiMBehDjKcoBZ.png",
    amazonUrl: "https://amzn.to/4rUarFO",
    price: "€26.50",
    rating: 4.6,
    reviewCount: 19,
    asin: "B0DV9G59ZY"
  },
  
  ARENA_COBRA_ULTRA: {
    title: "Arena Cobra Ultra Swipe",
    description: "Gafas de competición con tecnología anti-vaho Swipe. Máximo rendimiento en carreras.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/tADKuTrxoagLdzWJ.png",
    amazonUrl: "https://amzn.to/4ky7xE2",
    price: "€75.00",
    rating: 4.6,
    reviewCount: 1,
    asin: "B094JY7C48"
  },
  
  AQUA_SPHERE_KAYENNE: {
    title: "Aqua Sphere Kayenne",
    description: "Gafas estilo máscara para aguas abiertas. Visión panorámica y máxima comodidad.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/SeVQMNKnyueaUmIx.png",
    amazonUrl: "https://amzn.to/4qBy9FO",
    price: "€33.01",
    rating: 4.4,
    reviewCount: 4616,
    asin: "B0BMGZP9H9"
  },
  
  // Training Equipment
  SPEEDO_KICKBOARD: {
    title: "Speedo Tabla de Natación",
    description: "Tabla ergonómica para mejorar técnica de piernas. Material resistente al cloro.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/usootFBPeYgHfrXL.png",
    amazonUrl: "https://amzn.to/3OGlOCI",
    price: "€25.99",
    rating: 4.6,
    reviewCount: 952,
    asin: "B005TVYVI2"
  },
  
  ARENA_POWERFIN: {
    title: "Arena Powerfin Pro II",
    description: "Aletas cortas para mejorar potencia y técnica. Recomendadas por entrenadores profesionales.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/cCBVriFwuAWTHUbt.png",
    amazonUrl: "https://amzn.to/465OU4q",
    price: "€60.00",
    rating: 4.6,
    reviewCount: 850,
    asin: "B00LW8DZZQ"
  },
  
  SPEEDO_TECH_PADDLE: {
    title: "Speedo Tech Paddle",
    description: "Palas técnicas para mejorar fuerza de brazos. Diseño ergonómico sin correas.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/fEyFHsESzHxxhwUQ.png",
    amazonUrl: "https://amzn.to/46RHZMu",
    price: "€22.35",
    rating: 4.5,
    reviewCount: 750,
    asin: "B0D3TTB615"
  },
  
  FOCEVI_SNORKEL: {
    title: "Focevi Snorkel Natación",
    description: "Tubo frontal para entrenar técnica sin girar la cabeza. Mejora la posición del cuerpo.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/qPDaLcQGhGdJongo.png",
    amazonUrl: "https://amzn.to/4qDU3Uf",
    price: "€19.99",
    rating: 4.4,
    reviewCount: 1816,
    asin: "B0CDFL4NDV"
  },
  
  FINIS_TEMPO_TRAINER: {
    title: "FINIS Tempo Trainer Pro",
    description: "Metrónomo acuático para mejorar ritmo y frecuencia de brazada. Herramienta profesional.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/BXZlWrZwrgGrVxEm.png",
    amazonUrl: "https://amzn.to/4rHWNoU",
    price: "€63.95",
    rating: 4.7,
    reviewCount: 4370,
    asin: "B01ALX5TF6"
  },
  
  // Caps & Bags
  SPEEDO_RACING_CAP: {
    title: "Speedo Unisex Aqua V Racing Swimming Cap | Racewear",
    description: "Gorro de competición de alta calidad. Diseño hidrodinámico para máximo rendimiento.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/wmXvNVCmZVFKJsNt.png",
    amazonUrl: "https://amzn.to/467hL8F",
    price: "€30.00",
    rating: 4.4,
    reviewCount: 75,
    asin: "B084R8WTQH"
  },
  
  ARENA_MESH_BAG: {
    title: "Arena Team Mesh Bag",
    description: "Mochila de malla para equipo de natación. Secado rápido y gran capacidad.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/NVWRTknHRrttvrus.png",
    amazonUrl: "https://amzn.to/4qDMkHb",
    price: "€20.00",
    rating: 4.5,
    reviewCount: 25858,
    asin: "B01KKHGK4W"
  },
  
  // Open Water
  ZONE3_SAFETY_BUOY: {
    title: "Zone3 Boya de Seguridad",
    description: "Boya de seguridad con compartimento estanco de 28L. Esencial para aguas abiertas.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/hlDbjoemJftSGTFG.png",
    amazonUrl: "https://amzn.to/4rPKyqA",
    price: "€38.00",
    rating: 4.6,
    reviewCount: 2313,
    asin: "B08TF9RCLF"
  },
  
  BODY_GLIDE_HER: {
    title: "Body Glide For Her",
    description: "Bálsamo anti-rozaduras especialmente formulado. Resistente al agua y de larga duración.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/xvjfyJTxDphjkmgI.png",
    amazonUrl: "https://amzn.to/4rAUKUl",
    price: "€58.99",
    rating: 4.5,
    reviewCount: 1518,
    asin: "B00BEI2AHI"
  },
  
  ORCA_OPENWATER_CORE: {
    title: "ORCA Openwater Core for Men, Black High Visibility, Warm",
    description: "Neopreno de alta visibilidad para aguas abiertas. Diseño térmico para aguas frías.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/fPgxJYPUBwYZjkCV.png",
    amazonUrl: "https://amzn.to/4tCh413",
    price: "€465.00",
    rating: 4.3,
    reviewCount: 34,
    asin: "B08TF9RCLF"
  },
  
  ZONE3_NEOPRENE_SHOES: {
    title: "ZONE3 Heat Tech Neoprene Shoes Heat Tech Unisex Adult",
    description: "Escarpines de neopreno térmicos. Protección y calor para pies en aguas frías.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/jPyglFakIZvtCUes.png",
    amazonUrl: "https://amzn.to/4qFIeBA",
    price: "€44.05",
    rating: 4.3,
    reviewCount: 163,
    asin: "B01CKLKKU6"
  },
  
  // Nutrition & Performance
  SIS_ENERGY_GELS: {
    title: "SiS Science In Sport GO Isotonic Energy Gels, 22g Carb",
    description: "Geles energéticos isotónicos para rendimiento deportivo. 22g de carbohidratos por gel.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/KTXjcWViuQznMiOu.png",
    amazonUrl: "https://amzn.to/40b5JaG",
    price: "€52.86",
    rating: 4.2,
    reviewCount: 4524,
    asin: "B09MZHYGGG"
  },
  
  ORCA_CORE_TRN: {
    title: "Orca Men's Openwater Core TRN - Black - Warm Thermal",
    description: "Neopreno de entrenamiento para aguas abiertas. Diseño térmico para sesiones largas.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/KghEnHWdQTjMndhD.png",
    amazonUrl: "https://amzn.to/4bV0ovk",
    price: "€639.63",
    rating: 4.7,
    reviewCount: 47,
    asin: "B08TFSM52Q"
  },
  
  // Swimwear
  TURBO_SWIM_TRUNKS: {
    title: "TurboTronic Pop Turbo Swim Trunks for Men Unisex Adult",
    description: "Bañador de competición de alta calidad. Diseño hidrodinámico y resistente al cloro.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/TNdwDhoAMkQUYhkk.png",
    amazonUrl: "https://amzn.to/4ailOS3",
    price: "€32.70",
    rating: 3.8,
    reviewCount: 70,
    asin: "B0BK1Y38RD"
  },
  
  // Additional products from your sheet
  SPEEDO_BIOFUSE_FLEXISEAL: {
    title: "Speedo Biofuse Flexiseal Gafas de Natación Unisex Adulto",
    description: "Gafas versátiles con tecnología Biofuse. Perfectas para entrenamientos y competiciones.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/rnOcfhcUHkgNOnCB.png",
    amazonUrl: "https://amzn.to/4qCdGd0",
    price: "€22.00",
    rating: 4.5,
    reviewCount: 11631,
    asin: "B094JXKPB5"
  },
  
  SPEEDO_ELITE_PULLKICK: {
    title: "Speedo Elite Pullkick",
    description: "Pull buoy y kickboard 2 en 1 para entrenamientos versátiles. Ideal para mejorar técnica.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/TiZnYrgoauGYoUoH.png",
    amazonUrl: "https://amzn.to/4qBzNW6",
    price: "€29.95",
    rating: 4.6,
    reviewCount: 3076,
    asin: "B00QSBZKTG"
  },
  
  SPEEDO_PULLBUOY: {
    title: "Speedo Pullbuoy",
    description: "Pull buoy de espuma de alta densidad. Mejora la técnica de brazos y flotabilidad.",
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/113670411/mvqjjWEprqbvtPzA.png",
    amazonUrl: "https://amzn.to/4kw5lUz",
    price: "€16.00",
    rating: 4.6,
    reviewCount: 2695,
    asin: "B07R5BY1H3"
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get products as array for easy iteration
 */
export function getAllAmazonProducts(): AffiliateProduct[] {
  return Object.values(AMAZON_PRODUCTS);
}

/**
 * Get products by category (for filtering)
 */
export function getProductsByCategory(category: 'goggles' | 'training' | 'openwater' | 'nutrition' | 'swimwear'): AffiliateProduct[] {
  const categoryMap = {
    goggles: ['SPEEDO_BIOFUSE', 'ARENA_COBRA_EDGE', 'ARENA_COBRA_ULTRA', 'AQUA_SPHERE_KAYENNE', 'SPEEDO_BIOFUSE_FLEXISEAL'],
    training: ['SPEEDO_KICKBOARD', 'ARENA_POWERFIN', 'SPEEDO_TECH_PADDLE', 'FOCEVI_SNORKEL', 'FINIS_TEMPO_TRAINER', 'SPEEDO_ELITE_PULLKICK', 'SPEEDO_PULLBUOY'],
    openwater: ['ZONE3_SAFETY_BUOY', 'BODY_GLIDE_HER', 'ORCA_OPENWATER_CORE', 'ZONE3_NEOPRENE_SHOES', 'ORCA_CORE_TRN'],
    nutrition: ['SIS_ENERGY_GELS'],
    swimwear: ['TURBO_SWIM_TRUNKS', 'SPEEDO_RACING_CAP']
  };
  
  return categoryMap[category].map(key => AMAZON_PRODUCTS[key as keyof typeof AMAZON_PRODUCTS]);
}

/**
 * Event-specific product recommendation logic
 * Maps event types/disciplines to relevant Amazon affiliate products
 * Updated with official Amazon Associates affiliate links
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  amazonUrl: string;
  category: string;
}

export type EventType = 'pool' | 'open_water' | 'training' | 'triathlon' | 'masters' | 'youth';

/**
 * Determines event type based on event title, description, and discipline
 */
export function detectEventType(eventTitle: string, eventDescription: string = '', discipline: string = ''): EventType {
  const text = `${eventTitle} ${eventDescription} ${discipline}`.toLowerCase();
  
  // Open water indicators
  if (text.match(/aguas abiertas|open water|travesía|travesia|mar|lago|embalse|pantano/)) {
    return 'open_water';
  }
  
  // Triathlon indicators
  if (text.match(/triatlón|triatlon|triathlon|ironman|duatlón|duatlon/)) {
    return 'triathlon';
  }
  
  // Training indicators
  if (text.match(/entrenam|training|técnica|tecnica|clinic|campus|curso/)) {
    return 'training';
  }
  
  // Masters indicators
  if (text.match(/master|veterano|senior/)) {
    return 'masters';
  }
  
  // Youth indicators
  if (text.match(/infantil|alevín|alevin|benjamín|benjamin|cadete|juvenil|junior|escolar/)) {
    return 'youth';
  }
  
  // Default to pool competition
  return 'pool';
}

/**
 * Get products relevant to specific event type
 */
export function getEventSpecificProducts(eventType: EventType, count: number = 3): Product[] {
  const productDatabase: Record<EventType, Product[]> = {
    pool: [
      {
        id: 'speedo-biofuse-goggles',
        name: 'Speedo Biofuse 2.0 Gafas',
        description: 'Gafas cómodas con tecnología Biofuse para ajuste perfecto. Ideales para entrenamientos largos.',
        price: '€75,00',
        rating: 4.6,
        reviews: 1047,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/ohMdDoogAyLszFkv.jpg',
        amazonUrl: 'https://amzn.to/46smj9R',
        category: 'Gafas Competición'
      },
      {
        id: 'finis-tempo-trainer',
        name: 'FINIS Tempo Trainer Pro',
        description: 'Metrónomo acuático para mejorar ritmo y frecuencia de brazada. Herramienta profesional.',
        price: '€63,95',
        rating: 4.2,
        reviews: 2067,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/BnMwYFnPRGKqlnrT.jpg',
        amazonUrl: 'https://amzn.to/4rHWNoU',
        category: 'Entrenamiento'
      },
      {
        id: 'arena-cobra-racing',
        name: 'Arena Cobra Ultra Swipe',
        description: 'Gafas de competición con tecnología anti-vaho Swipe. Máximo rendimiento en carreras.',
        price: '€75,00',
        rating: 4.6,
        reviews: 1047,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dIADXyiXhgpkLxBv.jpg',
        amazonUrl: 'https://amzn.to/4ky7xE2',
        category: 'Gafas Competición'
      }
    ],
    open_water: [
      {
        id: 'zone3-safety-buoy',
        name: 'Zone3 Boya de Seguridad',
        description: 'Boya de seguridad con compartimento estanco de 28L. Esencial para aguas abiertas.',
        price: '€38,00',
        rating: 4.3,
        reviews: 585,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/SVOFMiWIIokyUpnJ.jpg',
        amazonUrl: 'https://amzn.to/4rPKyqA',
        category: 'Seguridad'
      },
      {
        id: 'aquasphere-kayenne',
        name: 'Aqua Sphere Kayenne',
        description: 'Lentes grandes con protección UV. Máxima visibilidad en aguas abiertas.',
        price: '€33,01',
        rating: 4.3,
        reviews: 608,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/tYUHEnMGJqogKZVO.webp',
        amazonUrl: 'https://amzn.to/4qBy9FO',
        category: 'Gafas Aguas Abiertas'
      },
      {
        id: 'bodyglide-antichafe',
        name: 'Speedo Unisex Aqua V Racing Swimming Cap',
        description: 'Gorro de competición de alto rendimiento. Reduce la resistencia al agua.',
        price: '€30,00',
        rating: 4.4,
        reviews: 83,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/DlXwQSuAqkbAWsiK.jpg',
        amazonUrl: 'https://amzn.to/467hL8F',
        category: 'Anti-rozaduras'
      }
    ],
    training: [
      {
        id: 'speedo-kickboard',
        name: 'Speedo Tabla de Natación',
        description: 'Tabla ergonómica para mejorar técnica de piernas. Material resistente al cloro.',
        price: '€25,99',
        rating: 4.6,
        reviews: 955,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/eklFkYVPbkHXWHcv.jpg',
        amazonUrl: 'https://amzn.to/3OGlOCI',
        category: 'Tablas'
      },
      {
        id: 'arena-pullkick-pro',
        name: 'Arena Pullkick Pro',
        description: 'Pull buoy y kickboard 2 en 1 para entrenamientos versátiles. Ideal para mejorar técnica.',
        price: '€80,00',
        rating: 4.6,
        reviews: 46,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/FPGnBFdnjuxSMAcP.jpg',
        amazonUrl: 'https://amzn.to/3ZBw8OS',
        category: 'Pull Buoys'
      },
      {
        id: 'speedo-tech-paddle',
        name: 'Speedo Tech Paddle',
        description: 'Palas técnicas para mejorar fuerza de brazos. Diseño ergonómico sin correas.',
        price: '€22,35',
        rating: 4.5,
        reviews: 750,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/sRFQaWKFZiMDwbiR.jpg',
        amazonUrl: 'https://amzn.to/46RHZMu',
        category: 'Palas'
      }
    ],
    triathlon: [
      {
        id: 'zone3-safety-buoy',
        name: 'Zone3 Boya de Seguridad',
        description: 'Boya de seguridad con compartimento estanco de 28L. Esencial para aguas abiertas y triatlón.',
        price: '€38,00',
        rating: 4.3,
        reviews: 585,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/SVOFMiWIIokyUpnJ.jpg',
        amazonUrl: 'https://amzn.to/4rPKyqA',
        category: 'Seguridad'
      },
      {
        id: 'arena-powerfin-pro',
        name: 'Arena Powerfin Pro II',
        description: 'Aletas cortas para mejorar potencia y técnica. Recomendadas por entrenadores profesionales.',
        price: '€63,95',
        rating: 4.6,
        reviews: 850,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/OJkaStlHPPJPCHAI.jpg',
        amazonUrl: 'https://amzn.to/465OU4q',
        category: 'Aletas'
      },
      {
        id: 'bodyglide-antichafe',
        name: 'Speedo Unisex Aqua V Racing Swimming Cap',
        description: 'Gorro de competición de alto rendimiento. Reduce la resistencia al agua.',
        price: '€30,00',
        rating: 4.4,
        reviews: 83,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/DlXwQSuAqkbAWsiK.jpg',
        amazonUrl: 'https://amzn.to/467hL8F',
        category: 'Anti-rozaduras'
      }
    ],
    masters: [
      {
        id: 'speedo-biofuse-goggles',
        name: 'Speedo Biofuse 2.0 Gafas',
        description: 'Gafas cómodas con tecnología Biofuse para ajuste perfecto. Ideales para nadadores masters.',
        price: '€75,00',
        rating: 4.6,
        reviews: 1047,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/ohMdDoogAyLszFkv.jpg',
        amazonUrl: 'https://amzn.to/46smj9R',
        category: 'Gafas'
      },
      {
        id: 'arena-pullkick-pro',
        name: 'Arena Pullkick Pro',
        description: 'Pull buoy y kickboard 2 en 1 para entrenamientos versátiles. Ideal para mejorar técnica.',
        price: '€80,00',
        rating: 4.6,
        reviews: 46,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/FPGnBFdnjuxSMAcP.jpg',
        amazonUrl: 'https://amzn.to/3ZBw8OS',
        category: 'Pull Buoys'
      },
      {
        id: 'focevi-snorkel',
        name: 'Focevi Swimming Snorkel for Swimmers',
        description: 'Tubo frontal para entrenar técnica sin girar la cabeza. Mejora la posición del cuerpo.',
        price: '€24,65',
        rating: 4.5,
        reviews: 987,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/bMimtYkdUOWJJbQC.jpg',
        amazonUrl: 'https://amzn.to/4rAUbKd',
        category: 'Tubos'
      }
    ],
    youth: [
      {
        id: 'speedo-biofuse-junior',
        name: 'Speedo Biofuse 2.0 Goggles (Clear/Smoke)',
        description: 'Gafas cómodas para jóvenes nadadores. Ajuste perfecto y tecnología anti-vaho.',
        price: '€75,00',
        rating: 4.5,
        reviews: 432,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/ohMdDoogAyLszFkv.jpg',
        amazonUrl: 'https://amzn.to/4cugVXj',
        category: 'Gafas Junior'
      },
      {
        id: 'speedo-kickboard',
        name: 'Speedo Tabla de Natación',
        description: 'Tabla ergonómica para mejorar patada y técnica de piernas. Perfecta para jóvenes.',
        price: '€25,99',
        rating: 4.6,
        reviews: 955,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/eklFkYVPbkHXWHcv.jpg',
        amazonUrl: 'https://amzn.to/3OGlOCI',
        category: 'Tablas'
      },
      {
        id: 'arena-mesh-bag',
        name: 'Arena Team Mesh Bag (Pool Gear Bag)',
        description: 'Bolsa de malla para equipo de natación. Secado rápido y gran capacidad.',
        price: '€19,99',
        rating: 4.7,
        reviews: 1543,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/YHvaPvbWypHHBLGm.jpg',
        amazonUrl: 'https://amzn.to/4ailOS3',
        category: 'Bolsas'
      }
    ]
  };
  
  const products = productDatabase[eventType] || productDatabase.pool;
  
  // Shuffle and return requested count
  const shuffled = [...products].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

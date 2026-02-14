/**
 * Event-specific product recommendation logic
 * Maps event types/disciplines to relevant Amazon affiliate products
 * Updated with official Amazon Associates affiliate links from verified Google Sheet data
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
        id: 'b0drnxt7cp',
        name: 'Speedo Biofuse 2.0 Gafas',
        description: 'Gafas cómodas con tecnología Biofuse para ajuste perfecto. Ideales para entrenamientos largos.',
        price: '€75.00',
        rating: 4.6,
        reviews: 1047,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/JAkSQotpFjWMHEke.png',
        amazonUrl: 'https://amzn.to/46smj9R',
        category: 'Gafas Competición'
      },
      {
        id: 'b005tvyvi2',
        name: 'FINIS Tempo Trainer Pro',
        description: 'Metrónomo acuático para mejorar ritmo y frecuencia de brazada. Herramienta profesional.',
        price: '€63.95',
        rating: 4.2,
        reviews: 2067,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/BXZlWrZwrgGrVxEm.png',
        amazonUrl: 'https://amzn.to/4rHWNoU',
        category: 'Entrenamiento'
      },
      {
        id: 'b07r5by1h3',
        name: 'Arena Cobra Ultra Swipe',
        description: 'Gafas de competición con tecnología anti-vaho Swipe. Máximo rendimiento en carreras.',
        price: '€75.00',
        rating: 4.6,
        reviews: 1047,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/tADKuTrxoagLdzWJ.png',
        amazonUrl: 'https://amzn.to/4ky7xE2',
        category: 'Gafas Competición'
      }
    ],
    open_water: [
      {
        id: 'b01alx5tf6',
        name: 'Zone3 Boya de Seguridad',
        description: 'Boya de seguridad con compartimento estanco de 28L. Esencial para aguas abiertas.',
        price: '€38.00',
        rating: 4.3,
        reviews: 5857,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/hlDbjoemJftSGTFG.png',
        amazonUrl: 'https://amzn.to/4rPKyqA',
        category: 'Seguridad'
      },
      {
        id: 'b084r8wtqh',
        name: 'Aqua Sphere Kayenne',
        description: 'Gafas estilo máscara para aguas abiertas. Visión panorámica y máxima comodidad.',
        price: '€33.01',
        rating: 4.3,
        reviews: 608,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/SeVQMNKnyueaUmIx.png',
        amazonUrl: 'https://amzn.to/4qBy9FO',
        category: 'Gafas Aguas Abiertas'
      },
      {
        id: 'b08tf9rclf',
        name: 'ORCA Openwater Core for Men, Black High Visibility, Warm',
        description: 'Neopreno de alta visibilidad para aguas abiertas. Diseño térmico para aguas frías.',
        price: '€465.00',
        rating: 4.3,
        reviews: 34,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/fPgxJYPUBwYZjkCV.png',
        amazonUrl: 'https://amzn.to/4tCh413',
        category: 'Neopreno'
      }
    ],
    training: [
      {
        id: 'b0bmgzp9h9',
        name: 'Arena Powerfin Pro II',
        description: 'Aletas cortas para mejorar potencia y técnica. Recomendadas por entrenadores profesionales.',
        price: '€60.00',
        rating: 4.6,
        reviews: 850,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/cCBVriFwuAWTHUbt.png',
        amazonUrl: 'https://amzn.to/465OU4q',
        category: 'Aletas'
      },
      {
        id: 'b0d3ttb615',
        name: 'Speedo Tech Paddle',
        description: 'Palas técnicas para mejorar fuerza de brazos. Diseño ergonómico sin correas.',
        price: '€22.35',
        rating: 4.5,
        reviews: 750,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/fEyFHsESzHxxhwUQ.png',
        amazonUrl: 'https://amzn.to/46RHZMu',
        category: 'Palas'
      },
      {
        id: 'b094jy7c48',
        name: 'Speedo Tabla de Natación',
        description: 'Tabla ergonómica para mejorar técnica de piernas. Material resistente al cloro.',
        price: '€25.99',
        rating: 4.6,
        reviews: 952,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/usootFBPeYgHfrXL.png',
        amazonUrl: 'https://amzn.to/3OGlOCI',
        category: 'Tablas'
      }
    ],
    triathlon: [
      {
        id: 'b01alx5tf6',
        name: 'Zone3 Boya de Seguridad',
        description: 'Boya de seguridad con compartimento estanco de 28L. Esencial para aguas abiertas y triatlón.',
        price: '€38.00',
        rating: 4.3,
        reviews: 5857,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/hlDbjoemJftSGTFG.png',
        amazonUrl: 'https://amzn.to/4rPKyqA',
        category: 'Seguridad'
      },
      {
        id: 'b084r8wtqh',
        name: 'Aqua Sphere Kayenne',
        description: 'Gafas estilo máscara para aguas abiertas. Visión panorámica y máxima comodidad.',
        price: '€33.01',
        rating: 4.3,
        reviews: 608,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/SeVQMNKnyueaUmIx.png',
        amazonUrl: 'https://amzn.to/4qBy9FO',
        category: 'Gafas Aguas Abiertas'
      },
      {
        id: 'b09mzhyggg',
        name: 'SiS Science In Sport GO Isotonic Energy Gels, 22g Carb',
        description: 'Geles energéticos isotónicos para rendimiento deportivo. 22g de carbohidratos por gel.',
        price: '€52.86',
        rating: 4.2,
        reviews: 4524,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/KTXjcWViuQznMiOu.png',
        amazonUrl: 'https://amzn.to/40b5JaG',
        category: 'Nutrición'
      }
    ],
    masters: [
      {
        id: 'b0drnxt7cp',
        name: 'Speedo Biofuse 2.0 Gafas',
        description: 'Gafas cómodas con tecnología Biofuse para ajuste perfecto. Ideales para entrenamientos largos.',
        price: '€75.00',
        rating: 4.6,
        reviews: 1047,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/JAkSQotpFjWMHEke.png',
        amazonUrl: 'https://amzn.to/46smj9R',
        category: 'Gafas Competición'
      },
      {
        id: 'b005tvyvi2',
        name: 'FINIS Tempo Trainer Pro',
        description: 'Metrónomo acuático para mejorar ritmo y frecuencia de brazada. Herramienta profesional.',
        price: '€63.95',
        rating: 4.2,
        reviews: 2067,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/BXZlWrZwrgGrVxEm.png',
        amazonUrl: 'https://amzn.to/4rHWNoU',
        category: 'Entrenamiento'
      },
      {
        id: 'b08mfhvhsg',
        name: 'Arena Pullkick Pro',
        description: 'Pull buoy y kickboard 2 en 1 para entrenamientos versátiles. Ideal para mejorar técnica.',
        price: '€80.00',
        rating: 4.6,
        reviews: 46,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/TiZnYrgoauGYoUoH.png',
        amazonUrl: 'https://amzn.to/3ZBw8OS',
        category: 'Pull Buoys'
      }
    ],
    youth: [
      {
        id: 'b094jy7c48',
        name: 'Speedo Tabla de Natación',
        description: 'Tabla ergonómica para mejorar técnica de piernas. Material resistente al cloro.',
        price: '€25.99',
        rating: 4.6,
        reviews: 952,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/usootFBPeYgHfrXL.png',
        amazonUrl: 'https://amzn.to/3OGlOCI',
        category: 'Tablas'
      },
      {
        id: 'b0bmgzp9h9',
        name: 'Arena Powerfin Pro II',
        description: 'Aletas cortas para mejorar potencia y técnica. Recomendadas por entrenadores profesionales.',
        price: '€60.00',
        rating: 4.6,
        reviews: 850,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/cCBVriFwuAWTHUbt.png',
        amazonUrl: 'https://amzn.to/465OU4q',
        category: 'Aletas'
      },
      {
        id: 'b00lw8dzzq',
        name: 'TYR Big Mesh Mummy',
        description: 'Mochila de malla para equipo de natación. Secado rápido y gran capacidad.',
        price: '€24.65',
        rating: 4.7,
        reviews: 4359,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/NVWRTknHRrttvrus.png',
        amazonUrl: 'https://amzn.to/4arYiAI',
        category: 'Mochilas'
      }
    ]
  };

  const products = productDatabase[eventType] || productDatabase.pool;
  return products.slice(0, count);
}

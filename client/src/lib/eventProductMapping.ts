/**
 * Event-specific product recommendation logic
 * Maps event types/disciplines to relevant Amazon affiliate products
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
        id: 'arena-cobra-ultra',
        name: 'Arena Cobra Ultra Swipe Gafas de Natación',
        description: 'Tecnología anti-vaho de larga duración. Perfectas para competición y entrenamiento.',
        price: '€29,99',
        rating: 4.5,
        reviews: 2847,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/yZLfNBqhTAhcPDyv.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B0DRNXT7CP?tag=aquaevents-21&linkCode=ogi&th=1&psc=1',
        category: 'Gafas Competición'
      },
      {
        id: 'finis-tempo-trainer',
        name: 'Finis Tempo Trainer Pro',
        description: 'Metrónomo para natación. Mejora ritmo y técnica de brazada.',
        price: '€39,95',
        rating: 4.7,
        reviews: 1523,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/QHjXMgAXnRIHUkXJ.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B002VVT0QQ?tag=aquaevents-21',
        category: 'Entrenamiento'
      },
      {
        id: 'speedo-racing-cap',
        name: 'Speedo Fastskin Elite Gorro de Competición',
        description: 'Gorro de silicona de competición. Reduce resistencia al agua.',
        price: '€16,95',
        rating: 4.4,
        reviews: 892,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/YMOmwvOcBtKpKMIb.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B00CXTFSWQ?tag=aquaevents-21',
        category: 'Gorros'
      }
    ],
    open_water: [
      {
        id: 'orca-wetsuit',
        name: 'Orca Openwater Core Neopreno',
        description: 'Neopreno para aguas abiertas. Máxima flotabilidad y flexibilidad.',
        price: '€189,00',
        rating: 4.6,
        reviews: 456,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/vKUQrNpgSEPNRZGe.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B0BVXZ8QYZ?tag=aquaevents-21',
        category: 'Neoprenos'
      },
      {
        id: 'speedo-aquapure-mirror',
        name: 'Speedo Aquapure Mirror Gafas Aguas Abiertas',
        description: 'Lentes espejadas para protección solar. Visión panorámica.',
        price: '€34,99',
        rating: 4.5,
        reviews: 1234,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/xvvbYCGcMQqVAOmZ.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B09FK77WW2?tag=aquaevents-21',
        category: 'Gafas Aguas Abiertas'
      },
      {
        id: 'neoprene-socks',
        name: 'Cressi Calcetines Neopreno 3mm',
        description: 'Protección térmica para pies en aguas frías.',
        price: '€19,90',
        rating: 4.3,
        reviews: 678,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/YqWPPpvbQqNdvJOy.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B00KYKQVXE?tag=aquaevents-21',
        category: 'Accesorios Neopreno'
      }
    ],
    training: [
      {
        id: 'speedo-kickboard',
        name: 'Speedo Kickboard Elite Tabla de Entrenamiento',
        description: 'Tabla ergonómica para mejorar patada y técnica de piernas.',
        price: '€16,95',
        rating: 4.4,
        reviews: 1523,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/IQxDnVEcOhEjMqJn.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B00CXTFSWQ?tag=aquaevents-21',
        category: 'Tablas'
      },
      {
        id: 'arena-pullbuoy',
        name: 'Arena Pull Buoy Pro',
        description: 'Pull buoy ergonómico. Fortalece tren superior.',
        price: '€14,99',
        rating: 4.5,
        reviews: 987,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/IUMqpUbXYUvQPnhH.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B07YNWX8QP?tag=aquaevents-21',
        category: 'Pull Buoys'
      },
      {
        id: 'speedo-hand-paddles',
        name: 'Speedo Biofuse Power Palas de Mano',
        description: 'Palas ergonómicas para desarrollar fuerza y técnica de brazada.',
        price: '€12,95',
        rating: 4.6,
        reviews: 1234,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/bqPmLQyYPnCFJPVP.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B00KYKR0RI?tag=aquaevents-21',
        category: 'Palas'
      }
    ],
    triathlon: [
      {
        id: 'orca-wetsuit',
        name: 'Orca Openwater Core Neopreno',
        description: 'Neopreno para aguas abiertas. Máxima flotabilidad y flexibilidad.',
        price: '€189,00',
        rating: 4.6,
        reviews: 456,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/vKUQrNpgSEPNRZGe.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B0BVXZ8QYZ?tag=aquaevents-21',
        category: 'Neoprenos'
      },
      {
        id: 'arena-powerfin',
        name: 'Arena Powerfin Pro Aletas de Entrenamiento',
        description: 'Aletas cortas para mejorar potencia y técnica. Recomendadas por entrenadores profesionales.',
        price: '€34,99',
        rating: 4.5,
        reviews: 892,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/vwKAHvWaXIIXLuBm.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B07YNWX8QP?tag=aquaevents-21',
        category: 'Aletas'
      },
      {
        id: 'speedo-aquapure-mirror',
        name: 'Speedo Aquapure Mirror Gafas Aguas Abiertas',
        description: 'Lentes espejadas para protección solar. Visión panorámica.',
        price: '€34,99',
        rating: 4.5,
        reviews: 1234,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/xvvbYCGcMQqVAOmZ.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B09FK77WW2?tag=aquaevents-21',
        category: 'Gafas Aguas Abiertas'
      }
    ],
    masters: [
      {
        id: 'arena-cobra-ultra',
        name: 'Arena Cobra Ultra Swipe Gafas de Natación',
        description: 'Tecnología anti-vaho de larga duración. Perfectas para competición y entrenamiento.',
        price: '€29,99',
        rating: 4.5,
        reviews: 2847,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/yZLfNBqhTAhcPDyv.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B0DRNXT7CP?tag=aquaevents-21&linkCode=ogi&th=1&psc=1',
        category: 'Gafas Competición'
      },
      {
        id: 'arena-pullbuoy',
        name: 'Arena Pull Buoy Pro',
        description: 'Pull buoy ergonómico. Fortalece tren superior.',
        price: '€14,99',
        rating: 4.5,
        reviews: 987,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/IUMqpUbXYUvQPnhH.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B07YNWX8QP?tag=aquaevents-21',
        category: 'Pull Buoys'
      },
      {
        id: 'finis-snorkel',
        name: 'Finis Tubo Frontal Swimmer',
        description: 'Tubo frontal para mejorar técnica sin girar la cabeza.',
        price: '€29,95',
        rating: 4.6,
        reviews: 1456,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/IHWJqhOCCbKbCLpv.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B001AW0E8S?tag=aquaevents-21',
        category: 'Tubos'
      }
    ],
    youth: [
      {
        id: 'speedo-junior-goggles',
        name: 'Speedo Futura Biofuse Junior Gafas',
        description: 'Gafas cómodas para jóvenes nadadores. Ajuste perfecto.',
        price: '€14,95',
        rating: 4.4,
        reviews: 1678,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/yZLfNBqhTAhcPDyv.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B00KYKQVXE?tag=aquaevents-21',
        category: 'Gafas Junior'
      },
      {
        id: 'speedo-kickboard',
        name: 'Speedo Kickboard Elite Tabla de Entrenamiento',
        description: 'Tabla ergonómica para mejorar patada y técnica de piernas.',
        price: '€16,95',
        rating: 4.4,
        reviews: 1523,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/IQxDnVEcOhEjMqJn.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B00CXTFSWQ?tag=aquaevents-21',
        category: 'Tablas'
      },
      {
        id: 'arena-mesh-bag',
        name: 'Arena Team Mesh Bolsa de Malla',
        description: 'Bolsa de malla para equipo de natación. Secado rápido.',
        price: '€19,90',
        rating: 4.5,
        reviews: 892,
        imageUrl: 'https://files.manuscdn.com/user_upload_by_module/session_file/113670411/nnJbNSuNIWvdFqIc.jpg',
        amazonUrl: 'https://www.amazon.es/dp/B00KYKR0RI?tag=aquaevents-21',
        category: 'Bolsas'
      }
    ]
  };
  
  const products = productDatabase[eventType] || productDatabase.pool;
  
  // Shuffle and return requested count
  const shuffled = [...products].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

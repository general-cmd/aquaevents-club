import { useEffect } from 'react';

interface ListItem {
  name: string;
  url: string;
  description?: string;
  image?: string;
  date?: string;
  location?: string;
}

interface ItemListSchemaProps {
  items: ListItem[];
  listName: string;
  listDescription?: string;
}

/**
 * ItemList Schema for event listings
 * Helps search engines understand collections of items
 */
export default function ItemListSchema({ items, listName, listDescription }: ItemListSchemaProps) {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": listName,
      "description": listDescription,
      "numberOfItems": items.length,
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SportsEvent",
          "name": item.name,
          "url": `https://aquaevents.club${item.url}`,
          "description": item.description,
          "image": item.image,
          "startDate": item.date,
          "location": item.location ? {
            "@type": "Place",
            "name": item.location
          } : undefined
        }
      }))
    };

    let script = document.getElementById('itemlist-schema') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'itemlist-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      const existingScript = document.getElementById('itemlist-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [items, listName, listDescription]);

  return null;
}


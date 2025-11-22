/**
 * AI SEO Enrichment for Events
 * 
 * Uses LLM to generate SEO-optimized metadata for events:
 * - Meta titles and descriptions
 * - Rich descriptions with keywords
 * - SEO-friendly slugs
 */

import { invokeLLM } from './_core/llm';

export interface EventSEOData {
  metaTitle: string;
  metaDescription: string;
  richDescription: string;
  slug: string;
  keywords: string[];
}

/**
 * Generate AI-enriched SEO metadata for an event
 */
export async function enrichEventSEO(event: {
  title: string;
  city: string;
  region: string;
  discipline: string;
  startDate: string;
  description?: string;
  category?: string;
}): Promise<EventSEOData> {
  try {
    const prompt = `Eres un experto en SEO para eventos deportivos acuáticos en España. Genera metadatos SEO optimizados para el siguiente evento:

Título: ${event.title}
Ciudad: ${event.city}
Región: ${event.region}
Disciplina: ${event.discipline}
Fecha: ${event.startDate}
Categoría: ${event.category || 'General'}
Descripción actual: ${event.description || 'No disponible'}

Genera:
1. Meta título (máx. 60 caracteres, incluye ciudad y año)
2. Meta descripción (máx. 155 caracteres, incluye fecha, ciudad, y llamada a la acción)
3. Descripción enriquecida (2-3 párrafos, incluye contexto, importancia, y detalles del evento)
4. Slug SEO-friendly (formato: nombre-evento-ciudad-año)
5. 5-7 palabras clave relevantes

Responde en formato JSON.`;

    const response = await invokeLLM({
      messages: [
        {
          role: 'system',
          content: 'Eres un experto en SEO para eventos deportivos. Generas metadatos optimizados en español para mejorar el posicionamiento en buscadores.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'event_seo',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              metaTitle: {
                type: 'string',
                description: 'Meta título optimizado (máx. 60 caracteres)'
              },
              metaDescription: {
                type: 'string',
                description: 'Meta descripción optimizada (máx. 155 caracteres)'
              },
              richDescription: {
                type: 'string',
                description: 'Descripción enriquecida del evento (2-3 párrafos)'
              },
              slug: {
                type: 'string',
                description: 'Slug SEO-friendly'
              },
              keywords: {
                type: 'array',
                items: {
                  type: 'string'
                },
                description: 'Lista de 5-7 palabras clave'
              }
            },
            required: ['metaTitle', 'metaDescription', 'richDescription', 'slug', 'keywords'],
            additionalProperties: false
          }
        }
      }
    });

    const content = response.choices[0].message.content;
    if (!content || typeof content !== 'string') {
      throw new Error('No valid content in LLM response');
    }

    const seoData: EventSEOData = JSON.parse(content);

    console.log(`[SEO Enrichment] Generated metadata for: ${event.title}`);
    return seoData;

  } catch (error) {
    console.error('[SEO Enrichment] Error generating SEO metadata:', error);
    
    // Fallback to basic SEO if AI fails
    const year = new Date(event.startDate).getFullYear();
    const slug = `${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${event.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${year}`;
    
    return {
      metaTitle: `${event.title} ${year} - ${event.city}, ${event.region}`,
      metaDescription: `${event.title} en ${event.city}, ${event.region}. Evento de ${event.discipline}. Consulta fechas e inscripciones.`,
      richDescription: event.description || `${event.title} es un evento de ${event.discipline} que se celebrará en ${event.city}, ${event.region}. Descubre todos los detalles y cómo participar en este evento deportivo acuático.`,
      slug,
      keywords: [event.discipline, event.city, event.region, event.title, 'eventos acuáticos']
    };
  }
}

/**
 * Batch enrich multiple events (for existing MongoDB events)
 */
export async function enrichMultipleEvents(events: Array<{
  title: string;
  city: string;
  region: string;
  discipline: string;
  startDate: string;
  description?: string;
  category?: string;
}>): Promise<EventSEOData[]> {
  const results: EventSEOData[] = [];
  
  for (const event of events) {
    try {
      const seoData = await enrichEventSEO(event);
      results.push(seoData);
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`[SEO Enrichment] Failed to enrich event: ${event.title}`, error);
      results.push({
        metaTitle: `${event.title} - ${event.city}`,
        metaDescription: `${event.title} en ${event.city}, ${event.region}`,
        richDescription: event.description || '',
        slug: event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        keywords: []
      });
    }
  }
  
  return results;
}


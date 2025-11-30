import { invokeLLM } from "./llm";

export interface EventContentInput {
  name: string;
  nameEn?: string;
  discipline: string;
  category: string;
  city: string;
  region: string;
  startDate: Date;
  endDate?: Date;
  venue?: string;
  organizerType: string;
  organizerName: string;
  description?: string;
  descriptionEn?: string;
}

export interface GeneratedEventContent {
  description: string;
  descriptionEn: string;
  faqItems: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * Generate SEO-optimized description and FAQ for an event using AI
 */
export async function generateEventContent(
  input: EventContentInput
): Promise<GeneratedEventContent> {
  const prompt = `Eres un experto en marketing de eventos deportivos acuáticos en España con 25 años de experiencia. 

Genera contenido SEO-optimizado para el siguiente evento:

**Nombre**: ${input.name}
**Nombre en inglés**: ${input.nameEn || "N/A"}
**Disciplina**: ${input.discipline}
**Categoría**: ${input.category}
**Ciudad**: ${input.city}, ${input.region}
**Fecha inicio**: ${input.startDate.toLocaleDateString("es-ES")}
**Fecha fin**: ${input.endDate ? input.endDate.toLocaleDateString("es-ES") : "Mismo día"}
**Recinto**: ${input.venue || "Por confirmar"}
**Organizador**: ${input.organizerName} (${input.organizerType})
**Descripción existente**: ${input.description || "No proporcionada"}

INSTRUCCIONES:

1. **Descripción en español** (200-300 palabras):
   - Comienza con una introducción atractiva sobre el evento
   - Incluye detalles sobre la disciplina (natación, triatlón, aguas abiertas, etc.)
   - Menciona la categoría (regional, nacional, internacional, popular)
   - Destaca la ubicación y sus características (instalaciones, acceso, atractivo turístico)
   - Incluye información sobre el organizador y su reputación
   - Menciona beneficios de participar (puntos para ranking, experiencia, networking)
   - Usa un tono profesional pero accesible
   - Incluye keywords naturalmente: "evento de ${input.discipline}", "${input.city}", "${input.region}", "competición", "inscripción"

2. **Descripción en inglés** (200-300 palabras):
   - Traducción adaptada (no literal) de la descripción en español
   - Orientada a nadadores internacionales que visitan España
   - Menciona aspectos turísticos de la región

3. **5 Preguntas Frecuentes (FAQ)** en español:
   - Pregunta 1: Sobre requisitos de participación (licencia federativa, edad, nivel)
   - Pregunta 2: Sobre inscripción (cómo, cuándo, precio estimado)
   - Pregunta 3: Sobre la competición (distancias, categorías, formato)
   - Pregunta 4: Sobre logística (alojamiento, transporte, horarios)
   - Pregunta 5: Sobre qué llevar o cómo prepararse

   Cada respuesta debe tener 50-100 palabras y ser específica para este tipo de evento.

IMPORTANTE:
- NO inventes fechas, precios o datos específicos que no se te hayan proporcionado
- Usa frases como "consulta con el organizador", "típicamente", "suele ser", "se recomienda" para información no confirmada
- Sé preciso con la información proporcionada (nombre, ciudad, fecha, organizador)
- El tono debe ser profesional, informativo y motivador

Devuelve SOLO un objeto JSON válido con esta estructura (sin markdown, sin comentarios):
{
  "description": "Descripción en español aquí...",
  "descriptionEn": "English description here...",
  "faqItems": [
    {
      "question": "¿Pregunta 1?",
      "answer": "Respuesta 1..."
    },
    {
      "question": "¿Pregunta 2?",
      "answer": "Respuesta 2..."
    },
    {
      "question": "¿Pregunta 3?",
      "answer": "Respuesta 3..."
    },
    {
      "question": "¿Pregunta 4?",
      "answer": "Respuesta 4..."
    },
    {
      "question": "¿Pregunta 5?",
      "answer": "Respuesta 5..."
    }
  ]
}`;

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "Eres un experto en marketing de eventos deportivos acuáticos. Generas contenido SEO-optimizado en formato JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "event_content",
          strict: true,
          schema: {
            type: "object",
            properties: {
              description: {
                type: "string",
                description: "Descripción del evento en español (200-300 palabras)",
              },
              descriptionEn: {
                type: "string",
                description: "Event description in English (200-300 words)",
              },
              faqItems: {
                type: "array",
                description: "Lista de 5 preguntas frecuentes con respuestas",
                items: {
                  type: "object",
                  properties: {
                    question: {
                      type: "string",
                      description: "Pregunta frecuente",
                    },
                    answer: {
                      type: "string",
                      description: "Respuesta a la pregunta (50-100 palabras)",
                    },
                  },
                  required: ["question", "answer"],
                  additionalProperties: false,
                },
              },
            },
            required: ["description", "descriptionEn", "faqItems"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content generated by LLM");
    }

    const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
    const parsed: GeneratedEventContent = JSON.parse(contentStr);

    // Validate that we got all required fields
    if (
      !parsed.description ||
      !parsed.descriptionEn ||
      !parsed.faqItems ||
      parsed.faqItems.length !== 5
    ) {
      throw new Error("Generated content is missing required fields");
    }

    return parsed;
  } catch (error) {
    console.error("[Event Content Generator] Error:", error);
    
    // Return fallback content if AI generation fails
    return {
      description: input.description || `${input.name} es un evento de ${input.discipline} organizado por ${input.organizerName} en ${input.city}, ${input.region}. Este evento de categoría ${input.category} ofrece una excelente oportunidad para nadadores de todos los niveles. Para más información sobre inscripción y detalles del evento, consulta con el organizador.`,
      descriptionEn: input.descriptionEn || `${input.nameEn || input.name} is a ${input.discipline} event organized by ${input.organizerName} in ${input.city}, ${input.region}. This ${input.category} category event offers an excellent opportunity for swimmers of all levels. For more information about registration and event details, please contact the organizer.`,
      faqItems: [
        {
          question: "¿Cómo puedo inscribirme en este evento?",
          answer: "Para inscribirte, consulta la información de contacto del organizador proporcionada en la página del evento. Típicamente, las inscripciones se abren 2-3 meses antes de la fecha del evento.",
        },
        {
          question: "¿Necesito licencia federativa para participar?",
          answer: "Depende del tipo de evento. Las competiciones oficiales suelen requerir licencia federativa, mientras que las travesías populares están abiertas a todos los nadadores. Consulta con el organizador para confirmar los requisitos específicos.",
        },
        {
          question: "¿Qué categorías de edad están disponibles?",
          answer: "Los eventos suelen ofrecer categorías por grupos de edad (alevín, infantil, júnior, absoluto, máster). Consulta la información específica del evento para conocer las categorías disponibles.",
        },
        {
          question: "¿Dónde puedo alojarme durante el evento?",
          answer: `${input.city} ofrece diversas opciones de alojamiento, desde hoteles hasta apartamentos turísticos. Se recomienda reservar con antelación, especialmente si el evento coincide con temporada alta.`,
        },
        {
          question: "¿Qué debo llevar el día de la competición?",
          answer: "Lleva bañador de competición, gorro, gafas (dos pares de repuesto), toalla, chanclas, ropa de abrigo, bebida isotónica y snacks energéticos. Para travesías en aguas abiertas, considera neopreno si la temperatura del agua es baja.",
        },
      ],
    };
  }
}

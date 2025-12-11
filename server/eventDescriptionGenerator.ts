import { invokeLLM } from "./_core/llm";

export async function generateEventDescription(event: any): Promise<{ es: string; en: string }> {
  const eventName = typeof event.name === 'string' ? event.name : (event.name?.es || event.name?.en || 'Evento');
  const location = typeof event.location === 'string' ? event.location : 
    `${event.location?.city || ''}, ${event.location?.region || ''}`.trim();
  const date = event.date ? new Date(event.date).toLocaleDateString('es-ES', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  }) : '';
  
  const discipline = event.discipline || event.sport || 'natación';
  const category = event.category || '';
  const organizerType = event.organizerType || '';

  const prompt = `Generate TWO SEO-optimized event descriptions (Spanish and English) for this aquatic sports event:

Event: ${eventName}
Location: ${location}
Date: ${date}
Discipline: ${discipline}
Category: ${category}
Organizer Type: ${organizerType}

Requirements:
- Spanish description: 150-200 words, natural flow, rich keywords for SEO
- English description: 150-200 words, natural flow, rich keywords for SEO
- Include keywords: competición, campeonato, natación, inscripción, calendario, eventos acuáticos
- Mention location, date, discipline, and competition level
- Professional tone, engaging for athletes and coaches
- DO NOT use markdown formatting, just plain text

Return ONLY valid JSON in this exact format:
{
  "es": "Spanish description here...",
  "en": "English description here..."
}`;

  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: "You are an expert sports event copywriter specializing in SEO-optimized descriptions for aquatic sports competitions in Spain." },
        { role: "user", content: prompt }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "event_description",
          strict: true,
          schema: {
            type: "object",
            properties: {
              es: { type: "string", description: "Spanish description" },
              en: { type: "string", description: "English description" }
            },
            required: ["es", "en"],
            additionalProperties: false
          }
        }
      }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content in LLM response");
    }

    const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
    const parsed = JSON.parse(contentStr);
    return {
      es: parsed.es || "",
      en: parsed.en || ""
    };
  } catch (error) {
    console.error("[Event Description Generator] Error:", error);
    // Fallback description
    return {
      es: `${eventName} es una competición de ${discipline} que se celebrará en ${location} el ${date}. Este evento reúne a deportistas de diferentes niveles para competir en un ambiente profesional y deportivo.`,
      en: `${eventName} is a ${discipline} competition taking place in ${location} on ${date}. This event brings together athletes of different levels to compete in a professional and sporting environment.`
    };
  }
}

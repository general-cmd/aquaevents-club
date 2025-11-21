export interface EventTemplate {
  id: string;
  name: string;
  description: string;
  data: {
    title?: string;
    discipline?: string;
    category?: string;
    description?: string;
  };
}

export const EVENT_TEMPLATES: EventTemplate[] = [
  {
    id: "regional-championship",
    name: "Campeonato Regional",
    description: "Plantilla para campeonatos regionales de natación",
    data: {
      title: "Campeonato Regional de [Región] - [Categoría]",
      discipline: "Natación",
      category: "Todos",
      description: `Campeonato Regional de Natación

**Pruebas:**
- 50m, 100m, 200m, 400m Libre
- 50m, 100m, 200m Espalda
- 50m, 100m, 200m Braza
- 50m, 100m, 200m Mariposa
- 200m, 400m Estilos

**Información importante:**
- Inscripciones: [Fecha límite]
- Marcas mínimas: Según normativa RFEN
- Categorías: [Especificar]

**Contacto:**
[Información de contacto de la federación regional]`
    }
  },
  {
    id: "club-meet",
    name: "Encuentro de Clubes",
    description: "Plantilla para encuentros y competiciones entre clubes",
    data: {
      title: "Encuentro de Clubes - [Nombre del Evento]",
      discipline: "Natación",
      category: "Todos",
      description: `Encuentro de Clubes de Natación

**Formato:**
- Competición amistosa entre clubes
- Todas las categorías bienvenidas
- Ambiente familiar y deportivo

**Pruebas:**
- Distancias cortas y medias
- Relevos por equipos
- Categorías por edades

**Detalles:**
- Horario: [Especificar]
- Piscina: [Nombre y dirección]
- Inscripción: [Proceso de inscripción]

**Organiza:**
[Nombre del club organizador]`
    }
  },
  {
    id: "open-water",
    name: "Travesía Aguas Abiertas",
    description: "Plantilla para competiciones de aguas abiertas",
    data: {
      title: "Travesía [Nombre del Lugar]",
      discipline: "Aguas Abiertas",
      category: "Absoluto",
      description: `Travesía de Aguas Abiertas

**Distancias:**
- [Distancia 1] km
- [Distancia 2] km
- [Distancia 3] km (opcional)

**Información técnica:**
- Salida: [Hora y lugar]
- Recorrido: [Descripción del recorrido]
- Temperatura del agua: [Estimada]
- Neopreno: [Obligatorio/Opcional/Prohibido]

**Seguridad:**
- Kayaks de seguridad
- Equipo médico presente
- Balizamiento completo del recorrido

**Inscripciones:**
- Fecha límite: [Fecha]
- Precio: [Precio]
- Incluye: [Qué incluye la inscripción]

**Premios:**
- Categorías: Absoluto, Master, etc.
- [Detalles de premiación]`
    }
  },
  {
    id: "waterpolo-tournament",
    name: "Torneo de Waterpolo",
    description: "Plantilla para torneos de waterpolo",
    data: {
      title: "Torneo de Waterpolo [Nombre]",
      discipline: "Waterpolo",
      category: "Todos",
      description: `Torneo de Waterpolo

**Formato:**
- Sistema: [Liga/Eliminatoria/Mixto]
- Número de equipos: [Cantidad]
- Categorías: [Especificar]

**Calendario:**
- Jornada 1: [Fecha y hora]
- Jornada 2: [Fecha y hora]
- Finales: [Fecha y hora]

**Instalaciones:**
- Piscina: [Nombre]
- Dirección: [Dirección completa]

**Inscripciones:**
- Fecha límite: [Fecha]
- Cuota: [Precio por equipo]
- Incluye: [Detalles]

**Reglamento:**
- Según normativa RFEN
- [Especificaciones particulares del torneo]`
    }
  },
  {
    id: "triathlon",
    name: "Triatlón",
    description: "Plantilla para competiciones de triatlón",
    data: {
      title: "Triatlón [Nombre del Evento]",
      discipline: "Triatlón",
      category: "Absoluto",
      description: `Triatlón [Distancia]

**Distancias:**
- Natación: [Distancia] km
- Ciclismo: [Distancia] km
- Carrera: [Distancia] km

**Recorrido:**
- Natación: [Descripción]
- Ciclismo: [Descripción del circuito]
- Carrera: [Descripción del recorrido]

**Horarios:**
- Recogida de dorsales: [Hora]
- Salida: [Hora]
- Cierre de meta: [Hora]

**Categorías:**
- Absoluto
- Grupos de edad
- Relevos (opcional)

**Inscripciones:**
- Fecha límite: [Fecha]
- Precio: [Precio]
- Incluye: [Chip, camiseta, avituallamiento, etc.]

**Información adicional:**
- Licencia federativa: [Obligatoria/Opcional]
- Seguro: [Detalles]`
    }
  }
];


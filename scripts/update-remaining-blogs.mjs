import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { blogPosts } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

const updatedPosts = [
  {
    slug: "elegir-competicion-adecuada",
    featuredImage: "/blog-competicion.jpg",
    metaDescription: "Guía completa para seleccionar las competiciones de natación más apropiadas según tu experiencia, objetivos y nivel de preparación física y mental.",
    content: `Elegir la competición correcta es fundamental para tu desarrollo como nadador y para mantener la motivación. Una competición demasiado exigente puede ser desmoralizante, mientras que una demasiado fácil no proporciona el desafío necesario para crecer. Esta guía te ayudará a tomar decisiones informadas sobre qué competiciones son adecuadas para ti.

## Evalúa tu Nivel Actual

Antes de inscribirte en cualquier competición, es esencial hacer una evaluación honesta de tu nivel actual. Esto incluye no solo tus tiempos en diferentes distancias, sino también tu experiencia competitiva, tu capacidad de manejar la presión y tu estado físico general.

Los nadadores principiantes deben comenzar con competiciones locales o de club que tengan un ambiente menos intimidante. Estas competiciones suelen tener categorías por edad y nivel, lo que garantiza que compitas contra nadadores de habilidades similares. El objetivo principal en esta etapa debe ser ganar experiencia competitiva y familiarizarse con los procedimientos de competición.

Los nadadores intermedios pueden considerar competiciones regionales o provinciales. Estas ofrecen un nivel de competencia más alto y pueden servir como clasificatorias para eventos más importantes. Es en este nivel donde muchos nadadores comienzan a especializarse en ciertas distancias o estilos.

## Considera tus Objetivos

Tus objetivos personales deben guiar tu selección de competiciones. Si tu objetivo es mejorar tiempos específicos, busca competiciones conocidas por sus piscinas rápidas y buena organización. Si buscas experiencia en aguas abiertas, comienza con distancias cortas en condiciones controladas antes de intentar travesías más largas.

Para nadadores que aspiran a competir a nivel nacional o internacional, es importante crear un calendario de competiciones que incluya eventos clasificatorios en los momentos adecuados de la temporada. Esto requiere planificación a largo plazo y coordinación con tu entrenador.

## Timing y Periodización

El momento de la temporada en que compites es crucial. Las competiciones deben alinearse con tu plan de entrenamiento y periodización. Competir demasiado frecuentemente puede llevar al agotamiento y al sobreentrenamiento, mientras que competir muy poco puede resultar en falta de experiencia competitiva.

La mayoría de los nadadores serios tienen una o dos competiciones objetivo principales por temporada. Estas son las competiciones para las que se preparan específicamente, alcanzando su mejor forma física. Las competiciones intermedias sirven como preparación y oportunidades para probar estrategias de carrera.

## Factores Logísticos

Considera los aspectos prácticos de asistir a una competición. La distancia de viaje, el costo de inscripción, alojamiento y alimentación son factores importantes. Para nadadores jóvenes, la disponibilidad de los padres o tutores para acompañarlos es esencial.

Las competiciones de varios días requieren más planificación logística pero ofrecen la oportunidad de nadar múltiples eventos y ganar más experiencia. Asegúrate de tener suficiente tiempo de recuperación entre eventos si planeas nadar varias pruebas.

## Ambiente Competitivo

Diferentes competiciones tienen diferentes atmósferas. Algunas son muy serias y enfocadas en tiempos clasificatorios, mientras que otras tienen un ambiente más relajado y social. Para nadadores más jóvenes o menos experimentados, un ambiente amigable y de apoyo puede ser más beneficioso que una competición de alto nivel y alta presión.

Investiga sobre la competición antes de inscribirte. Habla con otros nadadores que hayan participado anteriormente, lee reseñas online y consulta con tu entrenador. Conocer qué esperar te ayudará a prepararte mental y físicamente.

## Preguntas Frecuentes

**¿Cuántas competiciones debo hacer al año?**

Depende de tu nivel y objetivos. Los nadadores principiantes pueden beneficiarse de 3-5 competiciones al año para ganar experiencia. Los nadadores competitivos serios pueden participar en 8-12 competiciones, con 1-2 eventos principales donde buscan sus mejores marcas.

**¿Debo competir en todos los estilos o especializarme?**

Los nadadores jóvenes (menores de 14 años) deben nadar todos los estilos para desarrollar habilidades completas. Los nadadores mayores pueden comenzar a especializarse en sus estilos y distancias más fuertes, aunque mantener versatilidad es valioso.

**¿Qué hago si no alcanzo los tiempos de clasificación?**

Usa las competiciones abiertas para trabajar en técnica y experiencia. Establece objetivos de mejora progresiva. Consulta con tu entrenador sobre áreas específicas de mejora. Los tiempos de clasificación son objetivos a largo plazo que requieren entrenamiento consistente.

## Conclusión

Elegir la competición adecuada es una habilidad que se desarrolla con experiencia. No tengas miedo de probar diferentes tipos de competiciones para descubrir qué funciona mejor para ti. Recuerda que cada competición es una oportunidad de aprendizaje, independientemente del resultado.

### Destaca en tus Competiciones

Equipa a tu equipo con gorros personalizados de alta calidad. Visita [EuroSwimCaps.com](https://euroswimcaps.com?coupon=AQUA20) y usa el código **AQUA20** para 20% de descuento.

### Artículos Relacionados

- [Guía Completa para la Preparación de una Competición](/blog/guia-preparacion-competicion)
- [Técnicas Avanzadas para Mejorar tu Viraje](/blog/tecnicas-avanzadas-viraje-natacion)
- [Encuentra competiciones en nuestro calendario](/eventos)

**Referencias:**
- USA Swimming: "Competition Selection Guidelines"
- Swimming Australia: "Pathway to Competition"
- European Aquatics: "Youth Competition Framework"`
  },
  {
    slug: "guia-preparacion-competicion",
    featuredImage: "/blog-preparacion.jpg",
    metaDescription: "Descubre los pasos esenciales para prepararte física y mentalmente antes de una competición de natación, desde el entrenamiento hasta la nutrición y la estrategia de carrera.",
    content: `La preparación para una competición de natación es un proceso multifacético que va mucho más allá de simplemente nadar rápido en el entrenamiento. Requiere atención cuidadosa a la preparación física, mental, nutricional y logística. Esta guía completa te llevará a través de cada aspecto esencial de la preparación competitiva.

## Planificación del Entrenamiento

La preparación efectiva comienza semanas o incluso meses antes de la competición. Tu plan de entrenamiento debe seguir un modelo de periodización que construye gradualmente tu capacidad física mientras permite tiempo adecuado para la recuperación y el tapering antes del evento.

El tapering, o reducción del volumen de entrenamiento antes de la competición, es crucial para llegar a la competición en tu mejor forma. Típicamente, el tapering comienza 1-3 semanas antes del evento, dependiendo de su importancia. Durante este período, el volumen de entrenamiento se reduce significativamente mientras se mantiene la intensidad.

La especificidad del entrenamiento aumenta a medida que te acercas a la competición. Esto significa que tus sesiones de entrenamiento deben reflejar cada vez más las demandas de tus eventos competitivos. Si vas a nadar 100m libre, tus entrenamientos deben incluir trabajo de velocidad a esa distancia y ritmo.

## Preparación Mental

La fortaleza mental es tan importante como la preparación física. Desarrollar rutinas pre-competición consistentes ayuda a crear un estado mental óptimo. Esto puede incluir visualización, ejercicios de respiración, música motivacional o cualquier ritual que te ayude a entrar en "la zona".

La visualización es una herramienta poderosa utilizada por nadadores de élite. Dedica tiempo cada día en las semanas previas a la competición a visualizar tu carrera perfecta. Imagina cada detalle: la salida, las brazadas, los virajes, el sprint final. Visualiza también cómo manejarás desafíos o situaciones inesperadas.

Gestionar la ansiedad pre-competición es normal y necesario. Un poco de nerviosismo indica que estás listo y enfocado. Sin embargo, la ansiedad excesiva puede perjudicar el rendimiento. Técnicas como la respiración profunda, el mindfulness y el reencuadre cognitivo pueden ayudar a mantener los nervios bajo control.

## Nutrición Pre-Competición

Tu dieta en los días previos a la competición puede impactar significativamente tu rendimiento. El objetivo principal es maximizar las reservas de glucógeno muscular mientras mantienes una hidratación óptima y evitas cualquier malestar gastrointestinal.

En los 2-3 días antes de la competición, aumenta ligeramente tu ingesta de carbohidratos complejos. Esto no significa atiborrarse de pasta, sino aumentar moderadamente las porciones de arroz, pasta, pan integral y frutas. Mantén las proteínas y grasas en niveles normales para evitar sentirte pesado.

La comida pre-competición debe consumirse 2-4 horas antes de tu primera carrera. Debe ser rica en carbohidratos, moderada en proteínas y baja en grasas y fibra para facilitar la digestión. Opciones populares incluyen avena con plátano, tostadas con miel, o arroz con pollo.

## Logística y Equipamiento

Preparar tu equipamiento con anticipación elimina estrés innecesario el día de la competición. Crea una lista de verificación que incluya: traje de baño (lleva dos por si acaso), gafas (también dos pares), gorro, toalla, chanclas, ropa de calentamiento, y cualquier equipo específico que necesites.

Llega al lugar de la competición con tiempo suficiente para familiarizarte con las instalaciones, hacer check-in, y completar tu calentamiento sin prisa. La mayoría de los nadadores experimentados llegan al menos una hora antes de su primera carrera.

Conoce el horario de tu competición y planifica tu día en consecuencia. Si tienes múltiples carreras, calcula cuánto tiempo tienes entre ellas para recuperación, alimentación y calentamiento adicional si es necesario.

## Calentamiento Efectivo

Un calentamiento apropiado prepara tu cuerpo física y mentalmente para el rendimiento máximo. Debe incluir natación aeróbica fácil, ejercicios técnicos, y algunos sprints de alta intensidad para activar tus sistemas energéticos.

Un calentamiento típico dura 20-30 minutos y puede incluir: 400-800m de natación fácil, 200-400m de ejercicios técnicos, 4-6 sprints de 25-50m a ritmo de carrera, y 100-200m de natación fácil para recuperar. Ajusta el volumen según tus necesidades individuales y el tiempo disponible en la piscina de calentamiento.

## Estrategia de Carrera

Tener un plan de carrera claro te da confianza y dirección. Tu estrategia debe considerar tus fortalezas, la distancia del evento, y tus objetivos específicos. Discute tu plan con tu entrenador y ajústalo según sea necesario.

Para eventos de velocidad (50-100m), la salida y los primeros metros son cruciales. Para distancias medias (200-400m), el control del ritmo es esencial. Para distancias largas (800m+), la distribución eficiente de la energía determina el éxito.

## Preguntas Frecuentes

**¿Cuánto tiempo antes debo dejar de entrenar intensamente?**

El tapering típicamente comienza 1-3 semanas antes de la competición, dependiendo de su importancia. Para competiciones locales, 1 semana puede ser suficiente. Para campeonatos importantes, 2-3 semanas de tapering permiten recuperación completa y rendimiento máximo.

**¿Qué hago si me siento enfermo cerca de la competición?**

Si es un resfriado leve sin fiebre, puedes reducir la intensidad del entrenamiento y descansar más. Si tienes fiebre o síntomas severos, es mejor recuperarte completamente antes de competir. Consulta con tu médico y entrenador.

**¿Cómo manejo los nervios el día de la competición?**

Los nervios son normales y útiles en dosis moderadas. Usa técnicas de respiración profunda, mantén tu rutina habitual, enfócate en aspectos que puedes controlar, y recuerda que has hecho el trabajo de preparación.

## Conclusión

La preparación competitiva es un arte que se perfecciona con experiencia. Cada competición te enseña algo nuevo sobre ti mismo y tu proceso de preparación. Mantén un diario de entrenamiento y competición para identificar qué funciona mejor para ti y refinar tu enfoque con el tiempo.

### Equípate como un Profesional

Consigue gorros de natación de alta calidad para tu equipo. Visita [EuroSwimCaps.com](https://euroswimcaps.com?coupon=AQUA20) y usa **AQUA20** para 20% de descuento.

### Artículos Relacionados

- [Nutrición para Nadadores de Alto Rendimiento](/blog/nutricion-nadadores-alto-rendimiento)
- [Cómo Elegir la Competición Adecuada](/blog/elegir-competicion-adecuada)
- [Técnicas Avanzadas para Mejorar tu Viraje](/blog/tecnicas-avanzadas-viraje-natacion)
- [Busca tu próxima competición](/eventos)

**Referencias:**
- Journal of Sports Sciences: "Tapering strategies for peak performance"
- International Journal of Sport Nutrition: "Pre-competition nutrition for swimmers"
- Sports Psychology Bulletin: "Mental preparation for competitive swimming"`
  },
  {
    slug: "nutricion-nadadores-alto-rendimiento",
    featuredImage: "/blog-nutricion.jpg",
    metaDescription: "Descubre los principios nutricionales esenciales que los nadadores de élite utilizan para optimizar su rendimiento y recuperación en competiciones y entrenamientos.",
    content: `La nutrición es uno de los pilares fundamentales del rendimiento en natación de alto nivel. Los nadadores de élite pueden quemar entre 3000-6000 calorías diarias durante períodos de entrenamiento intenso, lo que hace que la nutrición adecuada sea esencial no solo para el rendimiento, sino también para la recuperación y la salud general.

## Requerimientos Energéticos

Los nadadores tienen necesidades energéticas significativamente más altas que la población general debido al alto volumen e intensidad de entrenamiento. Un nadador de élite puede entrenar 20-30 horas por semana, lo que requiere una ingesta calórica sustancial para mantener el peso corporal y apoyar el rendimiento.

La distribución de macronutrientes debe ser aproximadamente: 55-60% carbohidratos, 15-20% proteínas, y 20-30% grasas. Sin embargo, estos porcentajes pueden variar según la fase de entrenamiento, los objetivos individuales y las preferencias personales. Lo importante es que cada macronutriente cumple funciones específicas y esenciales.

Los carbohidratos son la fuente principal de energía para el ejercicio de alta intensidad. Los nadadores deben consumir 6-10 gramos de carbohidratos por kilogramo de peso corporal diariamente, dependiendo del volumen de entrenamiento. Prioriza carbohidratos complejos como arroz integral, avena, quinoa y batatas.

## Proteínas para Recuperación y Desarrollo Muscular

Las proteínas son esenciales para la reparación y construcción del tejido muscular. Los nadadores necesitan aproximadamente 1.6-2.0 gramos de proteína por kilogramo de peso corporal diariamente. Esta cantidad es mayor que las recomendaciones para la población general debido al estrés físico del entrenamiento intenso.

Distribuir la ingesta de proteínas a lo largo del día optimiza la síntesis de proteínas musculares. Apunta a consumir 20-30 gramos de proteína de alta calidad en cada comida principal. Fuentes excelentes incluyen pollo, pescado, huevos, lácteos, legumbres y proteína en polvo de calidad.

El timing de la proteína es particularmente importante alrededor del entrenamiento. Consumir proteína dentro de 30-60 minutos después del entrenamiento maximiza la recuperación muscular. Una combinación de proteína y carbohidratos en esta ventana anabólica es ideal para reponer glucógeno y reparar tejido muscular.

## Hidratación Óptima

La deshidratación puede disminuir significativamente el rendimiento, incluso pérdidas de líquido del 2% del peso corporal pueden afectar negativamente la capacidad aeróbica y la fuerza. Los nadadores deben monitorear su estado de hidratación y beber suficientes líquidos antes, durante y después del entrenamiento.

Una forma simple de monitorear la hidratación es observar el color de la orina. Debe ser amarillo pálido; un color más oscuro indica deshidratación. Pesarse antes y después del entrenamiento también ayuda a determinar las pérdidas de líquido y las necesidades de reposición.

Durante sesiones de entrenamiento largas (más de 60 minutos), considera bebidas deportivas que contengan electrolitos y carbohidratos. Esto ayuda a mantener los niveles de energía y reemplazar los electrolitos perdidos a través del sudor, especialmente en ambientes cálidos.

## Micronutrientes Críticos

Aunque se necesitan en cantidades más pequeñas, los micronutrientes son esenciales para el rendimiento óptimo. El hierro es particularmente importante para los nadadores, especialmente las mujeres, ya que es crucial para el transporte de oxígeno. La deficiencia de hierro puede causar fatiga y disminución del rendimiento.

El calcio y la vitamina D son esenciales para la salud ósea, especialmente importante para nadadores jóvenes en crecimiento. Los antioxidantes como las vitaminas C y E ayudan a combatir el estrés oxidativo del entrenamiento intenso. Una dieta variada rica en frutas y verduras coloridas generalmente proporciona estos nutrientes.

Los ácidos grasos omega-3, encontrados en pescados grasos, nueces y semillas de lino, tienen propiedades antiinflamatorias que pueden ayudar en la recuperación. Considera incluir pescado graso como salmón o sardinas 2-3 veces por semana.

## Nutrición en Días de Competición

La nutrición el día de la competición requiere atención especial. El objetivo es maximizar las reservas de energía mientras se evita cualquier malestar gastrointestinal. La comida pre-competición debe ser familiar, probada en entrenamientos, y consumida 2-4 horas antes de la primera carrera.

Entre carreras, especialmente si hay poco tiempo de recuperación, opta por snacks fácilmente digeribles y ricos en carbohidratos como plátanos, barras energéticas, o bebidas deportivas. Evita alimentos altos en grasa o fibra que puedan causar malestar.

Después de la competición, prioriza la recuperación con una comida que incluya carbohidratos para reponer glucógeno y proteínas para reparación muscular. Esto es especialmente importante si tienes otra sesión de competición al día siguiente.

## Suplementación Inteligente

Aunque una dieta bien planificada debe proporcionar la mayoría de los nutrientes necesarios, algunos suplementos pueden ser beneficiosos para nadadores de alto rendimiento. La creatina monohidrato ha demostrado mejorar el rendimiento en sprints repetidos. La beta-alanina puede ayudar a reducir la fatiga en eventos de media distancia.

Sin embargo, la suplementación debe ser individualizada y supervisada por un nutricionista deportivo o médico. Muchos suplementos no están regulados y pueden contener sustancias prohibidas. Siempre verifica que los productos estén certificados por organizaciones de terceros.

## Preguntas Frecuentes

**¿Debo contar calorías como nadador?**

No necesariamente. Para la mayoría de los nadadores, enfocarse en comer alimentos nutritivos de alta calidad en cantidades suficientes es más importante que contar calorías exactas. Sin embargo, si tienes objetivos específicos de composición corporal, trabajar con un nutricionista puede ser útil.

**¿Son necesarios los batidos de proteína?**

No son esenciales si consumes suficiente proteína de alimentos enteros. Sin embargo, los batidos de proteína son convenientes, especialmente después del entrenamiento cuando puede ser difícil consumir una comida completa inmediatamente. Elige proteínas de alta calidad como whey o caseína.

**¿Qué como si entreno temprano en la mañana?**

Si entrenas muy temprano, puede ser difícil comer una comida completa. Opta por un snack ligero 30-60 minutos antes como un plátano con mantequilla de maní o una tostada con miel. Luego consume un desayuno completo después del entrenamiento.

## Conclusión

La nutrición para nadadores de alto rendimiento es compleja pero manejable con conocimiento y planificación. Recuerda que la nutrición es individual; lo que funciona para un nadador puede no funcionar para otro. Experimenta durante el entrenamiento, no durante competiciones importantes, y considera trabajar con un nutricionista deportivo para optimizar tu plan nutricional.

### Destaca en la Piscina

Equipa a tu equipo con gorros personalizados de calidad profesional. Visita [EuroSwimCaps.com](https://euroswimcaps.com?coupon=AQUA20) y usa el código **AQUA20** para 20% de descuento.

### Artículos Relacionados

- [Guía Completa para la Preparación de una Competición](/blog/guia-preparacion-competicion)
- [Cómo Elegir la Competición Adecuada](/blog/elegir-competicion-adecuada)
- [Los Beneficios de la Natación en Aguas Abiertas](/blog/beneficios-natacion-aguas-abiertas)
- [Explora competiciones en nuestro calendario](/eventos)

**Referencias:**
- International Journal of Sport Nutrition and Exercise Metabolism: "Nutritional needs of elite swimmers"
- Journal of the International Society of Sports Nutrition: "Protein requirements for athletes"
- Sports Medicine: "Hydration strategies for optimal performance"
- American College of Sports Medicine: "Nutrition and Athletic Performance"`
  }
];

for (const post of updatedPosts) {
  await db.update(blogPosts)
    .set({ 
      featuredImage: post.featuredImage,
      metaDescription: post.metaDescription,
      content: post.content 
    })
    .where(eq(blogPosts.slug, post.slug));
  console.log(`Updated: ${post.slug}`);
}

console.log("Remaining blog posts updated successfully!");

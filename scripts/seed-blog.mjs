import { drizzle } from "drizzle-orm/mysql2";
import { blogPosts, users } from "../drizzle/schema.ts";
import { nanoid } from "nanoid";
import * as dotenv from "dotenv";
import { eq } from "drizzle-orm";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

const blogPostsData = [
  {
    slug: "guia-completa-preparacion-competicion-natacion",
    title: "Guía Completa para la Preparación de una Competición de Natación",
    excerpt: "Descubre los pasos esenciales para prepararte física y mentalmente antes de una competición de natación, desde el entrenamiento hasta la nutrición y la estrategia de carrera.",
    content: `<h2>Introducción</h2>
<p>La preparación para una competición de natación requiere mucho más que simplemente nadar rápido. Los nadadores de élite saben que el éxito en la piscina comienza semanas antes del día de la competición, con una planificación meticulosa que abarca entrenamiento, nutrición, descanso y preparación mental.</p>

<h2>Planificación del Entrenamiento</h2>
<p>El ciclo de entrenamiento para una competición importante generalmente se divide en varias fases. La fase de base construye resistencia aeróbica y técnica durante 8-12 semanas. Durante este período, los nadadores acumulan kilometraje significativo mientras perfeccionan su técnica en los cuatro estilos.</p>

<p>La fase de intensificación introduce trabajo de velocidad y potencia. Los entrenamientos incluyen series de alta intensidad, sprints y trabajo anaeróbico que prepara al cuerpo para el esfuerzo máximo de la competición. Esta fase típicamente dura 4-6 semanas y es crucial para desarrollar la velocidad de carrera.</p>

<p>Finalmente, la fase de tapering reduce el volumen de entrenamiento mientras mantiene la intensidad. Durante las últimas 1-2 semanas antes de la competición, los nadadores nadan menos kilómetros pero mantienen sesiones de calidad que preservan la forma física mientras permiten la recuperación completa.</p>

<h2>Nutrición Estratégica</h2>
<p>La nutrición juega un papel fundamental en el rendimiento competitivo. Los carbohidratos complejos deben formar la base de la dieta del nadador, proporcionando la energía necesaria para entrenamientos intensos y competiciones. Fuentes como arroz integral, pasta, avena y patatas dulces son ideales.</p>

<p>Las proteínas son esenciales para la recuperación muscular. Los nadadores deben consumir aproximadamente 1.6-2.0 gramos de proteína por kilogramo de peso corporal diariamente, distribuyendo la ingesta a lo largo del día. Fuentes magras como pollo, pescado, huevos y legumbres son excelentes opciones.</p>

<p>La hidratación es crítica. Los nadadores pierden líquidos incluso en el agua, y la deshidratación puede afectar significativamente el rendimiento. Beber agua regularmente durante todo el día y consumir bebidas deportivas durante entrenamientos largos ayuda a mantener el equilibrio electrolítico.</p>

<h2>Preparación Mental</h2>
<p>La fortaleza mental distingue a los campeones. La visualización es una técnica poderosa donde los nadadores imaginan cada aspecto de su carrera perfecta, desde la salida hasta el toque final. Practicar esta técnica diariamente durante las semanas previas a la competición construye confianza y reduce la ansiedad.</p>

<p>Establecer objetivos realistas pero desafiantes proporciona dirección y motivación. Los objetivos deben ser específicos, medibles y divididos en metas a corto y largo plazo. Esto permite a los nadadores celebrar pequeños logros mientras trabajan hacia objetivos mayores.</p>

<h2>El Día de la Competición</h2>
<p>El calentamiento es crucial para el rendimiento óptimo. Un calentamiento efectivo incluye natación suave para elevar la temperatura corporal, seguido de ejercicios técnicos y finalmente algunas series a ritmo de carrera. Esto prepara tanto el cuerpo como la mente para el esfuerzo máximo.</p>

<p>La gestión del tiempo entre series es importante. Los nadadores deben mantenerse activos con natación suave, estiramientos dinámicos y ejercicios de activación muscular. Esto mantiene el cuerpo caliente y listo sin causar fatiga adicional.</p>

<h2>Conclusión</h2>
<p>La preparación exitosa para una competición de natación requiere atención a múltiples factores. Combinando entrenamiento inteligente, nutrición adecuada, descanso suficiente y preparación mental, los nadadores pueden maximizar su potencial y rendir al más alto nivel cuando más importa.</p>`,
    category: "Entrenamiento",
    tags: "natación, competición, preparación, entrenamiento",
    coverImage: null,
    status: "published",
  },
  {
    slug: "beneficios-natacion-aguas-abiertas",
    title: "Los Beneficios de la Natación en Aguas Abiertas: Más Allá de la Piscina",
    excerpt: "Explora las ventajas físicas y mentales de la natación en aguas abiertas, desde el fortalecimiento muscular hasta la conexión con la naturaleza.",
    content: `<h2>Una Nueva Dimensión del Deporte Acuático</h2>
<p>La natación en aguas abiertas ha experimentado un crecimiento exponencial en popularidad durante la última década. A diferencia de la natación en piscina, nadar en mares, lagos y ríos ofrece una experiencia completamente diferente que combina desafío físico con conexión natural y aventura.</p>

<h2>Beneficios Físicos Únicos</h2>
<p>Nadar en aguas abiertas proporciona un entrenamiento más completo que la piscina. Las corrientes, olas y condiciones variables requieren ajustes constantes de técnica y esfuerzo, activando grupos musculares adicionales que raramente se utilizan en piscina. Los nadadores desarrollan mayor fuerza en el core y estabilidad mientras navegan condiciones cambiantes.</p>

<p>La temperatura del agua en entornos naturales suele ser más fría que en piscinas climatizadas. Esta exposición controlada al frío tiene beneficios metabólicos significativos, incluyendo mejora de la circulación, fortalecimiento del sistema inmunológico y aumento de la quema de calorías. Muchos nadadores regulares de aguas abiertas reportan mayor resistencia a enfermedades comunes.</p>

<p>La ausencia de virajes y paredes significa natación continua, lo que desarrolla resistencia cardiovascular superior. Los entrenamientos en aguas abiertas típicamente involucran distancias más largas sin interrupciones, construyendo capacidad aeróbica excepcional.</p>

<h2>Beneficios Mentales y Emocionales</h2>
<p>La natación en aguas abiertas ofrece profundos beneficios para la salud mental. La inmersión en entornos naturales reduce el estrés y la ansiedad de manera más efectiva que el ejercicio en instalaciones cerradas. El sonido del agua, la vista del horizonte y la sensación de libertad crean una experiencia meditativa única.</p>

<p>Superar los desafíos inherentes a las aguas abiertas construye confianza y resiliencia mental. Cada sesión presenta condiciones diferentes, requiriendo adaptabilidad y resolución de problemas. Esta variabilidad desarrolla fortaleza mental que se transfiere a otros aspectos de la vida.</p>

<h2>Conexión con la Comunidad</h2>
<p>La comunidad de natación en aguas abiertas es notablemente acogedora e inclusiva. Los nadadores de todos los niveles comparten una pasión común y se apoyan mutuamente. Muchas ubicaciones tienen grupos regulares de natación que se reúnen semanalmente, creando amistades duraderas basadas en experiencias compartidas.</p>

<p>Las competiciones de aguas abiertas tienen una atmósfera única, menos formal que las competiciones de piscina pero igualmente emocionante. Eventos como travesías de bahías, maratones acuáticos y competiciones de triatlón ofrecen objetivos motivadores para nadadores de todos los niveles.</p>

<h2>Consideraciones de Seguridad</h2>
<p>La seguridad es primordial en aguas abiertas. Los nadadores deben comenzar en áreas supervisadas, idealmente con grupos organizados o compañeros de natación. El uso de boyas de natación de colores brillantes aumenta la visibilidad y proporciona flotación de emergencia.</p>

<p>La aclimatación gradual es esencial, especialmente en aguas frías. Comenzar con inmersiones cortas y aumentar progresivamente la duración permite al cuerpo adaptarse. Conocer los signos de hipotermia y tener un plan de salida claro son aspectos críticos de la seguridad.</p>

<h2>Conclusión</h2>
<p>La natación en aguas abiertas ofrece una experiencia transformadora que va mucho más allá del ejercicio físico. Combina los beneficios de un entrenamiento completo con la belleza de la naturaleza y la camaradería de una comunidad apasionada. Para aquellos dispuestos a aventurarse fuera de la piscina, las aguas abiertas ofrecen recompensas ilimitadas.</p>`,
    category: "Aguas Abiertas",
    tags: "aguas abiertas, natación, beneficios, salud",
    coverImage: null,
    status: "published",
  },
  {
    slug: "tecnicas-mejora-viraje-natacion",
    title: "Técnicas Avanzadas para Mejorar tu Viraje en Natación",
    excerpt: "Aprende las técnicas profesionales para ejecutar virajes más rápidos y eficientes que pueden reducir segundos valiosos de tu tiempo final.",
    content: `<h2>La Importancia del Viraje Perfecto</h2>
<p>En natación competitiva, los virajes pueden representar hasta el 30% del tiempo total de una carrera. Un viraje ejecutado perfectamente no solo ahorra tiempo sino que también mantiene el impulso y la velocidad. Los nadadores de élite dedican horas a perfeccionar esta habilidad técnica crucial.</p>

<h2>Fundamentos del Viraje Voltereta</h2>
<p>El viraje voltereta, utilizado en estilo libre y espalda, comienza con la aproximación correcta a la pared. Los nadadores deben mantener velocidad constante hasta el último momento, evitando la tentación de desacelerar prematuramente. La distancia ideal para iniciar el viraje es aproximadamente 1.5 metros de la pared.</p>

<p>La ejecución de la voltereta requiere coordinación precisa. Al alcanzar la distancia correcta, el nadador toma una última brazada, mete la barbilla al pecho y ejecuta una voltereta compacta. Las manos pueden ayudar empujando el agua hacia abajo para iniciar la rotación, pero no deben tocar la pared.</p>

<p>La posición de los pies en la pared es crítica. Los pies deben plantarse firmemente con las rodillas flexionadas aproximadamente 90 grados, preparados para un empuje explosivo. La orientación del cuerpo debe estar ligeramente lateral, permitiendo una rotación suave hacia la posición de nado durante el impulso.</p>

<h2>El Impulso y la Fase Submarina</h2>
<p>El impulso desde la pared es el momento de mayor velocidad en toda la carrera. Los nadadores deben empujar con fuerza máxima, extendiendo completamente las piernas mientras mantienen una posición corporal aerodinámica. La posición de flecha, con brazos extendidos sobre la cabeza y cuerpo completamente estirado, minimiza la resistencia.</p>

<p>La fase submarina debe aprovecharse al máximo. Los nadadores pueden permanecer bajo el agua hasta 15 metros después del viraje en estilo libre y espalda. Durante esta fase, el batido de delfín es extremadamente efectivo, generando velocidad adicional mientras se mantiene la posición aerodinámica.</p>

<p>El momento de romper la superficie requiere juicio cuidadoso. Emerger demasiado pronto desperdicia el impulso del viraje, mientras que permanecer bajo el agua demasiado tiempo puede causar pérdida de velocidad por falta de oxígeno. Los nadadores deben encontrar su punto óptimo a través de la práctica.</p>

<h2>Virajes Específicos por Estilo</h2>
<p>El viraje en braza y mariposa requiere tocar la pared con ambas manos simultáneamente. La técnica más eficiente implica un toque rápido seguido de una rotación lateral del cuerpo mientras una mano se retira y la otra empuja contra la pared. Esto permite una transición fluida a la posición de impulso.</p>

<p>En espalda, el viraje presenta desafíos únicos debido a la posición de nado. Los nadadores deben contar brazadas desde las banderas de espalda (5 metros de la pared) para saber cuándo iniciar el viraje. La rotación hacia el estómago antes de la voltereta debe ser precisa para evitar descalificación.</p>

<h2>Entrenamiento de Virajes</h2>
<p>La práctica deliberada es esencial para dominar los virajes. Dedicar tiempo específico en cada sesión de entrenamiento a trabajar virajes, separado del entrenamiento de nado regular, acelera la mejora. Los ejercicios deben enfocarse en cada componente: aproximación, ejecución, impulso y salida.</p>

<p>El uso de video es invaluable para identificar áreas de mejora. Grabar virajes desde múltiples ángulos permite análisis detallado de la técnica. Comparar con videos de nadadores de élite proporciona referencias claras de la técnica óptima.</p>

<h2>Errores Comunes a Evitar</h2>
<p>Desacelerar antes del viraje es uno de los errores más comunes. Los nadadores deben mantener velocidad completa hasta iniciar la voltereta. Otro error frecuente es empujar demasiado profundo, lo que requiere energía adicional para volver a la superficie y puede causar pérdida de tiempo.</p>

<p>La falta de compacidad durante la voltereta aumenta el tiempo de rotación y puede resultar en una posición de pies inadecuada en la pared. Practicar volteretas en seco puede ayudar a desarrollar la memoria muscular para una rotación compacta y rápida.</p>

<h2>Conclusión</h2>
<p>Dominar los virajes requiere práctica dedicada y atención al detalle técnico. Los segundos ganados a través de virajes eficientes se acumulan significativamente en carreras de múltiples largos. Invertir tiempo en perfeccionar esta habilidad es una de las formas más efectivas de mejorar los tiempos de competición.</p>`,
    category: "Técnica",
    tags: "viraje, técnica, natación, competición",
    coverImage: null,
    status: "published",
  },
  {
    slug: "nutricion-nadadores-alto-rendimiento",
    title: "Nutrición para Nadadores de Alto Rendimiento: Guía Práctica",
    excerpt: "Descubre los principios nutricionales esenciales que los nadadores de élite utilizan para optimizar su rendimiento y recuperación.",
    content: `<h2>La Nutrición como Pilar del Rendimiento</h2>
<p>La nutrición deportiva para nadadores va mucho más allá de simplemente comer saludablemente. Los nadadores de alto rendimiento queman entre 3000 y 6000 calorías diarias dependiendo del volumen de entrenamiento, requiriendo estrategias nutricionales específicas para mantener energía, optimizar recuperación y construir masa muscular magra.</p>

<h2>Macronutrientes: El Combustible del Nadador</h2>
<p>Los carbohidratos son la fuente de energía principal para nadadores. Durante entrenamientos intensos, el cuerpo depende principalmente del glucógeno muscular, que se deriva de los carbohidratos consumidos. Los nadadores deben consumir 6-10 gramos de carbohidratos por kilogramo de peso corporal diariamente, ajustando según la intensidad del entrenamiento.</p>

<p>Las fuentes de carbohidratos deben priorizarse según el momento del día. Los carbohidratos complejos como avena, arroz integral y batatas son ideales para comidas principales, proporcionando energía sostenida. Los carbohidratos simples como frutas y miel son útiles inmediatamente antes y después del entrenamiento para energía rápida y reposición de glucógeno.</p>

<p>Las proteínas son fundamentales para la reparación y construcción muscular. Los nadadores necesitan aproximadamente 1.6-2.0 gramos de proteína por kilogramo de peso corporal. La distribución es importante: consumir 20-30 gramos de proteína cada 3-4 horas optimiza la síntesis proteica muscular. Fuentes de alta calidad incluyen pescado, pollo, huevos, productos lácteos y legumbres.</p>

<p>Las grasas saludables, aunque a menudo subestimadas, son esenciales para la salud hormonal, la absorción de vitaminas y la energía a largo plazo. Los nadadores deben obtener 20-30% de sus calorías totales de grasas, priorizando fuentes como aguacate, frutos secos, semillas, aceite de oliva y pescados grasos ricos en omega-3.</p>

<h2>Timing Nutricional: Cuándo Comer</h2>
<p>La comida pre-entrenamiento debe consumirse 2-3 horas antes de la sesión, proporcionando energía sin causar malestar digestivo. Una comida ideal combina carbohidratos complejos con proteína moderada y grasa baja. Ejemplos incluyen avena con plátano y mantequilla de almendras, o arroz con pollo y verduras.</p>

<p>Durante entrenamientos largos (más de 90 minutos), consumir carbohidratos es beneficioso. Bebidas deportivas, geles energéticos o frutas fáciles de digerir pueden mantener los niveles de glucosa en sangre y retrasar la fatiga. El objetivo es consumir 30-60 gramos de carbohidratos por hora de ejercicio intenso.</p>

<p>La nutrición post-entrenamiento es crítica para la recuperación. La "ventana anabólica" de 30-60 minutos después del entrenamiento es óptima para la reposición de glucógeno y la síntesis proteica. Una combinación de carbohidratos y proteína en proporción 3:1 o 4:1 es ideal. Batidos de recuperación, yogur griego con frutas, o sándwiches de pavo son opciones excelentes.</p>

<h2>Hidratación Estratégica</h2>
<p>Aunque los nadadores están rodeados de agua, la deshidratación es un problema real. La pérdida de sudor ocurre incluso en el agua, especialmente en piscinas climatizadas. Los nadadores deben beber 500-750ml de agua 2-3 horas antes del entrenamiento y 200-300ml cada 15-20 minutos durante sesiones largas.</p>

<p>El color de la orina es un indicador simple de hidratación: debe ser amarillo pálido. Orina oscura indica deshidratación, mientras que orina completamente clara puede indicar sobrehidratación. Pesarse antes y después del entrenamiento ayuda a determinar las necesidades individuales de líquidos: cada kilogramo perdido representa aproximadamente un litro de líquido que debe reponerse.</p>

<h2>Suplementación Inteligente</h2>
<p>Aunque la mayoría de nutrientes deben provenir de alimentos enteros, ciertos suplementos pueden ser beneficiosos. La vitamina D es crucial para nadadores que entrenan principalmente en instalaciones cubiertas. Los niveles óptimos mejoran la función inmune, la salud ósea y potencialmente el rendimiento.</p>

<p>La creatina monohidrato tiene evidencia sólida de mejora en sprints repetidos y recuperación. Una dosis de 3-5 gramos diarios puede beneficiar especialmente a nadadores de velocidad y medio fondo. Los omega-3 de aceite de pescado apoyan la salud cardiovascular y pueden reducir la inflamación post-entrenamiento.</p>

<h2>Planificación de Comidas Práctica</h2>
<p>La preparación de comidas es esencial para nadadores con horarios exigentes. Dedicar tiempo los domingos a preparar comidas para la semana asegura disponibilidad de opciones nutritivas. Cocinar proteínas en lote, preparar carbohidratos complejos y cortar verduras facilita el ensamblaje rápido de comidas balanceadas.</p>

<p>Las comidas portátiles son importantes para nadadores que entrenan múltiples veces al día. Opciones como wraps de pollo, ensaladas de pasta, frutos secos con frutas secas, y batidos de proteína permiten nutrición adecuada entre sesiones sin depender de opciones menos saludables.</p>

<h2>Conclusión</h2>
<p>La nutrición óptima para nadadores requiere planificación, consistencia y personalización. Mientras que los principios generales aplican a todos, cada nadador debe experimentar para encontrar qué funciona mejor para su cuerpo, horario de entrenamiento y objetivos. Trabajar con un nutricionista deportivo puede proporcionar orientación personalizada para maximizar el rendimiento.</p>`,
    category: "Nutrición",
    tags: "nutrición, rendimiento, alimentación, nadadores",
    coverImage: null,
    status: "published",
  },
  {
    slug: "como-elegir-competicion-natacion-adecuada",
    title: "Cómo Elegir la Competición de Natación Adecuada para tu Nivel",
    excerpt: "Guía completa para seleccionar las competiciones más apropiadas según tu experiencia, objetivos y nivel de preparación.",
    content: `<h2>Encontrar tu Competición Ideal</h2>
<p>Elegir la competición correcta es fundamental para una experiencia positiva y progreso continuo en natación. Participar en eventos demasiado avanzados puede ser desmoralizante, mientras que competiciones demasiado fáciles no proporcionan el desafío necesario para mejorar. Esta guía te ayudará a navegar el panorama competitivo y encontrar eventos que se alineen con tus objetivos y capacidades.</p>

<h2>Evaluación de tu Nivel Actual</h2>
<p>Antes de inscribirte en cualquier competición, es esencial evaluar honestamente tu nivel actual. Los tiempos de entrenamiento en distancias estándar (50m, 100m, 200m) proporcionan una referencia objetiva. Compara tus tiempos con las marcas mínimas publicadas para diferentes categorías de competición.</p>

<p>La experiencia competitiva previa también importa. Los nadadores que compiten por primera vez deben comenzar con eventos locales o regionales menos formales. Estos ofrecen un ambiente más relajado para familiarizarse con los procedimientos de competición sin la presión de eventos de alto nivel.</p>

<p>Tu consistencia en el entrenamiento es otro factor crucial. Competir requiere preparación específica. Si has mantenido un programa de entrenamiento regular durante al menos 8-12 semanas, probablemente estés listo para considerar competiciones apropiadas para tu nivel.</p>

<h2>Tipos de Competiciones</h2>
<p>Las competiciones locales y de club son ideales para principiantes y nadadores recreativos. Estos eventos suelen tener requisitos de tiempo mínimos más accesibles y una atmósfera amigable. Son perfectos para ganar experiencia competitiva sin presión excesiva.</p>

<p>Los campeonatos autonómicos requieren marcas mínimas más exigentes y atraen nadadores de nivel intermedio a avanzado. Estos eventos ofrecen competición de calidad y la oportunidad de medir tu progreso contra nadadores de nivel similar en tu región.</p>

<p>Los campeonatos nacionales representan el nivel más alto de competición doméstica. Requieren marcas mínimas estrictas y atraen a los mejores nadadores del país. Estos eventos son objetivos a largo plazo para nadadores serios que buscan competir al más alto nivel.</p>

<p>Las competiciones de aguas abiertas ofrecen una alternativa emocionante a la natación en piscina. Desde travesías de 1km hasta maratones de 10km, estos eventos varían ampliamente en distancia y dificultad. Muchos son accesibles para nadadores recreativos con preparación adecuada.</p>

<h2>Consideraciones de Distancia y Estilo</h2>
<p>Elegir las pruebas correctas es tan importante como seleccionar la competición adecuada. Los nadadores deben competir en distancias y estilos donde se sientan más cómodos y competitivos. Especializarse inicialmente en 1-2 pruebas permite enfoque y mejora más rápida.</p>

<p>Los sprints (50m-100m) requieren velocidad explosiva y técnica refinada. Son ideales para nadadores con fibras musculares de contracción rápida y capacidad para esfuerzos máximos cortos. El entrenamiento debe enfatizar trabajo de velocidad y potencia.</p>

<p>Las pruebas de medio fondo (200m-400m) demandan equilibrio entre velocidad y resistencia. Requieren estrategia de carrera inteligente y capacidad para mantener ritmo alto durante varios minutos. El entrenamiento combina trabajo de umbral con desarrollo de velocidad.</p>

<p>Las pruebas de fondo (800m-1500m) priorizan resistencia aeróbica y fortaleza mental. Son perfectas para nadadores con excelente capacidad cardiovascular y determinación para mantener esfuerzo sostenido. El entrenamiento enfatiza volumen y trabajo aeróbico.</p>

<h2>Preparación Específica para Competición</h2>
<p>Una vez seleccionada la competición, la preparación específica es crucial. El período de tapering, reduciendo gradualmente el volumen de entrenamiento mientras se mantiene la intensidad, permite llegar a la competición fresco y en forma máxima. Para competiciones importantes, un taper de 1-2 semanas es típico.</p>

<p>Practicar los procedimientos de competición durante el entrenamiento reduce ansiedad el día del evento. Esto incluye calentamientos de competición, salidas desde bloques, y virajes a velocidad de carrera. Familiarizarse con estos elementos construye confianza.</p>

<p>La visualización mental de la carrera ideal ayuda a prepararse psicológicamente. Imaginar cada aspecto de la competición, desde el calentamiento hasta el toque final, crea familiaridad y reduce nervios. Practicar esta técnica diariamente durante las semanas previas es beneficioso.</p>

<h2>Establecer Objetivos Realistas</h2>
<p>Los objetivos para tu primera competición o competiciones en un nuevo nivel deben ser realistas y centrados en el proceso más que en resultados. Objetivos como "ejecutar un viraje perfecto" o "mantener técnica consistente durante toda la carrera" son más controlables que objetivos de tiempo específicos.</p>

<p>Para nadadores más experimentados, establecer objetivos de tiempo basados en entrenamientos recientes es apropiado. Apuntar a mejorar tiempos personales por márgenes realistas (1-3% de mejora) proporciona motivación sin crear presión excesiva.</p>

<h2>Después de la Competición</h2>
<p>Independientemente del resultado, cada competición es una oportunidad de aprendizaje. Analizar qué funcionó bien y qué se puede mejorar informa el entrenamiento futuro. Mantener un diario de competición documentando experiencias, tiempos y observaciones es valioso para seguimiento a largo plazo.</p>

<p>Celebrar logros, incluso pequeños, mantiene la motivación. Mejorar un tiempo personal, ejecutar una técnica perfectamente, o simplemente completar la carrera son todos dignos de reconocimiento. La natación competitiva es un viaje de mejora continua.</p>

<h2>Conclusión</h2>
<p>Elegir la competición adecuada requiere autoevaluación honesta, investigación de opciones disponibles y establecimiento de objetivos realistas. Comenzar con eventos apropiados para tu nivel actual y progresar gradualmente construye confianza, habilidad y amor por la competición. Con cada evento, ganarás experiencia valiosa que informará futuras decisiones y acelerará tu desarrollo como nadador competitivo.</p>`,
    category: "Competición",
    tags: "competición, eventos, natación, guía",
    coverImage: null,
    status: "published",
  },
];

async function seed() {
  console.log("Seeding blog posts...");
  
  // Get admin user (owner)
  const adminUsers = await db.select().from(users).where(eq(users.role, 'admin')).limit(1);
  
  if (adminUsers.length === 0) {
    console.error("No admin user found. Please ensure an admin user exists.");
    process.exit(1);
  }
  
  const adminId = adminUsers[0].id;
  console.log(`Using admin user: ${adminId}`);
  
  for (const post of blogPostsData) {
    const postData = {
      id: nanoid(),
      ...post,
      authorId: adminId,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await db.insert(blogPosts).values(postData);
    console.log(`✓ Added: ${post.title}`);
  }
  
  console.log("\n✅ Blog post seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error seeding blog posts:", error);
  process.exit(1);
});


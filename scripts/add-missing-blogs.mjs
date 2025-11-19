import { drizzle } from "drizzle-orm/mysql2";
import { blogPosts } from "../drizzle/schema.js";
import { nanoid } from "nanoid";
import * as dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

// Get admin user ID from environment
const ADMIN_ID = process.env.OWNER_OPEN_ID || 'admin';

const newBlogPosts = [
  {
    id: nanoid(),
    authorId: ADMIN_ID,
    slug: "guia-subvenciones-clubes-acuaticos",
    title: "Guía Completa de Subvenciones para Clubes Acuáticos 2025",
    excerpt: "Descubre todas las ayudas y subvenciones disponibles del CSD y comunidades autónomas para tu club deportivo. Más de €10,000 en subvenciones ocultas que puedes solicitar.",
    content: `<h2>Introducción</h2>
<p>Los clubes deportivos acuáticos en España tienen acceso a numerosas fuentes de financiación pública que muchas veces desconocen. Esta guía completa te ayudará a identificar y solicitar las subvenciones disponibles para tu club, desde el Consejo Superior de Deportes (CSD) hasta las comunidades autónomas y ayuntamientos locales.</p>

<h2>Subvenciones del Consejo Superior de Deportes (CSD)</h2>
<p>El CSD ofrece varias líneas de ayudas para clubes deportivos. Las subvenciones para tecnificación deportiva están dirigidas a clubes que participan en competiciones nacionales de alto nivel. Estas ayudas pueden cubrir gastos de entrenadores, material deportivo y desplazamientos a competiciones.</p>

<p>Las ayudas para la promoción del deporte base son otra línea importante. Estas subvenciones apoyan programas de iniciación deportiva para niños y jóvenes, con especial atención a la inclusión y la igualdad de género. Los clubes pueden solicitar hasta €15,000 anuales para programas de base.</p>

<p>El programa de Ayudas para la Adquisición de Material Deportivo (ADO) también está disponible para clubes que trabajan con deportistas de alto nivel. Esta línea puede financiar hasta el 80% del coste de equipamiento especializado como cronómetros electrónicos, plataformas de salida y sistemas de análisis de video.</p>

<h2>Subvenciones Autonómicas</h2>
<p>Cada comunidad autónoma tiene sus propias líneas de ayudas para clubes deportivos. En Cataluña, la Secretaria General de l'Esport ofrece subvenciones para infraestructuras deportivas que pueden cubrir hasta el 50% del coste de renovación de instalaciones acuáticas.</p>

<p>La Comunidad de Madrid dispone de ayudas específicas para clubes que organizan eventos deportivos de ámbito nacional o internacional. Estas subvenciones pueden alcanzar los €30,000 para competiciones de natación, waterpolo o natación sincronizada de alto nivel.</p>

<p>Andalucía ofrece el Programa de Tecnificación Deportiva Autonómica con ayudas de hasta €20,000 para clubes que cuenten con nadadores en programas de tecnificación. La Comunidad Valenciana tiene líneas similares con especial énfasis en deportes acuáticos.</p>

<h2>Ayudas Municipales y Locales</h2>
<p>Los ayuntamientos suelen ofrecer ayudas directas a clubes locales. Estas pueden incluir cesión gratuita o bonificada de instalaciones municipales, subvenciones para actividades de promoción deportiva local, y apoyo para programas de deporte escolar.</p>

<p>Muchos municipios tienen convenios específicos con clubes para la gestión de escuelas deportivas municipales. Estos acuerdos pueden proporcionar financiación estable y acceso preferente a instalaciones acuáticas municipales.</p>

<h2>Subvenciones de Diputaciones Provinciales</h2>
<p>Las diputaciones provinciales ofrecen líneas de ayuda complementarias a las autonómicas. Suelen centrarse en clubes de municipios pequeños y medianos, con el objetivo de equilibrar el desarrollo deportivo territorial.</p>

<p>Estas ayudas pueden cubrir gastos de funcionamiento ordinario, adquisición de material deportivo básico, y formación de entrenadores y personal técnico. Los importes suelen oscilar entre €3,000 y €10,000 por club.</p>

<h2>Fundaciones y Patrocinios Privados</h2>
<p>Además de las ayudas públicas, existen fundaciones privadas que apoyan el deporte base. La Fundación Trinidad Alfonso en la Comunidad Valenciana, la Fundación Deporte Joven del CSD, y diversas fundaciones bancarias ofrecen programas de apoyo a clubes deportivos.</p>

<p>Los patrocinios empresariales locales son otra fuente importante de financiación. Muchas empresas buscan asociarse con clubes deportivos locales como parte de su responsabilidad social corporativa.</p>

<h2>Requisitos Comunes y Documentación</h2>
<p>La mayoría de subvenciones requieren que el club esté legalmente constituido, inscrito en el registro de asociaciones deportivas, y al corriente de obligaciones fiscales y con la Seguridad Social. Es fundamental mantener esta documentación actualizada.</p>

<p>Los clubes deben presentar memorias de actividades, presupuestos detallados, y justificación del uso de subvenciones anteriores. Mantener una contabilidad ordenada y transparente es esencial para acceder a estas ayudas.</p>

<h2>Plazos y Calendario de Solicitudes</h2>
<p>Las convocatorias del CSD suelen publicarse en el primer trimestre del año, con plazo de presentación entre febrero y abril. Las ayudas autonómicas tienen calendarios variables, generalmente entre marzo y junio.</p>

<p>Es recomendable crear un calendario anual de todas las convocatorias relevantes y preparar la documentación con antelación. Muchas ayudas se conceden por orden de presentación hasta agotar el presupuesto disponible.</p>

<h2>Consejos para Maximizar las Ayudas</h2>
<p>Diversificar las fuentes de financiación es clave. No depender de una única línea de subvención proporciona mayor estabilidad financiera al club. Solicitar ayudas de diferentes administraciones y programas aumenta las posibilidades de éxito.</p>

<p>Establecer alianzas con otros clubes, federaciones y entidades deportivas puede fortalecer las solicitudes. Los proyectos colaborativos suelen tener mayor puntuación en las evaluaciones.</p>

<p>Invertir en formación sobre gestión de subvenciones y justificación de gastos es fundamental. Muchas federaciones y diputaciones ofrecen cursos gratuitos sobre estos temas.</p>

<h2>Conclusión</h2>
<p>Las subvenciones públicas y privadas representan una oportunidad significativa para los clubes acuáticos españoles. Con una planificación adecuada, conocimiento de las convocatorias disponibles, y una gestión profesional, los clubes pueden acceder a financiación que les permita crecer, mejorar sus instalaciones y ofrecer mejores servicios a sus deportistas.</p>

<p>La clave está en la constancia, la profesionalización de la gestión administrativa, y el desarrollo de proyectos deportivos sólidos que demuestren impacto social y deportivo. Las administraciones públicas buscan apoyar a clubes comprometidos con el desarrollo del deporte base y la formación de jóvenes deportistas.</p>`,
    category: "Gestión de Clubes",
    tags: "subvenciones, clubes, ayudas, financiación, CSD",
    coverImage: "/blog-subvenciones.jpg",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: nanoid(),
    authorId: ADMIN_ID,
    slug: "preparacion-competicion-natacion",
    title: "Preparación Profesional para Competiciones de Natación",
    excerpt: "Consejos de entrenadores profesionales para preparar competiciones de alto nivel. Estrategias de entrenamiento, nutrición y mentalidad ganadora.",
    content: `<h2>Introducción</h2>
<p>La preparación para una competición de natación de alto nivel es un proceso complejo que va mucho más allá del simple entrenamiento en el agua. Los nadadores de élite y sus entrenadores saben que el éxito competitivo requiere una planificación meticulosa que integra aspectos físicos, técnicos, nutricionales y psicológicos.</p>

<h2>Periodización del Entrenamiento</h2>
<p>La periodización es la base de cualquier programa de entrenamiento exitoso. Un ciclo típico de preparación para una competición importante se divide en macrociclos, mesociclos y microciclos, cada uno con objetivos específicos y progresiones planificadas.</p>

<p>El macrociclo general puede durar de 3 a 6 meses, dependiendo de la importancia de la competición objetivo. Durante este período, el entrenamiento progresa desde altos volúmenes de trabajo aeróbico hasta intensidades más altas con menor volumen, culminando en el tapering o puesta a punto final.</p>

<p>Los mesociclos de 3-4 semanas se enfocan en objetivos específicos: desarrollo de resistencia aeróbica, mejora de umbral anaeróbico, trabajo de velocidad máxima, o potencia específica de carrera. Cada mesociclo construye sobre el anterior, creando adaptaciones progresivas.</p>

<h2>Fases del Entrenamiento</h2>
<p>La fase de base, que típicamente dura 8-12 semanas, se centra en construir una sólida capacidad aeróbica y perfeccionar la técnica. Durante este período, los nadadores acumulan alto kilometraje con intensidades moderadas, trabajando los cuatro estilos y desarrollando eficiencia técnica.</p>

<p>La fase de construcción introduce trabajo de mayor intensidad. Las series de umbral anaeróbico, el trabajo de VO2 máximo, y las series de producción de lactato se vuelven más frecuentes. Esta fase, de 4-6 semanas, es físicamente muy exigente pero crucial para desarrollar la capacidad de mantener velocidades de carrera.</p>

<p>La fase de competición incluye el tapering y la competición misma. Durante las 2-3 semanas de tapering, el volumen se reduce significativamente (40-60% del volumen pico) mientras se mantiene la intensidad. Esto permite la recuperación completa y la supercompensación que conduce al rendimiento óptimo.</p>

<h2>Entrenamiento Técnico Específico</h2>
<p>La técnica de salida puede determinar el resultado en carreras de velocidad. Los nadadores de élite dedican sesiones específicas a perfeccionar la salida, trabajando la reacción al disparo, el ángulo de entrada, y la transición a la fase de nado. Mejoras de décimas de segundo en la salida pueden marcar la diferencia entre medalla y cuarto puesto.</p>

<p>Los virajes representan hasta el 30% del tiempo total en carreras de piscina de 25m. El trabajo específico de virajes incluye aproximación a velocidad de carrera, ejecución técnica perfecta, impulso explosivo, y transición eficiente a la fase submarina. Los mejores nadadores ejecutan virajes que les permiten ganar metros sobre sus competidores.</p>

<p>La fase submarina después de salidas y virajes es donde se alcanzan las velocidades máximas. El trabajo de ondulaciones subacuáticas, timing de la primera brazada, y transición suave a la frecuencia de nado de superficie son aspectos técnicos que requieren práctica específica regular.</p>

<h2>Nutrición para el Rendimiento</h2>
<p>La nutrición deportiva para nadadores de competición requiere atención meticulosa a macronutrientes, micronutrientes, timing de comidas, y estrategias de hidratación. Los carbohidratos son el combustible primario, con necesidades que varían de 5-10g por kg de peso corporal según la fase de entrenamiento.</p>

<p>Las proteínas son esenciales para la recuperación y adaptación muscular. Los nadadores de alto nivel necesitan 1.6-2.2g de proteína por kg de peso corporal diariamente, distribuida en 4-6 comidas para optimizar la síntesis proteica muscular.</p>

<p>La estrategia nutricional de competición comienza días antes del evento. La carga de carbohidratos en los 2-3 días previos maximiza las reservas de glucógeno. El día de la competición, las comidas deben ser familiares, fáciles de digerir, y consumidas con suficiente antelación (2-3 horas antes de competir).</p>

<h2>Hidratación Estratégica</h2>
<p>Aunque parezca contradictorio, los nadadores se deshidratan durante el entrenamiento y la competición. La pérdida de líquidos ocurre a través de la respiración, sudoración (que sí ocurre en el agua), y la presión hidrostática del agua sobre el cuerpo.</p>

<p>El protocolo de hidratación incluye beber regularmente durante todo el día, no solo durante entrenamientos. Los nadadores deben consumir 500ml de líquido 2-3 horas antes de competir, y 200-300ml 15-20 minutos antes. Durante competiciones con múltiples series, la rehidratación entre pruebas es crucial.</p>

<h2>Preparación Mental y Psicológica</h2>
<p>La fortaleza mental distingue a los campeones de los buenos nadadores. La visualización es una herramienta poderosa que los mejores nadadores practican diariamente. Visualizar cada aspecto de la carrera perfecta, desde el calentamiento hasta el toque final, construye confianza y reduce la ansiedad competitiva.</p>

<p>El establecimiento de objetivos debe seguir el modelo SMART: específicos, medibles, alcanzables, relevantes y temporales. Los objetivos de proceso (técnica, frecuencia de brazada, splits) son tan importantes como los objetivos de resultado (tiempos, posiciones).</p>

<p>Las rutinas pre-competitivas ayudan a mantener el enfoque y reducir la ansiedad. Estas rutinas pueden incluir música específica, ejercicios de respiración, visualización, y rituales personales que señalan al cerebro que es momento de rendir al máximo nivel.</p>

<h2>El Día de la Competición</h2>
<p>El calentamiento es crítico para el rendimiento óptimo. Un protocolo efectivo incluye 15-20 minutos de natación progresiva, ejercicios técnicos específicos del estilo de competición, 4-6 series cortas a ritmo de carrera, y finalmente natación suave para recuperar antes de la llamada.</p>

<p>La gestión del tiempo entre series requiere planificación. Los nadadores deben mantenerse activos con natación suave, estiramientos dinámicos, y ejercicios de activación. El objetivo es mantener el cuerpo caliente y los músculos activados sin causar fatiga adicional.</p>

<p>La estrategia de carrera debe estar clara antes de la competición. Esto incluye el plan de splits, la frecuencia de brazada objetivo, los puntos clave de la carrera, y el plan de ajuste si las cosas no van según lo previsto. Los mejores nadadores tienen planes A, B y C para diferentes escenarios.</p>

<h2>Recuperación Post-Competición</h2>
<p>La recuperación activa después de cada carrera es esencial, especialmente en competiciones con múltiples pruebas. 10-15 minutos de natación suave ayudan a eliminar lactato, reducir la rigidez muscular, y preparar el cuerpo para la siguiente prueba.</p>

<p>La nutrición post-competición debe comenzar dentro de los 30 minutos posteriores a la carrera. Una combinación de carbohidratos y proteínas (ratio 3:1) optimiza la recuperación del glucógeno y la reparación muscular.</p>

<h2>Análisis y Aprendizaje</h2>
<p>Después de la competición, el análisis detallado del rendimiento es crucial para el desarrollo continuo. Revisar videos, analizar splits, evaluar la ejecución técnica, y reflexionar sobre los aspectos mentales proporciona información valiosa para futuras competiciones.</p>

<p>Los mejores entrenadores y nadadores mantienen registros detallados de cada competición, incluyendo tiempos, sensaciones, estrategias que funcionaron o no, y lecciones aprendidas. Esta información guía los ajustes en el entrenamiento futuro.</p>

<h2>Conclusión</h2>
<p>La preparación profesional para competiciones de natación es un proceso holístico que requiere atención meticulosa a múltiples factores. El entrenamiento físico, la perfección técnica, la nutrición estratégica, la preparación mental, y la gestión inteligente de la competición se combinan para crear el rendimiento óptimo.</p>

<p>Los nadadores y entrenadores que adoptan un enfoque sistemático y profesional, prestando atención a cada detalle, son los que consistentemente logran sus objetivos competitivos y alcanzan su máximo potencial en el momento crucial de la competición.</p>`,
    category: "Técnica",
    tags: "competición, preparación, entrenamiento, alto rendimiento",
    coverImage: "/blog-preparacion.jpg",
    status: "published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function addBlogPosts() {
  try {
    console.log("Adding missing blog posts...");
    
    for (const post of newBlogPosts) {
      await db.insert(blogPosts).values(post);
      console.log(`✓ Added: ${post.title}`);
    }
    
    console.log("\n✅ All blog posts added successfully!");
  } catch (error) {
    console.error("Error adding blog posts:", error);
    process.exit(1);
  }
  process.exit(0);
}

addBlogPosts();


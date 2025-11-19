import { drizzle } from "drizzle-orm/mysql2";
import { federations } from "../drizzle/schema.ts";
import { nanoid } from "nanoid";
import * as dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

const federationsData = [
  {
    id: nanoid(),
    name: "Real Federación Española de Natación",
    acronym: "RFEN",
    description: "La Real Federación Española de Natación es la entidad encargada de organizar los deportes acuáticos en España, integrando a las federaciones autonómicas, clubes deportivos, deportistas, jueces y entrenadores. Es miembro de World Aquatics y European Aquatics.",
    logo: "https://rfen.es/wp-content/uploads/2023/01/RFEN-Blanco-PNG.png",
    website: "https://rfen.es",
    email: "rfen@rfen.es",
    phone: "915 57 20 16",
    address: "C/ de Juan Esplandiu, 1, Retiro, 28007 Madrid",
    region: "Nacional",
    type: "national",
    sports: "Natación, Waterpolo, Natación Artística, Saltos, Aguas Abiertas, Máster",
  },
  {
    id: nanoid(),
    name: "Federación Andaluza de Natación",
    acronym: "FAN",
    description: "Federación autonómica de deportes acuáticos de Andalucía, responsable de organizar y promover la natación y disciplinas acuáticas en la comunidad andaluza.",
    logo: null,
    website: "https://www.fan.es",
    email: "fan@fan.es",
    phone: "957 41 33 36",
    address: "C/ José Dámaso Pepete, nº9 - Portal 1 - Módulo B, 14005 Córdoba",
    region: "Andalucía",
    type: "regional",
    sports: "Natación, Waterpolo, Natación Artística, Saltos, Aguas Abiertas",
  },
  {
    id: nanoid(),
    name: "Federación de Natación de la Comunidad Valenciana",
    acronym: "FNCV",
    description: "Federación autonómica que organiza y promueve los deportes acuáticos en la Comunidad Valenciana, incluyendo competiciones de natación, waterpolo y otras disciplinas.",
    logo: null,
    website: "https://www.fncv.es",
    email: "fncv@fncv.es",
    phone: null,
    address: null,
    region: "Comunidad Valenciana",
    type: "regional",
    sports: "Natación, Waterpolo, Natación Artística, Saltos",
  },
  {
    id: nanoid(),
    name: "Federación Madrileña de Natación",
    acronym: "FMN",
    description: "Federación autonómica de deportes acuáticos de la Comunidad de Madrid, encargada de organizar competiciones y promover la práctica de la natación y disciplinas relacionadas.",
    logo: null,
    website: "https://federacionmadridnatacion.es",
    email: "fmn@federacionmadridnatacion.es",
    phone: null,
    address: null,
    region: "Madrid",
    type: "regional",
    sports: "Natación, Waterpolo, Natación Artística, Saltos, Aguas Abiertas",
  },
  {
    id: nanoid(),
    name: "Federació Catalana de Natació",
    acronym: "FCN",
    description: "Federación autonómica de deportes acuáticos de Cataluña, una de las más activas de España con gran tradición en natación y waterpolo.",
    logo: null,
    website: "https://www.fcnatacio.cat",
    email: "fcn@fcnatacio.cat",
    phone: null,
    address: null,
    region: "Cataluña",
    type: "regional",
    sports: "Natación, Waterpolo, Natación Artística, Saltos, Aguas Abiertas",
  },
  {
    id: nanoid(),
    name: "Federación Vasca de Natación",
    acronym: "FVNA",
    description: "Federación autonómica de deportes acuáticos del País Vasco, responsable de organizar competiciones y promover la natación en Euskadi.",
    logo: null,
    website: "https://www.euskalkirolak.eus/natacion",
    email: null,
    phone: null,
    address: null,
    region: "País Vasco",
    type: "regional",
    sports: "Natación, Waterpolo, Natación Artística, Aguas Abiertas",
  },
  {
    id: nanoid(),
    name: "Federación Gallega de Natación",
    acronym: "FGN",
    description: "Federación autonómica de deportes acuáticos de Galicia, encargada de organizar y promover la natación y disciplinas acuáticas en la comunidad gallega.",
    logo: null,
    website: "https://www.fgnatacion.com",
    email: "fgn@fgnatacion.com",
    phone: null,
    address: null,
    region: "Galicia",
    type: "regional",
    sports: "Natación, Waterpolo, Aguas Abiertas",
  },
  {
    id: nanoid(),
    name: "Federación de Natación de Castilla y León",
    acronym: "FENACYL",
    description: "Federación autonómica de deportes acuáticos de Castilla y León, responsable de organizar competiciones y promover la natación en la región.",
    logo: null,
    website: "https://fenacyl.com",
    email: "fenacyl@fenacyl.com",
    phone: null,
    address: null,
    region: "Castilla y León",
    type: "regional",
    sports: "Natación, Waterpolo, Natación Artística",
  },
];

async function seed() {
  console.log("Seeding federations...");
  
  for (const fed of federationsData) {
    await db.insert(federations).values(fed);
    console.log(`✓ Added: ${fed.name} (${fed.acronym})`);
  }
  
  console.log("\n✅ Federation seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error seeding federations:", error);
  process.exit(1);
});


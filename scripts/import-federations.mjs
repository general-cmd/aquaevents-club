import { drizzle } from "drizzle-orm/mysql2";
import { federations } from "../drizzle/schema.ts";
import fs from "fs";

const db = drizzle(process.env.DATABASE_URL);

const federationsData = JSON.parse(
  fs.readFileSync("/home/ubuntu/aquaevents-club/data/federations-original.json", "utf-8")
);

console.log(`Importing ${federationsData.length} federations...`);

// Clear existing federations first
await db.delete(federations);
console.log("Cleared existing federations");

for (const fed of federationsData) {
  const id = fed.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  
  await db.insert(federations).values({
    id,
    name: fed.name,
    type: fed.type,
    region: fed.region || null,
    email: fed.email || null,
    website: fed.website || null,
    phone: null,
    address: null,
    description: `Federación ${fed.type === "national" ? "nacional" : "regional"} de deportes acuáticos en ${fed.region || "España"}.`,
    logo: null,
    status: fed.status || "active",
    socialMedia: null,
  });
  
  console.log(`✓ Imported: ${fed.name}`);
}

console.log(`\n✅ Successfully imported ${federationsData.length} federations!`);

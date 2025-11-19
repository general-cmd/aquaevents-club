import { drizzle } from "drizzle-orm/mysql2";
import { federations } from "../drizzle/schema.ts";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);
const allFeds = await db.select().from(federations);

console.log(`Total federations: ${allFeds.length}`);

// Group by name
const nameGroups = {};
allFeds.forEach(fed => {
  if (!nameGroups[fed.name]) nameGroups[fed.name] = [];
  nameGroups[fed.name].push(fed);
});

const duplicates = Object.entries(nameGroups).filter(([_, feds]) => feds.length > 1);

if (duplicates.length === 0) {
  console.log('\n✅ No duplicates found!');
  process.exit(0);
}

console.log(`\n⚠️  Found ${duplicates.length} duplicate federation names`);

for (const [name, feds] of duplicates) {
  console.log(`\n  Processing: ${name} (${feds.length} copies)`);
  
  // Keep the one with most complete data (has website, email, description)
  const scored = feds.map(f => ({
    fed: f,
    score: (f.website ? 1 : 0) + (f.email ? 1 : 0) + (f.description ? f.description.length : 0)
  }));
  
  scored.sort((a, b) => b.score - a.score);
  const keep = scored[0].fed;
  const remove = scored.slice(1).map(s => s.fed);
  
  console.log(`    Keeping ID: ${keep.id} (score: ${scored[0].score})`);
  
  for (const fed of remove) {
    await db.delete(federations).where(eq(federations.id, fed.id));
    console.log(`    Deleted ID: ${fed.id}`);
  }
}

const remaining = await db.select().from(federations);
console.log(`\n✅ Cleanup complete! Remaining federations: ${remaining.length}`);

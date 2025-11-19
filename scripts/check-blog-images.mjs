import { drizzle } from "drizzle-orm/mysql2";
import { blogPosts } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);
const posts = await db.select().from(blogPosts);

console.log(`Found ${posts.length} blog posts:\n`);
posts.forEach(p => {
  console.log(`- ${p.title}`);
  console.log(`  Featured Image: ${p.featuredImage || 'MISSING'}\n`);
});

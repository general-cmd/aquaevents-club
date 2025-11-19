import { drizzle } from "drizzle-orm/mysql2";
import { blogPosts } from "../drizzle/schema.ts";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);

const imageMap = {
  "Cómo Mejorar tu Viraje en Natación": "/blog-viraje.jpg",
  "Preparación Mental para Competiciones de Natación": "/blog-preparacion.jpg",
  "Beneficios de la Natación en Aguas Abiertas": "/blog-aguas-abiertas.jpg",
  "Técnicas Avanzadas de Natación para Competidores": "/blog-competicion.jpg",
  "Nutrición Óptima para Nadadores de Competición": "/blog-nutricion.jpg"
};

const posts = await db.select().from(blogPosts);

for (const post of posts) {
  const imagePath = imageMap[post.title];
  if (imagePath) {
    await db.update(blogPosts)
      .set({ featuredImage: imagePath })
      .where(eq(blogPosts.id, post.id));
    console.log(`✅ Updated: ${post.title} -> ${imagePath}`);
  }
}

console.log("\n✅ All blog images updated!");

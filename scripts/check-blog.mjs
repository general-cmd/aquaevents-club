import { drizzle } from "drizzle-orm/mysql2";
import { blogPosts } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);
const posts = await db.select().from(blogPosts).limit(1);

if (posts.length > 0) {
  console.log('Title:', posts[0].title);
  console.log('Content length:', posts[0].content?.length || 0);
  console.log('Has featured image:', !!posts[0].featuredImage);
  console.log('Featured image:', posts[0].featuredImage);
  console.log('\nFirst 300 chars of content:');
  console.log(posts[0].content?.substring(0, 300));
}

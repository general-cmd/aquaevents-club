import { drizzle } from "drizzle-orm/mysql2";
import { blogPosts } from "../drizzle/schema.ts";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL);

// Function to convert markdown-style text to HTML
function markdownToHtml(text) {
  let html = text;
  
  // Convert ## headings to <h2>
  html = html.replace(/## (.+)/g, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>');
  
  // Convert **bold** to <strong>
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Convert paragraphs (double newline)
  html = html.split('\n\n').map(para => {
    if (para.startsWith('<h2')) return para;
    if (para.trim() === '') return '';
    return `<p class="mb-4 leading-relaxed">${para.replace(/\n/g, ' ')}</p>`;
  }).join('\n');
  
  // Convert [link](url) to <a>
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');
  
  return html;
}

const posts = await db.select().from(blogPosts);

for (const post of posts) {
  const htmlContent = markdownToHtml(post.content);
  
  await db.update(blogPosts)
    .set({ content: htmlContent })
    .where(eq(blogPosts.id, post.id));
  
  console.log(`✓ Updated: ${post.title}`);
}

console.log(`\n✅ Successfully converted ${posts.length} blog posts to HTML!`);

// helpers/blogs.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
// Assuming allBlogs and Blog interface are exported from '@/lib/constants'
import { allBlogs, Blog } from '@/lib/constants'; 

export const getBlogBySlug = (slug: string): Blog | undefined => {
  return allBlogs.find((blog) => blog.slug === slug);
};

export async function getBlogContent(contentPath: string) {
  // Note: For large production apps, loading from /public like this is less ideal than reading from the local file system using fs.
  
  // Method 1: Reading from the file system (Recommended for content files)
  const fullPath = path.join(process.cwd(), 'public', contentPath);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the post metadata and content
    const matterResult = matter(fileContents);
    
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    
    const contentHtml = processedContent.toString();

    // Return the content and any frontmatter (if needed later)
    return {
      contentHtml,
      // ... matterResult.data // Add frontmatter data here if you need it
    };
  } catch (error) {
    console.error(`Error reading or processing markdown file at ${fullPath}:`, error);
    return { contentHtml: `<p>Error loading content: File not found or failed to process.</p>` };
  }
}
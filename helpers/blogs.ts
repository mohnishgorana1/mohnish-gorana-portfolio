// helpers/blogs.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { allBlogs, Blog } from '@/lib/constants'; 

export const getBlogBySlug = (slug: string): Blog | undefined => {
  return allBlogs.find((blog) => blog.slug === slug);
};

export async function getBlogContent(contentPath: string) {
  const fullPath = path.join(process.cwd(), 'public', contentPath);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // Just parse the frontmatter, DO NOT convert to HTML here
    const { content, data } = matter(fileContents);
    
    return {
      content, // Send raw markdown/MDX string
      frontmatter: data
    };
  } catch (error) {
    console.error(`Error reading file at ${fullPath}:`, error);
    return { content: `<p>Error loading content.</p>` };
  }
}
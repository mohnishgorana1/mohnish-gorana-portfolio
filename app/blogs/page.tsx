// app/blogs/page.tsx
import React from "react";
import BlogCard from "@/components/BlogCard"; 
import { allBlogs, Blog } from "@/lib/constants"; 

// Next.js static metadata
export const metadata = {
  title: "My Blog - Latest Posts & Insights",
  description: "Explore my thoughts, tutorials, and insights on web development, React, Next.js, and more.",
};

const BlogsPage: React.FC = () => {
  // Sort blogs by date (optional, but good practice)
  const sortedBlogs: Blog[] = allBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16 pt-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Tech Insights & Articles
          </h1>
          <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            My thoughts on modern web development, tutorials, and coding experiences.
          </p>
        </header>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Handle No Blogs Case (Optional) */}
        {sortedBlogs.length === 0 && (
          <div className="text-center py-20 border border-dashed border-zinc-400 dark:border-zinc-700 rounded-xl mt-12">
            <h3 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
              No blogs published yet!
            </h3>
            <p className="text-zinc-500 dark:text-zinc-500 mt-2">
              Check back soon for new articles and insights.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
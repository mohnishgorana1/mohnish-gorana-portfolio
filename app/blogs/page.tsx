import React from "react";
// BlogCard component assumed to be styled matching the aesthetic
import BlogCard from "@/components/BlogCard"; 
import { allBlogs, Blog } from "@/lib/constants"; 

export const metadata = {
  title: "Logs & Writing | Mohnish Gorana",
  description: "Explore my thoughts, tutorials, and insights on web development and architecture.",
};

const BlogsPage = () => {
  const sortedBlogs: Blog[] = [...allBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen bg-background text-foreground pt-12 sm:pt-20 pb-10 selection:bg-primary/30">
      <div className="mx-auto">
        
        {/* Header Section */}
        <header className="mb-16 md:mb-24">
          <div className="inline-flex items-center px-3 py-1 mb-6 border border-border/50 bg-secondary/30 text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Knowledge Base
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-6">
            Engineering <span className="text-muted-foreground font-serif italic font-light">Logs.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed">
            Deep dives into modern web development, architectural decisions, and the tools I use to build scalable systems.
          </p>
        </header>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Empty State */}
        {sortedBlogs.length === 0 && (
          <div className="w-full py-24 flex flex-col items-center justify-center border border-dashed border-border/60 rounded-3xl bg-secondary/10">
            <h3 className="text-xl font-bold text-foreground">No logs published yet.</h3>
            <p className="text-muted-foreground mt-2 font-medium">System is currently being updated. Check back soon.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogsPage;
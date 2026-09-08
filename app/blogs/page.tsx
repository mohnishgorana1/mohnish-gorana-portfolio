import React from "react";
import { allBlogs, Blog } from "@/lib/constants"; 
import { Calendar, Clock, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Logs & Writing | Mohnish Gorana",
  description: "Explore my thoughts, tutorials, and insights on web development and architecture.",
};

interface BlogCardProps {
  blog: Blog;
}

const BlogsPage = () => {
  const sortedBlogs: Blog[] = [...allBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="min-h-screen max-w-4xl mx-auto bg-background text-foreground pt-10 selection:bg-primary/30 flex flex-col items-center">
      <div className="w-full px-4 sm:px-6">
        
        {/* Header Section */}
        <header className="mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border/60 shadow-sm text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-5">
            <Sparkles size={12} className="text-warning" /> Knowledge Base
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-surface-foreground leading-[1.1]">
            Engineering Logs.
          </h1>
          <p className="text-[15px] md:text-base text-muted-foreground font-medium leading-relaxed max-w-2xl">
            Deep dives into modern web development, architectural decisions, and the tools I use to build scalable systems.
          </p>
        </header>

        {/* Blog Grid (2-columns matching project details max-w-4xl width) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Empty State */}
        {sortedBlogs.length === 0 && (
          <div className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-border/60 rounded-3xl bg-surface/40">
            <h3 className="text-lg font-bold text-foreground">No logs published yet.</h3>
            <p className="text-muted-foreground text-sm mt-1 font-medium">System is currently being updated. Check back soon.</p>
          </div>
        )}
      </div>
    </main>
  );
};

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group block h-full outline-none">
      <div className={cn(
        "flex flex-col h-full rounded-2xl overflow-hidden",
        "bg-surface/40 hover:bg-surface transition-all duration-300 ease-out",
        "border border-border/50 hover:border-border",
        "shadow-sm hover:shadow-md hover:-translate-y-1 relative"
      )}>
        {/* Featured Badge */}
        {blog.isFeatured && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border/60 shadow-sm text-[10px] font-bold text-foreground tracking-wide">
            <Sparkles className="w-3 h-3 text-warning" />
            FEATURED
          </div>
        )}

        {/* Blog Image
        <div className="relative w-full aspect-video shrink-0 overflow-hidden bg-muted">
          <Image
            src={blog.imageUrl}
            alt={blog.altText}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div> */}

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col flex-1 justify-between">
          <div>
            {/* Tags / Category */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-secondary/50 border border-border/40 text-muted-foreground">
                {blog.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold text-foreground/90 group-hover:text-foreground transition-colors duration-300 line-clamp-2 tracking-tight leading-snug mb-2">
              {blog.title}
            </h2>

            {/* Short Description */}
            <p className="text-[13px] text-muted-foreground/80 font-medium line-clamp-3 leading-relaxed">
              {blog.shortDescription}
            </p>
          </div>

          {/* Metadata & Footer */}
          <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-medium">
            <div className="flex items-center space-x-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{blog.date}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{blog.readingTime}</span>
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-foreground font-semibold group-hover:translate-x-0.5 transition-transform">
              <span>Read</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogsPage;
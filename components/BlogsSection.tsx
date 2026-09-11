import React from "react";
import Link from "next/link";
import { allBlogs, Blog } from "@/lib/constants";
import { Calendar, Clock, Sparkles, ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

function BlogsSection() {
  const sortedBlogs: Blog[] = [...allBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Show up to 2 blogs on the home page: featured ones first, then most recent
  const featured = sortedBlogs.filter((b) => b.isFeatured);
  const rest = sortedBlogs.filter((b) => !b.isFeatured);
  const highlightedBlogs: Blog[] = [...featured, ...rest].slice(0, 2);

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-muted-foreground" />
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-surface-foreground">
            Logs & Writing
          </h2>
        </div>

        <Link
          href="/blogs"
          className="group flex items-center gap-1 text-[12px] md:text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>View all</span>
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Blog Cards Grid OR Empty State */}
      {highlightedBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {highlightedBlogs.map((blog) => (
            <BlogPreviewCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="w-full py-14 flex flex-col items-center justify-center border border-dashed border-border/60 rounded-2xl bg-surface/40">
          <h3 className="text-base font-bold text-foreground">No logs published yet.</h3>
          <p className="text-muted-foreground text-sm mt-1 font-medium">Check back soon.</p>
        </div>
      )}
    </div>
  );
}

function BlogPreviewCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group block h-full outline-none">
      <div
        className={cn(
          "flex flex-col h-full rounded-2xl overflow-hidden",
          "bg-surface/40 hover:bg-secondary/50 dark:hover:bg-surface transition-all duration-300 ease-out",
          "border-2 border-border dark:border-border/50 hover:border-border",
          "shadow-sm hover:shadow-md hover:-translate-y-1 relative"
        )}
      >
        {blog.isFeatured && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-md border border-border/60 shadow-sm text-[10px] font-bold text-foreground tracking-wide">
            <Sparkles className="w-3 h-3 text-warning" />
            FEATURED
          </div>
        )}

        <div className="p-5 md:p-6 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-secondary/50 border border-border/40 text-muted-foreground">
                {blog.category}
              </span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-foreground/90 group-hover:text-foreground transition-colors duration-300 line-clamp-2 tracking-tight leading-snug mb-2">
              {blog.title}
            </h3>

            <p className="text-[13px] text-muted-foreground/80 font-medium line-clamp-2 leading-relaxed">
              {blog.shortDescription}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-medium">
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
}

export default BlogsSection;
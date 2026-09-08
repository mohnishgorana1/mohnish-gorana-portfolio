import React from "react";
import { allBlogs } from "@/lib/constants";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { getBlogBySlug, getBlogContent } from "@/helpers/blogs";
import Link from "next/link";
// Import MDX tools
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Code blocks dark theme

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);
  if (!blog) return { title: "Log Not Found" };
  return {
    title: `${blog.title} | Mohnish Gorana`,
    description: blog.shortDescription,
  };
}

// 🌟 Custom Markdown Elements Styling
const mdxComponents = {
  h1: (props: any) => (
    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-10 mb-4 text-surface-foreground" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-xl md:text-2xl font-bold tracking-tight mt-8 mb-3 text-surface-foreground border-b border-border/40 pb-2" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-lg md:text-xl font-bold tracking-tight mt-6 mb-2 text-surface-foreground" {...props} />
  ),
  p: (props: any) => (
    <p className="text-[14px] md:text-[15px] text-muted-foreground font-medium leading-relaxed mb-6" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside space-y-2 mb-6 text-[14px] md:text-[15px] text-muted-foreground font-medium" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-6 text-[14px] md:text-[15px] text-muted-foreground font-medium" {...props} />
  ),
  li: (props: any) => (
    <li className="leading-relaxed" {...props} />
  ),
  pre: (props: any) => (
    <pre className="p-4 md:p-5 rounded-2xl bg-surface border border-border/60 overflow-x-auto shadow-md my-6 text-xs md:text-sm" {...props} />
  ),
  code: (props: any) => (
    <code className="font-mono text-xs md:text-sm bg-secondary/50 px-1.5 py-0.5 rounded-md border border-border/40 text-foreground" {...props} />
  ),
};

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);

  if (!blog) notFound();

  const contentData = await getBlogContent(blog.contentPath);

  // Configure plugins for syntax highlighting
  const options = {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypeHighlight],
    },
  };

  return (
    <main className="max-w-4xl mx-auto min-h-screen px-2 md:px-0 bg-background text-foreground pt-10 pb-12 selection:bg-primary/30 flex flex-col items-center">
      <article className="">
        
        {/* Back Link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground mb-4 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Logs
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest bg-secondary/50 border border-border/60 text-muted-foreground rounded-full font-bold">
              {blog.category}
            </span>
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 ml-1">
              <Calendar size={13} /> {blog.date}
            </span>
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 ml-2">
              <Clock size={13} /> {blog.readingTime}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-surface-foreground/90 mb-6">
            {blog.title}
          </h1>
        </header>

        {/* Hero Image */}
        <div className="relative w-full aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-surface border border-border/60 shadow-xl mb-12">
          <Image
            src={blog.imageUrl}
            alt={blog.altText}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* MDX CONTENT CONTAINER */}
        <div className="w-full mx-auto">
          <p className="text-base md:text-lg font-semibold leading-relaxed mb-8 pb-8 border-b border-border/50 text-foreground/80">
            {blog.blogDescription}
          </p>

          <div className="prose dark:prose-invert max-w-none text-muted-foreground">
            {/* The Magic Happens Here */}
            <MDXRemote
              source={contentData.content}
              components={mdxComponents}
              options={options}
            />
          </div>
        </div>

      </article>
    </main>
  );
};

export default BlogDetailPage;
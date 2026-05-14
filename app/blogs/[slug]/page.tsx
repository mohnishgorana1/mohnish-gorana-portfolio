import React from "react";
import { allBlogs } from "@/lib/constants";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, BookOpen, User, ArrowLeft } from "lucide-react";
import { getBlogBySlug, getBlogContent } from "@/helpers/blogs";
import Link from "next/link";
// Import MDX tools
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // This gives your code blocks a dark theme

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

// 🌟 Add Custom Components here if you want to render React inside MDX
// Example: If you want to use the <DebouncingAndThrottlingPage /> inside your markdown
const mdxComponents = {
  // You can map HTML tags to custom styled components here
  h1: (props: any) => (
    <h1 className="text-4xl font-black mt-10 mb-6 text-foreground" {...props} />
  ),
  h2: (props: any) => (
    <h2
      className="text-3xl font-bold mt-10 mb-4 text-foreground border-b border-border/50 pb-2"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="p-4 rounded-xl bg-[#0d1117] overflow-x-auto border border-border/50 shadow-xl my-6"
      {...props}
    />
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
    <main className="min-h-screen bg-background text-foreground pt-24 pb-24 selection:bg-primary/30">
      <article className="max-w-4xl mx-auto px-6">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-12 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Logs
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest bg-foreground text-background rounded-full font-bold">
              {blog.category}
            </span>
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Calendar size={14} /> {blog.date}
            </span>
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              <Clock size={14} /> {blog.readingTime}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] text-balance mb-6">
            {blog.title}
          </h1>
        </header>

        {/* Hero Image */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-secondary/20 border border-border shadow-2xl mb-16">
          <Image
            src={blog.imageUrl}
            alt={blog.altText}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* MDX CONTENT */}
        <div className="mx-auto">
          <p className="text-xl font-semibold leading-relaxed mb-10 pb-10 border-b border-border/50 text-foreground text-justify">
            {blog.blogDescription}
          </p>

          <div
            className="prose prose-lg dark:prose-invert prose-zinc max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight 
            prose-a:text-primary hover:prose-a:text-primary/80
            prose-img:rounded-2xl prose-img:border prose-img:border-border"
          >
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

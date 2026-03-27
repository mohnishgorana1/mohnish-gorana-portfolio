// app/blog/[slug]/page.tsx
import React from "react";
import { allBlogs, Blog } from "@/lib/constants"; // Adjust path as needed
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, BookOpen, User } from "lucide-react";
import { getBlogBySlug, getBlogContent } from "@/helpers/blogs";

// Next.js Static Generation utility function
export async function generateStaticParams() {
  return allBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Next.js Metadata Generation
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) {
    return { title: "Blog Not Found" };
  }
  return {
    title: `${blog.title} | Mohnish Gorana Blog`,
    description: blog.blogDescription, // Using the detailed description for SEO
  };
}

const BlogDetailPage = async ({ params }: { params: { slug: string } }) => {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    // If blog is not found (shouldn't happen often if static generation works)
    notFound();
  }

  const contentData = await getBlogContent(blog.contentPath);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      {/* Blog Header & Hero Image */}
      <header className="relative w-full h-80 sm:h-96 overflow-hidden">
        {/* Image */}
        <Image
          src={blog.imageUrl}
          alt={blog.altText}
          fill
          priority
          className="object-cover opacity-10 dark:opacity-20"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent  dark:to-zinc-900 z-0" />

        {/* Header Content */}
        <div className="px-1 md:px-2 lg:px-4 py-10  max-w-5xl mx-auto z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-3 leading-tight">
            {blog.title}
          </h1>
          {/* shortDescription */}
          <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 line-clamp-2 md:line-clamp-5">
            {blog.shortDescription}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" /> {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {blog.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {blog.readingTime}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> {blog.category}
            </span>
          </div>
        </div>
      </header>

      <article className="max-w-5xl mx-auto px-1 md:px-2 lg:px-4 pt-10">
        <p>{blog.blogDescription}</p>
      </article>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-1 md:px-2 lg:px-4 pb-10">
        <article className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: contentData.contentHtml }} />
        </article>
      </main>
    </div>
  );
};

export default BlogDetailPage;

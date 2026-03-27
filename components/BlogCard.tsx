// components/BlogCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/lib/constants";
import { Clock, Calendar, Sparkles } from "lucide-react";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group block h-full">
      <div className="flex flex-col rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl hover:shadow-2xl transition-all duration-300 h-full relative">
        {/* Featured Badge */}
        {blog.isFeatured && (
          <div className="absolute top-4 right-4 z-10 p-2 rounded-full bg-yellow-500 shadow-lg border border-yellow-300">
            <Sparkles className="w-5 h-5 text-white fill-white" />
          </div>
        )}

        {/* Blog Image */}
        <div className="relative w-full h-48 sm:h-56 shrink-0 overflow-hidden">
          <Image
            src={blog.imageUrl}
            alt={blog.altText}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
            {blog.title}
          </h2>

          {/* Short Description (More detailed now) */}
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 line-clamp-4 text-sm flex-1">
            {blog.shortDescription}
          </p>

          {/* Metadata */}
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500">
            <div className="flex items-center space-x-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{blog.date}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{blog.readingTime}</span>
              </span>
            </div>
            <span className="text-zinc-800 dark:text-zinc-200 font-medium">
              By {blog.author}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

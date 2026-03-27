// AccordionPage.tsx
"use client";
import Accordion from "@/components/machine-coding-tasks/accordian/Accordion";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { TbLayoutBottombarCollapse } from "react-icons/tb";

function AccordionPage() {
  return (
    // Invert the main gradient background
    <main className="min-h-screen w-full py-6 px-2 md:px-6 rounded-2xl bg-gradient-to-b dark:bg-gradient-to-br from-blue-100 via-slate-100 to-blue-100 dark:from-gray-950 dark:via-slate-900 dark:to-blue-950 shadow-2xl shadow-gray-500 dark:shadow-none">
      {/* --- Header Section --- */}
      <article className="flex flex-col md:flex-row w-full gap-6 items-start md:items-center justify-between mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Icon Container */}
          <div className="hidden md:flex items-center justify-center p-4 bg-white/60 dark:bg-gray-800/60 shadow-blue-100 dark:shadow-blue-950 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-gray-700/50">
            <TbLayoutBottombarCollapse className="text-4xl text-blue-600 dark:text-blue-400" />
          </div>

          <div className="space-y-2">
            {/* Removed h1 from original code, but included paragraph and added dark mode text color */}
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              A vertical stack of interactive headings that reveal content
              sections. Optimized for organizing complex information in a
              compact space.
            </p>
          </div>
        </div>

        {/* GitHub Link */}
        <Link
          href="https://github.com/mohnishgorana1/my-portfolio/blob/master/components/machine-coding-tasks/accordion"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-300 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-800 dark:hover:text-blue-100 font-semibold bg-blue-50 dark:bg-blue-900 px-5 py-2.5 rounded-full border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <FaGithub className="text-lg" />
          View Source Code
        </Link>
      </article>

      {/* --- Feature Cards --- */}
      <section className="grid md:grid-cols-3 gap-4 mx-auto mb-10">
        {/* Card 1: Smooth Expansion */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
              1
            </span>
            <h3 className="font-bold text-slate-700 dark:text-slate-100 text-sm">
              Smooth Expansion
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-11">
            Uses CSS Grid animation for seamless height transitions without
            fixed values.
          </p>
        </div>

        {/* Card 2: Single Active State */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
              2
            </span>
            <h3 className="font-bold text-slate-700 dark:text-slate-100 text-sm">
              Single Active State
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-11">
            Automatically collapses other sections when a new one is opened to
            keep the UI clean.
          </p>
        </div>

        {/* Card 3: Semantic Design */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
              3
            </span>
            <h3 className="font-bold text-slate-700 dark:text-slate-100 text-sm">
              Semantic Design
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-11">
            Built with accessibility in mind, using semantic details for clearer
            structure.
          </p>
        </div>
      </section>

      {/* --- Main Component --- */}
      <div className="mx-auto">
        <Accordion />
      </div>
    </main>
  );
}

export default AccordionPage;

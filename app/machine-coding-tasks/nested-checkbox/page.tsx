// NestedCheckboxPage.tsx
"use client";
import NESTEDCHECKBOX from "@/components/machine-coding-tasks/nested-checkbox/nested-checkbox";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { TbHierarchy2 } from "react-icons/tb";

function NestedCheckboxPage() {
  return (
    // Invert the main gradient background
    <main className="min-h-screen w-full p-1 sm:p-4 bg-gradient-to-br from-violet-50 via-slate-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950 rounded-2xl">
      {/* --- Header Section --- */}
      <article className="flex flex-col md:flex-row w-full gap-6 md:items-center justify-between mb-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Icon Container */}
          <div className="hidden md:flex items-center justify-center p-4 bg-white/60 dark:bg-gray-800/60 shadow-violet-100 dark:shadow-violet-950 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-gray-700/50">
            <TbHierarchy2 className="text-4xl text-violet-600 dark:text-violet-400" />
          </div>

          {/* Description Text */}
          <div className="space-y-2">
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              A recursive tree component where{" "}
              <strong className="text-violet-600 dark:text-violet-400">
                parent state depends on children
              </strong>
              , and{" "}
              <strong className="text-violet-600 dark:text-violet-400">
                children inherit from parents
              </strong>
              .
            </p>
          </div>
        </div>

        {/* GitHub Link */}
        <Link
          href="https://github.com/mohnishgorana1/my-portfolio/blob/master/components/machine-coding-tasks/nested-checkbox"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto md:mx-0 inline-flex items-center gap-2 text-violet-600 dark:text-violet-300 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-800 dark:hover:text-violet-100 font-semibold bg-violet-50 dark:bg-violet-900 px-5 py-2.5 rounded-full border border-violet-100 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-800 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <FaGithub className="text-lg" />
          View Source Code
        </Link>
      </article>

      {/* --- Feature Cards --- */}
      <section className="grid md:grid-cols-3 gap-4 max-w-7xl mx-auto mb-10">
        {/* Card 1: Downward Flow */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-violet-500"></span>
            <h3 className="font-bold text-slate-700 dark:text-slate-100 text-sm">Downward Flow</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-4">
            Checking a parent automatically checks <strong>all</strong> of its
            descendants recursively.
          </p>
        </div>

        {/* Card 2: Upward Flow */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <h3 className="font-bold text-slate-700 dark:text-slate-100 text-sm">Upward Flow</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-4">
            If <strong>all</strong> descendants are checked manually, the parent
            becomes checked automatically.
          </p>
        </div>

        {/* Card 3: Indeterminate Logic */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-slate-500"></span>
            <h3 className="font-bold text-slate-700 dark:text-slate-100 text-sm">
              Indeterminate Logic
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-4">
            Unchecking any single descendant will automatically uncheck the
            parent node (or set it to an indeterminate state, which this implementation handles by just unchecking).
          </p>
        </div>
      </section>

      {/* --- Main Component --- */}
      <div className="max-w-7xl mx-auto">
        <NESTEDCHECKBOX />
      </div>
    </main>
  );
}

export default NestedCheckboxPage;
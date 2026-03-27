// ChipsInputPage.tsx
"use client";
import ChipsInput from "@/components/machine-coding-tasks/chips-input/ChipsInput";
import { Cross, CrossIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { TbTags } from "react-icons/tb";

function ChipsInputPage() {
  return (
    // Invert the main gradient background
    <main className="min-h-screen w-full pb-10 p-2 md:p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-cyan-950 shadow-lg shadow-gray-500 dark:shadow-none">
      {/* --- Header Section --- */}
      <article className="flex flex-col md:flex-row w-full gap-6 md:items-center justify-between mb-4">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Icon Container */}
          <div className="hidden md:flex items-center justify-center p-4 bg-white/60 dark:bg-gray-800/60 shadow-blue-100 dark:shadow-blue-950 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-gray-700/50 hover:bg-blue-100 dark:hover:bg-blue-900">
            <TbTags className="text-4xl text-blue-600 dark:text-blue-400" />
          </div>

          {/* Description Text */}
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
            A dynamic input component that tokenizes text into chips on{" "}
            <kbd className="font-mono bg-slate-200 dark:bg-slate-700 dark:text-slate-200 px-1 rounded text-xs">
              Enter
            </kbd>
            . Perfect for tagging systems, email recipients, or categories.
          </p>
        </div>

        {/* GitHub Link */}
        <Link
          href="https://github.com/mohnishgorana1/my-portfolio/blob/master/components/machine-coding-tasks/chips-input"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto md:mx-0 inline-flex items-center gap-2 text-blue-600 dark:text-blue-300 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-800 dark:hover:text-blue-100 font-semibold bg-blue-50 dark:bg-blue-900 px-5 py-2.5 rounded-full border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <FaGithub className="text-lg" />
          View Source Code
        </Link>
      </article>

      {/* --- Feature Cards --- */}
      <section className="grid md:grid-cols-3 gap-4 max-w-7xl mx-auto mb-10">
        {/* Card 1: Enter to Add */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              ↵
            </span>
            <h3 className="font-bold text-slate-700 dark:text-slate-100 text-sm">Enter to Add</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-11">
            Type any value and press Enter to instantly convert it into a
            removable chip.
          </p>
        </div>

        {/* Card 2: Click to Remove */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              <MdCancel />
            </span>
            <h3 className="font-bold text-slate-700 dark:text-slate-100 text-sm">
              Click to Remove
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-11">
            Easily remove chips by clicking the cancel icon on individual items.
          </p>
        </div>

        {/* Card 3: Validation */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              !
            </span>
            <h3 className="font-bold text-slate-700 dark:text-slate-100 text-sm">Validation</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-11">
            Prevents empty strings and duplicate entries to ensure clean data.
          </p>
        </div>
      </section>

      {/* --- Main Component --- */}
      <div className="max-w-7xl mx-auto">
        <ChipsInput />
      </div>
    </main>
  );
}

export default ChipsInputPage;
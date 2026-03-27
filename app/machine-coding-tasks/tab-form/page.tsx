// TabFormPage.tsx
"use client";
import TabForm from "@/components/machine-coding-tasks/TabForm/TabForm";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { TbForms } from "react-icons/tb";

export default function TabFormPage() {
  return (
    // Invert the main gradient background
    <main className="min-h-screen w-full py-10 px-2 md:px-6 rounded-2xl bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50 dark:from-gray-950 dark:via-slate-900 dark:to-cyan-950 shadow-2xl shadow-gray-500 dark:shadow-none transition-all">
      {/* --- Header Section --- */}
      <article className="flex flex-col md:flex-row w-full gap-6 md:items-center justify-between mb-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Icon Container */}
          <div className="hidden md:flex items-center justify-center p-4 bg-white/60 dark:bg-gray-800/60 shadow-indigo-100 dark:shadow-indigo-950 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-gray-700/50">
            <TbForms className="text-4xl text-indigo-600 dark:text-indigo-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400">
              MULTI-STEP TAB FORM
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              A segmented form wizard with state preservation across tabs.
              Features{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">
                controlled inputs
              </strong>
              , complex nested state, and smooth transitions.
            </p>
          </div>
        </div>

        {/* GitHub Link */}
        <Link
          href="https://github.com/mohnishgorana1/my-portfolio/tree/master/components/machine-coding-tasks/TabForm"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto md:mx-0 inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-800 dark:hover:text-indigo-100 font-semibold bg-indigo-50 dark:bg-indigo-900 px-5 py-2.5 rounded-full border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <FaGithub className="text-lg" />
          View Source Code
        </Link>
      </article>

      {/* --- Feature Cards --- */}
      <section className="grid md:grid-cols-3 gap-4 max-w-7xl mx-auto mb-10">
        {/* Card 1: State Persistence */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
              1
            </span>
            <h3 className="font-bold text-slate-700 dark:text-slate-100 text-sm">
              State Persistence
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-11">
            Data remains intact when switching between tabs, allowing users to
            review and edit freely.
          </p>
        </div>

        {/* Card 2: Controlled Inputs */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
              2
            </span>
            <h3 className="font-bold text-slate-700 dark:text-slate-100 text-sm">
              Controlled Inputs
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-11">
            Every input field, checkbox, and radio button is fully controlled
            via a central React state.
          </p>
        </div>

        {/* Card 3: Smooth Navigation */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 p-4 rounded-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors group">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
              3
            </span>
            <h3 className="font-bold text-slate-700 dark:text-slate-100 text-sm">
              Smooth Navigation
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 pl-11">
            Navigate using either the tab headers or the bottom action buttons
            for a seamless flow.
          </p>
        </div>
      </section>

      {/* --- Main Component --- */}
      <div className="max-w-7xl mx-auto">
        <TabForm />
      </div>
    </main>
  );
}

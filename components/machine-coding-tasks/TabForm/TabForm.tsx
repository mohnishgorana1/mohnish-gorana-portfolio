// TabForm.tsx
"use client";
import React, { useState } from "react";
import Profile from "./Profile";
import Interests from "./Interests";
import Settings from "./Settings";
import { BsTerminal, BsCheckCircleFill } from "react-icons/bs";

export default function TabForm() {
  const [activeTab, setActiveTab] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    interests: [] as string[],
    theme: "light", // default val
  });

  const tabs = [
    { name: "Profile", component: Profile },
    { name: "Interests", component: Interests },
    { name: "Settings", component: Settings },
  ];

  const ActiveTabComponent = tabs[activeTab].component;

  const handleNext = () => setActiveTab((prev) => prev + 1);
  const handlePrev = () => setActiveTab((prev) => prev - 1);
  const handleSubmit = () => {
    console.log("data", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000); // Reset success msg
  };

  return (
    <main className="grid lg:grid-cols-12 gap-8 min-h-[550px]">
      {/* LEFT: Form Section */}
      <div className="lg:col-span-7 flex flex-col h-full relative overflow-hidden rounded-3xl border border-gray-200/60 dark:border-gray-700/60 bg-gray-300/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-xl shadow-indigo-100/50 dark:shadow-indigo-950/50 p-1 sm:p-2 transition-all">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-cyan-400"></div>

        {/* Tab Headers */}
        <div className="flex p-2 gap-2 bg-slate-100/50 dark:bg-slate-700/50 rounded-2xl m-2 sm:m-4">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ease-out
                ${
                  activeTab === idx
                    ? "bg-gray-100 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-black/15 dark:ring-white/10 transform scale-[1.02]"
                    : "text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-200"
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Active Content Area */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto custom-scrollbar">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 key={activeTab}">
            {/* @ts-ignore */}
            <ActiveTabComponent data={formData} setData={setFormData} />
          </div>
        </div>

        {/* Footer / Navigation */}
        <div className="p-4 sm:p-6 border-t border-white/60 dark:border-slate-700/60 flex justify-between items-center bg-white/30 dark:bg-slate-900/30">
          <button
            onClick={handlePrev}
            disabled={activeTab === 0}
            className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all 
                ${
                  activeTab === 0
                    ? "opacity-0 pointer-events-none"
                    : // Back button styles
                      "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 hover:shadow-sm"
                }
            `}
          >
            Back
          </button>

          {activeTab < tabs.length - 1 ? (
            // Next button styles
            <button
              onClick={handleNext}
              className="px-8 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-indigo-900 transition-all active:scale-95"
            >
              Next Step
            </button>
          ) : (
            // Submit button styles
            <button
              onClick={handleSubmit}
              className="px-8 py-2.5 rounded-xl font-semibold text-sm bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200 dark:shadow-emerald-900 transition-all active:scale-95 flex items-center gap-2"
            >
              {isSubmitted ? (
                <>
                  <BsCheckCircleFill /> Saved!
                </>
              ) : (
                "Submit Form"
              )}
            </button>
          )}
        </div>
      </div>

      {/* RIGHT: Live State Monitor (No changes needed, already dark-themed) */}
      <div className="lg:col-span-5 flex flex-col h-full">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-400/20 h-full flex flex-col">
          {/* Terminal Header */}
          <div className="bg-slate-950/50 border-b border-white/10 px-4 py-3 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
              <BsTerminal />
              <span>live_state.json</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="flex-grow p-6 font-mono text-xs sm:text-sm overflow-auto custom-scrollbar text-slate-300">
            <pre className="leading-relaxed">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-400">formData</span>{" "}
              <span className="text-slate-400">=</span>{" "}
              {JSON.stringify(formData, null, 2)}
            </pre>

            {isSubmitted && (
              <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-emerald-400 text-xs animate-in slide-in-from-bottom-2">
                <BsCheckCircleFill />
                <span>Form data successfully logged to console.</span>
              </div>
            )}
          </div>

          {/* Visual Decoration Bottom */}
          <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-50"></div>
        </div>
      </div>
    </main>
  );
}

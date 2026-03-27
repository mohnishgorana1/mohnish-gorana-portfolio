"use client";

import { useState } from "react";

function LearningDisclosureInfiniteScroll({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-neutral-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-3 font-semibold text-slate-700 dark:text-neutral-100 bg-slate-300 dark:bg-neutral-900 hover:bg-slate-400 dark:hover:bg-neutral-800 transition-colors duration-200 flex justify-between items-center"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          } text-slate-500 dark:text-neutral-400`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div
          className="p-4 text-sm bg-slate-200 dark:bg-neutral-900 border-t border-slate-300 dark:border-neutral-800 text-slate-700 dark:text-neutral-300"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default LearningDisclosureInfiniteScroll;

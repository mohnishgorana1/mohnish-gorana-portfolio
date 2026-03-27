// ProgressBarLine.tsx
"use client";
import React, { useState } from "react";

function ProgressBarLine() {
  const [currentProgress, setCurrentProgress] = useState<number>(5);

  const handleProgress = (type: "increment" | "decrement") => {
    setCurrentProgress((prevProgress: number) => {
      const step = 10;
      if (type === "increment") {
        return Math.min(100, prevProgress + step);
      } else {
        return Math.max(0, prevProgress - step);
      }
    });
  };
  return (
    <main className="flex flex-col gap-y-6 w-full px-4">
      <h1 className="font-bold text-base uppercase tracking-widest text-center text-slate-500 dark:text-slate-400">
        Live Preview
      </h1>

      <div className="flex flex-col items-center justify-center my-4 w-full">
        {/* Progress Track */}
        <div className="relative w-full md:w-[80%] h-6 bg-slate-200/70 dark:bg-gray-700/70 rounded-full shadow-inner overflow-hidden border border-slate-100 dark:border-gray-800">
          {/* Progress Fill */}
          <div
            className={`h-full rounded-full transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex items-center justify-end pr-3 shadow-sm
            ${
              currentProgress === 100
                ? "bg-gradient-to-r from-emerald-400 to-emerald-500 dark:from-emerald-500 dark:to-emerald-600"
                : "bg-gradient-to-r from-indigo-400 to-purple-500 dark:from-indigo-600 dark:to-purple-700"
            }
            ${currentProgress < 1 && "opacity-0"}
            `}
            style={{ width: `${currentProgress}%` }}
          >
            {currentProgress > 10 && (
              <span className="text-white text-[10px] font-bold tracking-wider drop-shadow-md">
                {currentProgress}%
              </span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={() => handleProgress("decrement")}
            disabled={currentProgress === 0}
            className={`h-10 px-6 rounded-full font-semibold text-sm transition-all duration-200 shadow-sm border
            ${
              currentProgress === 0
                ? "bg-slate-100 dark:bg-gray-800 text-slate-300 dark:text-gray-600 border-slate-100 dark:border-gray-800 cursor-not-allowed"
                : "bg-white dark:bg-gray-700 text-slate-600 dark:text-slate-200 border-slate-200 dark:border-gray-600 hover:border-orange-200 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 hover:shadow-md active:scale-95"
            }`}
          >
            Decrease
          </button>

          <button
            onClick={() => handleProgress("increment")}
            disabled={currentProgress === 100}
            className={`h-10 px-6 rounded-full font-semibold text-sm transition-all duration-200 shadow-lg shadow-indigo-200/50 dark:shadow-indigo-950/50 border border-transparent
            ${
              currentProgress === 100
                ? "bg-slate-100 dark:bg-gray-800 text-slate-300 dark:text-gray-600 shadow-none cursor-not-allowed"
                : "bg-indigo-600 dark:bg-indigo-700 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:shadow-indigo-300/60 dark:hover:shadow-indigo-950/60 active:scale-95"
            }`}
          >
            Increase
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProgressBarLine;

// ChipsInput.tsx
"use client";
import React, { useState } from "react";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { BsTerminal } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";

function ChipsInput() {
  const [data, setData] = useState<string[]>([]);
  const [currentValue, setCurrentValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    if (error) setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = currentValue.trim();

      if (trimmed === "") {
        setError("Please enter a valid text");
        return;
      }

      if (data.includes(trimmed)) {
        setError("This chip already exists");
        return;
      }

      setData((prev) => [...prev, trimmed]);
      setCurrentValue("");
      setIsSubmitted(false); // Reset submit state on modification
    }
  };

  const handleDelete = (itemToDelete: string) => {
    const newData = data.filter((oldValues) => oldValues !== itemToDelete);
    setData(newData);
    setIsSubmitted(false);
  };

  return (
    <main className="grid lg:grid-cols-2 gap-8 min-h-[500px]">
      {/* LEFT: Input Section */}
      <section className="flex flex-col h-full relative overflow-hidden rounded-3xl border border-white/60 dark:border-gray-700/60 bg-gray-200 dark:bg-gray-800 backdrop-blur-xl shadow-xl shadow-blue-100/50 dark:shadow-blue-950/50 p-6 sm:p-8 transition-all hover:bg-gray-300/50 dark:hover:bg-gray-700/50">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <IoIosAddCircleOutline className="text-blue-500 dark:text-blue-400 text-2xl" />
            Add Tags
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Type a keyword and press{" "}
            <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-mono text-xs text-slate-600 dark:text-slate-300 font-bold">
              Enter
            </kbd>
          </p>
        </div>

        {/* Input Field */}
        <div className="relative group mb-4">
          <input
            type="text"
            className="w-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 pl-4 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-400 dark:focus:border-blue-500 transition-all shadow-sm text-slate-700 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="e.g. React, Design, UI..."
          />
          {error && (
            <span className="absolute -bottom-6 left-1 text-xs text-rose-500 font-medium animate-in slide-in-from-top-1">
              {error}
            </span>
          )}
        </div>

        {/* Chips Container */}
        <div className="flex flex-wrap gap-2 mt-4 flex-grow content-start min-h-[100px]">
          {data.length > 0 ? (
            data.map((item, idx) => (
              <div
                key={idx}
                // Updated chip styling for dark mode
                className="group/chip flex items-center gap-2 pl-3 pr-1 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium transition-all hover:bg-blue-100 dark:hover:bg-blue-800 hover:shadow-sm animate-in zoom-in duration-200"
              >
                <span>{item}</span>
                <button
                  // Updated remove button styling
                  className="p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-700 text-blue-400 dark:text-blue-500 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                  onClick={() => handleDelete(item)}
                >
                  <MdCancel className="text-lg" />
                </button>
              </div>
            ))
          ) : (
            // Empty state styling
            <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-slate-500 dark:text-slate-500 text-base italic bg-slate-50/50 dark:bg-gray-900/50">
              No chips added yet
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {data.length} {data.length === 1 ? "Item" : "Items"} Added
          </span>
          <button
            onClick={() => setIsSubmitted(true)}
            disabled={data.length < 1}
            className={`
              px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95 flex items-center gap-2
              ${
                data.length < 1
                  ? // Disabled state styling
                    "bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-500 shadow-none cursor-not-allowed"
                  : // Enabled state styling
                    "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 dark:shadow-blue-900 hover:shadow-blue-300"
              }
            `}
          >
            <span>Save Changes</span>
            <MdCheckCircle />
          </button>
        </div>
      </section>

      {/* RIGHT: Output Section (No changes needed, as it was already dark-themed) */}
      <section className="flex flex-col h-full relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-400/20 p-0">
        {/* Terminal Header */}
        <div className="bg-slate-950/50 border-b border-white/10 px-4 py-3 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
            <BsTerminal />
            <span>output.json</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-grow p-6 font-mono text-sm overflow-auto custom-scrollbar relative">
          {isSubmitted && data.length > 0 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-400">submittedData</span>{" "}
              <span className="text-slate-400">=</span>{" "}
              <span className="text-yellow-400">[</span>
              <div className="pl-4 flex flex-col gap-1 my-1">
                {data.map((item, i) => (
                  <span key={i} className="text-emerald-400">
                    "{item}"
                    <span className="text-slate-500">
                      {i < data.length - 1 ? "," : ""}
                    </span>
                  </span>
                ))}
              </div>
              <span className="text-yellow-400">];</span>
              <div className="mt-6 text-slate-500 border-t border-slate-800 pt-4 text-xs">
                // Data ready for API submission
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-700 gap-2 select-none">
              <div className="w-12 h-12 rounded-xl border border-dashed border-slate-800 bg-slate-800/50 flex items-center justify-center">
                <span className="text-2xl opacity-50">⚡</span>
              </div>
              <p>Waiting for submission...</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default ChipsInput;

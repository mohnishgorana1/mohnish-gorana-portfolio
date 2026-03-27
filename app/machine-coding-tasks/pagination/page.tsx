import Pagination from "@/components/machine-coding-tasks/Pagination/Pagination";
import React from "react";

function PaginationPage() {
  return (
    <main className="min-h-screen w-full py-8 bg-background">
      {/* --- Description Section --- */}
      <article className="md:grid md:grid-cols-5 mb-8 ">
        <div className="md:col-span-4 space-y-4">
          <p className=" text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed ">
            A fully functional{" "}
            <strong className="text-blue-600 dark:text-blue-400">
              Frontend Pagination System
            </strong>{" "}
            built using <strong>React</strong> and <strong>Tailwind CSS</strong>
            . <br className="hidden md:flex" /> It efficiently handles large
            datasets by dividing them into smaller, manageable pages.
          </p>
          <div className="flex flex-col sm:flex-row items-start md:items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <span
              // Updated: Lightened background for dark mode badges
              className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full border border-slate-200 dark:border-gray-700 shadow-sm"
            >
              📦 10 Products per page
            </span>
            <span
              // Updated: Lightened background for dark mode badges
              className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full border border-slate-200 dark:border-gray-700 shadow-sm"
            >
              ⚡ Client-side slicing
            </span>
          </div>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-4">
            👉 You can check out the full source code here:{" "}
            <a
              href="https://github.com/mohnishgorana1/my-portfolio/tree/master/components/machine-coding-tasks/Pagination"
              target="_blank"
              rel="noopener noreferrer"
              // Updated: Link color for dark mode
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline decoration-blue-300 dark:decoration-blue-600 underline-offset-4 transition-colors"
            >
              GitHub Link
            </a>
          </p>
        </div>

        <ul className="col-span-1 hidden md:flex md:flex-col gap-1 text-base text-slate-500 dark:text-slate-400 mt-2">
          <li>• Fetches 100 items once</li>
          <li>• No re-fetching</li>
          <li>• Instant transitions</li>
        </ul>
      </article>

      <section
        className=" relative overflow-hidden backdrop-blur-xl"
      >
        <div className="relative z-10">
          <Pagination />
        </div>
      </section>
    </main>
  );
}

export default PaginationPage;

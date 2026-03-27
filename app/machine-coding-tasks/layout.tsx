"use client";
import Navbar from "@/components/Navbar";
import { TextScramble } from "@/components/ui/text-scramble";
import { machineCodingTaskConfigs } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

export default function MachineCodingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const BASE_PATH = "/machine-coding-tasks";

  // --- LOGIC START ---

  // 1. Determine current page slug
  const currentPageSlug = pathname?.split("/").filter(Boolean).pop();

  // 2. Check if we are on the main listing page
  // (Check if the last segment is strictly 'machine-coding-tasks')
  const isHomePage = currentPageSlug === "machine-coding-tasks";

  // 3. Format the name directly
  const currentTaskName = currentPageSlug
    ? currentPageSlug.replace(/-/g, " ").toUpperCase()
    : "MACHINE CODING CHALLENGES"; // Added default for home page

  // 4. Calculate Next Logic
  const currentIndex = machineCodingTaskConfigs.findIndex((task) =>
    pathname.endsWith(task.path)
  );

  const nextPath =
    currentIndex !== -1 && currentIndex < machineCodingTaskConfigs.length - 1
      ? `${BASE_PATH}/${machineCodingTaskConfigs[currentIndex + 1].path}`
      : BASE_PATH;

  const nextLabel =
    currentIndex !== -1 && currentIndex < machineCodingTaskConfigs.length - 1
      ? `${machineCodingTaskConfigs[currentIndex + 1].name} `
      : "Back to Home";

  // --- LOGIC END ---

  return (
    <main className="min-h-screen bg-backgroud px-2">
      <header className="mt-3 pb-4 flex items-end justify-between mx-auto">
        <Link
          href={
            isHomePage
              ? BASE_PATH
              : `${BASE_PATH}/${
                  machineCodingTaskConfigs[currentIndex]?.path ?? ""
                }`
          }
          className="group relative"
        >
          <span
            className="block text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-300 uppercase mb-1 group-hover:text-blue-400 group-hover:dark:text-blue-400 transition-colors"
          >
            {isHomePage ? "Dashboard" : "Current Challenge"}
          </span>

          {/* Main Title with Gradient */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-blue-700 to-indigo-600 dark:from-gray-50 dark:via-blue-400 dark:to-indigo-300 group-hover:to-blue-600 dark:group-hover:to-blue-400 transition-all duration-300"
          >
            {currentTaskName}
          </h1>

          {/* Animated Underline */}
          <span
            // Updated: bg-blue-600 -> dark:bg-blue-400
            className="absolute -bottom-1 left-0 w-0 h-[3px] bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full rounded-full opacity-80"
          ></span>
        </Link>

        {!isHomePage && (
          <Link
            href={nextPath}
            className="flex items-center gap-x-2 group pl-4 pb-1"
          >
            <div className="flex flex-col items-end">
              <span
                className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5 group-hover:text-blue-500 transition-colors"
              >
                Next Up
              </span>
              <span
                className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 group-hover:text-blue-700 group-hover:dark:text-blue-400 transition-colors underline-offset-4 group-hover:underline"
              >
                {nextLabel}
              </span>
            </div>
            {/* Icon Wrapper */}
            <div
              className="bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 group-hover:border-blue-200 group-hover:dark:border-blue-500 group-hover:bg-blue-50 group-hover:dark:bg-blue-900/50 transition-all"
            >
              <TbPlayerTrackNextFilled
                className="text-gray-400 dark:text-gray-500 w-3 h-3 sm:w-4 sm:h-4 group-hover:text-blue-600 group-hover:dark:text-blue-400 group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </div>
          </Link>
        )}
      </header>

      <div className="space-y-4 mx-auto py-4 md:py-2 ">
        <div className="my-1">{children}</div>
      </div>
    </main>
  );
}
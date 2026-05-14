"use client";
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

  // --- LOGIC START (100% UNTOUCHED) ---

  // 1. Determine current page slug
  const currentPageSlug = pathname?.split("/").filter(Boolean).pop();

  // 2. Check if we are on the main listing page
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
    <main className="min-h-screen bg-background px-4 sm:px-6 w-full max-w-6xl mx-auto pt-24 pb-12">
      
      {/* SHARP HEADER */}
      <header className="mb-12 pb-6 border-b border-border/50 flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        <Link
          href={
            isHomePage
              ? BASE_PATH
              : `${BASE_PATH}/${machineCodingTaskConfigs[currentIndex]?.path ?? ""}`
          }
          className="group flex flex-col"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase mb-2">
            {isHomePage ? "Directory" : "Current Execution"}
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground group-hover:text-muted-foreground transition-colors duration-300">
            {currentTaskName}
          </h1>
        </Link>

        {/* NEXT UP BUTTON (Sharp & Minimal) */}
        {!isHomePage && (
          <Link
            href={nextPath}
            className="group flex items-center gap-4 text-right hover:bg-secondary/30 p-2 -mr-2 transition-colors duration-300"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest mb-1">
                Next Up
              </span>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {nextLabel}
              </span>
            </div>
            {/* Sharp Square Icon Box */}
            <div className="flex items-center justify-center size-10 border border-border bg-secondary text-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-300 shrink-0">
              <TbPlayerTrackNextFilled className="w-4 h-4" />
            </div>
          </Link>
        )}
      </header>

      {/* RENDER CHILDREN */}
      <div className="w-full">
        {children}
      </div>
      
    </main>
  );
}
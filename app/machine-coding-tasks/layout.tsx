"use client";
import { machineCodingTaskConfigs } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function MachineCodingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const BASE_PATH = "/machine-coding-tasks";

  // --- LOGIC START (100% UNTOUCHED) ---
  const currentPageSlug = pathname?.split("/").filter(Boolean).pop();
  const isHomePage = currentPageSlug === "machine-coding-tasks";
  const currentTaskName = currentPageSlug
    ? currentPageSlug.replace(/-/g, " ").toUpperCase()
    : "MACHINE CODING CHALLENGES"; 

  const currentIndex = machineCodingTaskConfigs.findIndex((task) =>
    pathname.endsWith(task.path)
  );

  const nextPath =
    currentIndex !== -1 && currentIndex < machineCodingTaskConfigs.length - 1
      ? `${BASE_PATH}/${machineCodingTaskConfigs[currentIndex + 1].path}`
      : BASE_PATH;

  const nextLabel =
    currentIndex !== -1 && currentIndex < machineCodingTaskConfigs.length - 1
      ? `${machineCodingTaskConfigs[currentIndex + 1].name}`
      : "Back to Directory";
  // --- LOGIC END ---

  return (
    <main className="min-h-screen bg-background px-4 sm:px-6 py-10 w-full max-w-4xl mx-auto flex flex-col">
      
      {/* SHARP & SEAMLESS HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6 mb-2 border-b border-border/40">
        
        {/* Left: Path & Title */}
        <Link
          href={
            isHomePage
              ? BASE_PATH
              : `${BASE_PATH}/${machineCodingTaskConfigs[currentIndex]?.path ?? ""}`
          }
          className="group flex flex-col outline-none"
        >
          <div className="flex items-center gap-2 mb-2.5">
            <div className="size-1.5 rounded-full bg-foreground/30 group-hover:bg-foreground transition-colors duration-300" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-muted-foreground uppercase">
              {isHomePage ? "Directory" : "Current Execution"}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground group-hover:text-foreground/70 transition-colors duration-300 leading-[1.1]">
            {currentTaskName}
          </h1>
        </Link>

        {/* Right: Next Up Minimal Link */}
        {!isHomePage && (
          <Link
            href={nextPath}
            className="group flex items-center gap-3 text-right outline-none shrink-0"
          >
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-mono font-bold text-muted-foreground/70 uppercase tracking-[0.2em] mb-0.5">
                Next Up
              </span>
              <span className="text-[13px] md:text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                {nextLabel}
              </span>
            </div>
            <div className="flex items-center justify-center size-9 rounded-full bg-secondary/30 border border-border/40 text-muted-foreground group-hover:bg-foreground group-hover:border-foreground group-hover:text-background transition-all duration-300">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
          </Link>
        )}
      </header>

      {/* RENDER CHILDREN */}
      <div className="w-full flex-1">
        {children}
      </div>
      
    </main>
  );
}
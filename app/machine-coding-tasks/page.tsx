"use client";
import { machineCodingTaskConfigs } from "@/lib/constants";
import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MachineCodingTasks() {
  const pathname = usePathname();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  return (
    <div className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4"
      >
        {machineCodingTaskConfigs.map((task, index) => (
          <motion.div key={task.path} variants={itemVariants} className="h-full">
            <Link
              href={`${pathname}/${task.path}`}
              className={cn(
                "group relative flex flex-col justify-between h-full p-5 md:p-6 outline-none",
                "bg-secondary/10 hover:bg-secondary/30  transition-all duration-300 ease-out",
                "border-2 border-border/70 dark:border-border/50 hover:border-border",
                "rounded-xl md:rounded-2xl",
                "shadow-sm hover:shadow-md shadow-muted dark:shadow-muted/10 hover:-translate-y-1"
              )}
            >
              {/* TOP: Number & Icon */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-300">
                  TASK {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className="p-1.5 rounded-lg bg-secondary/30 text-muted-foreground group-hover:text-foreground group-hover:bg-secondary/80 transition-colors duration-300">
                  <Code2 size={14} strokeWidth={2.5} />
                </div>
              </div>

              {/* MIDDLE: Title & Description */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-foreground/90 tracking-tight group-hover:text-foreground transition-colors duration-300 leading-tight mb-2">
                  {task.name}
                </h2>
                <p className="text-[13px] text-muted-foreground/80 font-medium leading-relaxed line-clamp-2">
                  {task.description}
                </p>
              </div>

              {/* BOTTOM: Action Area */}
              <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-4">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors duration-300">
                  Execute
                </span>
                <div className="flex items-center justify-center size-7 rounded-full bg-background border border-border/40 text-muted-foreground group-hover:bg-foreground group-hover:border-foreground group-hover:text-background transition-all duration-300">
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
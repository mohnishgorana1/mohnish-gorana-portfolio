"use client";
import { machineCodingTaskConfigs } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";

export default function MachineCodingTasks() {
  const pathname = usePathname();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="w-full">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col w-full"
      >
        {machineCodingTaskConfigs.map((task, index) => (
          <motion.div key={task.path} variants={itemVariants}>
            <Link
              href={`${pathname}/${task.path}`}
              className="group relative flex items-center justify-between py-6 sm:py-8 border-b border-border/50 hover:bg-secondary/20 transition-colors duration-500"
            >
              {/* Left Edge Active Indicator Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-foreground scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out" />

              {/* Left Side: Number & Name */}
              <div className="flex items-center gap-6 sm:gap-10 px-4 sm:px-6">
                <span className="text-xs font-mono text-muted-foreground font-semibold">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground tracking-tight group-hover:translate-x-3 transition-transform duration-500">
                  {task.name}
                </h2>
              </div>

              {/* Right Side: Hover Action */}
              <div className="flex items-center gap-4 px-4 sm:px-6 overflow-hidden">
                <span className="hidden sm:block text-[10px] font-mono text-muted-foreground uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Execute Task
                </span>
                {/* Arrow slides in from left */}
                <ArrowRight className="text-foreground -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
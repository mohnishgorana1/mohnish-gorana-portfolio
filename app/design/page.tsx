"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import { designShowcaseConfigs } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function DesignArchivePage() {
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
    <div className="w-full min-h-screen bg-background text-foreground pt-8 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-surface-foreground leading-[1.1]">
            Design Archive.
          </h1>
          <p className="text-[15px] md:text-base text-muted-foreground font-medium max-w-2xl leading-relaxed">
            A collection of premium components, micro-interactions, and interface layouts inspired by the best in the industry.
          </p>
        </motion.div>

        {/* Minimalist Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2"
        >
          {designShowcaseConfigs.map((item, index) => (
            <motion.div key={item.path} variants={itemVariants} className="h-full">
              <Link
                href={`/design/${item.path}`}
                className={cn(
                 "min-h-66 group relative flex flex-col justify-between h-full p-5 md:p-6 outline-none",
                "bg-secondary/10 hover:bg-secondary/30  transition-all duration-300 ease-out",
                "border-2 border-border/70 dark:border-border/50 hover:border-border",
                "rounded-xl md:rounded-2xl",
                "shadow-sm hover:shadow-md shadow-muted dark:shadow-muted/10 hover:-translate-y-1"
                )}
              >
                {/* TOP: Inspiration Tag & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground/60 group-hover:text-muted-foreground transition-colors duration-300 uppercase">
                    {item.inspiration ? `REF: ${item.inspiration}` : "COMPONENT"}
                  </span>
                  <div className="p-1.5 rounded-lg bg-secondary/30 text-muted-foreground group-hover:text-foreground group-hover:bg-secondary/80 transition-colors duration-300">
                    <Layers size={14} strokeWidth={2.5} />
                  </div>
                </div>

                {/* MIDDLE: Title & Description */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-foreground/90 tracking-tight group-hover:text-foreground transition-colors duration-300 leading-tight mb-2">
                    {item.name}
                  </h2>
                  <p className="text-[13px] text-muted-foreground/80 font-medium leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* BOTTOM: Action Area */}
                <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-4">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest group-hover:text-foreground transition-colors duration-300">
                    Explore
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
    </div>
  );
}
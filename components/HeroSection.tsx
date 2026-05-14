"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Layers,
  Database,
  Sparkles,
  Terminal,
} from "lucide-react";
import { techStacksMap } from "@/lib/constants";
import { MovingBorderButton } from "./ui/moving-border-button";

const heroTechStacks = [
  "NextJS",
  "Typescript",
  "TailwindCSS",
  "MongoDB",
  "Clerk",
];

export default function HeroSection() {
  // 🌟 TUMHARE NAVBAR WALI EXACT GLASS THEME
  const glassClasses = `
    backdrop-blur-lg border 
    bg-white/70 border-black/10 shadow-lg shadow-black/25
    dark:bg-white/5 dark:border-white/10 
  `;

  // Animation variants for the Command Palette items
  const listVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="w-full flex flex-col items-center justify-between pt-8 md:pt-10 lg:pt-12 pb-10">
      {/* main */}
      <div className="w-full mx-auto px-4 grid md:grid-cols-12 items-center justify-between gap-12">
        {/* =========================================
            LEFT SIDE: Ultra-Simple, Honest Text
        ========================================= */}
        <div className="w-full col-span-1 md:col-span-8 flex flex-col items-start text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 backdrop-blur-sm text-sm font-medium text-foreground"
          >
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
            </span>
            Available for work
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
          >
            Building robust apps.
            <br />
            <span className="text-muted-foreground">Designing clean UI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base lg:text-xl md:text-lg text-muted-foreground max-w-md tracking-tight"
          >
            A Full-Stack Developer specializing in Next.js and the MERN stack. I
            focus on writing scalable code and creating micro-interactions that
            feel buttery smooth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto"
          >
            <Link href="/projects" className="w-full sm:w-auto cursor-pointer">
              <MovingBorderButton className="w-full sm:w-auto">
                Explore Projects
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </MovingBorderButton>
            </Link>
            <Link href="/machine-coding-tasks" className="w-full sm:w-auto">
              <button
                className={`cursor-pointer w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full px-6 font-medium text-foreground transition-all hover:scale-105 active:scale-95 duration-500 ease-in-out  dark:shadow-neutral-700/15 ${glassClasses}`}
              >
                See Coding Tasks
              </button>
            </Link>
          </motion.div>
        </div>

        {/* =========================================
            RIGHT SIDE: The "Command Palette" Concept
        ========================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            type: "spring",
            stiffness: 80,
          }}
          className="w-full col-span-1 md:col-span-4 flex justify-center lg:justify-end"
        >
          {/* Main Command Window */}
          <div
            className={`w-full max-w-100 rounded-2xl flex flex-col overflow-hidden ${glassClasses}`}
          >
            {/* Interactive List Area */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className="p-2 space-y-1"
            >
              <motion.div
                variants={itemVariants}
                className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Core Stack
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-200/80 border border-transparent hover:border-neutral-300/40 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-background border border-border/50 text-foreground shadow-sm group-hover:scale-105 transition-transform">
                    <Terminal size={14} />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Next.js & React
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">Frontend</span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-200/80 border border-transparent hover:border-neutral-300/40 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-background border border-border/50 text-foreground shadow-sm group-hover:scale-105 transition-transform">
                    <Database size={14} />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Node.js & MongoDB
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">Backend</span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="px-3 py-2 mt-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Design Value
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-200/80 border border-transparent hover:border-neutral-300/40 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-background border border-border/50 text-foreground shadow-sm group-hover:scale-105 transition-transform">
                    <Sparkles size={14} />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Fluid Micro-interactions
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">UI/UX</span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-200/80 border border-transparent hover:border-neutral-300/40 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-background border border-border/50 text-foreground shadow-sm group-hover:scale-105 transition-transform">
                    <Layers size={14} />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Component Architecture
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">Systems</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* =========================================
          BOTTOM: TUMHARA ACTUAL TECH STACK 
      ========================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="w-full px-4 flex flex-col gap-y-4 mt-8"
      >
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest pl-1">
          Technologies Used
        </h3>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5 lg:gap-8 p-4 rounded-3xl backdrop-blur-xl bg-neutral-100 dark:bg-neutral-950 border border-white/40 dark:border-white/10 shadow-lg shadow-neutral-200 dark:shadow-none">
          {heroTechStacks.map((tech, idx) => {
            const techData = techStacksMap[tech];
            if (!techData) return null;
            const Icon = techData.icon;

            // Logic for Adaptive Black/White icons (NextJS, Liveblocks, etc)
            const isBlackIcon =
              techData.color === "#000000" || techData.color === "#101010";

            return (
              // 🌟 INDIVIDUAL BLURRY TECH STACK PILL
              <button
                key={idx}
                className="group flex items-center justify-center gap-2.5 
                  bg-white/50 dark:bg-white/5 backdrop-blur-md
                  px-4 py-2.5 rounded-2xl border border-white/50 dark:border-white/10 
                  hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 ease-in cursor-pointer 
                  hover:shadow-lg hover:-translate-y-1"
              >
                {/* adaptive color wrapper */}
                <div
                  className={`flex items-center justify-center ${isBlackIcon ? "dark:invert opacity-80 group-hover:opacity-100" : "opacity-90 group-hover:opacity-100"} transition-opacity`}
                >
                  <Icon
                    size={18}
                    color={isBlackIcon ? undefined : techData.color}
                  />
                </div>

                <span className="font-semibold text-foreground/80 group-hover:text-foreground text-sm transition-colors tracking-tight">
                  {tech}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

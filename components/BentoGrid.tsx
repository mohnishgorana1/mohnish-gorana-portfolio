"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Database,
  Activity,
  Zap,
  GraduationCap,
  BookOpen,
  ArrowUpRight,
  Sprout,
} from "lucide-react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
}

const BentoCard = ({ children, className }: BentoCardProps) => {
  return (
    <div
      className={`group flex flex-col justify-between p-6 sm:p-8 h-full w-full 
      bg-background/95 dark:bg-[#050505] backdrop-blur-xl 
      hover:bg-secondary/40 dark:hover:bg-neutral-900 transition-colors duration-500 cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

export default function BentoGridSection() {
  const latestBlog = {
    title: "Server Components vs. Client Components: A Next.js Deep Dive",
    link: "/blogs/nextjs-server-client-deep-dive",
    date: "Oct 26",
  };

  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="stats" className="w-full bg-background py-8 sm:py-16 ">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center px-3 py-1 mb-6 border border-border/50 bg-secondary/30 text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Identity & Focus
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Developer{" "}
            <span className="text-muted-foreground font-serif italic font-light">
              Snapshot.
            </span>
          </h2>
        </div>
        
        {/* THE GRID */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border/50  border border-border/60 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 dark:shadow-xl dark:shadow-gray-50/5"
        >
          {/* 1. LOCATION & TIME (2 Columns) */}
          <div className="md:col-span-2">
            <BentoCard>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe size={14} />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    01 / Base
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/50 px-2.5 py-1 rounded border border-border/50">
                  <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-foreground">
                    {time || "00:00"} IST
                  </span>
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  Neemuch, India
                </h3>
                <p className="mt-2 text-muted-foreground text-sm font-medium">
                  Operating from Madhya Pradesh. <br />
                  Available for global remote collaboration.
                </p>
              </div>
            </BentoCard>
          </div>

          {/* 2. PROJECT SPOTLIGHT: MDRIVE (2 Columns) */}
          <div className="md:col-span-2">
            <BentoCard>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Database size={14} />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    02 / Current Build
                  </span>
                </div>
                <Zap size={14} className="text-amber-500" />
              </div>
              <div className="mt-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-2">
                  MDrive
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  Developing a secure, high-performance cloud storage platform
                  focused on seamless file management.
                </p>
              </div>
            </BentoCard>
          </div>

          {/* 3. ACTIVE STATUS (1 Column) */}
          <div className="md:col-span-1">
            <BentoCard className="items-start justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Activity size={14} />
                <span className="text-[10px] font-mono uppercase tracking-widest">
                  Status
                </span>
              </div>
              <div className="mt-auto">
                <h3 className="text-lg flex items-center gap-2 font-bold text-foreground">
                  Open to Work{" "}
                  <div className="h-2 w-2 rounded-full animate-pulse bg-green-500 mt-0.5"></div>
                </h3>
                <p className="text-[10px] text-muted-foreground font-semibold mt-1 uppercase tracking-widest pl-4">
                  * Full-Time <br />* Remote
                </p>
              </div>
            </BentoCard>
          </div>

          {/* 4. THE FIELD  */}
          <div className="md:col-span-1">
            <BentoCard className="justify-between items-start">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sprout size={14} />
                <span className="text-[10px] font-mono uppercase tracking-widest">
                  Off-Grid
                </span>
              </div>
              <div className="mt-auto w-full flex flex-col ">
                <h3 className="text-xl font-black text-foreground tracking-tight leading-tight">
                  Field Focus.
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-2">
                  • Cricket 🏏 <br /> • Farming 🌾
                </p>
              </div>
            </BentoCard>
          </div>

          {/* 5. ACADEMIC FOUNDATION (2 Columns) */}
          <div className="md:col-span-2">
            <BentoCard>
              <div className="flex items-center gap-2 mb-6 text-muted-foreground">
                <GraduationCap size={16} />
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  03 / Academic Background
                </span>
              </div>
              <div className="mt-auto space-y-2">
                <div className="flex items-end justify-between border-b border-border/50 pb-2">
                  <span className="text-sm font-bold text-foreground">
                    MCA Graduate
                  </span>
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    Post Grad
                  </span>
                </div>
                <div className="flex items-end justify-between border-b border-border/50 pb-2">
                  <span className="text-sm font-bold text-foreground">
                    B.Sc Computer Science
                  </span>
                  <span className="text-xs font-mono text-muted-foreground uppercase">
                    Undergrad
                  </span>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* 6. LATEST LOG (Full Width - 4 Columns) */}
          <div className="md:col-span-4">
            <Link href={latestBlog.link} className="block h-full">
              <BentoCard className="flex-col sm:flex-row items-start sm:items-center justify-between !p-6 sm:!p-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <div className="flex items-center justify-center size-12 border border-border/50 text-foreground group-hover:scale-105 transition-transform duration-500 shrink-0">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                        Latest Log
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {latestBlog.date}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-1">
                      {latestBlog.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center justify-center size-10 border border-border/50 text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-colors duration-500 shrink-0">
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
              </BentoCard>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

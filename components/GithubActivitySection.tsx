"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsGithub, BsTerminal, BsGit } from "react-icons/bs";
import { FiActivity } from "react-icons/fi";

const GITHUB_USERNAME = "mohnishgorana1";
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`;
const CYCLE_INTERVAL_MS = 6000;

// 🌟 Smooth, Apple-like transition (Less bouncy, more fluid)
const activityVariants = {
  enter: { y: 20, opacity: 0, scale: 0.98, filter: "blur(4px)" },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: {
    zIndex: 0,
    y: -20,
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function GithubActivitySection() {
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // 🌟 EXACT SAME GLASS THEME FOR CONSISTENCY
  const glassClasses = `
    backdrop-blur-lg border 
    bg-white/70 border-black/10 shadow-lg shadow-black/5
    dark:bg-white/5 dark:border-white/10 dark:shadow-none
  `;

  const fetchGithubActivity = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("API Limit Reached");
      const data = await response.json();
      const filtered = data
        .filter((event: any) => ["PushEvent", "CreateEvent"].includes(event.type))
        .slice(0, 5);
      setActivities(filtered);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubActivity();
  }, []);

  useEffect(() => {
    if (activities.length === 0) return;
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, CYCLE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [activities.length]);

  const currentActivity = activities[key % activities.length];

  if (isLoading || error || activities.length === 0) return null;

  return (
    <section className="py-12 bg-backgroundtext-foreground overflow-hidden ">
      <div className="mx-auto flex flex-col items-center">
        
       
        <div className="flex flex-col items-center mb-12 space-y-4 text-center">
          
          {/* Live Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 backdrop-blur-sm text-sm font-medium text-foreground"
          >
            <span className="relative flex size-2 ">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
            </span>
            Live GitHub Feed
          </motion.div>

          {/* Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground flex items-center justify-center gap-4 "
          >
            <BsGithub className="text-foreground" />
            Recent <span className="text-muted-foreground font-serif italic font-light">Commits.</span>
          </motion.h2>
        </div>

       
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-full relative group"
        >
          {/* Background subtle glow */}
          <div className=" absolute -inset-1 bg-linear-to-r from-muted to-border rounded-3xl blur-xl opacity-50 dark:opacity-20 pointer-events-none" />

          <div className={`relative w-full overflow-hidden rounded-lg  ${glassClasses}`}>
            
            {/* macOS Style Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-secondary/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-sm" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground font-medium bg-background/50 px-3 py-1 rounded-md border border-border/50">
                <BsTerminal size={14} /> 
                <span>activity.log</span>
              </div>
              {/* Invisible div to perfectly center the terminal title */}
              <div className="w-[52px]"></div> 
            </div>

            {/* Terminal Body / Viewport */}
            <div className="h-[180px] md:h-[150px] relative px-6 py-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentActivity.id}
                  variants={activityVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-x-6 top-6 flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  
                  {/* Left Side: Repo & Event Info */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <BsGit className="text-foreground" size={14} />
                      <span className="text-xs font-mono font-bold text-muted-foreground tracking-widest uppercase">
                        {currentActivity.type === "PushEvent" ? "git push --origin" : "git init"}
                      </span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-foreground truncate">
                      <a
                        href={`https://github.com/${currentActivity.repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4 decoration-border transition-all"
                      >
                        {currentActivity.repo.name.split("/")[1]}
                      </a>
                    </h3>

                    {/* Commit Message Box */}
                    <div className="mt-3 p-3 bg-secondary/50 rounded-xl border border-border/50 w-full md:w-[85%]">
                      <p className="text-sm font-mono text-foreground/80 truncate">
                        <span className="text-emerald-500 dark:text-emerald-400 mr-2">❯</span>
                        {currentActivity.type === "PushEvent" 
                          ? `"${currentActivity.payload?.commits?.[0]?.message || "Update repository"}"`
                          : `Created new repository`}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Timestamp & Action */}
                  <div className="flex flex-col items-start md:items-end shrink-0 gap-2">
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5 bg-secondary px-2.5 py-1 rounded-md border border-border/50">
                      <FiActivity className="text-emerald-500" /> 
                      {new Date(currentActivity.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <a
                      href={`https://github.com/${currentActivity.repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-foreground bg-background border border-border hover:bg-secondary px-3 py-1.5 rounded-full transition-colors"
                    >
                      View Code
                    </a>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </motion.div>

      </div>
    </section>
  );
}
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsGithub, BsTerminal, BsGit } from "react-icons/bs";
import { FiActivity } from "react-icons/fi";

const GITHUB_USERNAME = "mohnishgorana1";
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`;
const CYCLE_INTERVAL_MS = 6000;

const activityVariants = {
  enter: {
    y: 60,
    opacity: 0,
    scale: 0.9,
    filter: "blur(10px)",
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  exit: {
    zIndex: 0,
    y: -60,
    opacity: 0,
    scale: 0.9,
    filter: "blur(10px)",
    transition: {
      duration: 0.4,
      ease: "circIn",
    },
  },
};

const GithubActivitySection = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [error, setError] = useState(null);

  const fetchGithubActivity = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("API Limit Reached");
      const data = await response.json();
      const filtered = data
        .filter((event) => ["PushEvent", "CreateEvent"].includes(event.type))
        .slice(0, 5);
      setActivities(filtered);
    } catch (err) {
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
    <section className="py-12 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* --- Heading Section --- */}
        <div className="flex flex-col items-center mb-10 space-y-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest">
              Live Feed
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter flex items-center gap-3">
            <BsGithub className="text-blue-600" /> GitHub Activity
          </h2>
        </div>

        {/* --- Terminal Style Container --- */}
        <div className="relative group">
          {/* Decorative Corner Accents */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-zinc-300 dark:border-zinc-700" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-zinc-300 dark:border-zinc-700" />

          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-xl shadow-2xl shadow-blue-500/5">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-800/50">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                <BsTerminal /> <span>bash — activity.log</span>
              </div>
            </div>

            {/* Content Viewport */}
            <div className="h-[140px] md:h-[160px] relative px-6 py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentActivity.id}
                  variants={activityVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-x-6 top-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <BsGit className="text-blue-500" />
                        <span className="text-xs font-mono font-bold text-blue-500 uppercase">
                          {currentActivity.type === "PushEvent" ? "git_push" : "git_create"}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white truncate max-w-[300px] md:max-w-md">
                        <a
                          href={`https://github.com/${currentActivity.repo.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-500 transition-colors"
                        >
                          {currentActivity.repo.name.split("/")[1]}
                        </a>
                      </h3>
                    </div>

                    <div className="flex flex-col items-start md:items-end">
                      <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                        <FiActivity /> UPDATED_{new Date(currentActivity.created_at).toLocaleDateString().replace(/\//g, "-")}
                      </span>
                      <a
                        href={`https://github.com/${currentActivity.repo.name}`}
                        target="_blank"
                        className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1 uppercase hover:underline"
                      >
                        [ View Repo ]
                      </a>
                    </div>
                  </div>

                  {/* Sub-text Area */}
                  <div className="mt-4 p-2 bg-zinc-200/30 dark:bg-white/5 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700">
                    <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 truncate italic">
                      {currentActivity.type === "PushEvent" 
                        ? `> commit: "${currentActivity.payload?.commits?.[0]?.message || "No message"}"`
                        : `> Initialized new repository on GitHub`}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubActivitySection;
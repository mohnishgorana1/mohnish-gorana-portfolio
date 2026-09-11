"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsGithub, BsJournalCode, BsGit, BsPinAngle } from "react-icons/bs";
import { FiActivity, FiClock } from "react-icons/fi";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SiGithub } from "react-icons/si";
import type { GithubActivityData, Commit, Repo } from "@/lib/github";

const GITHUB_USERNAME = "mohnishgorana1";
const GRAPH_URL = `https://ghchart.rshah.org/10b981/${GITHUB_USERNAME}`;

const contentContainerCardClasses =
  `w-full max-w-full rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col overflow-hidden
  bg-surface dark:bg-surface/50
  border border-border dark:border-0
  shadow-lg hover:shadow-xl shadow-secondary dark:shadow-none dark:hover:shadow-none transition-all duration-300`

// 🌟 Data now arrives as a prop — fetched server-side in page.tsx
export default function GithubActivitySection({ data }: { data: GithubActivityData }) {
  const { events, pinnedRepos, activeRepos, commitsMap } = data;

  // 🌟 Only the live-activity slideshow index remains client state
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    if (events.length === 0) return;
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [events]);

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="w-full flex flex-col items-center mt-10 max-w-4xl px-4 sm:px-0">
      {/* --- HEADER --- */}
      <div className="w-full flex flex-col items-center mb-8 md:mb-10 space-y-2.5 md:space-y-3">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-x-3 text-surface-foreground"
        >
          <BsGithub size={30} className="text-foreground shrink-0 mt-0.5" />
          <span>GITHUB</span>
          <span className="text-muted-foreground">
            ECOSYSTEM
          </span>
        </motion.h2>
      </div>

      {/* Content */}
      <div className="w-full mx-auto flex flex-col items-center gap-y-6">
        {/* Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={cn("overflow-hidden overflow-x-auto no-scrollbar", contentContainerCardClasses)}
        >
          <h3 className="text-sm md:text-[15px] font-bold text-surface-foreground mb-3 md:mb-4 flex items-center gap-2">
            <FiActivity className="text-success shrink-0" size={16} />
            Contribution Graph
          </h3>
          <div className="w-full max-w-full overflow-x-auto no-scrollbar pb-1">
            <div className="min-w-[600px] md:min-w-[700px] opacity-90 hover:opacity-100 transition-opacity">
              <img
                src={GRAPH_URL}
                alt="GitHub Contributions"
                className="w-full object-contain dark:invert dark:hue-rotate-180"
              />
            </div>
          </div>
        </motion.div>

        {/* Pinned Repo */}
        {pinnedRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={cn("", contentContainerCardClasses)}
          >
            <h3 className="text-sm md:text-[15px] font-bold text-surface-foreground mb-3 md:mb-4 flex items-center gap-2">
              <BsPinAngle className="text-accent shrink-0" size={15} />
              Top / Pinned Repositories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pinnedRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} commits={commitsMap[repo.id] || []} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Active Repo*/}
        {activeRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={cn("", contentContainerCardClasses)}
          >
            <h3 className="text-sm md:text-[15px] font-bold text-surface-foreground mb-3 md:mb-4 flex items-center gap-2">
              <BsJournalCode className="text-warning shrink-0" size={15} />
              Recently Active
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeRepos.map((repo) => (
                <RepoCard
                  key={repo.id}
                  repo={repo}
                  commits={commitsMap[repo.id] || []}
                  showLanguage
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Live activity */}
        <div className={cn("", contentContainerCardClasses)}>
          <div className="flex items-center justify-between mb-4 md:mb-6 gap-2">
            <h3 className="text-sm md:text-[15px] font-bold text-surface-foreground flex items-center gap-2 min-w-0">
              <BsGit className="text-foreground shrink-0" size={15} />
              <span className="truncate">Live Activity</span>
            </h3>
            <span className="relative flex size-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-success" />
            </span>
          </div>

          {/* Sliding Animation Container */}
          <div className="relative min-h-[120px] md:min-h-[130px] flex items-center overflow-hidden bg-secondary/10 rounded-2xl px-4 md:px-6 py-4 md:py-0">
            <AnimatePresence mode="wait">
              {events.length > 0 ? (
                <motion.div
                  key={currentEventIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full flex flex-col min-w-0"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="flex items-center justify-center size-5 rounded-full bg-success/20 text-success shrink-0">
                      <BsGit size={10} />
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                      <FiClock size={10} />
                      {timeAgo(events[currentEventIndex].created_at)}
                    </span>
                  </div>

                  <a
                    href={`https://github.com/${events[currentEventIndex].repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-[15px] font-bold text-foreground hover:text-accent transition-colors line-clamp-1 mb-2 mt-1 break-all"
                  >
                    {events[currentEventIndex].repo.name.split("/")[1]}
                  </a>

                  <div className="text-xs md:text-[13px] text-muted-foreground px-2.5 md:px-3 py-2 bg-secondary/50 border border-border rounded-xl line-clamp-2 leading-relaxed flex items-start gap-2">
                    <span className="text-success font-mono mt-[1px] shrink-0">❯</span>
                    <span className="min-w-0 break-words">
                      {events[currentEventIndex].type === "PushEvent"
                        ? events[currentEventIndex].payload?.commits?.[0]?.message ||
                        "Updated repository"
                        : "Created new repository"}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <p className="text-xs text-muted-foreground/70 italic">No recent activity found.</p>
              )}
            </AnimatePresence>
          </div>


          {/* Profile btn */}
          <Link
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 mb-4 flex items-center justify-center gap-x-2 w-full py-2.5 md:py-3 rounded-xl border border-border bg-muted duration-300 transition-colors hover:bg-muted/80 text-xs font-bold text-foreground"
          >
            <SiGithub size={16} /> View Full Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

function RepoCard({
  repo,
  commits,
  showLanguage = false,
}: {
  repo: Repo;
  commits: Commit[];
  showLanguage?: boolean;
}) {
  return (
    <Link
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-2.5 md:gap-3 p-3.5 md:p-4 rounded-xl md:rounded-2xl bg-background dark:bg-background/80 dark:hover:bg-background border border-border dark:border-0 hover:border-foreground/10 dark:hover:border-0 transition-colors min-w-0 shadow-md hover:shadow-lg shadow-secondary dark:shadow-none dark:hover:shadow-none"
    >
      <div className="flex items-center justify-between gap-2 min-w-0">
        <h4 className="font-semibold text-sm text-foreground/80 group-hover:text-foreground transition-colors line-clamp-1 min-w-0">
          {repo.name}
        </h4>
        {showLanguage && repo.language && (
          <span className="shrink-0 flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {repo.language}
          </span>
        )}
      </div>

      <div className="flex flex-col min-w-0">
        {commits.length > 0 ? (
          commits.map((commit) => (
            <p
              key={commit.sha}
              className="text-[12px] text-muted-foreground/80 leading-relaxed line-clamp-1 flex items-start gap-1.5 min-w-0"
            >
              <span className="text-muted-foreground/50 mt-[1px] shrink-0">—</span>
              <span className="truncate">{commit.message}</span>
            </p>
          ))
        ) : (
          <p className="text-[11px] text-muted-foreground/60 italic">No recent commits</p>
        )}
      </div>
    </Link>
  );
}
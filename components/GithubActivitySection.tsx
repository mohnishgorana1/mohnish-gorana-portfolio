"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BsGithub, BsStar, BsJournalCode, BsGit, BsPinAngle } from "react-icons/bs";
import { FiActivity, FiClock } from "react-icons/fi";

const GITHUB_USERNAME = "mohnishgorana1";
// Generate the contribution graph image (Green theme)
const GRAPH_URL = `https://ghchart.rshah.org/10b981/${GITHUB_USERNAME}`;

export default function GithubActivitySection() {
  const [events, setEvents] = useState<any[]>([]);
  const [pinnedRepos, setPinnedRepos] = useState<any[]>([]);
  const [activeRepos, setActiveRepos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Activities and Repositories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=15`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=30`)
        ]);

        if (eventsRes.ok && reposRes.ok) {
          const eventsData = await eventsRes.json();
          const reposData = await reposRes.json();

          // 1. Filter Activity Feed (Last 5 commits/creates)
          const filteredEvents = eventsData
            .filter((event: any) => ["PushEvent", "CreateEvent"].includes(event.type))
            .slice(0, 5);

          // 2. Extract Top/Pinned Repos (Sorted by Stars)
          const topRepos = [...reposData]
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 4);
          
          // 3. Extract Recently Active Repos (Excluding the ones already in Top/Pinned)
          const topRepoIds = new Set(topRepos.map(repo => repo.id));
          const recentRepos = reposData
            .filter((repo: any) => !topRepoIds.has(repo.id))
            .slice(0, 4);

          setEvents(filteredEvents);
          setPinnedRepos(topRepos);
          setActiveRepos(recentRepos);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper to format time like "2 hours ago"
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center mt-10 mb-6">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col items-center mb-10 space-y-3 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-background shadow-sm text-[11px] font-bold text-muted-foreground uppercase tracking-widest"
        >
          <BsGithub size={14} className="text-foreground" />
          GitHub Ecosystem
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-surface-foreground"
        >
          Open Source <span className="text-muted-foreground font-serif italic font-light">Footprint.</span>
        </motion.h2>
      </div>

      <div className="w-full flex flex-col gap-5">
        
        {/* --- FULL WIDTH GRAPH ROW --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-full rounded-[24px] bg-surface border border-border shadow-lg p-5 md:p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-neutral-900/30"
        >
          <h3 className="text-[15px] font-bold text-surface-foreground mb-4 flex items-center gap-2">
            <FiActivity className="text-success" />
            Contribution Graph
          </h3>
          {/* Scrollable container for mobile to prevent squishing */}
          <div className="w-full overflow-x-auto no-scrollbar pb-2">
            <div className="min-w-[700px] opacity-90 hover:opacity-100 transition-opacity">
              {/* Dark mode filter inversion trick for the graph */}
              <img 
                src={GRAPH_URL} 
                alt="GitHub Contributions" 
                className="w-full object-contain dark:invert dark:hue-rotate-180" 
              />
            </div>
          </div>
        </motion.div>

        {/* --- REPOS & ACTIVITY GRID ROW --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          
          {/* LEFT COLUMN: Pinned & Active Repositories (Spans 2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            
            {/* A. Pinned / Top Repositories */}
            <div className="w-full rounded-[24px] bg-surface border border-border shadow-lg p-5 md:p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-neutral-900/30">
              <h3 className="text-[15px] font-bold text-surface-foreground mb-4 flex items-center gap-2">
                <BsPinAngle className="text-accent" />
                Top / Pinned Repositories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {pinnedRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            </div>

            {/* B. Recently Active Repositories */}
            <div className="w-full rounded-[24px] bg-surface border border-border shadow-lg p-5 md:p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-neutral-900/30">
              <h3 className="text-[15px] font-bold text-surface-foreground mb-4 flex items-center gap-2">
                <BsJournalCode className="text-warning" />
                Recently Active
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {activeRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            </div>
            
          </div>

          {/* RIGHT COLUMN: Live Activity Timeline (Spans 1 col) */}
          <div className="lg:col-span-1 w-full rounded-[24px] bg-surface border border-border shadow-lg p-5 md:p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-neutral-900/30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[15px] font-bold text-surface-foreground flex items-center gap-2">
                <BsGit className="text-foreground" />
                Live Activity
              </h3>
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 bg-success"></span>
              </span>
            </div>
            
            <div className="relative border-l-2 border-border/60 ml-2 space-y-6">
              {events.map((event) => (
                <div key={event.id} className="relative pl-5">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-success ring-4 ring-surface" />
                  
                  {/* Content */}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
                      <FiClock size={10} />
                      {timeAgo(event.created_at)}
                    </span>
                    
                    <a 
                      href={`https://github.com/${event.repo.name}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-foreground hover:text-accent transition-colors line-clamp-1"
                    >
                      {event.repo.name.split("/")[1]}
                    </a>
                    
                    <div className="text-xs text-muted-foreground/80 mt-1.5 p-2 bg-background border border-border/60 rounded-lg line-clamp-2">
                      <span className="text-success font-mono mr-1.5">❯</span>
                      {event.type === "PushEvent" 
                        ? event.payload?.commits?.[0]?.message || "Updated repository"
                        : "Created new repository"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <a 
              href={`https://github.com/${GITHUB_USERNAME}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center w-full py-2.5 rounded-xl bg-background border border-border/60 hover:bg-secondary/50 text-xs font-semibold text-foreground transition-colors"
            >
              View Full Profile
            </a>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

// Helper Component for Individual Repository Cards
function RepoCard({ repo }: { repo: any }) {
  return (
    <a 
      href={repo.html_url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex flex-col justify-between p-4 rounded-2xl bg-background border border-border/60 hover:border-border hover:shadow-sm transition-all group"
    >
      <div>
        <h4 className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors line-clamp-1">
          {repo.name}
        </h4>
        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
          {repo.description || "No description provided for this repository."}
        </p>
      </div>
      <div className="flex items-center gap-4 mt-4 text-[11px] font-semibold text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent" /> 
          {repo.language || "Markdown"}
        </span>
        <span className="flex items-center gap-1">
          <BsStar size={12} /> {repo.stargazers_count}
        </span>
      </div>
    </a>
  );
}
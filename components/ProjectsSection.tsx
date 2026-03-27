"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/constants";
import ProjectCard from "./ProjectCard";
import { TextLoop } from "@/components/ui/text-loop";

interface ProjectsSectionProps {
  isHome?: boolean; // Ye prop decide karega ki hum kahan hain
}

export default function ProjectsSection({
  isHome = false,
}: ProjectsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Logic: Agar Home hai to sirf pehle 2 projects, nahi to saare
  const displayProjects = isHome ? projects.slice(0, 2) : projects;

  return (
    <section
      className={`relative w-full overflow-hidden bg-background ${
        isHome ? "py-24" : "min-h-screen"
      }`}
    >
      {/* --- BACKGROUND BLOBS (Optional: Sirf Projects page pe dikhana hai ya dono pe, maine dono pe rakha hai for consistency but lighter styling) --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.4, scale: 1.2 }}
        transition={{ duration: 0.5 }}
        className="absolute top-20 -left-1/3 md:left-1/3 w-80 h-80 rounded-full bg-purple-500/50 dark:bg-purple-600/10 blur-3xl pointer-events-none"
      />

      {/* --- CONDITIONAL HEADER RENDER --- */}
      {isHome ? (
        // 1. HOME PAGE HEADER (Simple & Clean)
        <div className="text-center mb-16 relative z-10 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-50"
          >
            Featured Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-700 dark:text-gray-400 text-lg lg:text-xl mt-4 max-w-2xl mx-auto"
          >
            A glimpse into my most impactful work using modern tech.
          </motion.p>
        </div>
      ) : (
        // 2. PROJECTS PAGE HERO (The "Ultimate" Header with TextLoop)
        <div className="w-full mx-auto py-12 px-4 text-center relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-7xl font-extrabold text-gray-900 dark:text-gray-50"
          >
            The Ultimate <br /> Full Stack Projects
          </motion.h1>

          {/* Desktop Text Loop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden w-full lg:grid grid-cols-12 gap-x-2 mt-10 text-2xl md:text-4xl font-semibold text-gray-900 dark:text-gray-200"
          >
            <span className="col-span-7 text-end">
              Building the web&apos;s future with
            </span>
            <TextLoop
              interval={2}
              className="col-span-5 text-purple-600 font-bold inline-block text-start"
            >
              <span>Full Stack Power</span>
              <span>Modern Design</span>
              <span>Unmatched Passion</span>
            </TextLoop>
          </motion.div>

          {/* Mobile Subtext */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:hidden w-full mt-10 text-xl text-gray-700 dark:text-gray-400"
          >
            Building the web's future with passion and precision.
          </motion.div>
          {/* Wavy Divider (Unchanged) */}
          <div className="hidden md:flex overflow-hidden mt-3">
            <svg
              className="w-full h-20 text-gray-300 dark:text-gray-900"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="currentColor"
                d="M0,32L48,64C96,96,192,160,288,170.7C384,181,480,139,576,128C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64V0H0Z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* --- GRID & CARD SECTION (Common for both pages) --- */}
      <div className={`mx-auto max-w-7xl px-4 ${isHome ? "" : "pb-20"}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* SLIDING HOVER BACKGROUND EFFECT */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-gray-200 dark:bg-slate-800/[0.8] block rounded-[1.8rem]"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.1 },
                    }}
                  />
                )}
              </AnimatePresence>

              {/* PROJECT CARD */}
              <div className="relative z-20 h-full">
                <ProjectCard project={project} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button (Only for Home Page) */}
        {isHome && (
          <div className="flex justify-center mt-12">
            <a
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
            >
              View All Projects
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

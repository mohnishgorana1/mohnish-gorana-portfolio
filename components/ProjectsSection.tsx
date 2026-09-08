"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/constants";
import ProjectCard from "./ProjectCard";

interface ProjectsSectionProps {
  isHome?: boolean;
}

export default function ProjectsSection({ isHome = false }: ProjectsSectionProps) {
  // Show first 4 projects on home, 6 on projects page
  const displayProjects = isHome ? projects.slice(0, 4) : projects.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className={`w-full -mt-1 text-foreground ${isHome ? "" : "pt-16 pb-20"}`}>
      <div className="w-full mx-auto">
        
        {/* HEADER (Conditional) */}
        {isHome ? (
          <div className="mb-10 md:mb-10 relative z-10 px-2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold tracking-tight text-surface-foreground"
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-2 text-[13px] md:text-sm text-muted-foreground font-medium"
            >
              A glimpse into my most impactful work using modern tech.
            </motion.p>
          </div>
        ) : (
          <div className="w-full mx-auto pb-12 px-4 text-center relative z-20">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-surface-foreground"
            >
              The Ultimate <br /> 
              <span className="text-muted-foreground font-serif italic font-light">Full Stack Work.</span>
            </motion.h1>
          </div>
        )}

        {/* THE ULTRA-PREMIUM GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full px-2 md:px-0"
        >
          {displayProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className="h-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* VIEW ALL BUTTON */}
        {isHome && (
          <div className="mt-12 flex justify-center">
            <Link href="/projects">
              <button className="cursor-pointer  group inline-flex h-11 md:h-12 items-center justify-center rounded-full bg-secondary/50 hover:bg-muted/30 text-foreground border border-transparent dark:border-border/50 shadow-sm hover:shadow-md px-8 font-semibold text-[13px] md:text-sm transition-all duration-300 hover:scale-105 active:scale-95">
                View All Projects
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
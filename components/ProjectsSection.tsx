"use client";

import React from "react";
import { motion } from "framer-motion";
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
    <section className={`w-full bg-background text-foreground ${isHome ? "py-24" : "pt-32 pb-20"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* HEADER (Conditional) */}
        {isHome ? (
          <div className="text-center mb-16 md:mb-20 px-4 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground"
            >
              Featured Projects.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto font-medium"
            >
              A glimpse into my most impactful work using modern tech.
            </motion.p>
          </div>
        ) : (
          <div className="w-full mx-auto pb-16 px-4 text-center relative z-20">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-foreground"
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
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 w-full"
        >
          {displayProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className="h-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* VIEW ALL BUTTON */}
        {isHome && (
          <div className="mt-20 flex justify-center">
            <Link href="/projects">
              <button className="group inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-transform hover:scale-105 active:scale-95 shadow-xl">
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
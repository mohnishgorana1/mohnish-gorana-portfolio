"use client";

import { projects, techStacksMap } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, Sparkles, LayoutPanelLeft, Layers, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import TechStackPill from "@/components/TechStackPill";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20 }
  },
};

export default function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  // 🌟 Project Navigation Logic
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  const currentProject = projects[currentIndex];

  // Circular navigation: If first, prev is last. If last, next is first.
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!currentProject?.images || currentProject.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === currentProject.images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [currentProject?.images]);

  if (!currentProject) return (
    <div className="h-screen w-full flex items-center justify-center bg-background text-foreground font-bold">
      Project not found.
    </div>
  );

  const { title, link, images, shortDescription, detailedDescription, techStacks, githubRepositoryUrl } = currentProject;

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full min-h-screen text-foreground selection:bg-primary/30 flex flex-col items-center overflow-hidden"
    >
      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">

        {/* --- HEADER SECTION --- */}
        <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">

          {/* Title & Info */}
          <div className="flex flex-col items-start flex-1">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border/60 shadow-sm text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              <Sparkles size={12} className="text-warning" /> Project Showcase
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 text-surface-foreground leading-[1.1]">
              {title}.
            </motion.h1>

            <motion.p variants={itemVariants} className="text-[14px] md:text-[15px] text-muted-foreground font-medium leading-relaxed max-w-2xl">
              {shortDescription}
            </motion.p>
          </div>

          {/* ACTION BUTTONS */}
          <motion.div variants={itemVariants} className="flex flex-row md:flex-col gap-3 w-full md:w-[180px] shrink-0">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-foreground text-background text-[12px] font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <ExternalLink size={14} /> Live Project
            </a>
            <a
              href={githubRepositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-surface border border-border/60 text-foreground text-[12px] font-bold hover:bg-muted/50 active:scale-[0.98] transition-all duration-300 shadow-sm"
            >
              <BsGithub size={14} /> Source Code
            </a>
          </motion.div>
        </div>

        {/* --- MAIN HERO VISUAL (CAROUSEL) --- */}
        <motion.div variants={itemVariants} className="relative w-full aspect-video rounded-[1.5rem] overflow-hidden bg-surface border border-border/60 shadow-xl mb-12 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImageIndex]}
                alt={`${title} Preview`}
                fill
                className="object-cover transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 md:opacity-30" />
            </motion.div>
          </AnimatePresence>

          {/* Progress Markers */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/40">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentImageIndex ? "w-5 bg-foreground" : "w-1.5 bg-foreground/30"}`}
              />
            ))}
          </div>
        </motion.div>

        {/* --- VERTICAL CONTENT COLUMN --- */}
        <div className="flex flex-col gap-10 mx-auto w-full">
          
          {/* 2. TECHNOLOGIES USED */}
          <motion.section variants={itemVariants} className="w-full">
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-surface-foreground border-b border-border/50 pb-2">
              <Layers className="text-muted-foreground" size={18} />
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {techStacks.map((tech, idx) => {
                const techData = techStacksMap[tech];
                if (!techData) return null;
                const Icon = techData.icon;
                const isBlackIcon = ["NextJS", "Liveblocks", "Clerk", "ExpressJS"].includes(tech);

                return (
                  <TechStackPill
                    key={idx}
                    tech={tech}
                    isBlackIcon={isBlackIcon}
                    Icon={Icon}
                    techData={techData}
                  />
                );
              })}
            </div>
          </motion.section>
          {/* 1. PROJECT OVERVIEW */}
          <motion.section variants={itemVariants} className="w-full">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-surface-foreground border-b border-border/50 pb-2">
              <LayoutPanelLeft className="text-muted-foreground" size={18} />
              Project Overview
            </h3>
            <div className="pt-2">
              <p className="text-[14px] md:text-[15px] text-muted-foreground font-medium leading-relaxed whitespace-pre-line">
                {detailedDescription}
              </p>
            </div>
          </motion.section>



          {/* 3. CORE FEATURES */}
          <motion.section variants={itemVariants} className="w-full">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-surface-foreground border-b border-border/50 pb-2">
              <Zap className="text-muted-foreground" size={18} />
              Core Features & Architecture
            </h3>
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-border/60 shadow-sm">
                <ChevronRight size={16} className="text-foreground shrink-0 mt-0.5" />
                <span className="text-[13px] md:text-[14px] font-medium text-foreground/80">Fully Responsive & Accessible UI Architecture.</span>
              </li>
              <li className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-border/60 shadow-sm">
                <ChevronRight size={16} className="text-foreground shrink-0 mt-0.5" />
                <span className="text-[13px] md:text-[14px] font-medium text-foreground/80">Optimized Asset Delivery and Edge Caching.</span>
              </li>
              <li className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-border/60 shadow-sm">
                <ChevronRight size={16} className="text-foreground shrink-0 mt-0.5" />
                <span className="text-[13px] md:text-[14px] font-medium text-foreground/80">Seamless End-to-End Data Flow with strict typing.</span>
              </li>
            </ul>
          </motion.section>

          {/* 🌟 4. NEXT / PREVIOUS NAVIGATION FOOTER */}
          <motion.div variants={itemVariants} className="mt-6 pt-8 border-t border-border/60 flex justify-between gap-4">

            {/* Previous Project Button */}
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex flex-col items-start gap-1.5 p-4 md:p-5 rounded-[1.25rem] bg-background hover:bg-surface border border-border/40 hover:border-border/80 transition-all duration-300 w-1/2 md::w-1/4 text-left shadow-sm hover:shadow-md"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Previous Project
              </span>
              <span className="text-[14px] md:text-[15px] font-bold text-foreground/90 group-hover:text-foreground transition-colors line-clamp-1">
                {prevProject.title}
              </span>
            </Link>

            {/* Next Project Button */}
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col items-start sm:items-end gap-1.5 p-4 md:p-5 rounded-[1.25rem] bg-background hover:bg-surface border border-border/40 hover:border-border/80 transition-all duration-300 w-1/2 md::w-1/4 text-left sm:text-right shadow-sm hover:shadow-md"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                Next Project
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="text-[14px] md:text-[15px] font-bold text-foreground/90 group-hover:text-foreground transition-colors line-clamp-1">
                {nextProject.title}
              </span>
            </Link>

          </motion.div>

        </div>
      </div>
    </motion.main>
  );
}
"use client";

import { projects, techStacksMap } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
// 🌟 Fixed: Import 'use' from React
import React, { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronRight, Sparkles } from "lucide-react";
import { BsGithub } from "react-icons/bs";

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
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  },
};

// 🌟 Fixed: Unwrap params using React.use()
function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const currentProject = projects.find((project) => project.slug === slug);
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
      className="relative w-full min-h-screen bg-background text-foreground pb-24 selection:bg-primary/30"
    >
      {/* --- BACKDROP BLOBS --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="relative px-6 pt-12 sm:pt-20">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div variants={itemVariants} className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            <Sparkles size={14} className="text-yellow-500" /> Case Study
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 leading-[1.1] pb-2">
            {title}.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="max-w-2xl text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
            {shortDescription}
          </motion.p>
        </div>

        {/* --- MAIN HERO VISUAL (CAROUSEL) --- */}
        <motion.div variants={itemVariants} className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary/20 border border-border shadow-2xl mb-20 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImageIndex]}
                alt={`${title} Preview`}
                height={1000}
                width={1000}
                className="object-cover opacity-90 transition-all duration-700"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Progress Markers */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 transition-all duration-500 rounded-full ${idx === currentImageIndex ? "w-8 bg-foreground" : "w-2 bg-foreground/20"}`} 
              />
            ))}
          </div>

          {/* Action Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-background/20 backdrop-blur-[2px] z-10">
            <Link href={link} target="_blank" className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform">
              Launch Live App <ExternalLink size={18} />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* --- LEFT: DETAILS --- */}
          <div className="lg:col-span-7 space-y-12">
            <motion.section variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
                <div className="h-6 w-1 bg-foreground rounded-full" /> Overview
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line text-justify">
                {detailedDescription}
              </p>
            </motion.section>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
               <Link href={githubRepositoryUrl} target="_blank" className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-secondary border border-border hover:bg-secondary/80 text-foreground font-bold transition-all shadow-sm">
                <BsGithub size={20} /> Repository
              </Link>
              <Link href={link} target="_blank" className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-bold transition-all shadow-lg">
                <ExternalLink size={20} /> Live Preview
              </Link>
            </motion.div>
          </div>

          {/* --- RIGHT: TECH STACK & SPECS --- */}
          <div className="lg:col-span-5">
            <motion.div variants={itemVariants} className="sticky top-32 p-8 rounded-[2.5rem] bg-secondary/30 border border-border backdrop-blur-md shadow-sm">
              <h3 className="text-xl font-bold mb-8 text-foreground">Technical Stack</h3>
              <div className="flex flex-wrap gap-3">
                {techStacks.map((tech, idx) => {
                  const techData = techStacksMap[tech];
                  if (!techData) return null;
                  const Icon = techData.icon;
                  const isBlackIcon = techData.color === "#000000" || techData.color === "#101010";

                  return (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-xl dark:bg-neutral-700 border border-border hover:border-foreground/50 transition-colors group shadow-sm">
                      <div className={isBlackIcon ? "dark:invert" : ""}>
                         <Icon size={18} color={isBlackIcon ? undefined : techData.color} />
                      </div>
                      <span className="text-sm font-semibold text-foreground/80">{tech}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 pt-8 border-t border-border/50">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Core Features</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm font-medium text-foreground/70">
                    <ChevronRight size={16} className="text-foreground" /> Fully Responsive Architecture
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-foreground/70">
                    <ChevronRight size={16} className="text-foreground" /> Optimized Asset Delivery
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-foreground/70">
                    <ChevronRight size={16} className="text-foreground" /> End-to-End Data Flow
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}

export default ProjectDetails;
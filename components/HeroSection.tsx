"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";

// 1. Array of your roles
const roles = [
  "NextJS Developer",
  "MERN Stack Developer",
  "FrontEnd Developer",
];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);

  // 2. Simple interval to change the text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center py-20 overflow-hidden bg-background">
      
      {/* Subtle CSS Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4 gap-y-6">
        
        {/* Glassmorphic Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-secondary/50 backdrop-blur-md text-sm font-medium text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Available for new projects
        </motion.div>

        {/* Massive Clean Typography with Rotating Text */}
        <div className="flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-foreground leading-[1.1]"
          >
            Hi, I'm <span className="text-foreground">Mohnish.</span>
          </motion.h1>
          
          {/* THE ROTATING TEXT CONTAINER */}
          <div className="h-[6em] mt-2 sm:mt-4 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[currentRole]}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-muted-foreground block"
              >
                {roles[currentRole]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Minimalist Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          Specializing in scalable architecture. I focus on writing clean code and creating user interfaces that never feel sluggish.
        </motion.p>

        {/* High-Contrast Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto"
        >
          <Link href="/projects" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-transform hover:scale-105 active:scale-95">
              Explore Projects <ArrowRight className="ml-2" size={18} />
            </button>
          </Link>
          
          <Link href="/machine-coding-tasks" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full border border-border bg-transparent px-8 font-medium text-foreground transition-all hover:bg-secondary hover:scale-105 active:scale-95">
              Machine Coding <Code2 className="ml-2" size={18} />
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
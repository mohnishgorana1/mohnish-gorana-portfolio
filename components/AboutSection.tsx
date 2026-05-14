"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";

export default function AboutSection() {
  // TUMHARA PREMIUM GLASS THEME
  const glassClasses = `
    backdrop-blur-xl border 
    bg-white/40 border-black/10 shadow-lg shadow-black/5
    dark:bg-black/40 dark:border-white/10 dark:shadow-none
  `;

  return (
    <main className="w-full bg-background text-foreground mx-auto px-4 py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16 md:gap-24 relative z-10">
        
        {/* =========================================
            LEFT SIDE: Typography & Persona
        ========================================= */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
          
          {/* Subtle Tag */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-xs font-semibold text-muted-foreground uppercase tracking-widest"
          >
            Behind the Code
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
          >
            I engineer solutions that <span className="text-muted-foreground font-serif italic font-light">actually matter.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl text-muted-foreground leading-relaxed font-medium max-w-lg"
          >
            Based in MP, India, I'm a developer who focuses on architecture over aesthetics (though I love a good UI). When I'm not coding, I'm usually diving into new tech stacks or exploring system design patterns.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto"
          >
            {/* Primary Action */}
            <Link 
              href="https://drive.google.com/file/d/1fGSpqQ_NLIMY-fd879HgINXnoUIKzoYX/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="group w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 font-medium text-background transition-transform hover:scale-105 active:scale-95 shadow-xl">
                <FileText size={16} className="mr-2" />
                View Resume
              </button>
            </Link>

            {/* Secondary Link */}
            <Link 
              href="/about#academic-qualifications"
              className="group w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-full px-6 font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Academic Background
              <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* =========================================
            RIGHT SIDE: Image & Glass Details
        ========================================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 w-full max-w-[450px] relative group"
        >
          {/* Subtle Background Glow (Follows your theme) */}
          <div className="absolute inset-0 bg-secondary/80 dark:bg-secondary/20 blur-[100px] rounded-full" />

          {/* Main Image Container */}
          <div className={`relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden ${glassClasses} p-3 transition-transform duration-500 hover:-translate-y-2`}>
            
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-muted">
              <Image
                src="/assets/profile_image.jpeg"
                alt="Mohnish Gorana"
                fill
                className="object-cover filter grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
              />
              
              {/* Very Subtle Gradient Overlay for blend */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-80" />
            </div>

            {/* Floating Glass Pill - Location */}
            <div className={`absolute bottom-8 left-8 flex items-center gap-2 px-4 py-2 rounded-2xl ${glassClasses} bg-white/90 dark:bg-black/50 backdrop-blur-md`}>
              <div className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground leading-tight">Mohnish Gorana</span>
                <span className="text-[10px] font-medium text-muted-foreground">MP, India</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </main>
  );
}
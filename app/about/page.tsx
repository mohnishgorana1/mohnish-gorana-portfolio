"use client";

import { AcademicCard } from "@/components/AcademicCard";
import { academics } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import Image from "next/image";

const glassClasses = `
    backdrop-blur-xl border 
    bg-white/40 border-black/10 shadow-lg shadow-black/5
    dark:bg-black/40 dark:border-white/10 dark:shadow-none
  `;

function About() {
  return (
    <main className="w-full bg-background text-foreground pt-24 sm:pt-32 pb-20 selection:bg-primary/30">
      {/* =========================================
          SECTION 1: THE PERSONA
      ========================================= */}
      <section className="max-w-6xl mx-auto px-6 mb-24 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          
          {/* LEFT: CONTENT SECTION */}
          <div className="lg:col-span-7 flex flex-col gap-10 sm:gap-12 pt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-balance text-foreground">
                Full-stack developer based in Neemuch, India. <br />
                Dedicated to <span className="text-muted-foreground italic font-serif font-light text-wrap">software craft and system integrity.</span>
              </h1>

              {/* Bio Description */}
              <div className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl text-justify">
                <p>
                  I specialize in the MERN stack and Next.js, focusing on how
                  different parts of a system interact to provide a seamless
                  user experience. My goal is always to bridge the gap between
                  complex backend architecture and intuitive frontend design.
                </p>
              </div>
            </motion.div>

            {/* Quick Specs Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-border/50 pt-10"
            >
              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Location
                </h4>
                <p className="text-xl font-bold text-foreground">Neemuch, MP (IST)</p>
              </div>
              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  Current Focus
                </h4>
                <ul className="text-lg font-bold text-foreground space-y-2">
                  <li>01. High-Performance Web Architecture</li>
                  <li>02. Advanced System Design</li>
                </ul>
              </div>
            </motion.div>

            {/* Actions / Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                href="https://drive.google.com/file/d/1fGSpqQ_NLIMY-fd879HgINXnoUIKzoYX/view?usp=sharing"
                target="_blank"
                className="flex items-center gap-2 px-8 py-4 bg-foreground text-background font-bold rounded-2xl hover:scale-105 transition-all shadow-xl"
              >
                <FileText size={18} />
                Resume
              </Link>
              <Link
                href="#academic-qualifications"
                className="flex items-center gap-2 px-8 py-4 border border-border hover:bg-secondary font-bold rounded-2xl transition-all text-foreground"
              >
                Academics <ArrowRight size={18} className="text-muted-foreground" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`lg:col-span-5 w-full max-w-[450px] mx-auto relative group flex flex-col items-center gap-y-4 rounded-[2.5rem] ${glassClasses} p-4`}
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted shadow-inner">
              <Image
                src="/assets/profile_image.jpeg"
                alt="Mohnish Gorana"
                fill
                
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
              {/* Subtle overlay for better blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Name under image */}
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-none mt-2 mb-4 text-foreground w-full text-center">
              Mohnish
              <span className="pl-2 text-muted-foreground font-serif italic font-light">
                Gorana.
              </span>
            </h2>
          </motion.div>

        </div>
      </section>

      {/* =========================================
          SECTION 2: ACADEMICS
      ========================================= */}
      <section
        id="academic-qualifications"
        className="w-full bg-secondary/10 py-24 border-t border-border/50"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center px-3 py-1 mb-6 border border-border/50 bg-background text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              Foundation
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Academic{" "}
              <span className="text-muted-foreground font-serif italic font-light">
                Validation.
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-y-6">
            {academics.map((item, idx) => (
              <AcademicCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
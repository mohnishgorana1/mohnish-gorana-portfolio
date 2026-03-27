"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 1.2 }, // Scale thoda kam kiya taaki jolt na lage
    visible: {
      opacity: 1,
      scale: [1, 0.9, 1],
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="w-full bg-transparent mx-auto px-4 py-24 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        // viewport={{ amount: 0.2 }}
        className="relative mx-auto flex flex-col-reverse md:flex-row gap-12 py-16 px-10 
          bg-white border-zinc-200 shadow-2xl
          dark:bg-zinc-900/50 dark:border-zinc-800 backdrop-blur-md
          border transition-colors duration-500"
      >
        {/* --- Sharp Blue Corners --- */}
        <div className="absolute -top-[5px] -left-[5px] w-12 h-12 border-t-4 border-l-4 border-blue-600" />
        <div className="absolute -top-[5px] -right-[5px] w-12 h-12 border-t-4 border-r-4 border-blue-600" />
        <div className="absolute -bottom-[5px] -left-[5px] w-12 h-12 border-b-4 border-l-4 border-blue-600" />
        <div className="absolute -bottom-[5px] -right-[5px] w-12 h-12 border-b-4 border-r-4 border-blue-600" />

        {/* --- Left Side Content --- */}
        <div className="flex-[1.2] flex flex-col justify-center items-center md:items-start text-center md:text-left gap-y-8">
          {/* --- NEW HEADING SECTION --- */}
          <motion.div variants={itemVariants} className="space-y-2 relative">
            <span className="text-blue-600 font-mono text-xs font-bold uppercase tracking-[0.2em] block">
              [ Introduction ]
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none uppercase">
              Who I <span className="text-blue-600 italic">Am.</span>
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 mt-4 hidden md:block" />
          </motion.div>

          <motion.h4
            variants={itemVariants}
            className="text-xl lg:text-2xl max-w-xl leading-relaxed
              text-zinc-700 dark:text-zinc-300 transition-colors font-medium italic"
          >
            &quot;When I&apos;m not coding, I explore new tech, upgrade my
            skills, and stay updated with the latest trends in web dev.&quot;
          </motion.h4>

          <div className="flex flex-col items-start md:items-center gap-6 mt-4">
            <motion.div variants={itemVariants}>
              <Link
                href="/about#academic-qualifications"
                className="group text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-all text-xs uppercase tracking-widest flex items-center gap-2"
              >
                <span>View Qualifications</span>
                <span className="group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="https://drive.google.com/file/d/1fGSpqQ_NLIMY-fd879HgINXnoUIKzoYX/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-zinc-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700
                  text-white font-black uppercase text-xs tracking-widest transition-all shadow-xl block"
              >
                Get Resume
              </Link>
            </motion.div>
          </div>
        </div>

        {/* --- Right Side Image Section --- */}
        <motion.div
          variants={itemVariants}
          className="flex-1 relative flex items-center justify-center group"
        >
          {/* Subtle Background Shape */}
          <div className="absolute inset-0 bg-blue-600/10 -rotate-3 group-hover:rotate-0 transition-transform duration-500" />

          <div className="relative z-10 w-full aspect-square border-2 border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-800">
            <Image
              src="/assets/profile_image.jpeg"
              alt="Mohnish Gorana Profile Image"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
            />
            {/* Overlay Scanline */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-20 bg-[length:100%_4px,3px_100%] pointer-events-none" />
          </div>

          {/* Floating Label */}
          <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white px-4 py-2 text-[10px] font-mono font-black uppercase tracking-tighter z-30 shadow-xl">
            Img_Ref: 2025_V1
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

export default AboutSection;

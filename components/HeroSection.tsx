"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, Sparkles, MapPin } from "lucide-react";
import React, { useState } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MovingBorderButton } from "./ui/moving-border-button";

export default function HeroSection() {

  const [isImageOpen, setIsImageOpen] = useState(false);
  // 3D Tilt Physics for Desktop Profile Card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Subtle tilt values for a premium, heavy feel
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glassClasses = `
    backdrop-blur-xl border  
    bg-white/70 border-black/10 shadow-xl shadow-black/5
    dark:bg-white/5 dark:border-white/10 dark:shadow-none
  `;

  return (
    <section className="relative w-full  md:min-h-[85vh] flex md:items-center justify-center  overflow-hidden">

      {/* Abstract Cinematic Background Glows */}
      {/* <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/15 dark:bg-blue-500/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-emerald-500/15 dark:bg-emerald-500/10 rounded-full blur-[90px] md:blur-[100px] pointer-events-none -z-10" /> */}

      <div className="w-full max-w-6xl mx-auto flex flex-col z-10">

        {/* =======================================================
            📱 MOBILE ONLY: The Compact Horizontal ID Card 
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:hidden w-full max-w-100 mx-auto flex items-center justify-center px-2 py-3 mb-8 rounded-2xl dark:bg-secondary/50 shadow-sm shadow-secondary dark:shadow-none"
        >
          <div className="flex items-center px-2 gap-4 w-full">
            <motion.div
              layoutId="profile-image"
              onClick={() => setIsImageOpen(true)}
              className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 cursor-pointer"
            >
              <Image
                src="/assets/profile_image.jpeg"
                alt="Mohnish Gorana"
                fill
                priority
                className="object-cover filter grayscale"
              />
            </motion.div>
            <div className="flex flex-col gap-y-1">
              <h2 className="text-[1.6rem] text-neutral-700 dark:text-neutral-400 font-bold leading-tight tracking-wide">Mohnish Gorana</h2>
              <p className="text-[14px] text-neutral-700 dark:text-neutral-400 font-medium">
                MERN Stack <span className="text-border mx-1"> <strong className="text-neutral-500">|</strong> </span> Next.js
              </p>

              {/* Exact reference image styled badge */}
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 bg-[#00d084] rounded-full shadow-[0_0_8px_0_#00d084]"></span>
                <span className="text-[10px] text-[#00d084] font-bold uppercase tracking-widest">Available for work</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center w-full">

          {/* ----- LEFT SIDE: Typography & Messaging ----- */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-7 flex flex-col h-full text-left md:text-left gap-y-4 md:gap-y-8 md:px-2"
          >
            {/* Core */}
            <div className="flex flex-col justify-evenly h-full gap-y-4 w-full">

              {/* Status & GenAI Badge Group */}
              <div className="w-full flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                <div className="w-full sm:w-auto hidden md:inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/30 backdrop-blur-md text-xs font-medium text-foreground shadow-sm tracking-widest">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
                  </span>
                  <span>AVAILABLE FOR WORK</span>
                </div>



                <div className="w-fit sm:w-auto inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-xs font-medium uppercase tracking-widest text-amber-500 shadow-sm">
                  <Sparkles size={14} className="text-amber-500" />
                  <span className="">Exploring <strong className="font-bold">GenAI & RAG</strong></span>
                </div>
              </div>

              {/* heading */}
              <h1 className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight md:tracking-tighter text-foreground leading-[1.1] md:leading-[1.05]">
                Full-Stack <br className="hidden sm:block" /> Web Developer.
              </h1>

              {/* description */}
              <p className="hidden md:flex text-xl sm:text-2xl text-muted-foreground font-semibold tracking-tight">
                MERN Stack <span className="text-border mx-2">|</span> Next.js
              </p>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-lg leading-relaxed">
                Proficient in React.js, Next.js, and TypeScript. Experienced in engineering real-time collaboration engines, scalable architectures, and role-based access systems.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-row flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                <Link href="/projects" className="w-auto cursor-pointer">
                  <MovingBorderButton className="w-full sm:w-auto h-14 font-semibold text-[12px] md:text-sm py-0.5 transition-all hover:scale-105 active:scale-95 duration-300">
                    Explore Projects
                    <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                  </MovingBorderButton>
                </Link>

                <Link
                  href="https://drive.google.com/file/d/1fGSpqQ_NLIMY-fd879HgINXnoUIKzoYX/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-auto cursor-pointer group"
                >
                  <button className={`w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full px-8 cursor-pointer font-semibold text-[12px] md:text-sm text-foreground transition-all hover:scale-105 active:scale-95 duration-300 ${glassClasses}`}>
                    <FileText size={18} className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors" />
                    View Resume
                  </button>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* =========================================
            DESKTOP ONLY : RIGHT SIDE: Profile Card 
        ========================================= */}
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="sm:col-span-5 hidden md:flex justify-center lg:justify-end perspective-distant"
          >
            {/* Static Card Container */}
            <div className={`relative flex flex-col items-center p-6 w-80 lg:w-96 rounded-[2.5rem] border border-secondary/70 shadow-sm shadow-secondary dark:shadow-none dark:border-white/10`}>

              {/* 3D Tilt Wrapper Only for the Image */}
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsImageOpen(true)}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full aspect-square rounded-3xl cursor-zoom-in group"
              >
                {/* Dynamic Drop Shadow reacting to tilt */}
                <div
                  className="absolute inset-0 rounded-3xl bg-black/20 dark:bg-white/5 blur-2xl z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{ transform: "translateZ(-30px)" }}
                />

                {/* The Image inside the tilt wrapper */}
                <motion.div
                  layoutId="profile-image-desktop"
                  className="relative w-full h-full rounded-3xl overflow-hidden border border-border/40 shadow-inner bg-muted z-10 transition-all duration-500"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <Image
                    src="/assets/profile_image.jpeg"
                    alt="Mohnish Gorana"
                    fill
                    priority
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </motion.div>
              </motion.div>

              {/* Static Identity Info inside the card */}
              <div className="mt-6 flex flex-col items-center text-center w-full">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Mohnish Gorana
                </h2>

                {/* Divider */}
                <div className="w-full h-px bg-border/60 my-5" />

                {/* Footer of Card: Location & Socials */}
                <div className="flex items-center justify-between w-full px-2">
                  <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                    <MapPin size={14} className="text-blue-500" /> India
                  </span>

                  <div className="flex items-center gap-3">
                    <Link href="https://github.com/mohnishgorana1" target="_blank" className="p-2.5 rounded-full bg-background border border-border/50 hover:bg-secondary transition-all duration-300 hover:scale-110 shadow-sm text-foreground">
                      <BsGithub size={20} />
                    </Link>
                    <Link href="https://www.linkedin.com/in/mohnish-gorana-804374340/" target="_blank" className="p-2.5 rounded-full bg-background border border-border/50 hover:bg-secondary transition-all duration-300 hover:scale-110 shadow-sm text-[#0A66C2]">
                      <BsLinkedin size={20} />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </motion.section>

        </div>
      </div>



      {/* =========================================
          🌟 FULLSCREEN IMAGE OVERLAY DIALOG 
      ========================================= */}
      <AnimatePresence>
        {isImageOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">

            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImageOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-zoom-out"
            />

            {/* The Expanded Image with LayoutId */}
            <motion.div
              layoutId={typeof window !== "undefined" && window.innerWidth >= 768 ? "profile-image-desktop" : "profile-image"}
              className="relative w-64 h-64 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl z-10 cursor-zoom-out"
              onClick={() => setIsImageOpen(false)}
            >
              <Image
                src="/assets/profile_image.jpeg"
                alt="Mohnish Gorana"
                fill
                priority
                className="object-cover"
              />
            </motion.div>

          </div>
        )}
      </AnimatePresence>


    </section>
  );
}
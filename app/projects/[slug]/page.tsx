// projects/[projectId]/page.tsx
"use client";

import { projects, techStacksMap } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as LinkIcon } from "lucide-react";
import { BsGithub } from "react-icons/bs";

// Frame definition for initial load speed
const mainContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function ProjectDetails({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const currentProject = projects.find((project) => project.slug === slug);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!currentProject) return <div>Project not found</div>;

  const {
    title,
    link,
    images,
    shortDescription,
    detailedDescription,
    techStacks,
    githubRepositoryUrl,
    video,
  } = currentProject;

  // Automatic Carousel Logic (Kept for performance and function)
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <motion.main
      variants={mainContainerVariants}
      initial="hidden"
      animate="visible"
      // 1. MAIN BACKGROUND: Invert light background to dark
      className="w-full min-h-[100vh] bg-background flex flex-col items-center gap-y-12 py-12 "
    >
      {/* Header */}
      <header className="relative pt-12 w-full flex flex-col items-center gap-y-6 text-center">
        {/* Background Blobs: Adjust colors/opacity for dark mode */}
        <div className="animate-pulse absolute top- right-1 lg:right-1 w-48 h-48 md:w-96 md:h-96 bg-purple-400 lg:bg-purple-400/50 rounded-full blur-3xl pointer-events-none dark:opacity-30 dark:lg:bg-purple-700/50"></div>
        <div className="animate-pulse absolute top- left-1 lg:-left-1 w-48 h-48 md:w-96 md:h-96 bg-blue-400 lg:bg-blue-400/50 rounded-full blur-3xl pointer-events-none dark:opacity-30 dark:lg:bg-blue-700/50"></div>

        <motion.h1
          variants={itemVariants}
          // Gradient Text: Colors look good on both light/dark
          className="h-12 md:h-20 text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500"
        >
          {title}
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          // 2. TEXT COLOR: Adjust description text
          className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 font-medium"
        >
          {shortDescription}
        </motion.h2>

        {/* --- Carousel Section --- */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl mx-auto mt-6"
        >
          {/* Container Frame: Adjust shadow and border for dark mode */}
          <div className="relative w-full aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-2xl dark:shadow-gray-900/80 border border-gray-700/50 dark:border-gray-700">
            {images && images.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* 1. Background Layer (Blurred & Zoomed) - Dark theme background */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={images[currentImageIndex]}
                      alt={`Background ${title} ${currentImageIndex}`}
                      fill
                      className="object-cover blur-2xl opacity-50 brightness-50 scale-110"
                      priority={currentImageIndex === 0}
                    />
                  </div>

                  {/* 2. Foreground Layer (Clear Image) - No changes needed here */}
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center p-3 md:p-4">
                    <div className="relative w-full h-full">
                      <Image
                        src={images[currentImageIndex]}
                        alt={`${title} screenshot ${currentImageIndex + 1}`}
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority={currentImageIndex === 0}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              // 3. NO PREVIEW TEXT: Ensure text is visible in dark mode
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400 font-semibold">
                No Visual Preview Available
              </div>
            )}

            {/* Simple Progress Bar */}
            {images && images.length > 1 && (
              <div className="absolute bottom-0 left-0 h-0.5 bg-white/10 w-full">
                <motion.div
                  key={currentImageIndex}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, ease: "linear" }}
                  className="h-full bg-blue-400"
                />
              </div>
            )}
          </div>
        </motion.div>
      </header>
      {/* --- Links (Enhanced Buttons) --- */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center"
      >
        <motion.a
          href={githubRepositoryUrl}
          target="_blank"
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
          whileTap={{ scale: 0.95 }}
          // GITHUB BUTTON: Adjust background and shadow for dark mode
          className="px-6 py-3 rounded-xl bg-gray-800 dark:bg-gray-700 text-white font-semibold flex items-center gap-2 transition duration-200 shadow-md dark:shadow-gray-800/50"
        >
          <BsGithub size={20} />
          Source Code
        </motion.a>
        <motion.a
          href={link}
          target="_blank"
          whileHover={{
            scale: 1.05,
            // Adjust blue shadow for dark background visibility
            boxShadow:
              "0 10px 15px -3px rgba(59, 130, 246, 0.5), 0 4px 6px -2px rgba(59, 130, 246, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold flex items-center gap-2 transition duration-200 shadow-md"
        >
          <LinkIcon size={20} />
          View Project
        </motion.a>
      </motion.div>
      {/* --- Description (Glassy Effect) --- */}
      <motion.div
        variants={itemVariants}
        // GLASSY DESCRIPTION CARD: Invert colors for dark mode
        className="w-full max-w-4xl rounded-3xl p-6 transition-shadow duration-500 backdrop-blur-xl 
        bg-gray-300/80 dark:bg-gray-800/40"
        style={{ WebkitBackdropFilter: "blur(12px)" }}
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Project Overview
        </h3>
        <p className="text-gray-500 dark:text-gray-300 text-justify text-base md:text-lg font-medium whitespace-pre-line">
          {detailedDescription}
        </p>
      </motion.div>
      <div className="w-full max-w-4xl border-t border-gray-300 dark:border-gray-700 my-4" />{" "}
      {/* Separator adjustment */}
      {/* --- Technologies Used (Glassy Effect) --- */}
      <section className="w-full max-w-4xl flex flex-col gap-y-6">
        <motion.h3
          variants={itemVariants}
          className="text-2xl font-bold text-gray-800 dark:text-gray-100"
        >
          Technologies Used
        </motion.h3>

        <motion.div
          variants={itemVariants}
          // GLASSY TECH STACK CONTAINER: Invert colors for dark mode
          className="flex flex-wrap gap-3 p-4 rounded-3xl shadow-lg backdrop-blur-md 
          bg-white/70 dark:bg-gray-800/70 
          border border-white/50 dark:border-gray-700/50"
          style={{ WebkitBackdropFilter: "blur(12px)" }}
        >
          {techStacks &&
            techStacks.map((tech, idx) => {
              const techData = techStacksMap[tech];
              if (!techData) return null;
              const Icon = techData.icon;
              const color = techData.color;

              return (
                // TECH STACK BUTTON: Invert colors for dark mode
                <button
                  key={idx}
                  className="flex items-center justify-center gap-2 
                  bg-gray-200/90 dark:bg-gray-700/90 
                  px-4 py-2 rounded-xl shadow-xl hover:shadow-gray-400 dark:hover:shadow-gray-800 duration-300 ease-in cursor-pointer 
                  border border-gray-300 dark:border-gray-600 
                  hover:ring-2 hover:ring-gray-400 dark:hover:ring-gray-600 hover:scale-105"
                >
                  <Icon size={20} color={color} />
                  <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    {tech}
                  </span>
                </button>
              );
            })}
        </motion.div>
      </section>
    </motion.main>
  );
}

export default ProjectDetails;

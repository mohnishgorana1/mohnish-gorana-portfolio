"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Zap,
  CheckCircle,
  Clock,
  ExternalLink,
  BookOpen,
} from "lucide-react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  index: number; // Naya prop: Card ka index
  hoveredIndex: number | null; // Naya prop: Currently hovered index
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>; // Naya prop: State setter
}

const BentoCard = ({
  children,
  className,
  index,
  hoveredIndex,
  setHoveredIndex,
}: BentoCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, amount: 0.3 }}
    className={`p-2 border border-zinc-200 dark:border-zinc-800 rounded-3xl backdrop-blur-sm shadow-xl 
                bg-white/60 dark:bg-zinc-900/60 transition-all duration-300 relative group block h-full w-full ${className}`}
    onMouseEnter={() => setHoveredIndex(index)} // Mouse Enter par index set
    onMouseLeave={() => setHoveredIndex(null)} // Mouse Leave par null set
  >
    {/* SLIDING HOVER BACKGROUND EFFECT */}
    <AnimatePresence>
      {hoveredIndex === index && (
        <motion.span
          className="absolute inset-0 h-full w-full bg-gray-200 dark:bg-slate-800/[0.8] block rounded-[1.6rem] z-0"
          layoutId="hoverBackgroundBento" // Ek naya layoutId use kiya
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.15 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.15, delay: 0.1 },
          }}
        />
      )}
    </AnimatePresence>

    <div className="relative z-10 h-full p-4 md:p-6 flex flex-col justify-between">
      {children}
    </div>
  </motion.div>
);

export default function BentoGridSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const latestBlog = {
    id: 1,
    title: "Server Components vs. Client Components: A Next.js Deep Dive",
    link: "/blogs/nextjs-server-client-deep-dive",
    readingTime: "7 min read",
    date: "Oct 26, 2024",
  };

  // Har card ko ek unique index denge
  const cards = [
    {
      id: 1,
      content: (
        <>
          <div className="flex items-center space-x-3 mb-2">
            <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              My Location
            </span>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-50">
            Neemuch, <br /> Madhya Pradesh, India
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Based in the heart of India, building things for the world.
          </p>
        </>
      ),
      className:
        "col-span-6 md:col-span-3 row-span-1 bg-gradient-to-br from-blue-500/50 dark:from-blue-500/10 to-transparent",
    },

    {
      id: 2,
      content: (
        <>
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Core Power
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Next.js & Serverless
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Focused on fast, scalable, and modern full-stack development.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 text-sm bg-gray-200 dark:bg-zinc-700 rounded-full">
              NextJS
            </span>
            <span className="px-3 py-1 text-sm bg-gray-200 dark:bg-zinc-700 rounded-full">
              React
            </span>
            <span className="px-3 py-1 text-sm bg-gray-200 dark:bg-zinc-700 rounded-full">
              Tailwind
            </span>
            <span className="px-3 py-1 text-sm bg-gray-200 dark:bg-zinc-700 rounded-full">
              Node.js
            </span>
            <span className="px-3 py-1 text-sm bg-gray-200 dark:bg-zinc-700 rounded-full">
              MongoDB
            </span>
          </div>
        </>
      ),
      className:
        "col-span-6 md:col-span-3 row-span-1 border-blue-300 dark:border-blue-700/50",
    },

    {
      id: 3,
      content: (
        <div className="text-center">
          <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            Available Now
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-3 leading-relaxed">
            Ready for new projects and collaborations. Let's build something
            great together!
          </p>
        </div>
      ),
      className:
        "col-span-3 md:col-span-2 row-span-1 items-center justify-center",
    },

    {
      id: 4,
      content: (
        <div className="text-center">
          <Clock className="h-8 w-8 mx-auto text-blue-500 mb-2" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            1200+ Hours
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-5">
            Logged across personal & client work. Committed to continuous
            learning and growth.
          </p>
        </div>
      ),
      className:
        "col-span-3 md:col-span-2 row-span-1 items-center justify-center",
    },

    {
      id: 5,
      content: (
        <>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-yellow-600" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Latest Post
            </span>
          </div>

          <a
            href={latestBlog.link}
            // Internal link, so no target="_blank"
            className="mt-2 group flex flex-col hover:text-blue-600 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 leading-tight group-hover:underline">
              {latestBlog.title}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              {latestBlog.date} | {latestBlog.readingTime}
            </span>
          </a>

          <div className="mt-4">
            <a
              href={latestBlog.link}
              className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors"
            >
              Read Article <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
        </>
      ),
      className:
        "col-span-6 md:col-span-2 row-span-1 flex flex-col justify-between p-4",
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      {/* --- Enhanced Heading Section --- */}
      <div className="relative mb-20 flex flex-col items-center justify-center overflow-hidden">
        {/* Main Heading Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-center"
        >
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-blue-100 uppercase leading-none">
            The Dev Behind <br />
            {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-blue-500">
              The Code
            </span> */}
             <span className="text-blue-700">
              The Code
            </span>
          </h2>

          {/* Decorative Line Under Heading */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-2 bg-blue-700 mx-auto mt-4 rounded-full"
          />

          <p className="mt-6 text-zinc-500 dark:text-zinc-400 font-mono text-sm uppercase tracking-[0.3em]">
            Based in Neemuch // Building Worldwide
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-6 grid-rows-3 gap-6 md:grid-rows-2">
        {cards.map((card, index) => (
          <BentoCard
            key={card.id}
            index={index} // 0 se start hoga
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            className={card.className}
          >
            {card.content}
          </BentoCard>
        ))}
      </div>
    </section>
  );
}

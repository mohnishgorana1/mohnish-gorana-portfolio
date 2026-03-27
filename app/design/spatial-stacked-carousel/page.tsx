"use client";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";

const extensions = [
  {
    id: 1,
    name: "Linear",
    description: "Create, search, and modify your issues without leaving your keyboard.",
    categories: ["Engineering", "Productivity"],
    bgColor: "bg-[linear-gradient(138deg,rgba(32,35,91,0.7)_22%,rgba(7,9,33,0.7)_82%)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_20px_3px_rgba(7,13,79,0.05),0_0_40px_20px_rgba(7,13,79,0.05),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/linear-web.png",
    icon: "/designs/glowing-app-carousel/linear-icon.png",
  },
  {
    id: 2,
    name: "Google Translate",
    description: "Translate text instantly across multiple languages without breaking your workflow.",
    categories: ["Productivity", "Writing"],
    bgColor: "bg-[radial-gradient(94.21%_78.4%_at_50%_29.91%,rgba(43,94,180,0.7),rgba(13,16,35,0.42))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_20px_3px_rgba(7,13,79,0.1),0_0_40px_20px_rgba(85,0,98,0.1),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/google-translate-web.png",
    icon: "/designs/glowing-app-carousel/google-translate-icon.png",
  },
  {
    id: 3,
    name: "Spotify",
    description: "Search songs, control playback, and explore your library without leaving your workspace.",
    categories: ["Productivity"],
    bgColor: "bg-[radial-gradient(30%_40%_at_52%_36.91%,rgba(13,110,48,1),rgba(8,53,24,1))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_20px_3px_rgba(46,212,105,0.05),0_0_40px_20px_rgba(46,212,105,0.05),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/spotify-web.png",
    icon: "/designs/glowing-app-carousel/spotify-icon.png",
  },
  {
    id: 4,
    name: "Arc",
    description: "Quickly navigate tabs, search history, and manage your browsing experience seamlessly.",
    categories: ["Productivity", "Writing"],
    bgColor: "bg-[radial-gradient(94.21%_78.4%_at_50%_29.91%,rgba(39,61,180,0.7),rgba(15,9,38,0.4))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_20px_3px_rgba(7,13,79,0.1),0_0_40px_20px_rgba(85,0,98,0.1),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    icon: "/designs/glowing-app-carousel/arc-icon.png",
    bgImage: "/designs/glowing-app-carousel/arc-web.png",
  },
  {
    id: 5,
    name: "TinyPNG",
    description: "Compress images efficiently while maintaining quality for faster performance and sharing.",
    categories: ["Productivity", "Design"],
    bgColor: "bg-[radial-gradient(84.35%_70.19%_at_50%_38.11%,rgba(2,96,101,0.57),rgba(5,136,178,0.06))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(3,122,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/tiny-png-web.png",
    icon: "/designs/glowing-app-carousel/tiny-png-icon.png",
  },
  {
    id: 6,
    name: "1Password",
    description: "Securely access, manage, and autofill your passwords without interrupting your workflow.",
    categories: ["Productivity"],
    bgColor: "bg-[radial-gradient(90.35%_49.25%_at_50%_59.06%,rgba(2,61,114,0.7),rgba(5,11,28,0.42))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(3,30,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/1password-web.png",
    icon: "/designs/glowing-app-carousel/1password-icon.png",
  },
  {
    id: 7,
    name: "Jira",
    description: "Track issues, manage sprints, and collaborate with your team directly from your command bar.",
    categories: ["Productivity"],
    bgColor: "bg-[radial-gradient(84.6%_73.49%_at_50%_26.51%,rgba(4,63,150,0.7),rgba(6,18,37,0.25))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(3,15,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/jira-web.png",
    icon: "/designs/glowing-app-carousel/jira-icon.png",
  },
  {
    id: 8,
    name: "Slack",
    description: "Search messages, manage notifications, and stay connected with your team in real time.",
    categories: ["Productivity"],
    bgColor: "bg-[radial-gradient(99.74%_100%_at_50%_0%,rgba(74,21,75,0.7),rgba(29,5,29,0.42))] shadow-[0_30px_50px_0_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_20px_3px_rgba(79,7,59,0.1),0_0_40px_20px_rgba(85,0,98,0.1),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/slack-web.png",
    icon: "/designs/glowing-app-carousel/slack-icon.png",
  },
  {
    id: 9,
    name: "Zoom",
    description: "Start or join meetings quickly and manage calls without navigating through multiple apps.",
    categories: ["Productivity"],
    bgColor: "bg-[radial-gradient(94.21%_78.4%_at_50%_29.91%,rgba(4,63,150,0.7),rgba(5,9,29,0.42))] shadow-[0_30px_50px_0_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_20px_3px_rgba(7,13,79,0.1),0_0_40px_20px_rgba(85,0,98,0.1),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/zoom-web.png",
    icon: "/designs/glowing-app-carousel/zoom-icon.png",
  },
  {
    id: 10,
    name: "Timers",
    description: "Set timers, track countdowns, and manage time efficiently while staying focused on tasks.",
    categories: ["Productivity"],
    bgColor: "bg-[radial-gradient(94.21%_78.4%_at_50%_29.91%,rgba(4,62,150,0.7),rgba(16,0,43,0.16))] shadow-[0_30px_50px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_24px_0_rgba(3,15,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/timers-web.png",
    icon: "/designs/glowing-app-carousel/timers-icon.png",
  },
  {
    id: 11,
    name: "Pomodoro",
    description: "Boost productivity with focused work sessions and structured break intervals using Pomodoro.",
    categories: ["Productivity"],
    bgColor: "bg-[radial-gradient(86.88%_75.47%_at_50%_24.53%,rgba(82,48,145,0.7),rgba(26,11,51,0.14))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(51,3,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/pomodoro-web.png",
    icon: "/designs/glowing-app-carousel/pomodoro-icon.png",
  },
  {
    id: 12,
    name: "Notion",
    description: "Search pages, create content, and organize your workspace without leaving your keyboard.",
    categories: ["Productivity", "Writing"],
    bgColor: "bg-[radial-gradient(126.42%_76.6%_at_50%_32.26%,rgba(84,95,102,0.7),rgba(0,36,69,0.13))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_20px_3px_rgba(7,13,79,0.1),0_0_40px_20px_rgba(7,40,79,0.1),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/notion-web.png",
    icon: "/designs/glowing-app-carousel/notion-icon.png",
  },
  {
    id: 13,
    name: "Todoist",
    description: "Manage tasks, create todos, and stay organized with quick access to your productivity system.",
    categories: ["Productivity", "Writing"],
    bgColor: "bg-[radial-gradient(126.42%_76.6%_at_50%_32.26%,rgba(84,95,102,0.7),rgba(0,36,69,0.13))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_20px_3px_rgba(7,13,79,0.1),0_0_40px_20px_rgba(7,40,79,0.1),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/todoist-web.png",
    icon: "/designs/glowing-app-carousel/todoist-icon.png",
  },
  {
    id: 14,
    name: "Google Search",
    description: "Search the web instantly and get results without opening a browser or switching tabs.",
    categories: ["Productivity", "Writing"],
    bgColor: "bg-[radial-gradient(84.6%_73.49%_at_50%_26.51%,rgba(4,63,150,0.7),rgba(6,18,37,0.25))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(3,15,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/google-search-web.png",
    icon: "/designs/glowing-app-carousel/google-search-icon.png",
  },
  {
    id: 15,
    name: "Obsidian",
    description: "Quickly search notes and connect ideas across your knowledge base with ease.",
    categories: ["Productivity", "Writing"],
    bgColor: "bg-[radial-gradient(86.88%_75.47%_at_50%_24.53%,rgba(82,48,145,0.7),rgba(26,11,51,0.14))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(51,3,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/obsidian-web.png",
    icon: "/designs/glowing-app-carousel/obsidian-icon.png",
  },
  {
    id: 16,
    name: "Google Chrome",
    description: "Access bookmarks, tabs, and browsing tools without interrupting your current workflow.",
    categories: ["Productivity", "Writing"],
    bgColor: "bg-[radial-gradient(84.6%_73.49%_at_50%_26.51%,rgba(4,63,150,0.7),rgba(6,18,37,0.25))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(3,15,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/google-chrome-web.png",
    icon: "/designs/glowing-app-carousel/google-chrome-icon.png",
  },
  {
    id: 17,
    name: "CleanShot X",
    description: "Capture, annotate, and share screenshots quickly with powerful editing tools built-in.",
    categories: ["Productivity", "Design"],
    bgColor: "bg-[radial-gradient(181.77%_70.19%_at_50%_38.11%,rgba(3,91,155,0.7),rgba(0,69,150,0.03))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(3,23,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/cleanshotx-web.png",
    icon: "/designs/glowing-app-carousel/cleanshotx-icon.png",
  },
  {
    id: 18,
    name: "Color Picker",
    description: "Pick, preview, and save colors from anywhere on your screen with precision and ease.",
    categories: ["Engineering", "Design"],
    bgColor: "bg-[radial-gradient(215.15%_78.4%_at_50%_29.91%,rgba(170,12,155,0.7),rgba(0,0,0,0))] shadow-[0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(129,3,124,0.09),inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/color-picker-web.png",
    icon: "/designs/glowing-app-carousel/color-picker-icon.png",
  },
  {
    id: 19,
    name: "Kill Process",
    description: "View running processes and terminate unresponsive apps directly from your command bar.",
    categories: ["Engineering"],
    bgColor: "bg-[radial-gradient(123.97%_75.85%_at_50%_24.15%,rgba(119,78,0,0.7),rgba(51,23,17,0.22))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(129,56,3,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/kill-process-web.png",
    icon: "/designs/glowing-app-carousel/kill-process-icon.png",
  },
  {
    id: 20,
    name: "Visual Studio Code",
    description: "Open projects, run commands, and manage your development workflow efficiently.",
    categories: ["Engineering"],
    bgColor: "bg-[radial-gradient(225.75%_87.17%_at_47.21%_21.04%,rgba(2,87,145,0.7),rgba(8,9,18,0))] shadow-[0_30px_50px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_24px_0_rgba(3,30,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/vscode-web.png",
    icon: "/designs/glowing-app-carousel/vscode-icon.png",
  },
  {
    id: 21,
    name: "Github",
    description: "Manage repositories, review pull requests, and track issues without leaving your flow.",
    categories: ["Engineering"],
    bgColor: "bg-[radial-gradient(86.88%_75.47%_at_50%_24.53%,rgba(82,48,145,0.7),rgba(26,11,51,0.14))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(51,3,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/github-web.png",
    icon: "/designs/glowing-app-carousel/github-icon.png",
  },
  {
    id: 22,
    name: "Tailwind CSS",
    description: "Search utilities, copy classes, and explore Tailwind docs directly from your workflow.",
    categories: ["Engineering"],
    bgColor: "bg-[radial-gradient(225.75%_87.17%_at_47.21%_21.04%,rgba(2,111,145,0.7),rgba(8,9,18,0))] shadow-[0_30px_50px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_24px_0_rgba(3,30,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/tailwind-web.png",
    icon: "/designs/glowing-app-carousel/tailwind-icon.png",
  },
  {
    id: 23,
    name: "Format JSON",
    description: "Quickly format, validate, and clean JSON data for better readability and debugging.",
    categories: ["Engineering"],
    bgColor: "bg-[radial-gradient(86.88%_75.47%_at_50%_24.53%,rgba(82,48,145,0.7),rgba(26,11,51,0.14))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(51,3,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/format-json-web.png",
    icon: "/designs/glowing-app-carousel/format-json-icon.png",
  },
  {
    id: 24,
    name: "Warp",
    description: "Access terminal commands, history, and workflows in a faster and more intuitive interface.",
    categories: ["Engineering"],
    bgColor: "bg-[radial-gradient(225.85%_78.4%_at_50%_29.91%,rgba(10,77,77,0.7),rgba(5,12,29,0.12))] shadow-[0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(3,122,129,0.09),inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/warp-web.png",
    icon: "/designs/glowing-app-carousel/warp-icon.png",
  },
  {
    id: 29,
    name: "Lorem Ipsum",
    description: "Generate placeholder text quickly and copy it for use in designs, layouts, and prototypes.",
    categories: ["Design", "Writing"],
    bgColor: "bg-[radial-gradient(225.85%_78.4%_at_50%_29.91%,rgba(10,77,77,0.7),rgba(5,12,29,0.12))] shadow-[0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(3,122,129,0.09),inset_0_1px_0_0_rgba(255,255,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/lorem-ipsum-web.png",
    icon: "/designs/glowing-app-carousel/lorem-ipsum-icon.png",
  },
  {
    id: 30,
    name: "Image Modification",
    description: "Edit, resize, and enhance images quickly without leaving your workflow or switching tools.",
    categories: ["Design"],
    bgColor: "bg-[radial-gradient(117.25%_78.4%_at_50%_29.91%,rgba(131,52,151,0.7),rgba(0,6,154,0.09))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(104,3,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/image-modifications-web.png",
    icon: "/designs/glowing-app-carousel/image-modifications-icon.png",
  },
  {
    id: 31,
    name: "Ruler",
    description: "Measure distances and align elements precisely on your screen without switching between tools.",
    categories: ["Design"],
    bgColor: "bg-[radial-gradient(181.77%_70.19%_at_50%_38.11%,rgba(3,119,155,0.7),rgba(0,69,150,0.11))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_20px_3px_rgba(7,53,79,0.1),0_0_40px_20px_rgba(0,39,98,0.1),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/ruler-web.png",
    icon: "/designs/glowing-app-carousel/ruler-icon.png",
  },
  {
    id: 32,
    name: "Figma File Search",
    description: "Search and open your Figma files instantly without leaving your current workspace.",
    categories: ["Design"],
    bgColor: "bg-[radial-gradient(92.33%_55.94%_at_50%_44.06%,rgba(25,41,53,0.7),rgba(18,25,34,0.07))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_30px_50px_0_rgba(0,0,0,0.4),0_4px_24px_0_rgba(3,123,129,0.09),inset_0_0_0_1px_rgba(255,255,255,0.06)]",
    bgImage: "/designs/glowing-app-carousel/figma-file-search-web.png",
    icon: "/designs/glowing-app-carousel/figma-file-search-icon.png",
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Har card 0.1 second ke gap mein aayega
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }, // Purani list fatak se gayab hogi
  },
};
// INDIVIDUAL CARDS ANIMATION
const itemVariants: any = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 24, duration: 0.6 },
  },
};



function SpatialStackedCarousel() {
  const allCategories = Array.from(
    new Set(extensions.flatMap((ext) => ext.categories)),
  );

  const [activeCategory, setActiveCategory] = useState(allCategories[0]);
  const [currentExtensions, setCurrentExtensions] = useState<any>();

  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 324; // cardwidth-300 + gap-24
      carouselRef.current.scrollBy({
        left: direction == "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const filteredExtensions = extensions.filter((extension) =>
      extension.categories.includes(activeCategory),
    );
    console.log("filter", filteredExtensions);
    setCurrentExtensions(filteredExtensions);
  }, [activeCategory]);

  return (
    <main className="mt-20 min-h-screen mx-auto">
      <div className="absolute top-28 w-full">
        <header className="flex flex-col md:items-center justify-between gap-10">
          <h1 className="text-2xl md:text-4xl lg:text-4xl font-medium   ">
            Spatial Stacked Carousel + Morphing Tabs
          </h1>
          <div className="">
            <div className="flex gap-4 items-center py-[6px] px-1.5 rounded-full border border-b-0 border-neutral-600/50  bg-neutral-900 text-sm">
              {allCategories.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "relative px-6 py-2.5 rounded-full font-medium transition-colors duration-300 outline-none",
                    activeCategory === category
                      ? "text-white"
                      : "text-neutral-500 hover:text-neutral-300",
                  )}
                  style={{ WebkitTapHighlightColor: "transparent" }} // Mobile tap highlight hatane ke liye
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeCategory"
                      className={cn(
                        "absolute inset-0 rounded-full border border-neutral-600",
                        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]",
                        "bg-neutral-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-neutral-800 via-60% to-neutral-800 to-80% ",
                      )}
                      // snappy aur smooth spring animation
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.9,
                      }}
                    ></motion.div>
                  )}
                  <span className="relative z-20 capitalize">{category}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="mt-10 relative w-full">
          <AnimatePresence mode="wait">
            {currentExtensions && (
              <motion.div
                ref={carouselRef}
                key={activeCategory}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className={cn(
                  "flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth mb-10 px-8",
                  "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']",
                  "[mask-image:linear-gradient(to_right,transparent,black_0%,black_90%,transparent)]",
                )}
              >
                {currentExtensions &&
                  currentExtensions.map((extension: any) => (
                    <motion.div
                      key={extension.id}
                      variants={itemVariants}
                      className="snap-start shrink-0"
                    >
                      <Card
                        name={extension.name}
                        description={extension.description}
                        categories={extension.categories}
                        bgColor={extension.bgColor!}
                        bgImage={extension.bgImage!}
                        icon={extension.icon}
                      />
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-end gap-3">
            <div className="flex items-center justify-end gap-4">
              {/* LEFT BUTTON */}
              <button
                onClick={() => scroll("left")}
                className={cn(
                  "size-12 rounded-full flex items-center justify-center relative group",
                  "bg-[#0A0A0A] text-neutral-500 border border-white/5",
                  "transition-all ease-out duration-300",
                  "hover:text-white hover:bg-[#161616] hover:border-white/10",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.15)]",
                )}
              >
                <ChevronLeft
                  size={24}
                  className="group-active:-translate-x-0.5 transition-transform"
                />
              </button>

              {/* RIGHT BUTTON */}
              <button
                onClick={() => scroll("right")}
                className={cn(
                  "size-12 rounded-full flex items-center justify-center relative group",
                  "bg-[#0A0A0A] text-neutral-500 border border-white/5",
                  "transition-all ease-out duration-300",
                  "hover:text-white hover:bg-[#161616] hover:border-white/10",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.15)]",
                )}
              >
                <ChevronRight
                  size={24}
                  className="group-active:translate-x-0.5 transition-transform"
                />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SpatialStackedCarousel;

const Card = ({
  name,
  description,
  categories,
  bgColor,
  bgImage,
  icon,
}: {
  name: string;
  description: string;
  categories: string[];
  bgColor: string;
  bgImage: string;
  icon: string;
}) => {
  return (
    <div
      className={cn(
        bgColor,
        `w-[350px] h-[500px] border rounded-2xl `,
        "group relative cursor-pointer overflow-hidden flex flex-col",
      )}
    >
      <div className="absolute inset-0 bg-black/20 rounded-xl group-hover:bg-black/5 transition-colors ease-in-out duration-200" />
      <header className="p-5 space-y-4 mb-4 border-b border-b-neutral-50/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* icon*/}
            <Image
              src={icon}
              height={50}
              width={50}
              className=""
              alt={`Illustration- ${name}`}
            />
            <h1 className="font-medium text-lg">{name}</h1>
          </div>
          <div className="size-8 flex items-center justify-center border rounded-lg border-neutral-400/50 group-hover:border-neutral-400/80 group-hover:scale-105 transition-all duration-500 ease-in-out bg-neutral-50/5">
            <ChevronRight className="text-xs" size={18} />
          </div>
        </div>
        <p className="font-semibold text-sm">{description}</p>
      </header>
      <div className="w-full h-full flex-1">
        <Image
          src={bgImage}
          alt={`Illustration - ${name}`}
          width={1000}
          height={1000}
          className="object-contain h-full"
        />
      </div>
    </div>
  );
};

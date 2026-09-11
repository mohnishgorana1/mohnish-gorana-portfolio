"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FileText } from "lucide-react";
import { MdContactMail, MdMessage } from "react-icons/md";
import { techStacksMap } from "@/lib/constants";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import ContactModal from "./ContactModal";
import TechStackPill from "./TechStackPill";
import ChatModal from "./ChatModal";
import PhotoModal from "./PhotoModal";

const SKILL_GROUPS = [
  {
    label: "Frontend",
    skills: ["ReactJS", "NextJS", "Typescript", "TailwindCSS", "Redux Toolkit"],
  },
  {
    label: "Backend",
    skills: ["NodeJS", "ExpressJS", "MongoDB"],
  },
  {
    label: "Tools",
    skills: ["Git", "Docker", "Figma", "Postman"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

// =========================================
// 1. MAIN HERO SECTION COMPONENT
// =========================================
export default function HeroSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  return (
    <section className="w-full relative">
      <motion.div
        className="flex flex-col w-full mx-auto gap-4"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        {/* Profile Block */}
        <motion.div
          variants={itemVariants}
          className={cn(
            "w-full p-5 sm:p-6 flex flex-col gap-4 rounded-3xl",
            "bg-surface dark:bg-surface/50 transition-all duration-500",
            "border-2 border-border/50 shadow-lg hover:shadow-surface-foreground/20 hover:shadow-xl dark:hover:shadow-neutral-900/30 dark:hover:shadow-lg"
          )}
        >
          {/* ===== IDENTITY ROW: avatar + name/role/meta ===== */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* 🌟 layoutId matches PhotoModal's wrapper -> shared element transition */}
            <motion.div
              layoutId="profile-avatar"
              onClick={() => setIsPhotoOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative w-22 h-22 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-border bg-muted shrink-0 cursor-pointer"
            >
              <Image
                src="/assets/p1.png"
                alt="Mohnish Gorana"
                fill
                priority
                className="object-cover"
              />
            </motion.div>

            <div className="flex flex-col min-w-0">
              <h1 className="text-[20px] sm:text-2xl md:text-4xl font-bold leading-tight text-surface-foreground/90 dark:text-surface-foreground/70 truncate">
                Mohnish Gorana
              </h1>
              <h2 className="text-[13px] md:text-[16px] mt-0.5 text-muted-foreground">
                Full-Stack Web Developer
              </h2>
              <p className="text-[12px] md:text-[15px] text-muted-foreground/80 truncate">
                MERN Stack · Next.js · GenAI · AI Agents
              </p>
            </div>
          </div>

          {/* ===== META ROW: location + availability badge ===== */}
          <div className="flex flex-col items-start gap-x-4 gap-y-1">
            <span className="text-[12px] md:text-[13px] text-muted-foreground">
              📍 Neemuch, Madhya Pradesh, India
            </span>
            <div className="pl-1 flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-success/70" />
              </span>
              <span className="text-[12px] md:text-[13px] text-success font-medium">Available for work</span>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* ===== ACTIONS ROW ===== */}
          <div className="flex flex-wrap items-center gap-3">
            {/* VIEW RESUME BUTTON */}
            <Link
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-34 md:w-40 h-10 px-4 inline-flex items-center justify-center rounded-full cursor-pointer font-semibold text-[12px] md:text-sm bg-secondary/50 hover:bg-muted/30 hover:text-foreground text-foreground/80 transition-colors shadow-sm hover:shadow-md dark:shadow-none border border-transparent dark:border-border/50"
              >
                <FileText size={16} className="mr-2" />
                <span>View Resume</span>
              </motion.button>
            </Link>

            {/* CONTACT BUTTON */}
            <motion.button
              layoutId="contact-modal-wrapper"
              onClick={() => setIsContactOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              style={{ borderRadius: 99 }}
              className="w-34 md:w-40 h-10 px-4 inline-flex items-center justify-center cursor-pointer font-semibold text-[12px] md:text-sm bg-secondary/50 hover:bg-muted/30 hover:text-foreground text-foreground/80 transition-colors shadow-sm hover:shadow-md dark:shadow-md border border-transparent dark:border-border/50"
            >
              <MdContactMail size={16} className="mr-2" />
              <span>Contact</span>
            </motion.button>

            {/* AI CHAT BUTTON */}
            <motion.button
              onClick={() => setIsChatOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-34 md:w-40 h-10 px-4 inline-flex items-center justify-center rounded-full cursor-pointer font-semibold text-[12px] md:text-sm bg-secondary/50 hover:bg-muted/30 hover:text-foreground text-foreground/80 transition-colors shadow-sm hover:shadow-md dark:shadow-none border border-transparent dark:border-border/50"
            >
              <MdMessage size={16} className="mr-2" />
              <span>AI Chat</span>
            </motion.button>

            {/* spacer pushes social icons to the right on wide screens, wraps naturally on narrow ones */}
            <div className="hidden md:flex items-center gap-3 sm:ml-auto">
              <motion.a
                href="https://github.com/mohnishgorana1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="rounded-full bg-secondary/30 hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring p-2.5 shadow-sm hover:shadow-md dark:shadow-none border border-transparent dark:border-border/50 block"
              >
                <BsGithub size={18} />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/mohnish-gorana-804374340/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="rounded-full bg-secondary/30 hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring p-2.5 shadow-sm hover:shadow-md dark:shadow-none border border-transparent dark:border-border/50 block"
              >
                <BsLinkedin size={18} />
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* About + Skills */}
        <motion.div
          variants={itemVariants}
          className={cn(
            "w-full rounded-[28px] bg-surface dark:bg-surface/50 p-5 md:p-7 transition-all duration-500",
            "border border-border shadow-lg hover:shadow-surface-foreground/20 hover:shadow-xl dark:hover:shadow-neutral-900/30 dark:hover:shadow-lg"
          )}
        >
          <div>
            <h3 className="text-[17px] md:text-lg font-bold tracking-tight text-surface-foreground mb-3">About</h3>
            <p className="text-[13px] md:text-sm text-muted-foreground/80 font-medium">
              I build web applications end to end, from schema to shipped UI, mostly with the
              MERN stack and Next.js. <br /> Currently exploring GenAI and RAG Systems.<br />MCA | 2022-2024 <br />Based in Neemuch, currently taking on
              freelance and full-time work.
            </p>
          </div>
          <div className="h-px bg-border my-5 md:my-6" />
          <div>
            <h3 className="text-[17px] md:text-lg font-bold tracking-tight text-surface-foreground mb-3">Skills</h3>
            <div className="flex flex-col gap-2 gap-y-4">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="text-[12px] md:text-sm font-medium text-muted-foreground sm:w-24 shrink-0">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map((tech, idx) => {
                      const techData = techStacksMap[tech];
                      if (!techData) return null;
                      const Icon = techData.icon;
                      const isBlackIcon = ["NextJS", "Liveblocks", "Clerk", "ExpressJS"].includes(tech);
                      return (
                        <TechStackPill Icon={Icon} isBlackIcon={isBlackIcon} tech={tech} key={idx} techData={techData} />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isContactOpen && <ContactModal onClose={() => setIsContactOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && <ChatModal onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {isPhotoOpen && <PhotoModal onClose={() => setIsPhotoOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
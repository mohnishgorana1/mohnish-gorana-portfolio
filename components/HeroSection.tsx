"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";

import { FileText } from "lucide-react";
import { MdContactMail } from "react-icons/md";
import GithubActivitySection from "./GithubActivitySection";
import { techStacksMap } from "@/lib/constants";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import ContactModal from "./ContactModal";
import TechStackPill from "./TechStackPill";

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

  return (
    <section className="w-full min-h-[75vh] relative">
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
            "w-full md:h-64 p-5 flex flex-col md:flex-row gap-0 md:gap-6 rounded-3xl",
            "bg-surface dark:bg-surface/50 transition-all duration-500",
            "border border-border shadow-lg hover:shadow-surface-foreground/20 hover:shadow-xl dark:hover:shadow-neutral-900/30 dark:hover:shadow-lg"
          )}
        >
          {/* photo box */}
          <div className="flex justify-between items-start md:items-center md:justify-center md:w-48">
            <div className="relative w-18 h-18 md:w-full md:h-full rounded-full md:rounded-[1.25rem] overflow-hidden border border-border md:border-none bg-muted shrink-0">
              <Image
                src="/assets/profile_image.jpeg"
                alt="Mohnish Gorana"
                fill
                priority
                className="object-cover filter transition-all duration-500"
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="md:flex-1 mt-5 md:mt-0 flex flex-col relative ">
            <h1 className="text-[24px] md:text-3xl font-bold leading-tight text-surface-foreground/90 dark:text-surface-foreground/70">
              Mohnish Gorana
            </h1>
            <h2 className="text-[13px] md:text-[15px] mt-1 md:mt-2 text-muted-foreground">
              Full-Stack Web Developer
            </h2>
            <p className="text-[12px] md:text-[14px] text-muted-foreground">
              MERN Stack | Next.js | GenAI | AI Agents
            </p>

            <p className="text-[12px] md:text-[14px] text-muted-foreground">
              Neemuch, Madhya Pradesh, India
            </p>

            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[12px] md:text-[14px] text-success">Available for work</span>
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2  bg-success/70"></span>
              </span>
            </div>

            {/* Call to Actions */}
            <div className="md:absolute md:bottom-2 flex items-center gap-3 md:gap-4 mt-6">
              <Link
                href="https://drive.google.com/file/d/1fGSpqQ_NLIMY-fd879HgINXnoUIKzoYX/view"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer group"
              >
                <button className="w-36 md:w-38 h-10 inline-flex items-center justify-center rounded-full cursor-pointer font-semibold text-[12px] md:text-sm bg-secondary/50 hover:bg-muted/30 text-foreground transition-all hover:scale-105 active:scale-95 duration-300 shadow-sm hover:shadow-md dark:shadow-none border border-transparent dark:border-border/50">
                  <FileText size={16} className="mr-2 transition-colors" />
                  <span className="pb-0.5">View Resume</span>
                </button>
              </Link>

              <div className="relative w-36 md:w-38 h-10 shrink-0">
                {/* {!isContactOpen && ( */}
                <motion.button
                  layoutId="contact-modal-wrapper"
                  onClick={() => setIsContactOpen(true)}
                  style={{ borderRadius: 99 }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer font-semibold text-[12px] md:text-sm bg-secondary/50 hover:bg-muted/30 text-foreground shadow-sm transition-all hover:scale-105 active:scale-95 duration-300 hover:shadow-md dark:shadow-md border border-transparent dark:border-border/50"
                >
                  <MdContactMail size={16} className="mr-2" />
                  <span className="pb-0.5">Contact</span>
                </motion.button>
                {/* )} */}
              </div>

              <div className="hidden md:flex items-center gap-4 ml-4">
                <Link
                  href="https://github.com/mohnishgorana1"
                  target="_blank"
                  className="rounded-full bg-secondary/30 hover:bg-muted/30 transition-transform duration-150 hover:scale-110 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring p-2 shadow-sm hover:shadow-md dark:shadow-none border border-transparent dark:border-border/50"
                >
                  <BsGithub size={20} className="rounded-full transition-colors" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/mohnish-gorana-804374340/"
                  target="_blank"
                  className="rounded-full bg-secondary/30 hover:bg-muted/30 transition-transform duration-150 hover:scale-110 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring p-2 shadow-sm hover:shadow-md dark:shadow-none border border-transparent dark:border-border/50"
                >
                  <BsLinkedin size={20} className="rounded-full transition-colors" />
                </Link>
              </div>
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
    </section >
  );
}


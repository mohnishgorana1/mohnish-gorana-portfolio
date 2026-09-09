"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { techStacksMap } from "@/lib/constants";
import { cn } from "@/lib/utils";
import TechStackPill from "./TechStackPill";
import { BsArrowUpRight } from "react-icons/bs";
import { MovingBorderButton } from "./ui/moving-border-button";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: {
    id: string | number;
    title: string;
    slug: string;
    link: string;
    images: string[];
    video?: string;
    shortVideo?: string;
    shortDescription: string;
    techStacks: string[];
    isFeatured?: boolean;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useRouter();
  const {
    title,
    images,
    shortVideo,
    video,
    shortDescription,
    techStacks,
    slug,
    isFeatured,
  } = project;

  const videoSource = shortVideo || video;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);


  // Bulletproof Video Autoplay Logic
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !videoSource) return;

    videoElement.defaultMuted = true;
    videoElement.muted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => { });
            }
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(videoElement);
    return () => observer.disconnect();
  }, [videoSource]);

  return (
    <motion.div
      className={cn(
        "group pb-2 flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-300 ease-out",
        // "bg-surface dark:bg-surface/50 dark:hover:bg-surface/60 transition-all duration-300 ease-out",
        "bg-linear-to-b from-neutral-50 to-neutral-100 ",
        "dark:bg-linear-to-b dark:from-neutral-800 dark:to-neutral-950",
        "border border-border",
        "shadow-lg shadow-surface-foreground/20 hover:shadow-surface-foreground/30 dark:shadow-neutral-900/20 dark:hover:shadow-neutral-800/20",
      )}
    >
      {/* 1. MEDIA SECTION (Top) */}
      <section className="relative w-full aspect-video overflow-hidden">
        {videoSource ? (
          <>
            <video
              ref={videoRef}
              src={videoSource}
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={() => setIsVideoLoaded(true)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
            />
            {!isVideoLoaded && images && images.length > 0 && (
              <Image
                src={images[0]}
                alt={`${title} placeholder`}
                fill
                className="object-cover opacity-60"
              />
            )}
          </>
        ) : images && images.length > 0 ? (
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 "
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-medium text-sm">
            No Preview
          </div>
        )}

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-border/60 shadow-sm text-[11px] font-bold text-foreground tracking-wide">
            <Sparkles className="w-3 h-3 text-warning" />
            FEATURED
          </div>
        )}
      </section>

      {/* 2. DETAILS SECTION (Bottom) */}
      <section className="w-full p-5 md:p-6 gap-y-2 flex flex-col flex-1 relative z-20">
        <div className="flex flex-col gap-2">
          <h2 className="text-[18px] md:text-xl font-bold tracking-tight text-surface-foreground/80 group-hover:text-surface-foreground transition-colors duration-300">
            {title}
          </h2>

          <p className="text-[13px] md:text-sm text-muted-foreground/80 font-medium leading-relaxed line-clamp-2">
            {shortDescription}
          </p>
        </div>

        <div className="w-full border border-border/40"></div>

        {/* TECH STACK PILLS */}
        <div className="flex flex-wrap gap-2 gap-y-3 pt-2 ">
          {techStacks.slice(0, 4).map((tech, idx) => {
            const techData = techStacksMap[tech];
            if (!techData) return null;
            const Icon = techData.icon;
            const isBlackIcon = ["NextJS", "Liveblocks", "Clerk", "ExpressJS"].includes(tech);
            return (
              <TechStackPill Icon={Icon} isBlackIcon={isBlackIcon} tech={tech} key={idx} techData={techData} />
            )
          })}
          {techStacks.length > 4 && (
            <div className="flex items-center justify-center px-2 py-1 md:py-1.5 rounded-xl bg-surface border border-border/60 shadow-sm text-[11px] font-semibold text-muted-foreground">
              +{techStacks.length - 4}
            </div>
          )}
        </div>
      </section>

      {/* VIEW BUTTON */}
      <div className="px-5 md:px-6 pb-5 mt-auto relative z-30">
        <Link href={`/projects/${slug}`} className="shrink-0 inline-block w-full md:w-auto cursor-pointer">
          <button
            className={cn(
              "cursor-pointer group/arrow relative flex items-center justify-center gap-2.5",
              "w-full md:w-40 px-4 py-2.5 rounded-xl",
              "text-sm font-semibold",
              "bg-primary/95 dark:bg-primary/80 text-primary-foreground",
              "border border-transparent",
              "shadow-sm shadow-primary/20",
              "transition-all duration-300 ease-out",
              "hover:shadow-md hover:shadow-primary/30 hover:-translate-y-0.5",
              "active:translate-y-0 active:shadow-sm",
            )}
          >
            <span>View Project</span>
            <BsArrowUpRight
              size={13}
              className="transition-transform duration-300 ease-out group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5"
            />
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
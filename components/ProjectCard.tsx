"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { techStacksMap } from "@/lib/constants";

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

  // 🌟 Bulletproof Video Autoplay Logic
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
              playPromise.catch(() => {});
            }
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(videoElement);
    return () => observer.disconnect();
  }, [videoSource]);

  return (
    <div
      onClick={() => router.push(`/projects/${slug}`)}
      className="group flex flex-col h-full rounded-[2.5rem] overflow-hidden bg-background border border-border/50 shadow-sm hover:shadow-2xl hover:border-border hover:-translate-y-2 transition-all duration-500 ease-in-out cursor-pointer"
    >
      {/* 1. MEDIA SECTION (Top) */}
      <section className="relative w-full aspect-video shrink-0 overflow-hidden bg-secondary">
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
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
            />
            {!isVideoLoaded && images && images.length > 0 && (
              <Image
                src={images[0]}
                alt={`${title} placeholder`}
                fill
                className="object-cover opacity-40"
              />
            )}
          </>
        ) : images && images.length > 0 ? (
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover opacity-90 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-medium text-sm">
            No Preview
          </div>
        )}

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-xs font-bold text-foreground">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            Featured
          </div>
        )}
        
      </section>

      {/* 2. DETAILS SECTION (Bottom) */}
      <section className="w-full p-8 flex flex-col flex-1 relative z-20 bg-background/50 backdrop-blur-sm transition-colors">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h2>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mt-3 line-clamp-3 font-medium">
          {shortDescription}
        </p>

        {/* TECH STACK PILLS */}
        <div className="flex flex-wrap mt-6 gap-2 pt-5 border-t border-border/50">
          {techStacks.map((tech) => {
            const techData = techStacksMap[tech];
            if (!techData) return null;
            const Icon = techData.icon;
            const isBlackIcon =
              techData.color === "#000000" || techData.color === "#101010";

            return (
              <div
                key={tech}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 transition-all duration-300 ease-in cursor-pointer"
              >
                <div
                  className={`flex items-center justify-center ${isBlackIcon ? "dark:invert" : ""}`}
                >
                  <Icon
                    size={14}
                    color={isBlackIcon ? undefined : techData.color}
                  />
                </div>
                <span className="font-semibold text-foreground/80 text-[11px] sm:text-xs tracking-tight">
                  {tech}
                </span>
              </div>
            );
          })}
        </div>

        {/* VIEW BUTTON */}
        <div className="mt-auto pt-8">
          <Link href={`/projects/${slug}`} className="shrink-0">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-muted-foreground transition-colors duration-300">
              View Project Details
              <div className="flex items-center justify-center size-7 rounded-full bg-foreground text-background group-hover:bg-muted-foreground transition-colors group-hover:translate-x-1 duration-300">
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectCard;

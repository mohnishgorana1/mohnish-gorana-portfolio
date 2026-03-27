"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { techStacksMap } from "@/lib/constants";
import { ArrowRightCircle, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

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
    video,
    shortVideo,
    shortDescription,
    techStacks,
    id,
    slug,
    isFeatured,
  } = project;

  const videoSource = shortVideo || video; // 🎥 REF & STATE FOR VIDEO INTERSECTION

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !videoSource) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Play when in viewport
          videoElement.play().catch((error) => {
            console.log("Video play prevented:", error);
          });
        } else {
          videoElement.pause();
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the video is visible
      }
    );

    observer.observe(videoElement);

    return () => {
      if (videoElement) observer.unobserve(videoElement);
    };
  }, [videoSource]);

  const handleVideoLoadedData = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div
      onClick={() => router.push(`/projects/${slug}`)}
      className="group cursor-pointer w-full h-full flex flex-col rounded-[1.5rem] backdrop-blur-xl 
      bg-white dark:bg-zinc-950 dark:border-zinc-800 
      border border-zinc-200 
      shadow-zinc-300/50 hover:shadow-xl dark:shadow-black/20 
      transition-all duration-500 overflow-hidden relative"
    >
      {/* TOP SECTION: VIDEO/IMAGE */}
      <section className="relative w-full h-48 shrink-0 overflow-hidden">
        {videoSource ? (
          <>
            <video
              ref={videoRef}
              src={videoSource}
              muted
              loop
              playsInline
              preload="none"
              onLoadedData={handleVideoLoadedData}
              className="absolute inset-0 w-full h-full object-cover opacity-90 blur-[0.5px] transition-all duration-1000 group-hover:blur-0 group-hover:opacity-100 group-hover:scale-105"
            />
            {!isVideoLoaded && ( // Placeholder background for video loading
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-200/90 dark:bg-zinc-900/90 animate-pulse">
                {images && images.length > 0 && (
                  <Image
                    src={images[0]}
                    alt={`${title} placeholder`}
                    fill
                    className="object-cover opacity-30"
                  />
                )}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 via-transparent to-transparent z-10" />
          </>
        ) : images && images.length > 0 ? (
          <Image
            src={images[0]}
            alt={`${title} preview`}
            fill
            className="object-cover opacity-80 blur-[0.5px] transition-all duration-1000 group-hover:blur-0 group-hover:opacity-100 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500">
            No Preview
          </div>
        )}
      </section>

      {/* BOTTOM SECTION: DESCRIPTION */}
      <section
        className="w-full p-6 flex flex-col flex-1 relative z-20 
      bg-zinc-200/50 group-hover:bg-zinc-200 border-t border-zinc-900
      dark:bg-zinc-900/50 dark:group-hover:bg-zinc-900/20 "
      >
        {/* FEATURED BADGE */}
        {isFeatured && (
          <div className="absolute top-4 right-4 z-30">
            <div className="relative group/badge">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full shadow-sm">
                <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
            </div>
          </div>
        )}
        <h2 className="text-2xl lg:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-base lg:text-lg leading-relaxed mt-3 line-clamp-3">
          {shortDescription}
        </p>
        {/* Tech Stack – Glass Pills */}
        <div className="flex flex-wrap mt-4">
          {project.techStacks.map((tech, idx) => {
            const techData = techStacksMap[tech];
            if (!techData) return null;

            const Icon = techData.icon;
            const color = techData.color;

            return (
              <div
                key={idx}
                className="group/tech flex items-center -ml-4 mb-2  bg-zinc-100/80 border border-zinc-300  hover:bg-zinc-200 dark:bg-zinc-700/80 dark:border-zinc-600  dark:hover:bg-zinc-700 rounded-full shadow-sm hover:shadow-md  transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Icon Container */}
                <div className="w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 shadow-sm">
                  <Icon size={25} color={color} />
                </div>
                {/* Tech Name */}
                <span // Tech Name Color (Fallback to dark text, or use light text in dark mode if no color property is used)
                  className="max-w-0 opacity-0 ml-0 group-hover/tech:max-w-xs group-hover/tech:opacity-100 group-hover/tech:mx-3 group-hover/tech:pr-4 text-zinc-900 dark:text-zinc-50 transition-all duration-500 text-xs font-semibold whitespace-nowrap"
                >
                  {tech}
                </span>
              </div>
            );
          })}
        </div>
        {/* Button – iOS Blue Button */}
        <div className="mt-auto pt-6">
          <Link
            href={`/projects/${slug}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-x-2 px-5 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-transparent 
            dark:text-blue-300 dark:bg-blue-800/40 dark:border-blue-700 dark:hover:bg-blue-700 dark:hover:text-white 
            rounded-full shadow-sm transition-all duration-300 group"
          >
            View Details
            <ArrowRightCircle className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectCard;

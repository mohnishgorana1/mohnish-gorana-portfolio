import React from "react";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { LampContainer } from "./ui/lamp";
import { SparklesCore } from "./ui/sparkles";

const skills = [
  {
    title: "NEXT JS",
    logo: "/assets/icons/next.svg",
  },
  {
    title: "React JS",
    logo: "/assets/icons/react-icon.svg",
  },
  {
    title: "Express JS",
    logo: "/assets/icons/exp1.svg",
  },
  {
    title: "MongoDB",
    logo: "/assets/icons/",
  },
  {
    title: "Typescript",
    logo: "/assets/icons/",
  },
  {
    title: "Javascript",
    logo: "/assets/icons/",
  },
  {
    title: "Tailwind CSS",
    logo: "/assets/icons/",
  },
  {
    title: "NODE JS",
    logo: "/assets/icons/",
  },
];

function SkillsMovingCarousel() {
  return (
    <div>
      <HeroHighlight className="w-full h-full flex flex-col items-center justify-center gap-y-8 ">
        <div className="w-full flex flex-col items-center justify-center rounded-md">
          <h1 className="text-4xl md:text-5xl lg:text-7xl animate-pulse ">
            <p>Skills to Watch Out</p>
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 gap-y-3 gap-x-10 items-center justify-center">
          {skills &&
            skills.map(({ title, logo }) => (
              <div
                key={title}
                className="w-34 lg:w-38 text-center p-2 rounded-lg bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-400 cursor-pointer"
              >
                <p className="text-sm md:text-lg font-semibold tracking-wider">
                  {title}
                </p>
              </div>
            ))}
        </div>
      </HeroHighlight>
    </div>
  );
}

export default SkillsMovingCarousel;

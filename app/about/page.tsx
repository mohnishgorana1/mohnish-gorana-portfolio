import { AcademicCard } from "@/components/AcademicCard";
import Navbar from "@/components/Navbar";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { academics } from "@/lib/constants";
import Link from "next/link";
import React from "react";

function About() {
  return (
    <main className="w-full bg-background dark:text-zinc-50">
      <section>
        <BackgroundBeamsWithCollision
          className="flex flex-col items-center pt-10 gap-y-7 bg-background backdrop-blur-xl shadow-sm border-b border-gray-200 dark:border-zinc-700/50">
          <h1 className="text-5xl relative z-20 md:text-6xl lg:text-7xl font-bold text-center text-blue-600 font-sans tracking-tight pt-8 sm:pt-0">
            About Me
          </h1>

          <div
            className="bg-gradient-to-br from-white/40 via-white/20 to-white/10 backdrop-blur-3xl rounded-2xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.15)] p-6 flex flex-col gap-y-3 max-w-[90vw] lg:max-w-[60vw] 
                       text-gray-800 
                       dark:from-zinc-900/40 dark:via-zinc-900/20 dark:to-zinc-900/10 dark:border-zinc-700/50 dark:shadow-[0_8px_32px_rgba(255,255,255,0.05)] dark:text-zinc-100"
          >
            <h2 className="text-2xl font-bold tracking-wide">
              I&apos;m Mohnish Gorana
            </h2>

            <h3 className="text-[16px] lg:text-lg opacity-80 leading-relaxed">
              A passionate full-stack developer skilled in
              <strong className="underline font-semibold">
                {" "}
                MERN Stack, Next.js, and modern UI frameworks.
              </strong>
              <br />I build intuitive interfaces and scalable backends.
            </h3>

            <h4
              className="text-[16px] lg:text-lg opacity-70 italic text-gray-800 dark:text-zinc-300"
            >
              When I'm not coding, I explore new tech, upgrade my skills, and
              stay updated with the latest trends in web dev.
            </h4>

            <div className="mt-6">
              <Link
                href="https://drive.google.com/file/d/1fGSpqQ_NLIMY-fd879HgINXnoUIKzoYX/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 duration-300 text-white font-semibold rounded-md shadow-md hover:shadow-lg"
              >
                Download Resume
              </Link>
            </div>
          </div>
        </BackgroundBeamsWithCollision>
      </section>

      <section
      id="academic-qualifications"
        className="relative py-14 md:py-20 w-full flex flex-col gap-y-8 md:gap-y-12 items-center bg-background"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-zinc-50">
          Academic Qualifications
        </h2>

        <div className="min-w-[90vw] lg:min-w-[75vw] flex flex-col gap-y-6 items-center justify-center px-3">
          {academics.map((item, idx) => (
            <AcademicCard key={idx} {...item} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default About;

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// 🌟 FRESH, HIGH-SIGNAL DATA
const capabilities = [
  {
    id: "01",
    title: "System Architecture",
    description:
      "Designing scalable, high-performance backend systems and databases. Focus on secure, RESTful API development and seamless data flow.",
    tags: ["Node.js", "Express", "MongoDB", "Systems"],
  },
  {
    id: "02",
    title: "Frontend Engineering",
    description:
      "Crafting pixel-perfect, responsive, and accessible user interfaces. Bridging the gap between design and robust code using modern React paradigms.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    id: "03",
    title: "Motion & Interaction",
    description:
      "Breathing life into static designs. Implementing fluid micro-interactions, simple scroll animations, and dynamic state transitions that feel native. Still learning about advance animations from GSAP and Framer Motion",
    tags: ["Framer Motion", "GSAP", "UI/UX", "Animation"],
  },
  {
    id: "04",
    title: "Real-time Infrastructure",
    description:
      "Building low-latency, real-time features like live chat, collaborative code editing, and video streaming using WebSockets and modern SDKs.",
    tags: ["WebSockets", "Liveblocks", "Stream", "Socket.io"],
  },
];

export default function CapabilitiesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 sm:py-32 bg-background w-full" id="capabilities">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* =========================================
            HEADER (Sharp & Typography Focused)
        ========================================= */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/50 pb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 mb-6 border border-border/50 bg-secondary/30 text-[10px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Core Capabilities
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            >
              What I bring to <br />
              <span className="text-muted-foreground font-serif italic font-light">
                the table.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-sm sm:text-base font-medium max-w-xs md:text-right"
          >
            A blend of solid engineering principles and an eye for fluid design.
          </motion.p>
        </div>

        {/* =========================================
            THE LIST (No Cards, Sharp Edges)
        ========================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col"
        >
          {capabilities.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12 py-10 sm:py-12 border-b border-border/50 hover:bg-secondary/20 transition-colors duration-500 cursor-default"
            >
              {/* Active Indicator Line (Left edge on hover) */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-foreground scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out" />

              {/* 1. ID & Title */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 lg:w-1/3 px-4 lg:px-6">
                <span className="text-sm font-mono text-muted-foreground pt-1.5">
                  {item.id}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                  {item.title}
                </h3>
              </div>

              {/* 2. Description & Tags */}
              <div className="flex flex-col lg:w-1/2 px-4 lg:px-0">
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed font-medium mb-6">
                  {item.description}
                </p>

                {/* Tech Tags (Sharp Mono styling) */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground border border-border/50 bg-background group-hover:border-border group-hover:text-foreground transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Hover Icon (Right edge) */}
              <div className="hidden lg:flex items-center justify-end w-16 px-6">
                <ArrowRight className="text-muted-foreground opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

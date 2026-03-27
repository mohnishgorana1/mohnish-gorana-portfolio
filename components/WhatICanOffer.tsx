"use client";
import React from "react";
import { motion } from "framer-motion";
import { services } from "@/lib/constants";

function WhatICanOffer() {
  return (
    <section className="py-24 bg-background overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto px-6">
        {/* Floating Heading Strategy */}
        <div className="relative mb-20 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-mono text-xs font-bold uppercase tracking-[0.5em]"
          >
            Core Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white"
          >
            What I <span className="text-blue-600">Offer.</span>
          </motion.h2>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 blur-[100px] rounded-full" />
        </div>

        {/* The Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 ">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              // Custom span for asymmetric look
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={` group relative rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 p-8 
        bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-700`}
    >
      {/* 1. The "Aura" Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2rem] blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />

      <div className="relative h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          {/* 2. Floating Icon Badge */}
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 shadow-xl group-hover:-rotate-12 transition-transform duration-500">
            <Icon className="w-8 h-8 text-blue-600" />
          </div>

          {/* 3. Dynamic Index Number */}
          <span className="text-5xl font-black text-zinc-200 dark:text-zinc-800 group-hover:text-blue-500/20 transition-colors duration-500">
            {index + 1}
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">
            {service.title}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-[280px] leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* 4. Interactive Bottom Accent */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-600/5 rounded-tl-[3rem] -mr-8 -mb-8 group-hover:scale-150 transition-transform duration-700" />
      </div>
    </motion.div>
  );
};

export default WhatICanOffer;

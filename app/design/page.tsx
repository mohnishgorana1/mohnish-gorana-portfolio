"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { designShowcaseConfigs } from "@/lib/constants";





export default function DesignArchivePage() {
  return (
    <div className="w-full min-h-screen bg-background text-foreground pt-24 pb-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter mb-4">
            Design Archive.
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl font-light">
            A collection of premium components, micro-interactions, and interface layouts inspired by the best in the industry.
          </p>
        </motion.div>

        {/* Minimalist List Container */}
        <div className="flex flex-col border-t border-border/50">
          {designShowcaseConfigs.map((item, index) => (
            <Link 
              href={`/design/${item.path}`} 
              key={item.path}
              className="group block"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-6 sm:py-8 border-b border-border/50 transition-colors duration-300 group-hover:border-foreground"
              >
                {/* Left Side: Name & Description */}
                <div className="flex flex-col gap-1 sm:gap-2 pr-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-medium text-foreground transition-colors group-hover:text-foreground">
                      {item.name}
                    </h2>
                    {item.inspiration && (
                      <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border border-border bg-secondary/30 text-muted-foreground">
                        Inspired by {item.inspiration}
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground font-light">
                    {item.description}
                  </p>
                  
                  {/* Mobile Inspiration Badge */}
                  {item.inspiration && (
                    <span className="sm:hidden inline-flex w-max mt-2 items-center px-2 py-0.5 rounded-sm text-[12px] font-mono uppercase tracking-wider bg-secondary/50 text-muted-foreground">
                      Ref: {item.inspiration}
                    </span>
                  )}
                </div>

                {/* Right Side: Animated Arrow */}
                <div className="hidden sm:flex items-center justify-center p-2 rounded-full transition-transform duration-300 group-hover:bg-secondary group-hover:rotate-45">
                  <ArrowUpRight className="text-muted-foreground group-hover:text-foreground transition-colors" size={24} />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
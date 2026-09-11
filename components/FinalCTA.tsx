"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdContactMail } from "react-icons/md";
import { FileText, Briefcase } from "lucide-react";
import ContactModal from "./ContactModal";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FinalCTA() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <section className="w-full py-8 md:py-12 px-2 md:px-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn("w-full rounded-3xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden",
                    "border-2 border-border/70 dark:border-0",
                    "bg-secondary/20 backdrop-blur-3xl dark:bg-linear-to-b dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-950",
                    "shadow-md shadow-secondary  dark:shadow-neutral-900"
                )}
            >
                {/* Subtle Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-success/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-success/20 bg-success/10 text-[11px] font-bold text-success uppercase tracking-widest mb-6">
                    <Briefcase size={14} />
                    Open to Full-Time Roles
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-surface-foreground mb-4 leading-tight">
                    Looking for a <span className="text-muted-foreground font-serif italic font-light tracking-normal">Developer?</span>
                </h2>

                <p className="text-[14px] md:text-[15px] text-muted-foreground max-w-xl mb-8 font-medium leading-relaxed">
                    I am actively seeking full-time and remote opportunities to build scalable web applications. If my skills align with your engineering team&apos;s vision, I&apos;d love to chat.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative z-10">
                    <motion.button
                        onClick={() => {
                            setTimeout(() => {
                                setIsContactOpen(true)
                            }, 250);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.55 }}
                        className="w-full sm:w-auto px-8 h-12 rounded-xl bg-foreground text-background font-bold text-[13px] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                        <MdContactMail size={18} />
                        Get in Touch
                    </motion.button>

                    <Link
                        href="/resume"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto px-8 h-12 rounded-xl bg-secondary/50 border border-border/60 text-foreground font-bold text-[13px] hover:bg-muted/30 transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                            <FileText size={18} />
                            View Resume
                        </motion.div>
                    </Link>
                </div>
            </motion.div>

            <AnimatePresence>
                {isContactOpen && <ContactModal onClose={() => setIsContactOpen(false)} />}
            </AnimatePresence>
        </section>
    );
}
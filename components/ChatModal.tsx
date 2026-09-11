'use client'

import React from 'react'
import { motion } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChatInterface from './ChatInterface'; // 🌟 Importing the logic file

export default function ChatModal({ onClose }: { onClose?: () => void; }) {
    return (
        <>
            {/* Backdrop Blur */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                onClick={onClose}
                className="fixed inset-0 z-[90] bg-background/80 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 pointer-events-none">
                <motion.div
                    style={{ borderRadius: 28 }}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={cn(
                        "w-full max-w-4xl relative flex flex-col pointer-events-auto overflow-hidden",
                        "bg-surface transition-all duration-500",
                        "border border-border shadow-lg hover:shadow-surface-foreground/20 hover:shadow-xl dark:hover:shadow-lg dark:hover:shadow-neutral-900/30 ",
                        "mt-5 md:mt-0 h-[88vh] sm:h-[92vh]" // Fixed height for chat window
                    )}
                >
                    {/* =========================================
                        HEADER
                    ========================================= */}
                    <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border/50 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center size-10 rounded-full bg-foreground text-background shadow-sm">
                                <Sparkles size={18} />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight flex items-center gap-2">
                                    Mohnish&apos;s AI
                                    <span className="relative flex size-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                                        <span className="relative inline-flex rounded-full size-2 bg-success" />
                                    </span>
                                </h3>
                                <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-widest">
                                    Ask me anything
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="cursor-pointer p-2 rounded-full bg-secondary/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* =========================================
                        CHAT INTERFACE (LOGIC & UI)
                    ========================================= */}
                    <ChatInterface />

                </motion.div>
            </div>
        </>
    )
}
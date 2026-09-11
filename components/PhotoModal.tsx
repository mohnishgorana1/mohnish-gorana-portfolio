'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PhotoModal({ onClose }: { onClose?: () => void }) {
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
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                    layoutId="profile-avatar"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={cn(
                        "relative flex flex-col items-center pointer-events-auto",
                        "bg-secondary/50 p-5 sm:p-6 rounded-[28px]",
                        "border border-border shadow-xl shadow-muted dark:shadow-olive-500/20"
                    )}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="cursor-pointer absolute -top-3 -right-3 p-2 rounded-full bg-foreground text-background shadow-md hover:scale-105 active:scale-95 transition-transform"
                    >
                        <X size={16} />
                    </button>

                    {/* Photo */}
                    <div className="relative w-64 h-64 sm:w-[400px] sm:h-[400px] rounded-2xl overflow-hidden border border-border bg-muted shrink-0">
                        <Image
                            src="/assets/p1.png"
                            alt="Mohnish Gorana"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                    {/* Name */}
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.25 }}
                        className="mt-4 text-lg sm:text-xl font-bold text-surface-foreground/90 dark:text-surface-foreground/70"
                    >
                        Mohnish Gorana
                    </motion.p>
                </motion.div>
            </div>
        </>
    )
}
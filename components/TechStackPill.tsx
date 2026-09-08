'use client'
import { cn } from '@/lib/utils';
import React from 'react'

function TechStackPill({ tech, isBlackIcon, Icon, techData }: { tech: string, isBlackIcon: boolean, Icon: React.ElementType, techData: { color: string } }) {
    return (
        <button
            key={tech}
            type="button"
            className={cn("flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg cursor-pointer",
                "bg-secondary/30",
                "border border-border dark:border-border hover:border-border ",
                "hover:-translate-y-0.5 transition-all duration-300 ease-out",
                "shadow-sm dark:shadow-md dark:hover:shadow-lg shadow-muted/50 hover:shadow-muted dark:shadow-black/30 dark:hover:shadow-black/80 ",
            )}>
            <div
                className={`flex items-center justify-center ${isBlackIcon
                    ? "dark:invert opacity-80 hover:opacity-100"
                    : "opacity-90 hover:opacity-100"
                    } transition-opacity`}
            >
                <Icon size={14} color={isBlackIcon ? "#000000" : techData.color} />
            </div>
            <span className="font-semibold text-foreground/80 hover:text-foreground text-xs transition-colors tracking-tight">
                {tech}
            </span>
        </button>
    );
}

export default TechStackPill
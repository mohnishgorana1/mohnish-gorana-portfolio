import React from "react";

interface MovingBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function MovingBorderButton({
  children,
  className = "",
  ...props
}: MovingBorderButtonProps) {
  return (
    <button
      className={`cursor-pointer relative inline-flex h-12 overflow-hidden rounded-full p-px focus:outline-none focus:ring-1 focus:ring-blue-700 dark:focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background group ${className}`}
      {...props}
    >
      {/* The Animated Spinning Gradient (Using Tailwind theme color instead of hex) */}
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-accent)_50%,transparent_100%)] opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

      {/* The Inner Solid Button */}
      <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-background px-6 font-medium text-foreground backdrop-blur-3xl transition-colors group-hover:bg-secondary/30">
        {children}
      </span>
    </button>
  );
}

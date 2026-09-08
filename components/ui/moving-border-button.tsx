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
      className={`cursor-pointer relative inline-flex h-10 overflow-hidden rounded-xl p-px focus:outline-none focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-background group/movingbtn ${className}`} {...props}
    >
      {/* The Animated Spinning Gradient (Using Tailwind theme color instead of hex) */}
      <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-accent)_50%,transparent_100%)] opacity-90 group-hover/movingbtn:opacity-100 transition-opacity duration-500" />

      {/* The Inner Solid Button */}
      <span className="inline-flex h-full w-full items-center justify-center rounded-xl bg-neutral-100 dark:bg-background px-6 font-medium text-foreground/80 duration-initial group-hover/movingbtn:text-white dark:group-hover/movingbtn:text-foreground backdrop-blur-3xl transition-colors group-hover/movingbtn:bg-accent/20">
        {children}
      </span>
    </button>
  );
}

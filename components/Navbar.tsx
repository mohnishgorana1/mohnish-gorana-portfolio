"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Home, Code, Menu, NotebookText, Terminal, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { BsGithub, BsLinkedin } from "react-icons/bs";

// 1. Navigation Data
const navItems = [
  { name: "Home", href: "/", icon: <Home className="w-1/2 h-1/2" /> },
  { name: "Projects", href: "/projects", icon: <Code className="w-1/2 h-1/2" /> },
  { name: "Blogs", href: "/blogs", icon: <NotebookText className="w-1/2 h-1/2" /> },
  { name: "Coding", href: "/machine-coding-tasks", icon: <Terminal className="w-1/2 h-1/2" /> },
  // { name: "Designs", href: "/design", icon: <Palette className="w-1/2 h-1/2" /> },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/mohnishgorana1",
    icon: <BsGithub className="w-1/2 h-1/2" />,
    isExternal: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mohnish-gorana/",
    icon: <BsLinkedin className="w-1/2 h-1/2" />,
    isExternal: true,
  },
];

// 2. The Interactive Dock Icon Component (Aceternity-style magnify: width + height together)
interface DockIconProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isExternal?: boolean;
  mouseX: MotionValue;
  onClick?: () => void;
}

function DockIcon({ icon, label, href, isExternal, mouseX, onClick }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Outer container magnifies from 40px -> 64px near the cursor
  const sizeTransform = useTransform(distance, [-120, 0, 120], [40, 64, 40]);
  const size = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  // Icon itself scales slightly less so it stays proportionate inside the bubble
  const iconSizeTransform = useTransform(distance, [-120, 0, 120], [35, 55, 35]);
  const iconSize = useSpring(iconSizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const content = (
    <>
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 6, x: "-50%" }}
            transition={{ duration: 0.15 }}
            className="absolute -bottom-8 left-1/2 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background shadow-md dark:shadow-black/50 z-50 pointer-events-none"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors duration-300"
      >
        {icon}
      </motion.div>
    </>
  );

  const className =
    "group relative aspect-square rounded-2xl bg-secondary/50 dark:bg-secondary border border-border hover:bg-secondary dark:hover:bg-secondary shadow-sm hover:shadow-md dark:shadow-none flex items-end justify-center cursor-pointer shrink-0";

  if (href) {
    return (
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={className}
      >
        <Link
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="relative w-full h-full flex items-center justify-center"
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={cn(className, "relative")}
    >
      {content}
    </motion.div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// 3. Main Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mouseX = useMotionValue(Infinity);

  // Scroll lock effect when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Cleaned up with semantic colors and premium shadows
  const navContainerClasses = `
    flex items-center justify-center rounded-2xl px-3 md:px-6 md:py-3 py-2
    backdrop-blur-xl border 
    bg-surface/70 border-border/60 
    dark:shadow-lg shadow-md shadow-black/10 dark:shadow-white/5
  `;

  return (
    <main className="relative flex mt-4 h-18 w-full mx-auto flex-col items-center justify-center z-50">
      {/* ======================================= */}
      {/* Desktop Apple-style Magnifying Dock (Hidden on Mobile) */}
      {/* ======================================= */}
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`hidden md:flex items-end gap-2 ${navContainerClasses}`}
      >
        {navItems.map((item, idx) => (
          <DockIcon key={idx} icon={item.icon} label={item.name} href={item.href} mouseX={mouseX} />
        ))}

        <div className="w-px h-8 bg-border mx-1 self-center" />

        {socialLinks.map((item, idx) => (
          <DockIcon
            key={idx}
            icon={item.icon}
            label={item.name}
            href={item.href}
            isExternal={item.isExternal}
            mouseX={mouseX}
          />
        ))}

        <div className="w-px h-8 bg-border mx-1 self-center" />

        <DockIcon
          icon={<ThemeToggle className="w-full h-full" />}
          label="Theme"
          mouseX={mouseX}
        />
      </motion.nav>

      {/* ======================================= */}
      {/* Mobile Navbar (Visible on Mobile) */}
      {/* ======================================= */}
      <nav
        className={`max-w-[24rem] w-[calc(100%-2rem)] md:hidden z-50 flex items-center justify-between gap-3 px-2 py-2 ${navContainerClasses}`}
      >
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 active:bg-secondary transition-colors shrink-0"
        >
          <Home size={19} />
        </Link>

        <Link
          href="/projects"
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 active:bg-secondary transition-colors shrink-0"
        >
          <Code size={19} />
        </Link>

        <div className="w-0.5 h-6 bg-border/80 dark:bg-border mx-0.5 shrink-0" />

        <Link
          href="https://github.com/mohnishgorana1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 active:bg-secondary transition-colors shrink-0"
        >
          <BsGithub size={18} />
        </Link>

        <Link
          href="https://www.linkedin.com/in/mohnish-gorana"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/60 active:bg-secondary transition-colors shrink-0"
        >
          <BsLinkedin size={18} />
        </Link>

        <div className="w-0.5 h-6 bg-border/80 dark:bg-border mx-0.5 shrink-0" />

        <div className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-secondary/60 transition-colors shrink-0">
          <ThemeToggle />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-xl transition-colors shrink-0",
            isOpen
              ? "bg-secondary text-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          )}
        >
          {isOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* The Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            />

            {/* The Dropdown Menu */}
            <motion.aside
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-20 left-4 right-4 z-50 bg-surface/95 backdrop-blur-xl border border-border/60 shadow-2xl dark:shadow-black/60 rounded-3xl overflow-hidden"
            >
              <div className="flex flex-col p-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="py-3 px-4 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-2xl flex items-center gap-4 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Navbar;
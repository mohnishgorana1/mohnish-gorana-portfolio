"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Home, Code, Menu, NotebookText, Palette, Terminal, X } from "lucide-react";
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
  { name: "GitHub", href: "https://github.com/mohnishgorana1", icon: <BsGithub className="w-1/2 h-1/2" />, isExternal: true },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mohnish-gorana-804374340/", icon: <BsLinkedin className="w-1/2 h-1/2" />, isExternal: true },
];

// 2. The Interactive Dock Icon Component
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

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-50, 0, 50], [40, 50, 40]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12
  });

  const content = (
    <>
      <span className="absolute top-full mt-1 scale-0 group-hover:scale-100 transition-all duration-240 rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background whitespace-nowrap shadow-md dark:shadow-black/50 z-50 pointer-events-none origin-top">
        {label}
      </span>
      <div className="flex w-full h-full items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors duration-300">
        {icon}
      </div>
    </>
  );

  const className = "relative group aspect-square rounded-2xl bg-secondary/50 dark:bg-secondary border border-border hover:bg-secondary dark:hover:bg-secondary shadow-sm hover:shadow-md dark:shadow-none flex items-center justify-center cursor-pointer shrink-0 duration-300 transition-colors";

  if (href) {
    return (
      <motion.div ref={ref} style={{ width }} className={className}>
        <Link
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="w-full h-full flex items-center justify-center"
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} style={{ width }} onClick={onClick} className={className}>
      {content}
    </motion.div>
  );
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
      {/* Desktop Apple Dock (Hidden on Mobile) */}
      {/* ======================================= */}
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`hidden md:flex fixed top-5 items-center gap-2 ${navContainerClasses}`}
      >
        {navItems.map((item, idx) => (
          <DockIcon key={idx} icon={item.icon} label={item.name} href={item.href} mouseX={mouseX} />
        ))}

        <div className="w-px h-8 bg-border mx-1" />

        {socialLinks.map((item, idx) => (
          <DockIcon key={idx} icon={item.icon} label={item.name} href={item.href} isExternal={item.isExternal} mouseX={mouseX} />
        ))}

        <div className="w-px h-8 bg-border mx-1" />

        <DockIcon
          icon={<div className="scale-75"><ThemeToggle /></div>}
          label="Theme"
          mouseX={mouseX}
        />
      </motion.nav>

      {/* ======================================= */}
      {/* Mobile Menu Navbar (Visible on Mobile) */}
      {/* ======================================= */}
      <nav className={`fixed top-5 max-w-[25rem] w-full md:hidden z-50 flex items-center justify-evenly gap-x-4 px-8 ${navContainerClasses}`}>

        <Link href="/" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
          <Home size={20} />
        </Link>

        <Link href="/projects" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
          <Code size={20} />
        </Link>

        <div className="w-px h-5 bg-border/80" />

        <Link href="https://github.com/mohnishgorana1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
          <BsGithub size={20} />
        </Link>

        <Link href="https://www.linkedin.com/in/mohnish-gorana-804374340/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
          <BsLinkedin size={20} />
        </Link>

        <div className="w-px h-5 bg-border/80" />

        <div className="">
          <ThemeToggle />
        </div>


        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center p-1"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* ======================================= */}
      {/* Mobile Dropdown Menu & Blur Overlay */}
      {/* ======================================= */}
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
"use client";
import { motion } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { Code, Menu, NotebookText, Palette, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FiFramer } from "react-icons/fi";

const navItems = [
  { name: "Projects", href: "/projects", icon: Code },
  { name: "Blogs", href: "/blogs", icon: NotebookText },
  { name: "CodingTasks", href: "/machine-coding-tasks", icon: Code },
  { name: "Designs", href: "/design", icon: Palette },

];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/mohnishgorana1",
    icon: BsGithub,
    isExternal: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mohnish-gorana/",
    icon: BsLinkedin,
    isExternal: true,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  // THE UNIFORM GLASSMORPHISM CLASSES
  const navContainerClasses = `
    sticky top-4 z-50 transition-all duration-300 rounded-2xl px-4 py-2 mx-1 sm:mx-0
    backdrop-blur-lg border 
    bg-white/70 border-black/10 shadow-lg shadow-black/5
    dark:bg-white/5 dark:border-white/10 dark:shadow-none
  `;

  return (
    <nav className={navContainerClasses}>
      <div className="flex justify-between items-center">
        {/* Logo Area */}
        <Link
          href="/"
          className="group relative text-xl sm:text-2xl font-extrabold text-foreground transition-colors flex gap-x-1"
        >
          <span>Mohnish Gorana</span>
          <span className="text-primary">.</span>
        </Link>

        {/* Desktop Links */}
        <section className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <div className="flex items-center">
            {navItems.map((item, idx) => (
              <Link
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                className="px-4 py-2 text-sm font-medium duration-300 ease-in-out text-muted-foreground hover:text-foreground relative group rounded-full"
              >
                {hovered === idx && (
                  <motion.div
                    layoutId="hover"
                    className="absolute inset-0 rounded-full w-full h-full bg-secondary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  ></motion.div>
                )}
                <motion.span className="relative z-10">{item.name}</motion.span>
              </Link>
            ))}
          </div>

          {/* Social Icons (Monochrome for uniform design) */}
          <div className="flex items-center space-x-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  title={item.name}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Icon size={18} className="hover:scale-105 transition-transform" />
                </Link>
              );
            })}
          </div>
          
          <div className="pl-2 border-l border-border">
             <ThemeToggle />
          </div>
        </section>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <aside className="md:hidden absolute w-full left-0 mt-4 z-40 bg-background border border-border shadow-xl rounded-2xl overflow-hidden">
          <div className="flex flex-col p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-3 px-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg flex items-center gap-3 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </aside>
      )}
    </nav>
  );
};

export default Navbar;
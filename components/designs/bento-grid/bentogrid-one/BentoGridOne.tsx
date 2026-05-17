'use client'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Server, Zap, Globe, Cpu } from 'lucide-react';

// ==========================================
// ANIMATION 1: Features (SaaS Actions)
// ==========================================
function AnimationOne() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const sendVariants = {
    initial: { x: 0, y: 0, opacity: 1, scale: 1, transition: { duration: 0 } },
    active: {
      x: [0, -4, 25, -25, 0], y: [0, 4, -25, 25, 0],
      opacity: [1, 1, 0, 0, 1], scale: [1, 0.9, 0.3, 0.3, 1],
      transition: { duration: 1.2, ease: "easeInOut", times: [0, 0.2, 0.5, 0.51, 1] }
    }
  };
  const swapVariants = {
    initial: { rotate: 0, transition: { duration: 0 } },
    active: { rotate: [0, 180], transition: { duration: 0.75, ease: "linear", repeat: 1, repeatType: "loop" } }
  }
  const receiveVariants = {
    initial: { y: 0, opacity: 1, transition: { duration: 0 } },
    active: { y: [0, 5, 5, -5, -5, 0], opacity: [1, 0, 0, 0, 0, 1], transition: { duration: 0.8, ease: "easeInOut" } }
  }
  const purchaseVariants = {
    initial: { y: 0, scale: 1, transition: { duration: 0 } },
    active: { y: [0, -3, 3, 0], scale: [1, 1.05, 0.95, 1], type: "spring", stiffness: 300, transition: { duration: 0.9, ease: "easeInOut" } }
  }

  // Changed Text Data to SaaS/Cloud Deployment Theme
  const menuItems = [
    {
      title: "Deploy",
      desc: "Push your code and we handle the global distribution.",
      iconBg: "bg-gradient-to-b from-blue-500 to-blue-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]",
      icon: (
        <motion.svg variants={sendVariants} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
          <path d="m21.854 2.147-10.94 10.939" />
        </motion.svg>
      )
    },
    {
      title: "Sync Repo",
      desc: "Automatic Git integration with your favorite repositories.",
      iconBg: "bg-gradient-to-b from-zinc-700 to-zinc-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-zinc-600",
      icon: (
        <motion.svg variants={swapVariants} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" />
        </motion.svg>
      )
    },
    {
      title: "Edge Fetch",
      desc: "Serverless edge functions with zero cold starts.",
      iconBg: "bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]",
      icon: (
        <motion.svg variants={receiveVariants} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
        </motion.svg>
      )
    },
    {
      title: "Scale",
      desc: "Scale your resources instantly as traffic grows.",
      iconBg: "bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]",
      icon: (
        <motion.svg variants={purchaseVariants} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </motion.svg>
      ),
      hasTag: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % menuItems.length);
    }, 2500)
    return () => clearInterval(interval);
  }, [menuItems.length])

  return (
    // Used theme colors: bg-secondary for container, text-foreground
    <div className="rounded-l-[2rem] bg-secondary w-full max-w-[320px] ml-auto text-foreground py-2 space-y-1 pl-2 shadow-xl border border-border">
      {menuItems.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <motion.div
            key={index}
            initial="initial"
            animate={isActive ? "active" : "initial"}
            className={`pl-5 pr-4 py-3 flex items-center gap-x-4 rounded-l-2xl transition-colors duration-500 cursor-pointer group
              ${isActive ? "bg-background shadow-sm" : "bg-transparent hover:bg-background/50"}
            `}
            onClick={() => setActiveIndex(index)}
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}>
              {item.icon}
            </div>
            <div className="flex items-start flex-col gap-y-0.5">
              <div className="flex items-center gap-x-2">
                <h1 className="font-semibold text-[15px] tracking-wide text-foreground">
                  {item.title}
                </h1>
                {item.hasTag && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent px-1.5 py-0.5 rounded-md border border-accent/20 scale-90 origin-left">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-[13px] text-muted-foreground leading-snug font-medium pr-2">
                {item.desc}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  );
}


// ==========================================
// ANIMATION 2: Build Button
// ==========================================
function AnimationTwo() {
  const [currentStatus, setCurrentStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStatus === "idle") setCurrentStatus("loading");
      else if (currentStatus === "loading") setCurrentStatus("success");
      else if (currentStatus === "success") setCurrentStatus("idle");
    }, 2500)
    return () => clearTimeout(timer);
  }, [currentStatus])

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative flex items-center justify-center">
        <AnimatePresence>
          {currentStatus === "loading" && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: [0, 1, 0], scale: [1, 1.4] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border-[3px] border-accent/50" // Uses --color-accent
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: [0, 1, 0], scale: [1, 1.4] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.75 }}
                className="absolute inset-0 rounded-full border-[3px] border-accent/50"
              />
            </>
          )}
        </AnimatePresence>
        <motion.button
          layout
          style={{ borderRadius: 9999, backgroundColor: "var(--color-accent)" }}
          className="relative z-10 flex items-center justify-center gap-x-2 text-white text-base font-semibold px-6 py-2.5 my-1 overflow-hidden shadow-md"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {currentStatus === "loading" && (
              <motion.div key="loading" initial={{ opacity: 0, scale: 0, rotate: -90 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0, rotate: 90 }} className="flex items-center justify-center">
                <motion.svg animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </motion.svg>
              </motion.div>
            )}
            {currentStatus === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="flex items-center justify-center">
                <motion.svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <motion.circle cx="12" cy="12" r="9" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} />
                  <motion.path d="M8 12.5l3 3l5 -6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }} />
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div layout className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentStatus === "idle" ? "idle" : "backing"}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}
                className="block whitespace-nowrap"
              >
                {/* Text Changed */}
                {currentStatus === "idle" ? "Deploy Now" : currentStatus === "loading" ? "Building..." : "Live"}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </motion.button>
      </div>
    </div>
  )
}


// ==========================================
// ANIMATION 3: Compute Power
// ==========================================
function AnimationThree() {
  const statusConfig = {
    normal: { label: "Standard", time: "2x", dotColor: "bg-blue-400", activeBg: "bg-blue-500", icon: <Server className="w-3.5 h-3.5 text-white" strokeWidth={3} /> },
    fast: { label: "Turbo", time: "4x", dotColor: "bg-amber-400", activeBg: "bg-amber-500", icon: <Cpu className="w-3.5 h-3.5 text-white" strokeWidth={3} /> },
    urgent: { label: "Edge", time: "Max", dotColor: "bg-purple-500", activeBg: "bg-purple-600", icon: <Zap className="w-3.5 h-3.5 text-white" strokeWidth={3} /> }
  };
  type StatusType = keyof typeof statusConfig;
  const [currentStatus, setCurrentStatus] = useState<"normal" | "fast" | "urgent">("normal");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStatus((prev) => {
        if (prev === "normal") return "fast";
        if (prev === "fast") return "urgent";
        return "normal";
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [currentStatus])

  const currentData = statusConfig[currentStatus];

  return (
    <div className="flex items-center justify-center h-full w-full">
      {/* Used bg-secondary and border-border */}
      <div className="bg-secondary border border-border rounded-[2rem] p-4 py-6 flex items-center justify-center gap-x-6 min-w-[200px] shadow-sm">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentStatus}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-end w-44"
          >
            <h1 className='font-bold text-foreground text-[20px] leading-none capitalize'>{currentData.label}</h1>
            <p className='text-muted-foreground font-semibold text-[13px] mt-1'>Compute {currentData.time}</p>
          </motion.div>
        </AnimatePresence>
        <section className="w-9 flex flex-col items-center justify-center gap-y-3 bg-background border border-border shadow-sm rounded-full py-2 px-1">
          {(["normal", "fast", "urgent"] as StatusType[]).map((status) => {
            const isActive = status === currentStatus;
            const config = statusConfig[status];
            return (
              <motion.div
                key={status} layout initial={false}
                animate={{ width: isActive ? 22 : 6, height: isActive ? 22 : 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`rounded-full flex items-center justify-center overflow-hidden shrink-0 ${isActive ? config.activeBg : config.dotColor}`}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                      {config.icon}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </section>
      </div>
    </div>
  )
}


// ==========================================
// ANIMATION 4: CI/CD Pipeline
// ==========================================
function AnimationFour() {
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const playSequence = async () => {
      while (isMounted) {
        setPhase(0); await sleep(1000);
        setPhase(1); await sleep(1000);
        setPhase(2); await sleep(2000);
        setPhase(3); await sleep(3000);
      }
    };
    playSequence();
    return () => { isMounted = false; };
  }, []);

  const steps = [
    { id: "QUEUED", label: "Queued", time: "Commit 8f2b1a", isActive: phase >= 1, isLoading: false },
    { id: "BUILDING", label: "Building", time: "Resolving deps...", isActive: phase >= 2, isLoading: phase === 2 },
    { id: "DEPLOYED", label: "Deployed", time: "Live on production", isActive: phase === 3, isLoading: false },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-[220px]">
        <div className="flex flex-col">
          {steps.map((step, index) => {
            const isLineFilled = phase > index;
            const isCompleted = step.isActive && !step.isLoading;

            return (
              <div key={step.id} className="flex gap-x-5">
                <div className="flex flex-col items-center">
                  <div className="relative w-5 h-5 flex items-center justify-center z-10 shrink-0">
                    <AnimatePresence mode="popLayout">
                      {isCompleted && (
                        <motion.div key="completed" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} 
                          // Active success state matches theme accent
                          style={{ backgroundColor: "var(--color-accent)" }}
                          className="absolute inset-0 rounded-full flex items-center justify-center">
                          <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.1 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12" /></motion.svg>
                        </motion.div>
                      )}
                      {step.isLoading && (
                        <motion.div key="loading" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="absolute inset-0 flex items-center justify-center">
                          <motion.svg animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ color: "var(--color-accent)" }} className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></motion.svg>
                        </motion.div>
                      )}
                      {!step.isActive && (
                        <motion.div key="inactive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-background)" }}
                          className="absolute inset-0 border-[2px] rounded-full" />
                      )}
                    </AnimatePresence>
                  </div>
                  {index < steps.length - 1 && (
                    <div style={{ backgroundColor: "var(--color-border)" }} className="w-[2px] h-10 relative z-0 -my-1">
                      <motion.div animate={{ height: isLineFilled ? "100%" : "0%" }} transition={{ duration: index === 1 ? 0.15 : 0.6 }} 
                        style={{ backgroundColor: "var(--color-accent)" }}
                        className="w-full absolute top-0 left-0" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-full -mt-0.5 pb-3">
                  {/* CSS Variables for smooth dark mode transition */}
                  <motion.span animate={{ color: step.isActive ? "var(--color-foreground)" : "var(--color-muted-foreground)" }} className="font-semibold text-[15px] tracking-wide">
                    {step.label}
                  </motion.span>
                  <AnimatePresence>
                    {isCompleted && (
                      <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} exit={{ opacity: 0, transition: { duration: 0 } }} className="text-[11px] text-muted-foreground font-medium">
                        {step.time}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


// ==========================================
// ANIMATION 5: Dev Stack Emojis
// ==========================================
function AnimationFive() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="flex gap-2">
         {/* Web Dev Stack Representation */}
         {["⚛️", "⚡", "ʦ", "🍃"].map((emoji, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }} className="w-10 h-10 bg-secondary border border-border rounded-full flex items-center justify-center text-xl shadow-sm cursor-pointer select-none">
              {emoji}
            </motion.div>
         ))}
      </div>
    </div>
  );
}


// ==========================================
// MAIN BENTO GRID 
// ==========================================
function BentoGridOne() {
  const headingClasses = "text-xl font-bold text-foreground tracking-tight"
  const paragraphClasses = "text-[14px] leading-[1.4] text-muted-foreground font-medium"
  
  // Card styles ab theme ke bg-background aur border-border ko follow karenge
  const cardClasses = "relative overflow-hidden flex flex-col  p-6 rounded-[2rem] bg-background/50 border border-border shadow-sm hover:shadow-md transition-shadow"

  return (
    <main className="bg-secondary flex items-center justify-center p-6 rounded-4xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-275 md:auto-rows-[300px]">
        
        {/* Card 1: Intuitive */}
        <div className={cn(cardClasses, "md:row-span-2 pr-0 border  ")}>
          <div className="flex items-center justify-end w-full">
            <AnimationOne />
          </div>
          <div className="pr-6 mt-8 space-y-1.5">
            <h2 className={headingClasses}>Intuitive</h2>
            <p className={paragraphClasses}>Whether you&apos;re a solo dev or scaling an enterprise, deploying is a breeze.</p>
          </div>
        </div>

        {/* Card 2: Automated */}
        <div className={cn(cardClasses, "flex flex-col items-center justify-evenly")}>
          <div className="flex items-center justify-center">
            <AnimationTwo />
          </div>
          <div className="mt-4 space-y-1.5">
            <h2 className={headingClasses}>Automated</h2>
            <p className={paragraphClasses}>Zero-downtime builds and instant rollbacks.<br/>Security at every stage.</p>
          </div>
        </div>

        {/* Card 4: Pipeline */}
        <div className={cardClasses}>
          <div className="flex items-center justify-center mt-4">
            <AnimationFour />
          </div>
          <div className="mt-4 space-y-1.5">
            <h2 className={headingClasses}>Pipeline</h2>
            <p className={paragraphClasses}>Real-time observability.<br/>Track your CI/CD process instantly.</p>
          </div>
        </div>

        {/* Card 3: Compute */}
        <div className={cardClasses}>
          <div className="flex items-center justify-center">
            <AnimationThree />
          </div>
          <div className="mt-4 space-y-1.5">
            <h2 className={headingClasses}>Compute</h2>
            <p className={paragraphClasses}>Allocate the exact amount of<br/>power your full-stack app needs.</p>
          </div>
        </div>

        {/* Card 5: Ecosystem */}
        <div className={cardClasses}>
          <div className="flex items-center justify-center">
            <AnimationFive />
          </div>
          <div className="mt-4 space-y-1.5">
            <h2 className={headingClasses}>Ecosystem</h2>
            <p className={paragraphClasses}>Built for the modern web.<br/>Native support for your favorite stack.</p>
          </div>
        </div>

      </div>
    </main>
  )
}

export default BentoGridOne
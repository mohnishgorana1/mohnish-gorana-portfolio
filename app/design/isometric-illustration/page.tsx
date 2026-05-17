'use client'
import React from 'react'
import { motion } from 'motion/react'



const IsometricCube = ({ className, variant, isActive }: { className?: string, variant: "top" | "left" | "right", isActive?: boolean }) => {

  const TRANSITION: any = {
    type: 'spring' as string,
    stiffness: 500,
    damping: 30,
  }


  const getVariants = (face: "top" | "left" | "right") => {
    const isTargetFace = face === variant;

    return {
      initial: {
        translateX: 0,
        translateY: 0,
        stroke: "var(--color-neutral-400)" // Default Gray
      },
      animate: {
        translateX: isTargetFace ? (face === "left" ? -20 : face === "right" ? 20 : 0) : 0,
        translateY: isTargetFace && face === "top" ? -20 : 0,
        stroke: isTargetFace ? "var(--color-blue-400)" : "var(--color-neutral-400)" // Hover Blue
      }
    }
   
  }

  const strokeColor = isActive ? "var(--color-blue-400)" : "var(--color-neutral-400)";

  return (
    <motion.div whileHover="animate" initial="initial" className="p-4 border-4  rounded-lg mt-20 ">
      <motion.svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-96">
        {/* Top face */}
        <motion.path
          variants={getVariants("top")}
          transition={TRANSITION}
          d="M100 50 L150 75 L100 100 L50 75 Z"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinejoin="round"
          fill="var(--color-background)"
        />
        {/* Inner detail on Top Face */}
        <motion.path
          variants={getVariants("top")}
          transition={TRANSITION}
          d="M100 60 L135 77.5 L100 95 L65 77.5 Z" stroke={strokeColor} strokeWidth="3" strokeOpacity="0.5" />

        {/* Left Face - Ab ye Top face se bilkul juda hua hai */}
        <motion.path
          variants={getVariants("left")}
          transition={TRANSITION}
          d="M50 75 L100 100 L100 160 L50 135 Z"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinejoin="round"
          fill="var(--color-background)"
        />
        {/* Vertical Dashed Lines (Left) */}
        <motion.line variants={getVariants("left")} transition={TRANSITION} x1="62.5" y1="81.25" x2="62.5" y2="141.25" stroke="var(--color-neutral-400)" strokeWidth="3" strokeDasharray="4 4" strokeOpacity="0.3" />
        <motion.line variants={getVariants("left")} transition={TRANSITION} x1="75" y1="87.5" x2="75" y2="147.5" stroke="var(--color-neutral-400)" strokeWidth="3" strokeDasharray="4 4" strokeOpacity="0.3" />
        <motion.line variants={getVariants("left")} transition={TRANSITION} x1="87.5" y1="93.75" x2="87.5" y2="153.75" stroke="var(--color-neutral-400) " strokeWidth="3" strokeDasharray="4 4" strokeOpacity="0.3" />

        {/* Right Face - Jude hue version ke liye shared edges use kiye hain */}
        <motion.path
          variants={getVariants("right")}
          transition={TRANSITION}
          d="M150 75 L100 100 L100 160 L150 135 Z"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinejoin="round"
          fill="var(--color-background)"
        />
        {/* Vertical Dashed Lines (Right) */}
        <motion.line variants={getVariants("right")} transition={TRANSITION} x1="112.5" y1="93.75" x2="112.5" y2="153.75" stroke={strokeColor} strokeWidth="3" strokeDasharray="4 4" strokeOpacity="0.3" />
        <motion.line variants={getVariants("right")} transition={TRANSITION} x1="125" y1="87.5" x2="125" y2="147.5" stroke={strokeColor} strokeWidth="3" strokeDasharray="4 4" strokeOpacity="0.3" />
        <motion.line variants={getVariants("right")} transition={TRANSITION} x1="137.5" y1="81.25" x2="137.5" y2="141.25" stroke="var(--color-neutral-400)" strokeWidth="3" strokeDasharray="4 4" strokeOpacity="0.3" />
      </motion.svg>
    </motion.div>
  );
};




function IsometricIllustrationPage() {
  return (
    <main className='flex flex-col md:flex-row mx-auto items-center justify-center'>
      <IsometricCube variant='top' />
      <IsometricCube variant='left' />
      <IsometricCube variant='right' />

    </main>
  )
}

export default IsometricIllustrationPage
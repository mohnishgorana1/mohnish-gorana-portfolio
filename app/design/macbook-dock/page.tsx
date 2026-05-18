"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Home, User, Briefcase, FolderGit2, Mail, Terminal } from "lucide-react";

// Icons list for the dock
const DOCK_ITEMS = [
    { icon: <Home className="h-full w-full" />, label: "Home" },
    { icon: <User className="h-full w-full" />, label: "About" },
    { icon: <Briefcase className="h-full w-full" />, label: "Experience" },
    { icon: <FolderGit2 className="h-full w-full" />, label: "Projects" },
    { icon: <Terminal className="h-full w-full" />, label: "Skills" },
    { icon: <Mail className="h-full w-full" />, label: "Contact" },
];



function MacBookDockSimpleAnimation() {

    return (
        <main className=" ">
            <div className="rounded-3xl flex w-full items-center justify-center px-12 py-4">
                <div
                    className="mx-auto flex h-18 items-center gap-3 rounded-2xl bg-linear-to-br from-neutral-900/50 via-neutral-500/30 to-neutral-900/50 px-8 backdrop-blur-md">
                    {
                        DOCK_ITEMS.map((item, index) => {
                            const { label, icon } = item
                            return (
                                <motion.div
                                    initial={{ scale: 1, y: 0 }}
                                    whileHover={{ scale: 1.1, y: -10 }}
                                    key={index}
                                    className="w-10 h-10 relative group aspect-square rounded-xl bg-secondary text-foreground/80 hover:text-foreground hover:bg-secondary/50 flex items-center justify-center border border-neutral-700/ transition-colors cursor-pointer">
                                    {/* Tooltip Effect */}
                                    <span className="absolute -top-12 scale-0 group-hover:scale-100 transition-all duration-150 rounded bg-neutral-800 px-2 py-1 text-xs text-neutral-200 border border-neutral-700 whitespace-nowrap shadow-xl">
                                        {label}
                                    </span>

                                    {/* Icon wrapper to keep internal content centered */}
                                    <div className="flex h-3/5 w-3/5 items-center justify-center group-hover:">
                                        {icon}
                                    </div>

                                </motion.div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    );
}

function MackBookDockRealAnimation() {
    const mouseX = useMotionValue(Infinity);

    return (
        <main className="">
            <div className="rounded-3xl flex w-full items-center justify-center px-12 py-4">
                <motion.div
                    onMouseMove={(e) => mouseX.set(e.pageX)}
                    onMouseLeave={() => mouseX.set(Infinity)}
                    className="mx-auto flex h-18 items-center gap-3 rounded-2xl bg-linear-to-br from-neutral-900/50 via-neutral-500/30 to-neutral-900/50 px-8 backdrop-blur-md">
                    {
                        DOCK_ITEMS.map((item, index) => (
                            <DockIcon key={index} icon={item.icon} label={item.label} mouseX={mouseX} />
                        ))
                    }
                </motion.div>
            </div>
        </main>
    );
}

interface DockIconProps {
    icon: React.ReactNode;
    label: string;
    mouseX: MotionValue
}
function DockIcon({ icon, label, mouseX }: DockIconProps) {

    let ref = useRef<HTMLDivElement>(null);

    // mouse or icon ke bich ka distacnce calculate
    let distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        // icon ke center se mouse ki doori
        return val - bounds.x - bounds.width / 2;
    })

    // 2 distance ke basis pr width to transform krna
    // agar distance -150 se 150px ke bich me hai to width 40px se 70px tak badha do
    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);


    // spring physics apply krna taki rigid feel na ho
    const width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 180,
        damping: 12
    })

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className="relative group aspect-square rounded-xl bg-secondary text-foreground/80 hover:text-foreground hover:bg-secondary/50 flex items-center justify-center border border-neutral-700/ transition-colors cursor-pointer">
            {/* Tooltip Effect */}
            <span className="absolute -top-12 scale-0 group-hover:scale-100 transition-all duration-150 rounded bg-neutral-800 px-2 py-1 text-xs text-neutral-200 border border-neutral-700 whitespace-nowrap shadow-xl">
                {label}
            </span>

            {/* Icon wrapper to keep internal content centered */}
            <div className="flex h-3/5 w-3/5 items-center justify-center">
                {icon}
            </div>

        </motion.div>
    );
}



export default function MacBookDesignIllustration() {

    return (
        <main className="w-full min-h-[85vh] flex items-center justify-center flex-col">
            <div className="w-full flex flex-col lg:flex-row items-center justify-center dark:shadow shadow-2xl border rounded-4xl divide-y lg:divide-y-0 lg:divide-x divide-neutral-500/40 dark:divide-neutral-800/50 bg-neutral-200/50 dark:bg-neutral-900/50">

                {/* Section 1: Simple Animation */}
                <section className="w-3/4 lg:w-1/2 flex items-center flex-col justify-center gap-5 py-8">
                    <h2 className="self-start lg:self-center text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                        Discrete State-Based Hover
                    </h2>
                    {/* description */}
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 text-start lg:max-w-sm">
                        A traditional UI micro-interaction where elements scale independently upon a discrete hover trigger. It lacks context awareness of the cursor&spos;s continuous position or surrounding items.
                    </p>
                    <MacBookDockSimpleAnimation />
                </section>

                {/* Section 2: Real Animation */}
                <section className="w-3/4 lg:w-1/2 flex items-center flex-col justify-center gap-5 py-8">
                    <h2 className="self-start lg:self-center text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                        Continuous Proximity Magnification
                    </h2>
                    {/* desctription */}
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 text-start lg:max-w-sm">
                        A true macOS-inspired fluid dock. It calculates real-time cursor distance relative to each icon&apos;s bounding rect, mapping proximity to element width using spring physics for zero re-renders and smooth 60fps performance.
                    </p>
                    <MackBookDockRealAnimation />
                </section>

            </div>
        </main>
    );
}
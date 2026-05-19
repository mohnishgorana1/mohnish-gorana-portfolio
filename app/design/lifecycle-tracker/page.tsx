'use client'

import { cn } from "@/lib/utils";
import { CircleCheck, Dot, Loader2, Play } from "lucide-react";
import { useEffect, useState } from "react";

interface SandboxStep {
    id: string;
    name: string;
    durationCold: number;
    durationWarm?: number;
    isCachedOnWarm: boolean;
    hasLogs?: boolean;
}

const SANDBOX_EXECUTION_DATA = {
    nodeVersion: "agent-04",
    steps: [
        { id: "init-prompt", name: "Parse user intent", durationCold: 120, isCachedOnWarm: false },
        { id: "load-context", name: "Retrieve vector embeddings", durationCold: 950, durationWarm: 45, isCachedOnWarm: true },
        { id: "spawn-worker", name: "Initialize LangChain tools", durationCold: 380, isCachedOnWarm: false },
        { id: "query-llm", name: "Generate deep reasoning", durationCold: 2800, durationWarm: 450, isCachedOnWarm: true, hasLogs: true },
        { id: "format-out", name: "Format markdown response", durationCold: 150, isCachedOnWarm: false },
        { id: "cleanup", name: "Dump context memory", durationCold: 90, isCachedOnWarm: false },
    ] as SandboxStep[],
    terminalLogs: [
        "> User Query: 'Explain quantum routing'",
        "Searching knowledge base... [Vector ID: 0x9A2F]",
        "Found 3 relevant document chunks.",
        "Synthesizing response...",
        "✓ Output generated in 2.8s"
    ]
};

function Component() {
    const [status, setStatus] = useState<"Booting" | "Running" | "Done">("Booting");
    const [isWarm, setIsWarm] = useState<boolean>(false)
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
    const [stepStates, setStepStates] = useState<("idle" | "running" | "completed")[]>(
        new Array(SANDBOX_EXECUTION_DATA.steps.length).fill("idle")
    )

    const runSimulation = async (warmMode: boolean) => {
        setIsWarm(warmMode);
        setStatus("Booting");
        setCurrentStepIndex(0);
        setStepStates(new Array(SANDBOX_EXECUTION_DATA.steps.length).fill("idle"))

        for (let i = 0; i < SANDBOX_EXECUTION_DATA.steps.length; i++) {
            setCurrentStepIndex(i);
            setStepStates(prev => {
                const next = [...prev];
                next[i] = "running";
                return next;
            })

            if (SANDBOX_EXECUTION_DATA.steps[i].id === "execute-script") {
                setStatus("Running");
            }

            const step = SANDBOX_EXECUTION_DATA.steps[i];
            const currentDuration = (warmMode && step.isCachedOnWarm)
                ? (step.durationWarm ?? step.durationCold)
                : step.durationCold

            await new Promise((resolve) => setTimeout(resolve, currentDuration));

            setStepStates(prev => {
                const next = [...prev];
                next[i] = "completed";
                return next;
            })
        }
        setStatus("Done")
    }

    useEffect(() => {
        runSimulation(false);
    }, [])

    const progressWidth = `${((currentStepIndex + 1) / SANDBOX_EXECUTION_DATA.steps.length) * 100}%`;

    return (
        <div className={cn(
            "min-h-112.5 w-full max-w-md rounded-4xl px-4 py-6 flex flex-col justify-between gap-y-4 shadow-lg",
            "bg-neutral-50 dark:bg-neutral-950",
            "shadow-neutral-200 dark:shadow-neutral-900/50",
            "border border-neutral-200 dark:border-neutral-800"
        )}>
            <header className="px-2 flex items-center justify-between">
                <div className="flex items-center gap-4 py-2">
                    <h3 className="font-bold tracking-wide text-neutral-900 dark:text-neutral-100">
                        Sandbox
                    </h3>
                    <span className="text-xs font-medium px-2 py-1 rounded-4xl bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300">
                        {SANDBOX_EXECUTION_DATA.nodeVersion}
                    </span>
                    {isWarm && (
                        <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded">
                            WARM
                        </span>
                    )}
                </div>
                <div className={cn(
                    "font-medium flex items-center justify-center gap-0.5",
                    status === "Booting" && "text-amber-600 dark:text-amber-500",
                    status === "Running" && "text-blue-600 dark:text-blue-500",
                    status === "Done" && "text-emerald-600 dark:text-emerald-500"
                )}>
                    <span>{status}</span>
                    <Dot className="animate-pulse" />
                </div>
            </header>

            <div className="px-2 w-full">
                <div className="w-full rounded-full h-1 overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                    <div
                        className="bg-green-500 dark:bg-green-600 h-full transition-all duration-300 ease-out"
                        style={{ width: status === "Done" ? "100%" : progressWidth }}
                    />
                </div>
            </div>

            <div className="rounded-2xl py-4 px-1 flex flex-col gap-y-2 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800">
                {SANDBOX_EXECUTION_DATA.steps.map((step, index) => {
                    const state = stepStates[index];
                    const displayDuration = (isWarm && step.isCachedOnWarm) ? (step.durationWarm ?? step.durationCold) : step.durationCold;

                    return (
                        <div
                            key={step.id}
                            className={cn(
                                "flex items-center justify-between px-3 py-2 rounded-lg transition-all",
                                state === "idle" && "opacity-40",
                                state === "running" && "bg-neutral-200/60 dark:bg-neutral-800/60"
                            )}
                        >
                            <div className="flex items-center gap-x-3">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    {state === "completed" && <CircleCheck fill="#10b981" stroke="white" className="w-5 h-5 dark:stroke-neutral-950" />}
                                    {state === "running" && <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />}
                                    {state === "idle" && <div className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600" />}
                                </div>
                                <h1 className={cn(
                                    "text-sm",
                                    state === "running"
                                        ? "font-semibold text-neutral-900 dark:text-neutral-100"
                                        : "text-neutral-700 dark:text-neutral-300"
                                )}>
                                    {step.name}
                                </h1>
                            </div>

                            <div className="flex items-center gap-2">
                                {isWarm && step.isCachedOnWarm && state === "completed" && (
                                    <span className="text-[10px] font-bold px-1 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                                        cached
                                    </span>
                                )}
                                <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                                    {state === "completed" ? `${displayDuration}ms` : state === "running" ? "running" : ""}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className={cn(
                "p-4 font-mono text-xs rounded-xl transition-all border",
                "bg-neutral-900 text-neutral-200 border-neutral-800",
                currentStepIndex >= 4 ? "opacity-100" : "opacity-0 h-0 p-0 overflow-hidden border-none"
            )}>
                {SANDBOX_EXECUTION_DATA.terminalLogs.map((line, idx) => (
                    <p key={idx} className={cn(
                        "py-0.5",
                        line.startsWith("✓") && "text-emerald-400",
                        line.startsWith("$") && "text-neutral-400"
                    )}>
                        {line}
                    </p>
                ))}
            </div>

            <footer className="flex items-center justify-between text-xs mt-2 px-2 text-neutral-500 dark:text-neutral-400">
                <span>
                    {status === "Done" ? `Finished in ${isWarm ? "1.23s" : "4.51s"}` : "Executing pipeline..."}
                </span>
                {status === "Done" && (
                    <button
                        onClick={() => runSimulation(!isWarm)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer shadow-sm hover:opacity-90 active:scale-95 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                    >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Re-run ({isWarm ? "cold" : "warm"})</span>
                    </button>
                )}
            </footer>
        </div>
    )
}

export default function LifecycleTracker() {
    return (
        <main className="mt-12 w-full min-h-[75vh] flex flex-col gap-5 md:gap-5 px-4">
            <div className="w-full text-center text-xl lg:text-3xl font-semibold text-neutral-800 dark:text-neutral-200">
                Life Cycle Tracker
            </div>
            <div className="w-full flex-1 flex items-center justify-center p-8">
                <Component />
            </div>
        </main>
    )
}
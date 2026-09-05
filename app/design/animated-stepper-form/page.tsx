'use client'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { BsDash } from 'react-icons/bs'
import { SiGooglegemini } from 'react-icons/si'
import { ArrowRight } from 'lucide-react'
import { cn } from "@/lib/utils"

const formData = [
    {
        id: 0,
        label: "Name your agent",
        type: "input",
        stateKey: "agentName",
        placeholder: "Competitor analysis",
        isRequired: true,
    },
    {
        id: 1,
        label: "Describe what it does",
        type: "textarea",
        stateKey: "description",
        placeholder: "Summarize papers, track competitors...",
        isRequired: true,
    },
    {
        id: 2,
        label: "Pick its tools",
        type: "checkbox",
        stateKey: "tools",
        options: ["Web Search", "Code Interpreter", "Read Files", "Github", "Slack"],
        isRequired: false,
    },
    {
        id: 3,
        label: "Choose a model",
        type: "radio",
        stateKey: "model",
        options: [
            { name: "Fast", description: "Quick Replies, simple tasks" },
            { name: "Balanced", description: "Most use cases" },
            { name: "Powerful", description: "Complex reasoning" },
        ],
        isLast: true,
        isRequired: true,
    },
]

export default function AnimatedStepperFormPage() {
    // 1. Data and Progress States
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [formValues, setFormValues] = useState<Record<string, any>>({
        agentName: "",
        description: "",
        tools: [],
        model: ""
    });

    // 2. Handlers
    const handleNext = () => {
        if (currentStep === formData.length - 1) {
            setIsSubmitted(true);
            console.log("Final Data:", formValues);
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleUpdateValue = (key: string, value: any) => {
        setFormValues(prev => ({ ...prev, [key]: value }));
    };

    const handleToggleTool = (tool: string) => {
        const currentTools = formValues.tools as string[];
        if (currentTools.includes(tool)) {
            handleUpdateValue("tools", currentTools.filter(t => t !== tool))  // remove tool
        } else {
            handleUpdateValue("tools", [...currentTools, tool]) // add tool
        }
    }

    const handleReset = () => {
        setIsSubmitted(false);
        setCurrentStep(0);
        setFormValues({ agentName: "", description: "", tools: [], model: "" });
    };

    // 🔥 VALIDATION LOGIC
    const activeStepData = formData.find(s => s.id === currentStep);
    const canContinue = activeStepData?.isRequired
        ? (Array.isArray(formValues[activeStepData.stateKey])
            ? formValues[activeStepData.stateKey].length > 0
            : String(formValues[activeStepData.stateKey]).trim().length > 0)
        : true;

    // Standard smooth spring transition
    const springTransition = { type: "spring", bounce: 0.1, duration: 0.8 };

    return (
        <main className='mt-12 w-full min-h-[85vh] flex items-center justify-center p-4'>
            <div className="w-full flex items-center justify-center">

                {/* Main Outer Card - Added `layout` */}
                <motion.div 
                    layout 
                    transition={springTransition}
                    className="w-full max-w-[320px] bg-neutral-200 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-3 shadow-sm shadow-neutral-300/50 dark:shadow-neutral-200/20 overflow-hidden"
                >
                    <motion.header layout transition={springTransition} className='flex items-center justify-between px-4 py-3 mb-1
                    
                    
                    
                    '>
                        <h1 className='font-bold text-neutral-800 dark:text-neutral-200 text-lg'>New agent</h1>
                        <BsDash className='cursor-pointer text-neutral-500 hover:text-neutral-800' size={24} />
                    </motion.header>

                    <AnimatePresence mode="wait" initial={false}>
                        {!isSubmitted ? (
                            <motion.div 
                                key="form"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={springTransition}
                                className="flex flex-col gap-y-1"
                            >
                                {formData.map((step) => {
                                    const isActive = currentStep === step.id;
                                    const isPast = currentStep > step.id;

                                    return (
                                        <motion.div layout transition={springTransition} key={step.id} className="w-full">
                                            <AnimatePresence mode="popLayout" initial={false}>
                                                
                                                {/* ACTIVE STATE (Expanded White Card) */}
                                                {isActive && (
                                                    <motion.div 
                                                        key={`active-${step.id}`}
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                                        exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                                                        transition={springTransition}
                                                        className="bg-white dark:bg-neutral-950 p-4 rounded-3xl shadow-sm border border-neutral-100 dark:border-neutral-800 flex flex-col gap-4 origin-top"
                                                    >
                                                        <motion.h2 layout className="font-medium text-[15px] text-neutral-900 dark:text-neutral-100">
                                                            {step.label}
                                                        </motion.h2>

                                                        {step.type === "input" && (
                                                            <motion.input
                                                                layout
                                                                autoFocus
                                                                type="text"
                                                                placeholder={step.placeholder}
                                                                value={formValues[step.stateKey]}
                                                                onChange={(e) => handleUpdateValue(step.stateKey, e.target.value)}
                                                                className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 transition-all"
                                                            />
                                                        )}

                                                        {step.type === "textarea" && (
                                                            <motion.textarea
                                                                layout
                                                                autoFocus
                                                                rows={3}
                                                                placeholder={step.placeholder}
                                                                value={formValues[step.stateKey]}
                                                                onChange={(e) => handleUpdateValue(step.stateKey, e.target.value)}
                                                                className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 transition-all resize-none"
                                                            />
                                                        )}

                                                        {step.type === "checkbox" && (
                                                            <motion.div layout className="flex flex-col gap-y-3 mt-1">
                                                                {step.options?.map((option) => {
                                                                    const isSelected = formValues[step.stateKey].includes(option);
                                                                    return (
                                                                        <div key={option as string} className="flex items-center justify-between">
                                                                            <span className='text-sm text-neutral-700 dark:text-neutral-300'>{option as string}</span>
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleToggleTool(option as string)}
                                                                                className={cn(
                                                                                    "relative flex items-center w-10 h-6 rounded-full transition-colors duration-300 ease-in-out cursor-pointer",
                                                                                    isSelected ? "bg-green-500" : "bg-neutral-200 dark:bg-neutral-700"
                                                                                )}
                                                                            >
                                                                                <span
                                                                                    className={cn(
                                                                                        "absolute left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out shadow-sm",
                                                                                        isSelected ? "translate-x-4" : "translate-x-0"
                                                                                    )}
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </motion.div>
                                                        )}

                                                        {step.type === "radio" && (
                                                            <motion.div layout className="flex flex-col gap-y-2">
                                                                {step.options?.map((option: any) => {
                                                                    const isSelected = formValues[step.stateKey] === option.name;
                                                                    return (
                                                                        <div
                                                                            key={option.name}
                                                                            onClick={() => handleUpdateValue(step.stateKey, option.name)}
                                                                            className={cn(
                                                                                "relative flex flex-col p-3 rounded-xl border cursor-pointer transition-all duration-200 ease-in-out",
                                                                                isSelected
                                                                                    ? "border-green-500 dark:border-green-500/30" : "bg-neutral-200/50 hover:bg-neutral-300 border border-neutral-200 hover:border-neutral-400/50 dark:bg-neutral-900/50  dark:hover:bg-neutral-900 dark:border-neutral-800 dark:hover:border-neutral-700"
                                                                            )}
                                                                        >
                                                                            <div className="flex justify-between items-center">
                                                                                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                                                                                    {option.name}
                                                                                </span>
                                                                                <div className={cn(
                                                                                    "w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                                                                                    isSelected ? "border-green-700 dark:border-green-900" : "border-neutral-300 dark:border-neutral-600"
                                                                                )}>
                                                                                    {isSelected && <motion.div layoutId="radio-dot" className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-500" />}
                                                                                </div>
                                                                            </div>
                                                                            <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 pr-6">
                                                                                {option.description}
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </motion.div>
                                                        )}

                                                        <motion.button
                                                            layout
                                                            onClick={handleNext}
                                                            disabled={!canContinue}
                                                            className={cn(
                                                                "mt-2 self-start flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                                                                canContinue
                                                                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:scale-105 active:scale-95 cursor-pointer"
                                                                    : "bg-neutral-300 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-600 cursor-not-allowed opacity-70"
                                                            )}
                                                        >
                                                            {step.isLast ? "Complete Setup" : "Continue"} <ArrowRight size={14} />
                                                        </motion.button>
                                                    </motion.div>
                                                )}

                                                {/* INACTIVE STATE (Collapsed Text) */}
                                                {!isActive && (
                                                    <motion.div
                                                        key={`inactive-${step.id}`}
                                                        layout
                                                        initial={{ opacity: 0, filter: "blur(4px)" }}
                                                        animate={{ opacity: 1, filter: "blur(0px)" }}
                                                        exit={{ opacity: 0, filter: "blur(4px)" }}
                                                        transition={springTransition}
                                                        onClick={() => isPast && setCurrentStep(step.id)}
                                                        className={cn(
                                                            "px-4 py-2 text-[15px] transition-colors font-medium",
                                                            isPast ? "text-neutral-800 dark:text-neutral-300 cursor-pointer hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 rounded-lg" : "text-neutral-500 dark:text-neutral-600 cursor-default"
                                                        )}
                                                    >
                                                        {step.label}
                                                    </motion.div>
                                                )}

                                            </AnimatePresence>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        ) : (
                            // SUCCESS SCREEN
                            <motion.div 
                                key="success"
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={springTransition}
                                className='flex flex-col gap-y-3 items-start bg-white dark:bg-neutral-950 rounded-3xl px-5 py-5 shadow-sm border border-neutral-100 dark:border-neutral-800'
                            >
                                <span className='p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/50'>
                                    <SiGooglegemini className='text-emerald-600 dark:text-emerald-400' size={20} />
                                </span>
                                <div className="space-y-1">
                                    <h1 className='font-bold text-lg text-neutral-900 dark:text-neutral-100'>Your agent is ready</h1>
                                    <p className='text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed'>
                                        <strong className="text-neutral-800 dark:text-neutral-200">{formValues.agentName || "Your agent"}</strong> is set up and ready to take on tasks.
                                    </p>
                                </div>
                                <button
                                    onClick={handleReset}
                                    className='mt-2 px-4 py-2 text-sm font-medium rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer'
                                >
                                    Start over
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    )
}
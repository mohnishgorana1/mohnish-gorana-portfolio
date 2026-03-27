// MultiStepProgressForm.tsx
"use client";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import {motion} from 'motion/react'
const FORM_STEPS = ["PERSONAL", "EDUCATION", "ADDRESS"] as const;
type FormStep = (typeof FORM_STEPS)[number];

function MultiStepProgressForm() {
  const [currentActiveForm, setCurrentActiveForm] =
    useState<FormStep>("PERSONAL");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNext = () => {
    const currentIndex = FORM_STEPS.indexOf(currentActiveForm);
    if (currentIndex < FORM_STEPS.length - 1) {
      setCurrentActiveForm(FORM_STEPS[currentIndex + 1]);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted successfully!");
    setIsSubmitted(true);
  };

  const isStepCompleted = (step: FormStep) => {
    const currentStepIndex = FORM_STEPS.indexOf(currentActiveForm);
    const stepIndex = FORM_STEPS.indexOf(step);
    return stepIndex < currentStepIndex;
  };

  const isStepActive = (step: FormStep) => {
    return step === currentActiveForm;
  };

  // Shared input field styling for light/dark mode
  const inputClass =
    "w-full rounded-xl px-4 py-3 bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 dark:focus:border-indigo-500 text-slate-700 dark:text-slate-200 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600";

  return (
    <main className="flex flex-col gap-y-8 w-full items-center p-4 pb-20">
      {/* --- FORM CONTENT SECTION ----- */}
      <section className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-t-4 border-b-4 border-y-indigo-500 dark:border-y-indigo-700 rounded-2xl shadow-2xl shadow-slate-500/50 dark:shadow-gray-950/50 p-6 sm:p-8 transition-all duration-500">
        {/* Step 1: Personal */}
        <div
          className={`${
            currentActiveForm !== "PERSONAL" && "hidden"
          } flex flex-col gap-y-5 animate-in slide-in-from-right-4 fade-in duration-300`}
        >
          <div className="mb-2">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Personal Info
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Let's get to know you
            </p>
          </div>

          <div className="space-y-4">
            <input type="text" placeholder="Full Name" className={inputClass} />
            <input
              type="email"
              placeholder="Email Address"
              className={inputClass}
            />
          </div>

          <button
            onClick={handleNext}
            className="mt-4 w-full sm:w-auto self-end bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl px-6 py-3 shadow-lg shadow-indigo-200 dark:shadow-indigo-900 transition-all active:scale-95"
          >
            Continue
          </button>
        </div>

        {/* Step 2: Education */}
        <div
          className={`${
            currentActiveForm !== "EDUCATION" && "hidden"
          } flex flex-col gap-y-5 animate-in slide-in-from-right-4 fade-in duration-300`}
        >
          <div className="mb-2">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Education
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Tell us about your academics
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Highest Qualification"
              className={inputClass}
            />
            <input
              type="text"
              placeholder="University / Institute Name"
              className={inputClass}
            />
          </div>

          <button
            onClick={handleNext}
            className="mt-4 w-full sm:w-auto self-end bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl px-6 py-3 shadow-lg shadow-indigo-200 dark:shadow-indigo-900 transition-all active:scale-95"
          >
            Continue
          </button>
        </div>

        {/* Step 3: Address */}
        <div
          className={`${
            currentActiveForm !== "ADDRESS" && "hidden"
          } flex flex-col gap-y-5 animate-in slide-in-from-right-4 fade-in duration-300`}
        >
          <div className="mb-2">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Location
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              Where can we find you?
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="City / District"
              className={inputClass}
            />
            <input
              type="text"
              placeholder="State / Province"
              className={inputClass}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className={`mt-4 w-full rounded-xl font-semibold px-6 py-3 flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95
              ${
                isSubmitted
                  ? "bg-emerald-500 text-white cursor-default shadow-emerald-200 dark:shadow-emerald-900"
                  : "bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white shadow-indigo-200 dark:shadow-indigo-900"
              }`}
          >
            {isSubmitted ? (
              <>
                <FaCheck className="h-4 w-4" />
                <span>Submitted</span>
              </>
            ) : (
              <span>Complete Registration</span>
            )}
          </button>
        </div>
      </section>

      {/* PROGRESS INDICATOR SECTION */}
      <section className="w-[90vw] sm:w-[60vw] lg:w-[40vw]">
        <div className="flex w-full items-center justify-between px-4 sm:px-10">
          {FORM_STEPS.map((step, index) => {
            const isCompleted = isStepCompleted(step) || isSubmitted;
            const isActive = isStepActive(step) && !isSubmitted;

            return (
              <React.Fragment key={step}>
                {/* Connector Line */}
                {index > 0 && (
                  <div
                    className={`flex-1 mx-2 sm:mx-4 h-1 rounded-full transition-colors duration-500 ease-in-out ${
                      isCompleted
                        ? "bg-indigo-500"
                        : "bg-slate-200 dark:bg-gray-700"
                    }`}
                  ></div>
                )}

                {/* Step Circle */}
                <div className="flex flex-col items-center gap-2 relative group">
                  <div
                    className={`
                        rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center 
                        text-sm font-bold transition-all duration-500 shrink-0 z-10
                        ${
                          isCompleted
                            ? "bg-indigo-500 text-white shadow-lg shadow-indigo-300 dark:shadow-indigo-900 scale-105"
                            : isActive
                            ? "bg-white dark:bg-gray-800 border-4 border-indigo-100 dark:border-indigo-900 text-indigo-600 ring-2 ring-indigo-500 dark:ring-indigo-700 shadow-md"
                            : "bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-slate-500 dark:text-slate-400"
                        }
                    `}
                  >
                    {isCompleted ? (
                      <FaCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`hidden sm:block absolute -bottom-6 text-[10px] font-bold tracking-wider
                        ${
                          isActive || isCompleted
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-slate-500 dark:text-slate-500"
                        }
                    `}
                  >
                    {step}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* Success Toast Animation */}
      {!isSubmitted && (
        <motion.div 
        initial={{
          opacity: 0,
          scale: 0
        }}
        animate={{
          opacity: 1,
          scale: 1.2
        }}
        transition={{
          duration: 0.5
        }}
        className="fixed bottom-10 ">
          <div className="px-6 py-3 rounded-full bg-emerald-500 text-white text-sm font-semibold shadow-2xl shadow-emerald-200 dark:shadow-emerald-900 flex items-center gap-2 backdrop-blur-md">
            <div className="bg-white/20 rounded-full p-1">
              <FaCheck size={10} />
            </div>
            Registration Successful!
          </div>
        </motion.div>
      )}
    </main>
  );
}

export default MultiStepProgressForm;

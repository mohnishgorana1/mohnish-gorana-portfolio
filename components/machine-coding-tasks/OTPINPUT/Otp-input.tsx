"use client";
import React, { useEffect, useRef, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { TbReload } from "react-icons/tb";

function OTPINPUT({ OTP_DIGITS_COUNT }: { OTP_DIGITS_COUNT: number }) {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(OTP_DIGITS_COUNT).fill(""));
  const [submittedOtp, setSubmittedOtp] = useState<string | null>(null);

  const [hasStarted, setHasStarted] = useState(false);

  const resetFields = () => {
    setOtp(Array(OTP_DIGITS_COUNT).fill(""));
    setHasStarted(false); // reset ke baad dobara manual start required
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleChange = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return; // sirf number allow

    if (!hasStarted) setHasStarted(true); // 👈 pehli baar input me entry hui

    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    if (value && idx < OTP_DIGITS_COUNT - 1) {
      inputRefs.current[idx + 1]?.focus();
    }

    // auto-submit if last filled
    if (idx === OTP_DIGITS_COUNT - 1) {
      const otpValue = newOtp.join("");
      if (!newOtp.includes("")) {
        setSubmittedOtp(otpValue);
        resetFields();
      }
    }
  };

  // find the first empty index → only that input should be enabled
  const activeIndex = otp.findIndex((digit) => digit === "");
  const currentActive = activeIndex === -1 ? OTP_DIGITS_COUNT - 1 : activeIndex;

  // Reset OTP state whenever OTP_DIGITS_COUNT changes
  useEffect(() => {
    setOtp(Array(OTP_DIGITS_COUNT).fill(""));
    setHasStarted(false);
    setSubmittedOtp(null);
    inputRefs.current = [];
  }, [OTP_DIGITS_COUNT]);

  // sirf tab focus karo jab user start kar chuka hai
  useEffect(() => {
    if (hasStarted) {
      inputRefs.current[currentActive]?.focus();
    }
  }, [currentActive, hasStarted]);

  return (
    <main className="min-h-[300px] grid md:grid-cols-2 gap-6">
      {/* Input Section */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/60 dark:border-gray-700/60 rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-100">
            Validate OTP
          </h3>
          <p className="text-slate-400 dark:text-slate-500 text-base mt-3 font-medium uppercase tracking-wide">
            Enter the code sent to you
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: OTP_DIGITS_COUNT }).map((_, idx) => (
            <input
              type="text"
              key={idx}
              maxLength={1}
              value={otp[idx]}
              readOnly={idx !== currentActive}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(element) => {
                if (element) {
                  inputRefs.current[idx] = element;
                }
              }}
              className={`
                w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-xl border-2 transition-all duration-200 ease-out shadow-sm
                ${
                  idx === currentActive
                    ? "border-blue-400 dark:border-blue-500 bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 ring-4 ring-blue-100 dark:ring-blue-900 scale-105 z-10 shadow-blue-200/50 dark:shadow-blue-900/50"
                    : "border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-900 text-slate-900 dark:text-gray-500 opacity-60 cursor-not-allowed hover:border-slate-300 dark:hover:border-gray-500"
                }
                focus:outline-none
              `}
            />
          ))}
        </div>

        <button
          onClick={() => {
            setSubmittedOtp(null);
            resetFields();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-600 dark:text-slate-200 text-sm font-semibold transition-all duration-200 border border-slate-300 dark:border-gray-600 ring-2 ring-blue-200/50 dark:ring-blue-900/50 ease-linear hover:ring-blue-400 dark:hover:ring-blue-500 hover:shadow-sm"
        >
          <TbReload className={hasStarted ? "animate-spin-slow" : ""} />
          Reset OTP
        </button>
      </div>

      {/* Result Section */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-gray-900 dark:to-gray-800/50 backdrop-blur-md border border-white/60 dark:border-gray-700/60 rounded-2xl shadow-inner p-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-widest mb-4">
          Status Monitor
        </h2>

        {submittedOtp ? (
          <div className="animate-in zoom-in fade-in duration-300 flex flex-col items-center">
            <BsCheckCircleFill className="text-5xl text-emerald-500 dark:text-emerald-400 mb-3 drop-shadow-sm" />
            <p className="text-slate-600 dark:text-slate-300 font-medium">
              Successfully Verified
            </p>
            <div className="mt-4 bg-white dark:bg-gray-700 border border-emerald-100 dark:border-emerald-900 rounded-xl px-6 py-3 shadow-sm shadow-emerald-100/50 dark:shadow-emerald-900/50">
              <span className="text-xs text-slate-400 dark:text-slate-500 block mb-1">
                Last Submitted Code
              </span>
              <span className="font-mono text-3xl font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
                {submittedOtp}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center opacity-40">
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-gray-700 mb-4 animate-pulse"></div>
            <p className="text-slate-400 dark:text-slate-500 font-medium">
              Waiting for input...
            </p>
            <div className="mt-4 h-16 w-48 bg-slate-200/50 dark:bg-gray-700/50 rounded-xl border border-slate-200 dark:border-gray-700 border-dashed"></div>
          </div>
        )}
      </div>
    </main>
  );
}

export default OTPINPUT;
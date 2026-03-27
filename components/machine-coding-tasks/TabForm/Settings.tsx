// Settings.tsx
import React from "react";
import { BsMoonStarsFill, BsSunFill, BsCheckCircleFill } from "react-icons/bs";

function Settings({ data, setData }: any) {
  const { theme } = data;

  const handleDataChange = (val: string) => {
    setData((prev: any) => ({ ...prev, theme: val }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Preferences
        </h2>
        <p className="text-sm text-slate-400">Customize your app experience.</p>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Light Theme Option */}
          <div
            onClick={() => handleDataChange("light")}
            className={`cursor-pointer rounded-2xl p-4 border-2 flex items-center gap-4 transition-all relative overflow-hidden
                    ${
                      theme === "light"
                        ? "bg-white dark:bg-slate-700 border-amber-400 shadow-md"
                        : "bg-slate-50 dark:bg-slate-800 border-transparent opacity-60 hover:opacity-100"
                    }
                `}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                theme === "light"
                  ? "bg-amber-100 text-amber-500 dark:bg-amber-900 dark:text-amber-300"
                  : "bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-400"
              }`}
            >
              <BsSunFill />
            </div>
            <div>
              <h3 className="font-bold text-slate-700 dark:text-slate-100">
                Light Mode
              </h3>
              <p className="text-xs text-slate-400">Default bright look</p>
            </div>
            {theme === "light" && (
              <div className="absolute top-3 right-3 text-amber-500 animate-in zoom-in dark:text-amber-400">
                <BsCheckCircleFill />
              </div>
            )}
          </div>

          {/* Dark Theme Option */}
          <div
            onClick={() => handleDataChange("dark")}
            className={`cursor-pointer rounded-2xl p-4 border-2 flex items-center gap-4 transition-all relative overflow-hidden
                    ${
                      theme === "dark"
                        ? "bg-slate-800 border-indigo-500 shadow-md"
                        : "bg-slate-50 dark:bg-slate-800 border-transparent opacity-60 hover:opacity-100"
                    }
                `}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                theme === "dark"
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-400"
              }`}
            >
              <BsMoonStarsFill />
            </div>
            <div>
              <h3
                className={`font-bold ${
                  theme === "dark"
                    ? "text-white"
                    : "text-slate-700 dark:text-slate-100"
                }`}
              >
                Dark Mode
              </h3>
              <p
                className={`text-xs ${
                  theme === "dark" ? "text-slate-400" : "text-slate-400"
                }`}
              >
                Easy on the eyes
              </p>
            </div>
            {theme === "dark" && (
              <div className="absolute top-3 right-3 text-indigo-400 animate-in zoom-in">
                <BsCheckCircleFill />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Settings;

// Interests.tsx
import React from "react";
import { BsCheckLg } from "react-icons/bs";

function Interests({ data, setData }: any) {
  const { interests } = data;
  const interestsToRender = [
    "music",
    "dance",
    "cricket",
    "travel",
    "boxing",
    "farming",
    "coding",
    "reading",
    "gaming",
  ];

  const handleDataChange = (e: any, name: string) => {
    setData((prevData: any) => ({
      ...prevData,
      interests: e.target.checked
        ? [...prevData.interests, name]
        : prevData.interests.filter((i: any) => i !== name),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Interests
        </h2>
        <p className="text-sm text-slate-400">Select all topics you enjoy.</p>
      </div>

      <form className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {interestsToRender.map((interest: string, idx: number) => {
          const isChecked = data.interests.includes(interest);

          return (
            <label
              key={idx}
              className={`
                cursor-pointer group relative flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border-2 transition-all duration-200
                ${
                  isChecked
                    ? // Checked state
                      "bg-indigo-50 dark:bg-indigo-900 border-indigo-500 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 shadow-inner"
                    : // Unchecked state
                      "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-indigo-100 dark:hover:border-indigo-700 hover:shadow-md hover:-translate-y-0.5"
                }
              `}
            >
              <input
                type="checkbox"
                className="hidden"
                onChange={(e) => handleDataChange(e, interest)}
                checked={isChecked}
                name={interest}
              />

              {isChecked && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full animate-in zoom-in"></div>
              )}

              <span className="capitalize font-bold text-sm">{interest}</span>
            </label>
          );
        })}
      </form>
    </div>
  );
}

export default Interests;

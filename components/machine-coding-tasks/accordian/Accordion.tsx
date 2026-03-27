// Accordion.tsx
"use client";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { BsQuestionCircleFill } from "react-icons/bs";

export const ACCORDIAN_DATA = [
  {
    id: 1,
    name: "HTML",
    content:
      "HTML (HyperText Markup Language) is the backbone of all web pages. It provides the structure of a webpage using a series of elements and tags. With HTML, you can define headings, paragraphs, links, images, lists, and forms. It is the first step in web development and works closely with CSS and JavaScript to create interactive, well-styled pages.",
  },
  {
    id: 2,
    name: "CSS",
    content:
      "CSS (Cascading Style Sheets) is used to style and visually enhance HTML elements. It controls the layout, colors, fonts, and spacing of your webpage. Modern CSS includes features like Flexbox, Grid, and animations that allow developers to build responsive and dynamic designs without relying heavily on JavaScript. It helps bring a polished, professional look to websites.",
  },
  {
    id: 3,
    name: "JavaScript",
    content:
      "JavaScript is a powerful scripting language that brings interactivity to web pages. It allows you to respond to user actions, manipulate the DOM, fetch data from APIs, and build complex functionalities like sliders, modals, and games. With ES6 and beyond, JavaScript has evolved into a robust language used not just for frontend development but also on the server side through Node.js.",
  },
  {
    id: 4,
    name: "React",
    content:
      "React is a popular JavaScript library for building fast, component-based user interfaces. Developed by Meta, it uses a virtual DOM to efficiently update and render components. React encourages reusable UI elements, making development faster and more organized. It integrates well with tools like Next.js and frameworks for state management such as Redux or Zustand.",
  },
  {
    id: 5,
    name: "Node.js",
    content:
      "Node.js is a runtime environment that allows JavaScript to run on the server. It is built on Chrome’s V8 engine and is widely used for creating scalable backend applications and APIs. With its non-blocking I/O model and event-driven architecture, Node.js enables efficient handling of multiple requests, making it ideal for real-time applications like chat apps and streaming services.",
  },
];

function Accordion() {
  const [currentOpenAccordian, setCurrentOpenAccordian] = useState<
    null | number
  >(null);

  const handleAccordian = (itemId: number) => {
    if (currentOpenAccordian === itemId) {
      setCurrentOpenAccordian(null);
      return;
    }
    setCurrentOpenAccordian(itemId);
  };

  return (
      <main className="relative overflow-hidden rounded-3xl border border-gray-300/60 dark:border-gray-700/60 bg-gray-400/40 dark:bg-gray-800/40 backdrop-blur-xl shadow-2xl shadow-blue-100/50 dark:shadow-blue-950/50 p-6 sm:p-8 transition-all">
        {/* Blur gradients adjusted for dark mode visibility */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/30  dark:bg-blue-500/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-400/30 dark:bg-fuchsia-300/20  rounded-full blur-3xl pointer-events-none"></div>

        {/* Header section adjusted for dark mode */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200/60 dark:border-slate-700/60 pb-4 relative z-10">
          <BsQuestionCircleFill className="text-blue-500 text-xl" />
          <h2 className="font-bold text-slate-700 dark:text-slate-100">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-3 relative z-10">
          {ACCORDIAN_DATA.map((item) => {
            const isOpen = currentOpenAccordian === item.id;
            return (
              <div
                key={item.id}
                className={`
                    group rounded-2xl border transition-all duration-300 overflow-hidden
                    ${
                      isOpen
                        // Open state styles for dark mode
                        ? "bg-blue-100/20 dark:bg-blue-900/40 border-blue-200 dark:border-blue-800 shadow-md shadow-blue-50 dark:shadow-blue-950"
                        // Closed state styles for dark mode
                        : "bg-white/50 dark:bg-gray-800/50 border-white/60 dark:border-gray-700/60 hover:bg-blue-200/25 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm"
                    }
                `}
              >
                {/* Header */}
                <button
                  className="w-full p-4 sm:px-6 flex items-center justify-between cursor-pointer text-left focus:outline-none"
                  onClick={() => handleAccordian(item.id)}
                >
                  <span
                    className={`font-bold text-sm sm:text-base transition-colors ${
                      isOpen
                        ? "text-blue-700 dark:text-blue-400"
                        : "text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    }`}
                  >
                    {item.name}
                  </span>

                  <div
                    className={`
                    p-2 rounded-full transition-all duration-300 
                    ${
                      isOpen
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rotate-180"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-800 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                    }
                  `}
                  >
                    <FaChevronDown className="text-xs" />
                  </div>
                </button>

                {/* Body (Animated with Grid) */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-5 pt-1">
                      {/* Divider line adjusted for dark mode */}
                      <div className="h-px w-full bg-gradient-to-r from-blue-100 to-transparent mb-3 dark:from-blue-900"></div>
                      {/* Content text adjusted for dark mode */}
                      <p className="text-sm text-slate-500 dark:text-slate-300 font-medium leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
  );
}

export default Accordion;
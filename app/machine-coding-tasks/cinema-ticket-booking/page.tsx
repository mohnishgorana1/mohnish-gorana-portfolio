import CinemaTicketBooking from "@/components/machine-coding-tasks/cinema-ticket-booking/CinemaTicketBooking";
import React from "react";

export default function CinemaTicketBookingPage() {
  return (
    <main className="min-h-screen w-full py-8 bg-background">
      <article className="space-y-3 max-w-6xl mx-auto mb-8 ">
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          This project simulates an interactive{" "}
          <strong className="text-indigo-600 dark:text-indigo-400">
            Cinema Seat Booking System
          </strong>{" "}
          built using <strong>React</strong> and <strong>Tailwind CSS</strong>.{" "}
          <br />
          It allows users to select, view, and book seats dynamically.
        </p>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          👉 Explore the full source code here:{" "}
          <a
            href="https://github.com/mohnishgorana1/my-portfolio/tree/master/components/machine-coding-tasks/cinema-ticket-booking"
            target="_blank"
            rel="noopener noreferrer"
            // Updated: Link color for dark mode
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline decoration-blue-300 dark:decoration-blue-600 underline-offset-4 transition-colors"
          >
            GitHub Link
          </a>
        </p>

        <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium border border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-900">
          ⚡ Note: All seat data and states are managed locally. No external
          libs.
        </span>
      </article>

      <section className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl border border-white/60 dark:border-gray-700/60 bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl shadow-xl shadow-indigo-100/50 dark:shadow-gray-900/70 p-1 sm:p-6">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-300/20 dark:bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-300/20 dark:bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <article className="relative z-10 text-center mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center justify-center gap-2">
            <span>🎟️</span> Interactive Cinema Seat Layout
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Choose seats from Regular, Premium, or VIP. Prices update
            automatically.
          </p>
        </article>

        <div className="relative z-10">
          <CinemaTicketBooking />
        </div>
      </section>
    </main>
  );
}

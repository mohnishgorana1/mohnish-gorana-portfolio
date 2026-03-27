"use client";
import React, { useEffect, useState } from "react";

const TICKET_TYPE = [
  {
    type: "Regular",
    price: "150",
    color: "border border-blue-900 dark:border-blue-400",
  },
  {
    type: "Premium",
    price: "250",
    color: "border border-purple-900 dark:border-purple-400",
  },
  {
    type: "VIP",
    price: "350",
    color: "border border-yellow-900 dark:border-yellow-400",
  },
  {
    type: "Selected",
    color: "bg-green-500", // Selected remains bright green
  },
  {
    type: "Booked",
    color: "bg-neutral-600 dark:bg-neutral-700", // Slightly darker booked color
  },
];
const TOTAL_ROWS = 8; // A-H
const SEATS_PER_ROW = 12;
const PRE_BOOKED_SEATS = ["A1", "H10", "H11", "F6", "F7", "C5", "D9", "D10"];

// Utility functions
const findRowType = (rowIndex: number) => {
  if (rowIndex <= 2) return "Regular"; // A–C
  if (rowIndex <= 4) return "Premium"; // D–E
  return "VIP"; // F–H
};
const findSeatPrice = (rowIndex: number) => {
  if (rowIndex <= 2) return 150;
  if (rowIndex <= 4) return 250;
  return 350;
};

// Updated: Adjust colors for dark mode visibility
const findRowColor = (
  rowIndex: number,
  isBooked: boolean,
  isSelected: boolean
) => {
  if (isSelected) {
    return { bgColor: "bg-green-500", textColor: "text-white" };
  }
  if (rowIndex <= 2)
    return {
      // Regular (Blue)
      bgColor: isBooked
        ? "bg-neutral-600 dark:bg-neutral-700"
        : "border border-blue-900 dark:border-blue-400",
      textColor: isBooked
        ? "text-neutral-100"
        : "text-blue-500/50 dark:text-blue-400/80",
    };
  if (rowIndex <= 5)
    return {
      // Premium (Purple)
      bgColor: isBooked
        ? "bg-neutral-600 dark:bg-neutral-700"
        : "border border-purple-900 dark:border-purple-400",
      textColor: isBooked
        ? "text-neutral-100"
        : "text-purple-500/50 dark:text-purple-400/80",
    };
  return {
    // VIP (Yellow/Gold)
    bgColor: isBooked
      ? "bg-neutral-600 dark:bg-neutral-700"
      : "border border-yellow-900 dark:border-yellow-400",
    textColor: isBooked
      ? "text-neutral-100"
      : "text-yellow-700/50 dark:text-yellow-400/80",
  };
};

const generateSeatLayout = () => {
  return Array.from({ length: TOTAL_ROWS }, (_, i) => {
    const rowLetter = String.fromCharCode(65 + i);
    return {
      row: rowLetter,
      type: findRowType(i),
      price: findSeatPrice(i),
      seats: Array.from({ length: SEATS_PER_ROW }, (_, j) => {
        const seatLabel = `${rowLetter}${j + 1}`;
        const isBooked = PRE_BOOKED_SEATS.includes(seatLabel);
        const { bgColor, textColor } = findRowColor(i, isBooked, false); // Pass isSelected=false initially
        return {
          seatNumber: j + 1,
          bgColor,
          textColor,
          isBooked,
          isSelected: false,
        };
      }),
    };
  });
};

function CinemaTicketBooking() {
  const [seatLayout, setSeatLayout] = useState(generateSeatLayout());
  // Fixed: Type for selectedSeats state
  const [selectedSeats, setSelectedSeats] = useState<
    Array<{
      row: string;
      seatNumber: number;
      type: string;
      price: number;
    }>
  >([]);

  const handleSeatSelection = (
    selectedSeatNumber: number,
    rowLetter: string
  ) => {
    setSeatLayout((prev) =>
      prev.map((rowItem) => {
        if (rowItem.row === rowLetter) {
          return {
            ...rowItem,
            seats: rowItem.seats.map((seat) => {
              if (seat.seatNumber === selectedSeatNumber && !seat.isBooked) {
                const newSelected = !seat.isSelected;
                const { bgColor, textColor } = findRowColor(
                  rowLetter.charCodeAt(0) - 65,
                  seat.isBooked,
                  newSelected
                );
                return { ...seat, isSelected: newSelected, bgColor, textColor };
              }
              return seat;
            }),
          };
        }
        return rowItem;
      })
    );
  };

  // Fixed: Dependency array to run when seatLayout changes
  useEffect(() => {
    // console.log(JSON.stringify(seatLayout)); // Remove for production
    const newSelectedSeats = seatLayout.flatMap((rowItem) =>
      rowItem.seats
        .filter((seat) => seat.isSelected)
        .map((seat) => ({
          row: rowItem.row,
          seatNumber: seat.seatNumber,
          type: rowItem.type,
          price: rowItem.price,
        }))
    );
    setSelectedSeats(newSelectedSeats);
  }, [seatLayout]); // Dependency on seatLayout state

  return (
    <main className="w-full flex flex-col items-center md:px-2">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        {/* Seats Section */}
        <section
          // Updated: Seat section container for dark mode
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-sm border border-white/50 dark:border-gray-700/50 px-2 py-6 sm:p-8 relative"
        >
          {/* Screen Visual */}
          <div className="mb-10 flex flex-col items-center perspective-1000">
            {/* Screen color update for dark mode */}
            <div className="h-4 w-3/4 sm:w-2/3 bg-gradient-to-b from-slate-300 to-slate-100 dark:from-slate-700 dark:to-slate-900 rounded-[50%] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] mb-4 transform rotate-x-12"></div>
            {/* Text color update for dark mode */}
            <h1 className="text-center uppercase tracking-[0.3em] text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-500">
              Screen this way
            </h1>
          </div>

          {/* Seat Grid */}
          <div className="flex flex-col items-center overflow-x-auto pb-4 no-scrollbar">
            {seatLayout.map((rowItem, idx) => {
              const { row, seats } = rowItem;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center py-1.5 min-w-max"
                >
                  <span
                    // Updated: Row letter color for dark mode
                    className="mr-4 sm:mr-8 text-sm sm:text-base font-bold text-slate-400 dark:text-slate-500 w-4"
                  >
                    {row}
                  </span>
                  <div className="flex gap-1.5 sm:gap-3">
                    {seats.map((seatItem) => {
                      const {
                        seatNumber,
                        isBooked,
                        isSelected,
                        bgColor,
                        textColor,
                      } = seatItem;
                      return (
                        <button
                          key={seatNumber}
                          disabled={isBooked}
                          className={` relative group flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11  rounded-t-lg rounded-b-md text-xs sm:text-sm font-bold  transition-all duration-200 ease-out border-2
  ${
    isBooked
      ? "opacity-50 cursor-not-allowed"
      : "hover:-translate-y-1 cursor-pointer"
  } 
  ${bgColor} ${textColor}
  ${seatNumber === 6 ? "mr-4 sm:mr-8" : ""}
  `}
                          onClick={() => {
                            handleSeatSelection(seatNumber, row);
                          }}
                        >
                          {/* Optional: Small detail for 'seat' look */}
                          <span
                            className={`absolute bottom-0.5 w-[80%] h-[2px] rounded-full opacity-30 ${
                              isSelected ? "bg-white" : "bg-current"
                            }`}
                          ></span>
                          {seatNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm border-t border-slate-100 dark:border-slate-800 pt-6">
            {TICKET_TYPE.map(({ type, color, price }) => (
              <div key={type} className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded-md ${color} border-2`}></span>
                <div className="flex flex-col leading-none">
                  {/* Text color update for dark mode */}
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {type}
                  </span>
                  {price && (
                    // Text color update for dark mode
                    <span className="text-slate-400 dark:text-slate-500 text-[10px]">
                      ₹{price}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Summary Card */}
        <section
          // Updated: Summary card container for dark mode
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-gray-900/50 border border-white/60 dark:border-gray-700/60 px-4 py-5 sm:p-6 max-w-2xl mx-auto"
        >
          <h1
            // Updated: Text and border color for dark mode
            className="text-lg font-bold sm:text-xl text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3"
          >
            <span>🧾</span> Booking Summary
          </h1>

          {selectedSeats && selectedSeats.length > 0 ? (
            <div className="space-y-3">
              <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                {selectedSeats.map((seat: any, i: any) => (
                  <div
                    key={i}
                    // Updated: Inner summary item background and border for dark mode
                    className="flex justify-between items-center bg-slate-50 dark:bg-gray-800 rounded-lg p-3 border border-slate-100 dark:border-gray-700"
                  >
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      Row{" "}
                      <span className="font-bold text-slate-800 dark:text-slate-100">
                        {seat.row}
                      </span>{" "}
                      — Seat{" "}
                      <span className="font-bold text-slate-800 dark:text-slate-100">
                        {seat.seatNumber}
                      </span>
                    </div>
                    <div
                      // Updated: Price tag background and border for dark mode
                      className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-gray-700 px-2 py-1 rounded border border-slate-100 dark:border-gray-600 shadow-sm"
                    >
                      {seat.type} • ₹{seat.price}
                    </div>
                  </div>
                ))}
              </div>

              <div
                // Updated: Total row colors for dark mode
                className="flex justify-between items-center font-bold text-lg text-slate-800 dark:text-slate-100 pt-4 border-t border-slate-200 dark:border-slate-700 mt-2"
              >
                <p>Total Amount</p>
                <p className="text-indigo-600 dark:text-indigo-400">
                  ₹
                  {selectedSeats.reduce(
                    (sum: any, seat: any) => sum + seat.price,
                    0
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center">
              {/* Text color update for dark mode */}
              <p className="text-slate-400 dark:text-slate-500 text-sm italic">
                Select seats to proceed with booking
              </p>
            </div>
          )}

          <button
            className={`mt-6 w-full py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-lg
 ${
   selectedSeats && selectedSeats.length > 0
     ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-emerald-200 hover:-translate-y-0.5 dark:hover:shadow-emerald-900/50" // Hover shadow for dark mode
     : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none dark:bg-slate-700 dark:text-slate-500" // Disabled state for dark mode
 }
 `}
            disabled={!selectedSeats || selectedSeats.length === 0}
          >
            Book{" "}
            {selectedSeats?.length > 0
              ? `${selectedSeats.length} Seats`
              : "Tickets"}
          </button>
        </section>
      </div>
    </main>
  );
}

export default CinemaTicketBooking;

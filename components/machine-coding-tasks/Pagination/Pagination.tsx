"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { TextShimmer } from "@/components/ui/text-shimmer";

const ITEMS_PER_PAGE = 5;

function Pagination() {
  const [fetchedData, setFetchedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPages = Math.ceil(fetchedData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedProducts = fetchedData.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://dummyjson.com/products?limit=100"
        );
        console.log("pro", response);
        if (response.status == 200) {
          setFetchedData(response.data.products);
        } else {
          setError("Failed to Fetch Products");
        }
      } catch (error) {
        setError("Failed to Fetch Products");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);
  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const pageNumbersArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <main className="min-h-[600px] grid lg:grid-cols-[1.5fr_1fr] gap-6 mb-5">
      {/* --- Left Side: Fetched Data List --- */}
      <div className="flex flex-col bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700/60 rounded-2xl shadow-sm p-4 h-full">
        <h2 className="text-lg md:text-xl font-bold text-slate-700 dark:text-slate-100 mb-4 px-2 flex items-center gap-3">
          📦 Product List{" "}
          <span className="text-xs font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-gray-700 px-2 py-0.5 rounded-full border border-slate-300 dark:border-gray-600">
            Page {currentPage}
          </span>
        </h2>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <TextShimmer
                className="font-mono text-sm md:text-base lg:text-xl text-blue-600 dark:text-blue-400"
                duration={1}
              >
                Fetching Products...
              </TextShimmer>
            </div>
          )}

          {paginatedProducts &&
            paginatedProducts.length > 0 &&
            paginatedProducts.map((product: any) => (
              <div
                key={product.id}
                className="group bg-slate-200 dark:bg-gray-800/90 border border-slate-100 dark:border-gray-700 rounded-xl p-3 flex items-center justify-between hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 ease-out"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 w-6">
                    #{product.id}
                  </span>
                  <h1 className="text-base font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {product.title}
                  </h1>
                </div>

                <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-lg overflow-hidden bg-slate-50 dark:bg-gray-700 border border-slate-100 dark:border-gray-600">
                  <Image
                    src={product.thumbnail}
                    fill
                    className="object-cover"
                    alt={product.title}
                  />
                </div>
              </div>
            ))}

          {loading && error && (
            <div className="text-center p-4 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* --- Right Side: Pagination Controls --- */}
      <div className="flex flex-col *:
      items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border  border-gray-300 dark:border-gray-700/60 rounded-2xl shadow-lg shadow-blue-500/5 dark:shadow-gray-900/50 p-6 h-fit lg:h-full">
        {fetchedData && fetchedData.length > 0 && (
          <div className="w-full flex flex-col items-center gap-y-8">
            <div className="text-center space-y-1">
              <p className="text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                {fetchedData.length}
              </p>
              <p className="text-sm font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Total Products
              </p>
            </div>

            <div className="w-16 h-1 bg-slate-200 dark:bg-gray-700 rounded-full"></div>

            <div className="flex flex-col items-center gap-6 w-full">
              <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                {pageNumbersArray.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`
                      w-9 h-9 text-sm font-semibold rounded-full flex items-center justify-center transition-all duration-300 ease-out
                      ${
                        pageNumber === currentPage
                          ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/40 scale-110"
                          : "bg-white dark:bg-gray-700 text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-sm"
                      }
                      `}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-4 w-full justify-center mt-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="flex-1 max-w-[120px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 font-medium text-sm transition-all duration-200 hover:bg-slate-50 dark:hover:bg-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-white dark:disabled:hover:bg-gray-700"
                >
                  ← Prev
                </button>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  // Updated: Navigation button colors for dark mode
                  className="flex-1 max-w-[120px] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 font-medium text-sm transition-all duration-200 hover:bg-slate-50 dark:hover:bg-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:bg-white dark:disabled:hover:bg-gray-700"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Pagination;

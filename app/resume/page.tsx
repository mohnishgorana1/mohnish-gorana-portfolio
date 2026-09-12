"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Download, ArrowLeft, ExternalLink, AlertCircle, FileWarning } from "lucide-react";
import Link from "next/link";
import { RESUME_LINK } from "@/lib/constants";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const Document = dynamic(() => import("react-pdf").then((mod) => mod.Document), { ssr: false });
const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), { ssr: false });

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const getDriveId = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

const ResumeSkeleton = () => (
  <div className="w-full bg-white p-8 sm:p-12 animate-pulse min-h-[130vh] flex flex-col gap-6 rounded-xl border border-border/80 shadow-sm">
    {/* Header */}
    <div className="flex flex-col items-center gap-3 mb-2">
      <div className="h-8 w-64 bg-slate-200 rounded-md" />
      <div className="h-3 w-3/4 max-w-md bg-slate-200 rounded-md" />
    </div>

    {/* Summary */}
    <div>
      <div className="h-4 w-24 bg-slate-200 rounded-md mb-2" />
      <div className="h-px w-full bg-slate-200 mb-3" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-200 rounded-sm" />
        <div className="h-3 w-11/12 bg-slate-200 rounded-sm" />
        <div className="h-3 w-3/4 bg-slate-200 rounded-sm" />
      </div>
    </div>

    {/* Technical Skills */}
    <div>
      <div className="h-4 w-36 bg-slate-200 rounded-md mb-2" />
      <div className="h-px w-full bg-slate-200 mb-3" />
      <div className="space-y-3">
        <div className="flex gap-2"><div className="h-3 w-20 shrink-0 bg-slate-200 rounded-sm" /><div className="h-3 w-3/4 bg-slate-200 rounded-sm" /></div>
        <div className="flex gap-2"><div className="h-3 w-32 shrink-0 bg-slate-200 rounded-sm" /><div className="h-3 w-2/3 bg-slate-200 rounded-sm" /></div>
        <div className="flex gap-2"><div className="h-3 w-28 shrink-0 bg-slate-200 rounded-sm" /><div className="h-3 w-4/5 bg-slate-200 rounded-sm" /></div>
      </div>
    </div>

    {/* Education */}
    <div>
      <div className="h-4 w-28 bg-slate-200 rounded-md mb-2" />
      <div className="h-px w-full bg-slate-200 mb-3" />
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1.5"><div className="h-3 w-64 bg-slate-200 rounded-sm" /><div className="h-3 w-20 bg-slate-200 rounded-sm" /></div>
          <div className="h-3 w-1/2 bg-slate-200 rounded-sm" />
        </div>
        <div>
          <div className="flex justify-between mb-1.5"><div className="h-3 w-56 bg-slate-200 rounded-sm" /><div className="h-3 w-20 bg-slate-200 rounded-sm" /></div>
          <div className="h-3 w-2/5 bg-slate-200 rounded-sm" />
        </div>
      </div>
    </div>

    {/* Projects */}
    <div>
      <div className="h-4 w-24 bg-slate-200 rounded-md mb-2" />
      <div className="h-px w-full bg-slate-200 mb-3" />
      <div className="space-y-6">
        <div>
          <div className="flex gap-2 mb-2.5"><div className="h-3 w-28 bg-slate-200 rounded-sm" /><div className="h-3 w-40 bg-slate-200 rounded-sm" /></div>
          <div className="h-3 w-full bg-slate-200 rounded-sm mb-2" />
          <div className="h-3 w-3/4 bg-slate-200 rounded-sm mb-3" />
          <div className="space-y-2.5 pl-4">
            <div className="flex gap-2 items-start"><div className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 mt-1" /><div className="h-3 w-full bg-slate-200 rounded-sm" /></div>
            <div className="flex gap-2 items-start"><div className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 mt-1" /><div className="h-3 w-11/12 bg-slate-200 rounded-sm" /></div>
            <div className="flex gap-2 items-start"><div className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 mt-1" /><div className="h-3 w-4/5 bg-slate-200 rounded-sm" /></div>
          </div>
        </div>
        <div>
          <div className="flex gap-2 mb-2.5"><div className="h-3 w-24 bg-slate-200 rounded-sm" /><div className="h-3 w-32 bg-slate-200 rounded-sm" /></div>
          <div className="h-3 w-11/12 bg-slate-200 rounded-sm mb-2" />
          <div className="h-3 w-4/5 bg-slate-200 rounded-sm mb-3" />
          <div className="space-y-2.5 pl-4">
            <div className="flex gap-2 items-start"><div className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 mt-1" /><div className="h-3 w-full bg-slate-200 rounded-sm" /></div>
            <div className="flex gap-2 items-start"><div className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 mt-1" /><div className="h-3 w-5/6 bg-slate-200 rounded-sm" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 🌟 Centered fallback shown whenever the PDF can't be rendered for any reason
const ResumeUnavailable = () => (
  <div className="w-full flex flex-col items-center justify-center gap-4 py-24 sm:py-32 text-center px-4">
    <div className="flex items-center justify-center size-14 rounded-full bg-secondary/50 border border-border/60 text-muted-foreground">
      <FileWarning size={24} />
    </div>
    <div className="flex flex-col gap-1.5">
      <p className="text-sm sm:text-base font-bold text-foreground">
        Resume can&apos;t be displayed right now.
      </p>
      <p className="text-xs sm:text-sm text-muted-foreground">
        Please download it instead.
      </p>
    </div>
    <a
      href={RESUME_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 flex items-center gap-2 px-5 h-10 rounded-xl bg-foreground text-background font-bold text-[13px] hover:opacity-90 transition-opacity shadow-md"
    >
      <ExternalLink size={15} />
      Open / Download
    </a>
  </div>
);

export default function ResumePage() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const [isPdfLoaded, setIsPdfLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false); // 🌟 tracks any PDF load/render failure
  const containerRef = useRef<HTMLDivElement>(null);

  const fileId = getDriveId(RESUME_LINK);

  useEffect(() => {
    import("react-pdf").then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    });
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(Math.min(containerRef.current.clientWidth - 32, 900));
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // 🌟 Fires when the PDF fails to load/parse (corrupt file, API route error response, network failure, etc.)
  function onDocumentLoadError(error: Error) {
    console.error("PDF load error:", error);
    setHasError(true);
  }

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/resume');
      if (!response.ok) throw new Error("Resume fetch failed");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Mohnish_Gorana_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <main className="max-w-4xl mx-auto w-full flex flex-col min-h-[150vh] pt-6 md:pt-8 pb-10">

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
      >
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="p-2.5 rounded-full bg-secondary/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border/50 shadow-sm">
              <ArrowLeft size={18} />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Resume
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              Mohnish Gorana • Full-Stack Web Developer
            </p>
          </div>
        </div>

        {fileId && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-6 h-11 rounded-xl bg-foreground text-background font-bold text-[13px] hover:ring-2 hover:ring-primary duration-200 active:ring-0 transition-all shadow-md"
            >
              <Download size={16} />
              Download PDF
            </button>
            <a
              href={RESUME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 h-11 rounded-xl bg-secondary/50 border border-border/60 text-foreground font-bold text-[13px] hover:bg-muted/30 transition-all shadow-sm"
            >
              <ExternalLink size={16} />
              <span className="sm:hidden">Open</span>
            </a>
          </div>
        )}
      </motion.div>

      {/* Render Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        ref={containerRef}
        className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center relative px-4"
      >
        {!fileId || hasError ? (
          // 🌟 Single, clean centered fallback — covers both "invalid link" and "load failed" cases
          <ResumeUnavailable />
        ) : (
          <div className="relative w-full flex justify-center">

            {/* Skeleton Overlay — only while we don't yet know the outcome */}
            {!isPdfLoaded && (
              <div className="absolute inset-0 z-20 w-full flex justify-center">
                <ResumeSkeleton />
              </div>
            )}

            {/* PDF Viewer */}
            <div className={cn(
              "w-full flex justify-center rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-white transition-opacity duration-300",
              isPdfLoaded ? "opacity-100" : "opacity-0"
            )}>
              <Document
                file="/api/resume"
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                error={null} // 🌟 handled centrally via hasError + ResumeUnavailable instead
              >
                {Array.from(new Array(numPages || 0), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={containerWidth}
                    devicePixelRatio={4}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    onRenderSuccess={() => setIsPdfLoaded(true)}
                    onRenderError={() => setHasError(true)}
                    className="mb-2"
                  />
                ))}
              </Document>
            </div>

          </div>
        )}
      </motion.div>
    </main>
  );
}
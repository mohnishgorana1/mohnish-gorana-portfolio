// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Mohnish Gorana | Full Stack Developer",
  description:
    "Mohnish Gorana's personal portfolio. Check out my projects, skills, and experience here.",
  keywords: ["Mohnish Gorana", "Portfolio", "Web Developer", "Next.js"],
  authors: [
    {
      name: "Mohnish Gorana",
      url: "https://mohnish-gorana-portfolio.vercel.app/",
    },
  ],
  openGraph: {
    title: "Mohnish Gorana | Full Stack Developer",
    description:
      "Personal portfolio showcasing my web development projects and skills.",
    url: "https://mohnish-gorana-portfolio.vercel.app/",
    siteName: "Mohnish Gorana Portfolio",
    images: [
      {
        url: "https://mohnish-gorana-portfolio.vercel.app/assets/favicons/og_image.png",
        width: 1200,
        height: 630,
        alt: "Mohnish Gorana Portfolio Preview",
      },
    ],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/assets/favicons/favicon.ico" },
      { url: "/assets/favicons/favicon.svg", type: "image/svg+xml" },
      {
        url: "/assets/favicons/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/assets/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/assets/favicons/site.webmanifest",
  twitter: {
    card: "summary_large_image",
    title: "Mohnish Gorana | Full Stack Developer",
    description: "Check out my projects and web development skills.",
    creator: "@mohnish_gorana_",
    images: [
      "https://mohnish-gorana-portfolio.vercel.app/assets/favicons/og_image.png",
    ],
  },
  alternates: {
    canonical: "https://mohnish-gorana-portfolio.vercel.app",
  },

  verification: {
    google: "SNsALIflaOjOixcI4laSP1NJT1e0Qu5eEaJmtrpikkE",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohnish Gorana",
    url: "https://mohnish-gorana-portfolio.vercel.app/",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://github.com/mohnishgorana1",
      "https://www.linkedin.com/in/mohnish-gorana/",
      "https://x.com/mohnish_gorana_",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen max-w-5xl mx-auto px-0.5 sm:px-0 selection:bg-neutral-800 selection:text-neutral-200 dark:selection:bg-neutral-50 dark:selection:text-neutral-950`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="sm:px-1 w-full flex flex-col justify-between">
            <div className="min-h-[80vh]">{children}</div>
            <footer className="w-full mt-8 self-end">
              <Footer />
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

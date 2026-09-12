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

const SITE_URL = "https://mohnish-gorana-portfolio.vercel.app";
const OG_IMAGE_URL = `${SITE_URL}/assets/favicons/og_image.png`;
const SITE_TITLE = "Mohnish Gorana | Full Stack Developer";
const SITE_DESCRIPTION =
  "Portfolio of Mohnish Gorana, a Full-Stack Developer specializing in MERN, Next.js, and GenAI integrations.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: "%s | Mohnish Gorana",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Mohnish Gorana",
    "Portfolio",
    "Full Stack Developer",
    "Web Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "React Developer India",
    "GenAI Developer",
  ],
  authors: [{ name: "Mohnish Gorana", url: SITE_URL }],
  creator: "Mohnish Gorana",
  publisher: "Mohnish Gorana",
  category: "technology",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Mohnish Gorana Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Mohnish Gorana — Full Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: "@mohnish_gorana_",
    creator: "@mohnish_gorana_",
    images: [OG_IMAGE_URL],
  },

  icons: {
    icon: [
      { url: "/assets/favicons/favicon.ico" },
      { url: "/assets/favicons/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/assets/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/assets/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/assets/favicons/favicon.ico"],
  },

  manifest: "/assets/favicons/site.webmanifest",

  alternates: {
    canonical: SITE_URL,
  },

  verification: {
    google: "SNsALIflaOjOixcI4laSP1NJT1e0Qu5eEaJmtrpikkE",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohnish Gorana",
    url: SITE_URL,
    image: OG_IMAGE_URL,
    jobTitle: "Full Stack Developer",
    description: SITE_DESCRIPTION,
    sameAs: [
      "https://github.com/mohnishgorana1",
      "https://www.linkedin.com/in/mohnish-gorana-804374340/",
      "https://x.com/mohnish_gorana_",
    ],
  };

  return (
    // Default to dark mode on root for the premium developer aesthetic
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-background text-foreground selection:bg-neutral-700 selection:text-neutral-200 dark:selection:bg-neutral-700 dark:selection:text-neutral-400`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Main container constrained to 7xl with subtle flat borders (tasteful minimalism) */}
          <main className="max-w-7xl mx-auto px-2 sm:px-6 w-full flex flex-col justify-between min-h-screen">
            <Navbar />
            <div className="min-h-[80vh] w-full md:pt-2">{children}</div>
            <footer className="w-full mt-8 self-end pb-4">
              <Footer />
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
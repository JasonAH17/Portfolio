import type { Metadata } from "next";
import { Archivo, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { MorphArrival } from "@/components/motion/morph-link";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { BackToTop } from "@/components/ui/back-to-top";
import { SiteFooter } from "@/components/ui/site-footer";
import { StatusBar } from "@/components/ui/status-bar";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

// Not a variable font, so the weight is required.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal"],
  axes: ["opsz", "SOFT"],
});

// Link previews need absolute image URLs. On Vercel this is the production domain; locally it is the dev server.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const description =
  "Computer Science student majoring in Artificial Intelligence at Bina Nusantara University, building AI for healthcare.";

const siteName = "Jason Alexander Harris";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jason Alexander Harris | Portfolio",
  description,
  // The preview image is a real screenshot of the hero (1200 × 630).
  openGraph: {
    type: "website",
    siteName,
    title: "Jason Alexander Harris | Portfolio",
    description,
    images: [{ url: "/images/og/home.jpg", width: 1200, height: 630, alt: "Jason Alexander Harris, AI student at Bina Nusantara University" }],
  },
  twitter: { card: "summary_large_image" },
};

// Runs before first paint: marks JS as available (sweep covers and reveals only hide content when
// they can reveal it) and applies a saved light/dark choice so the page never flashes the wrong theme.
const jsFlag = `document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Lets Next jump straight to the top on a page change (anchor links still scroll smoothly),
      // so the case-study screenshot is already in place when the thumbnail grows into it.
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${plexMono.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <StatusBar />
        {children}
        <SiteFooter />
        <BackToTop />
        <RevealObserver />
        <MorphArrival />
      </body>
    </html>
  );
}

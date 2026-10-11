import type { Metadata } from "next";
import { Archivo, Fraunces, JetBrains_Mono } from "next/font/google";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { SignalDefs } from "@/components/signal/signal-defs";
import { StatusBar } from "@/components/ui/status-bar";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Jason Alexander Harris — Portfolio",
  description:
    "Computer Science student majoring in Artificial Intelligence at Bina Nusantara University, building AI for healthcare.",
};

// Marks JS as available before first paint so sweep covers only hide traces when they can be revealed.
// Runs before first paint: marks JS as available (sweep covers and reveals only hide content when
// they can reveal it) and applies a saved light/dark choice so the page never flashes the wrong theme.
const jsFlag = `document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrainsMono.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <SignalDefs />
        <StatusBar />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}

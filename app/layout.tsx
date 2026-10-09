import type { Metadata } from "next";
import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";
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

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Jason Alexander Harris — Portfolio",
  description:
    "Computer Science student majoring in Artificial Intelligence at Bina Nusantara University, building AI for healthcare.",
};

// Marks JS as available before first paint so sweep covers only hide traces when they can be revealed.
const jsFlag = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrainsMono.variable} ${newsreader.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <SignalDefs />
        <StatusBar />
        {children}
      </body>
    </html>
  );
}

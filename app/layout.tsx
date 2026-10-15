import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import Corridor from "@/components/world/Corridor";
import SharedCanvasMount from "@/components/webgl/SharedCanvasMount";
import EnergyCrystalCursor from "@/components/cursor/EnergyCrystalCursor";
import EnergyRail from "@/components/nav/EnergyRail";
import Preloader from "@/components/world/Preloader";
import { SITE } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const interDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfo1io-ashen.vercel.app"),
  title: "Deepanshu Yadav | Junior Frontend & Full-Stack Developer",
  description: SITE.statement,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Deepanshu Yadav | Junior Frontend & Full-Stack Developer",
    description: SITE.statement,
    type: "website",
    url: "https://portfo1io-ashen.vercel.app/",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary",
    title: "Deepanshu Yadav | Junior Frontend & Full-Stack Developer",
    description: SITE.statement,
  },
};

export const viewport: Viewport = {
  themeColor: "#05060b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${interDisplay.variable} ${inter.variable} ${mono.variable}`}>
      <body className="relative antialiased bg-void text-ink font-sans">
        <AppProviders>
          <Corridor />
          <SharedCanvasMount />
          <div className="relative z-10" style={{ overflowX: "clip" }}>
            <a href="#featured-systems" className="sr-only fixed left-4 top-4 z-[100] rounded bg-white px-4 py-3 font-mono text-sm text-black focus:not-sr-only focus:outline focus:outline-2 focus:outline-cyan-300">
              Skip to projects
            </a>
            {children}
          </div>
          <EnergyRail />
          <EnergyCrystalCursor />
          <Preloader />
        </AppProviders>
      </body>
    </html>
  );
}

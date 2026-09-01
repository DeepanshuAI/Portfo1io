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
  title: `${SITE.name} — Full-Stack Developer`,
  description: SITE.statement,
  openGraph: {
    title: `${SITE.name} — Full-Stack Developer`,
    description: SITE.statement,
    type: "website",
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

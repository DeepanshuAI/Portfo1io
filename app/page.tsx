import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import GalaxyBackground from "@/components/background/GalaxyBackground";

/**
 * The corridor is one continuous journey. Hero is critical (above the fold),
 * so it ships in the initial bundle. Every section below is code-split into its
 * own chunk and lazy-loaded as the visitor travels the corridor.
 */
const EngineeringCore = dynamic(() => import("@/components/sections/EngineeringCore"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Process = dynamic(() => import("@/components/sections/Process"));
const Evidence = dynamic(() => import("@/components/sections/Evidence"));
const Contact = dynamic(() => import("@/components/sections/Contact"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function Page() {
  return (
    <main className="relative">
      <GalaxyBackground />
      <Hero />
      <Projects />
      <EngineeringCore />
      <Skills />
      <Process />
      <Evidence />
      <Contact />
      <Footer />
    </main>
  );
}

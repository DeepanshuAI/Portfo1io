"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROJECTS } from "@/lib/site";

export default function Evidence() {
  const evidence = [
    { title: "Portfolio", detail: "Next.js, TypeScript, React Three Fiber", href: "https://github.com/DeepanshuAI/Portfo1io" },
    { title: "Student Management System", detail: "React client, Express API, MongoDB", href: PROJECTS[0].repo },
    { title: "3D interface work", detail: "Three.js scenes in the portfolio and the Kairos website concept", href: PROJECTS[1].repo },
  ];

  return (
    <section id="evidence" className="section-y relative z-10 flex min-h-[80vh] flex-col items-center justify-center">
      <div className="shell w-full text-center">
        <SectionHeading
          index="05"
          eyebrow="Review the work"
          title={
            <>
              Built work, <span className="text-gradient">open to inspect</span>
            </>
          }
          intro="A few concrete examples of the frontend, full-stack, and interactive work in the linked repositories."
          align="center"
        />

        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-5 px-6 text-left md:grid-cols-3">
          {evidence.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-300">{item.title}</span>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{item.detail}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/80 group-hover:text-white">
                View source <span aria-hidden="true">↗</span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

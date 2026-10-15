"use client";

import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/5 py-16 mt-24">
      <div className="shell flex flex-col items-center justify-center space-y-8 text-center">
        
        <div className="space-y-2">
          <h2 className="text-lg tracking-widest text-ink uppercase font-mono">{SITE.name}</h2>
          <p className="text-xs tracking-widest text-ink-muted uppercase font-mono">{SITE.role}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {SITE.socials.map((s) => (
            <a 
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              download={s.label === "Resume" ? "Deepanshu-Yadav-Resume.pdf" : undefined}
              className="inline-flex min-h-11 items-center text-xs font-mono text-ink-muted hover:text-ink transition-colors uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))]"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="text-[10px] font-mono text-ink-muted/30 uppercase tracking-widest pt-12">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

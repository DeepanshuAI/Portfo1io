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

        <div className="flex items-center space-x-8">
          {SITE.socials.map((s) => (
            <a 
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-ink-muted/50 hover:text-ink transition-colors uppercase tracking-widest"
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

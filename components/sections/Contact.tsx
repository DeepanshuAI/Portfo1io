"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";
import { EASE } from "@/lib/motion";

type ModalState = "closed" | "open";
type SubmitState = "idle" | "sending" | "sent";

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Contact() {
  const [modalState, setModalState] = useState<ModalState>("closed");

  return (
    <section id="contact" className="section-y relative flex min-h-screen flex-col items-center justify-center">
      <div className="shell flex flex-col items-center z-10 w-full relative h-full flex-grow pt-32 pb-16">
        <div className="flex-grow flex flex-col items-center justify-center">
          <SectionHeading
            index="06"
            eyebrow="LET'S BUILD SOMETHING"
            title="Have a project in mind?"
            intro="Tell me what you're working on, what you need, or simply what you're thinking. I'll get back to you and we can figure out the next step."
            align="center"
          />

          <motion.div className="mt-16 relative flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <button
              onClick={() => setModalState("open")}
              className="group relative flex h-16 items-center overflow-hidden rounded-full border border-white/20 bg-void px-12 transition-all hover:scale-105 hover:border-white/40 active:scale-95"
            >
              {/* Subtle sweep / glow on hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              
              <span className="font-mono text-sm tracking-[0.2em] uppercase text-white transition-transform duration-300 group-hover:-translate-y-8">
                START A PROJECT
              </span>
              <span className="absolute left-1/2 -translate-x-1/2 translate-y-8 font-mono text-sm tracking-[0.2em] uppercase text-[rgb(var(--accent))] transition-transform duration-300 group-hover:translate-y-0">
                Let's talk
              </span>
            </button>
            <p className="mt-8 text-center text-xs text-white/40 font-mono uppercase tracking-widest">
              Open to interesting problems, ambitious products, and good people.
            </p>
          </motion.div>
        </div>


      </div>

      <AnimatePresence>
        {modalState === "open" && <ContactModal onClose={() => setModalState("closed")} />}
      </AnimatePresence>
    </section>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const validate = () => {
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = "This field is required.";
    if (!form.email.trim()) err.email = "This field is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Please enter a valid email address.";
    if (!form.phone.trim()) err.phone = "This field is required.";
    if (!form.message.trim()) err.message = "This field is required.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setSubmitState("sending");
    
    // Simulate sending time to show smooth transition
    setTimeout(() => {
      setSubmitState("sent");
      
      const subject = form.subject || `Project Inquiry from ${form.name}`;
      const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`;
      
      const mailtoLink = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
    }, 1200);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-void/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden pointer-events-none">
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-full max-w-lg pointer-events-auto"
          >
            <div className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors"
          >
            <XIcon className="h-5 w-5" />
          </button>
          
          <div className="p-8">
            {submitState === "sent" ? (
              <div className="py-16 text-center">
                <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent</h3>
                <p className="text-white/70">Thanks, {form.name || "friend"}.<br/>Your message is on its way.<br/>I'll get back to you soon.</p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-bold tracking-tight text-white mb-2">
                  Let's Talk
                </h3>
                <p className="text-white/60 mb-8 text-sm">
                  Have a project, opportunity, or idea?
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field 
                      placeholder="Name *" 
                      value={form.name} 
                      error={errors.name}
                      onChange={(e) => setForm(f => ({ ...f, name: e }))} 
                    />
                    <Field 
                      placeholder="Email *" 
                      value={form.email} 
                      error={errors.email}
                      type="email"
                      onChange={(e) => setForm(f => ({ ...f, email: e }))} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Field 
                      placeholder="Phone / WhatsApp *" 
                      value={form.phone} 
                      error={errors.phone}
                      onChange={(e) => setForm(f => ({ ...f, phone: e }))} 
                    />
                    <Field 
                      placeholder="Subject (Optional)" 
                      value={form.subject} 
                      error={errors.subject}
                      onChange={(e) => setForm(f => ({ ...f, subject: e }))} 
                    />
                  </div>

                  <Field 
                    placeholder="Message / Query *" 
                    value={form.message} 
                    error={errors.message}
                    isTextArea 
                    onChange={(e) => setForm(f => ({ ...f, message: e }))} 
                  />

                  <button
                    type="submit"
                    disabled={submitState !== "idle"}
                    className="mt-4 flex h-12 w-full items-center justify-center rounded border border-white/20 bg-white/5 text-sm font-mono tracking-widest text-white transition-colors hover:bg-white/10 hover:border-white/40 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {submitState === "sending" ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                </form>

                <div className="mt-8 border-t border-white/10 pt-6 text-center">
                  <p className="text-xs text-white/40 mb-1">Prefer email?</p>
                  <a href={`mailto:${SITE.email}`} className="text-sm font-mono tracking-widest text-[rgb(var(--accent))] hover:text-white transition-colors">
                    {SITE.email}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
        </div>
      </div>
    </>
  );
}

function Field({ 
  placeholder, 
  value, 
  onChange, 
  error, 
  isTextArea, 
  type = "text" 
}: { 
  placeholder: string; 
  value: string; 
  onChange: (val: string) => void; 
  error?: string; 
  isTextArea?: boolean;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {isTextArea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full resize-none rounded border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/30 focus:bg-white/5"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded border border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/30 focus:bg-white/5"
        />
      )}
      {error && <span className="text-[10px] text-red-400 font-mono">{error}</span>}
    </div>
  );
}

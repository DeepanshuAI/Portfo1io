"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/site";
import { EASE } from "@/lib/motion";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeModal = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <section id="contact" className="section-y relative flex min-h-screen flex-col items-center justify-center">
      <div className="shell relative z-10 flex h-full w-full flex-grow flex-col items-center justify-center pt-32 pb-16 text-center">
        <SectionHeading
          index="05"
          eyebrow="Open to junior opportunities"
          title="Let’s talk about the work."
          intro="For frontend, full-stack, or design-focused frontend roles, email me or open a draft with a short note about the opportunity."
          align="center"
        />

        <motion.div
          className="mt-12 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex min-h-14 items-center rounded-full border border-white/20 bg-void px-10 font-mono text-sm uppercase tracking-[0.16em] text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))]"
          >
            Draft an email
          </button>
          <a
            href={`mailto:${SITE.email}`}
            className="font-mono text-sm text-[rgb(var(--accent))] underline decoration-white/20 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))]"
          >
            {SITE.email}
          </a>
          <p className="max-w-[50ch] text-xs leading-relaxed text-white/50">
            The form opens your email app with a draft. Review it and send it from there.
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && <ContactModal onClose={closeModal} />}
      </AnimatePresence>
    </section>
  );
}

function ContactModal({ onClose }: { onClose: () => void }) {
  const nameRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    nameRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Enter your name.";
    if (!form.email.trim()) nextErrors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!form.message.trim()) nextErrors.message = "Add a short message.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const subject = form.subject.trim() || `Opportunity inquiry from ${form.name.trim()}`;
    const body = `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\nMessage:\n${form.message.trim()}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const controls = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled])'
    ));
    if (controls.length === 0) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <motion.button
        type="button"
        aria-label="Close contact form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 cursor-default bg-void/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="pointer-events-none fixed inset-0 z-50 overflow-y-auto px-4 py-8">
        <div className="flex min-h-full items-center justify-center">
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            onKeyDown={handleDialogKeyDown}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="pointer-events-auto relative w-full max-w-lg rounded-2xl border border-white/10 bg-black shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close contact form"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full text-2xl text-white/60 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[rgb(var(--accent))]"
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className="p-6 sm:p-8">
              <h2 id="contact-dialog-title" className="mb-2 pr-12 font-display text-2xl font-bold tracking-tight text-white">
                Draft an email
              </h2>
              <p className="mb-7 text-sm leading-relaxed text-white/60">
                Your email app will open with these details filled in. You can review and send the draft there.
              </p>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <Field ref={nameRef} label="Name" name="name" autoComplete="name" value={form.name} error={errors.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
                <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} error={errors.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} />
                <Field label="Subject (optional)" name="subject" value={form.subject} onChange={(value) => setForm((current) => ({ ...current, subject: value }))} />
                <Field label="Message" name="message" value={form.message} error={errors.message} isTextArea onChange={(value) => setForm((current) => ({ ...current, message: value }))} />
                <button
                  type="submit"
                  className="mt-2 flex min-h-12 w-full items-center justify-center rounded border border-white/20 bg-white/5 font-mono text-sm tracking-widest text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--accent))]"
                >
                  OPEN EMAIL DRAFT
                </button>
              </form>

              <p className="mt-6 border-t border-white/10 pt-5 text-center text-xs text-white/50">
                Prefer to write it yourself? <a href={`mailto:${SITE.email}`} className="text-[rgb(var(--accent))] underline underline-offset-4">Email {SITE.email}</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  isTextArea?: boolean;
  type?: string;
  autoComplete?: string;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, name, value, onChange, error, isTextArea, type = "text", autoComplete },
  ref,
) {
  const errorId = `${name}-error`;
  const fieldClass = "w-full rounded border border-white/15 bg-transparent px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-[rgb(var(--accent))] focus:bg-white/5";

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={name} className="font-mono text-xs uppercase tracking-wider text-white/70">{label}</label>
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`${fieldClass} resize-y`}
        />
      ) : (
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={fieldClass}
        />
      )}
      {error && <span id={errorId} role="alert" className="text-xs text-red-300">{error}</span>}
    </div>
  );
});

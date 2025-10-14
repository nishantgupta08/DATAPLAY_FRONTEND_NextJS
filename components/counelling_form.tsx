"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CounsellingForm() {
  const [open, setOpen] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Listen for the custom event from your "Book 1:1 counselling session" button
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("openCounsellingModal" as any, onOpen);
    return () => window.removeEventListener("openCounsellingModal" as any, onOpen);
  }, []);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Body scroll lock + focus management
  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      // Focus first field after open anim starts
      const t = setTimeout(() => firstFieldRef.current?.focus(), 150);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
        previouslyFocused.current?.focus?.();
      };
    }
  }, [open]);

  // Simple submit handler (replace with your logic)
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to your API / WhatsApp handler
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <div aria-live="assertive">
          {/* Overlay with blur */}
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Centered Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Book a 1:1 counselling session"
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            <div
              className="
                relative w-full max-w-lg
                rounded-2xl border border-white/20
                bg-white/80 dark:bg-neutral-900/70
                backdrop-blur-xl shadow-2xl ring-1 ring-black/5
                overflow-hidden
              "
              onClick={(e) => e.stopPropagation()} // prevent overlay close when clicking inside
            >
              {/* Decorative top gradient bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-emerald-500" />

              {/* Header */}
              <div className="px-6 pt-5 pb-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  Book a 1:1 counselling session
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                  Share your details and we’ll get back to you shortly.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="px-6 pb-6 grid gap-4">
                <div className="grid gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full name
                  </label>
                  <input
                    id="name"
                    ref={firstFieldRef}
                    type="text"
                    required
                    className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="grid gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="jane@domain.com"
                  />
                </div>

                <div className="grid gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="+91 98xxxxxxxx"
                  />
                </div>

                <div className="grid gap-1.5">
                  <label htmlFor="msg" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="msg"
                    rows={3}
                    className="rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Tell us a bit about what you’re looking for…"
                  />
                </div>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="
                      inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium
                      bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-emerald-600
                      text-white shadow-md hover:shadow-lg active:scale-[0.99] transition
                    "
                  >
                    Submit
                  </button>
                </div>
              </form>

              {/* Corner close button */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/50 backdrop-blur hover:bg-white/80"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
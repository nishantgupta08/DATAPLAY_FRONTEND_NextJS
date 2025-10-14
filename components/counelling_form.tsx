'use client';
import React, { useEffect, useState } from 'react';

type FormState = {
  name: string;
  email: string;
  phone: string;
  course: string;
  experience: string;
  message: string;
};

const DEFAULT_NUMBER = '919999999999'; // TODO: replace or set NEXT_PUBLIC_WHATSAPP_NUMBER

export default function CounsellingModal() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    course: '',
    experience: '',
    message: '',
  });

  // Open the modal when anyone dispatches: window.dispatchEvent(new CustomEvent('openCounsellingModal'))
  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('openCounsellingModal' as any, onOpen);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('openCounsellingModal' as any, onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill in your name, email, and phone.');
      return;
    }
    setSubmitting(true);
    const number =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || DEFAULT_NUMBER;

    const lines = [
      'Hello! I would like to book a 1:1 counselling session.',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      form.course ? `Course Interest: ${form.course}` : '',
      form.experience ? `Experience: ${form.experience}` : '',
      form.message ? `Goals/Notes: ${form.message}` : '',
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${number}?text=${text}`;

    window.open(url, '_blank');
    setSubmitting(false);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-live="polite"
    >
      {/* Backdrop */}
      <button
        aria-label="Close modal"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/50"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="counselling-modal-title"
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b">
          <h2 id="counselling-modal-title" className="text-xl sm:text-2xl font-extrabold text-darkBlue">
            Book a 1:1 Counselling Session
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body / Form */}
        <div className="p-4 sm:p-6">
          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Full Name*</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                className="h-11 rounded-xl border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g., Mahima Gupta"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Email*</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                className="h-11 rounded-xl border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Phone (with country code)*</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={onChange}
                className="h-11 rounded-xl border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-black"
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Course Interest</label>
              <select
                name="course"
                value={form.course}
                onChange={onChange}
                className="h-11 rounded-xl border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-black bg-white"
              >
                <option value="">Select one (optional)</option>
                <option>Data Analytics</option>
                <option>Data Science</option>
                <option>GenAI / LLMs</option>
                <option>UI/UX Design</option>
                <option>Frontend Development</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Experience</label>
              <select
                name="experience"
                value={form.experience}
                onChange={onChange}
                className="h-11 rounded-xl border border-gray-300 px-3 outline-none focus:ring-2 focus:ring-black bg-white"
              >
                <option value="">Select one (optional)</option>
                <option>Student / Fresher</option>
                <option>0–1 years</option>
                <option>1–3 years</option>
                <option>3+ years</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Goals / Questions</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                className="min-h-[110px] rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                placeholder="Tell us what you want to achieve, or any questions you have."
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-6 rounded-xl bg-black text-white font-bold hover:bg-darkBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50"
                disabled={submitting}
                aria-label="Submit & open WhatsApp"
              >
                {submitting ? 'Opening WhatsApp…' : 'Send details on WhatsApp'}
              </button>
              <button
                type="button"
                className="h-12 px-5 rounded-xl border border-gray-300 font-semibold hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            By submitting, you agree to be contacted on WhatsApp for scheduling your session.
          </p>
        </div>
      </div>
    </div>
  );
}
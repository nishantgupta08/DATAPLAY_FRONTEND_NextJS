'use client';
import React, { useState } from 'react';

type Props = {
  /** WhatsApp phone number in international format without + sign, e.g., 919876543210 */
  whatsAppNumber?: string;
};

const CounsellingForm: React.FC<Props> = ({ whatsAppNumber }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    experience: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const number =
    whatsAppNumber ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    '7427071631'; // TODO: replace with your official number

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill in your name, email, and phone.');
      return;
    }
    setSubmitting(true);
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
  };

  return (
    <section id="contact-us" className="bg-white py-10 sm:py-14">
      {/* Hide by default; show when URL hash is #contact-us */}
      <style jsx global>{`
        #contact-us { display: none; }
        #contact-us:target { display: block; }
        /* Sticky header offset when scrolled into view */
        #contact-us { scroll-margin-top: 90px; }
      `}</style>

      <div className="container max-w-5xl px-4 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-darkBlue mb-2">
          Book a 1:1 Counselling Session
        </h2>
        <p className="text-gray-600 mb-6">
          Share a few details and we&apos;ll take you to WhatsApp with everything pre-filled.
        </p>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 sm:p-6 rounded-2xl shadow"
        >
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
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Phone (with country code)*
            </label>
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

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-6 rounded-xl bg-black text-white font-bold hover:bg-darkBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50"
              disabled={submitting}
              aria-label="Submit & open WhatsApp"
            >
              {submitting ? 'Opening WhatsApp…' : 'Send details on WhatsApp'}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 mt-3">
          By submitting, you agree to be contacted on WhatsApp for scheduling your session.
        </p>
      </div>
    </section>
  );
};

export default CounsellingForm;
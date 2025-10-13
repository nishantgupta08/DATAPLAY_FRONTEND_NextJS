"use client";

import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Icon } from "@iconify/react";
import cx from "classnames";

type MentorForm = {
  name: string;
  email: string;
  linkedin: string;
  expertise: string;
  experienceYears: string; // keep as string for input control
  availability: string;
  notes: string;
};

const INITIAL_FORM: MentorForm = {
  name: "",
  email: "",
  linkedin: "",
  expertise: "",
  experienceYears: "",
  availability: "",
  notes: "",
};

function isEmail(v: string): boolean {
  // simple but strict enough for UI validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function BecomeMentorInlineForm() {
  // visible by default so users always see the inline form
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<MentorForm>(INITIAL_FORM);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name as keyof MentorForm]: value }));
  };

  const validate = (f: MentorForm): string | null => {
    if (!f.name.trim()) return "Please enter your full name.";
    if (!isEmail(f.email)) return "Please enter a valid email address.";
    if (!f.expertise.trim()) return "Please enter your primary expertise.";
    if (f.experienceYears && Number.isNaN(Number(f.experienceYears))) {
      return "Years of experience must be a number.";
    }
    if (!f.availability.trim()) return "Please tell us your availability.";
    return null;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    const problem = validate(form);
    if (problem) {
      setError(problem);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to submit. Please try again.");
      setSuccess("Thanks! We’ll review your profile and get back to you shortly.");
      setForm(INITIAL_FORM);
      // keep it open to show success; toggle if you prefer:
      // setOpen(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="become-mentor" className="container my-12">
      {/* CTA Bar */}
      <div className="rounded-2xl p-5 md:p-6 bg-[#FFEFEF] border border-[#FFB7B2] shadow-[6px_6px_0_#FF2714]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 md:size-12 rounded-full bg-[#FFB7B2] grid place-items-center shadow-[4px_4px_0_#000]">
              <Icon icon="solar:hand-heart-bold" className="size-6 md:size-7 text-black" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-extrabold text-black leading-tight">
                Want to become a Mentor?
              </h3>
              <p className="text-sm md:text-base text-black/70">
                Share your expertise and guide learners. Quick 60-second signup.
              </p>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={cx(
                "inline-flex items-center justify-center px-5 py-3 rounded-full font-bold",
                "bg-black text-white border-2 border-black hover:translate-y-[-1px] active:translate-y-[1px]",
                "transition-transform"
              )}
              aria-expanded={open}
              aria-controls="mentor-form"
            >
              {open ? "Hide form" : "Become a mentor"}
            </button>
            <a
              href="#contact-us"
              className={cx(
                "inline-flex items-center justify-center px-5 py-3 rounded-full font-bold",
                "bg-white text-black border-2 border-black hover:translate-y-[-1px] active:translate-y-[1px]",
                "transition-transform"
              )}
            >
              Talk to us
            </a>
          </div>
        </div>

        {/* Collapsible */}
        <div
          id="mentor-form"
          className={cx(
            "grid transition-all duration-300 overflow-hidden",
            open ? "mt-6 grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="min-h-0">
            <form
              onSubmit={onSubmit}
              className="grid gap-4 md:grid-cols-2 bg-white rounded-xl p-4 md:p-6 border-2 border-black"
              noValidate
            >
              {/* Name */}
              <div className="grid gap-2">
                <label htmlFor="name" className="font-semibold">Full Name</label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={onChange}
                  className="px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Alex Johnson"
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <label htmlFor="email" className="font-semibold">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  className="px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="alex@email.com"
                />
              </div>

              {/* LinkedIn */}
              <div className="grid gap-2">
                <label htmlFor="linkedin" className="font-semibold">LinkedIn</label>
                <input
                  id="linkedin"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={onChange}
                  className="px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="https://linkedin.com/in/…"
                />
              </div>

              {/* Expertise */}
              <div className="grid gap-2">
                <label htmlFor="expertise" className="font-semibold">Primary Expertise</label>
                <input
                  id="expertise"
                  name="expertise"
                  required
                  value={form.expertise}
                  onChange={onChange}
                  className="px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Data Engineering, GenAI, Product Analytics…"
                />
              </div>

              {/* Years of experience */}
              <div className="grid gap-2">
                <label htmlFor="experienceYears" className="font-semibold">Years of Experience</label>
                <input
                  id="experienceYears"
                  name="experienceYears"
                  type="number"
                  min={0}
                  max={50}
                  required
                  value={form.experienceYears}
                  onChange={onChange}
                  className="px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="5"
                />
              </div>

              {/* Availability */}
              <div className="grid gap-2">
                <label htmlFor="availability" className="font-semibold">Availability</label>
                <input
                  id="availability"
                  name="availability"
                  required
                  value={form.availability}
                  onChange={onChange}
                  className="px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="2 hrs/week, weekends only, etc."
                />
              </div>

              {/* Notes */}
              <div className="md:col-span-2 grid gap-2">
                <label htmlFor="notes" className="font-semibold">Anything else</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={onChange}
                  className="px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  placeholder="Share domains you’re excited to mentor in."
                />
              </div>

              {/* Actions */}
              <div className="md:col-span-2 flex items-center gap-3">
                <button
                  type="submit"
                  className={cx(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold",
                    "bg-[#FF2714] text-white border-2 border-black",
                    "hover:translate-y-[-1px] active:translate-y-[1px] transition-transform"
                  )}
                  disabled={loading}
                >
                  <Icon icon="mdi:rocket-launch-outline" className="size-5" />
                  {loading ? "Submitting…" : "Submit application"}
                </button>
                {success && <span className="text-green-700 font-medium">{success}</span>}
                {error && <span className="text-red-700 font-medium">{error}</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

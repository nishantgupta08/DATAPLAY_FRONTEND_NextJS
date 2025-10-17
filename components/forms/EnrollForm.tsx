// components/EnrollForm.tsx
"use client";

import * as React from "react";
import { JSX } from "react";

const SALES_NUMBER = "7427071631"; // your WhatsApp number, no leading +

function openWhatsApp(payload: { name: string; program: string; experience?: string }) {
  const text = encodeURIComponent(
    `Hi DataPlay, I'm interested in ${payload.program}.
Name: ${payload.name}
Experience: ${payload.experience ?? "-"}`
  );
  window.open(`https://wa.me/${SALES_NUMBER}?text=${text}`, "_blank");
}

export default function EnrollForm(): JSX.Element {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const lead = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: `${fd.get("cc")}${fd.get("phone")}`,
      program: String(fd.get("program") ?? ""),
      experience: String(fd.get("experience") ?? ""),
      company: String(fd.get("company") ?? ""),
      whatsappOptIn: !!fd.get("whatsappOptIn"),
      consentAt: new Date().toISOString(),
      source: "landing_hero",
    };

    // Save the lead
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (lead.whatsappOptIn) {
      openWhatsApp({ name: lead.name, program: lead.program, experience: lead.experience });
    }

    e.currentTarget.reset();
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-5 sm:p-6 text-white shadow-xl backdrop-blur">
      <h3 className="text-xl font-bold text-center">Talk To Academic Advisor!</h3>

      <form className="mt-4 grid grid-cols-1 gap-3" onSubmit={onSubmit}>
        {/* Program choice */}
        <fieldset className="grid grid-cols-2 gap-2 text-sm">
          <label className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2">
            <input type="radio" name="program" value="Data Engineering" className="accent-[var(--brand-500)]" />
            <span>Data Engineering</span>
          </label>
          <label className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2">
            <input type="radio" name="program" value="Data Analytics" defaultChecked className="accent-[var(--brand-500)]" />
            <span>Data Analytics</span>
          </label>
        </fieldset>

        <input required className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-white/60 focus:border-[var(--brand-400)] focus:outline-none" placeholder="Name" name="name" />
        <input required type="email" className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-white/60 focus:border-[var(--brand-400)] focus:outline-none" placeholder="Email" name="email" />

        <div className="grid grid-cols-[90px,1fr] gap-2">
          <select className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white focus:border-[var(--brand-400)] focus:outline-none" defaultValue="+91" name="cc">
            <option value="+91" className="text-black">+91</option>
            <option value="+1" className="text-black">+1</option>
            <option value="+44" className="text-black">+44</option>
          </select>
          <input required type="tel" className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-white/60 focus:border-[var(--brand-400)] focus:outline-none" placeholder="Phone number" name="phone" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <select required className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white focus:border-[var(--brand-400)] focus:outline-none" defaultValue="" name="experience">
            <option value="" disabled className="text-black">Experience (years)</option>
            <option value="0-1" className="text-black">0–1</option>
            <option value="1-3" className="text-black">1–3</option>
            <option value="3-5" className="text-black">3–5</option>
            <option value="5+" className="text-black">5+</option>
          </select>
          <input className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-white/60 focus:border-[var(--brand-400)] focus:outline-none" placeholder="Company name" name="company" />
        </div>

        <label className="mt-1 flex items-center gap-2 text-xs text-white/80">
          <input name="whatsappOptIn" type="checkbox" className="accent-[var(--brand-500)]" />
          Send me details and updates on WhatsApp
        </label>

        <button type="submit" className="mt-2 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] px-4 py-2.5 font-semibold text-white shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--brand-400)]">
          Submit
        </button>
      </form>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useId } from "react";
import { Icon } from "@iconify/react";
import data from "@/data/content.json";

// Inline type + data (pulled from content.json if present)
type FAQItem = { q: string; a: string };

const FALLBACK_FAQS: FAQItem[] = [
  { q: "Who are these programs for?", a: "Beginners and working professionals aiming to upskill in data and design." },
  { q: "Are classes live?", a: "Yes. We run regular live cohorts with lifetime access to recordings." },
  { q: "Do you offer placement support?", a: "We provide resume refactoring, mock interviews, and referrals when possible." },
  { q: "Can I get a refund?", a: "If you’re not satisfied within the trial window, contact support for options." },
];

export default function FAQPage() {
  const items: FAQItem[] =
    (data as any)?.homepage?.faq && Array.isArray((data as any).homepage.faq) && (data as any).homepage.faq.length
      ? (data as any).homepage.faq as FAQItem[]
      : FALLBACK_FAQS;

  // simple single-open accordion state
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const groupId = useId();

  // SEO JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <main className="bg-[#F7EEFA]">
      <section className="container py-10 md:py-14">
        <h1 className="text-3xl md:text-5xl font-extrabold text-black">Frequently Asked Questions</h1>
        <p className="mt-3 text-black/70 max-w-2xl">
          Quick answers about our programs, mentorship, payments, and outcomes.
        </p>

        <div className="mt-8">
          {/* Inline accordion (no separate component) */}
          <div className="divide-y-2 divide-black/10 border-2 border-black rounded-2xl bg-white">
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              const headingId = `${groupId}-faq-h-${i}`;
              const panelId = `${groupId}-faq-p-${i}`;

              return (
                <div key={i} className="p-4 md:p-5">
                  <h2 id={headingId}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between text-left font-bold md:text-lg"
                    >
                      <span>{item.q}</span>
                      <span
                        className={[
                          "inline-flex items-center justify-center size-8 rounded-full border-2 border-black transition-transform",
                          isOpen ? "rotate-45" : "",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        <Icon icon="mdi:plus" />
                      </span>
                    </button>
                  </h2>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className={["grid transition-all duration-300 overflow-hidden", isOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"].join(" ")}
                  >
                    <div className="min-h-0">
                      <p className="text-black/75 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SEO: JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </section>
    </main>
  );
}
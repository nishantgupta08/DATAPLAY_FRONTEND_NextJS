/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useId } from "react";
import { Icon } from "@iconify/react";
import Head from "next/head";
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
    <>
      <Head>
        <title>FAQ - Frequently Asked Questions | Dataplay Data Science Courses</title>
        <meta name="description" content="Get answers to common questions about Dataplay's data science courses, mentorship programs, payment options, and career outcomes. Find everything you need to know before enrolling." />
        <meta name="keywords" content="data science course FAQ, data analyst course questions, data engineering course FAQ, online course support, data science training questions, course enrollment FAQ" />
        <meta name="author" content="Dataplay" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dataplay.co.in/faq" />
        <meta property="og:title" content="FAQ - Frequently Asked Questions | Dataplay Data Science Courses" />
        <meta property="og:description" content="Get answers to common questions about Dataplay's data science courses, mentorship programs, payment options, and career outcomes." />
        <meta property="og:image" content="https://dataplay.co.in/Brand-Logo.svg" />
        <meta property="og:site_name" content="Dataplay" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dataplay.co.in/faq" />
        <meta property="twitter:title" content="FAQ - Dataplay Data Science Courses" />
        <meta property="twitter:description" content="Get answers to common questions about Dataplay's data science courses, mentorship programs, and career outcomes." />
        <meta property="twitter:image" content="https://dataplay.co.in/Brand-Logo.svg" />
        
        {/* Additional SEO */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="geo.position" content="20.5937;78.9629" />
        <meta name="ICBM" content="20.5937, 78.9629" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dataplay.co.in/faq" />
      </Head>
      
      <main className="bg-[#F7EEFA]" itemScope itemType="https://schema.org/FAQPage">
        <section className="container py-10 md:py-14">
          <h1 className="text-3xl md:text-5xl font-extrabold text-black" itemProp="name">Frequently Asked Questions</h1>
          <p className="mt-3 text-black/70 max-w-2xl" itemProp="description">
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
                <div key={i} className="p-4 md:p-5" itemScope itemType="https://schema.org/Question">
                  <h2 id={headingId}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between text-left font-bold md:text-lg"
                      itemProp="name"
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
                    itemScope
                    itemType="https://schema.org/Answer"
                  >
                    <div className="min-h-0">
                      <p className="text-black/75 leading-relaxed" itemProp="text">{item.a}</p>
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
    </>
  );
}
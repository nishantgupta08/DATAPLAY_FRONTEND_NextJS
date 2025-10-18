// FAQ Schema Generator
import type { FAQItem } from '../types';

// Re-export the type for backward compatibility
export type { FAQItem };

export const generateFAQSchema = (faqs: FAQItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Default FAQ data for Dataplay
export const DATAPLAY_FAQS: FAQItem[] = [
  {
    question: "Who are these programs for?",
    answer: "Beginners and working professionals aiming to upskill in data and design."
  },
  {
    question: "Are classes live?",
    answer: "Yes. We run regular live cohorts with lifetime access to recordings."
  },
  {
    question: "Do you offer placement support?",
    answer: "We provide resume refactoring, mock interviews, and referrals when possible."
  },
  {
    question: "Can I get a refund?",
    answer: "If you're not satisfied within the trial window, contact support for options."
  },
  {
    question: "When does the cohort start?",
    answer: "Cohort starts 24 Oct 2025. Classes run 6–8 pm IST."
  },
  {
    question: "How do fees work?",
    answer: "Data Analyst: ₹7,500 upfront + ₹30,000 after placement. Data Engineering: ₹10,000 upfront + ₹30,000 after placement."
  },
  {
    question: "Do I keep access?",
    answer: "Yes, you get lifetime access to updated materials and recordings."
  }
];

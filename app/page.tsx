// app/page.tsx
"use client";

import { useEffect, useState } from "react";

// Import your actual components
import SocialBadge from "@/components/SocialBadge";
import HeroSection from "@/components/HeroSection";
import CounsellingForm from "@/components/CounsellingForm";
import FellowshipPrograms from "@/components/FellowshipPrograms";
import CourseSectionPro from "@/components/CourseSectionPro";
import Mentors from "@/components/Mentors";
import Testimonials from "@/components/Testimonials";
import WhoCanApply from "@/components/WhoCanApply";
import WorkshopGallery from "@/components/WorkshopGallery";

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="counselling-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl outline-none">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 id="counselling-title" className="sr-only">
          Book a Counselling Session
        </h2>
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);

  // Listen for clicks on the "Book Counselling" button in HeroSection
  useEffect(() => {
    const handleClick = (e: Event) => {
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        if (el.hasAttribute("data-counselling-open")) {
          e.preventDefault();
          setOpen(true);
          break;
        }
        el = el.parentElement;
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <>
      {/* Landing sections */}
      <SocialBadge />
      <HeroSection /> {/* <-- ensure your Book Counselling button inside HeroSection has data-counselling-open */}
      <FellowshipPrograms />
      <CourseSectionPro />
      <Mentors />
      <Testimonials />
      <WhoCanApply />
      <WorkshopGallery />

      {/* Modal with blurred background */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <CounsellingForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}
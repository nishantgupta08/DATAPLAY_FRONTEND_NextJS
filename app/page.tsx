// app/page.tsx
"use client";

import { useState } from 'react';

// Example imports — use your actual paths
import SocialBadge from '@/components/SocialBadge';
import HeroSection from '@/components/HeroSection';
import CounsellingForm from '@/components/CounsellingForm';
import FellowshipPrograms from '@/components/FellowshipPrograms';
import CourseSectionPro from '@/components/CourseSectionPro';
import Mentors from '@/components/Mentors';
import Testimonials from '@/components/Testimonials';
import WhoCanApply from '@/components/WhoCanApply';
import WorkshopGallery from '@/components/WorkshopGallery';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100"
          aria-label="Close"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top content */}
      <SocialBadge />
      <HeroSection />

      {/* Trigger: put this wherever you want to open the form */}
      <div className="my-8 flex justify-center">
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:shadow-lg"
        >
          Apply / Open Counselling Form
        </button>
      </div>

      {/* Rest of the page */}
      <FellowshipPrograms />
      <CourseSectionPro />
      <Mentors />
      <Testimonials />
      <WhoCanApply />
      <WorkshopGallery />

      {/* Modal with blurred background */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <CounsellingForm />
      </Modal>
    </>
  );
}
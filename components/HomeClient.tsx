// components/HomeClient.tsx
'use client';

import { useState } from 'react';

// Update these imports to your actual paths
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
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* backdrop with blur; click to close */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* panel */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default function HomeClient() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Optional: blur the underlying content when modal open */}
      <div className={open ? 'blur-sm pointer-events-none' : ''}>
        <SocialBadge />
        <HeroSection />
        <div className="my-8 flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:shadow-lg"
          >
            Apply / Open Counselling Form
          </button>
        </div>
        <FellowshipPrograms />
        <CourseSectionPro />
        <Mentors />
        <Testimonials />
        <WhoCanApply />
        <WorkshopGallery />
      </div>

      {/* Modal overlay lives outside the blurred container */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <CounsellingForm />
      </Modal>
    </>
  );
}
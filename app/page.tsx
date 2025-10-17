// app/page.tsx
"use client";

import { useEffect, useState, memo, Suspense, useMemo } from "react";
import dynamic from "next/dynamic";

// Lazy load components for better performance with loading states
const SocialBadge = dynamic(() => import("@/components/ui/SocialBadge"), {
  loading: () => <div className="h-8 w-8 animate-pulse bg-gray-200 rounded" />,
  ssr: false,
});

const HeroSection = dynamic(() => import("@/components/sections/HeroSection"), {
  loading: () => <div className="h-96 bg-gradient-to-r from-blue-50 to-indigo-50 animate-pulse" />,
});

const CounsellingForm = dynamic(() => import("@/components/forms/CounsellingForm"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: false,
});

const FellowshipPrograms = dynamic(() => import("@/components/sections/FellowshipPrograms"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
});

const CourseSectionPro = dynamic(() => import("@/components/sections/CourseSectionPro"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
});

const Mentors = dynamic(() => import("@/components/sections/Mentors"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
});

const WhoCanApply = dynamic(() => import("@/components/sections/WhoCanApply"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
});

const WorkshopGallery = dynamic(() => import("@/components/sections/WorkshopGallery"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
});

const IndiaLocationsSection = dynamic(() => import("@/components/sections/IndiaLocationsSection"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
});

const Modal = dynamic(() => import("@/components/ui/Modal"), {
  loading: () => null,
  ssr: false,
});

const Home = memo(function Home() {
  const [open, setOpen] = useState(false);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleModalOpen = useMemo(() => {
    return (e: Event) => {
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
  }, []);

  // Listen for clicks on the "Book Counselling" button in HeroSection
  useEffect(() => {
    document.addEventListener("click", handleModalOpen);
    return () => document.removeEventListener("click", handleModalOpen);
  }, [handleModalOpen]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  // Memoize modal props to prevent unnecessary re-renders
  const modalProps = useMemo(() => ({
    open,
    onClose: () => setOpen(false),
  }), [open]);

  return (
    <>
      {/* Landing sections with Suspense for lazy loading */}
      <Suspense fallback={<div className="h-16 bg-gray-100 animate-pulse" />}>
        <SocialBadge />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <FellowshipPrograms />
      </Suspense>
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <CourseSectionPro />
      </Suspense>
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <Mentors />
      </Suspense>
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <WhoCanApply />
      </Suspense>
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <WorkshopGallery />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <IndiaLocationsSection />
      </Suspense>

      {/* Modal with blurred background */}
      <Modal {...modalProps}>
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
          <CounsellingForm onSuccess={() => setOpen(false)} />
        </Suspense>
      </Modal>
    </>
  );
});

export default Home;
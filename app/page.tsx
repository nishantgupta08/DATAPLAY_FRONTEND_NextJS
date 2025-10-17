// app/page.tsx
"use client";

import { useEffect, useState, memo, Suspense, lazy } from "react";

// Lazy load components for better performance
const SocialBadge = lazy(() => import("@/components/ui/SocialBadge"));
const HeroSection = lazy(() => import("@/components/sections/HeroSection"));
const CounsellingForm = lazy(() => import("@/components/forms/CounsellingForm"));
const FellowshipPrograms = lazy(() => import("@/components/sections/FellowshipPrograms"));
const CourseSectionPro = lazy(() => import("@/components/sections/CourseSectionPro"));
const Mentors = lazy(() => import("@/components/sections/Mentors"));
const Testimonials = lazy(() => import("@/components/sections/Testimonials"));
const WhoCanApply = lazy(() => import("@/components/sections/WhoCanApply"));
const WorkshopGallery = lazy(() => import("@/components/sections/WorkshopGallery"));
const Modal = lazy(() => import("@/components/ui/Modal"));

const Home = memo(function Home() {
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

      {/* Modal with blurred background */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
          <CounsellingForm onSuccess={() => setOpen(false)} />
        </Suspense>
      </Modal>
    </>
  );
});

export default Home;
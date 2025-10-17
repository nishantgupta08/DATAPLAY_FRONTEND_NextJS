// app/page.tsx
"use client";

import { useEffect, useState, memo, Suspense, lazy } from "react";

// Lazy load components for better performance
const SocialBadge = lazy(() => import("@/components/SocialBadge"));
const HeroSection = lazy(() => import("@/components/HeroSection"));
const CounsellingForm = lazy(() => import("@/components/CounsellingForm"));
const FellowshipPrograms = lazy(() => import("@/components/FellowshipPrograms"));
const CourseSectionPro = lazy(() => import("@/components/CourseSectionPro"));
const Mentors = lazy(() => import("@/components/Mentors"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const WhoCanApply = lazy(() => import("@/components/WhoCanApply"));
const WorkshopGallery = lazy(() => import("@/components/WorkshopGallery"));
const Modal = lazy(() => import("@/components/Modal"));

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
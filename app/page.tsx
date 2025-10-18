// app/page.tsx
"use client";

import { useEffect, useState, memo, Suspense, useMemo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import PerformanceOptimizer from "@/components/seo/PerformanceOptimizer";

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

  // SEO structured data for homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dataplay",
    "description": "Data Science Learning Platform with structured paths, interview prep, and real-world projects",
    "url": "https://dataplay.co.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dataplay.co.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dataplay",
      "url": "https://dataplay.co.in",
      "logo": "https://dataplay.co.in/Brand-Logo.svg"
    }
  };

  return (
    <>
      <PerformanceOptimizer trackMetrics={true} reportToAnalytics={true} />
      <Head>
        <title>Dataplay - Data Science Learning Platform | Master Data Analysis & Engineering</title>
        <meta name="description" content="Master data science with Dataplay's comprehensive courses. Learn Python, SQL, machine learning, and data engineering. Join 1000+ students across India. Expert mentors, real projects, job placement assistance." />
        <meta name="keywords" content="data science course, data analyst course, data engineering course, python course, SQL course, machine learning, data science training, online data science course, data science certification, data science bootcamp, data science fellowship, India" />
        <meta name="author" content="Dataplay" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dataplay.co.in" />
        <meta property="og:title" content="Dataplay - Data Science Learning Platform | Master Data Analysis & Engineering" />
        <meta property="og:description" content="Master data science with comprehensive courses. Learn Python, SQL, ML, and data engineering. Join 1000+ students across India. Expert mentors, real projects, job placement assistance." />
        <meta property="og:image" content="https://dataplay.co.in/Brand-Logo.svg" />
        <meta property="og:site_name" content="Dataplay" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dataplay.co.in" />
        <meta property="twitter:title" content="Dataplay - Data Science Learning Platform" />
        <meta property="twitter:description" content="Master data science with comprehensive courses. Learn Python, SQL, ML, and data engineering. Join 1000+ students across India." />
        <meta property="twitter:image" content="https://dataplay.co.in/Brand-Logo.svg" />
        
        {/* Additional SEO */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="geo.position" content="20.5937;78.9629" />
        <meta name="ICBM" content="20.5937, 78.9629" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dataplay.co.in" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
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
      <Modal {...modalProps}>
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
          <CounsellingForm onSuccess={() => setOpen(false)} />
        </Suspense>
      </Modal>
    </>
  );
});

export default Home;
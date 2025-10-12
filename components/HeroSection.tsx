/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import data from "@/app/assets/content.json";

/**
 * Hero with:
 * - Bold headline + subhead from content.json
 * - Primary/secondary CTAs
 * - CLICKABLE trust badges (Google reviews + LinkedIn community)
 * - Right-side hero image (public/hero-img.png)
 * - Overlay “100% Satisfied Students” badge (public/satisfied-students.svg)
 */
const HeroSection = () => {
  const hero = data.homepage.hero;

  return (
    <section id="home" className="relative bg-[#F7EEFA] overflow-hidden" aria-label="Hero">
      <div className="container">
        <div className="grid lg:grid-cols-2 2xl:gap-20 lg:gap-10 items-center">
          {/* Left */}
          <div className="relative py-14 md:py-18">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-black shadow-[4px_4px_0_#000] mb-5">
              <span className="text-xs font-bold uppercase tracking-wide text-black/80">
                {hero?.tag_line?.normal_text ?? "Never Stop"}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#CDB6FF] text-[11px] font-extrabold tracking-wide">
                {hero?.tag_line?.highlighted_text ?? "Learning"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-extrabold leading-tight text-black">
              {hero?.heading ?? "Empowering Careers In DATA and"}
              <span className="relative inline-block">
                {hero?.underline_heading ?? " Design"}
                <svg
                  width="227"
                  height="16"
                  className="absolute top-full left-0"
                  viewBox="0 0 227 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1.5 10c70 0 155-3 224 0" stroke="#FF2714" strokeWidth="8" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-4 text-base md:text-lg text-black/70 max-w-xl">
              {hero?.sub_heading ?? "Let's Sculpt YOUR Path To Success, YOUR Way !"}
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href="#become-mentor"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold bg-black text-white border-2 border-black shadow-[6px_6px_0_#FF2714] hover:translate-y-[-1px] active:translate-y-[1px] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-label="Become a Mentor - open the mentor form"
              >
                <Icon icon="mdi:rocket-launch-outline" className="mr-2 text-xl" />
                Become a Mentor
              </a>
              <a
                href="#courses"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold bg-white text-black border-2 border-black hover:translate-y-[-1px] active:translate-y-[1px] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-label="Explore Courses"
              >
                Explore Courses
                <Icon icon="mdi:arrow-right" className="ml-2 text-xl" />
              </a>
            </div>

            {/* Trust badges (CLICKABLE) */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {/* Upskilled stat (static) */}
              <div className="group rounded-2xl bg-white border-2 border-black p-4 text-center shadow-[4px_4px_0_#000]">
                <div className="mx-auto mb-2 size-11 rounded-full grid place-items-center border-2 border-black">
                  <Icon icon="mdi:school-outline" className="text-xl" />
                </div>
                <div className="text-sm font-bold text-black">3K+ Upskilled</div>
              </div>

              {/* Google Rating (CLICKABLE) */}
              <a
                href="https://www.google.com/search?q=dataplay+reviews" // <— replace with your reviews URL
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-white border-2 border-black p-4 text-center shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#FF2714] transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-label="Open Google reviews"
                title="Open Google reviews"
              >
                <div className="mx-auto mb-2 size-11 rounded-full grid place-items-center border-2 border-black">
                  <Icon icon="mdi:google" className="text-xl" />
                </div>
                <div className="text-sm font-bold text-black">
                  4.9 <span className="text-yellow-500">★</span> Google Rating
                </div>
                <div className="mt-1 text-[11px] text-black/60 underline decoration-dotted group-hover:no-underline">
                  Read reviews
                </div>
              </a>

              {/* LinkedIn (CLICKABLE) */}
              <a
                href="https://www.linkedin.com/company/data-play/"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-white border-2 border-black p-4 text-center shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#FF2714] transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-label="Open our LinkedIn community"
                title="Open our LinkedIn community"
              >
                <div className="mx-auto mb-2 size-11 rounded-full grid place-items-center border-2 border-black">
                  <Icon icon="mdi:linkedin" className="text-xl" />
                </div>
                <div className="text-sm font-bold text-black">9K+ Community</div>
                <div className="mt-1 text-[11px] text-black/60 underline decoration-dotted group-hover:no-underline">
                  Follow on LinkedIn
                </div>
              </a>
            </div>
          </div>

          {/* Right (image + overlay badge) */}
          <div className="relative mt-10 lg:mt-0">
            {/* Main hero image (use your public asset) */}
            <Image
              src="/hero-img.png"
              alt="Learner pointing to growth"
              width={720}
              height={620}
              className="w-full h-auto drop-shadow-xl"
              priority
            />

            {/* 100% Satisfied Students badge (overlay + clickable) */}
            <a
              href="https://www.google.com/search?q=dataplay+reviews" // <— replace if needed
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-1/2 -translate-x-1/2 top-6 md:top-8 rounded-xl bg-white/95 backdrop-blur border-2 border-black shadow-[6px_6px_0_#6B5AED] px-4 py-2 hover:shadow-[8px_8px_0_#FF2714] transition-shadow"
              aria-label="Open Google reviews"
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/satisfied-students.svg"
                  alt="100% Satisfied Students"
                  width={210}
                  height={54}
                  className="h-10 w-auto"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

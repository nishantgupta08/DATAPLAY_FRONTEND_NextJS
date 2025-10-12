/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import data from "@/app/assets/content.json";

/**
 * HeroSection (rewritten)
 * - Pulls copy from content.json: tag_line, heading, underline_heading, sub_heading
 * - Clear CTAs
 * - Clickable overlay badge (Google Rating) on the hero image
 * - No bottom stat cards (per request)
 */
const HeroSection = () => {
  const hero = data?.homepage?.hero ?? {};

  return (
    <section id="home" className="relative bg-[#F7EEFA] overflow-hidden" aria-label="Hero">
      <div className="container">
        <div className="grid lg:grid-cols-2 2xl:gap-20 lg:gap-12 items-center">
          {/* Left column: copy + CTAs */}
          <div className="relative py-14 md:py-18">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-black shadow-[4px_4px_0_#000] mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wide text-black/80">
                {(hero.tag_line && hero.tag_line.normal_text) || "Never Stop"}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#CDB6FF] text-[11px] font-extrabold tracking-wide">
                {(hero.tag_line && hero.tag_line.highlighted_text) || "Learning"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-extrabold leading-tight text-black">
              {hero?.heading ?? "Empowering Careers In DATA and"}
              <span className="relative inline-block">
                {hero?.underline_heading ?? " Design"}
                {/* Underline accent */}
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
                aria-label="Become a Mentor"
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
          </div>

          {/* Right column: hero image + overlay badge */}
          <div className="relative mt-10 lg:mt-0">
            {/* Main hero image (uses existing asset) */}
            <Image
              src="/hero-img2.png"
              alt="Learner pointing to growth"
              width={720}
              height={620}
              className="w-full h-auto drop-shadow-xl"
              priority
            />

            {/* Clickable overlay: Google Rating */}
            <a
              href="https://www.google.com/search?q=dataplay+reviews" // TODO: replace with your exact reviews URL
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-1/2 -translate-x-1/2 top-6 md:top-8 rounded-xl bg-white/95 backdrop-blur border-2 border-black shadow-[6px_6px_0_#6B5AED] px-4 py-2 hover:shadow-[8px_8px_0_#FF2714] transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              aria-label="Open Google reviews"
              title="Open Google reviews"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center size-7 rounded-full border-2 border-black">
                  {/* Google icon (inline SVG to avoid loader issues) */}
                  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M21.35 11.1H12v2.9h5.38C16.98 16.14 15.09 17.5 12 17.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5c1.65 0 3.15.62 4.29 1.63l2.06-2.06C16.76 2.65 14.49 1.75 12 1.75 6.89 1.75 2.75 5.89 2.75 11S6.89 20.25 12 20.25c5.04 0 8.75-3.53 8.75-8.5 0-.52-.06-1.05-.17-1.55z"
                    />
                  </svg>
                </span>
                <span className="text-sm font-extrabold tracking-tight">4.9</span>
                <span className="text-yellow-500 text-sm">★</span>
                <span className="text-sm font-semibold">Google Rating</span>
                <span className="ml-2 text-[11px] text-black/60 underline decoration-dotted">Read reviews</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

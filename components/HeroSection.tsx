/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import data from "@/app/assets/content.json";

/**
 * Compact, conversion-focused hero
 * - Copy from content.json (tag_line, heading, underline_heading, sub_heading)
 * - CTAs: Become a Mentor / Explore Courses
 * - Clickable overlay: 4.9★ Google Rating
 * - Bottom band: 4 feature cards with no extra top/side spacing
 */
const HeroSection = () => {
  const hero = data?.homepage?.hero ?? {};
  const featuresData: string[] = data?.homepage?.features ?? [];

  const featureCards = [
    { icon: "/lifetime.png",       title: featuresData[0] || "Lifetime Access to Live Classes" },
    { icon: "/bytheindustry.png",  title: featuresData[1] || "By the Industry For the Industry" },
    { icon: "/resume.png",         title: featuresData[2] || "Resume Refactoring & Mock Interviews" },
    { icon: "/money.png",          title: featuresData[3] || "Affordability meets Quality" },
  ];

  return (
    <section id="home" className="relative bg-[#F7EEFA] bg-green-300 overflow-hidden" aria-label="Hero">
      <div className="container-fluid p-5 bg-red-500">
        {/* Main row */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-8 items-center min-h-[520px] md:min-h-[560px]">
          {/* Left column: copy + CTAs */}
          <div className="relative py-6 md:py-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-black shadow-[4px_4px_0_#000] mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wide text-black/80">
                {(hero?.tag_line && hero.tag_line.normal_text) || "Never Stop"}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#CDB6FF] text-[11px] font-extrabold tracking-wide">
                {(hero?.tag_line && hero.tag_line.highlighted_text) || "Learning"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-extrabold leading-[1.05] text-black max-w-[18ch]">
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
            <p className="mt-3 text-base md:text-lg text-black/70 max-w-xl">
              {hero?.sub_heading ?? "Let's Sculpt YOUR Path To Success, YOUR Way !"}
            </p>

            {/* CTAs */}
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
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

          {/* Right column: image anchored to the edge + overlay */}
          <div className="relative mt-3 lg:mt-0 justify-self-end lg:-mr-6 xl:-mr-10">
            <Image
              src="/hero-img3.png"
              alt="Learner pointing to growth"
              width={720}
              height={620}
              className="h-auto drop-shadow-xl w-[520px] sm:w-[560px] lg:w-[620px] xl:w-[680px]"
              priority
            />

            {/* Clickable Google Rating overlay */}
            <a
              href="https://www.google.com/search?q=dataplay+reviews" // replace with your exact reviews URL
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-[60%] -translate-x-1/2 top-3 md:top-4 rounded-xl bg-white/95 backdrop-blur border-2 border-black shadow-[6px_6px_0_#6B5AED] px-4 py-2 hover:shadow-[8px_8px_0_#FF2714] transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              aria-label="Open Google reviews"
              title="Open Google reviews"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center size-7 rounded-full border-2 border-black">
                  {/* Google icon (inline SVG) */}
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

        {/* Bottom band: four feature cards (no extra top/side spacing) */}
        {/* mt-0 removes the top gap; -mx-* removes side gutters; each item re-adds px to keep spacing even */}
        <div className="mt-0 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {featureCards.map((f, i) => (
              <div key={i} className="px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-white border-2 border-black p-4 sm:p-5 text-left shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#FF2714] transition-shadow">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl border-2 border-black overflow-hidden">
                      <Image src={f.icon} alt={f.title} width={28} height={28} className="w-7 h-7 object-contain" />
                    </span>
                    <h3 className="text-sm sm:text-base font-bold leading-snug text-black">{f.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

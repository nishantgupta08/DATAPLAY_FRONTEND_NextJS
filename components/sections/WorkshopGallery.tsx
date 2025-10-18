"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import data from "@/data/content.json";

// 1. Import Swiper components and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// 2. Import Swiper styles (make sure these are available in your project)
import "swiper/css";
import "swiper/css/navigation";

import { LinkedInMeta, WorkshopItem } from "@/types";
import { getSafeImageUrl } from "@/utils";

function formatDate(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
}


function linkedinHref(li?: LinkedInMeta | null): string | null {
  if (!li) return null;
  if (li.url) return li.url;
  if (li.urn)
    return `https://www.linkedin.com/feed/update/${encodeURIComponent(li.urn)}`;
  return null;
}

// --- Workshop Card Component (for cleanliness) ---

// This function component encapsulates the card's rendering logic,
// making the main component clearer and the card reusable.
function WorkshopCard({ w, i }: { w: WorkshopItem; i: number }) {
  const liHref = linkedinHref(w.linkedin);
  const showAtt = typeof w.attendees === "number" && w.attendees > 0;
  const showSat =
    typeof w.satisfaction === "number" && w.satisfaction > 0;

  return (
    <article
      key={`${w.college}-${w.date}-${i + 100}`}
      role="listitem"
      className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition h-full flex flex-col" // Added flex-col for consistent card height in Swiper
    >
      {/* Cover (no 'View feedback' overlay anymore) */}
      <div className="relative aspect-[4/3]">
        <Image
          src={getSafeImageUrl(w.cover, 'workshop')}
          alt={`${w.college} workshop cover`}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          priority={i < 3}
        />
        {/* Subtle hover tint */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/35 to-black/0" />
        {/* Whole image clickable (opens LinkedIn) if we have a link */}
        {liHref && (
          <a
            href={liHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open LinkedIn (opens in new tab)"
            className="absolute inset-0"
            title="Open in LinkedIn"
          />
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="min-w-0">
          <h3 className="text-[15px] font-extrabold leading-snug text-slate-900">
            {w.college}
            {w.city ? (
              <span className="text-slate-500 font-semibold"> • {w.city}</span>
            ) : null}
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            {formatDate(w.date)}
          </p>

          {/* Meta chips (hide zeros) */}
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
            {showAtt && (
              <span className="px-2 py-1 rounded-full border">
                {w.attendees} attendees
              </span>
            )}
            {showSat && (
              <span className="px-2 py-1 rounded-full border">
                {w.satisfaction}% positive
              </span>
            )}
            {w.speakers?.length ? (
              <span className="px-2 py-1 rounded-full border">
                Speakers: {w.speakers.slice(0, 2).join(", ")}
                {w.speakers.length > 2 ? " +" + (w.speakers.length - 2) : ""}
              </span>
            ) : null}
          </div>
        </div>

        {/* Action — keep only “Open in LinkedIn” button below (optional) */}
        {liHref && (
          <div className="mt-3">
            <a
              href={liHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-black border-2 border-black text-xs font-bold hover:-translate-y-0.5 transition"
            >
              Open in LinkedIn
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 17L17 7M17 7H9M17 7V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

// --- WorkshopsGallery Component (Updated with Swiper) ---

export default function WorkshopsGallery() {
  const block = data.workshops ?? {};
  
  // Memoize items to prevent unnecessary re-renders
  const items: WorkshopItem[] = useMemo(() => {
    return (block.items ?? []) as WorkshopItem[];
  }, [block.items]);

  // Aggregate stats; hide when they would be 1/0/0%
  const stats = useMemo(() => {
    if (!items.length)
      return { count: 0, avgSat: null as number | null, totalAtt: 0 };
    const sats = items.map((i) => i.satisfaction ?? 0);
    const avgSat = Math.round(
      sats.reduce((a, b) => a + b, 0) / sats.length
    );
    const totalAtt = items.reduce((a, b) => a + (b.attendees ?? 0), 0);
    return { count: items.length, avgSat, totalAtt };
  }, [items]);

  const showCount = stats.count > 1;
  const showAttendees = stats.totalAtt > 0;
  const showAvgSat = (stats.avgSat ?? 0) > 0;
  const showAnyStat = showCount || showAttendees || showAvgSat;

  // Render a standard grid if there are 3 or fewer items, or if no items exist.
  // Use Swiper only when there are more than 3 items to justify a carousel.
  const useCarousel = items.length > 3;

  const renderWorkshopCards = () => {
    return items.map((w, i) => {
      const key = `${w.college}-${w.date}-${i}`;
      if (useCarousel) {
        return (
          <SwiperSlide className="h-auto pb-2" key={key}>
            <WorkshopCard w={w} i={i} />
          </SwiperSlide>
        );
      }

      // Static grid
      return <WorkshopCard w={w} i={i} key={key} />;
    });
  };

  return (
    <section id="workshops" className="bg-[#F7EEFA] py-10 md:py-14">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-black">
              {block.title ?? "Campus Workshops"}
            </h2>
            <p className="mt-1 text-black/70">
              {block.subtitle ?? "Real sessions. Real feedback from colleges."}
            </p>
          </div>

          {/* Quick stats — only when meaningful */}
          {showAnyStat && (
            <div className="inline-flex flex-wrap items-center gap-2">
              {showCount && (
                <span className="px-3 py-1.5 rounded-full border-2 border-black bg-white text-sm font-bold">
                  {stats.count} workshops
                </span>
              )}
              {showAttendees && (
                <span className="px-3 py-1.5 rounded-full border-2 border-black bg-white text-sm font-bold">
                  {stats.totalAtt.toLocaleString()} attendees
                </span>
              )}
              {showAvgSat && (
                <span className="px-3 py-1.5 rounded-full border-2 border-black bg-white text-sm font-bold">
                  {stats.avgSat}% satisfaction
                </span>
              )}
            </div>
          )}
        </div>

        {/* --- Workshop Cards: Swiper or Grid --- */}
        {useCarousel ? (
          // Swiper for 4 or more items
          <div className="relative mt-6" role="list" aria-label="Workshop gallery">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              loop={true}
              navigation={{
                nextEl: ".swiper-button-next-workshops",
                prevEl: ".swiper-button-prev-workshops",
              }}
              // Autoplay is often good for carousels, adjust delay as needed
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                // Adjust breakpoints to show 1, 2, or 3 cards at once
                640: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 32 },
              }}
              className="workshops-swiper !px-4"
            >
              {renderWorkshopCards()}
            </Swiper>

            {/* Navigation Buttons (copied from Testimonials for consistency) */}
            <button className="cursor-pointer swiper-button-prev-workshops absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange hover:bg-darkOrange text-black  w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition duration-300 shadow-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="cursor-pointer swiper-button-next-workshops absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange hover:bg-darkOrange text-black  w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition duration-300 shadow-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : (
          // Static Grid for 3 or fewer items
          <div
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            role="list"
            aria-label="Workshop gallery"
          >
            {renderWorkshopCards()}
          </div>
        )}
      </div>
    </section>
  );
}
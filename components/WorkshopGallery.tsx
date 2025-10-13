"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import data from "@/app/assets/content.json";

type LinkedInMeta = { url?: string | null; urn?: string | null };
type WorkshopItem = {
  college: string;
  city?: string | null;
  date: string;                 // ISO date
  cover: string;                // /public path or remote
  attendees?: number | null;
  satisfaction?: number | null; // 0–100
  speakers?: string[] | null;
  linkedin?: LinkedInMeta | null;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function linkedinHref(li?: LinkedInMeta | null): string | null {
  if (!li) return null;
  if (li.url) return li.url;
  if (li.urn) return `https://www.linkedin.com/feed/update/${encodeURIComponent(li.urn)}`;
  return null;
}

export default function WorkshopsGallery() {
  const block = (data as any).workshops ?? {};
  const items: WorkshopItem[] = (block.items ?? []) as WorkshopItem[];

  // Aggregate stats; hide when they would be 1/0/0%
  const stats = useMemo(() => {
    if (!items.length) return { count: 0, avgSat: null as number | null, totalAtt: 0 };
    const sats = items.map(i => i.satisfaction ?? 0);
    const avgSat = Math.round(sats.reduce((a, b) => a + b, 0) / sats.length);
    const totalAtt = items.reduce((a, b) => a + (b.attendees ?? 0), 0);
    return { count: items.length, avgSat, totalAtt };
  }, [items]);

  const showCount = stats.count > 1;
  const showAttendees = stats.totalAtt > 0;
  const showAvgSat = (stats.avgSat ?? 0) > 0;
  const showAnyStat = showCount || showAttendees || showAvgSat;

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

        {/* Grid renders as many cards as you add in content.json */}
        <div
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          role="list"
          aria-label="Workshop gallery"
        >
          {items.map((w, i) => {
            const liHref = linkedinHref(w.linkedin);
            const showAtt = typeof w.attendees === "number" && w.attendees > 0;
            const showSat = typeof w.satisfaction === "number" && w.satisfaction > 0;

            return (
              <article
                key={`${w.college}-${w.date}-${i}`}
                role="listitem"
                className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition"
              >
                {/* Cover (no 'View feedback' overlay anymore) */}
                <div className="relative aspect-[4/3]">
                  <Image
                    src={w.cover}
                    alt={`${w.college} workshop cover`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
                <div className="p-4">
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-extrabold leading-snug text-slate-900">
                      {w.college}
                      {w.city ? <span className="text-slate-500 font-semibold"> • {w.city}</span> : null}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">{formatDate(w.date)}</p>

                    {/* Meta chips (hide zeros) */}
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                      {showAtt && <span className="px-2 py-1 rounded-full border">{w.attendees} attendees</span>}
                      {showSat && <span className="px-2 py-1 rounded-full border">{w.satisfaction}% positive</span>}
                      {w.speakers?.length ? (
                        <span className="px-2 py-1 rounded-full border">
                          Speakers: {w.speakers.slice(0, 2).join(", ")}
                          {w.speakers.length > 2 ? " +" + (w.speakers.length - 2) : ""}
                        </span>
                      ) : null}
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
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
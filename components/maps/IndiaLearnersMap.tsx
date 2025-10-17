import React from "react";
import Image from "next/image";
import { EnrolledStudent } from "@/types";

interface IndiaLearnersMapProps {
  students: EnrolledStudent[];
  mapSrc?: string;
  debugMode?: boolean; // Optional debug mode to show all possible cities
}

function MapPin({ city, items, top, left }: { city: string; items: EnrolledStudent[]; top: number; left: number }) {
  return (
    <div 
      className="pointer-events-auto absolute group cursor-pointer" 
      style={{ 
        top: `${top}%`, 
        left: `${left}%`, 
        transform: "translate(-50%, -50%)" 
      }}
    >
      {/* Pin dot */}
      <div className="relative">
        <div className="h-4 w-4 rounded-full bg-[var(--brand-600)] ring-2 ring-white shadow-lg transition-all duration-200 group-hover:scale-110" />
        <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--brand-400)] opacity-30" />
      </div>

      {/* Tooltip */}
      <div className="invisible absolute left-1/2 top-8 z-20 w-72 -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-4 text-xs text-gray-800 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-gray-900 text-sm">{city}</p>
          <span className="rounded-full bg-[var(--brand-50)] px-2 py-1 text-[10px] font-semibold text-[var(--brand-700)] ring-1 ring-inset ring-[var(--brand-200)]">
            {items.length} {items.length === 1 ? "learner" : "learners"}
          </span>
        </div>
        <ul className="space-y-1">
          {items.slice(0, 3).map((i) => (
            <li key={i.id} className="text-xs line-clamp-1">
              • {i.institute} — <span className="text-gray-600">{i.program}</span>
            </li>
          ))}
          {items.length > 3 && (
            <li className="text-[10px] text-gray-500">+{items.length - 3} more learners…</li>
          )}
        </ul>
        
        {/* Arrow pointing to pin */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45" />
      </div>
    </div>
  );
}

export default function IndiaLearnersMap({ students, mapSrc = "/india-map-border.svg", debugMode = false }: IndiaLearnersMapProps) {
  // Cluster by city (simple grouping)
  const byCity: Record<string, EnrolledStudent[]> = {};
  students.forEach((s) => {
    const city = (s.city || "Unknown").trim();
    if (!byCity[city]) byCity[city] = [];
    byCity[city].push(s);
  });

  // More accurate positions based on actual India map coordinates
  // These positions are calibrated for a standard India map SVG
  const cityPositions: Record<string, { top: number; left: number; cityLabel?: string }> = {
    // FIXED: Jaipur should be in Rajasthan (North-West India)
    Jaipur: { top: 30, left: 35 }, // Rajasthan, North-West India - moved left to Rajasthan
    Rourkela: { top: 40, left: 70 }, // Odisha, East India - adjusted
    Bengaluru: { top: 72, left: 46 }, // Karnataka, South India - moved up
    Hyderabad: { top: 55, left: 50 }, // Telangana, South-Central India - adjusted
    Bhilwara: { top: 32, left: 36 }, // Rajasthan, near Jaipur - close to Jaipur
    // Additional major cities for future use
    Delhi: { top: 20, left: 40 }, // National Capital - moved left
    Mumbai: { top: 45, left: 25 }, // Maharashtra, West India - moved left
    Chennai: { top: 75, left: 65 }, // Tamil Nadu, South India - moved right
    Kolkata: { top: 32, left: 72 }, // West Bengal, East India - moved right
    Pune: { top: 42, left: 28 }, // Maharashtra, West India - adjusted
    Unknown: { top: 50, left: 50 },
  };

  // Create nodes for cities with students
  const nodes = Object.keys(byCity).map((city) => {
    const pos = cityPositions[city] ?? cityPositions["Unknown"];
    return { city, items: byCity[city], top: pos.top, left: pos.left };
  });

  // In debug mode, show all possible cities for positioning reference
  const debugNodes = debugMode ? Object.keys(cityPositions).map((city) => ({
    city,
    items: [{ id: 'debug', institute: 'Debug Mode', program: 'Positioning' }],
    top: cityPositions[city].top,
    left: cityPositions[city].left
  })) : [];

  const displayNodes = debugMode ? debugNodes : nodes;

  const enrolledTotal = students.length;
  const COHORT_CAPACITY = 25;
  const seatsLeft = Math.max(COHORT_CAPACITY - enrolledTotal, 0);
  const fillPct = Math.min(Math.round((enrolledTotal / COHORT_CAPACITY) * 100), 100);

  return (
    <section className="bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Learners Across India</h2>
            <p className="mt-1 text-gray-700">From Jaipur to Bengaluru — a growing community from top institutes.</p>
          </div>

          <div className="mt-2 sm:mt-0 min-w-[220px]">
            <div className="flex items-center justify-between text-xs text-gray-700">
              <span className="uppercase tracking-wide">This cohort</span>
              <span className="font-semibold">{seatsLeft} seats left</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)]" style={{ width: `${fillPct}%` }} />
            </div>
            <p className="mt-1 text-[11px] text-gray-500">{enrolledTotal} learners already enrolled</p>
          </div>
        </div>

        <div className="relative mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          {/* map image with proper aspect ratio */}
          <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
            <Image 
              src={mapSrc} 
              width={800} 
              height={800} 
              alt="India map showing learner locations" 
              className="pointer-events-none w-full h-full object-contain" 
              priority={false}
              loading="lazy"
            />

            {/* overlay pins positioned absolutely within the image container */}
            <div className="absolute inset-0 pointer-events-none">
              {displayNodes.map((n) => (
                <MapPin key={n.city} city={n.city} items={n.items} top={n.top} left={n.left} />
              ))}
            </div>
            
            {/* Fallback message if no students */}
            {nodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-medium">No learners yet</p>
                  <p className="text-sm">Be the first to join!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {students.slice(0, 6).map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{s.institute}</p>
                <p className="truncate text-[11px] text-gray-600">ID: {s.id} • {s.city}</p>
              </div>
              <span className="ml-2 shrink-0 rounded-full bg-[var(--brand-50)] px-2 py-0.5 text-[10px] font-semibold text-[var(--brand-700)] ring-1 ring-inset ring-[var(--brand-200)]">
                {s.program}
              </span>
            </div>
          ))}
          {students.length > 6 && (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">+{students.length - 6} more enrolled…</div>
          )}
        </div>
      </div>
    </section>
  );
}

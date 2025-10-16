// components/IndiaLearnersMap.tsx
import React from "react";

type RawStudent = { id: string; institute: string; program: string };

// ---- Your raw items, normalized from the list you shared ----
const RAW: RawStudent[] = [
  { id: "341533", institute: "Jagannath University, Jaipur", program: "BTech" },
  { id: "322023", institute: "PG Programs in Data Science & Analytics (Jaipur)", program: "BTech" },
  { id: "751030", institute: "NIT Rourkela", program: "MSc" },
  { id: "302031", institute: "Poornima College of Engineering, Jaipur", program: "BTech" },
  { id: "500035", institute: "Dr. BR Ambedkar Open University, Hyderabad", program: "BA" },
  { id: "311001", institute: "Electronics & Computer Engineering (Bhilwara)", program: "B.E" },
  { id: "700118", institute: "IIIT Bangalore (Bengaluru)", program: "PG Diploma" },
  { id: "302034", institute: "Rajasthan University, CS & IT Dept (Jaipur)", program: "M.Sc IT" },
  { id: "302021", institute: "B.Tech (Electronics & Control) — Jaipur", program: "BTech" },
  { id: "302034", institute: "RCEW (Jaipur)", program: "MTech" },
  { id: "302012", institute: "SBCET (Jaipur)", program: "BTech" },
  { id: "302012", institute: "Sri Balaji College of Engineering & Technology (Jaipur)", program: "BTech" },
  { id: "302012", institute: "Maharishi Arvind School of Management Studies (Jaipur)", program: "BCA" },
];

// ---- Cluster by city with approximate coordinates (percent in container) ----
// You can fine-tune top/left for better pin placement on your SVG.
type CityNode = {
  city: string;
  state?: string;
  top: number;  // %
  left: number; // %
  items: RawStudent[];
};

const CITY_MAP: CityNode[] = [
  {
    city: "Jaipur",
    state: "Rajasthan",
    top: 38,
    left: 44,
    items: RAW.filter(r => /Jaipur/i.test(r.institute)),
  },
  {
    city: "Bengaluru",
    state: "Karnataka",
    top: 82,
    left: 55,
    items: RAW.filter(r => /Bangalore|Bengaluru/i.test(r.institute)),
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    top: 67,
    left: 53,
    items: RAW.filter(r => /Hyderabad/i.test(r.institute)),
  },
  {
    city: "Rourkela",
    state: "Odisha",
    top: 48,
    left: 66,
    items: RAW.filter(r => /Rourkela/i.test(r.institute)),
  },
  {
    city: "Bhilwara",
    state: "Rajasthan",
    top: 44,
    left: 43,
    items: RAW.filter(r => /Bhilwara/i.test(r.institute)),
  },
].filter(n => n.items.length > 0);

// Cohort meta (edit as needed)
const COHORT_CAPACITY = 25;
const enrolledCount = RAW.length;
const seatsLeft = Math.max(COHORT_CAPACITY - enrolledCount, 0);
const fillPct = Math.min(Math.round((enrolledCount / COHORT_CAPACITY) * 100), 100);

// Small util for badge text
function pluralize(num: number, one: string, many: string) {
  return num === 1 ? one : many;
}

export default function IndiaLearnersMap({
  mapSrc = "/india-map.svg",
  title = "Learners Across India",
  subtitle = "From Jaipur to Bengaluru and beyond — a growing community from top institutes."
}: {
  mapSrc?: string;
  title?: string;
  subtitle?: string;
}): React.JSX.Element {
  return (
    <section className="bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
            <p className="mt-1 text-gray-700">{subtitle}</p>
          </div>

          {/* seats left + progress */}
          <div className="mt-3 sm:mt-0 min-w-[240px]">
            <div className="flex items-center justify-between text-xs text-gray-700">
              <span className="uppercase tracking-wide">This cohort</span>
              <span className="font-semibold">{seatsLeft} {pluralize(seatsLeft, "seat left", "seats left")}</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)]"
                style={{ width: `${fillPct}%` }}
                aria-hidden
              />
            </div>
            <p className="mt-1 text-[11px] text-gray-500">
              {enrolledCount} {pluralize(enrolledCount, "learner", "learners")} already enrolled
            </p>
          </div>
        </div>

        {/* Map wrapper */}
        <div className="relative mx-auto mt-8 w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          {/* Map image (provide /public/india-map.svg) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mapSrc}
            alt="India map"
            className="pointer-events-none mx-auto w-full max-w-[880px] opacity-95"
          />

          {/* Pins */}
          <div className="pointer-events-none relative -mt-[calc(100%+16px)] h-0 w-full pb-[100%] sm:pb-[70%]">
            {/* Absolutely-positioned overlay layer matching the img's box via padding-bottom trick */}
            {CITY_MAP.map((node) => (
              <Pin key={node.city} {...node} />
            ))}
          </div>
        </div>

        {/* Compact list (optional quick proof) */}
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {RAW.slice(0, 6).map((r) => (
            <div key={r.id + r.institute} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{r.institute}</p>
                <p className="truncate text-[11px] text-gray-600">ID: {r.id}</p>
              </div>
              <span className="ml-2 shrink-0 rounded-full bg-[var(--brand-50)] px-2 py-0.5 text-[10px] font-semibold text-[var(--brand-700)] ring-1 ring-inset ring-[var(--brand-200)]">
                {r.program}
              </span>
            </div>
          ))}
          {RAW.length > 6 && (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">
              +{RAW.length - 6} more enrolled…
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   Pin with Tooltip
=========================== */
function Pin(node: CityNode): React.JSX.Element {
  const { city, state, top, left, items } = node;
  // jitter small offsets for stacked rows in tooltip
  return (
    <div
      className="pointer-events-auto absolute"
      style={{ top: `${top}%`, left: `${left}%`, transform: "translate(-50%, -50%)" }}
    >
      {/* Dot */}
      <div className="group relative">
        <div className="h-3.5 w-3.5 rounded-full bg-[var(--brand-600)] ring-2 ring-white shadow-md" />
        {/* Pulse */}
        <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--brand-400)] opacity-30" />

        {/* Tooltip */}
        <div className="invisible absolute left-1/2 top-6 z-10 w-[260px] -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-xl group-hover:visible">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900">
              {city}{state ? `, ${state}` : ""}
            </p>
            <span className="rounded-full bg-[var(--brand-50)] px-2 py-0.5 text-[10px] font-semibold text-[var(--brand-700)] ring-1 ring-inset ring-[var(--brand-200)]">
              {items.length} {items.length === 1 ? "learner" : "learners"}
            </span>
          </div>
          <ul className="mt-2 space-y-1">
            {items.slice(0, 4).map((i) => (
              <li key={i.id} className="line-clamp-1">
                • {i.institute} — <span className="text-gray-600">{i.program}</span>
              </li>
            ))}
            {items.length > 4 && (
              <li className="text-[11px] text-gray-500">+{items.length - 4} more…</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
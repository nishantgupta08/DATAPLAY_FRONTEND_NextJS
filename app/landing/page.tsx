"use client";
// app/landing/page.tsx
// Optimized landing page with extracted components and performance improvements

import React, { memo, useMemo } from "react";
import Testimonials from "@/components/sections/Testimonials";
import EnrollForm from "@/components/forms/EnrollForm";
import contentJson from "../../data/content.json";
import { JSX } from "react";
import { Expert, Partner, Course, MentorRaw } from "@/types";

// Import extracted components
import StatCard from "@/components/ui/StatCard";
import FeatureCard from "@/components/ui/FeatureCard";
import ExpertCard from "@/components/ui/ExpertCard";
import PartnersRow from "@/components/ui/PartnersRow";
import CourseSection from "@/components/ui/CourseSection";
import IndiaStudentsStats from "@/components/sections/IndiaStudentsStats";
import InteractiveIndiaMap from "@/components/sections/InteractiveIndiaMap";


/* ===========================
   Types - Now imported from centralized types
=========================== */



/* content.json root */
export type ContentRoot =
  | {
      homepage?: { mentors?: { mentors?: MentorRaw[] } };
      mentors?: MentorRaw[];
      experts?: Expert[];
      courses?: Course[];
    }
  | Course[];

function isWrapped(root: ContentRoot): root is Exclude<ContentRoot, Course[]> {
  return (root as { courses?: unknown }).courses !== undefined;
}

/* ===========================
   Data helpers
=========================== */
const CONTENT: ContentRoot = (contentJson as unknown) as ContentRoot;

function getCourseList(raw: ContentRoot | null): Course[] {
  if (!raw) return [];
  return isWrapped(raw) ? (raw.courses ?? []) : (raw as Course[]);
}

function pickTrack(raw: ContentRoot | null, keyword: "analyst" | "engineer"): Course {
  const fallback: Course =
    keyword === "analyst"
      ? {
          id: 1,
          title: "Data Analyst",
          sub_title: "Make businesses smarter with data.",
          img_url: "",
          duration_weeks: 12,
          next_cohort_date: "",
          courses_content: [],
          right_side_video_url: "",
        }
      : {
          id: 2,
          title: "Data Engineering",
          sub_title: "Build reliable data pipelines and platforms.",
          img_url: "",
          duration_weeks: 20,
          next_cohort_date: "",
          courses_content: [],
          right_side_video_url: "",
        };

  const list: Course[] = getCourseList(raw);
  if (list.length === 0) return fallback;

  const needle = keyword === "analyst" ? "analyst" : "engineering";
  return list.find((c) => c.title.toLowerCase().includes(needle)) ?? fallback;
}

function formatCohortDate(raw?: string): string {
  if (!raw) return "";
  const parts = raw.split("-");
  const year = parts[0];
  let month = parts[1] ?? "";
  let day = parts[2] ?? "";
  if (parts.length === 3) {
    const p2 = Number(parts[1]);
    const p3 = Number(parts[2]);
    if (p2 > 12 && p3 <= 12) {
      // YYYY-DD-MM → YYYY-MM-DD
      month = parts[2];
      day = parts[1];
    }
  }
  const iso = `${year}-${month}-${day}`;
  const d = new Date(iso);
  if (!isNaN(d.getTime())) return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return raw;
}

export interface OutlineItem {
  title: string;
  topics: string[];
}

/* ===========================
   Mentor extraction
=========================== */
function asRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function sanitizeExperts(raw: unknown): Expert[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      const e = item as Partial<Expert> & { description?: unknown };
      const name = e.name ? String(e.name) : "";
      if (!name) return null;
      return {
        name,
        role: e.role ? String(e.role) : undefined,
        img: e.img ? String(e.img) : undefined,
        linkedin: e.linkedin ? String(e.linkedin) : undefined,
        description: e.description ? String(e.description) : undefined,
      } as Expert;
    })
    .filter((x): x is Expert => Boolean(x));
}

function sanitizeMentors(raw: unknown): Expert[] {
  if (!Array.isArray(raw)) return [];
  return (raw as unknown[])
    .map((m) => {
      const obj = asRecord(m) ? (m as unknown as MentorRaw) : ({} as MentorRaw);
      const name = obj.name ?? obj.full_name ?? obj.title;
      const roleRaw = obj.role ?? obj.designation ?? obj.designation_name ?? obj.current_company;
      const companyRaw = obj.company ?? obj.company_name ?? obj.current_company;
      const img = obj.img ?? obj.image ?? obj.photo ?? obj.avatar ?? obj.img_url;
      const linkedin = obj.linkedin ?? obj.linkedin_url ?? obj.linkdin_url ?? obj.linkdin_profile;
      const description = obj.description ?? obj.details;

      const nameStr = name ? String(name) : "";
      if (!nameStr) return null;

      const rolePieces: string[] = [];
      if (roleRaw) rolePieces.push(String(roleRaw));
      const roleAlreadyHasAt = roleRaw ? String(roleRaw).includes("@") : false;
      if (companyRaw && !roleAlreadyHasAt) rolePieces.push(String(companyRaw));
      let role = rolePieces.join(roleAlreadyHasAt ? " " : ", ");

      if (role) {
        const parts = role.split(/,\s*/);
        const unique = Array.from(new Set(parts));
        role = unique.join(", ");
      }

      return {
        name: nameStr,
        role: role || undefined,
        img: img ? String(img) : undefined,
        linkedin: linkedin ? String(linkedin) : undefined,
        description: description ? String(description) : undefined,
      } as Expert;
    })
    .filter((x): x is Expert => Boolean(x));
}

function extractExperts(root: ContentRoot): Expert[] {
  // top-level experts array
  if (isWrapped(root)) {
    const fromTop = (root as { experts?: unknown }).experts;
    const top = sanitizeExperts(fromTop);
    if (top.length > 0) return top;
  }

  // top-level mentors array
  if (isWrapped(root)) {
    const mentorsTop = (root as { mentors?: unknown }).mentors;
    const fromMentors = sanitizeMentors(mentorsTop);
    if (fromMentors.length > 0) return fromMentors;
  }

  // nested homepage.mentors.mentors
  if (isWrapped(root)) {
    const homepage = (root as { homepage?: unknown }).homepage;
    if (asRecord(homepage)) {
      const mentorsWrap = (homepage as { mentors?: unknown }).mentors;
      if (asRecord(mentorsWrap)) {
        const nested = (mentorsWrap as { mentors?: unknown }).mentors;
        const fromNested = sanitizeMentors(nested);
        if (fromNested.length > 0) return fromNested;
      }
    }
  }

  return [];
}




/* ===========================
   Page component
=========================== */
const Page = memo(function Page(): JSX.Element {
  // Memoize expensive computations
  const { dataAnalyst, dataEngineering, cohortDisplay, daWeeks, deWeeks } = useMemo(() => {
    const analyst = pickTrack(CONTENT, "analyst");
    const engineer = pickTrack(CONTENT, "engineer");
    const cohort = formatCohortDate(analyst.next_cohort_date || engineer.next_cohort_date || "");
    const analystWeeks = Number(analyst.duration_weeks ?? 12);
    const engineerWeeks = Number(engineer.duration_weeks ?? 20);
    
    return {
      dataAnalyst: analyst,
      dataEngineering: engineer,
      cohortDisplay: cohort,
      daWeeks: analystWeeks,
      deWeeks: engineerWeeks
    };
  }, []);

  const classTime = "6–8 pm IST";

  // Memoize partners data
  const partners: Partner[] = useMemo(() => [
    { name: "Celebal", logo: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1760617723/celebal_technologies_m7f4s7.jpg" },
    { name: "Polestar", logo: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1760618195/Polestar_Logo_dltnrw.jpg" },
    { name: "Mandle Bulb", logo: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1760618250/Mandelbulb_etrdjs.png" },
    { name: "Pratham Software", logo: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1760618195/pratham_sofytware_zqczbz.jpg" },
    { name: "Genpact", logo: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1760618177/genpact_saqdqp.png" },
    { name: "Neos Alpha", logo: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1760618477/neos_alpha_ly4os5.jpg" },
  ], []);

  const experts = useMemo(() => extractExperts(CONTENT), []);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <style>{`
        :root {
          --brand-50:#eef2ff; --brand-100:#e0e7ff; --brand-200:#c7d2fe; --brand-300:#a5b4fc;
          --brand-400:#818cf8; --brand-500:#6366f1; --brand-600:#4f46e5; --brand-700:#4338ca; --brand-800:#3730a3; --brand-900:#312e81;
          --ink:#0b1220; --ink-2:#0a0f1d;
        }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#050814]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_-10%,_rgba(79,70,229,0.5),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_140deg_at_50%_50%,_rgba(99,102,241,0.25),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[#050814]/90" />
          <div className="absolute inset-0 [background-image:linear-gradient(#ffffff10_1px,transparent_1px),linear-gradient(90deg,#ffffff10_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(60%_55%_at_50%_0%,_#000_45%,_transparent_75%)]" />
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* LEFT */}
            <div className="lg:col-span-6 text-white">
              <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white drop-shadow-[0_8px_30px_rgba(99,102,241,0.45)] sm:text-5xl md:text-6xl">
                Data Analyst & Data Engineering Programs
              </h1>

              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--brand-400)]">
                Hybrid • Pay After Placement
              </h2>

              <p className="mt-3 max-w-xl text-base sm:text-lg text-white/85">
                Industry-led. Project-first. Job-focused. Start with a small enrollment, pay the balance after placement.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <details className="group relative">
                  <summary className="list-none inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-white backdrop-blur hover:bg-white/15 [&::-webkit-details-marker]:hidden">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 3v14m0 0l-4-4m4 4l4-4M6 21h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    View Syllabus
                    <svg className="ml-1" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>

                  <div className="absolute left-0 z-20 mt-2 w-64 overflow-hidden rounded-xl border border-white/15 bg-[#0b1220] p-1 text-sm text-white shadow-xl backdrop-blur">
                    <a href="#analyst" className="block rounded-lg px-3 py-2 hover:bg-white/10">Data Analyst</a>
                    <a href="#engineering" className="block rounded-lg px-3 py-2 hover:bg-white/10">Data Engineering</a>
                  </div>
                </details>

                {/* Primary CTA: Explore Full Syllabus */}

              </div>

              {/* Enrolled proof (avatars + seats) */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-white/90">Trusted by Leading Companies</p>
                <PartnersRow items={partners} />
                <p className="mt-2 text-sm text-white/80">Join our expanding network of industry leaders</p>
              </div>
            </div>

            {/* RIGHT: form */}
            <div className="lg:col-span-6">
              <EnrollForm />
            </div>
          </div>
        </div>

      </section>

      {/* KEY STATS */}
      <section className="bg-[#0b1220]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard dark label="Delivery Modes" value="Online + Offline" />
            <StatCard dark label="Class Timing" value={classTime} />
            <StatCard dark label="Next Cohort" value={cohortDisplay || "24 Oct 2025"} />
            <StatCard dark label="Recordings" value="Available" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative bg-white">
        <div className="absolute inset-x-0 -top-10 -z-10 h-20 bg-gradient-to-b from-[#0b1220] to-transparent opacity-80" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Why these programs</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard title="Lifetime Access" desc="Content updates, recordings, templates — forever." />
            <FeatureCard title="By The Industry, For The Industry" desc="Built with hiring managers & working pros." />
            <FeatureCard title="Resume Refactoring" desc="1:1 resume/LinkedIn overhaul tailored to role." />
            <FeatureCard title="Mock Interviews" desc="Regular analytics & system rounds with feedback." />
          </div>
        </div>
      </section>

      {/* EXPERTS */}
      <section id="experts" className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Led by Industry Experts</h2>
          {experts.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {experts.map((e) => (
                <ExpertCard key={e.name} {...e} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
              Mentor profiles coming soon. Add them under <code>homepage.mentors.mentors</code> in <code>app/assets/content.json</code>.
            </div>
          )}
        </div>
      </section>


      {/* DA ⊂ DE */}
      <section id="subset" className="bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Data Analyst ⊂ Data Engineer</h2>
          <p className="mt-2 max-w-3xl text-gray-700">
            The Analyst track is the foundation of the Engineering track. Complete the first {daWeeks} weeks for Analyst
            outcomes; continue to {deWeeks} weeks to master engineering depth.
          </p>
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-gray-900">Timeline</div>
            <div className="mt-3 grid grid-cols-[repeat(20,minmax(0,1fr))] overflow-hidden rounded-xl">
              {Array.from({ length: daWeeks }).map((_, i) => (
                <div key={`da-${i}`} className="h-3 bg-[var(--brand-600)]" />
              ))}
              {Array.from({ length: Math.max(deWeeks - daWeeks, 0) }).map((_, i) => (
                <div key={`de-${i}`} className="h-3 bg-[var(--brand-800)]" />
              ))}
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded bg-[var(--brand-600)]" />
                <p>
                  <b>Weeks 1–{daWeeks}:</b> Analyst foundations — Excel/BI, SQL essentials, stats & storytelling,
                  Python for analysis.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded bg-[var(--brand-800)]" />
                <p>
                  <b>Weeks {daWeeks + 1}–{deWeeks}:</b> Engineering depth — ETL/ELT, orchestration, cloud, modeling at
                  scale, streaming basics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DATA ANALYST */}
      <CourseSection
        anchor="analyst"
        title={`${dataAnalyst.title} — Pay After Placement`}
        subtitle={dataAnalyst.sub_title}
        img={dataAnalyst.img_url}
        feeUpfrontLabel="Enroll with ₹7,500"
        feeAfterLabel="After placement: ₹30,000"
        totalLabel="Total: ₹37,500"
        modules={dataAnalyst.courses_content ?? []}
        duration={`${daWeeks} weeks`}
      />

      {/* DATA ENGINEERING */}
      <CourseSection
        anchor="engineering"
        title={`${dataEngineering.title} — Pay After Placement`}
        subtitle={dataEngineering.sub_title}
        img={dataEngineering.img_url}
        feeUpfrontLabel="Enroll with ₹10,000"
        feeAfterLabel="After placement: ₹30,000"
        totalLabel="Total: ₹40,000"
        modules={dataEngineering.courses_content ?? []}
        duration={`${deWeeks} weeks`}
      />

      {/* TESTIMONIALS */}
      <section className="bg-white">
        <div className="container mx-auto max-w-7xl px-0 py-16">
          <Testimonials />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative bg-[#0b1220] text-white">
        <div className="absolute inset-x-0 -top-10 -z-10 h-20 bg-gradient-to-b from-white to-transparent opacity-70" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Frequently asked</h2>
          <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/90">
              <p className="font-semibold">Are classes online or offline?</p>
              <p className="mt-2 text-sm text-white/80">Both. Attend live online sessions or join in-person where available; all sessions have recordings.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/90">
              <p className="font-semibold">When does the cohort start?</p>
              <p className="mt-2 text-sm text-white/80">Cohort starts {cohortDisplay || "24 Oct 2025"}. Classes run {classTime}.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/90">
              <p className="font-semibold">How do fees work?</p>
              <p className="mt-2 text-sm text-white/80">Data Analyst: ₹7,500 upfront + ₹30,000 after placement. Data Engineering: ₹10,000 upfront + ₹30,000 after placement.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/90">
              <p className="font-semibold">Do I keep access?</p>
              <p className="mt-2 text-sm text-white/80">Yes, you get lifetime access to updated materials and recordings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* INDIA MAP SECTION */}
      <section className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
              Our Students Across India
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of students from prestigious institutes across India who are building their data science careers with us. Explore our reach with this interactive India map.
            </p>
          </div>
          
          {/* Statistics */}
          <div className="mb-8">
            <IndiaStudentsStats />
          </div>

          {/* Interactive India Map */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Interactive Map of India</h2>
              <p className="text-gray-600">Explore India with our interactive map powered by OpenStreetMap</p>
            </div>
            <div className="w-full">
              <div className="w-full h-[500px] rounded-2xl overflow-hidden ring-1 ring-gray-200/60 shadow-sm">
                <InteractiveIndiaMap />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Data Science Journey?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join students from top institutes across India and build your career in data science
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b1220] text-white/80">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 text-sm">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
            <p>© {new Date().getFullYear()} Your Academy. All rights reserved.</p>
            <nav className="flex flex-wrap gap-4">
              <a href="#subset" className="hover:text-white">DA ⊂ DE</a>
              <a href="#analyst" className="hover:text-white">Data Analyst</a>
              <a href="#engineering" className="hover:text-white">Data Engineering</a>
              <a href="#features" className="hover:text-white">Features</a>
              <a href="#experts" className="hover:text-white">Experts</a>
              <a href="#faq" className="hover:text-white">FAQ</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
});

export default Page;
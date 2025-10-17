// app/landing/page.tsx
// Full rewrite: typed, dynamic mentors from content.json, upgraded CTAs,
// enrolled students + India map component inlined for easy drop-in.

import React from "react";
import Testimonials from "@/components/Testimonials";
import EnrollForm from "@/components/EnrollForm";
import contentJson from "../assets/content.json";
import { JSX } from "react";
import Image from "next/image";

/* ===========================
   Types
=========================== */
export interface Submodule {
  title: string;
  content: string[];
}

export interface Module {
  title: string;
  submodules: Submodule[];
}

export interface UserTestimonial {
  img_url: string;
  name: string;
  linkdin_url: string;
  designation_name: string;
  company_name: string;
  company_business_link: string;
  details: string;
}

export interface Course {
  id: number;
  title: string;
  sub_title: string;
  img_url: string;
  duration_weeks?: number;
  next_cohort_date?: string; // e.g. "2025-24-10"
  courses_content?: Module[];
  right_side_video_url?: string;
  user_section?: UserTestimonial[];
}

export interface Partner {
  name: string;
  logo?: string;
}

export interface Expert {
  name: string;
  role?: string;
  img?: string;
  linkedin?: string;
  description?: string;
}

/* Minimal mentor raw shape used in your content.json */
interface MentorRaw {
  role: string | undefined;
  img?: string;
  name?: string;
  current_company?: string;
  description?: string;
  linkdin_profile?: string;
  full_name?: string;
  title?: string;
  designation?: string;
  designation_name?: string;
  company?: string;
  company_name?: string;
  details?: string;
  linkedin?: string;
  linkedin_url?: string;
  linkdin_url?: string;
  image?: string;
  photo?: string;
  avatar?: string;
  img_url?: string;
}

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
function condenseModules(modules: Module[] = []): { outline: OutlineItem[]; capstone: string[] } {
  const outline: OutlineItem[] = [];
  const capstone: string[] = [];

  modules.forEach((m) => {
    const subs = Array.isArray(m?.submodules) ? m.submodules : [];

    const cap = subs.find((s) => /capstone/i.test(s.title)) || subs.find((s) => /project/i.test(s.title));
    if (cap && Array.isArray(cap.content)) {
      cap.content.forEach((line) => {
        if (capstone.length < 12) capstone.push(String(line));
      });
    }

    const mains = subs
      .filter((s) => !/prereq|project|capstone/i.test(s.title))
      .map((s) => s.title)
      .slice(0, 6);

    outline.push({ title: m.title, topics: mains });
  });

  return { outline, capstone };
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
   Enrolled students (provided data)
   We'll show these on the map + list
=========================== */
type EnrolledStudent = { id: string; institute: string; program: string; city?: string };

const ENROLLED: EnrolledStudent[] = [
  { id: "341533", institute: "Jagannath University", program: "BTech", city: "Jaipur" },
  { id: "322023", institute: "PG Programs in Data Science & Analytics", program: "BTech", city: "Jaipur" },
  { id: "751030", institute: "NIT Rourkela", program: "MSc", city: "Rourkela" },
  { id: "302031", institute: "Poornima College of Engineering", program: "BTech", city: "Jaipur" },
  { id: "500035", institute: "Dr. BR Ambedkar Open University", program: "BA", city: "Hyderabad" },
  { id: "311001", institute: "Electronics and Computer Engineering", program: "B.E", city: "Bhilwara" },
  { id: "700118", institute: "IIIT Bangalore", program: "PG Diploma", city: "Bengaluru" },
  { id: "302034", institute: "Rajasthan University, CS & IT Dept", program: "M.Sc IT", city: "Jaipur" },
  { id: "302021", institute: "B.Tech (Electronics & Control)", program: "BTech", city: "Jaipur" },
  { id: "302034-2", institute: "RCEW", program: "MTech", city: "Jaipur" },
  { id: "302012-1", institute: "SBCET", program: "BTech", city: "Jaipur" },
  { id: "302012-2", institute: "Sri Balaji College of Engineering and Technology", program: "BTech", city: "Jaipur" },
  { id: "302012-3", institute: "Maharishi Arvind School of Management Studies", program: "BCA", city: "Jaipur" },
];

const COHORT_CAPACITY = 25;
const enrolledCount = ENROLLED.length;
const seatsLeft = Math.max(COHORT_CAPACITY - enrolledCount, 0);
const fillPct = Math.min(Math.round((enrolledCount / COHORT_CAPACITY) * 100), 100);

/* ===========================
   Page component
=========================== */
export default function Page(): JSX.Element {
  const dataAnalyst = pickTrack(CONTENT, "analyst");
  const dataEngineering = pickTrack(CONTENT, "engineer");
  const cohortDisplay = formatCohortDate(dataAnalyst.next_cohort_date || dataEngineering.next_cohort_date || "");
  const classTime = "6–8 pm IST";
  const daWeeks = Number(dataAnalyst.duration_weeks ?? 12);
  const deWeeks = Number(dataEngineering.duration_weeks ?? 20);

  // partners (slightly larger visuals)
  const partners: Partner[] = [
    { name: "Celebal", logo: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1760617723/celebal_technologies_m7f4s7.jpg" },
    { name: "Polestar", logo: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1760618195/Polestar_Logo_dltnrw.jpg" },
    { name: "Mandle Bulb", logo: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1760618250/Mandelbulb_etrdjs.png" },
    { name: "Pratham Software", logo: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1760618195/pratham_sofytware_zqczbz.jpg" },
    { name: "Genpact", logo: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1760618177/genpact_saqdqp.png" },
    { name: "Neos Alpha", logo: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1760618477/neos_alpha_ly4os5.jpg" },
  ];

  const experts = extractExperts(CONTENT);

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
                <a
                  href="#analyst"
                  className="ml-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] px-5 py-2.5 font-semibold text-white shadow hover:opacity-95"
                >
                  Explore Full Syllabus →
                </a>

                {/* Secondary CTA: Book Mentor Call */}
                <a
                  href="#apply"
                  className="ml-2 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/7"
                >
                  Book a Free Mentor Call
                </a>
              </div>

              {/* Enrolled proof (avatars + seats) */}
              <div className="mt-6">
                <p className="text-xs uppercase tracking-wide text-white/60">Select hiring partners</p>
                <PartnersRow items={partners} />
                <p className="mt-2 text-xs text-white/60">growing network</p>
              </div>
            </div>

            {/* RIGHT: form */}
            <div className="lg:col-span-6">
              <EnrollForm />
            </div>
          </div>
        </div>

        {/* sticky mobile CTA */}
        <div className="fixed inset-x-0 bottom-3 z-30 mx-auto w-[92%] sm:hidden">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur">
            <a href="#analyst" className="block w-full rounded-xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] px-5 py-3 text-center font-semibold text-white shadow">
              Explore Full Syllabus
            </a>
          </div>
        </div>
      </section>

      {/* KEY STATS */}
      <section className="bg-[#0b1220]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat dark label="Delivery Modes" value="Online + Offline" />
            <Stat dark label="Class Timing" value={classTime} />
            <Stat dark label="Next Cohort" value={cohortDisplay || "24 Oct 2025"} />
            <Stat dark label="Recordings" value="Available" />
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

      {/* INDIA MAP + ENROLLED STUDENTS */}
      <IndiaLearnersMap students={ENROLLED} mapSrc="/india-map.svg" />

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
            <Faq dark q="Are classes online or offline?" a="Both. Attend live online sessions or join in-person where available; all sessions have recordings." />
            <Faq dark q="When does the cohort start?" a={`Cohort starts ${cohortDisplay || "24 Oct 2025"}. Classes run ${classTime}.`} />
            <Faq dark q="How do fees work?" a="Data Analyst: ₹7,500 upfront + ₹30,000 after placement. Data Engineering: ₹10,000 upfront + ₹30,000 after placement." />
            <Faq dark q="Do I keep access?" a="Yes, you get lifetime access to updated materials and recordings." />
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
}

/* ===========================
   UI: small components
=========================== */
function Chip({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur hover:bg-white/15">
      {children}
    </span>
  );
}

function Stat({ label, value, dark }: { label: string; value: string; dark?: boolean }): JSX.Element {
  const base = dark
    ? "rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 text-center text-white/90 shadow-sm hover:bg-white/7"
    : "rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 text-center shadow-sm hover:shadow-md";
  const valueCls = dark ? "text-2xl sm:text-3xl font-extrabold text-white" : "text-2xl sm:text-3xl font-extrabold text-[var(--brand-700)]";
  const labelCls = dark ? "mt-1 text-sm text-white/70" : "mt-1 text-sm text-gray-600";
  return (
    <div className={`${base} transition-transform duration-200 hover:-translate-y-0.5`}>
      <p className={valueCls}>{value}</p>
      <p className={labelCls}>{label}</p>
    </div>
  );
}

function CourseSection(props: {
  anchor: string;
  title: string;
  subtitle?: string;
  img?: string;
  feeUpfrontLabel: string;
  feeAfterLabel: string;
  totalLabel: string;
  modules: Module[];
  duration?: string;
}): JSX.Element {
  const { anchor, title, subtitle, img, feeUpfrontLabel, feeAfterLabel, totalLabel, modules, duration } = props;
  const { outline, capstone } = condenseModules(modules);
  return (
    <section id={anchor} className="relative bg-white">
      <div className="absolute inset-x-0 -top-10 -z-10 h-20 bg-gradient-to-b from-gray-50 to-transparent" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
              {duration ? (
                <span className="inline-flex items-center rounded-full bg-[var(--brand-50)] px-3 py-1 text-xs font-semibold text-[var(--brand-700)] ring-1 ring-inset ring-[var(--brand-200)]">
                  {duration}
                </span>
              ) : null}
            </div>
            {subtitle ? <p className="mt-2 text-gray-700">{subtitle}</p> : null}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <Badge>Online</Badge>
              <Badge>Offline</Badge>
              <Badge>Recordings available</Badge>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {outline.length > 0 ? (
                outline.map((m) => <OutlineCard key={m.title} title={m.title} topics={m.topics} />)
              ) : (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 text-sm text-gray-600">Syllabus coming soon.</div>
              )}
            </div>

            {capstone.length > 0 && (
              <div className="mt-8">
                <CapstoneCard bullets={capstone} />
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm ring-1 ring-transparent transition hover:shadow-lg">
              {img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img} alt="Program" className="mb-4 h-44 w-full rounded-xl object-cover" />
              ) : null}
              <h3 className="text-lg font-bold">How payment works</h3>
              <ol className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <StepDot />
                  <div>
                    <p className="font-semibold">{feeUpfrontLabel}</p>
                    <p>Secure your seat.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <StepDot />
                  <div>
                    <p className="font-semibold">Train & build</p>
                    <p>Live mentorship, projects, interview prep, and referrals.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <StepDot />
                  <div>
                    <p className="font-semibold">{feeAfterLabel}</p>
                    <p>Pay the remaining amount after you accept an eligible offer.</p>
                  </div>
                </li>
              </ol>
              <div className="mt-5 rounded-xl border border-[var(--brand-200)] bg-[var(--brand-50)] p-4 text-[var(--brand-900)]">
                <p className="font-semibold">Fee summary</p>
                <p className="text-sm">{totalLabel}</p>
              </div>
              <a href="#analyst" className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] px-5 py-3 font-semibold text-white shadow hover:opacity-95">
                Explore Full Syllabus
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OutlineCard({ title, topics }: { title: string; topics: string[] }): JSX.Element {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <ul className="mt-3 space-y-1 text-sm text-gray-700">
        {topics.map((t) => (
          <li key={t} className="flex items-start gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-600)]" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CapstoneCard({ bullets }: { bullets: string[] }): JSX.Element {
  return (
    <div className="relative rounded-2xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] p-[1.5px]">
      <div className="rounded-2xl bg-white p-5 sm:p-6">
        <h3 className="text-lg font-extrabold text-gray-900">Capstone Projects</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-800">
          {bullets.map((b, i) => (
            <li key={`${b}-${i}`}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StepDot(): JSX.Element {
  return <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-600)] text-white">•</span>;
}

function Badge({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <span className="inline-flex items-center rounded-md bg-[var(--brand-50)] px-2.5 py-1 text-[11px] font-semibold text-[var(--brand-700)] ring-1 ring-inset ring-[var(--brand-200)]">
      {children}
    </span>
  );
}

function PartnersRow({ items }: { items: Partner[] }): JSX.Element {
  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
      {items.map((p) => (
        <div key={p.name} className="flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 backdrop-blur">
          {p.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.logo} alt={p.name} className="max-h-8 w-auto opacity-90" />
          ) : (
            <span className="text-xs text-white/85">{p.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function ExpertCard({ name, role, img, linkedin, description }: Expert): JSX.Element {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="absolute inset-0 -z-10 opacity-[0.06] bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)]" />
      <div className="flex items-start gap-4">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={name} className="h-14 w-14 flex-none rounded-full object-cover ring-2 ring-[var(--brand-200)]" />
        ) : (
          <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-[var(--brand-100)] text-[var(--brand-700)] font-semibold ring-2 ring-[var(--brand-200)]">
            {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-base font-semibold text-gray-900">{name}</p>
            {linkedin ? (
              <a href={linkedin} className="inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-[var(--brand-700)] ring-1 ring-inset ring-[var(--brand-300)] hover:bg-[var(--brand-50)]" aria-label={`${name} on LinkedIn`}>
                LinkedIn
              </a>
            ) : null}
          </div>
          {role ? <p className="truncate text-sm text-gray-600">{role}</p> : null}
          {description ? <p className="mt-2 text-sm text-gray-700">{description}</p> : <p className="mt-2 text-sm text-gray-600">Industry professional bringing hands-on experience to our learners.</p>}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }): JSX.Element {
  return (
    <div className="relative rounded-2xl bg-gradient-to-b from-[var(--brand-100)] to-transparent p-[1.2px]">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-700">{desc}</p>
      </div>
    </div>
  );
}

function Faq({ q, a, dark }: { q: string; a: string; dark?: boolean }): JSX.Element {
  const base = dark ? "rounded-2xl border border-white/10 bg-white/5 p-5 text-white/90" : "rounded-2xl border border-gray-200 bg-white p-5";
  const ans = dark ? "mt-2 text-sm text-white/80" : "mt-2 text-sm text-gray-700";
  return (
    <div className={`${base} transition hover:bg-white/10`}>
      <p className="font-semibold">{q}</p>
      <p className={ans}>{a}</p>
    </div>
  );
}

/* ===========================
   India map component (inline)
   - expects /public/india-map.svg (simple silhouette)
   - positions are approximate and can be nudged
=========================== */
export function IndiaLearnersMap({ students, mapSrc = "/india-map.svg" }: { students: EnrolledStudent[]; mapSrc?: string }): JSX.Element {
  // Cluster by city (simple grouping)
  const byCity: Record<string, EnrolledStudent[]> = {};
  students.forEach((s) => {
    const city = (s.city || "Unknown").trim();
    if (!byCity[city]) byCity[city] = [];
    byCity[city].push(s);
  });

  // Accurate percent positions for key cities based on India's geographical coordinates
  const cityPositions: Record<string, { top: number; left: number; cityLabel?: string }> = {
    Jaipur: { top: 35, left: 42 }, // Rajasthan, North India
    Rourkela: { top: 45, left: 68 }, // Odisha, East India  
    Bengaluru: { top: 78, left: 52 }, // Karnataka, South India
    Hyderabad: { top: 65, left: 50 }, // Telangana, South-Central India
    Bhilwara: { top: 38, left: 41 }, // Rajasthan, near Jaipur
    // Additional major cities for future use
    Delhi: { top: 25, left: 45 }, // National Capital
    Mumbai: { top: 55, left: 35 }, // Maharashtra, West India
    Chennai: { top: 80, left: 65 }, // Tamil Nadu, South India
    Kolkata: { top: 40, left: 70 }, // West Bengal, East India
    Pune: { top: 50, left: 38 }, // Maharashtra, West India
    Unknown: { top: 50, left: 50 },
  };

  const nodes = Object.keys(byCity).map((city) => {
    const pos = cityPositions[city] ?? cityPositions["Unknown"];
    return { city, items: byCity[city], top: pos.top, left: pos.left };
  });

  const enrolledTotal = students.length;

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
          {/* map image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image src={mapSrc} width="800" height={800} alt="India map" className="pointer-events-none mx-auto w-full max-w-[880px] opacity-95" />

          {/* overlay pins — we use a positioned container that matches the image box via padding-bottom trick */}
          <div className="pointer-events-none relative -mt-[calc(100%+16px)] h-0 w-full pb-[100%] sm:pb-[70%]">
            {nodes.map((n) => (
              <MapPin key={n.city} city={n.city} items={n.items} top={n.top} left={n.left} />
            ))}
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

function MapPin({ city, items, top, left }: { city: string; items: EnrolledStudent[]; top: number; left: number }) {
  return (
    <div className="pointer-events-auto absolute" style={{ top: `${top}%`, left: `${left}%`, transform: "translate(-50%, -50%)" }}>
      <div className="group relative">
        <div className="h-3.5 w-3.5 rounded-full bg-[var(--brand-600)] ring-2 ring-white shadow-md" />
        <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--brand-400)] opacity-30" />

        <div className="invisible absolute left-1/2 top-6 z-10 w-[260px] -translate-x-1/2 rounded-xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-xl group-hover:visible">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900">{city}</p>
            <span className="rounded-full bg-[var(--brand-50)] px-2 py-0.5 text-[10px] font-semibold text-[var(--brand-700)] ring-1 ring-inset ring-[var(--brand-200)]">
              {items.length} {items.length === 1 ? "learner" : "learners"}
            </span>
          </div>
          <ul className="mt-2 space-y-1">
            {items.slice(0, 4).map((i) => (
              <li key={i.id} className="line-clamp-1">• {i.institute} — <span className="text-gray-600">{i.program}</span></li>
            ))}
            {items.length > 4 && <li className="text-[11px] text-gray-500">+{items.length - 4} more…</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
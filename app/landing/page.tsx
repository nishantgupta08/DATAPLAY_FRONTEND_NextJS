// app/landing/page.tsx
// TypeScript rewrite — with top hero form (like the reference), no `any`, JSON-typed syllabus, bold UI.

import Testimonials from "@/components/Testimonials";
import contentJson from "../assets/content.json";

/* ===========================
   Types for content.json
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
  duration_weeks: number;
  next_cohort_date: string; // e.g. "2025-24-10" (DD and MM may be swapped in source)
  courses_content: Module[];
  right_side_video_url: string;
  user_section?: UserTestimonial[];
}

export type CoursesRoot = { courses: Course[] } | Course[];

function isWrapped(root: CoursesRoot): root is { courses: Course[] } {
  return (root as { courses?: unknown }).courses !== undefined;
}

/* ===========================
   Data & helpers (typed)
=========================== */
const CONTENT: CoursesRoot = (contentJson as unknown) as CoursesRoot;

function pickTrack(raw: CoursesRoot | null, keyword: "analyst" | "engineer"): Course {
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

  if (!raw) return fallback;

  const list: Course[] = isWrapped(raw) ? raw.courses : (raw as Course[]);
  const needle = keyword === "analyst" ? "analyst" : "engineering";
  return list.find((c) => c.title.toLowerCase().includes(needle)) ?? fallback;
}

function formatCohortDate(raw: string): string {
  if (!raw) return "24 Oct 2025"; // default fallback
  const parts = raw.split("-");
  let year = parts[0];
  let month = parts[1];
  let day = parts[2];
  if (parts.length === 3) {
    const p2 = Number(parts[1]);
    const p3 = Number(parts[2]);
    if (p2 > 12 && p3 <= 12) {
      month = parts[2];
      day = parts[1];
    }
  }
  const iso = `${year}-${month}-${day}`;
  const d = new Date(iso);
  if (!isNaN(d.getTime())) return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  return raw;
}

export interface OutlineItem { title: string; topics: string[] }

function condenseModules(modules: Module[]): { outline: OutlineItem[]; capstone: string[] } {
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

interface Partner { name: string; logo?: string }
interface Expert { name: string; role?: string; img?: string; linkedin?: string }

/* ===========================
   Page (typed)
=========================== */
export default function Page(): JSX.Element {
  const dataAnalyst = pickTrack(CONTENT, "analyst");
  const dataEngineering = pickTrack(CONTENT, "engineer");

  const cohortDisplay = formatCohortDate(dataAnalyst.next_cohort_date || dataEngineering.next_cohort_date || "");
  const classTime = "6–8 pm IST";
  const daWeeks = Number(dataAnalyst.duration_weeks || 12);
  const deWeeks = Number(dataEngineering.duration_weeks || 20);

  const partners: Partner[] = [
    { name: "Celebal", logo: "/logos/celebal.svg" },
    { name: "Polestar", logo: "/logos/polestar.svg" },
    { name: "Mandle Bulb", logo: "/logos/mandle-bulb.svg" },
    { name: "Pratham Software", logo: "/logos/pratham-software.svg" },
    { name: "Neos Alpha", logo: "/logos/neos-alpha.svg" },
  ];

  const experts: Expert[] = [
    {
      name: "Rajat Sinha",
      role: "Data Engineer, Shiprocket",
      img: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1759416236/Rajat_Sinha_p1lgdb.jpg",
      linkedin: "https://www.linkedin.com/in/rajat-sinha-94aa22201/",
    },
    {
      name: "Soumya Awasthi",
      role: "Associate Analytical Engineer, Gartner",
      img: "https://res.cloudinary.com/dd0e4iwau/image/upload/v1759416237/Soumya_Awasthi_bebpm3.jpg",
      linkedin: "https://www.linkedin.com/in/soumyaawasthi08/",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <style>{`
        :root {
          --brand-50:#eef2ff; --brand-100:#e0e7ff; --brand-200:#c7d2fe; --brand-300:#a5b4fc;
          --brand-400:#818cf8; --brand-500:#6366f1; --brand-600:#4f46e5; --brand-700:#4338ca; --brand-800:#3730a3; --brand-900:#312e81;
          --ink:#0b1220; --ink-2:#0a0f1d;
        }
      `}</style>

      {/* ===== HERO with TOP FORM ===== */}
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
              <h2 className=\"text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--brand-400)]\">\n                Hybrid Pay After Placement\n              </h2>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white drop-shadow-[0_8px_30px_rgba(99,102,241,0.45)] sm:text-5xl md:text-6xl">
                Become a Skilled Data Scientist!
              </h1>
              <ul className="mt-6 space-y-3 text-sm sm:text-base text-white/90">
                <li className="flex items-start gap-3"><CheckIcon /> 1:1 mentorship with experts</li>
                <li className="flex items-start gap-3"><CheckIcon /> Live interactive sessions</li>
                <li className="flex items-start gap-3"><CheckIcon /> 10+ real projects</li>
                <li className="flex items-start gap-3"><CheckIcon /> Salary-focused career support</li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <details className=\"relative inline-block\">\n                  <summary className=\"inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-white backdrop-blur hover:bg-white/15 [&::-webkit-details-marker]:hidden\">\n                    <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12 3v14m0 0l-4-4m4 4l4-4M6 21h12\" stroke=\"currentColor\" strokeWidth=\"1.6\" strokeLinecap=\"round\" strokeLinejoin=\"round\"/></svg>\n                    View Syllabus\n                    <svg className=\"ml-1\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M6 9l6 6 6-6\" stroke=\"currentColor\" strokeWidth=\"1.8\" strokeLinecap=\"round\" strokeLinejoin=\"round\"/></svg>\n                  </summary>\n                  <div className=\"absolute left-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-white/15 bg-[#0b1220] p-1 text-sm text-white shadow-xl backdrop-blur\">\n                    <a href=\"#analyst\" className=\"block rounded-lg px-3 py-2 hover:bg-white/10\">Data Analyst</a>\n                    <a href=\"#engineering\" className=\"block rounded-lg px-3 py-2 hover:bg-white/10\">Data Engineering</a>\n                  </div>\n                </details>
                <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs">
                  <Chip>Online</Chip>
                  <Chip>Offline</Chip>
                  <Chip>Recordings available</Chip>
                  <Chip>{classTime}</Chip>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-6"><EnrollForm /></div>
          </div>

          {/* partners logos under hero */}
          <div className="mt-10 text-center">
            <p className="text-xs uppercase tracking-wide text-white/60">Select hiring partners</p>
            <PartnersRow items={partners} />
            <p className="mt-2 text-xs text-white/60">growing network</p>
          </div>
        </div>
      </section>

      {/* ===== KEY STATS ===== */}
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

      {/* ===== FEATURES ===== */}
      <section id="features" className="relative bg-white">
        <div className="absolute inset-x-0 -top-10 -z-10 h-20 bg-gradient-to-b from-[#0b1220] to-transparent opacity-80" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Why these programs</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard title="Lifetime Access" desc="Content updates, recordings, templates — forever." />
            <FeatureCard title="By Industry, For Industry" desc="Built with hiring managers & working pros." />
            <FeatureCard title="Resume Refactoring" desc="1:1 resume/LinkedIn overhaul tailored to role." />
            <FeatureCard title="Mock Interviews" desc="Regular analytics & system rounds with feedback." />
          </div>
        </div>
      </section>

      {/* ===== EXPERTS ===== */}
      <section id="experts" className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Backed by Industry Experts</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {experts.map((e) => (
              <ExpertCard key={e.name} {...e} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== DA ⊂ DE ===== */}
      <section id="subset" className="bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Data Analyst ⊂ Data Engineer</h2>
          <p className="mt-2 max-w-3xl text-gray-700">The Analyst track is the foundation of the Engineering track. Complete the first {daWeeks} weeks for Analyst outcomes; continue to {deWeeks} weeks to master engineering depth.</p>
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
              <div className="flex items-start gap-2"><span className="mt-1 inline-block h-2 w-2 rounded bg-[var(--brand-600)]" /><p><b>Weeks 1–{daWeeks}:</b> Analyst foundations — Excel/BI, SQL essentials, stats & storytelling, Python for analysis.</p></div>
              <div className="flex items-start gap-2"><span className="mt-1 inline-block h-2 w-2 rounded bg-[var(--brand-800)]" /><p><b>Weeks {daWeeks + 1}–{deWeeks}:</b> Engineering depth — ETL/ELT, orchestration, cloud, modeling at scale, streaming basics.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DATA ANALYST ===== */}
      <CourseSection
        anchor="analyst"
        title={`${dataAnalyst.title} — Pay After Placement`}
        subtitle={dataAnalyst.sub_title}
        img={dataAnalyst.img_url}
        feeUpfrontLabel="Enroll with ₹7,500"
        feeAfterLabel="After placement: ₹30,000"
        totalLabel="Total: ₹37,500"
        modules={dataAnalyst.courses_content}
        duration={`${daWeeks} weeks`}
      />

      {/* ===== DATA ENGINEERING ===== */}
      <CourseSection
        anchor="engineering"
        title={`${dataEngineering.title} — Pay After Placement`}
        subtitle={dataEngineering.sub_title}
        img={dataEngineering.img_url}
        feeUpfrontLabel="Enroll with ₹10,000"
        feeAfterLabel="After placement: ₹30,000"
        totalLabel="Total: ₹40,000"
        modules={dataEngineering.courses_content}
        duration={`${deWeeks} weeks`}
      />

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-white">
        <div className="container mx-auto max-w-7xl px-0 py-16">
          <Testimonials />
        </div>
      </section>

      {/* ===== FAQ ===== */}
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

      {/* ===== FOOTER ===== */}
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
   UI components (typed)
=========================== */
function SparkleIcon(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90">
      <path d="M12 3l1.8 4.5L18 9.3l-4.2 1.8L12 15l-1.8-3.9L6 9.3l4.2-1.8L12 3z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function CheckIcon(): JSX.Element {
  return (
    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  );
}

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

function ProgramCard(props: {
  id: string;
  title: string;
  subtitle?: string;
  img?: string;
  feeUpfront: string;
  feeAfter: string;
  duration?: string;
  ctaHref: string;
  dark?: boolean;
}): JSX.Element {
  const { id, title, subtitle, img, feeUpfront, feeAfter, duration, ctaHref, dark } = props;
  return (
    <div id={id} className="relative rounded-2xl bg-gradient-to-b from-white/20 to-white/5 p-[1.2px] backdrop-blur">
      <div className={`relative rounded-2xl ${dark ? "bg-white/10 text-white" : "bg-white text-gray-900"} p-5 sm:p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg`}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt="Program" className="mb-4 h-24 w-full rounded-xl object-cover" />
        ) : null}
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle ? <p className={`mt-1 text-sm ${dark ? "text-white/80" : "text-gray-700"}`}>{subtitle}</p> : null}
        <div className={`mt-3 flex flex-wrap items-center gap-2 text-xs ${dark ? "text-white/90" : "text-gray-700"}`}>
          {duration ? <span className="rounded-full border border-current/20 px-2.5 py-1">{duration}</span> : null}
          <span className="rounded-full border border-current/20 px-2.5 py-1">{feeUpfront} to enroll</span>
          <span className="rounded-full border border-current/20 px-2.5 py-1">{feeAfter} after placement</span>
        </div>
        <a href={ctaHref} className="mt-4 inline-flex rounded-lg bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] px-4 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--brand-400)]">View syllabus</a>
      </div>
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
              {duration ? <span className="inline-flex items-center rounded-full bg-[var(--brand-50)] px-3 py-1 text-xs font-semibold text-[var(--brand-700)] ring-1 ring-inset ring-[var(--brand-200)]">{duration}</span> : null}
            </div>
            {subtitle ? <p className="mt-2 text-gray-700">{subtitle}</p> : null}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <Badge>Online</Badge>
              <Badge>Offline</Badge>
              <Badge>Recordings available</Badge>
            </div>

            {/* MAIN TOPICS */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {outline.length > 0 ? (
                outline.map((m) => (
                  <OutlineCard key={m.title} title={m.title} topics={m.topics} />
                ))
              ) : (
                <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 text-sm text-gray-600">Syllabus coming soon.</div>
              )}
            </div>

            {/* CAPSTONE / PROJECTS */}
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
                <li className="flex items-start gap-3"><StepDot /> <div><p className="font-semibold">{feeUpfrontLabel}</p><p>Secure your seat.</p></div></li>
                <li className="flex items-start gap-3"><StepDot /> <div><p className="font-semibold">Train & build</p><p>Live mentorship, projects, interview prep, and referrals.</p></div></li>
                <li className="flex items-start gap-3"><StepDot /> <div><p className="font-semibold">{feeAfterLabel}</p><p>Pay the remaining amount after you accept an eligible offer.</p></div></li>
              </ol>
              <div className="mt-5 rounded-xl border border-[var(--brand-200)] bg-[var(--brand-50)] p-4 text-[var(--brand-900)]">
                <p className="font-semibold">Fee summary</p>
                <p className="text-sm">{totalLabel}</p>
              </div>
              <a href="#apply" className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] px-5 py-3 font-semibold text-white shadow hover:opacity-95">Start Free Counselling</a>
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
          <li key={t} className="flex items-start gap-2"><span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--brand-600)]" />{t}</li>
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
        <div key={p.name} className="flex h-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 backdrop-blur">
          {p.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.logo} alt={p.name} className="max-h-6 w-auto opacity-90" />
          ) : (
            <span className="text-xs text-white/85">{p.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function ExpertCard({ name, role, img, linkedin }: Expert): JSX.Element {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt={name} className="h-14 w-14 rounded-full object-cover" />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-100)] text-[var(--brand-700)] font-semibold">
          {name.split(" ").map((n) => n[0]).join("")}
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-base font-semibold text-gray-900">{name}</p>
        {role ? <p className="truncate text-sm text-gray-600">{role}</p> : null}
        {linkedin ? (
          <a href={linkedin} className="mt-1 inline-flex text-xs font-medium text-[var(--brand-700)] hover:underline">LinkedIn</a>
        ) : null}
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
  const base = dark
    ? "rounded-2xl border border-white/10 bg-white/5 p-5 text-white/90"
    : "rounded-2xl border border-gray-200 bg-white p-5";
  const ans = dark ? "mt-2 text-sm text-white/80" : "mt-2 text-sm text-gray-700";
  return (
    <div className={`${base} transition hover:bg-white/10`}>
      <p className="font-semibold">{q}</p>
      <p className={ans}>{a}</p>
    </div>
  );
}

function EnrollForm(): JSX.Element {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-5 sm:p-6 text-white shadow-xl backdrop-blur">
      <h3 className="text-xl font-bold text-center">Enroll Now!</h3>
      <form className=\"mt-4 grid grid-cols-1 gap-3\" action=\"#\" method=\"post\">
        {/* program choice */}
        <fieldset className="grid grid-cols-2 gap-2 text-sm">
          <label className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2">
            <input type="radio" name="program" value="Data Engineering" className="accent-[var(--brand-500)]" />
            <span>Data Engineering</span>
          </label>
          <label className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2">
            <input type="radio" name="program" value="Data Analyst" defaultChecked className="accent-[var(--brand-500)]" />
            <span>Data Analytics</span>
          </label>
        </fieldset>

        <input required className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-white/60 focus:border-[var(--brand-400)] focus:outline-none" placeholder="Name" name="name" />
        <input required type="email" className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-white/60 focus:border-[var(--brand-400)] focus:outline-none" placeholder="Email" name="email" />

        <div className="grid grid-cols-[90px,1fr] gap-2">
          <select className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white focus:border-[var(--brand-400)] focus:outline-none" defaultValue="+91" name="cc">
            <option value="+91" className="text-black">+91</option>
            <option value="+1" className="text-black">+1</option>
            <option value="+44" className="text-black">+44</option>
          </select>
          <input required type="tel" className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-white/60 focus:border-[var(--brand-400)] focus:outline-none" placeholder="Phone number" name="phone" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <select required className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white focus:border-[var(--brand-400)] focus:outline-none" defaultValue="" name="experience">
            <option value="" disabled className="text-black">Experience (years)</option>
            <option value="0-1" className="text-black">0–1</option>
            <option value="1-3" className="text-black">1–3</option>
            <option value="3-5" className="text-black">3–5</option>
            <option value="5+" className="text-black">5+</option>
          </select>
          <input className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-white/60 focus:border-[var(--brand-400)] focus:outline-none" placeholder="Company name" name="company" />
        </div>
        <label className=\"mt-1 flex items-center gap-2 text-xs text-white/80\">\n          <input name=\"whatsappOptIn\" type=\"checkbox\" defaultChecked className=\"accent-[var(--brand-500)]\" />\n          Send me details and updates on WhatsApp\n        </label>\n
        <button type="submit" className="mt-1 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] px-4 py-2.5 font-semibold text-white shadow hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[var(--brand-400)]">Submit</button>
      </form>
    </div>
  );
}

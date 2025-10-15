// app/page.tsx
// Data Analyst Pay After Placement Program — mobile-first, theme-ready.
// Sections: Stats (120+ partners) • Features • Syllabus (auto from content.json) • Payment • FAQ • Testimonials (as-is)

import Testimonials from "@/components/Testimonials";

export default async function Page() {
  const syllabus = await getDataAnalystSyllabus();
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Temporary theme tokens — move to globals.css and delete this <style> */}
      <style>{`
        :root {
          /* Map these to your original theme colors */
          --brand-50:  #eff6ff;
          --brand-100: #dbeafe;
          --brand-200: #bfdbfe;
          --brand-300: #93c5fd;
          --brand-400: #60a5fa;
          --brand-500: #3b82f6;
          --brand-600: #2563eb; /* Primary */
          --brand-700: #1d4ed8;
          --brand-800: #1e40af;
          --brand-900: #1e3a8a;
        }
      `}</style>

      {/* ——— HERO ——— */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h1 className="mt-3 text-3xl leading-tight font-extrabold sm:text-4xl md:text-5xl">
                Data Analyst <span className="text-[var(--brand-700)]">Pay After Placement</span> Program
              </h1>
              <p className="mt-3 text-base sm:text-lg text-gray-700 max-w-2xl">
                Total fee <strong>₹30,000</strong>. Pay <strong>₹7,500</strong> to start; pay the remaining <strong>₹22,500</strong> only after placement.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href="#apply" className="inline-flex justify-center rounded-xl bg-[var(--brand-600)] px-5 py-3 text-white font-semibold shadow hover:bg-[var(--brand-700)]">Start Free Counselling</a>
                <a href="#curriculum" className="inline-flex justify-center rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-900 hover:bg-gray-50">View Syllabus</a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 id="apply" className="text-lg sm:text-xl font-bold">Free Counselling Call</h3>
                <p className="mt-1 text-gray-600 text-sm">Tell us your background and goals. We’ll map the shortest path to your first (or next) data role.</p>
                <form className="mt-4 grid grid-cols-1 gap-3">
                  <input className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[var(--brand-600)] focus:outline-none" placeholder="Full name" />
                  <input className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[var(--brand-600)] focus:outline-none" placeholder="Email" type="email" />
                  <input className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[var(--brand-600)] focus:outline-none" placeholder="Phone" type="tel" />
                  <button type="button" className="mt-1 inline-flex items-center justify-center rounded-lg bg-[var(--brand-600)] px-4 py-2.5 font-semibold text-white hover:bg-[var(--brand-700)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-400)]">Request a Call</button>
                  <p className="text-[11px] text-gray-500">By continuing you agree to be contacted regarding admissions.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— 1) TRUST / STATS ——— */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Hiring Partners" value="120+" />
            <Stat label="Avg. Time to Offer" value="10–16 weeks" />
            <Stat label="Mock Interviews" value="Weekly" />
            <Stat label="Alumni Rating" value="4.8/5" />
          </div>
        </div>
      </section>

      {/* ——— SALIENT FEATURES ——— */}
      <section id="features" className="bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold">Why this program</h2>
          <div className="mt-6 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard title="Lifetime Access" desc="Access updated content, recordings, and resources forever." />
            <FeatureCard title="By Industry, For Industry" desc="Built and reviewed with working data professionals and hiring partners." />
            <FeatureCard title="Resume Refactoring" desc="1:1 resume & LinkedIn revamp tailored to data roles." />
            <FeatureCard title="Mock Interviews" desc="Regular case, SQL, and analytics interviews with feedback." />
          </div>
        </div>
      </section>

      {/* ——— 2) WHAT YOU WILL LEARN (from content.json) ——— */}
      <section id="curriculum" className="bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold">What you will learn</h2>
          <p className="mt-2 text-gray-700 max-w-2xl text-sm sm:text-base">Syllabus auto-loaded from <code>content.json</code> for the Data Analyst track.</p>
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {syllabus.map((module, i) => (
              <CurriculumItem key={i} title={module.title} bullets={module.topics} />
            ))}
          </div>
        </div>
      </section>

      {/* ——— 3) HOW PAYMENT WORKS ——— */}
      <section id="pricing" className="bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold">How payment works</h2>
          <ol className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-3">
            <StepCard step="01" title="Enroll with ₹7,500" desc="Secure your seat with an upfront payment." />
            <StepCard step="02" title="Train & build" desc="Live mentorship, projects, interview prep, and referrals." />
            <StepCard step="03" title="After placement: ₹22,500" desc="Pay the remaining fee once you accept an eligible offer." />
          </ol>

          <div className="mt-8 rounded-xl border border-[var(--brand-200)] bg-[var(--brand-50)] p-4 sm:p-5 text-[var(--brand-900)]">
            <p className="font-semibold">Fee summary</p>
            <p className="text-sm">Total: <strong>₹30,000</strong> (₹7,500 upfront + ₹22,500 after placement). Detailed terms are shared during admissions.</p>
          </div>
        </div>
      </section>

      {/* ——— Testimonials (kept as-is) ——— */}
      <section className="bg-white">
        <div className="container mx-auto max-w-7xl px-0 py-16">
          <Testimonials />
        </div>
      </section>

      {/* ——— 4) FREQUENTLY ASKED ——— */}
      <section id="faq" className="bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold">Frequently asked</h2>
          <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
            <Faq q="What are the fees?" a="Total fee is ₹30,000 — pay ₹7,500 to enroll and ₹22,500 after placement." />
            <Faq q="Who is this program for?" a="Motivated learners seeking a structured, mentor-led path into data roles, including freshers and upskillers." />
            <Faq q="How long until I’m job-ready?" a="Typical timelines range from 10–16 weeks depending on your background and weekly commitment." />
            <Faq q="Is the upfront amount refundable?" a="Refund/deferral policy is explained during admissions; please review the terms shared before enrolling." />
          </div>
        </div>
      </section>

      {/* ——— Footer ——— */}
      <footer className="border-t border-gray-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-10 text-sm text-gray-600">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
            <p>© {new Date().getFullYear()} Your Academy. All rights reserved.</p>
            <nav className="flex flex-wrap gap-4">
              <a href="#features" className="hover:text-gray-900">Features</a>
              <a href="#curriculum" className="hover:text-gray-900">Syllabus</a>
              <a href="#pricing" className="hover:text-gray-900">Payment</a>
              <a href="#faq" className="hover:text-gray-900">FAQ</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ——— UI Helpers ——— */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 text-center shadow-sm">
      <p className="text-2xl sm:text-3xl font-extrabold text-[var(--brand-700)]">{value}</p>
      <p className="mt-1 text-sm text-gray-600">{label}</p>
    </div>
  );
}

function CurriculumItem({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-700 text-sm">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <li className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-50)] px-3 py-1 text-xs font-semibold text-[var(--brand-700)] ring-1 ring-inset ring-[var(--brand-200)]">
        {step}
      </div>
      <h3 className="mt-3 text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-700">{desc}</p>
    </li>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-700">{desc}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="font-semibold text-gray-900">{q}</p>
      <p className="mt-2 text-gray-700 text-sm">{a}</p>
    </div>
  );
}

// —— Data loader for content.json ——
// Looks for a Data Analyst syllabus in common shapes, falls back gracefully.
async function getDataAnalystSyllabus(): Promise<{ title: string; topics: string[] }[]> {
  try {
    // Try common import paths; adjust to your repo structure as needed.
    const mod: any = await import("@/content.json");
    const data = mod.default ?? mod;

    // Possible shapes we support:
    // 1) data.tracks.dataAnalyst.modules[]
    // 2) data.dataAnalyst.syllabus[]
    // 3) data.syllabi.dataAnalyst[]
    // 4) any key containing 'analyst'
    const candidates: any[] = [];

    if (data?.tracks?.dataAnalyst?.modules) candidates.push(data.tracks.dataAnalyst.modules);
    if (data?.dataAnalyst?.syllabus) candidates.push(data.dataAnalyst.syllabus);
    if (data?.syllabi?.dataAnalyst) candidates.push(data.syllabi.dataAnalyst);

    if (candidates.length === 0) {
      const analystKey = Object.keys(data || {}).find((k) => k.toLowerCase().includes("analyst"));
      const value = analystKey ? (data as any)[analystKey] : null;
      if (Array.isArray(value)) candidates.push(value);
      if (value?.modules) candidates.push(value.modules);
      if (value?.syllabus) candidates.push(value.syllabus);
    }

    const raw = candidates.find((c) => Array.isArray(c)) || [];

    const normalized = raw
      .map((m: any) => ({
        title: String(m?.title ?? m?.name ?? "Module"),
        topics: Array.isArray(m?.topics)
          ? m.topics
          : Array.isArray(m?.items)
          ? m.items
          : Array.isArray(m?.lessons)
          ? m.lessons
          : [],
      }))
      .filter((m: any) => m.topics.length > 0);

    if (normalized.length > 0) return normalized;
  } catch (e) {
    // ignore and fall back
  }

  // Fallback content (will be replaced once content.json is wired)
  return [
    { title: "Foundations", topics: ["Excel/Sheets for analysis", "SQL basics", "Descriptive statistics"] },
    { title: "Core Analysis", topics: ["SQL joins & windows", "Data cleaning", "Exploratory analysis"] },
    { title: "BI & Reporting", topics: ["Dashboards (Power BI/Tableau)", "Storytelling", "Stakeholder comms"] },
  ];
}

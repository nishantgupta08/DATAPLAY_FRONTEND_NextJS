import React from "react";

export interface Module {
  title: string;
  submodules: {
    title: string;
    content: string[];
  }[];
}

interface CourseSectionProps {
  anchor: string;
  title: string;
  subtitle?: string;
  img?: string;
  feeUpfrontLabel: string;
  feeAfterLabel: string;
  totalLabel: string;
  modules: Module[];
  duration?: string;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-[var(--brand-50)] px-2.5 py-1 text-[11px] font-semibold text-[var(--brand-700)] ring-1 ring-inset ring-[var(--brand-200)]">
      {children}
    </span>
  );
}

function StepDot() {
  return <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand-600)] text-white">•</span>;
}

function OutlineCard({ title, topics }: { title: string; topics: string[] }) {
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

function CapstoneCard({ bullets }: { bullets: string[] }) {
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

function condenseModules(modules: Module[] = []): { outline: { title: string; topics: string[] }[]; capstone: string[] } {
  const outline: { title: string; topics: string[] }[] = [];
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

export default function CourseSection(props: CourseSectionProps) {
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

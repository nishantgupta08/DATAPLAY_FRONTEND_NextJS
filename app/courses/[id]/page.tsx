"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Icon } from "@iconify/react";
import Head from "next/head";
// Import SEO utilities
import { createDataplayCourse, generateCourseSchema } from '@/lib/seo/schemas/course';
import { trackCourseView } from '@/lib/seo/analytics/tracking';
import { generateBreadcrumbSchema, BREADCRUMB_PATTERNS } from '@/lib/seo/schemas/breadcrumb';
import { generateSEOTitle } from '@/lib/seo/utils/meta';

import data from "@/data/content.json";
import InnerBanner from "@/components/ui/InnerBanner";
import SocialBadge from "@/components/ui/SocialBadge";
import OptimizedYouTubeVideo from "@/components/ui/OptimizedYouTubeVideo";

/* ---------- Types ---------- */
type Submodule = { title: string; content: string[] };
type Topic = { title: string; content?: string[]; submodules?: Submodule[] };
type UserCardData = {
  img_url: string; name: string; linkdin_url: string;
  designation_name: string; company_name: string; company_business_link: string;
  details: string;
};
type Course = {
  id: number; title: string; sub_title: string; img_url: string;
  right_side_video_url?: string; courses_content: Topic[]; user_section?: UserCardData[];
};

/* ---------- Highlights (Pay After Placement, etc.) ---------- */
type Highlight = { title: string; description: string; icon: string };
const HIGHLIGHTS: Highlight[] = [
  { title: "Pay After Placement", description: "Zero upfront risk. Start paying only after you land a qualifying role.", icon: "mdi:handshake" },
  { title: "Industry-Expert Led Sessions", description: "Live classes taught by senior practitioners who ship in production.", icon: "mdi:certificate" },
  { title: "Lifetime Access to Live Classes", description: "Rejoin future cohorts, revisit recordings, and stay current forever.", icon: "mdi:infinity" },
  { title: "Dedicated Career Mentorship", description: "1:1 guidance, mock interviews, and resume refactors tailored to you.", icon: "mdi:account-check" },
];
const HighlightCard = ({ item }: { item: Highlight }) => (
  <article className="group relative overflow-hidden rounded-2xl border border-[#E7E9FF] bg-white shadow-[0_8px_24px_rgba(28,26,74,0.06)] hover:shadow-[0_16px_36px_rgba(28,26,74,0.12)] transition-shadow p-4 sm:p-5">
    <div className="flex items-start gap-3">
      <span className="inline-flex items-center justify-center rounded-xl bg-[#EEF2FF] border border-[#E7E9FF] p-2 shrink-0">
        <Icon icon={item.icon} className="w-5 h-5 text-[#1C1A4A]" aria-hidden />
      </span>
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-[#1C1A4A] leading-tight">{item.title}</h3>
        <p className="mt-1 text-sm text-gray-700 leading-relaxed">{item.description}</p>
      </div>
    </div>
    <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br from-[#D8DCFF] to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
  </article>
);
const HighlightsSection = () => (
  <section aria-label="Course highlights" className="relative py-8 lg:py-10">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_0%,#EEF2FF_0%,transparent_60%)]" />
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111827]">Why Choose DataPlay?</h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600">Built to help you crack interviews and perform on the job.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {HIGHLIGHTS.map((h, i) => <HighlightCard key={i} item={h} />)}
      </div>
    </div>
  </section>
);

/* ---------- Small UI bits ---------- */
const CountBadge = ({ count }: { count: number }) => (
  <span className="inline-flex items-center justify-center text-[11px] font-semibold rounded-full px-2 py-1 bg-[#EAEAFF] text-[#1C1A4A] border border-[#DCDDFE]">{count}</span>
);
const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-md bg-[#F3F4FF] border border-[#E7E9FF] px-2.5 py-1 text-xs font-medium text-[#1C1A4A]">{children}</span>
);
const Bullets = ({ bullets }: { bullets: string[] }) => bullets?.length
  ? (<ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed text-[#111827]">
      {bullets.map((p, i) => <li key={i} className="marker:text-[#6C72FF]">{p}</li>)}
     </ul>)
  : (<p className="text-sm text-gray-600">No subtopics yet.</p>);

/* ---------- Submodule tabs (declutter) ---------- */
function ExpandableBullets({ bullets, maxItems = 8 }: { bullets: string[]; maxItems?: number }) {
  if (!bullets?.length) return <p className="text-sm text-gray-600">No subtopics yet.</p>;
  const more = bullets.length - maxItems;
  return (
    <div>
      <Bullets bullets={bullets.slice(0, maxItems)} />
      {more > 0 && (
        <details className="mt-2">
          <summary className="text-xs font-medium text-[#4F46E5] cursor-pointer select-none">Show {more} more</summary>
          <div className="mt-2"><Bullets bullets={bullets.slice(maxItems)} /></div>
        </details>
      )}
    </div>
  );
}
function Drawer({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 md:inset-y-0 md:right-0 md:left-auto md:w-[680px] bg-white rounded-t-2xl md:rounded-l-2xl p-4 sm:p-6 shadow-2xl overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1C1A4A]">{title}</h3>
          <button onClick={onClose} className="rounded-md px-3 py-1 text-sm bg-[#F3F4FF] border border-[#E7E9FF] hover:bg-[#ECEFFF]">Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}
function SubmoduleTabs({ submodules, maxItems }: { submodules: Submodule[]; maxItems: number }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const m = submodules[active];

  return (
    <div>
      <div role="tablist" aria-label="Submodules" className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1 rounded-lg border border-[#E7E9FF] bg-[#F6F7FF]">
        {submodules.map((s, i) => {
          const isActive = i === active;
          const count = s.content?.length ?? 0;
          return (
            <button key={i} role="tab" aria-selected={isActive} onClick={() => setActive(i)}
              className={`shrink-0 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition ${isActive ? "bg-white border border-[#DDE0FF] text-[#1C1A4A] shadow-sm" : "bg-transparent border border-transparent text-[#374151] hover:bg-white/60"}`}>
              <span className="font-medium">{s.title}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/70 border border-[#E7E9FF]">{count}</span>
            </button>
          );
        })}
        {submodules.length > 2 && (
          <button onClick={() => setOpen(true)} className="ml-auto shrink-0 text-xs font-medium text-[#4F46E5] hover:underline px-2 py-1">View all</button>
        )}
      </div>

      <div role="tabpanel" className="mt-3 rounded-xl border border-[#E7E9FF] bg-[#F8F9FF] p-3 sm:p-4">
        <h4 className="text-sm sm:text-base font-semibold text-[#1C1A4A] mb-2">{m.title}</h4>
        <ExpandableBullets bullets={m.content} maxItems={maxItems} />
      </div>

      {open && (
        <Drawer title="All Modules" onClose={() => setOpen(false)}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {submodules.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E7E9FF] p-3 sm:p-4">
                <h5 className="text-sm font-semibold text-[#1C1A4A] mb-2">{s.title}</h5>
                <Bullets bullets={s.content} />
              </div>
            ))}
          </div>
        </Drawer>
      )}
    </div>
  );
}

/* ---------- Tags inferred per module (for quick scannability) ---------- */
type Tag = { label: string; icon: string };
function inferTagsFromTitle(title: string): Tag[] {
  const t = title.toLowerCase();
  if (t.includes("sql") || t.includes("database")) return [
    { label: "SQL", icon: "mdi:database" },
    { label: "Joins", icon: "mdi:table-merge-cells" },
    { label: "Windows", icon: "mdi:window-shutter" },
  ];
  if (t.includes("power bi")) return [
    { label: "Power BI", icon: "mdi:chart-box-outline" },
    { label: "DAX", icon: "mdi:function-variant" },
    { label: "RLS", icon: "mdi:shield-account" },
  ];
  if (t.includes("python")) return [
    { label: "Python", icon: "mdi:language-python" },
    { label: "Pandas", icon: "mdi:leaf" },
    { label: "Plotly", icon: "mdi:chart-line" },
  ];
  if (t.includes("data engineering") || t.includes("big data")) return [
    { label: "Spark", icon: "mdi:fire" },
    { label: "Airflow", icon: "mdi:timeline-clock" },
    { label: "Docker", icon: "mdi:docker" },
    { label: "Cloud", icon: "mdi:cloud-outline" },
  ];
  if (t.includes("foundations") || t.includes("excel")) return [
    { label: "Excel", icon: "mdi:microsoft-excel" },
    { label: "Stats", icon: "mdi:sigma-lower" },
    { label: "KPIs", icon: "mdi:chart-areaspline" },
  ];
  return [];
}

/* ---------- Module section UI ---------- */
function ModuleSection({ idx, topic }: { idx: number; topic: Topic }) {
  const anchor = `module-${idx + 1}`;
  const tags = inferTagsFromTitle(topic.title);

  const subs = topic.submodules ?? [];
  const prereqIdx = subs.findIndex(s => /prereq/i.test(s.title));
  const projIdx = subs.findIndex(s => /project/i.test(s.title));
  const prereqs = prereqIdx >= 0 ? subs[prereqIdx].content : [];
  const projects = projIdx >= 0 ? subs[projIdx].content : [];

  const contentSubs = subs.filter((_, i) => i !== prereqIdx && i !== projIdx);
  const flatFallback = !contentSubs.length && topic.content ? [{ title: "Topics", content: topic.content }] : contentSubs;

  const totalItems = subs.reduce((a, m) => a + (m.content?.length ?? 0), 0) || (topic.content?.length ?? 0);

  return (
    <section id={anchor} className="scroll-mt-28">
      <article className="relative rounded-2xl border border-[#E7E9FF] bg-white shadow-[0_8px_24px_rgba(28,26,74,0.06)] p-4 sm:p-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#1C1A4A]">Module {idx + 1}: {topic.title.replace(/^Module\\s*\\d+\\s*:\\s*/i, "")}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <Chip key={i}><Icon icon={t.icon} className="mr-1 h-3.5 w-3.5" />{t.label}</Chip>
              ))}
            </div>
          </div>
          <CountBadge count={totalItems} />
        </header>

        {prereqs?.length ? (
          <div className="mt-4">
            <p className="text-xs font-semibold text-[#6B7280] mb-2">Prerequisites</p>
            <div className="flex flex-wrap gap-2">
              {prereqs.map((p, i) => <Chip key={i}>{p}</Chip>)}
            </div>
          </div>
        ) : null}

        <div className="mt-4">
          {flatFallback.length ? (
            <SubmoduleTabs submodules={flatFallback} maxItems={8} />
          ) : (
            <p className="text-sm text-gray-600">Content coming soon.</p>
          )}
        </div>

        {projects?.length ? (
          <div className="mt-5">
            <p className="text-sm font-semibold text-[#1C1A4A] mb-2 flex items-center gap-2">
              <Icon icon="mdi:lightbulb-on-outline" />
              Projects
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projects.map((p, i) => (
                <div key={i} className="rounded-xl border border-[#E7E9FF] bg-[#F8F9FF] p-3 text-sm leading-relaxed">{p}</div>
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </section>
  );
}

/* ---------- Sticky module navigator ---------- */
function ModuleNavigator({ topics }: { topics: Topic[] }) {
  const [active, setActive] = useState(0);
  const ids = useMemo(() => topics.map((_, i) => `module-${i + 1}`), [topics]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = e.target.id;
            const idx = ids.indexOf(id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);

  return (
    <nav aria-label="Modules" className="sticky top-28">
      <ul className="space-y-2">
        {topics.map((t, i) => (
          <li key={i}>
            <a href={`#module-${i + 1}`}
               className={`block rounded-lg border px-3 py-2 text-sm transition ${active === i ? "border-[#6C72FF] bg-[#EEF2FF] text-[#1C1A4A]" : "border-[#E7E9FF] hover:bg-[#F7F8FF] text-[#374151]"}`}>
              <span className="font-medium">Module {i + 1}</span>
              <span className="block text-xs text-[#6B7280] truncate">{t.title.replace(/^Module\\s*\\d+\\s*:\\s*/i, "")}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ---------- Testimonial Card ---------- */
const UserCard = ({ userData }: { userData: UserCardData }) => (
  <div className="w-[320px] sm:w-[360px] lg:w-[400px] flex flex-col gap-2 bg-white rounded-2xl sm:rounded-3xl lg:rounded-4xl p-4 sm:p-6 text-center shadow-[0_0_20px_#0000001f]">
    <img src={userData.img_url} alt={`${userData.name} testimonial`} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto border-2 sm:border-4 border-white" />
    <h3 className="flex items-center justify-center gap-2 text-lg sm:text-xl font-bold text-black mt-2">
      <span>{userData.name}</span>
      {userData.linkdin_url && (
        <a href={userData.linkdin_url} target="_blank" rel="noopener noreferrer" aria-label={`${userData.name} LinkedIn`}>
          <Icon icon="skill-icons:linkedin" className="size-4" />
        </a>
      )}
    </h3>
    <p className="text-sm sm:text-base font-semibold text-black">{userData.designation_name}</p>
    <a href={userData.company_business_link} target="_blank" rel="noopener noreferrer">
      <p className="text-sm sm:text-base font-semibold text-black">{userData.company_name}</p>
    </a>
    <p className="text-black text-sm sm:text-base mt-2 leading-relaxed">{userData.details}</p>
  </div>
);

/* ================================ PAGE ================================== */
export default function Page() {
  const params = useParams<{ id: string }>();
  const course_id = params?.id;
  const course = (data.courses as Course[]).find(c => c.id === Number(course_id));

  // Track course view on component mount
  useEffect(() => {
    if (course) {
      trackCourseView(course.title, course_id);
    }
  }, [course, course_id]);

  // Generate dynamic SEO data based on course
  const seoData = useMemo(() => {
    if (!course) return null;
    
    const courseTitle = course.title;
    const courseSubtitle = course.sub_title;
    const courseUrl = `https://dataplay.co.in/courses/${course_id}`;
    
    // Generate keywords based on course content
    const keywords = [
      courseTitle.toLowerCase(),
      courseSubtitle.toLowerCase(),
      "data science course",
      "online course",
      "data analysis",
      "python course",
      "SQL course",
      "machine learning",
      "data engineering",
      "certification",
      "India"
    ].join(", ");

    // Generate structured data using SEO library
    const courseData = createDataplayCourse(
      courseTitle,
      courseSubtitle,
      courseUrl,
      course.img_url
    );
    
    const courseSchema = generateCourseSchema(courseData);
    const breadcrumbSchema = generateBreadcrumbSchema(
      BREADCRUMB_PATTERNS.course(courseTitle, courseUrl)
    );
    
    // Validate schemas before adding to structured data
    const structuredData = [];
    
    // Debug logging removed for production
    
    if (courseSchema && courseSchema['@context']) {
      structuredData.push(courseSchema);
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('Course schema is invalid:', courseSchema);
    }
    
    if (breadcrumbSchema && breadcrumbSchema['@context']) {
      structuredData.push(breadcrumbSchema);
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('Breadcrumb schema is invalid:', breadcrumbSchema);
    }

    return {
      title: generateSEOTitle(`${courseTitle} - ${courseSubtitle}`),
      description: `Learn ${courseTitle} with Dataplay. ${courseSubtitle}. Expert-led sessions, real projects, job placement assistance. Enroll now!`,
      keywords,
      structuredData,
      courseUrl
    };
  }, [course, course_id]);

  if (!course || !seoData) {
    return (
      <>
        <Head>
          <title>Course Not Found | Dataplay</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600">The course you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="author" content="Dataplay" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData?.courseUrl || ''} />
        <meta property="og:title" content={seoData?.title || ''} />
        <meta property="og:description" content={seoData?.description || ''} />
        <meta property="og:image" content={course.img_url} />
        <meta property="og:site_name" content="Dataplay" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seoData?.courseUrl || ''} />
        <meta property="twitter:title" content={seoData?.title || ''} />
        <meta property="twitter:description" content={seoData?.description || ''} />
        <meta property="twitter:image" content={course.img_url} />
        
        {/* Additional SEO */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="geo.position" content="20.5937;78.9629" />
        <meta name="ICBM" content="20.5937, 78.9629" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={seoData?.courseUrl || ''} />
        
        {/* Structured Data */}
        {seoData.structuredData && seoData.structuredData.length > 0 && seoData.structuredData.map((schema, index) => {
          if (!schema || !schema['@context']) {
            return null;
          }
          
          try {
            return (
              <script
                key={`structured-data-${index}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
              />
            );
          } catch (error) {
            console.warn('Failed to render structured data:', error);
            return null;
          }
        })}
      </Head>
      
      <SocialBadge />

      <InnerBanner
        img_url={(course?.img_url as string) ?? ""}
        data={course ? {
          id: String(course.id),
          title: course.title,
          sub_title: course.sub_title,
          img_url: course.img_url,
          right_side_video_url: course.right_side_video_url || "",
        } : {}}
      />

      <HighlightsSection />

      {/* Top video block (kept) */}
      {course?.right_side_video_url && (
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video lg:h-[420px] w-full rounded-2xl overflow-hidden border border-black drop-shadow-[4px_4px_0_#1C1A4A] mb-10">
            <OptimizedYouTubeVideo
              src={course.right_side_video_url}
              title={`About ${course.title}`}
              className="w-full h-full"
              width={560}
              height={315}
              controls={true}
              autoplay={false}
              muted={false}
              lazy={true}
              preload="metadata"
              quality="hd720"
              showThumbnail={true}
              thumbnailQuality="maxres"
            />
          </div>
        </div>
      )}

      {/* Curriculum with module navigator */}
      <div className="relative py-10">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="hidden lg:block lg:col-span-3">
              <ModuleNavigator topics={course?.courses_content ?? []} />
            </aside>

            <main className="lg:col-span-9 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-black mb-2">Curriculum</h2>

              {(course?.courses_content ?? []).map((topic, i) => (
                <ModuleSection key={i} idx={i} topic={topic} />
              ))}
            </main>
          </div>
        </div>
      </div>

      {/* Student / User section (kept) */}
      {course?.user_section?.length ? (
        <div className="relative py-12 lg:py-16">
          <div className="container">
            {course.user_section.length > 1 ? (
              <div className="relative w-screen flex items-center gap-10 overflow-auto scroll-hidden">
                {course.user_section.map((u, i) => <UserCard key={i} userData={u} />)}
              </div>
            ) : (
              <div className="flex justify-center"><UserCard userData={course.user_section[0]} /></div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
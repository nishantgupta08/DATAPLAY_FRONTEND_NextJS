
/**
 * Example course page showing how to add Breadcrumbs + Course JSON-LD.
 * Replace your current page logic and adapt as needed.
 */
import { notFound } from "next/navigation";
import data from "@/app/assets/content.json";
import Breadcrumbs from "@/components/Breadcrumbs";
import CourseJsonLd from "@/components/CourseJsonLd";
import LiteYouTube from "@/components/LiteYouTube";

type Params = { id: string };

export default function CoursePage({ params }: { params: Params }) {
  const course = (data.courses || []).find((c: any) => String(c.id) === params.id);
  if (!course) return notFound();

  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { name: "Home", href: "/" },
        { name: "Courses", href: "/courses" },
        { name: course.title }
      ]} />

      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-lg text-gray-700 mb-6">{course.sub_title}</p>

      {/* Example replacement for heavy iframes */}
      {course.right_side_video_url?.includes("youtube.com/embed/") ? (
        <LiteYouTube
          id={course.right_side_video_url.split("/embed/")[1].split(/[?&]/)[0]}
          title={`About ${course.title}`}
        />
      ) : null}

      {/* Course JSON-LD for rich results */}
      <CourseJsonLd course={{ title: course.title, sub_title: course.sub_title, id: course.id }} />
    </main>
  );
}

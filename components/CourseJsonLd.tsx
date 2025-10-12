
'use client';
import React from 'react';

type Course = {
  title: string;
  sub_title?: string;
  id?: number | string;
};

export default function CourseJsonLd({ course }: { course: Course }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.sub_title || "",
    provider: {
      "@type": "Organization",
      name: "DataPlay",
      sameAs: "https://dataplay.in"
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

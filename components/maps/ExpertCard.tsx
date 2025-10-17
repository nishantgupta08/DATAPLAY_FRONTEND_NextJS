import React from "react";
import { Expert } from "@/types";

type ExpertCardProps = Expert;

export default function ExpertCard({ name, role, img, linkedin, description }: ExpertCardProps) {
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


'use client';
import Link from 'next/link';
import React from 'react';

type Crumb = { name: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1 text-sm text-gray-600">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {c.href && !isLast ? (
                <Link href={c.href} className="hover:underline text-gray-700">{c.name}</Link>
              ) : (
                <span aria-current="page" className="text-gray-900 font-medium">{c.name}</span>
              )}
              {!isLast && <span className="mx-1 text-gray-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

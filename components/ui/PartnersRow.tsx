import React from "react";
import { Partner } from "@/types";

interface PartnersRowProps {
  items: Partner[];
}

export default function PartnersRow({ items }: PartnersRowProps) {
  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
      {items.map((p) => (
        <div key={p.name} className="flex h-16 items-center justify-center rounded-lg px-6">
          {p.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.logo} alt={p.name} className="max-h-12 w-auto opacity-90" />
          ) : (
            <span className="text-sm text-white/85">{p.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}

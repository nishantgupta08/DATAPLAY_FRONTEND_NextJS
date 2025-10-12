"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

/**
 * A small floating CTA that appears after scrolling.
 * Links to #become-mentor by default.
 */
export default function StickyCTA({ href = "#become-mentor", label = "Become a mentor" }: { href?: string; label?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <Link
      href={href}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center px-5 py-3 rounded-full font-bold bg-black text-white border-2 border-black shadow-[6px_6px_0_#FF2714] hover:translate-y-[-1px] active:translate-y-[1px] transition-transform"
    >
      {label}
    </Link>
  );
}
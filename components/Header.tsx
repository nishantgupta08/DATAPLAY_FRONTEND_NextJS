"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

type NavLink = { label: string; href: string };

const LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about-us" },
  { label: "Courses", href: "#courses" },
  { label: "Contact Us", href: "#contact-us" },
  { label: "FAQ", href: "/faq" }, // ← new
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route/hash change
  useEffect(() => {
    const onHashChange = () => setOpen(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all",
        "supports-[backdrop-filter]:bg-darkBlue/75 bg-darkBlue",
        "backdrop-blur-md",
        scrolled ? "shadow-[0_6px_24px_rgba(0,0,0,0.15)] border-b border-white/10" : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="container">
        <div className="flex items-center justify-between h-[64px] md:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
            <Image
              src="/Brand-Logo.svg"
              alt="DATAPLAY"
              width={150}
              height={32}
              className="h-8 w-auto md:h-10 md:w-auto"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/90 hover:text-white text-sm font-semibold tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#become-mentor"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 text-white/90 hover:text-white hover:border-white px-4 py-2 text-sm font-bold transition"
            >
              <Icon icon="mdi:account-tie-outline" className="text-base" />
              Become a Mentor
            </a>
            <a
              href="#courses"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black border-2 border-black px-4 py-2 text-sm font-extrabold shadow-[4px_4px_0_#FF2714] hover:translate-y-[-1px] active:translate-y-[1px] transition"
            >
              <Icon icon="mdi:rocket-launch-outline" className="text-base" />
              Apply Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center size-10 rounded-lg border border-white/20 text-white"
          >
            <Icon icon={open ? "mdi:close" : "mdi:menu"} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={[
          "lg:hidden overflow-hidden transition-[max-height] duration-300",
          open ? "max-h-96" : "max-h-0",
        ].join(" ")}
      >
        <div className="container pb-4">
          <nav className="grid gap-2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-white/90 hover:text-white hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              href="#become-mentor"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 text-white/90 hover:text-white hover:border-white px-4 py-2 text-sm font-bold transition"
            >
              <Icon icon="mdi:account-tie-outline" className="text-base" />
              Mentor
            </a>
            <a
              href="#courses"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black border-2 border-black px-4 py-2 text-sm font-extrabold shadow-[4px_4px_0_#FF2714]"
            >
              <Icon icon="mdi:rocket-launch-outline" className="text-base" />
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
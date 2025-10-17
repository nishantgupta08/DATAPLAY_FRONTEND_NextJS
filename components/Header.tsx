"use client";

import React, { useEffect, useState, memo, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

type NavLink = { label: string; href: string };

const LINKS: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about-us" },
  { label: "Courses", href: "/#courses" },
  { label: "Contact Us", href: "/#contact-us" },
  { label: "FAQ", href: "/faq" },
];

const Header = memo(function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll shadow effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on route change (hash or pathname)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const toggleMenu = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-300",
        "supports-[backdrop-filter]:bg-darkBlue/75 bg-darkBlue",
        "backdrop-blur-md",
        scrolled
          ? "shadow-[0_6px_24px_rgba(0,0,0,0.15)] border-b border-white/10"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="container">
        <div className="flex items-center justify-between h-[64px] md:h-[72px]">
          {/* Logo */}
          <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2">
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
              <Link key={l.href} href={l.href}>
                <span className="text-white/90 hover:text-white text-sm font-semibold tracking-wide">
                  {l.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
          </div>

          {/* Mobile menu toggle */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={toggleMenu}
            className="lg:hidden inline-flex items-center justify-center size-10 rounded-lg border border-white/20 text-white"
          >
            <Icon icon={open ? "mdi:close" : "mdi:menu"} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"
          }`}
      >
        <div className="container pb-4">
          <nav className="grid gap-2">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                <span
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-white/90 hover:text-white hover:bg-white/10"
                >
                  {l.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link href="#become-mentor">
              <span
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 text-white/90 hover:text-white hover:border-white px-4 py-2 text-sm font-bold transition"
              >
                <Icon icon="mdi:account-tie-outline" className="text-base" />
                Mentor
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;

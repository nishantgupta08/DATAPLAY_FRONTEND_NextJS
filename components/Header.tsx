"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Courses", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "Corporate Training", href: "#" },
    { name: "Consultancy", href: "#" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative bg-darkBlue text-white">
      <div className="container mx-auto px-4">
        <div className="flex max-lg:justify-between items-center lg:gap-20 h-[62px] md:h-[100px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/Brand-Logo.svg"
              alt="header-logo"
              width={150}
              height={28}
              className="h-7 w-auto md:h-12 md:w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-4 xl:gap-6 2xl:gap-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="hover:text-orange text-base xl:text-lg 2xl:text-[22px] font-medium text-white transition-colors duration-200 whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-white hover:text-orange transition-colors duration-200 p-1 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <Icon
              icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"}
              className="h-[30px] w-[30px]"
            />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-darkBlue border-t border-gray-700 shadow-lg z-50">
            <nav className="px-4 py-4">
              <ul className="flex flex-col space-y-3">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="block hover:text-orange text-base font-medium text-white transition-colors duration-200 py-2 px-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

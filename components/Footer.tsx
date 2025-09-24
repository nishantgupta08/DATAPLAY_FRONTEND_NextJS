// components/Footer.jsx
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

const Footer = () => {
  // Data arrays for footer links
  const informationLinks = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Testimonial", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  const serviceLinks = [
    { label: "Courses", href: "#" },
    { label: "Consultancy", href: "#" },
    { label: "Corporate Training", href: "#" },
  ];

  const socialMediaLinks = [
    {
      icon: "uil:linkedin",
      href: "#",
    },
    {
      icon: "fa7-brands:square-twitter",
      href: "#",
    },
    {
      icon: "ant-design:facebook-filled",
      href: "#",
    },
    {
      icon: "ant-design:instagram-filled",
      href: "#",
    },
  ];

  const bottomFooterLinks = [
    { label: "Term of Use", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="relative bg-darkBlue text-white">
      {/* Main Footer Content */}
      <div className="relative container py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/Brand-Logo.svg"
                alt="footer-logo"
                width={230}
                height={50}
                className="max-w-full h-auto"
              />
            </div>
            <p className="text-white text-base md:text-lg">
              At DATAPLAY, we are not just educators, we are navigators guiding
              you to your best self, where satisfaction and success intertwine
              seamlessly.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Information Links */}
              <div className="relative space-y-4 md:space-y-6">
                <h4 className="text-lg md:text-xl font-bold text-purple">
                  Information
                </h4>
                <ul className="relative space-y-2 md:space-y-2.5">
                  {informationLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-base md:text-lg text-white hover:text-orange transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Services */}
              <div className="relative space-y-4 md:space-y-6">
                <h4 className="text-lg md:text-xl font-bold text-purple">
                  Our Services
                </h4>
                <ul className="relative space-y-2 md:space-y-2.5">
                  {serviceLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-base md:text-lg text-white hover:text-orange transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get In Touch */}
              <div className="relative space-y-4 md:space-y-6 md:col-span-2 lg:col-span-1">
                <h4 className="text-lg md:text-xl font-bold text-purple">
                  Get In Touch
                </h4>
                <div className="relative space-y-3 text-gray-300">
                  <a
                    href="mailto:digitaldataplay@gmail.com"
                    className="flex items-start md:items-center gap-2 text-white hover:text-purple transition-colors"
                  >
                    <Icon
                      icon="ic:baseline-email"
                      className="size-5 md:size-6 text-purple shrink-0 mt-0.5 md:mt-0"
                    />
                    <span className="text-sm md:text-base break-all">
                      digitaldataplay@gmail.com
                    </span>
                  </a>
                  <a
                    href="tel:9876543211"
                    className="flex items-center gap-2 text-white hover:text-purple transition-colors"
                  >
                    <Icon
                      icon="carbon:phone-filled"
                      className="size-5 md:size-6 text-purple shrink-0"
                    />
                    <span className="text-sm md:text-base">+91 9876543211</span>
                  </a>
                  <p className="flex items-start gap-2 text-white hover:text-purple mt-6 md:mt-8">
                    <Icon
                      icon="typcn:location"
                      className="size-5 md:size-6 text-purple shrink-0 mt-0.5 md:mt-0"
                    />
                    <span className="text-sm md:text-base">
                      BG/02 Chitrakoot, New Mall of Galaxy, Sector, Rajkot,
                      360021
                    </span>
                  </p>
                </div>

                {/* Social Media */}
                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <h5 className="text-base md:text-lg font-semibold">
                    Follow Us :
                  </h5>
                  <div className="flex space-x-3">
                    {socialMediaLinks.map((social, index) => {
                      return (
                        <a
                          key={index}
                          href={social.href}
                          className={`flex-center text-purple hover:text-orange transition duration-300`}
                        >
                          <Icon
                            icon={social.icon}
                            className="size-5 md:size-6"
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative border-t border-white/30 py-4 md:py-5">
        <div className="container flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="text-sm md:text-lg text-white text-center sm:text-left">
            © 2024 dataplay.com. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex text-sm md:text-lg divide-x divide-white">
            {bottomFooterLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:text-orange transition-all px-3 md:px-5 leading-none"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Bar */}
      <div className="relative block w-full bg-purple h-10"></div>
    </footer>
  );
};

export default Footer;

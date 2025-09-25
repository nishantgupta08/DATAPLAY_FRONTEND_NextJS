/* eslint-disable @next/next/no-img-element */
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

const InnerBanner = () => {
  return (
    <div className="relative bg-lightOrange max-lg:py-16 mb-8 md:mb-12 lg:mb-20">
      <img
        src="/moon.png"
        alt="background Icon"
        className="absolute top-[10%] left-[5%] hidden sm:block w-8 sm:w-12 lg:w-16"
      />
      <img
        src="/star.png"
        alt="background Icon"
        className="absolute top-[5%] right-[40%] hidden sm:block w-6 sm:w-8 lg:w-12"
      />
      <img
        src="/paperplan.png"
        alt="background Icon"
        className="absolute top-[15%] right-[30%] hidden sm:block w-6 sm:w-8 lg:w-12"
      />
      <img
        src="/ring.png"
        alt="background Icon"
        className="absolute top-0 right-0 hidden sm:block "
      />
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-10">
          {/* Content Section */}
          <div className="relative lg:py-16 flex-1">
            <div className="text-sm sm:text-base md:text-lg lg:text-xl text-darkBlue">
              <Link
                href="/"
                className="text-darkBlue hover:text-orange transition-colors"
              >
                Home &gt;
              </Link>{" "}
              <span className="text-orange">Data Engineering</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-darkBlue my-3 md:my-4">
              Data Engineering
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-xl text-darkBlue leading-relaxed">
              This comprehensive program takes you on a transformative learning
              journey, equipping you with a wide range of skills and expertise
              to tackle the most complex data challenges in today&apos;s
              data-driven world.
            </p>
            <div className="flex items-center gap-2 text-sm sm:text-base my-4 md:my-6">
              <span className="flex items-center text-darkOrange">
                <Icon icon="mdi:star" className="size-4 sm:size-5" />
                <Icon icon="mdi:star" className="size-4 sm:size-5" />
                <Icon icon="mdi:star" className="size-4 sm:size-5" />
                <Icon icon="mdi:star" className="size-4 sm:size-5" />
                <Icon icon="mingcute:star-line" className="size-4 sm:size-5" />
              </span>
              <span className="font-medium">1,292 Reviews</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base md:text-lg text-black">
              <p>Instructor:</p>
              <p className="font-medium underline hover:text-orange cursor-pointer transition-colors">
                Dr. Robin Malviya
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative lg:-mb-10 h-auto w-full max-w-full lg:max-w-[400px] xl:max-w-[550px] border border-bor bg-white p-4 sm:p-5 rounded-lg mx-auto lg:mx-0">
            <img
              src="/course.png"
              alt="Course Image"
              className="relative w-full rounded-lg sm:rounded-xl aspect-video object-cover"
            />
            <p className="relative block text-center text-lg sm:text-xl font-bold text-darkBlue mt-3 sm:mt-4">
              Flexible Schedule
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerBanner;

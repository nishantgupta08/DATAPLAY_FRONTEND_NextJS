/* eslint-disable @next/next/no-img-element */
import InnerBanner from "@/components/InnerBanner";
import { Icon } from "@iconify/react";
import React from "react";

// Main App component
const App = () => {
  return (
    <>
      <InnerBanner />
      <div className="relative py-12 lg:py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8">
            {/* Course Content Section */}
            <div className="lg:col-span-7">
              <div className="relative rounded-xl p-4 sm:p-6 border border-bor">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl text-black mb-4 sm:mb-6">
                  Course Content
                </h2>
                <div className="relative space-y-2 sm:space-y-3 max-h-[400px] sm:max-h-[500px] overflow-y-auto overflow-x-hidden">
                  {[
                    "Introduction to Data Engineering",
                    "Databases and Sql Fundamentals",
                    "Data warehousing - Snowflake",
                    "Programming for data engineering",
                    "Hadoop Eco system",
                    "Apache spark fundamentals and pyspark",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="relative flex items-center p-3 sm:p-4 bg-[#EEF2FF] border border-bor rounded-lg"
                    >
                      <span className="text-base sm:text-lg lg:text-xl font-semibold text-black">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="lg:col-span-5">
              <div className="relative aspect-video lg:h-[400px] w-full">
                <iframe
                  className="w-full h-full rounded-xl sm:rounded-2xl lg:rounded-3xl border border-black drop-shadow-[2px_2px_0_#1C1A4A] sm:drop-shadow-[4px_4px_0_#1C1A4A] lg:drop-shadow-[6px_6px_0_#1C1A4A]"
                  src="https://www.youtube.com/embed/3JZ_D3ELwOQ"
                  title="WELCOME TO DATAPLAY"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-12 lg:py-16 overflow-auto scroll-hidden">
        <div className="container">
          <div className="relative w-screen flex items-center gap-10">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-0.5 bg-white rounded-2xl sm:rounded-3xl lg:rounded-4xl p-4 sm:p-6 text-center shadow-[0px_0px_20px_0px_#00000020] sm:shadow-[0px_0px_30px_0px_#00000025] lg:shadow-[0px_0px_40px_0px_#00000033] min-w-[280px] sm:min-w-[320px] lg:min-w-0"
              >
                <img
                  src="/ladyuser.png"
                  alt="Testimonial"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto border-2 sm:border-4 border-white"
                />
                <h3 className="relative flex items-center justify-center gap-2 text-lg sm:text-xl font-bold text-black mt-2">
                  <span>John Doe</span>
                  <Icon
                    icon="skill-icons:linkedin"
                    className="size-3 sm:size-4"
                  />
                </h3>
                <p className="flex items-center justify-center gap-1 text-xs sm:text-sm font-semibold text-black">
                  <span>Chief Executive Officer</span>
                  <Icon
                    icon="flat-color-icons:google"
                    className="size-4 sm:size-6"
                  />
                </p>
                <p className="text-black text-sm sm:text-base mt-2 leading-relaxed">
                  Lorem ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

"use client"
/* eslint-disable @next/next/no-img-element */
import InnerBanner from "@/components/InnerBanner";
import { Icon } from "@iconify/react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import data from "@/app/assets/content.json"
import SocialBadge from "@/components/SocialBadge";

// Main App component
const App = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const params = useParams<{ id: string; }>()
  const course_id = params?.id
  const coursesData = data.courses.find((course) => course.id === Number(course_id))
  // clg
  return (
    <>
      <SocialBadge />
      {/* {router..id} */}
      <InnerBanner
        img_url={coursesData?.img_url as string}
        data={
          coursesData
            ? {
              id: coursesData.id.toString(),
              title: coursesData.title,
              sub_title: coursesData.sub_title,
              img_url: coursesData.img_url,
              right_side_video_url: coursesData.right_side_video_url
            }
            : {}
        }
      />
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
                  {coursesData?.courses_content?.map((item, index) => {
                    const isOpen = openIndex === index;

                    return (
                      <div key={index} className="bg-[#EEF2FF] border border-bor rounded-lg overflow-hidden">
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          className="w-full text-left flex justify-between items-center p-3 sm:p-4"
                        >
                          <span className="text-base sm:text-lg lg:text-xl font-semibold text-black">
                            {item.title}
                          </span>
                          {item.content.length > 0 && <svg
                            className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                              }`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>}
                        </button>

                        {/* Collapsible content */}
                        <div
                          className={`transition-all duration-300 ease-in-out px-4 pb-4 ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                            } overflow-hidden`}
                        >
                          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
                            {item.content.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Video Section */}
            <div className="lg:col-span-5">
              <div className="relative aspect-video lg:h-[400px] w-full">
                {
                  coursesData?.right_side_video_url && (

                    <iframe
                      className="w-full h-full rounded-xl sm:rounded-2xl lg:rounded-3xl border border-black drop-shadow-[2px_2px_0_#1C1A4A] sm:drop-shadow-[4px_4px_0_#1C1A4A] lg:drop-shadow-[6px_6px_0_#1C1A4A]"
                      src={coursesData?.right_side_video_url}
                      title="WELCOME TO DATAPLAY"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {coursesData?.user_section && coursesData?.user_section?.length > 0 && <div className="relative py-12 lg:py-16 overflow-auto scroll-hidden">
        <div className="container">
          <div className="relative w-screen flex items-center gap-10">
            {coursesData?.user_section.map((userData, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-0.5 bg-white rounded-2xl sm:rounded-3xl lg:rounded-4xl p-4 sm:p-6 text-center shadow-[0px_0px_20px_0px_#00000020] sm:shadow-[0px_0px_30px_0px_#00000025] lg:shadow-[0px_0px_40px_0px_#00000033] min-w-[280px] sm:min-w-[320px] lg:min-w-0"
              >
                <img
                  src={userData.img_url}
                  alt="Testimonial"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto border-2 sm:border-4 border-white"
                />
                <h3 className="relative flex items-center justify-center gap-2 text-lg sm:text-xl font-bold text-black mt-2">
                  <span>{userData.name}</span>
                  {userData.linkdin_url && (
                    <a
                      href={userData.linkdin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    // className="absolute bottom-0 right-0"
                    >
                      <Icon icon="skill-icons:linkedin" className="size-3 sm:size-4" />
                    </a>
                  )}
                </h3>
                <p className="flex items-center justify-center gap-1 text-xs sm:text-sm font-semibold text-black">
                  <span>{userData.designation_name}</span>
                </p>
                <a href={userData.company_business_link} target="_blank">
                  <p className="flex items-center justify-center gap-1 text-xs sm:text-sm font-semibold text-black">
                    <span>{userData.company_name}</span>
                  </p>

                </a>
                <p className="text-black text-sm sm:text-base mt-2 leading-relaxed">
                  {userData.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>}
    </>
  );
};

export default App;

/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import data from "@/app/assets/content.json"
import Link from "next/link";

const Courses = () => {
  const coursesData = data.homepage.courses

  return (
    <section className="relative py-12 sm:py-16 md:py-20" id="courses">
      <div className="container">
        <div className="relative flex-center flex-col leading-none gap-3 sm:gap-4 lg:gap-5 text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-block bg-purple text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-lg lg:text-[22px] uppercase font-semibold">
            COURSES
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-[50px] font-light text-black leading-tight">
            {coursesData.title}
          </h2>
          <p className="text-black text-base sm:text-lg max-w-2xl mx-auto">
            {coursesData.sub_title}

          </p>
        </div>

        {/* Swiper Carousel for Courses */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-course",
              prevEl: ".swiper-button-prev-course",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {coursesData.courses.map((course, index) => (
              <SwiperSlide key={index}>
                <div className="relative p-3 lg:p-6 bg-white rounded-xl sm:rounded-2xl transition-all border border-black/20 overflow-hidden hover:shadow-lg h-full">
                  <img
                    src={course.img_url}
                    alt="Course Image"
                    className="relative w-full rounded-lg sm:rounded-xl aspect-video object-cover"
                  />

                  <div className="relative mt-4 sm:mt-6">
                    <div className="relative mb-3">
                      <div className="relative w-fit bg-gray-200 text-black px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                        {course.highlighted_title}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-[22px] font-bold text-black mt-3 sm:mt-4 mb-2 sm:mb-3 leading-tight">
                      {course.title}
                    </h3>

                    <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                      {course.features.map((topic, topicIndex) => (
                        <li
                          key={topicIndex}
                          className="flex items-start text-black text-xs sm:text-sm"
                        >
                          <span className="size-1.5 sm:size-2 bg-purple rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>

                    <Link href={`/courses/${course.id}`} className="!cursor-pointer">
                      <button className="!cursor-pointer w-full bg-gradient-to-r from-orange to-orange/50 text-white py-2.5 sm:py-3 text-base sm:text-lg md:text-xl rounded-xl sm:rounded-2xl font-semibold transition duration-300 hover:from-orange/90 hover:to-orange/40">
                        View Course
                      </button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="swiper-button-prev-course absolute -left-2 sm:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange hover:bg-darkOrange text-black w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition duration-300 shadow-lg">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button className="swiper-button-next-course absolute -right-2 sm:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange hover:bg-darkOrange text-black w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition duration-300 shadow-lg">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Courses;

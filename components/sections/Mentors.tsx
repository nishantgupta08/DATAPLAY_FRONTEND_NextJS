"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import data from "@/data/content.json"
const Mentors = () => {
  const mentorsData = data.homepage.mentors

  return (
    <section className="relative py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="relative flex-center flex-col leading-none gap-3 sm:gap-4 lg:gap-5 text-center mb-20">
          <div className="inline-block bg-purple text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-lg lg:text-[22px] uppercase font-semibold">
            Mentors
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-[50px] font-bold text-black leading-tight">
            {mentorsData.title}
          </h2>
          <p className="text-black text-base sm:text-lg max-w-2xl mx-auto">
            {mentorsData.sub_title}
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-mentor",
              prevEl: ".swiper-button-prev-mentor",
            }}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.1,
              },
              768: {
                slidesPerView: 1.3,
              },
              1024: {
                slidesPerView: 1.6,
              },
              1280: {
                slidesPerView: 2,
              },
            }}
          >
            {mentorsData.mentors.map((mentor, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gradient-to-b from-[#FF9393] to-[#8073E5] rounded-2xl md:rounded-3xl text-white relative overflow-visible min-h-[300px] md:min-h-[400px] flex flex-col md:flex-row md:gap-4 lg:gap-6">

                  {/* Image */}
                  <div className="w-full md:w-5/12 relative h-48 md:h-auto">
                    <div className="w-full h-full flex justify-center items-center md:items-end md:justify-start">
                      <div className="relative w-[220px] h-[200px] sm:w-[160px] sm:h-[160px] md:w-full md:h-full">
                        <Image
                          src={mentor.img}
                          alt={mentor.name}
                          fill
                          className="object-contain object-center md:object-left-bottom"
                        />
                      </div>
                    </div>
                  </div>


                  {/* Text Content */}
                  <div className="w-full md:w-7/12 p-4 md:p-4 lg:p-6 flex flex-col justify-center items-center md:items-start text-center md:text-left relative z-20">


                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                      {mentor.name}
                    </h3>
                    <h4 className="text-base md:text-lg font-semibold mb-1 opacity-95">
                      {mentor.current_company}
                    </h4>
                    <h5 className="text-xs md:text-sm font-medium mb-3 md:mb-4 opacity-90">
                      {mentor.company_details_2 || '\u00A0'}
                    </h5>
                    <p className="text-xs md:text-sm opacity-90 mb-4 md:mb-6 leading-relaxed">
                      {mentor.description}
                    </p>

                    {mentor.linkdin_profile && <Button
                      title="View Profile"
                      icon="mdi:linkedin"
                      className="w-fit text-xs md:text-sm"
                      variant="lightOrange"
                      href={mentor.linkdin_profile}
                      isLink
                    />}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <button className="swiper-button-prev-mentor absolute -left-2 sm:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange hover:bg-darkOrange text-black w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition duration-300 shadow-lg">
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

          <button className="swiper-button-next-mentor absolute -right-2 sm:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange hover:bg-darkOrange text-black w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition duration-300 shadow-lg">
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

export default Mentors;

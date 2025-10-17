/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect, memo, useMemo, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react";
import data from "@/app/assets/content.json";
import TestimonialCard from "@/components/ui/TestimonialCard";

export type Testimonial = {
  id: number;
  isTypeVideo: boolean;
  video_url?: string;
  description?: string;
  person_detail: {
    img: string;
    name: string;
    designation: string;
    linkdin_profile?: string;
  };
  transformation: {
    old_designation: string;
    old_title: string;
    new_designation: string;
    new_title: string;
  };
};

const Testimonials = memo(() => {
  const testimonialData = useMemo(() => data.homepage.testimonial, []);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalContent(null);
  }, []);

  return (
    <section className="relative py-16 lg:py-20 bg-white">
      <div className="container">
        <div className="relative flex-center flex-col leading-none gap-3 sm:gap-4 lg:gap-5 text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-block bg-purple text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-lg lg:text-[22px] uppercase font-semibold">
            testimonials
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-[50px] font-bold text-black leading-tight">
            {testimonialData.title}
          </h2>
          <p className="text-black text-base sm:text-lg max-w-2xl mx-auto">
            {testimonialData.subtitle}
          </p>
        </div>

        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              480: { slidesPerView: 1.2, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 24 },
              768: { slidesPerView: 2.5, spaceBetween: 28 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            className="testimonials-swiper !px-2 sm:!px-4 lg:!px-6"
          >
            {testimonialData.testimonials.map((t: any) => {
              return (
                <SwiperSlide key={t.id} className="pb-2">

                  <TestimonialCard t={t} onReadMore={openModal} />
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute -left-2 sm:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange hover:bg-darkOrange text-black w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition duration-300 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="swiper-button-next-custom absolute -right-2 sm:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange hover:bg-darkOrange text-black w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition duration-300 shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6  bg-opacity-30 backdrop-blur-lg"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-8 relative shadow-xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <p className="text-gray-900 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
              {modalContent}
            </p>
          </div>
        </div>
      )}

    </section >
  );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials;

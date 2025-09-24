/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "./widgets/Button";
import { Icon } from "@iconify/react";

const testimonials = [
  {
    id: 1,
    name: "Konstantin Lekomtsev",
    title: "Our Career Tech Achiever",
    careerStart: {
      role: "Research Associate",
      company: "University of London",
    },
    careerNow: {
      role: "Senior Data Scientist",
      company: "Walmart • Bangalore",
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    text: null,
  },
  {
    id: 2,
    name: "Sophia Williams",
    title: "Machine Learning Expert",
    careerStart: { role: "Intern", company: "Microsoft" },
    careerNow: { role: "Lead ML Engineer", company: "Google • California" },
    videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    text: null,
  },
  {
    id: 3,
    name: "Rahul Mehta",
    title: "Our Career Tech Achiever",
    careerStart: { role: "Research Associate", company: "IIT Delhi" },
    careerNow: { role: "Senior Data Scientist", company: "Amazon • Bangalore" },
    videoUrl: null,
    text: `"I enrolled in multiple courses earlier for Data Science but I found Dataplay’s course to be the most comprehensive. Every topic is covered in depth with real-life projects. PPTs are short, clear and concise. Now I am confident..."`,
  },
  {
    id: 4,
    name: "Emily Johnson",
    title: "AI Specialist",
    careerStart: { role: "Junior Analyst", company: "Accenture" },
    careerNow: { role: "AI Lead", company: "Meta • London" },
    videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    text: null,
  },
  {
    id: 5,
    name: "David Kim",
    title: "Data Engineer",
    careerStart: { role: "Trainee", company: "Oracle" },
    careerNow: { role: "Lead Data Engineer", company: "Netflix • LA" },
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    text: null,
  },
  {
    id: 6,
    name: "Anna Lee",
    title: "Deep Learning Researcher",
    careerStart: { role: "Assistant", company: "Stanford" },
    careerNow: { role: "AI Scientist", company: "OpenAI • SF" },
    videoUrl: null,
    text: `"This program helped me get into cutting-edge AI research with confidence and clarity. The real-world projects were game changers."`,
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-16 lg:py-20 bg-white">
      <div className="container">
        <div className="relative flex-center flex-col leading-none gap-3 sm:gap-4 lg:gap-5 text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-block bg-purple text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-lg lg:text-[22px] uppercase font-semibold">
            testimonials
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-[50px] font-bold text-black leading-tight">
            Our Students Speak
          </h2>
          <p className="text-black text-base sm:text-lg max-w-2xl mx-auto">
            Transformative Testimonials from our Champions
          </p>
        </div>

        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 28,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className="testimonials-swiper !px-2 sm:!px-4 lg:!px-6"
            style={{ height: "auto" }}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} className="pb-2">
                <div className="relative flex flex-col justify-between p-3 sm:p-4 lg:p-5 gap-3 sm:gap-4 lg:gap-5 border border-black bg-white rounded-2xl sm:rounded-3xl lg:rounded-4xl transition overflow-hidden drop-shadow-[2px_2px_0_black] sm:drop-shadow-[3px_3px_0_black] lg:drop-shadow-[4px_4px_0_black] h-full">
                  {/* Video or Text */}
                  {t.videoUrl ? (
                    <div className="relative h-[200px] sm:h-[250px] lg:h-[300px]">
                      <iframe
                        className="w-full h-full rounded-xl sm:rounded-2xl lg:rounded-3xl border border-black"
                        src={t.videoUrl}
                        title={t.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <p className="text-black text-base sm:text-lg lg:text-xl font-light line-clamp-4 sm:line-clamp-5">
                        {t.text}
                      </p>
                      <button className="text-orange font-medium text-sm sm:text-base transition duration-300 hover:underline">
                        Read More
                      </button>
                    </div>
                  )}

                  {/* Profile Section */}
                  <div className="relative">
                    <div className="flex items-center mb-3 sm:mb-4 gap-3 sm:gap-4">
                      <div className="relative flex-center">
                        <img
                          src={"/user.png"}
                          className="size-12 sm:size-16 lg:size-[72px] bg-gray-300 rounded-full"
                        />
                        <Icon
                          icon="skill-icons:linkedin"
                          className="size-3 sm:size-4 absolute bottom-0 right-0"
                        />
                      </div>
                      <div className="relative flex flex-col gap-0 flex-1 min-w-0">
                        <h4 className="text-base sm:text-lg lg:text-xl font-bold truncate">
                          {t.name}
                        </h4>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                          {t.title}
                        </p>
                      </div>
                    </div>

                    {/* Career Path */}
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                      <div className="relative text-black flex flex-col gap-0 text-center flex-1 min-w-0">
                        <p className="text-sm sm:text-base lg:text-xl font-semibold truncate">
                          {t.careerStart.role}
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                          {t.careerStart.company}
                        </p>
                      </div>
                      <div className="flex items-center flex-shrink-0">
                        <svg
                          className="w-8 sm:w-10 lg:w-[51px] h-3 sm:h-4 lg:h-4"
                          viewBox="0 0 51 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M50.7071 8.70711C51.0976 8.31658 51.0976 7.68342 50.7071 7.29289L44.3431 0.928932C43.9526 0.538408 43.3195 0.538408 42.9289 0.928932C42.5384 1.31946 42.5384 1.95262 42.9289 2.34315L48.5858 8L42.9289 13.6569C42.5384 14.0474 42.5384 14.6805 42.9289 15.0711C43.3195 15.4616 43.9526 15.4616 44.3431 15.0711L50.7071 8.70711ZM0 8V9H50V8V7H0V8Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div className="relative text-black flex flex-col gap-0 text-center flex-1 min-w-0">
                        <p className="text-sm sm:text-base lg:text-xl font-semibold truncate">
                          {t.careerNow.role}
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                          {t.careerNow.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute -left-2 sm:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange hover:bg-darkOrange text-black w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition duration-300 shadow-lg">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
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

          <button className="swiper-button-next-custom absolute -right-2 sm:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-orange hover:bg-darkOrange text-black w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition duration-300 shadow-lg">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
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

        <Button
          title="View More"
          icon="mdi:arrow-right"
          className="mx-auto mt-8 sm:mt-10 lg:mt-12"
        />
      </div>
    </section>
  );
};

export default Testimonials;

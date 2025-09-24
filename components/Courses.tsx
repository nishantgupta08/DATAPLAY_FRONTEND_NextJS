/* eslint-disable @next/next/no-img-element */
import { ArrowRight } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      title: "Data Engineering",
      category: "DATA SCIENCE",
      topics: [
        "Data Collection and Storage",
        "Data Cleaning and Preprocessing",
      ],
      image: "/course.png",
      badges: ["LaunchPad", "DS Essentials"],
      discount: "100%",
    },
    {
      title: "Data Analyst",
      category: "DATA SCIENCE",
      topics: [
        "Data Collection and Storage",
        "Data Cleaning and Preprocessing",
      ],
      image: "/course.png",
      badges: ["LaunchPad", "DS Essentials"],
      discount: "100%",
    },
    {
      title: "MERN STACK",
      category: "Web Development",
      topics: [
        "Data Collection and Storage",
        "Data Cleaning and Preprocessing",
      ],
      image: "/course.png",
      badges: ["LaunchPad", "DS Essentials"],
      discount: "100%",
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-20">
      <div className="container">
        <div className="relative flex-center flex-col leading-none gap-3 sm:gap-4 lg:gap-5 text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-block bg-purple text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-lg lg:text-[22px] uppercase font-semibold">
            COURSES
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-[50px] font-light text-black leading-tight">
            Industry Expert Certified
          </h2>
          <p className="text-black text-base sm:text-lg max-w-2xl mx-auto">
            Your ultimate comprehensive and tailored solutions.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 sm:mb-12">
          {courses.map((course, index) => (
            <div
              key={index}
              className="relative p-3 lg:p-6 bg-white rounded-xl sm:rounded-2xl transition-all border border-black/20 overflow-hidden hover:shadow-lg"
            >
              {/* Course Image with badges */}
              <img
                src={course.image}
                alt="Course Image"
                className="relative w-full rounded-lg sm:rounded-xl aspect-video object-cover"
              />

              {/* Course Details */}
              <div className="relative mt-4 sm:mt-6">
                {/* Category Tag */}
                <div className="relative mb-3">
                  <div className="relative w-fit bg-gray-200 text-black px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                    {course.category}
                  </div>
                </div>

                {/* Course Title */}
                <h3 className="text-lg sm:text-xl md:text-[22px] font-bold text-black mt-3 sm:mt-4 mb-2 sm:mb-3 leading-tight">
                  {course.title}
                </h3>

                {/* Topics List */}
                <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  {course.topics.map((topic, topicIndex) => (
                    <li
                      key={topicIndex}
                      className="flex items-start text-black text-xs sm:text-sm"
                    >
                      <span className="size-1.5 sm:size-2 bg-purple rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>

                {/* View More Link */}
                <div className="mb-3 sm:mb-4">
                  <a
                    href="#"
                    className="text-gray-600 text-xs sm:text-sm hover:text-gray-800 transition-colors"
                  >
                    View more...
                  </a>
                </div>

                {/* View Course Button */}
                <button className="w-full bg-gradient-to-r from-orange to-orange/50 text-white py-2.5 sm:py-3 text-base sm:text-lg md:text-xl rounded-xl sm:rounded-2xl font-semibold transition duration-300 hover:from-orange/90 hover:to-orange/40">
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Courses Link */}
        <div className="text-center">
          <a
            href="#"
            className="inline-flex items-center text-gray-900 hover:text-gray-700 font-medium text-sm sm:text-base transition-colors"
          >
            View All Courses
            <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Courses;

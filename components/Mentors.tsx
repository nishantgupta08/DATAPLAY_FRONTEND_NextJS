import Image from "next/image";
import { Linkedin } from "lucide-react";
import Button from "./widgets/Button";

const Mentors = () => {
  const mentors = [
    {
      name: "Nishant Gupta",
      title: "Senior Data Scientist @ EXL",
      subtitle: "Ex Senior Data Scientist @ MediaCorp, Singapore",
      description:
        "With 8 years of experience, he excels at simplifying complex concepts, ensuring comprehensive understanding from the very roots.",
      bgColor: "bg-gradient-to-br from-[#EC4899] to-[#8B5CF6]",
      image: "/mentor1.png", // Replace with actual image
    },
    {
      name: "Mahima Gupta",
      title: "Data Scientist @ Target, Bangalore",
      subtitle: "",
      description:
        "With 4 years of expertise, she adeptly identifies students' weak points, introducing effective techniques to help them excel by addressing their shortcomings",
      bgColor: "bg-gradient-to-br from-[#EC4899] to-[#8B5CF6]",
      image: "/mentor2.png", // Replace with actual image
    },
  ];

  return (
    <section className="relative py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="relative flex-center flex-col leading-none gap-3 sm:gap-4 lg:gap-5 text-center mb-20">
          <div className="inline-block bg-purple text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-lg lg:text-[22px] uppercase font-semibold">
            Mentors
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-[50px] font-bold text-black leading-tight">
            Our Mentors
          </h2>
          <p className="text-black text-base sm:text-lg max-w-2xl mx-auto">
            Guiding minds towards brilliance and success.
          </p>
        </div>

        {/* Mentors Grid - Responsive layout */}
        <div className="relative grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10 mb-12 md:mb-16">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#FF9393] to-[#8073E5] rounded-2xl md:rounded-3xl text-white relative overflow-visible min-h-[300px] md:min-h-[400px] flex flex-col md:flex-row"
            >
              {/* Image Section - Responsive positioning */}
              <div className="w-full md:w-1/2 relative overflow-visible h-48 md:h-auto">
                {/* Image Container with Vertical Overflow */}
                <div className="absolute inset-0 -top-8 xl:-top-16 -bottom-0 w-full overflow-visible">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-scale-down object-bottom"
                  />
                </div>
              </div>

              {/* Content Section - Responsive padding and text */}
              <div className="w-full md:w-1/2 p-4 md:p-6 lg:p-8 flex flex-col justify-center relative z-20">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                  {mentor.name}
                </h3>
                <h4 className="text-base md:text-lg font-semibold mb-1 opacity-95">
                  {mentor.title}
                </h4>
                {mentor.subtitle && (
                  <h5 className="text-xs md:text-sm font-medium mb-3 md:mb-4 opacity-90">
                    {mentor.subtitle}
                  </h5>
                )}
                <p className="text-xs md:text-sm opacity-90 mb-4 md:mb-6 leading-relaxed">
                  {mentor.description}
                </p>

                <Button
                  title="View Profile"
                  icon="mdi:linkedin"
                  className="w-fit text-xs md:text-sm"
                  variant="lightOrange"
                />
              </div>
            </div>
          ))}
        </div>

        <Button
          title="View More"
          icon="mdi:arrow-right"
          className="mx-auto mt-8 md:mt-12"
        />
      </div>
    </section>
  );
};

export default Mentors;

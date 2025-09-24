/* eslint-disable @next/next/no-img-element */

const Features = () => {
  const features = [
    {
      icon: "/lifetime.png",
      title: "Lifetime Access to Live Classes",
    },
    {
      icon: "/bytheindustry.png",
      title: "By the Industry For the  Industry",
    },
    {
      icon: "/resume.png",
      title: "Resume Refactoring & Mock Interviews",
    },
    {
      icon: "/money.png",
      title: "Affordability meets Quality",
    },
  ];

  return (
    <section className="relative pt-12 sm:pt-16 lg:pt-20 bg-white overflow-hidden">
      <div className="container max-md:px-0">
        <div className="relative max-md:px-4 flex max-md:items-center max-md:whitespace-nowrap max-md:overflow-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8 scroll-hidden">
          {features.map((feature, index) => {
            return (
              <div
                key={index}
                className="relative max-md:min-w-[220px] h-full p-4 py-6 sm:p-6 2xl:p-8 flex flex-col gap-4 sm:gap-4 lg:gap-6 bg-gradient-to-b from-[#FF9393] to-[#8073E5] rounded-2xl sm:rounded-3xl text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex justify-start">
                  <img
                    src={feature.icon}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[86px] lg:h-[86px] bg-white flex items-center justify-center rounded-xl shadow-2xl"
                    alt={feature.title}
                  />
                </div>
                <h3 className="whitespace-normal text-lg xl:text-2xl 2xl:text-[28px] font-bold text-left leading-tight">
                  {feature.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

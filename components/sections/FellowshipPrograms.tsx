import data from "@/app/assets/content.json"
const FellowshipPrograms = () => {
  const aboutUsData = data.homepage.about_us
  return (
    <section className="relative py-16 lg:py-20" id="about-us">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Video Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative max-lg:aspect-video lg:h-[500px] w-full">
              <iframe
                className="w-full h-full rounded-2xl sm:rounded-3xl border border-black drop-shadow-[4px_4px_0_#1C1A4A] sm:drop-shadow-[6px_6px_0_#1C1A4A] lg:drop-shadow-[8px_8px_0_#1C1A4A]"
                src={aboutUsData.video_url}
                title="WELCOME TO DATAPLAY"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="relative flex flex-col items-start leading-none gap-4 sm:gap-6 order-1 lg:order-2">
            <div className="relative lg:-mb-3 inline-block bg-purple text-white px-4 py-1 rounded-full text-base sm:text-lg lg:text-[22px] font-semibold">
              {aboutUsData.title}
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[50px] font-bold text-black pr-0 sm:pr-4 lg:pr-8 xl:pr-20 leading-tight">
              {aboutUsData.heading}
              <span className="relative inline-flex items-center justify-center ml-2">
                <svg
                  className="absolute h-full w-full scale-[115%]"
                  viewBox="0 0 349 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M348.864 11.1296C350.314 4.71659 339.805 3.82585 334.369 3.64771C239.428 -3.62041 78.5954 1.51004 10.9527 5.7854C-2.0927 5.7854 -0.522414 10.9515 0.987481 13.2673L8.23491 44.7981C8.23491 50.7836 16.3883 52.1019 19.1061 52.28C138.689 58.2655 274.88 52.9926 328.028 49.6079C337.993 49.6079 342.825 46.7577 342.523 44.7981C342.523 33.5753 345.24 20.3929 348.864 11.1296Z"
                    fill="#FF4C3D"
                  />
                </svg>

                <span className="relative z-[1] font-black text-white">
                  {aboutUsData.highlighted_heading}
                </span>
              </span>{" "}
              {aboutUsData.remaining_heading}

            </h2>

            <div className="text-black text-sm sm:text-base lg:text-lg font-light space-y-3 sm:space-y-4 lg:space-y-5">
              {
                aboutUsData.details?.map((ele, idx) => {
                  return (
                    <p key={`about-${idx}`}>
                      {ele}
                    </p>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FellowshipPrograms;

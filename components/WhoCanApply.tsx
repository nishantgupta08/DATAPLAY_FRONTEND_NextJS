import Button from "./widgets/Button";

/* eslint-disable @next/next/no-img-element */
const WhoCanApply = () => {
  return (
    <section className="relative bg-purple overflow-hidden max-lg:pt-16 lg:pt-10 ">
      {/* Background Decorations - Hidden on mobile, visible on larger screens */}
      <img
        src="/moon.png"
        alt="background Icon"
        className="absolute top-[10%] left-[5%] hidden sm:block w-8 sm:w-12 lg:w-16"
      />
      <img
        src="/star.png"
        alt="background Icon"
        className="absolute top-[5%] right-[15%] hidden sm:block w-6 sm:w-8 lg:w-12"
      />
      <img
        src="/book.png"
        alt="background Icon"
        className="absolute bottom-[5%] right-[10%] hidden sm:block w-8 sm:w-12 lg:w-16"
      />
      <img
        src="/paperplan.png"
        alt="background Icon"
        className="absolute top-[40%] right-[2%] hidden sm:block w-6 sm:w-8 lg:w-12"
      />

      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-20 items-center">
          {/* Image Section */}
          <div className="relative flex-center w-full lg:w-auto order-2 lg:order-1">
            <img
              src="/whocanapplysideImg.png"
              alt="Who Can Apply"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-none"
            />
          </div>

          {/* Content Section */}
          <div className="text-white text-center lg:text-left order-1 lg:order-2 flex-1 lg:pb-6">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-[70px] font-bold leading-tight mb-4 sm:mb-6">
              Who Can Apply?
            </h2>

            <p className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold leading-tight mb-4 sm:mb-6">
              Absolutely{" "}
              <span className="relative inline-flex items-center justify-center">
                <svg
                  className="absolute h-full w-full scale-110 sm:scale-125"
                  viewBox="0 0 201 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M200.922 10.9273C201.757 4.63083 195.704 3.75629 192.574 3.58139C137.894 -3.55458 45.2655 1.48258 6.308 5.68021C-1.20525 5.68021 -0.300874 10.7524 0.568721 13.0261L4.74274 43.9836C4.74274 49.8603 9.43852 51.1546 11.0038 51.3295C79.8751 57.2061 158.312 52.0291 188.921 48.7059C194.661 48.7059 197.443 45.9075 197.27 43.9836C197.27 32.9648 198.835 20.0221 200.922 10.9273Z"
                    fill="#FF4C3D"
                  />
                </svg>
                <span className="relative z-[1]">Everyone!</span>
              </span>{" "}
              All Backgrounds, All Levels,
            </p>

            <p className="text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8">
              Whether you&apos;re a high school grad, college graduate, or
              industry expert. Diversity is your learning playground!
            </p>

            <div className="flex justify-center lg:justify-start">
              <Button title="Contact Us" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoCanApply;

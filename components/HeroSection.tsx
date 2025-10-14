/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import data from "@/app/assets/content.json";
import BookCounsellingButton from "./BookCounsellingButton";

type Feature = { icon: string; title: string; href?: string };

const HeroSection = () => {
  const hero = data?.homepage?.hero ?? {};
  const features: Feature[] = [
    { icon: "/lifetime.png", title: (data?.homepage?.features?.[0] ?? "Lifetime Access"), href: "#live-classes" },
    { icon: "/bytheindustry.png", title: (data?.homepage?.features?.[1] ?? "By the Industry For the Industry"), href: "#industry" },
    { icon: "/resume.png", title: (data?.homepage?.features?.[2] ?? "Resume Refactoring & Mock Interviews"), href: "#career" },
    { icon: "/money.png", title: (data?.homepage?.features?.[3] ?? "Affordability meets Quality"), href: "#pricing" },
  ];

  return (
    <section id="home" className="relative bg-[#F7EEFA] overflow-hidden" aria-label="Hero">
      <div className="container">
        {/* Main row */}
        <div className="grid lg:grid-cols-2 2xl:gap-20 lg:gap-10 items-end">
          {/* Left column */}
          <div className="relative py-16 md:py-20">
            {/* Eyebrow */}
            <h5 className="text-darkBlue 2xl:text-4xl xl:text-3xl text-2xl font-semibold mb-4">
              {hero.tag_line.normal_text}
              <span className="relative ml-3 inline-flex items-center justify-center text-white font-bold ">
                <span className="relative z-[1] ">{hero.tag_line.highlighted_text}</span>
                <svg
                  className="absolute h-full w-full scale-110"
                  viewBox="0 0 211 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M210.918 11.866C211.794 5.45292 205.441 4.56218 202.155 4.38404C144.754 -2.88408 47.5176 2.24637 6.62183 6.52173C-1.26521 6.52173 -0.315843 11.6878 0.597016 14.0036L4.9787 45.5344C4.9787 51.5199 9.9081 52.8382 11.5512 53.0163C83.849 59.0018 166.188 53.7289 198.321 50.3442C204.345 50.3442 207.266 47.494 207.084 45.5345C207.084 34.3116 208.727 21.1292 210.918 11.866Z"
                    fill="#8073E5"
                  />
                </svg>

                <Image
                  src="/learning-vector2.svg"
                  width={53}
                  height={53}
                  alt="Learning Vector 2"
                  className="absolute -right-12 md:-right-16 -top-12 "
                  loading="lazy"
                />
              </span>
            </h5>

            {/* Headline + underline accent */}
            <h1
              className="text-darkBlue 2xl:text-[56px] xl:text-5xl text-4xl font-bold mb-10"
              data-aos="fade-right"
            >
              {hero.heading}
              <span className="relative">
                {hero.underline_heading}
                <svg
                  width="227"
                  height="20"
                  className="absolute top-full -right-10 "
                  viewBox="0 0 227 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-267.413 10.121C-263.4 10.1409 -259.407 10.0217 -255.394 9.95222C-253.774 9.92242 -252.135 9.8827 -250.515 9.83305C-243.337 9.64436 -236.16 9.45567 -228.983 9.26698C-220.411 9.03857 -211.821 8.80023 -203.249 8.55196C-190.985 8.19445 -178.741 7.827 -166.496 7.46949C-163.689 7.39004 -160.882 7.33046 -158.075 7.26094C-150.935 7.08218 -143.795 6.90343 -136.656 6.7346C-129.516 6.55584 -122.376 6.37709 -115.236 6.20826C-112.448 6.13875 -109.641 6.04937 -106.853 5.99971C-95.4559 5.81103 -84.0587 5.62234 -72.6803 5.43365C-65.6724 5.31448 -58.6645 5.20524 -51.6567 5.08607C-48.9062 5.03641 -46.1747 4.97683 -43.4243 4.94704C-32.4038 4.86759 -21.4022 4.76828 -10.3817 4.68883C0.488025 4.59945 11.3578 4.52001 22.2276 4.43063C25.091 4.41077 27.9733 4.4207 30.8367 4.41077C37.9388 4.40084 45.022 4.38097 52.1241 4.37104C63.1634 4.35118 74.1839 4.33132 85.2232 4.30153C88.8213 4.2916 92.4383 4.31146 96.0553 4.32139C103.609 4.33132 111.164 4.35118 118.718 4.36111C119.34 4.36111 119.961 4.36111 120.583 4.36111C103.572 4.48028 86.5795 4.59945 69.5685 4.73849C62.4664 4.79807 55.3643 4.84773 48.2622 4.90731C45.1916 4.92717 42.1397 4.93711 39.0691 4.97683C28.8021 5.11586 18.5164 5.27476 8.24945 5.41379C-3.61875 5.58261 -15.5058 5.75144 -27.374 5.92027C-29.3708 5.95006 -31.3677 6.00964 -33.3646 6.0593C-39.6943 6.21819 -46.0051 6.36716 -52.3348 6.51612C-65.1638 6.82398 -77.9927 7.14177 -90.8217 7.44963C-92.7244 7.49928 -94.6082 7.5688 -96.5109 7.63831C-102.765 7.86673 -109.038 8.09514 -115.312 8.32355C-126.539 8.73071 -137.748 9.13788 -148.976 9.54505C-152.065 9.65429 -155.155 9.82312 -158.244 9.95222C-165.422 10.27 -172.618 10.5878 -179.795 10.9056C-188.932 11.3128 -198.069 11.7001 -207.187 12.1271C-219.902 12.713 -232.6 13.2989 -245.315 13.8849C-248.367 14.0239 -251.419 14.1629 -254.452 14.302C-259.915 14.5502 -265.36 14.9177 -270.823 15.2355C-271.407 15.2653 -271.896 15.4639 -271.896 15.8015C-271.896 16.1193 -271.407 16.3477 -270.823 16.3676C-268.826 16.4172 -266.829 16.457 -264.851 16.5066C-265.096 16.7847 -265.246 17.0826 -265.246 17.3805C-265.246 18.4531 -263.476 19.5157 -261.347 19.4462C-245.768 18.9298 -230.188 18.3736 -214.59 17.9863C-201.045 17.6487 -187.519 17.311 -173.974 16.9634C-158.998 16.5861 -144.04 16.2087 -129.064 15.8313C-124.354 15.7121 -119.644 15.593 -114.935 15.4738C-113.578 15.444 -112.222 15.3944 -110.847 15.3745C-86.7338 15.0368 -62.6206 14.7091 -38.5074 14.3715C-25.622 14.1927 -12.7365 14.014 0.148955 13.8352C4.80204 13.7756 9.45511 13.716 14.1082 13.6763C38.7677 13.4777 63.4271 13.2691 88.1054 13.0705C98.6738 12.9811 109.242 12.8918 119.81 12.8024C128.834 12.7229 137.858 12.6931 146.881 12.5144C154.322 12.3654 161.782 12.2165 169.242 12.0675C172.954 11.998 176.684 11.9483 180.395 11.8192C188.853 11.5412 197.312 11.2532 205.77 10.9552C205.77 10.9652 205.751 10.9652 205.751 10.9751C205.28 11.4021 205.148 11.9285 205.393 12.4052C205.638 12.8719 206.222 13.2691 207.013 13.5174C207.748 13.7458 208.897 13.8749 209.726 13.7061C211.572 13.3188 213.4 12.9216 215.227 12.5243C215.189 12.5343 215.152 12.5442 215.114 12.5541C215.246 12.5243 215.378 12.4945 215.528 12.4647C215.679 12.4349 215.849 12.3952 215.999 12.3654C215.943 12.3754 215.886 12.3952 215.83 12.4052C216.809 12.1867 217.789 11.9682 218.75 11.7497C219.767 11.5213 220.784 11.3028 221.802 11.0645C222.913 10.8063 223.968 10.4984 225.042 10.2005C226.248 9.86284 226.982 9.11802 226.982 8.41293C226.982 8.03555 226.794 7.68797 226.455 7.37018C225.984 6.94315 225.061 6.50619 224.119 6.41681C223.177 6.32743 222.235 6.26785 221.274 6.19833C221.067 6.1884 220.86 6.17847 220.634 6.17847C219.993 6.17847 219.315 6.22812 218.712 6.24799C217.28 6.29764 215.849 6.41681 214.417 6.46647C213.249 6.51612 212.081 6.55584 210.894 6.59557C207.729 6.71474 204.583 6.83391 201.437 6.95308C200.627 6.98287 199.798 7.01267 198.988 7.04246C199.29 6.8637 199.497 6.66508 199.629 6.42674C199.78 6.24799 199.855 6.04937 199.874 5.85075C199.911 5.71172 199.949 5.57268 199.987 5.42372C199.987 5.23503 199.93 5.06621 199.817 4.89738C199.893 4.87752 199.987 4.85766 200.062 4.8378C200.646 4.64911 201.136 4.40084 201.475 4.09298C201.833 3.76526 202.021 3.41768 202.021 3.0403C202.021 2.66293 201.833 2.31534 201.475 1.98762C201.268 1.84859 201.061 1.70956 200.853 1.56059C200.364 1.30239 199.78 1.12363 199.101 1.02432C197.915 0.795914 196.652 0.736328 195.352 0.736328C194.298 0.736328 193.243 0.776052 192.188 0.785983C190.681 0.795914 189.155 0.805845 187.629 0.805845C185.481 0.815775 183.334 0.835637 181.186 0.835637C175.516 0.855499 169.845 0.86543 164.175 0.885292C158.844 0.905154 153.512 0.895223 148.181 0.895223C143.34 0.895223 138.479 0.895223 133.638 0.905154C114.31 0.954808 95.0003 0.964739 75.6721 1.07398C61.1854 1.15343 46.6986 1.23287 32.2119 1.30239C25.7315 1.34211 19.2699 1.39177 12.7895 1.46128C-1.7349 1.62018 -16.2405 1.78901 -30.7649 1.9479C-34.9093 1.99755 -39.0538 2.03728 -43.1794 2.08693C-45.5719 2.11673 -47.9832 2.17631 -50.3756 2.22597C-64.7305 2.51396 -79.0665 2.80196 -93.4214 3.08995C-97.7919 3.17933 -102.181 3.26871 -106.552 3.35809C-109.001 3.40774 -111.469 3.49712 -113.918 3.55671C-128.159 3.96388 -142.42 4.36111 -156.662 4.76828C-164.009 4.9669 -171.356 5.20524 -178.722 5.44358C-191.306 5.86068 -203.909 6.28771 -216.493 6.70481C-227.4 7.06232 -238.308 7.38011 -249.215 7.71776C-250.948 7.76742 -252.681 7.827 -254.396 7.87666C-257.202 7.9561 -259.991 8.01569 -262.779 8.08521C-265.265 8.14479 -267.752 8.18451 -270.239 8.14479C-270.502 7.80714 -271.124 7.52907 -271.84 7.55887C-273.441 7.62838 -275.042 7.71776 -276.644 7.80714C-277.416 7.84686 -278.094 8.05541 -278.32 8.48244C-278.565 8.9492 -278.019 9.48546 -277.115 9.60464C-276.418 9.69401 -275.721 9.78339 -275.024 9.87277C-274.327 9.95222 -273.611 9.97208 -272.914 10.0019C-271.086 10.0913 -269.24 10.1111 -267.413 10.121ZM173.425 6.93322C175.761 6.93322 178.115 6.93322 180.451 6.93322C180.659 7.21128 180.979 7.45956 181.393 7.65818C180.489 7.68797 179.585 7.71776 178.68 7.73762C176.966 7.76742 175.271 7.80714 173.556 7.83693C166.096 7.9859 158.655 8.13486 151.195 8.28382C147.786 8.35334 144.376 8.45265 140.966 8.48244C135.635 8.52217 130.303 8.57182 124.972 8.61154C112.784 8.71085 100.614 8.81016 88.4257 8.9194C64.7835 9.11802 41.1225 9.31664 17.4803 9.51526C0.544557 9.65429 -16.3912 9.93236 -33.3081 10.1707C-58.8153 10.5282 -84.3224 10.8857 -109.83 11.2432C-114.935 11.3128 -120.059 11.4915 -125.164 11.6206C-139.651 11.9881 -154.119 12.3555 -168.605 12.7229C-182.828 13.0805 -197.033 13.438 -211.256 13.7955C-212.574 13.8253 -213.893 13.865 -215.212 13.8948C-211.387 13.7359 -207.544 13.5671 -203.72 13.4181C-190.345 12.8818 -176.97 12.3356 -163.576 11.7994C-158.904 11.6107 -154.232 11.422 -149.56 11.2333C-147.149 11.134 -144.737 11.0744 -142.326 10.995C-128.404 10.5481 -114.502 10.1111 -100.58 9.66422C-97.8673 9.57484 -95.1357 9.4656 -92.423 9.40602C-88.5046 9.32657 -84.5862 9.24712 -80.6678 9.16767C-66.3318 8.86975 -51.9769 8.58175 -37.6409 8.28382C-34.476 8.22424 -31.33 8.15472 -28.1652 8.08521C-27.3363 8.06534 -26.5074 8.06534 -25.6785 8.05541C-23.4556 8.03555 -21.2515 8.00576 -19.0286 7.9859C-4.65485 7.827 9.71885 7.67804 24.0926 7.51914C30.7237 7.44963 37.336 7.36025 43.9671 7.34039C65.3487 7.25101 86.7114 7.13184 108.093 7.08218C129.87 7.0226 151.647 6.94315 173.425 6.93322Z"
                    fill="#FF4C3D"
                  />
                </svg>
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-darkBlue 2xl:text-[28px] xl:text-2xl text-xl font-bold mt-3 mb-5">
              {hero?.sub_heading ?? "Let's Sculpt YOUR Path To Success, YOUR Way !"}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Client button triggers the modal */}
              <BookCounsellingButton />

              <a
                href="#courses"
                className="z-30 inline-flex items-center justify-center px-6 py-3 rounded-full font-bold bg-white text-black border-2 border-black hover:-translate-y-0.5 active:translate-y-[1px] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-label="Explore Courses"
              >
                Explore Courses
                <Icon icon="mdi:arrow-right" className="ml-2 text-xl" />
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="relative max-md:-mt-20 max-md:w-[120%] w-full block right-0">
            <div className="right-0 pointer-events-none absolute -z-10 top-6 h-[520px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,_#E9E1FF_0%,_#F7EEFA_45%,_transparent_70%)] blur-2xl opacity-90" />
            <img
              src="/final-hero-image.png"
              alt="banner-img"
              className="relative block  h-9/10"
            />

            {/* Google reviews pill */}
            <a
              href="https://www.google.com/search?q=dataplay+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute ml-20 sm:left-0 -translate-x-[36%] md:-translate-x-[32%] top-20 md:top-24 z-10 rounded-xl bg-white/95 backdrop-blur border-2 border-black shadow-[6px_6px_0_#6B5AED] px-4 py-2 hover:shadow-[8px_8px_0_#FF2714] transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              aria-label="Open Google reviews"
              title="Open Google reviews"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center sm:size-7 rounded-full border-2 border-black">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M21.35 11.1H12v2.9h5.38C16.98 16.14 15.09 17.5 12 17.5c-3.59 0-6.5-2.91-6.5-6.5s2.91-6.5 6.5-6.5c1.65 0 3.15.62 4.29 1.63l2.06-2.06C16.76 2.65 14.49 1.75 12 1.75 6.89 1.75 2.75 5.89 2.75 11S6.89 20.25 12 20.25c5.04 0 8.75-3.53 8.75-8.5 0-.52-.06-1.05-.17-1.55z"
                    />
                  </svg>
                </span>
                <span className="text-sm font-extrabold tracking-tight">4.9</span>
                <span className="text-yellow-500 text-sm">★</span>
                <span className="text-sm font-semibold">Google Rating</span>
                <span className="ml-2 text-[11px] text-black/60 underline decoration-dotted">Read reviews</span>
              </div>
            </a>
          </div>
        </div>

        {/* Feature cards */}
        <section aria-label="Program highlights">
          <div role="list" className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {features.map((f, i) => {
              const tones = [
                { grad: "from-blue-500 to-blue-600", ring: "ring-blue-100" },
                { grad: "from-lime-500 to-lime-600", ring: "ring-lime-100" },
                { grad: "from-pink-500 to-fuchsia-500", ring: "ring-pink-100" },
                { grad: "from-orange-500 to-orange-600", ring: "ring-orange-100" },
              ][i % 4];
              const Tag = (f.href ? "a" : "div") as any;

              return (
                <Tag
                  key={i}
                  href={f.href}
                  role="listitem"
                  className={[
                    "group block rounded-2xl bg-white border border-slate-200 shadow-sm",
                    "p-5 sm:p-6 min-h-[112px] h-full",
                    "ring-1 ring-transparent", tones.ring,
                    "transition-all hover:shadow-md hover:-translate-y-[2px]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-4">
                    <span className={["inline-flex size-12 items-center justify-center rounded-[14px] text-white shadow-md bg-gradient-to-b", tones.grad].join(" ")} aria-hidden="true">
                      <Image
                        src={f.icon}
                        alt=""
                        width={22}
                        height={22}
                        className="w-[22px] h-[22px] object-contain filter brightness-0 invert"
                      />
                    </span>
                    <h3 className="text-[15px] sm:text-base font-extrabold text-slate-900 leading-snug">
                      {f.title}
                    </h3>
                  </div>
                </Tag>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
};

export default HeroSection;
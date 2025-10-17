import Image from "next/image";
import data from "@/data/content.json"


const Gallery = () => {
  const galleryData = data.homepage.gallery
  return (
    <section className="relative py-16 lg:py-20">
      <div className="container">
        <div className="relative flex-center flex-col leading-none gap-3 sm:gap-4 lg:gap-5 text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-block bg-purple text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-lg lg:text-[22px] uppercase font-semibold">
            OUR GALLERY
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-[50px] font-bold text-black leading-tight">
            {galleryData.title}
          </h2>
          <p className="text-black text-base sm:text-lg max-w-2xl mx-auto">
            {galleryData.sub_title}
          </p>
        </div>

        {/* Dynamic Responsive Grid */}
        <div
          className="grid grid-cols-12 auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[350px] gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-12"
        >
          {galleryData.gallery.map((item, index) => (
            <div
              key={`gallery-${index}`}
              className={`relative group overflow-hidden border border-purple rounded-lg sm:rounded-xl p-1.5 sm:p-2 lg:p-2.5 ${item.span} ${item.rowSpan}`}
            >
              <div className="relative flex h-full w-full overflow-hidden rounded-lg sm:rounded-xl">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                  placeholder="empty"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-2 sm:bottom-4 -right-1 sm:-right-2 pr-2 sm:pr-4 text-xs sm:text-base lg:text-lg bg-purple text-white px-2 sm:px-3 py-0.5 sm:py-1 -skew-x-12 border-l-4 sm:border-l-6 lg:border-l-8 border-darkPurple">
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

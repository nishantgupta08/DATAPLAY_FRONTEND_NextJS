import HeroSection from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import WhoCanApply from "@/components/WhoCanApply";
import Mentors from "@/components/Mentors";
import Courses from "@/components/Courses";
import Features from "@/components/Features";
import FellowshipPrograms from "@/components/FellowshipPrograms";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <FellowshipPrograms />
      <Courses />
      <Mentors />
      <Testimonials />
      <WhoCanApply />
      <Gallery />
    </>
  );
}
